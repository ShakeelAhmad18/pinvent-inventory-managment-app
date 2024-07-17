const express=require('express')
const {registerUser, loginUser, logoutUser, getUser, loginStatus}=require('../controllers/userController');
const protecter = require('../middleWare/authMiddleware');

const router=express.Router();
//routes
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',logoutUser)
router.get('/getuser',protecter,getUser)
router.get('/loggedin',loginStatus)

module.exports=router; 