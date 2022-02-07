import { HttpService } from './base';

class LocationService extends HttpService {
  prefix = 'location';
  create = (data) => this.post(this.prefix, data);
  findAll = () => this.get(this.prefix);
  changeLocation = (data) => this.post(`${this.prefix}/change-location`, data);
}
export const locationService = new LocationService();
