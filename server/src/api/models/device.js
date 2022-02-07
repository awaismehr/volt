import { Model, DataTypes } from 'sequelize';
import { Bay } from './bay.js';
import { sequelize } from './index.js';

export class Device extends Model {}

Device.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    status: DataTypes.STRING,
    make: DataTypes.STRING,
    made: DataTypes.STRING,
    name: DataTypes.STRING,
    bayId: DataTypes.UUID,
  },
  { timestamps: true, sequelize, modelName: 'Device', tableName: 'devices', createdAt: 'created_at', updatedAt: 'updated_at' }
);
