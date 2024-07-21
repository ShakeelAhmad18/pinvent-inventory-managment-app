import { useSelector } from "react-redux"
import { selectLoggedIn } from "../../redux/features/auth/authSlice"
//import { Children } from "react"


export const ShowOnLogin = ({children}) => {

  const isLoggedIn=  useSelector(selectLoggedIn)

  if(isLoggedIn){
    return <>
       {children}
    </>
  } return null;
    
  }

 


export const ShowOnLogout=({children})=>{
     const isLoggedIn=useSelector(selectLoggedIn)

    if(!isLoggedIn){
    return    <>
        {children}
        </>
    }
    return null

}
