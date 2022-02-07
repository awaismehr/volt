import { Model, DataTypes } from 'sequelize';
import { Bay } from './bay.js';
import { sequelize } from './index.js';
import { Location } from './location.js';

export class Unit extends Model {}

Unit.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    unitNumber: {
      type: DataTypes.INTEGER,
    },
    initialized: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    activity: {
      type: DataTypes.INTEGER,
    },
    connection: {
      type: DataTypes.BOOLEAN,
    },
    locationId: {
      type: DataTypes.UUID,
    },
  },
  { timestamps: true, sequelize, modelName: 'Unit', tableName: 'units', createdAt: 'created_at', updatedAt: 'updated_at' }
);

Unit.belongsTo(Location, { foreignKey: 'locationId' });
