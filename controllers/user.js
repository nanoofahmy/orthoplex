const db = require('../models/index')
const {sequelize} = require('../config/db');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {createUser   } = require('../middleware/index')
const {UnexpectedError}= require('../utils/Error')
const {validateUserInput}= require('../middleware/authenticate')
const {register , login}= require('../validator/validateData')

exports.signup = async function (request, response, next) { 
    try {
        const { error, value } = register.validate(request.body, { abortEarly: false});
        if (error) { return response.send("Invalid Request: " + JSON.stringify(error));}
        // validateUserInput (request.body)
        const {  username , phoneNumber ,  password , email } = request.body;
        const userExist = await db.User.findOne({ where: { email:email , phoneNumber:phoneNumber } });  
        if (userExist) { return response.status(409).json({ message: 'email already exists' });} 
        const phoneExist = await db.User.findOne({ where: { phoneNumber:phoneNumber } });  
        if (phoneExist) { return response.status(409).json({ message: 'phone already exists' });} 
        const user = await createUser(request.body)
        const token = jwt.sign({ id: user.id   , email },"NADIAFAHMY-1234$-DEVELOPMENT-orthoplex",{expiresIn: "1h", })
        response.status(201).json({ data :user , token , message: 'create user successfully' });     
      } catch (error) {
        console.log("🚀 ~ file: user.js:17 ~ error:", error)
        if (error.httpStatus == 400 ||error.httpStatus == 404) return next(error)
      return next(new UnexpectedError())
      }  
}

exports.login = async function (request, response, next) {  
  try {
    const { error, value } = login.validate(request.body, { abortEarly: false});
    if (error) { return response.send("Invalid Request: " + JSON.stringify(error));}
    const { email, password  } = request.body;
    const user = await db.User.findOne({ where: { email:email  } });
    if (!user) { return response.status(401).json({ message: 'Invalid email' });}
    var passwordIsValid = bcrypt.compareSync(password,user.password);
    if (passwordIsValid === false) { return response.status(401).send({ message: "Invalid Password!" });}
    const token = jwt.sign({ id: user.id , email  },"NADIAFAHMY-1234$-DEVELOPMENT-orthoplex",{expiresIn: "1h", })
    response.status(200).json({ phoneNumber :user.phoneNumber ,token ,message: 'User login successfully' });          
    } 
     catch (error) {
        console.error('Error searching for user:', error);
        if (error.httpStatus == 400 ||error.httpStatus == 404) return next(error)
        return next(new UnexpectedError(error))
      }
}

exports.updateUser =  async function (request, response, next) { 
    try{
    const {id} = request.params 
    const userId = parseInt(id, 10);
    const User = await db.User.findOne({ where: { id:userId   } }); 
    if (User === null) {return response.status(404).json({ message: 'user not found' });}
    let  FieldsToUpdate = {};
    const {username , email ,password } = request.body;
    FieldsToUpdate = username ? { ...FieldsToUpdate, username } : FieldsToUpdate
    FieldsToUpdate = email ? { ...FieldsToUpdate, email } : FieldsToUpdate
    FieldsToUpdate = password ? { ...FieldsToUpdate, password } : FieldsToUpdate
    await User.update(FieldsToUpdate)
    await User.save()   
    response.status(201).json({ data :FieldsToUpdate  , message: 'updated User' });     
      } catch (error) {
        console.log(error)
        if (error.httpStatus == 400 ||error.httpStatus == 404) return next(error)
      return next(new UnexpectedError())
      }
    };

exports.deleteUser= async (request, response , next) => {
        try {
            const {id} = request.params 
            const userId = parseInt(id, 10);
            const User = await db.User.findOne({ where: { id:userId   } }); 
          if (User === null) {return response.status(404).json({ message: 'user not found' });}
            await db.User.destroy({ where: { id: User.id } })
            response.status(204).json({  message: 'deleted User' });    
        } catch (error) {
          if (error.httpStatus == 404 ) return next(error)
          console.error(error);
          response.status(500).json({ message: 'Internal server error' });
        }
      };
exports.getAllUser = async (request, response) => {
        try {
          const page = request.query.page || 1;
          const perPage = request.query.perPage || 10;
          let data = {}
          const User =  await db.User.findAll({
            limit: perPage,
            offset: (page - 1) * perPage, })
          data.User = User
          
          response.status(200).json({  data: data });    
        } catch (error) {
          console.error(error);
          response.status(500).json({ message: 'Internal server error' });
        }
      };
exports.getAllUserById = async (request, response , next) => {
        try {
          let data = {}
          const {id} = request.params 
          const userId = parseInt(id, 10);
          const User = await db.User.findOne({ where: { id:userId   } }); 
          if (User === null) {return response.status(404).json({ message: 'user not found' });}
          data.User = User
          response.status(200).json({  data: data });    
        } catch (error) {
          if (error.httpStatus == 404 ) return next(error)
          console.error(error);
          response.status(500).json({ message: 'Internal server error' });
        }
      };