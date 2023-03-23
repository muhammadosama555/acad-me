import React, { useRef } from 'react'
import { usePostAcademy } from "../apiCalls/academyApiCalls";

const ListAcademy = () => {

const nameInputElement = useRef();
const descriptionInputElement = useRef();
const websiteInputElement = useRef();
const phoneInputElement = useRef();
const emailInputElement = useRef();
const addressInputElement = useRef();
  
const { mutate, isLoading, isError, error } = usePostAcademy();

  
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
    description: descriptionInputElement.current?.value,
    website: websiteInputElement.current?.value,
    phone: phoneInputElement.current?.value,
    email: emailInputElement.current?.value,
    address: addressInputElement.current?.value,
  };
  mutate( data );
  console.log(data)
};


  return (
    <form onSubmit={handleSubmit}>
    <label htmlFor="name">Name</label>
    <input
      type="text"
      name="name"
      ref={nameInputElement}
      required
    />
    <label htmlFor="description">Description</label>
    <input
      type="text"
      name="description"
      ref={descriptionInputElement}
      required
    />
    <label htmlFor="website">website</label>
    <input
      type="text"
      name="website"
      ref={websiteInputElement}
      required
    />
    <label htmlFor="phone">phone</label>
    <input
      type="number"
      name="phone"
      ref={phoneInputElement}
      required
    />
    <label htmlFor="email">Email</label>
    <input
      type="email"
      name="email"
      ref={emailInputElement}
      required
    />
    <label htmlFor="address">Address</label>
    <input
      type="text"
      name="address"
      ref={addressInputElement}
      required
    />
   <button type="submit">ListAcademy</button>
  </form>
  )
}

export default ListAcademy