import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getLoginStatus } from '../services/authServices'
import { SET_LOGIN } from '../redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

 const useRedirectLogoutUser = (path) => {
     const dispatch=useDispatch()
     const navigate=useNavigate()

     useEffect(()=>{

        async function RedirectLogoutUser(){
           const isLoggedIn=await getLoginStatus()

           dispatch(SET_LOGIN(isLoggedIn))

           if(!isLoggedIn){
            toast.info('Session Expire,Please Login to continue')
             navigate(path)
             return
           }
        }
       
        RedirectLogoutUser()
     
      },[dispatch,path,navigate])
}

export default useRedirectLogoutUser
