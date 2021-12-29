const sequelize= require('sequelize');
const db = require ('../database/index');
// const validator = require('validator');
const Person = db.define("human", {
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
    
  });
  
  module.exports = Person;