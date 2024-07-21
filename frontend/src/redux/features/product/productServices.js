import axios from 'axios'

const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;

const API_URL=`${BACKEND_URL}/api/products/`

//Create A product
const createProduct=async (formData)=>{

    const res= await axios.post(`${API_URL}`,formData)
    return res.data;
    
}

export const productServices={
   createProduct
}