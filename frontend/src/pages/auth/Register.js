import React, { useState } from 'react'
import Card from '../../components/card/Card'
import styles from './auth.module.scss'
import { TiUserAddOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/authServices';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {SET_LOGIN, SET_NAME} from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader';


export const validateEmail=(email)=> {
 return email.match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}


const initialState={
  name:'',
  email:'',
  password:'',
  password2:''
}

const Register = () => {
  const [isLoading,setIsLoading]=useState(false)
  const [formData,setFormData]=useState(initialState)
  const dispatch=useDispatch();
  const navigate=useNavigate()

  const {name,email,password,password2}=formData;

  const handleInputChange=(e)=>{
     const {name,value}=e.target;

    setFormData({...formData,[name]:value})
  }


const register=async (e)=>{
    e.preventDefault();

    if(!name || !password || !email){
     return toast.error('Please Fill all fields')
    }

   if(password.length < 8){
     return toast.error('Password must be 8 character')
   }

    if(password !== password2){
     return toast.error('Password Does not Match')
    }

    if(!validateEmail(email)){
     return toast.error('Please Enter Valid Email')
    }

    const userData={
      name,email,password
    }

    setIsLoading(true)
    try {
      
     const data= await registerUser(userData)
     await dispatch(SET_LOGIN(true))
     await dispatch(SET_NAME(data.name))
     navigate('/dashboard')

      setIsLoading(false)
      setFormData({
        name:'',
        email:'',
        password:'',
        password2:''
      })
    } catch (error) {
       console.log(error.message)
    }

}


  return (
    <div className={`container ${styles.auth}`}>

     {isLoading && <Loader/>}

      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
          <TiUserAddOutline size={35} color='#999'/>
          </div>
          <h2>Register</h2>
          <form onSubmit={register}>
          <input type='text' placeholder='Enter Name' required name='name' value={name} onChange={handleInputChange} />
            <input type='email' placeholder='Email' required name='email' value={email} onChange={handleInputChange}/>
            <input type='password' placeholder='Enter Password' required name='password' value={password} onChange={handleInputChange}/>
            <input type='password' placeholder='Confirm Password' required name='password2' value={password2} onChange={handleInputChange}/>
            <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
          </form>
          <span className={styles.register}>
            <Link to='/'>Home&larr;</Link>
             <p>&nbsp; Already have an account? &nbsp;</p> 
            <Link to='/login'>&rarr;Login</Link>
          </span>
        </div>
      </Card>
    </div>
  )
}

export default Register

