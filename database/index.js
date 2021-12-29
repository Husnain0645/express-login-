const {Sequelize} =require ('sequelize');

const sequelize = new Sequelize('Logindb','postgres' , '111111' , {
    host: 'localhost',
    dialect: 'postgres',


}) ;
sequelize.sync();

(async () => {
    try {
      await db.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  })();
module.exports = sequelize;
