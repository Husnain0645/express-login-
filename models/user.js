const sequelize= require('sequelize');
const db = require ('../database/index');
const validator = require('validator');
const person = require('./person');
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
    role : {
      type: sequelize.STRING,
      enum : ['user' ,'admin'],
      default : 'user',

    },
    password: {
        type: sequelize.STRING,
        allowNull: false,
      },
  });
  db.sync({alter:true}).then(()=>{
    console.log('all models are created '); 
  });
  
  module.exports = User;