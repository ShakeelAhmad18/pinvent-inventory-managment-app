import React from 'react'
import './Loader.scss'
import ReactDOM from 'react-dom'
import LoaderImg from '../../assets/loader.gif'

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
        <div className='loader'>
          <img src={LoaderImg} alt="loader" />
        </div>
    </div>,
    document.getElementById('loader')
  )
}

 export const spinnerImage=()=>{
    return (
        <div className='--center-all'>
          <img src={LoaderImg} alt="loader" />
        </div>
    )
 }


export default Loader
