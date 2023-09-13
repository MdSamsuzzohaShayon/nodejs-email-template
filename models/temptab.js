'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class temptab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  temptab.init({
    make_id: {
      type: DataTypes.INTEGER,
    },
    active_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    embargo_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    bg_img: DataTypes.STRING,
    bg_color: DataTypes.STRING,
    link_color: DataTypes.STRING,
    layout: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    content: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    sibling: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'temptab',
  });
  return temptab;
};