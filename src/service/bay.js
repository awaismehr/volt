import { HttpService } from './base';

class BayService extends HttpService {
  prefix = 'bay';
  findByUnitId = (unitId) => this.get(`${this.prefix}/${unitId}`);
}
export const bayService = new BayService();
