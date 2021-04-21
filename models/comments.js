const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    body:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_date:{
        type: DataTypes.DATE,
        allowNull: false,
        default: DataTypes.NOW
    },
    updated_date:{
        type: DataTypes.DATE,
        allowNull: false,
        default: DataTypes.NOW
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'posts',
  }
);

module.exports = Comments;