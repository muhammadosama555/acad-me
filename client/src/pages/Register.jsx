import React, { useRef } from 'react'
import { useRegister } from '../apiCalls/userApiCalls';

const Register = () => {
    
    const nameInputElement = useRef();
    const emailInputElement = useRef();
    const passwordInputElement = useRef();
    const roleInputElement = useRef();

    const { mutate, isLoading, isError, error } = useRegister();

  
    if (isLoading) {
      return <h2>Loading...</h2>
    }
  
    if (isError) {
      return (
        <>
      <h2>{error.message}</h2>
      </>
      )
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        name: nameInputElement.current?.value,
        email: emailInputElement.current?.value,
        password: passwordInputElement.current?.value,
        role: roleInputElement.current?.value,
      };
      mutate( data );
    };

  return (
    <form onSubmit={handleSubmit}>
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
  </form>
  )
}

export default Register