import { Unit } from '../models/unit.js';

class UnitService {
  findAll = (data) => Unit.findAll();
}

export const unitService = new UnitService();
