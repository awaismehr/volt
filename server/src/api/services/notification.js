import { Notification } from '../models/notification.js';

class NotificationService {
  findAll = () => Notification.findAll();
}

export const notificationService = new NotificationService();
