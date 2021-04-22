const { Model, DataTypes, TEXT, INTEGER } = require('sequelize');
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
    title:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    post_text:{
      type: DataType.TEXT,
      allNull: false,
      validate:{
        len:[1]
      }
    },
    user_id: {
      type:DataTypes.INTEGER,
      refernces: {
        model:'user',
        key: 'id'
      }
    }
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