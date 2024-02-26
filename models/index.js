const { sequelize, Sequelize } = require('../config/db');
const db={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.User= require('./User')(sequelize,Sequelize)

module.exports = db;