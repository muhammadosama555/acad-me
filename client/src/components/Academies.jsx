import React from 'react'
import { useGetAcademies } from '../apiCalls/academyApiCalls'
import Academy from './Academy'
import { Spinner } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const Academies = () => {
    
    const { isLoading:isAcademiesLoading, data:academies } = useGetAcademies()

    if (isAcademiesLoading) {
      return <Spinner />
    }
    console.log(academies)

  return (
    <>
    <div className="academies mt-14 ">
        <div className="flex justify-center lg:justify-between xl:justify-between head mb-14">
            <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold">Most Popular Academies</h1>
            <div className="hidden lg:flex xl:flex gap-5">
                <select className="text-2xl text-slate-400 " name="design" id="design">
                    <option value="">Design</option>
                    <option value="">Animation</option>
                </select>
                <div className="flex gap-5">
                    <div className="left bg-slate-50 rounded-full h-12 w-12 flex justify-center items-center text-lg hover:bg-yellow-400"><i className="fa-solid fa-chevron-left"></i></div>
                    <div className="right bg-slate-50 rounded-full h-12 w-12 flex justify-center items-center text-lg hover:bg-yellow-400"><i className="fa-solid fa-chevron-right"></i></div>
                </div>
            </div>

        </div>
        <div className="flex flex-col lg:justify-center lg:flex-wrap lg:flex-row xl:justify-center xl:flex-wrap xl:flex-row gap-10 lg:gap-8 items-center">
    {academies?.data.data.map((academy)=>(
      <Academy key={academy._id} academy={academy} />
    ))}
     </div>
    </div>
    <div className="flex justify-center py-10">
                <button className="px-7 py-3 text-base text-gray-700 font-semibold rounded-lg bg-stone-200 hover:bg-stone-300"><Link to="/searchacademies">Load More</Link></button>
            </div>
    </>
  )
}

export default Academies