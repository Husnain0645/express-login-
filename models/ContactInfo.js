const sequelize= require('sequelize');
const db = require ('../database/index');
// const validator = require('validator');
const ContactInfo = db.define("ContactInfo", {
    phone : {
      type: sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: sequelize.STRING,
      allowNull: false,
    },
  });
  
  module.exports = ContactInfo;