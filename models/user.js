const sequelize= require('sequelize');
const db = require ('../database/index');
const validator = require('validator');
const User = db.define("User", {
    fullName: {
      type: sequelize.STRING,
      require,
      allowNull: false,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
    },
    password: {
        type: sequelize.STRING,
        allowNull: false,
      },
    //   passwordConfirm: {
    //     type: String,
    //     required: [true, 'Please confirm your password'],
    //     validate: {
    //       // This only works on CREATE and SAVE!!!
    //       validator: function(el) {
    //         return el === this.password;
    //       },
    //       message: 'Passwords are not the same!'
    //     }
    // },
  });
  
  module.exports = User;