import React, { useState } from 'react'
import { Spinner } from "@chakra-ui/react";
import Course from './Course';
import { useGetCourses } from '../apiCalls/courseApiCalls';

const Courses = () => {
    const {isLoading:isCoursesLoading, data:Courses} = useGetCourses()

    if (isCoursesLoading) {
      return <Spinner />
    }
      

  return (
    <>
     <div class="courses mt-14 ">
        <div class="flex justify-center lg:justify-between xl:justify-between head mb-14">
            <h1 class="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold">Trending Courses</h1>
            <div class="hidden lg:flex xl:flex gap-5">
                <select class="text-2xl text-slate-400 " name="design" id="design">
                    <option value="">Design</option>
                    <option value="">Animation</option>
                </select>
                <div class="flex gap-5">
                    <div class="left bg-slate-50 rounded-full h-12 w-12 flex justify-center items-center text-lg hover:bg-yellow-400"><i class="fa-solid fa-chevron-left"></i></div>
                    <div class="right bg-slate-50 rounded-full h-12 w-12 flex justify-center items-center text-lg hover:bg-yellow-400"><i class="fa-solid fa-chevron-right"></i></div>
                </div>
            </div>

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