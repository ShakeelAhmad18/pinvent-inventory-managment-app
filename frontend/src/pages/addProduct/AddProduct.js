import React, { useState } from 'react'
import ProductForm from '../../components/productform/ProductForm'
import {useDispatch, useSelector} from 'react-redux'
import { createProduct } from '../../redux/features/product/productSlice'
import { selectLoggedIn } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'



const initialState={
    name:'',
    catagory:'',
    quantity:'',
    price:''
}

const AddProduct = () => {
    const dispatch=useDispatch()

    const [product,setProduct]=useState(initialState)
    const [productImage,setProductImage]=useState('');
    const [imagePreview,setImagePreview]=useState(null);
    const [description,setDiscription]=useState('')
    
  const isLoading=useSelector(selectLoggedIn)

    const {name,catagory,quantity,price}  = product;

   function handleInputChange(e){
       const {name,value}=e.target;
       setProduct({...product,[name]:value})
    }

  function handleImageChange(e){
     setProductImage(e.target.files[0])
     setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const generateSKU=(catagory)=>{
   const title=catagory.slice(0,3).toUpperCase()
   const number=Date.now()
   const SKU=title + '-' + number

   return SKU
  }

  //Save product in DB

  const saveProduct=async (e)=>{
    e.preventDefault();
    const formData=new FormData()
     
    formData.append('name',name)
    formData.append('catagory',catagory)
    formData.append('quantity',quantity)
    formData.append('price',price)
    formData.append('description',description)
    formData.append('image',productImage)
    formData.append('sku',generateSKU(catagory))

    console.log(...formData)
    await dispatch(createProduct(formData))

  }


  return (
    <div>
      {/*isLoading && <Loader/>*/}
      <h3 className='--mt'>Add New Product</h3>
      <ProductForm
      product={product}
      imagePreview={imagePreview}
      productImage={productImage}
      saveProduct={saveProduct}
      generateSKU={generateSKU}
      description={description}
      setDiscription={setDiscription}
      handleImageChange={handleImageChange}
      handleInputChange={handleInputChange}
      />
    </div>
  )
}

export default AddProduct

