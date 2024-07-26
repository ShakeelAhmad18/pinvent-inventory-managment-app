import React, { useEffect, useState } from 'react'
import './Profile.scss'
import useRedirectLogoutUser from '../../customHook/useRedirectLogoutUser'
import { getUser } from '../../services/authServices'
import { useDispatch } from 'react-redux'
import { SET_NAME, SET_USER } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'

const Profile = () => {
  useRedirectLogoutUser('/login')
  const dispatch=useDispatch()
  const [profile,setProfile]=useState(null)
  const [isLoading,setIsLoading]=useState(false)

  useEffect(()=>{
  async function getUserData(){

      setIsLoading(true)
      const data=await getUser()
      console.log(data)
      setProfile(data)
      setIsLoading(false)
      dispatch(SET_USER(data))
      dispatch(SET_NAME(data.name))

  }

  getUserData()

  },[dispatch])

  return (
    <div className='profile --my2'>

      {isLoading && <Loader/>}
     <>
        {!isLoading && profile === null ? (
           <p>SomeThing went Wrong! please Reload the Page...</p>
        ) : (
          <Card cardClass={'card --flex-dir-column'}>
           { <span className='profile-photo'>      
               <img src={profile?.photo} alt='profilepic'/>
            </span> }
            <span className='profile-data'> 
              <p>
                <b>Name:</b> {profile?.name}
              </p>
              <p>
                <b>Email:</b> {profile?.email}
              </p>
              <p>
                <b>Phone:</b> {profile?.phone}
              </p>
              <p>
                <b>Bio:</b> {profile?.bio}
              </p>
              <div>
                <Link to='/edit-profile'> <button className='--btn --btn-primary'>Edit Profile</button> </Link>
            </div>
            </span>
          </Card>
        )}
     </>
    </div>
  )
}

export default Profile
