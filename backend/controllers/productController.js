const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { fileSizeFormatter } = require('../utils/fileUpload');
const couldinary=require('cloudinary').v2

const createProduct=asyncHandler( async (req,res)=>{

 const {name,category,sku,quantity,price,description}=req.body;

 if(!name || !category || !quantity || !price || !description){
    res.status(400)
    throw new Error('Please fill all fields')

 }

//handle Upload Image

let fileData={};
if(req.file){

  //save image to cloudinary
  let uploadFile;
  try {
    uploadFile=await couldinary.uploader.upload(req.file.path,{
        folder:"Pinvent App",resource_type:'image'
    })
  } catch (error) {
    res.status(500)
    throw new Error('Images could not be uploaded')
  }

    fileData = {
        fileName:req.file.originalname,
        filePath:uploadFile.secure_url,
        fileType:req.file.type,
        fileSize: fileSizeFormatter(req.file.size,2)
    }

}



//create product
 const product=await Product.create(
    {
        user:req.user.id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image:Object.keys(fileData).length === 0 ? 'there is error' : fileData,
    }
 )

 

  res.status(201).json(product)

} );

//get all products
const getProducts=asyncHandler( async (req,res)=>{
    const produts=await Product.find({user:req.user.id}).sort('-createdAt')
    res.status(200).json(produts)
} )

//get single product

const getSingleProduct=asyncHandler( async (req,res)=>{
    const { id } = req.params;
    
    const product=await Product.findById(id)
    //if product does not exist
    if(!product){
        res.status(404)
        throw new Error('Product not found')
    }

    //match the product to its user
    if(product.user.toString() !== req.user.id){
        res.status(401).json('Not authorized')
    }

    res.status(200).json(product)

} )

//delete the product

const deleteProduct=asyncHandler( async (req,res)=>{
    const product=await Product.findById(req.params.id)

    if(!product){
        res.status(404)
        throw new Error('Product not found')
    }

    if(product.user.toString() !== req.user.id){
        res.status(401).json('UnAuthorized user')
    }

    await product.deleteOne()
   res.status(200).json({message:"product Deleted"})
  
})

//updateproduct

const updateProduct=asyncHandler( async (req,res)=>{
    const {name,category,quantity,price,description}=req.body;
    const {id}=req.params;
   
    const product=await Product.findById(id)

   if(!product){
    res.status(404)
    throw new Error("product not found")
   }

   if(product.user.toString() !== req.user.id){
    res.status(401).json("user is Unauthorized")
   }

   //handle Upload Image
   
   let fileData={};
   if(req.file){
   
     //save image to cloudinary
     let uploadFile;
     try {
       uploadFile=await couldinary.uploader.upload(req.file.path,{
           folder:"Pinvent App",resource_type:'image'
       })
     } catch (error) {
       res.status(500)
       throw new Error('Images could not be uploaded')
     }
   
       fileData = {
           fileName:req.file.originalname,
           filePath:uploadFile.secure_url,
           fileType:req.file.type,
           fileSize: fileSizeFormatter(req.file.size,2)
       }
   
   }
   
   
   
   //Update product product
    const Updateproduct=await Product.findByIdAndUpdate({_id:id},
       {
           name,
           category,
           quantity,
           price,
           description,
           image:Object.keys(fileData).length === 0 ? product?.image : fileData,
       },
       {
        new:true,
        runValidators:true
       }
    )
   
    
   
     res.status(201).json(Updateproduct)
} )

module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
}