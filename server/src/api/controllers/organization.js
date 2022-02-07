import { organizationService } from '../services/organization.js';

class Organization {
  update = async (req, res) => {
    const { name, id } = req.body;
    const updatedOrganization = await organizationService.update(id, !req.file ? { name } : { logo_filename: req.file.filename });
    return res.json({ organization: updatedOrganization[1], success: true });
  };
}

export const organization = new Organization();
