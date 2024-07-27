import React, { useState } from 'react'
import Card from '../../components/card/Card'
import './Contact.scss'
import { FaEnvelope, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import { GoLocation } from "react-icons/go";
import { toast } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../../services/authServices';

const Contact = () => {

    const [message,setMessage]=useState('')
    const [subject,setSubject]=useState('')

    const data={
        message,
        subject
    }

    const sendEmail=async (e)=>{
        e.preventDefault();
      try {
        
        const res=await axios.post(`${BACKEND_URL}/api/contactus`,data)
        console.log(res)
        setMessage('')
        setSubject('')
        toast.success(res.data.message)
        
      } catch (error) {
        toast.error(error.message)
      }
    }

  return (
    <div className='contact'>
        <h3 className='--mt'>Contact Us</h3>
       <div className='section'>
        <form onSubmit={sendEmail}>
          <Card cardClass='card'>
            <label>Subject</label>
            <input type='text' name='subject' value={subject} onChange={(e)=>setSubject(e.target.value)}/>
            <label>Message</label>
            <textarea name='message' value={message} cols='30' rows='10' onChange={(e)=>setMessage(e.target.value)}></textarea>
            <button className='--btn --btn-primary'>Send Email</button>
          </Card>
        </form>
        <div className='details'>
          <Card cardClass='card2'>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channel are listed below</p>
            <div className='icons'>
                 <span>
                    <FaPhoneAlt/>
                    <p>+92137483822</p>
                 </span>
                 <span>
                    <FaEnvelope/>
                    <p>support@gmail.com</p>
                 </span>
                 <span>
                    <GoLocation/>
                    <p>Sahiwal,Pakistan</p>
                 </span> 
                 <span>
                   <FaTwitter/>
                   <p>@Shakeel</p>
                 </span>
            </div>
          </Card>
        </div>
       </div>
    </div>
  )
}

export default Contact
