import { bayService } from '../services/index.js';

class Bay {
  findByUnitId = async (req, res) => {
    const bays = await bayService.findByUnitId(req.params);
    return res.json({ success: true, bays });
  };
}

export const bay = new Bay();
