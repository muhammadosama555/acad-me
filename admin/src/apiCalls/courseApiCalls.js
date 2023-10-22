import { useMutation, useQuery, useQueryClient} from 'react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";


// get course details

const getCourseDetails = async (courseId) => {
  return await axios.get(`${API_BASE_URL}/courses/${courseId}`)
}

export const useGetCourseDetails = (courseId) => {
 
  return useQuery(['course', courseId], () => getCourseDetails(courseId))
}

// update course

export const updateCourse = async (courseData) => {
  console.log(courseData)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.put(`${API_BASE_URL}/courses/${courseData.courseId}`, courseData,{
    headers:{
      'authorization':"Bearer "+ token
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
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.post(`${API_BASE_URL}/courses`, courseData,{
    headers:{
      'authorization':"Bearer "+ token
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
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.delete(`${API_BASE_URL}/courses/${courseId}`,{
    headers:{
      'authorization':"Bearer "+ token
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

