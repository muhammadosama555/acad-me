import React, { useRef } from 'react'
import { LockOutlined, VisibilityOutlined, ArrowBackIos } from '@mui/icons-material';
import { Link, useLocation } from "react-router-dom"
import { useGenerateOtp, useGeneratePassword } from '../apiCalls/userApiCalls';

export default function ForgetPassword() {

  const resetTokenInputElement = useRef();
  const emailInputElement = useRef();
  const passwordInputElement = useRef();


  const { mutate: generatePasswordMutate, isLoading: isGeneratePasswordLoading, isError: isGeneratePasswordError, error: generatePasswordError, } = useGeneratePassword();
  const { mutate: generateOtpMutate, isLoading: isGenerateOtpLoading, isError: isGenerateOtpError, error: generateOtpError, } = useGenerateOtp();


  const handleGeneratePassword = (event) => {
    event.preventDefault();
    const data = {
      resetToken: resetTokenInputElement.current?.value,
      email: emailInputElement.current?.value,
      password: passwordInputElement.current?.value,

    };


    generatePasswordMutate(data);

  };

  const handleGenerateOtp = (event) => {
    event.preventDefault();
    const data = {
      email: emailInputElement.current?.value,

    };
    generateOtpMutate(data)
  }

  return (
    <>
      <div className='flex w-full items-center justify-center'>
        <div className='mx-6 md:mx-32 lg:mx-44 xl:mx-64 mt-6 w-full lg:max-w-xl'>
          <div className="fixed lg:left-20 xl:left-32 mt-2 hidden lg:flex lg:items-center lg:justify-center items-center justify-center w-10 h-10 rounded-full bg-white shadow btn-shadow hover:shadow-s, hover:bg-stone-50 transition-colors">
            <button
              onClick={() => window.history.back()}
              className="w-full h-full rounded-full flex items-center justify-center">
              <ArrowBackIos style={{ fontSize: 24, paddingLeft: 6, color: 'gray', }} />
            </button>
          </div>
          <div className='flex justify-center '>
            <Link to="/">
              <img src="images/logo.png" alt="" className='w-44' />
            </Link>
          </div>
          <h1 className='text-center text-xl md:text-2xl font-bold text-transparent bg-gradient-to-b from-[#E78200] to-[#000000] bg-clip-text'>Reset Password</h1>
          <form className='pt-5 pb-8'>
            <div className='space-y-4'>
              <div className='space-y-1'>
                <label htmlFor="" className='font-medium'>Enter a email address</label>
                <div className='flex justify-between'>
                  <div className='bg-[#C7C7C7] w-full rounded-xl py-4 px-5 flex items-center gap-2'>
                    <input
                      type="text"
                      placeholder=''
                      className='outline-none w-full text-sm md:text-base font-medium bg-[#C7C7C7] text-black placeholder-black'
                      name='email'
                      ref={emailInputElement}
                    />
                  </div>
                </div>
              </div>
              <div className='space-y-1'>
                <label className='md:text-lg' htmlFor="">Reset Token</label>
                <div className='flex justify-between gap-4'>
                  <div className='bg-[#C7C7C7] md:w-72 rounded-xl py-4 px-5 flex gap-2'>
                    <input
                      type="number"
                      placeholder=''
                      className='outline-none w-full text-sm md:text-base font-medium bg-[#C7C7C7] text-black placeholder-black'
                      name='resetToken'
                      ref={resetTokenInputElement}
                    />
                  </div>
                
                    <div className=''>
                      <button onClick={handleGenerateOtp} className='px-8 py-4 text-white font-medium rounded-xl bg-gradient-to-b from-[#E78200] to-[#000000] '>{isGenerateOtpLoading ? "...Is Generating" : "Generate"}</button>
                    </div>
              
                </div>
              </div>
              <div className='space-y-1'>
                <label className='md:text-lg' htmlFor="">Create Password</label>
                <div className='bg-[#C7C7C7] rounded-xl py-4 px-5 flex items-center gap-2'>
                  <LockOutlined />
                  <input
                    type="password"
                    placeholder='Password'
                    className='outline-none text-sm md:text-base font-medium w-full bg-[#C7C7C7] text-black placeholder-black'
                    name="password"
                    ref={passwordInputElement}
                  />
                  <VisibilityOutlined />
                </div>
              </div>
            </div>
            <div className='pt-10'>
              <button onClick={handleGeneratePassword} className='px-3 py-4 w-full text-white font-medium rounded-xl bg-gradient-to-b from-[#E78200] to-[#000000] '>{isGeneratePasswordLoading ? "...Is Saving" : "Save"}</button>
            </div>
            {isGenerateOtpError && (
              <div className='text-sm font-medium text-red-600 pt-2'>
                <p>{generateOtpError.response.data.error}</p>
              </div>
            )}
            {isGeneratePasswordError && (
              <div className='text-sm font-medium text-red-600 pt-2'>
                <p>{generatePasswordError.response.data.error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
