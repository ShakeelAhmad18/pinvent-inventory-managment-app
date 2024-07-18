const express=require('express')
const {registerUser, loginUser, logoutUser, getUser, loginStatus, updateUser, changePassword, forgotPassword, resetPassword}=require('../controllers/userController');
const protecter = require('../middleWare/authMiddleware');

const router=express.Router();
//routes
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',logoutUser)
router.get('/getuser',protecter,getUser)
router.get('/loggedin',loginStatus)
router.patch('/updateUser',protecter,updateUser)
router.patch('/changepassword',protecter,changePassword)
router.post('/forgotpassword',forgotPassword)
router.put('/resetpassword/:resetToken',resetPassword)

module.exports=router; 