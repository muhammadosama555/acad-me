import { useMutation, useQuery} from 'react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// get courses

const getCourses = async () => {
  return await axios.get("/api/v1/courses")
}

export const useGetCourses = () => {
 
  return useQuery('courses', getCourses)
}

// get course details

const getCourseDetails = async (courseId) => {
  return await axios.get(`/api/v1/courses/${courseId}`)
}

export const useGetCourseDetails = (courseId) => {
 
  return useQuery(['course', courseId], () => getCourseDetails(courseId))
}

// post course

export const postCourse = async (courseData) => {
  const user = JSON.parse(localStorage.getItem("user")) || null
  return axios.post("/api/v1/courses", courseData,{
    headers:{
      'authorization':"Bearer "+ user.token
    }
  });
}

export const usePostCourse = () => {
const navigate = useNavigate();
return useMutation(postCourse,{
  onSuccess: (data) => {
    navigate("/");
  },
})
}
