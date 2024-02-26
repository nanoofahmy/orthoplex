const { DataTypes  } = require("sequelize");
const { hashPassword } = require('./utils')

  module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
      id: {
        type:  DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      }
        ,
        phoneNumber: {
            type: DataTypes.STRING(14),
            required: true,
            unique: true
          },
          email: {
            type: DataTypes.STRING(50),
            required: true,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          password: {
            type: DataTypes.STRING,
            required: true,
          },
          createdAt: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.fn('NOW'),
          },
          updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.fn('NOW'),
          },
     },
      { freezeTableName: true, timestamps: true });

      User.beforeCreate(async (user) => {
        //Hashed password
        const hashedPassword = await hashPassword(user.password)
        user.password = hashedPassword;
    
      })

    
      return User;
}