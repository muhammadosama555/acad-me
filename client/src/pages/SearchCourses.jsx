import { Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useGetCourses } from '../apiCalls/courseApiCalls'
import Course from '../components/Course'

const SearchCourses = () => {

    const [keyword, setKeyword] = useState("")
    const {isLoading:isCoursesLoading, data:Courses} = useGetCourses(keyword)


  return (
    <>
        <div class="absolute mx-8 sm:mx-8 md:mx-8 lg:mx-0 xl:mx-0 ">
        <i class="fa-solid fa-list"></i>
    </div>
    <div class="search-content flex sm:mx-8 md:mx-8">
        <div class="left hidden sm:hidden md:hidden lg:flex lg:flex-col xl:flex xl:flex-col filters side-bar w-[300px]">
            <div class="filters">
                <h1 class="text-4xl text-center py-3">Filters</h1>
            </div>
            <div class="category pl-6 pb-4 border-t border-gray-200">
                <h1 class="text-2xl py-3">Category</h1>
                <div class="flex flex-col gap-2 py-2 pl-4">
                    <div class="flex gap-3">
                        <input class="w-4" type="checkbox"/>
                        <label for="text">Category 1</label>
                    </div>
                    <div class="flex gap-3">
                        <input class="w-4" type="checkbox"/>
                        <label for="text">Category 2</label>
                    </div>
                    <div class="flex gap-3">
                        <input class="w-4" type="checkbox"/>
                        <label for="text">Category 3</label>
                    </div>
                    <div class="flex gap-3">
                        <input class="w-4" type="checkbox"/>
                        <label for="text">Category 4</label>
                    </div>
                    <div class="flex gap-3">
                        <input class="w-4" type="checkbox"/>
                        <label for="text">Category 5</label>
                    </div>
                    <div class="flex gap-3">
                        <input class="w-4" type="checkbox"/>
                        <label for="text">Category 6</label>
                    </div>
                    
                </div>
            </div>
            <div class="rating pl-6 py-4 border-t border-b border-gray-200">
                <h1 class="text-2xl pb-3">Rating</h1>
                <div class="rating">
                    <i class="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
                    <i class="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
                    <i class="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
                    <i class="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star-half-stroke"></i>
                    <i class="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i>
                </div>
            </div>
            <div class="sort pl-6 py-4">
                <h1 class="text-2xl py-3">Sort</h1>
                <div class="flex flex-col gap-2 py-2 pl-4">
                    <div class="flex gap-3">
                        <input class="w-4" type="checkbox"/>
                        <label for="text">Category 1</label>
                    </div>
                    <div class="flex gap-3">
                        <input class="w-4" type="checkbox"/>
                        <label for="text">Category 2</label>
                    </div>
                    <div class="flex gap-3">
                        <input class="w-4" type="checkbox"/>
                        <label for="text">Category 3</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="right box-border pt-4 w-full">
        <div className="search-bar w-full px-20 flex">
          <input
            onChange={(e)=>setKeyword(e.target.value)}
            className="px-6 py-3 w-full text-lg bg-slate-100 rounded-full "
            type="text"
            placeholder="Search for Courses"
          />
        </div>
        <div class="courses mt-14 ">
        <div class="flex justify-center lg:justify-between xl:justify-between head mb-14">
            <h1 class="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold">Courses</h1>
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
     {isCoursesLoading ? <Spinner /> : (
        <>
         {Courses?.data.data.map((course)=>(
      <Course key={course._id} course={course} />
    ))}
        </>
     )}
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default SearchCourses