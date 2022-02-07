import { notificationService } from '../services/index.js';

class Notification {
  findAll = async (req, res) => {
    const notifications = await notificationService.findAll();
    return res.json({ success: true, notifications });
  };
}

export const notification = new Notification();
