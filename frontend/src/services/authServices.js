import axios from 'axios'
import { toast } from 'react-toastify'


export const BACKEND_URL=process.env.REACT_APP_BACKEND_URL

export const registerUser=async (userData)=>{

    try {
        
        const res= await axios.post(`${BACKEND_URL}/api/users/register`,userData,{withCredentials:true})

        if(res.statusText === 'OK'){
            toast.success('User Registered Successfully')
        }
    
        return res.data


    } catch (error) {
        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();

        toast.error(message)
    }

}

 export const loginUser= async (userData)=>{

    try {
        const res=await axios.post(`${BACKEND_URL}/api/users/login`,userData)
        if(res.statusText === 'OK'){
          toast.success('User Login successfull...')
        }

        return res.data;

    } catch (error) {
        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();

        toast.error(message)
    }
 }


 export const userLogout= async ()=>{
    try {
        
        const res=await axios.get(`${BACKEND_URL}/api/users/logout`)

        if(res.statusText === 'OK'){
            toast.success('Successfully Logout')
        }

        return res.data;

    } catch (error) {
        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();

        toast.error(message)
    }

 }