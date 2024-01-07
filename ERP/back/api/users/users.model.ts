import { DataTypes } from 'sequelize';
import { sequelize } from '../../utils/connections.db';

export const AdminUser = sequelize.define('admin_users', {
  user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  username: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
  },
  password: {
      type: DataTypes.STRING(200),
      allowNull: false,
  },
}, {
  timestamps: false, 
});
