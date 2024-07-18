const asyncHandler=require('express-async-handler')
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');

const contactUs=asyncHandler(async (req,res)=>{
   
    const {subject,message}=req.body

    const user=await User.findById(req.user._id);

    if(!user){
        res.status(404)
        throw new Error('User not Found,please signUp')
    }
     //validations
    if(!subject || !message){
        res.status.status(400).json('Add subject and message')
    }


    send_to=process.env.EMAIL_USER
    send_from=process.env.EMAIL_USER
    reply_to=user.email

    try {
        await sendEmail(subject,message,send_to,send_from,reply_to)
        res.status(200).json({success:true,message:"Email Sent"})

    } catch (error) {
        res.status(500)
        throw new Error('Email not Sent, Please try again')
    }



})

module.exports ={
    contactUs
}