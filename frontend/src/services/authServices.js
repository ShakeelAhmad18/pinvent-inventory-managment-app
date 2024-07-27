//import { asyncThunkCreator } from '@reduxjs/toolkit'
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
//forgot passowrd
 export const forgotPassword= async (userdata)=>{
    try {
        const res=await axios.post(`${BACKEND_URL}/api/users/forgotpassword`,userdata)

           toast.success(res.data.message)
           return res.data

    } catch (error) {
         const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
        toast.error(message)
    }
 }

 //reset Password

  export const resetPassword=async (userdata,resetToken)=>{
    

    try {

        const res=await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`,userdata);
        
        return res.data;

    } catch (error) {
        
        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
        toast.error(message)
    }

 }

 // get login Status

export const getLoginStatus=async ()=>{

    try {
        const res= await axios.get(`${BACKEND_URL}/api/users/loggedin`)

        return res.data;
    } catch (error) {
        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
        toast.error(message)
    }


 }

 // get User

 export const getUser=async ()=>{
    try {
        
     const res=await axios.get(`${BACKEND_URL}/api/users/getuser`)
      return res.data
      
    } catch (error) {
        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
        toast.error(message)
    }
 }

 //update the User

 export const updateUser=async (formData)=>{
    try {
        
      const res=await axios.patch(`${BACKEND_URL}/api/users/updateuser`,formData)
      return res.data;

    } catch (error) {
        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
        toast.error(message)
    }

 }

 //Chnage password

 export const changePassword=async (formData)=>{
    try {

        const res=await axios.patch(`${BACKEND_URL}/api/users/changepassword`,formData)
        return res.data;
        
    } catch (error) {
        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
        toast.error(message)
    }
 }