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
    comment_text:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id:{
        type: DataTypes.DATE,
        references: {
          model: 'User',
          key: 'id'
        }
    },
    post_id:{
      type: DataTypes.DATE,
      references: {
        model: 'post',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comments;