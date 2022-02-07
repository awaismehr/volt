import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js';

export class Location extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate() {
    // define association here
  }
};

Location.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    organization_id: {
      type: DataTypes.UUID,
    },
    device_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Location',
    tableName: 'locations',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
