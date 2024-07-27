import React, { useState } from 'react'
import './ChangePassword.scss'
import { toast } from 'react-toastify'
import { changePassword } from '../../services/authServices'
import Card from '../card/Card'
import {useNavigate} from 'react-router-dom'



const initialState={
    oldPassword:'',
    password:'',
    password2:''
}

const ChangePassword = () => {

    const [formData,setFormData]=useState(initialState)
    const navigate=useNavigate()

const handleInputChange= (e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value})
}

const {oldPassword,password,password2}=formData


const chanPass=async (e)=>{
    e.preventDefault()

    if(password !== password2){
      toast.error('New Password Does not Change')
  }

    const formData={
        oldPassword,
        password
    }

    const data = await changePassword(formData)
    navigate('/profile')
    toast.success(data)
  
}
     
  return (
    <div className='change-password'>
      <Card cardClass={'password-card'}>
         <h3>Change Password</h3>
         <form onSubmit={chanPass} className='--form-control'>
           <input type='password' placeholder='Old Password' name='oldPassword' required  value={oldPassword} onChange={handleInputChange}/>
           <input type='password' placeholder='New Password' name='password' required  value={password} onChange={handleInputChange}/>
           <input type='password' placeholder='Confirm Password' name='password2' required value={password2} onChange={handleInputChange}/>
           <button type='submit' className='--btn --btn-primary'>Change Password</button>
         </form>
      </Card>
    </div>
  )
}

export default ChangePassword
