import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetCourseDetails } from '../apiCalls/courseApiCalls'

const CourseDetails = () => {

    const { courseId } = useParams()
    const {isLoading,data,isError,error} = useGetCourseDetails(courseId)

    if (isLoading) {
        return <h2>...isLoading</h2>
      }
      
      if (isError) {
        return <h2>{error.message}</h2>
      }
  console.log(data);

  return (
    <div>{data && data.data.data.title}</div>
  )
}

export default CourseDetails