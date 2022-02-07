import { HttpService } from './base';

class OrganizationService extends HttpService {
  prefix = 'organization';
  update = (data) => this.post(this.prefix, data);
}
export const organizationService = new OrganizationService();
