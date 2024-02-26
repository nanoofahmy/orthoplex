var bcrypt = require("bcryptjs");
const db = require('../models/index')
const {sequelize} = require('../config/db');
const User = require('../models/User');



const createUser = async (body) => {
   try {
    // const hashedPassword = bcrypt.hashSync (body.password,8)
    const newUser = await db.User.create({ email: body.email,password: body.password,username: body.username,phoneNumber: body.phoneNumber});
    // Exclude the password field from the user object
    const { password, ...userWithoutPassword } = newUser.toJSON();
    return userWithoutPassword;
  } catch (error) {
    return [false, 'Unable to sign up, Please try again later', error];
  }
};


module.exports= {
  createUser,

}