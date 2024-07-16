const User = require("../models/userModel")
const asyncHandler=require('express-async-handler')
const bcrypt=require('bcryptjs')


const registerUser= asyncHandler(async (req,res)=>{
  const {name,email,password}=req.body;

  //validators
  if(!name || !email || !password){
    res.status(400)
    throw new Error('Please fill all fields')
  }
  
  //find email already exist or not
  const ExistEmail=await User.findOne({email})

  if(ExistEmail){
    res.status(400)
    throw new Error('Email Already Exist')
  }

  if(password.length < 6){
      res.status(400)
      throw new Error('Password must be up to 6 character')
  }

  //bycript the password

  const salt=await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(password,salt)

  //create user

  const user=await User.create({name,email,password:hashedPassword})
  
  if(user){
    const {_id,name,email,photo,phone,bio}=user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      photo,
      bio
    })
  }
  else{
     res.status(400)
     throw new Error('Invalid User Details')
  }

})

module.exports={
    registerUser
}