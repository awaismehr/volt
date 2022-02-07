import { HttpService } from './base';

class UnitService extends HttpService {
  prefix = 'unit';
  findAll = () => this.get(`${this.prefix}/findAll`);
}
export const unitService = new UnitService();
