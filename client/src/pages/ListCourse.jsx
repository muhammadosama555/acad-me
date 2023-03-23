import React, { useRef } from 'react'
import { usePostCourse } from '../apiCalls/courseApiCalls';

const ListCourse = () => {

    const titleInputElement = useRef();
    const descriptionInputElement = useRef();
    const weeksInputElement = useRef();
    const minimunSkillInputElement = useRef();
    const tuitionInputElement = useRef();
 
      
    const { mutate, isLoading, isError, error } = usePostCourse();
    
      
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
        title: titleInputElement.current?.value,
        description: descriptionInputElement.current?.value,
        weeks: weeksInputElement.current?.value,
        minimunSkill: minimunSkillInputElement.current?.value,
        tuition: tuitionInputElement.current?.value,
      };
      mutate( data );
      console.log(data)
    };
    

  return (
    <form onSubmit={handleSubmit}>
    <label htmlFor="title">Title</label>
    <input
      type="text"
      name="title"
      ref={titleInputElement}
      required
    />
    <label htmlFor="description">Description</label>
    <input
      type="text"
      name="description"
      ref={descriptionInputElement}
      required
    />
    <label htmlFor="weeks">Weeks</label>
    <input
      type="number"
      name="weeks"
      ref={weeksInputElement}
      required
    />
    <label htmlFor="minimunSkill">minimunSkill</label>
    <input
      type="text"
      name="minimunSkill"
      ref={minimunSkillInputElement}
      required
    />
    <label htmlFor="tuition">Tuition</label>
    <input
      type="text"
      name="tuition"
      ref={tuitionInputElement}
      required
    />
   <button type="submit">ListAcademy</button>
  </form>
  )
}

export default ListCourse