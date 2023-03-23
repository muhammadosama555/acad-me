import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import { usePostCourse } from '../apiCalls/courseApiCalls';

const ListCourse = () => {

    const { academyId } = useParams()
    console.log(academyId)

    const titleInputElement = useRef();
    const descriptionInputElement = useRef();
    const weeksInputElement = useRef();
    const minimumSkillInputElement = useRef();
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
        bootcampId:academyId,
        title: titleInputElement.current?.value,
        description: descriptionInputElement.current?.value,
        weeks: weeksInputElement.current?.value,
        minimumSkill: minimumSkillInputElement.current?.value,
        tuition: tuitionInputElement.current?.value,
      };
      mutate( data );
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
    <label htmlFor="minimumSkill">minimumSkill</label>
    <input
      type="text"
      name="minimumSkill"
      ref={minimumSkillInputElement}
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