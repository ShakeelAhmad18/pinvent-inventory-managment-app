import React from 'react'
import Card from '../../components/card/Card'
import styles from './auth.module.scss'
import { AiOutlineMail } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Forgot = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
          <AiOutlineMail size={35} color='#999'/>
          </div>
          <h2>Forgot Password</h2>
          <form>
            <input type='text' placeholder='Email' required name='email'/>
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
