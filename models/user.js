'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.hasMany(models.Course,   
      {foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    }
     );
    }
  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
        // add allowNull / validation messages for all 4
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notNull: {
        msg: 'Please enter your first name'
      }
    }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notNull: {
        msg: 'Please enter your last name'
      }
    }     
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notNull: {
        msg: 'Please enter your email'
      }
    }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notNull: {
        msg: 'Please enter your password'
      }
    }
    },

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};