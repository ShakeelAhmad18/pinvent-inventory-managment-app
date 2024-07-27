const User = require("../models/userModel")
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto=require('crypto')
const tokens = require("../models/tokenModel")
const sendEmail = require("../utils/sendEmail")



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


//Create a user
  const user = await User.create({
    name,
    email,
    password,
  });

  //   Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


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


const updateUser=asyncHandler( async (req,res)=>{

  const user=await User.findById(req.user._id)

  if(user){
     const {name,email,photo,phone,bio}=user;
     
     user.name= req.body.name || name;
     user.email=email;
     user.photo=req.body.photo || photo;
     user.phone=req.body.phone || phone;
     user.bio=req.body.bio || bio;
  }

  const updateUser=await user.save()

  res.status(200).json({
    _id:updateUser._id,
    name:updateUser.name,
    photo:updateUser.photo,
    phone:updateUser.phone,
    bio:updateUser.bio
  })

})

//change password

const changePassword=asyncHandler( async (req,res)=>{

   const user= await User.findById(req.user._id)
   const {oldPassword,password}=req.body;

   if(!user){
    res.status(400).json('User not found,please signup')
   }


   if(!oldPassword || !password){
    res.status(400).json('Please add Old Password and New Password')
   }

   //check the old password is correct

   const passwordIsCorrect= await bcrypt.compare(oldPassword,user.password)

   if(user && passwordIsCorrect){

      user.password=password
      await user.save()
      res.status(200).json('Password Successfully Change')
   }else{
    res.status(400).json('old Password incorrect')
   }

} )

const forgotPassword=asyncHandler( async (req,res)=>{
   const {email}=req.body;

   const user=await User.findOne({email})
   if(!user){
    res.status(404)
    throw new Error("User deos not exist")
   }

   //delete token if exist

   let Token=await token.findOne({userId: user._id})

   if(Token){
    await token.deleteOne()
   }

   //Create reset Token

   let resetToken= crypto.randomBytes(32).toString('hex') + user._id;
   console.log(resetToken)
   //hashed token before saving to the DB

   const hashedToken=crypto.createHash('sha256').update(resetToken).digest("hex")
// save Token to DB

   await new token({
    userId:user._id,
    token:hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000) //30 minutes
   }).save()

   //construct reset url

   const reseturl=`${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

   //reset Email 

   const message=`
     <h1> Hello ${user.name} </h1>

     <p>Please use the below url to reset the password</p>
     <p> This url is valid for 30 minutes </p>

     <a href=${reseturl} clicktracking=off>${reseturl}</a>

     <p>Best Regards</p>
     <p>Pinvent team</p>
   `

   const subject="forgot password"
   const send_to=user.email;
   const send_from=process.env.EMAIL_USER;

   try {
    
    await sendEmail({message,subject,send_to,send_from})

    res.status(200).json({success:true,message:"Reset Email Sent"})

   } catch (error) {
    res.status(500)
    throw new Error("Reset Email deos not send, Please try again")
   }
   
} )

//Reset password



// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token, then compare to Token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // fIND tOKEN in DB
  const userToken = await tokens.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find user
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  res.status(200).json({
    message: "Password Reset Successful, Please Login",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
}