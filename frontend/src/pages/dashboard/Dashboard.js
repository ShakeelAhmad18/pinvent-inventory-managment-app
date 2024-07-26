import React, { useEffect } from 'react'
import useRedirectLogoutUser from '../../customHook/useRedirectLogoutUser'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedIn } from '../../redux/features/auth/authSlice'
import { getProduct } from '../../redux/features/product/productSlice'
import ProductList from '../../components/productform/ProductList'
import ProductSummary from '../../components/productSummary/ProductSummary'

const Dashboard = () => {
  const dispatch=useDispatch()
  useRedirectLogoutUser('/login')

  const isLoggedIn=useSelector(selectLoggedIn)
  const {isLoading,message,isError}= useSelector((state)=>state.product)
  
  const products=useSelector((state)=>state.product.products)
  
  useEffect(()=>{

   if(isLoggedIn === true){
    dispatch( getProduct() )
   }

   if(isError){
    console.log(message)
   }

  },[dispatch,isError,isLoggedIn,message])

  return (
    <div>
     <ProductSummary product={products} />
      <ProductList products={products} isLoading={isLoading}/>
    </div>
  )
}

export default Dashboard
