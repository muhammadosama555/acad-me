import React, { useState } from 'react'
import Course from './Course';
import { useGetCourses } from '../apiCalls/courseApiCalls';
import Loader from './Loader';

const Courses = () => {
    const {isLoading:isCoursesLoading, data:Courses} = useGetCourses()

    if (isCoursesLoading) {
      return <Loader/>
    }
      

  return (
    <>
     <div class="courses mt-14 ">
        <div class="flex justify-center lg:justify-between xl:justify-between head mb-14">
            <h1 class="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold">Trending Courses</h1>
           

        </div>
        <div class="flex flex-col lg:justify-center lg:flex-wrap lg:flex-row xl:justify-center xl:flex-wrap xl:flex-row gap-10 lg:gap-8 items-center">
    {Courses?.data.data.map((course)=>(
      <Course key={course._id} course={course} />
    ))}
    </div>
    </div>
    </>
  )
}

export default Courses