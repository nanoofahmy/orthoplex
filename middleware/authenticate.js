// middleware/authenticate.js

const jwt = require('jsonwebtoken');
const validator = require('validator');
const { User } = require('../models'); 

const authenticateUser = async (request, response, next) => {
  const token = request.headers['authorization'].split(" ")[1];
  if (!token) { return response.status(401).json({ message: 'Access denied. No token provided.' });}
  try {
    const { email, id } = jwt.verify(token, "NADIAFAHMY-1234$-DEVELOPMENT-orthoplex", "1h"); 
    const userExist = await User.findOne({ where: { email:email , id:id } });
    const decoded = jwt.verify(token, "NADIAFAHMY-1234$-DEVELOPMENT-orthoplex"); 
    request.user = userExist;
    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid token.' });
  }
};

// Validation function
const validateUserInput = ({ username, email, password , phoneNumber}) => {
  if (!username || !email || !password || !phoneNumber) {
    throw new Error('Name, email, phoneNumber and password are required');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Invalid email address');
  }
};

module.exports = {authenticateUser , validateUserInput};