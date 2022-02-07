import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js';

export class Notification extends Model {}

Notification.init(
  {
    description: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, sequelize, modelName: 'Notification', tableName: 'notifications', createdAt: 'created_at', updatedAt: 'updated_at' }
);
