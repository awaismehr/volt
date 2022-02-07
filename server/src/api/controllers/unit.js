import { unitService } from '../services/index.js';

class Unit {
  findAll = async (req, res) => {
    const units = await unitService.findAll();
    return res.json({ success: true, units });
  };
}

export const unit = new Unit();
