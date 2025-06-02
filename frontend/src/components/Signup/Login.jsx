import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Signup.module.scss'

function Login() {

  const displayTheme=useSelector((state)=>state.displayTheme)


  const [loginData,setLoginData]=useState({
    email:'',
    password:''
  })

  const handleChange=(e)=>{
    setLoginData(
      (prev) => ({...prev,
            [e.target.name]:e.target.value}))
  }

  const handleSubmission=async (e)=>{
    e.preventDefault()
    try{
      const response = await fetch('http://localhost:8000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData),
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
      } 
      else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
      }
    }
    catch (err){
      console.error("Error submitting form:", err);
    }
  }

  const handleGoogleSubmission = async (e)=>{
    try {const popup = window.open('http://localhost:8000/auth/google',"_blank","width=500,height=600");

    const handleMessageEvent = async (e)=>{
      if (e.origin !== 'http://localhost:8000') return;
      const response=e.data;
      if (response.success){
        console.log("Success:", response);
      }
      else{
        console.error('Signup failed:', response);
      }
      window.removeEventListener('message',handleMessageEvent)
    }

    window.addEventListener('message',handleMessageEvent)}
    catch(err){
      console.error("Error Connecting to Google:", err);
    }

  }

  return (
    <>
          <div className={`${styles['signup-page-container']} ${styles[displayTheme]}`}>
            <div className={`${styles['centered-container']} d-flex p-3 border border-2 rounded-3 border-secondary-subtle flex-column ${styles[displayTheme]} `}>
              <form onSubmit={handleSubmission}  method='POST'>
    
                <div className='email-field mb-3'>
                  <label className='label-email-input form-label h6' htmlFor='emailInput'>Email</label>
                  <input className='email-input form-control' id='emailInput' type='email' placeholder='email...' name="email" value={loginData.email} required onChange={handleChange}></input>
                </div>
                  
                <div className='password-field mb-3 h6'>
                  <label className='label-password-input form-label' htmlFor='passwordInput'>Enter Password</label>
                  <input className='password-input form-control' id='passwordInput' type='password' placeholder='password' name="password" value={loginData.password} required onChange={handleChange}></input>
                </div>
    
                <div className='submit-field mt-5 mb-3 d-flex justify-content-center'>
                  <button className={`submit-button btn w-50 border border-2 ${styles[displayTheme]}`} type='submit'>Continue</button>
                </div>
    
              </form>
    
              <div className="option d-flex justify-content-center align-items-center mt-3 mb-3">
                <div>OR</div>
              </div>
    
              <div className='google-auth-field mb-3 d-flex justify-content-center mt-3 mb-3'>
                  <button type="button" className={`google-auth-btn mb-3 btn w-75 border border-2 ${styles[displayTheme]}`} onClick={handleGoogleSubmission}>Login using Google</button>
              </div>
    
            </div>
          </div>
        </>
  )
}

export default Login