import { HttpService } from './base';

class NotificationService extends HttpService {
  prefix = 'notification';

  findAll = () => this.get(`${this.prefix}`);
}

export const notificationService = new NotificationService();
