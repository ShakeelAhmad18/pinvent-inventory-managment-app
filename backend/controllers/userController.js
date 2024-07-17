const User = require("../models/userModel")
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TWT_SECRET, { expiresIn: "1d" })
}

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validators
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please fill all fields')
  }

  //find email already exist or not
  const ExistEmail = await User.findOne({ email })

  if (ExistEmail) {
    res.status(400)
    throw new Error('Email Already Exist')
  }

  if (password.length < 6) {
    res.status(400)
    throw new Error('Password must be up to 6 character')
  }





  //create user

  const user = await User.create({ name, email, password })


  //generate Jwt Token 
  const token = generateToken(user._id)


  res.cookie("token", token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),// 1 Day
    sameSite: "none",
    secure: true
  })

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      photo,
      bio,
      token,
    })
  }
  else {
    res.status(400)
    throw new Error('Invalid User Details')
  }

})


const loginUser=asyncHandler( async (req,res)=>{
  const {email,password}=req.body;

  //validate request
  if(!email || !password){
    res.send(400)
    throw new Error('Enter Email and Password')
  }

//find user exist
const user=await User.findOne({email});



if(!user){
  res.status(400)
  throw new Error('User not found,Please SignUp')
}

//token generate
const token=generateToken(user._id)

//check password
const passwordIsCorrect=await bcrypt.compare(password,user.password)

if(passwordIsCorrect){

//send HTTP-only cookie
  res.cookie("token",token,{
    path:'/',
    httpOnly:true,
    expires:new Date(Date.now() + 1000 * 86400), //1 day
    sameSite:'none',
    secure:true
  })
}

if(user && passwordIsCorrect){
  const {_id,name,email,phone,photo,bio}=user;
  res.status(201).json(
    {
      _id,
      name,
      email,
      phone,
      photo,
      bio,
      token
    }
  )
}else{
  res.status(400)
  throw new Error('Invalid Details')
}
})


//logout user

const logoutUser=asyncHandler( async (req,res)=>{
    res.cookie('token','',{
      path:'/',
      httpOnly:true,
      expires:new Date(0),
      sameSite:"none",
      secure:true
    })

    return res.status(200).json({message:'Successfully Logout'})
} )


//get userv data

const getUser=asyncHandler( async (req,res)=>{
  const user=await User.findById(req.user._id)

  if(user){

    const {_id,name,email,phone,photo,bio}=user
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      photo,
      bio
    })

    }else{
      res.status(401)
      throw new Error('Invlid details')
    }

} )


//check the login status
const loginStatus=asyncHandler( async (req,res)=>{
   const token= req.cookies.token;
   
   if(!token){
    return res.json(false)
   }

   //verified the token
   const verified=jwt.verify(token,process.env.TWT_SECRET);
   if(verified){
    return res.json(true)
   }
   return res.json(false)

} )
 
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
}