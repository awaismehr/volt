import httpErrors from 'http-errors';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { userService } from '../services/user.js';
import jwt from 'jsonwebtoken';
import { sendForgetPassEmail } from '../../helpers/email.js';

const { JWT_SECRET_KEY } = process.env;

class Auth {
  login = async (req, res) => {
    const { email, password } = req.body;
    const userFound = await userService.findOne({ email });
    if (!userFound) throw new httpErrors.BadRequest('Invalid credentials');
    const match = await bcrypt.compare(password, userFound.password);
    if (!match) throw new httpErrors.BadRequest('Invalid credentials');
    jwt.sign(
      {
        sub: userFound.id,
        userName: userFound.full_name,
      },
      JWT_SECRET_KEY,
      (err, token) => {
        if (err) throw new httpErrors.InternalServerError();
        return res.json({
          success: true,
          token,
          user: userFound,
          message: 'Logged in successfully',
        });
      }
    );
  };

  sendForgetPasswordEmail = async (req, res) => {
    const userFound = await userService.getUser(req.body);
    if (!userFound) throw new httpErrors.BadRequest('Email not found');
    jwt.sign({ sub: userFound.id, userName: userFound.full_name }, JWT_SECRET_KEY, { expiresIn: '2m' }, async (err, token) => {
      if (err) throw new httpErrors.InternalServerError();
      const link = `http://localhost:8080/changePass/${userFound.id}/${token}`;
      await sendForgetPassEmail(link);
      return res.json({ message: 'Reset password link is sent to your email', success: true });
    });
  };

  forgetPassword = async (req, res) => {
    const { password } = req.body;
    const { id, token } = req.params;
    const userFound = await userService.getUser({ id });
    if (!userFound) throw new httpErrors.BadRequest('Invalid credentials');
    const decode = jwt.verify(token, JWT_SECRET_KEY);
    if (!decode) throw new httpErrors.BadRequest('Link expired');
    const hash = await bcrypt.hash(password, 10);
    await userService.update({ id }, { password: hash });
    return res.json({ message: 'Password changed successfully!', success: true });
  };

  changePass = async (req, res) => {
    const { email, password } = req.body;
    const userFound = await userService.update({ email }, { password });
    return res.json({ message: 'Password changed successfully!', success: true, user: userFound });
  };
}

export const auth = new Auth();
