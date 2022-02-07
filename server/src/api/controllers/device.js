import { sendPinCodeEmail } from '../../helpers/email.js';
import { deviceService } from '../services/device.js';

class Device {
  updateDevice = async (req, res) => {
    const { locationId } = req.body;
    const { deviceId } = req.params;
    const location = await deviceService.updateDevice(deviceId, locationId);
    return res.json({ location, success: true });
  };

  sendPinCode = async (req, res) => {
    const { email } = req.body;
    const pinCode = Math.floor(1000 + Math.random() * 9000);
    await sendPinCodeEmail(pinCode);
  };
}

export const device = new Device();
