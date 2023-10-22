import React, { useRef, useState } from 'react'
import {  LockOutlined, VisibilityOff, Visibility } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useChangePassword } from '../apiCalls/userApiCalls';

export default function ChangePassword() {

  const oldPasswordInputElement = useRef();
  const newPasswordInputElement = useRef();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { currentUser } = useSelector(state => state.userSlice) || null
  const token = currentUser.token


  const { mutate: changePasswordMutate, isLoading: isChangePasswordLoading, isError: isChangePasswordError, error: changePasswordError } = useChangePassword();




  const changePasswordHandler = (event) => {
    event.preventDefault();
    const data = {
      token: token,
      oldPassword: oldPasswordInputElement.current?.value,
      newPassword: newPasswordInputElement.current?.value,

    };


    changePasswordMutate(data);

  };

  const handleToggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);

  };
  const handleToggleNewPassword = () => {

    setShowNewPassword(!showNewPassword);
  };

  return (
    <>
      <div className='flex w-full items-center justify-center'>
        <div className='mx-6 md:mx-32 lg:mx-44 xl:mx-64 mt-32 w-full lg:w-2/5'>
         
          <h1 className='text-center py-8 text-xl font-bold text-transparent bg-gradient-to-b from-[#E78200] to-[#000000] bg-clip-text'>Change Password</h1>
          <form onSubmit={changePasswordHandler} className=''>
            <div className='space-y-4'>

              <div className='space-y-1'>
                <label htmlFor="" className='font-medium'>Old Password</label>
                <div className='bg-[#C7C7C7] rounded-xl py-4 px-5 flex gap-2'>
                  <LockOutlined />
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    placeholder='Password'
                    className='outline-none text-sm font-medium w-full bg-[#C7C7C7] text-black placeholder-black'
                    name="oldPassword"
                    ref={oldPasswordInputElement}
                  />

                  <div onClick={handleToggleOldPassword} className='hover:cursor-pointer'>
                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
                  </div>
                </div>
              </div>
              <div className='space-y-1'>
                <label htmlFor="" className='font-medium'>New Password</label>
                <div className='bg-[#C7C7C7] rounded-xl py-4 px-5 flex gap-2'>
                  <LockOutlined />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder='Password'
                    className='outline-none text-sm font-medium w-full bg-[#C7C7C7] text-black placeholder-black'
                    name="newPassword"
                    ref={newPasswordInputElement}
                  />
                  <div onClick={handleToggleNewPassword} className='hover:cursor-pointer'>
                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                  </div>
                </div>
              </div>
            </div>
            <div className='pt-10'>
              <button className='px-3 py-4 w-full text-white font-medium rounded-xl bg-gradient-to-b from-[#E78200] to-[#000000] '>{isChangePasswordLoading ? "...Is Saving" : "Save"}</button>
            </div>
            {isChangePasswordError && (
              <div className='text-sm font-medium text-red-600 pt-2'>
                <p>{changePasswordError.response.data.error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
