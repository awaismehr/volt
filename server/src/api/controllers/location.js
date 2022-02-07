import { locationService } from '../services/location.js';

class Location {
  create = async (req, res) => {
    const { name } = req.body;
    const location = await locationService.create(name);
    return res.json({ location, success: true });
  };

  findAll = async (req, res) => {
    const locations = await locationService.findAll();
    return res.json({ locations, success: true });
  };

  changeLocation = async (req, res) => {
    const { locationId, deviceId } = req.body;
    const location = await locationService.update(locationId, { device_id: deviceId });
    return res.json({ location, success: true });
  };
}

export const location = new Location();
