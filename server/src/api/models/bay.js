import { Model, DataTypes } from 'sequelize';
import { Device } from './device.js';
import { Unit } from './unit.js';
import { sequelize } from './index.js';

export class Bay extends Model {}

Bay.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    bayNumber: {
      type: DataTypes.INTEGER,
    },
    checkIn: {
      type: DataTypes.DATE,
    },
    checkOut: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    unitId: {
      type: DataTypes.UUID,
    },
  },
  { timestamps: true, sequelize, modelName: 'Bay', tableName: 'bays', createdAt: 'created_at', updatedAt: 'updated_at' }
);

Bay.belongsTo(Device, { foreignKey: 'deviceId' });
Bay.belongsTo(Unit, { foreignKey: 'unitId' });
