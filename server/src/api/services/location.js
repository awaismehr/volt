import { Location } from '../models/location.js';

class LocationService {
  create = (name) => Location.create({ name });
  findAll = () => Location.findAll();
  update = (id, data) => Location.update(data, { where: { id }, returning: true, plain: true });
}

export const locationService = new LocationService();
