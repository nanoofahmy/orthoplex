const path = require('path');
const envFilePath = path.resolve(`./config/.env.${process.env.NODE_ENV}`);
require('dotenv').config({ path: envFilePath });
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  username: "postgres",
  password: "123456789",
  database: "orthoplex",
  host: "localhost",
  dialect: 'postgres',
  port: 5432,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  timestamps:true,
  logging: false,
  // timezone: '+02:00',
  dialectOptions: {
    useUTC: false, 
  },
  timezone: '+02:00', 
  pool: {
    max: 1000,
    min: 0,
    acquire: 1000000,
    idle: 650000
  }
});
module.exports = { sequelize, Sequelize }