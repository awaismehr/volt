import { User } from '../models/user.js';
import { Organization } from '../models/organization.js';
import { Device } from '../models/device.js';
import { Bay } from '../models/bay.js';
import { Unit } from '../models/unit.js';
import { Location } from '../models/location.js';

class UserService {
  findOne = (data) =>
    User.findOne({
      where: data,
      include: {
        model: Organization,
      },
      plain: true,
    });

  createUsers = async (users) => {
    await User.bulkCreate(users);
    return await User.findAll();
  };
  getUsers = () => User.findAll();
  create = (data) => User.create(data);
  getUser = (data) => User.findOne({ where: data, plain: true });
  update = async (condition, update) => {
    const updatedUser = await User.update(update, { where: condition, returning: true, plain: true });
    return updatedUser[1];
  };

  report = async (condition) => {
    return await User.findOne({
      where: condition,
      attributes: ['bayId'],
      include: [
        {
          model: Bay,
          attributes: ['bayNumber', 'unitId', 'deviceId'],
          include: [
            {
              model: Unit,
              attributes: ['unitNumber'],
              include: [{ model: Location, attributes: ['name'] }],
            },
            { model: Device, attributes: ['status', 'name'] },
          ],
        },
      ],
    });
  };

  // find user with location and other attributes
  // findOneWithLocation = (condition) => {
  //   return await User.findOne({
  //     where: condition,
  //     attributes: ['bayId'],
  //     include: [{ model: Unit, attributes: ['un'] }],
  //   });
  // };
}

export const userService = new UserService();
