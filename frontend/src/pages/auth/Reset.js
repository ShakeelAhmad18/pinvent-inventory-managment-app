import React, { useState } from 'react'
import Card from '../../components/card/Card'
import styles from './auth.module.scss'
import { MdPassword } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../services/authServices';

 const  initialState={
  password:'',
  password2:''
}

const Reset = () => {
   
  const [formData,setFormData]=useState(initialState)
  const resetToken=useParams()
  const {password,password2}=formData;

  const handleInputChnage=(e)=>{
    const {name,value}=e.target;

    setFormData({...formData,[name]:value})

  }

  const reset=async (e)=>{

    e.preventDefault();

    //validater

    if(password.length < 8){
      return toast.error('Password Must be 8 character')
    }

    if(password !== password2){
     return toast.error('Password does not match')
    }

   const userdata={
       password,
       password2
    }

    try {
      
      const data= await resetPassword(userdata,resetToken)
      toast.success(data.message)

    } catch (error) {
      toast.error(error.message)
    }

    

  }
  

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
          <MdPassword size={35} color='#999'/>
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={reset}>
            <input type='password' placeholder='New Password' required name='password' value={password} onChange={handleInputChnage}/>
            <input type='password' placeholder='Confirm New Password' required name='password2' value={password2} onChange={handleInputChnage}/>
            <button type='submit' className='--btn --btn-primary --btn-block' >Reset Password</button>
           <div className={styles.links}>
             <p>
             <Link to='/'>Home &larr;</Link>
             </p>
             <p>
             <Link to='/login'>&rarr; Login</Link>
             </p>
           </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default Reset

