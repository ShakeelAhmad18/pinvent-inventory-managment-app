import React, { useEffect, useState } from 'react'
import './Profile.scss'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/auth/authSlice'
import Card from '../../components/card/Card'
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateUser } from '../../services/authServices'
import ChangePassword from '../../components/changepassword/ChangePassword'


const EditProfile = () => {
    const navigate=useNavigate()
   const [isLoading,setIsLoading]=useState(false)
   const user=useSelector(selectUser)

   const {email}=user;

   useEffect(()=>{
    if(!email){
      navigate('/profile')
    }
   },[email,navigate])

   const initialState={
    name:user?.name,
    email:user?.email,
    phone:user?.phone,
    photo:user?.photo,
    bio:user?.bio
   }

   const [profile,setProfile]=useState(initialState)
   const [imageProfile,setImageProfile]=useState()

   const handleInputChange=(e)=>{
     const {name,value}=e.target
     setProfile({...profile,[name]:value})
   }

 const  handleImageChange=(e)=>{
    setImageProfile(e.target.files[0])
   }

   const saveProfile = async (e) => {
    e.preventDefault();

    try {
        setIsLoading(true);
        let imageUrl;
        if (imageProfile && (imageProfile.type === 'image/jpg' || imageProfile.type === 'image/jpeg' || imageProfile.type === 'image/png')) {
            const image = new FormData();
            image.append('file', imageProfile);
            image.append('cloud_name', 'dqf992hcs');
            image.append('upload_preset', "liazfctb");

            const res = await fetch('https://api.cloudinary.com/v1_1/dqf992hcs/image/upload', {
                method: "post",
                body: image // Correctly append the FormData object
            });

            if (!res.ok) {
                throw new Error('Image upload failed');
            }

            const imgData = await res.json();
            console.log(imgData); // Log the full response to understand its structure

            if (imgData.url) {
                imageUrl = imgData.url.toString();
                toast.success('Image Successfully Uploaded');
            } else {
                throw new Error('Image URL not found in response');
            }
        }

        //save Data
        const formData={
            name:profile.name,
            phone:profile.phone,
            photo:imageProfile ? imageUrl  : profile.photo,
            bio:profile.bio
        }


        const data=await updateUser(formData)
        console.log(data)
        navigate('/profile')
        toast.success('User Updated')


    } catch (error) {
        console.error(error); // Log the error to debug if necessary
        toast.error(error.message);
    } finally {
        setIsLoading(false);
    }

   
};

  return (
    <div className='profile --my2'>
        <h4>Edit Profile</h4>
      {isLoading && <Loader/>}
     <>
        {!isLoading && profile === null ? (
           <p>SomeThing went Wrong! please Reload the Page...</p>
        ) : (
          <Card cardClass={'card --flex-dir-column'}>
            <form className='--form-control --m' onSubmit={saveProfile}>
            <span className='profile-data'>
              <p>
                <label>Photo:</label>
                <img src={profile?.photo} alt='profilepic'/>
              </p> 
              <p>
                <label>Name:</label>
                <input type='text' name='name' value={profile?.name} onChange={handleInputChange}/>
              </p>
              <p>
                <label>Email:</label>
               <input type='email' name='email' value={profile?.email} onChange={handleInputChange} disabled/>
               <code>Email do not Change</code>
              </p>
              <p>
                <label>Phone:</label>
                <input type='text' name='phone' value={profile?.phone} onChange={handleInputChange}/>
              </p>
              <p>
                <label>Bio:</label><br/>
               <textarea name='bio' value={profile?.bio} onChange={handleInputChange} cols='30' rows='10' />
              </p>
              <p>
                <label>Photo:</label>
                <input type='file' name='photo'  onChange={handleImageChange}/>
              </p>
              <div>
                <button className='--btn --btn-primary'>Update Profile</button>
             </div>
            </span>
            </form>
          </Card>
        )}
         <br/>
         <ChangePassword/>
     </>
    </div>
  )
}

export default EditProfile
