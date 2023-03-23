import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDeleteAcademy, useGetAcademyCourses, useGetAcademyDetails } from '../apiCalls/academyApiCalls'


const AcademyDetails = () => {

    const user = JSON.parse(localStorage.getItem("user")) || null  
    const { academyId } = useParams()
    const { isLoading:isAcademyLoading, data:academyDetails, isError:isAcademyError , error : academyError } = useGetAcademyDetails(academyId)
    const { isLoading:isCoursesLoading, data:coursesData, isError:isCoursesError , error : coursesError } = useGetAcademyCourses(academyId)
    const { mutate, isLoading, isError, error } = useDeleteAcademy();
  
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
    if (isLoading ) {
      return <h2>Loading...</h2>
    }
  
    if (isError) {
      return (
        <>
      <h2>{error.message}</h2>
      </>
      )
    }

    const deleteHandler = (academyId) => {
      mutate( academyId );
    }


  return (
    <div>
      <div>
      {user?.data.role === "publisher" && user?.data._id ==  academyDetails.data.data.user &&
     (<>
     <Link to={`/listcourse/${academyId}`}>ListCourse</Link>
     <Link to={`/updateacademy/${academyId}`}>UpdateAcademy</Link>
     <button onClick={()=>deleteHandler(academyId)}>delete</button>
     </>
     )}
     </div> 
    {academyDetails && academyDetails.data.data.name}

    {coursesData?.data.data.map((course)=>(
        <div  key={course._id}>{
       <Link to={`/coursedetails/${course._id}`}>{course.title}</Link>}</div>

      ))}
    </div>
  )
}

export default AcademyDetails