import { Bay } from '../models/bay.js';

class BayService {
  findByUnitId = (value) => Bay.findAll({ where: value });
  findOne = (value) => Bay.findOne({ where: value });
}

export const bayService = new BayService();
