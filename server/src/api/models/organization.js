import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import { User } from './user.js';

export class Organization extends Model {}

Organization.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo_filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_org_id: {
      type: DataTypes.UUID,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Organization',
    tableName: 'organizations',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
