import { Spinner } from '@chakra-ui/react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDeleteCourse, useGetCourseDetails } from '../apiCalls/courseApiCalls'

const CourseDetails = () => {

    const user = JSON.parse(localStorage.getItem("user")) || null    
    const { courseId,academyId } = useParams()
    const {isLoading,data} = useGetCourseDetails(courseId)
    const { mutate:deleteCourseMutate, isLoading:isDeleteCourseLoading } = useDeleteCourse(academyId);

    if (isLoading) {
        return <Spinner />
      }
      

    if (isDeleteCourseLoading) {
        return <Spinner />
      }
      

      const deleteHandler = (courseId) => {
        deleteCourseMutate(courseId)
     };
   
  console.log(courseId);

  return (
    <div>
     <div>
        <h1 className="text-2xl text-center py-4 md:text-4xl lg:text-4xl xl:text-5xl font-bold">Course Details</h1>
        <div className="md:flex md:justify-between lg:flex lg:justify-between xl:flex xl:justify-center xl:gap-32 mt-10">
            <div className="left mx-8 lg:mx-0 xl:mx-0 space-y-3">
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Title:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{data.data.data.title}
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Description:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{data.data.data.description}</p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Tuition:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{data.data.data.tuition}</p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">Weeks:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{data.data.data.weeks}</p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">MinimumSkill:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{data.data.data.minimumSkill ? <i class="fa-regular fa-square-check"></i> : <i class="fa-regular fa-square"></i>}</p>
                </div>
                <div className="flex flex-col lg:flex-row xl:flex-row pt-1 gap-1 ">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-semibold">ScholarshipAvailable:</h1>
                    <p className="pt-[2px] text-lg lg:text-xl xl:text-xl lg:pt-1 xl:pt-1 pl-3 lg:pl-1 font-light">{data.data.data.scholarshipAvailable ? <i class="fa-regular fa-square-check"></i> : <i class="fa-regular fa-square"></i>}</p>
                </div>
                <div>
     
               </div> 
            
            </div>
           
           
                 </div>
                 {user?.data.role === "publisher" && 
     (<>
            <div className="flex justify-center mt-5 pb-3 gap-2">
                    <button
                        className="text-white font-semibold bg-red-color w-1/6 py-4 rounded-md bg-[#4a4cc7] hover:bg-[#4647ab] hover:transition-all"
                        id="register_button" type="submit"><Link to={`/updatecourse/${courseId}`}>UpdateCourse</Link></button>
                    <button onClick={()=>deleteHandler(courseId)}
                        className="text-white font-semibold bg-red-600 w-1/6 py-4 rounded-md hover:bg-red-700 hover:transition-all"
                        id="register_button" type="submit">Delete</button>
                </div>
                </>)}
      
            </div>
      















      {/* {data && data.data.data.title} */}
    </div>
  )
}

export default CourseDetails