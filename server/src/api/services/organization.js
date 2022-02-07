import { Organization } from '../models/organization.js';

class OrganizationService {
  update = (id, data) => Organization.update(data, { where: { id }, returning: true, plain: true });
}

export const organizationService = new OrganizationService();
