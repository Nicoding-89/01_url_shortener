import React from 'react'
import '../styles/Header.css'

const Header = () => {
  return (
    <section className='container-fluid header'>
      <h1 className='header_title'>Welcome to the ultimate URL shortener!</h1>
      <p>
      Transform long and unwieldy URLs into short, shareable links in just a few clicks. Optimize character count and make your links more user-friendly. Short URLs are ideal for social media and enhance your professional appearance. They save valuable character space and simplify link sharing.
      </p>
    </section>
  )
}

export default Header