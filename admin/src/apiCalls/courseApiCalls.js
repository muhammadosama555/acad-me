import { useMutation, useQuery, useQueryClient} from 'react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// get course details

const getCourseDetails = async (courseId) => {
  return await axios.get(`/api/v1/courses/${courseId}`)
}

export const useGetCourseDetails = (courseId) => {
 
  return useQuery(['course', courseId], () => getCourseDetails(courseId))
}

// update course

export const updateCourse = async (courseData) => {
  console.log(courseData)
  const user = JSON.parse(localStorage.getItem("user")) || null
  return axios.put(`/api/v1//courses/${courseData.courseId}`, courseData,{
    headers:{
      'authorization':"Bearer "+ user.token
    }
  });
}

export const useUpdateCourse = () => {
  const queryClient = useQueryClient()
return useMutation(updateCourse,{
  onSuccess: (data) => {
    console.log(data)
    queryClient.invalidateQueries('course');
  },
})
}

// post course

export const postCourse = async (courseData) => {
  console.log(courseData)
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
    console.log(data,data.data.data.bootcamp)
    navigate(`/academy/${data.data.data.bootcamp}`) 
  },
})
}

// delete course

export const deleteCourse = async (courseId) => {
  console.log(courseId)
  const user = JSON.parse(localStorage.getItem("user")) || null
  return axios.delete(`/api/v1/courses/${courseId}`,{
    headers:{
      'authorization':"Bearer "+ user.token
    }
  });
}

export const useDeleteCourse = () => {
  const queryClient = useQueryClient()
return useMutation(deleteCourse,{
  onSuccess: (data) => {
    queryClient.invalidateQueries('courses');
  },
})
}

