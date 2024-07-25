import React, { useEffect } from 'react'
import { AiFillDollarCircle } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import {BsCart4, BsCartX} from 'react-icons/bs'
import InfoBox from '../infoBox/InfoBox'
import './ProductSummary.scss'
import { useDispatch, useSelector } from 'react-redux'
import { cal_outOfStack, cal_store_value, selectCatogory, selectOutOfStack, selectTotalvalue,cal_category } from '../../redux/features/product/productSlice'


const earningIcon=<AiFillDollarCircle size={45} color='#fff'/>
const productIcon=<BsCart4 size={45} color='#fff'/>
const categoryIcon=<BiCategory size={45} color='#fff'/>
const outOfStackIcon=<BsCartX size={45} color='#fff'/>


export const formatNumbers=(x)=>{
    return x.toString().replace(/\B(?=(\d{3}))+(?!\d),/g,",");
}


const ProductSummary = ({product}) => {
    const dispatch=useDispatch()
    const storeTotalValue=useSelector(selectTotalvalue)
    const outofStack=useSelector(selectOutOfStack)
    const category=useSelector(selectCatogory)

    useEffect(()=>{
        dispatch(cal_store_value(product))
        dispatch(cal_outOfStack(product))
        dispatch(cal_category(product))
    },[dispatch,product])


    //format amount

 
  return (
    <div className='product-summary'>
      <h3 className='--mt'>Inventory Stats</h3>
      <div className='info-summary'>
        <InfoBox icon={productIcon} title={"Total Products"} 
        count={product.length} bgColor='card1'/>
        <InfoBox icon={earningIcon} title={'Total Store Value'} 
        count={`$${formatNumbers(storeTotalValue.toFixed(2))}`} bgColor='card2'/>
        <InfoBox icon={categoryIcon} title={"Categories"} 
        count={category.length} bgColor='card4'/>
        <InfoBox icon={outOfStackIcon} title={"Out of Stack"} 
        count={outofStack} bgColor='card3'/>
      </div>
    </div>
  )
}

export default ProductSummary
