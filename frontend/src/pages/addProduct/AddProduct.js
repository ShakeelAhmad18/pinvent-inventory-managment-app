import React, { useState } from 'react'
import ProductForm from '../../components/productform/ProductForm'
import {useDispatch, useSelector} from 'react-redux'
import { createProduct, selectIsLoading } from '../../redux/features/product/productSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'




const initialState={
    name:'',
    category:'',
    quantity:'',
    price:''
}

const AddProduct = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [product,setProduct]=useState(initialState)
    const [productImage,setProductImage]=useState('');
    const [imagePreview,setImagePreview]=useState(null);
    const [description,setDiscription]=useState('')
    
  const isLoading=useSelector(selectIsLoading)

    const {name,category,quantity,price}  = product;

   function handleInputChange(e){
       const {name,value}=e.target;
       setProduct({...product,[name]:value})
    }

  function handleImageChange(e){
     setProductImage(e.target.files[0])
     setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const generateSKU=(category)=>{
   const title=category.slice(0,3).toUpperCase()
   const number=Date.now()
   const SKU=title + '-' + number

   return SKU
  }

  //Save product in DB

  const saveProduct=async (e)=>{
    e.preventDefault();
    const formData=new FormData()
     
    formData.append('name',name)
    formData.append('category',category)
    formData.append('quantity',quantity)
    formData.append('price',price)
    formData.append('description',description)
    formData.append('image',productImage)
    formData.append('sku',generateSKU(category))

    console.log(...formData)
    await dispatch(createProduct(formData))
    navigate('/dashboard')
  }


  return (
    <div>
      {isLoading && <Loader/>}
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

