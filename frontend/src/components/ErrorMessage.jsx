import React from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import '../styles/ErrorMessage.css'

const ErrorMessage = () => {
  const location = useLocation();
  const errorData = location.state || {};  
  const navigate = useNavigate();

  return (
    <section className='error_page'>
      <div className='error container'>
        <p className='error_status'>{errorData.status || '404'}</p>
        <p className='error_name'>{errorData.error || 'Not found.'}</p>
        <p className='error_message'>{errorData.message || 'The requested resource could not be found.'}</p>
        {/* <NavLink to='/' className='go_back_link'>Click here to go back</NavLink> */}
        <button onClick={() => navigate(-1)} className='go_back_link'>Click here to go back</button>
      </div>
    </section>
  )
}

export default ErrorMessage
