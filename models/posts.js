const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {}

Posts.init(
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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = Posts;