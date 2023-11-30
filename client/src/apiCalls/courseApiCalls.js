import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";

// get courses

const getCourses = async (search="",sort="",page=1,limit=5) => {
  return await axios.get(`${API_BASE_URL}/courses?search=${search}&sort=${sort}&page=${page}&limit=${limit}`)
}

export const useGetCourses = (search,sort,page,limit) => {
  return useQuery(['courses',search,sort,page,limit], () => getCourses(search,sort,page,limit))
}

// get course details

const getCourseDetails = async (courseId) => {
  return await axios.get(`${API_BASE_URL}/courses/${courseId}`)
}

export const useGetCourseDetails = (courseId) => {
 
  return useQuery(['course', courseId], () => getCourseDetails(courseId))
}

// post course

export const postCourse = async (courseData) => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.post(`${API_BASE_URL}/courses`, courseData,{
    headers:{
      'authorization':"Bearer "+ token,
      "Content-Type": "multipart/form-data",
    }
  });
}

export const usePostCourse = () => {
const navigate = useNavigate();
return useMutation(postCourse,{
  onSuccess: (data) => {
    toast.success('Course Added Sucessfully!');
    console.log(data.data.data.bootcamp)
    navigate(`/academydetails/${data.data.data.bootcamp}`)
    
  }
})
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
  const navigate = useNavigate();
return useMutation(updateCourse,{
  onSuccess: (data) => {
    toast.success('Course Updated Sucessfully!');
    navigate(`/coursedetails/${data.data.data._id}/${data.data.data.bootcamp}`);
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

export const useDeleteCourse = (academyId) => {
  const navigate = useNavigate();
return useMutation(deleteCourse,{
  onSuccess: (data) => {
    toast.success('Course Deleted Sucessfully!');
    navigate(`/academydetails/${academyId}`);
  },
})
}