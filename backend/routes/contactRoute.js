const express=require('express')
const { contactUs } = require('../controllers/contactController')
const protecter = require('../middleWare/authMiddleware')

const router=express.Router()

router.post('/',protecter,contactUs)


module.exports=router