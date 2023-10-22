import React from 'react'
import { useGetAcademies } from '../apiCalls/academyApiCalls'
import Academy from './Academy'
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Academies = () => {
    
    const { isLoading:isAcademiesLoading, data:academies } = useGetAcademies()

    if (isAcademiesLoading) {
      return <Loader/>
    }


  return (
    <>
    <div className="academies mt-14 ">
        <div className="flex justify-center lg:justify-between xl:justify-between head mb-14">
            <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold">Most Popular Academies</h1>
            

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