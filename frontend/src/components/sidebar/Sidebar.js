import React, { useState } from 'react'
import './Sidebar.scss'
import {RiProductHuntLine} from 'react-icons/ri'
import {HiMenuAlt3} from 'react-icons/hi'
import menu from '../../data/sidebar'
import SidebarItem from './SidebarItem'
import { Link } from 'react-router-dom'

const Sidebar = ({children}) => {
  const [isOpen,setIsOpen]=useState(true)

  const toggle=()=>setIsOpen(!isOpen)

  return (
    <div className='layout'>
      <div className='sidebar' style={{width: isOpen ? '230px' : '60px'}}>
           <div className='top_section'>
              <div className='logo' style={{display: isOpen ? 'block' : 'none'}}>
                <Link to='/'> <RiProductHuntLine size={35} style={{cursor:'pointer'}}/> </Link>
              </div>
              <div className='bars' style={{marginLeft: isOpen ? '100px' : '0px'}}>
                  <HiMenuAlt3 style={{cursor:'pointer'}} onClick={toggle}/>
              </div>
           </div>
           {menu.map((item,index)=>{
            return ( <SidebarItem item={item} key={index} isOpen={isOpen}/> )
           }
          )}
      </div>
      <main style={{paddingLeft: isOpen ? '230px' : '60px',transition:"all 0.5s"}}>
        {children}
      </main>
    </div>
  )
}

export default Sidebar
