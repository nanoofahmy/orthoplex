const express = require('express');
const router = express.Router();
const  {authenticateUser} = require('../middleware/authenticate');
const controller = require('../controllers/user')


router.post('/signup',  controller.signup)
router.post('/login'  , controller.login)
router.put('/updateUser/:id(\\d*)?' ,authenticateUser , controller.updateUser)
router.delete('/deleteUser/:id(\\d*)?' ,authenticateUser , controller.deleteUser)
router.get('/getAllUser' ,authenticateUser , controller.getAllUser)
router.get('/getAllUserById/:id(\\d*)?' ,authenticateUser , controller.getAllUserById)


 module.exports = router