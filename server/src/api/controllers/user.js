import { sendPinCodeEmail } from '../../helpers/email.js';
import { userService } from '../services/index.js';

class User {
  createUsers = async (req, res) => {
    try {
      const { users } = req.body;
      const usersCreated = await userService.createUsers(users);
      return res.json({ users: usersCreated, success: true });
    } catch (error) {
      console.log(error);
    }
  };

  getUsers = async (req, res) => {
    const users = await userService.getUsers();
    return res.json({ users, success: true });
  };

  create = async (req, res) => {
    try {
      const userCreated = await userService.create({ ...req.body, email: 'test@gmail.com', access_level: 'admin' });
      return res.json({ user: userCreated, success: true });
    } catch (error) {
      console.log(error);
    }
  };

  getUser = async (req, res) => {
    const userFound = await userService.getUser(req.params);
    return res.json({ user: userFound, success: true });
  };

  assignBay = async (req, res) => {
    // update user by userId
    const updatedUser = await userService.update(req.params, req.body);
    // get all record of user by userId
    const report = await userService.report(req.params);
    const email = updatedUser.email;
    const bayNumber = report.Bay.bayNumber;
    const locationName = report.Bay.Unit.Location.name;
    // send email bayNumber and locationName to user
    await sendPinCodeEmail(email, bayNumber, locationName);
    return res.json({ success: true, message: 'Bay assigned',user:updatedUser });
  };

  report = async (req, res) => {
    const userReport = await userService.report(req.params);
    return res.json({ report: userReport });
  };
}

export const user = new User();
