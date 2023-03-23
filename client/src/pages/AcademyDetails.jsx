import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetAcademyCourses, useGetAcademyDetails } from '../apiCalls/academyApiCalls'


const AcademyDetails = () => {

    const { academyId } = useParams()
    const { isLoading:isAcademyLoading, data:academyDetails, isError:isAcademyError , error : academyError } = useGetAcademyDetails(academyId)
    const { isLoading:isCoursesLoading, data:coursesData, isError:isCoursesError , error : coursesError } = useGetAcademyCourses(academyId)
  
    if (isAcademyLoading && isCoursesLoading) {
      return <h2>Loading...</h2>
    }
  
    if (isAcademyError && isCoursesError) {
      return (
        <>
      <h2>{academyError.message}</h2>
      <h2>{coursesError.message}</h2>
      </>
      )
    }

    
    console.log(academyId,academyDetails);

  return (
    <div>
    {academyDetails && academyDetails.data.data.name}

    {coursesData?.data.data.map((course)=>(
        <div  key={course._id}>{
       <Link to={`/coursedetails/${course._id}`}>{course.title}</Link>}</div>

      ))}
    </div>
  )
}

export default AcademyDetails