import { Spinner } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { useRegister } from '../apiCalls/userApiCalls';

const Register = () => {
    
    const nameInputElement = useRef();
    const emailInputElement = useRef();
    const passwordInputElement = useRef();
    const roleInputElement = useRef();

    const { mutate:registerMutate, isLoading:isRegisterLoading, isError:isRegisterError, error:registerError } = useRegister();

  
    if (isRegisterLoading) {
      return <Spinner />
    }
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        name: nameInputElement.current?.value,
        email: emailInputElement.current?.value,
        password: passwordInputElement.current?.value,
        role: roleInputElement.current?.value,
      };
      registerMutate( data );
    };

  return (
    <>
    <div className="register flex justify-center items-center mt-20 box-border ">
        <div className="w-full max-w-lg lg:w-2/5 xl:w-2/5 bg-white shadow-xl px-8 pt-10 pb-5 rounded-md">
            <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
                <h1 className="text-4xl font-semibold pb-3">Register</h1>
                <div className="flex flex-col ">
                    <label className="text-xl pb-2" for="name">Name</label>
                    <input
                     type="text"
                      className="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                       placeholder="Enter your name"
                       name="name"
                       ref={nameInputElement}
                        />
                </div>
                <div className="flex flex-col ">
                    <label className="text-xl pb-2" for="email_field">Email</label>
                    <input
                     type="email"
                      id="email_field"
                       className="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                      placeholder="Enter your email"
                      name="email"
                      ref={emailInputElement}
                       />
                </div>

                <div className="flex flex-col ">
                    <label className="text-xl pb-2" for="password_field">Password</label>
                    <input
                     type="password"
                      id="password_field"
                        className="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                        placeholder="Password"
                        name="password"
                        ref={passwordInputElement}
                         />
                </div>
                <div className='flex flex-col'>
                    <label className="text-xl pb-2" for='avatar_upload'>Avatar</label>
                    <div className='flex items-center'>
                        <div className="">
                            <figure className='w-10 mr-3'>
                                <img src="images/avatar.png" className='' alt='image' />
                            </figure>
                        </div>
                        <div className='custom-file'>
                            <input type='file' name='avatar' className='custom-file-input' id='customFile' />
                        </div>
                    </div>
                </div>


                <div className="flex justify-center mt-5 pb-3">
                    <button
                        className="text-white font-semibold bg-red-color w-full py-4 rounded-md bg-[#4a4cc7] hover:bg-[#4647ab] hover:transition-all"
                        id="register_button" type="submit">REGISTER</button>
                </div>
                {isRegisterError &&
                <div>
                  <p className='text-red-600'>{registerError.response.data.error}</p>
                </div>
                }
            </form>
        </div>
    </div>












    {/* <form onSubmit={handleSubmit}>
    <label htmlFor="name">Name</label>
    <input
      type="name"
      name="name"
      ref={nameInputElement}
      required
    />
    <label htmlFor="email">Email</label>
    <input
      type="email"
      name="email"
      ref={emailInputElement}
      required
    />
    <label htmlFor="password">Password</label>
    <input
      type="password"
      name="password"
      ref={passwordInputElement}
      required
    />
    <label htmlFor="role">Role</label>
    <input
      type="text"
      name="role"
      ref={roleInputElement}
      required
    />
    <button type="submit">Register</button>
  </form> */}
  </>
  )
}

export default Register