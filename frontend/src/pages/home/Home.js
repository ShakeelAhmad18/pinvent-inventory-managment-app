import React from 'react'
import { Link } from 'react-router-dom';
import './home.scss'
import { LiaProductHunt } from "react-icons/lia";
import heroImg from '../../assets/inv-img.png'
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/HiddenLink';

const Home = () => {
  return (
    <div className='home'>
      <nav className='container --flex-between'>
         <div className='logo'>
           <LiaProductHunt size={35}/> 
         </div>
         <ul className='home-links'>
          {/* This is when Show then user is logout*/}
          <ShowOnLogout>
           <li>
             <Link to='/register'>Register</Link>
           </li>
           <li>
            <button className='--btn --btn-primary'>
                <Link to='/login'>Login</Link>
            </button>
           </li>
           </ShowOnLogout>
         {/* This is when Show then user is login*/}
           <ShowOnLogin>
           <li>
             <button className='--btn --btn-primary'>
                  <Link to='/dashboard'>Dashboard</Link> 
             </button>
           </li>
           </ShowOnLogin>
          
         </ul>
      </nav>
      {/* Hero Section */}
       <section className='container hero'>
        <div className='hero-text'>
             <h2>Inventory & Stock Managment Solution</h2>
             <p>
                Inventory system to control and manage products in warehouse in real time and integrated to make it easier to develop your business.
             </p>
             <div className='hero-buttons'>
                <button className='--btn --btn-secondary'>
                  <Link to='/dashboard'>Free trial 1 month</Link>
                </button>
             </div>
             <div className='--flex-start'>
                <NumberText num='14K' text='Brand Onwers'/>
                <NumberText num='23K' text='Active Users'/>
                <NumberText num='500+' text='Partners'/>
             </div>
        </div>
        <div className='hero-image'>
           <img src={heroImg} alt='invertory' />
        </div>
       </section>
    </div>
  )
}

const NumberText=({num,text})=>{
    return(
        <div className='--mr'>
           <h3 className='--color-white'>{num}</h3>
           <p className='--color-white'>{text}</p>
        </div>
    )
}

export default Home
