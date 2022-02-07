import { Location } from '../models/location.js';

class DeviceService {
  updateDevice = (deviceId, locationId) => Location.update({ device_id: deviceId }, { where: { id: locationId }, returning: true });
}

export const deviceService = new DeviceService();
