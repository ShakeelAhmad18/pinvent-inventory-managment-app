import React from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { userLogout } from '../../services/authServices'
import SET_LOGIN from '../../redux/features/auth/authSlice'
//import { Link } from 'react-router-dom'

const Header = () => {

 const dispatch=useDispatch()
 const navigate=useNavigate()

 const logout= async ()=>{
 await userLogout()
 await dispatch(SET_LOGIN(false))
 navigate('/login')

 }
  
  return (
    <div className='--pad header'>
        <div className='--flex-between'>
           <h3 className='--fw-thin'>
              <span className='--fw-thin'>Welcome,</span>
              <span className='--color-danger'>Shakeel</span>
           </h3>
          <button className='--btn --btn-danger' onClick={logout}>Logout</button>
        </div>
        <hr />
    </div>
  )
}

export default Header
