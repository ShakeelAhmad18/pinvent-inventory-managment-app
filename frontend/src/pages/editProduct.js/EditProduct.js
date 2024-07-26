import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {getproducts, selectIsLoading, selectProduct, updateProduct } from '../../redux/features/product/productSlice'
import Loader from '../../components/loader/Loader'
import ProductForm from '../../components/productform/ProductForm'

const EditProduct = () => {
    const {id}=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const editProduct=useSelector(selectProduct)
    const isLoading =useSelector(selectIsLoading)

    const [product,setProduct]=useState(editProduct)
    const [productImage,setProductImage]=useState('');
    const [imagePreview,setImagePreview]=useState(null);
    const [description,setDiscription]=useState('')

    

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
  return SKU;
 }

    useEffect(()=>{
      dispatch(getproducts())
    },[dispatch,id])


    useEffect(() => {
      dispatch(getproducts(id));
    }, [dispatch,id]);
  
    useEffect(() => {
      if (editProduct) {
        setProduct(editProduct);
        setImagePreview(editProduct.image ? editProduct.image.filePath : null);
        setDiscription(editProduct.description || '');
      }
    }, [editProduct, id]);
    console.log(description)


    const saveProduct=async (e)=>{
      e.preventDefault();
      const formData=new FormData()
       
      formData.append('name',product?.name)
      formData.append('category',product?.category)
      formData.append('quantity',product?.quantity)
      formData.append('price',product?.price)
      formData.append('description',description)
      if(productImage){
        formData.append('image',productImage)
      }
      formData.append('sku',generateSKU(product?.category))
      await dispatch(updateProduct({id,formData}))
      navigate('/dashboard')
    }
  

  return (
    <div>
    {isLoading && <Loader/>}
    <h3 className='--mt'>Edit a Product</h3>
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

export default EditProduct
