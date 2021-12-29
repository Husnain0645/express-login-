const sequelize= require('sequelize');
const db = require ('../database/index');
const validator = require('validator');
const Person = db.define("person", {
    fullName: {
      type: sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
    },
    password: {
        type: sequelize.STRING,
        
      },
      passwordConfirm: {
        type: String,
        allowNull: false,
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function(el) {
            return el === this.password;
          },
          message: 'Passwords are not the same!'
        }
    },
  });
  
  module.exports = User;