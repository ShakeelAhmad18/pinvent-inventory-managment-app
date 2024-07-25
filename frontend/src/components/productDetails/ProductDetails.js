import React, { useEffect } from 'react'
import './ProductDetails.scss'
import useRedirectLogoutUser from '../../customHook/useRedirectLogoutUser'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectLoggedIn } from '../../redux/features/auth/authSlice'
import { getproducts } from '../../redux/features/product/productSlice'
import Card from '../card/Card'
import Loader from '../loader/Loader'
import DOMPurify from 'dompurify'

const ProductDetails = () => {
  useRedirectLogoutUser('/login')

  const isLoggedIn=useSelector(selectLoggedIn)
  const dispatch=useDispatch()
 const {id}= useParams()
  const {product,isLoading,isError,message}=useSelector((state)=>state.product)

  console.log(product)

  const stackStatus=(quantity)=>{
    if(quantity > 0){
     return <span className='--color-success'>In Stack</span>
    }else{
      return <span className='--color-danger'>Out of Stack</span>
    }
  }
 useEffect(()=>{
  if(isLoggedIn === true){
    dispatch( getproducts(id) )
  }

  if(isError){
    console.log(message)
  }

 },[dispatch,message,isError,isLoggedIn,id])


  return (
    <div className='product-detail'>
      <h3 className='--mt'>Product Detail</h3>
      <Card cardClass='card'>
        {console.log(product)}
         {isLoading && <Loader/>}
         {product && (
          <div className='detail'>
             <Card cardClass='group'>
                {product?.image ? (
                  <img src={product?.image.filePath} alt={product?.image.fileName} />
                ) : (<p>There is not Product with this product</p>)}

             </Card>
             <h4>Product Availibility: {stackStatus(product?.quantity)} </h4>
             <hr />
             <h4>
              <span className='badge'>Name:</span> &nbsp;{product?.name}
             </h4>
             <p>
              <b>&rarr;SKU:</b> {product.sku}
             </p>
             <p>
              <b>&rarr;Category:</b> {product?.category}
             </p>
             <p>
              <b>&rarr;Price:</b> {'$'}{product?.price}
             </p>
             <p>
              <b>&rarr;Quantity in Stack:</b> {product?.quantity}
             </p>
             <p>
              <b>&rarr;Total Value in Stack:</b> {'$'}{product?.quantity * product?.price}
             </p>
             <hr />
             <p><b>&rarr;Description:</b></p>
             <div dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product?.description)
             }}>
             </div>
             <hr />
             <code className='--color-dark'>CreatedAt:{product?.createdAt}</code> <br />
             <code className='--color-dark'>Last UpdatedAt:{product?.updatedAt}</code>
          </div>
         )}
      </Card>
    </div>
  )
}

export default ProductDetails
