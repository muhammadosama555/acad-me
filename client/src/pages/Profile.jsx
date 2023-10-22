import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetUserDetails, useUpdateUser } from '../apiCalls/userApiCalls'
import Loader from "../components/Loader"


export default function Profile() {


  const { currentUser } = useSelector(state => state.userSlice) || null
  const userId = currentUser.data._id
  const token = currentUser.token

const nameInputElement = useRef();
const emailInputElement = useRef();


  const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId)
  const { mutate:updateUserMutate, isLoading:isUpdateUserLoading, isError:isUpdateUserError, error:updateUserError } = useUpdateUser();

  const updateUserHandler = (event) => {
    event.preventDefault();
    const data = {
      name: nameInputElement.current?.value,
      email: emailInputElement.current?.value,
      userId,
    };
    updateUserMutate( data );
    console.log(data)
  };

  const fallbackImage = '/images/avatar.jpg';

  return (

    <>
      {isUserLoading ? <Loader /> : (
        <>
          <div className='flex w-full items-center justify-center'>
            <div className='mx-6 md:mx-32 lg:mx-44 xl:mx-64 mt-32 w-full lg:w-2/5'>
            
              <div className=' flex flex-col items-center'>
                <form action="" className=''>
                  <div className='w-28 h-28 border border-gray-200  rounded-full'
                    style={{
                      backgroundImage: `url("${userDetails.data.data.imgUrl}"), url("${fallbackImage}")`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                    }}>
                  </div>
                </form>
              </div>

              <form className='pb-4' onSubmit={updateUserHandler}>
                <div className='space-y-3 pt-8'>
                  <div className='space-y-1'>
                    <label className='text-lg font-medium text-gray-500' htmlFor="">Name</label>
                    <input className=' text-lg py-2 px-2 flex gap-2 border-b border-gray-500 ' 
                    defaultValue={userDetails.data.data.name}
                    ref={nameInputElement}
                    />
                  </div>
                  <div className='space-y-1'>
                    <label className='text-lg font-medium text-gray-500' htmlFor="">Email</label>
                    <input className=' text-lg py-2 px-2 flex gap-2 border-b border-gray-500 ' 
                    defaultValue={userDetails.data.data.email}
                    ref={emailInputElement}
                    />
                  </div>
                </div>
                <button className='bg-blue-500 text-white text-center p-3 mt-3'>Save</button>
              </form>

              <Link to='/changePassword'>
                <h2 className='font-medium text-end pt-3'>Change Password</h2>
              </Link>

            </div>
          </div>
        </>
      )}

    </>
  )
}
