import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './Signup.module.scss'
import { setUserInfo } from '../../redux/createSlice/userInfoSlice'
import { toast } from 'react-toastify';

function Signup() {

  const navigate = useNavigate()

  const dispatch=useDispatch()

  const displayTheme=useSelector((state)=>state.displayTheme)

  const [signupData,setSignupData]=useState({
    email:'',
    name:'',
    password:''
  })

  const handleChange=(e)=>{
    setSignupData(
      (prev) => ({...prev,
            [e.target.name]:e.target.value}))
  }

  const handleSubmission=async (e)=>{
    e.preventDefault()
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData),
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setUserInfo(data.user));
        navigate('/')
        toast.success('Logged in Successfully')
      } 
      else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
        toast.error('Signup failed. Try again')
      }
    }
    catch (err){
      console.error("Error submitting form:", err);
      toast.error('Signup failed. Try again')
    }
  }

  const handleGoogleSubmission = async (e)=>{
    try {const popup = window.open(`${import.meta.env.VITE_API_URL}/auth/google`,"_blank","width=500,height=600");

    const handleMessageEvent = async (e)=>{
      if (e.origin !== `${import.meta.env.VITE_API_URL}`) return;
      const response=e.data;
      if (response.success){
        dispatch(setUserInfo(response.user))
        navigate('/')
        toast.success('Logged in Successfully')
      }
      else{
        console.error('Signup failed:', response);
        toast.error('Signup failed. Try again')
      }
      window.removeEventListener('message',handleMessageEvent)
    }

    window.addEventListener('message',handleMessageEvent)}
    catch(err){
      console.error("Error Connecting to Google:", err);
      toast.error('Signup failed. Try again')
    }

  }

  return (
    <>
      <div className={`${styles['signup-page-container']} ${styles[displayTheme]}`}>
        <div className={`${styles['centered-container']} d-flex p-3 border border-2 rounded-3 border-secondary-subtle flex-column ${styles[displayTheme]} `}>
          <form onSubmit={handleSubmission}  method='POST'>

            <div className='email-field mb-3'>
              <label className='label-email-input form-label h6' htmlFor='emailInput'>Email</label>
              <input className='email-input form-control' id='emailInput' type='email' placeholder='email...' name="email" value={signupData.email} required onChange={handleChange}></input>
            </div>

            <div className='name-field mb-3 h6'>
              <label className='label-name-input form-label' htmlFor='nameInput'>Username</label>
              <input className='name-input form-control' id='nameInput' type='text' placeholder='name...' name="name" value={signupData.name} required onChange={handleChange}></input>
            </div>

            <div className='password-field mb-3 h6'>
              <label className='label-password-input form-label' htmlFor='passwordInput'>Enter Password</label>
              <input className='password-input form-control' id='passwordInput' type='password' placeholder='password' name="password" value={signupData.password} required onChange={handleChange}></input>
            </div>

            <div className='submit-field mt-5 mb-3 d-flex justify-content-center'>
              <button className={`submit-button btn w-50 border border-2 ${styles[displayTheme]}`} type='submit'>Continue</button>
            </div>

          </form>

          <div className="option d-flex justify-content-center align-items-center mt-3 mb-3">
            <div>OR</div>
          </div>

          <div className='google-auth-field mb-3 d-flex justify-content-center mt-3 mb-3'>
              <button type="button" className={`google-auth-btn mb-3 btn w-75 border border-2 ${styles[displayTheme]}`} onClick={handleGoogleSubmission}>Signup using Google</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Signup