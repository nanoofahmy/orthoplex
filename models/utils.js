var bcrypt = require("bcryptjs");


const hashPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hashSync(password, salt);
    resolve(hashedPassword)
  })
}
module.exports = {  hashPassword }


