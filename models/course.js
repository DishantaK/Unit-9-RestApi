'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

     // userID association here
     Course.belongsTo(models.User
      , {foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    }
    );
    }
  };
  Course.init({
  
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notNull: {
        msg: 'Please enter a course title'
      }
    }
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notNull: {
        msg: 'Please enter a description'
      }
    }
    },
    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING,
     // add allowNull / validation messages for title and description

  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};