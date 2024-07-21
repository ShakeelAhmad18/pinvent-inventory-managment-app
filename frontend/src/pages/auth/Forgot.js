import React, { useState } from 'react'
import Card from '../../components/card/Card'
import styles from './auth.module.scss'
import { AiOutlineMail } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services/authServices';
import { toast } from 'react-toastify';
import { validateEmail } from './Register';

const Forgot = () => {

  const [email,setEmail]=useState('')

  const forgot= async (e)=>{
    e.preventDefault();
     
    if(!email){
     return toast.error('Please Add Email')
    }

    if(!validateEmail(email)){
      return toast.error('Please add a valid Email')
    }

    const userdata={
      email
    }

      await forgotPassword(userdata)
      setEmail('')

  }

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
          <AiOutlineMail size={35} color='#999'/>
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={forgot}>
            <input type='text' placeholder='Email' required name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button type='submit' className='--btn --btn-primary --btn-block' >Get Reset Email</button>
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

export default Forgot
