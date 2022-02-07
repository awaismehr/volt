import { Model, DataTypes } from 'sequelize';
import { Bay } from './bay.js';
import { sequelize } from './index.js';
import { Organization } from './organization.js';

export class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    full_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    access_level: {
      type: DataTypes.STRING,
    },
    organization_id: {
      type: DataTypes.UUID,
    },
    bayId: {
      type: DataTypes.UUID,
    },
  },
  { timestamps: true, sequelize, modelName: 'User', tableName: 'users', createdAt: 'created_at', updatedAt: 'updated_at' }
);

// relations here
User.belongsTo(Organization, {
  foreignKey: 'organization_id',
});

// relation between user and bay
User.belongsTo(Bay, { foreignKey: 'bayId' });
