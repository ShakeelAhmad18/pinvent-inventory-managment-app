import axios from 'axios'


const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;

const API_URL=`${BACKEND_URL}/api/products/`

//Create A product
const createProduct=async (formData)=>{

    const res= await axios.post(API_URL,formData)
    
    return res.data;
    
}

//get allProducts

const getProdusts=async ()=>{
    const res=await axios.get(API_URL)

     return res.data
}

//delete Product

const deleteProduct=async (id)=>{
    const res=await axios.delete(API_URL + id)
    return res.data;
}

//get single product

const getProduct=async (id)=>{
    const res= await axios.get(API_URL + id)
    return res.data;
}

const updateProduct=async (id,formData)=>{
   const res=await axios.patch(`${API_URL}${id}`,formData)
   return res.data;
}


export const productServices={
   createProduct,
   getProdusts,
   deleteProduct,
   getProduct,
   updateProduct,
}