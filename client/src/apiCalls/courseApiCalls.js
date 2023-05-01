import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useToast } from "@chakra-ui/react";

// get courses

const getCourses = async (keyword) => {
  return await axios.get(`/api/v1/courses?keyword=${keyword}`)
}

export const useGetCourses = (keyword) => {
  return useQuery(['courses',keyword], () => getCourses(keyword))
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
const toast = useToast();
return useMutation(postCourse,{
  onSuccess: (data) => {
    toast({
      title: "Course Added Successfully",
      status: "success",
      duration: 3000, // Duration in milliseconds
      isClosable: true,
    })
    console.log(data.data.data.bootcamp)
    navigate(`/academydetails/${data.data.data.bootcamp}`)
    
  }
})
}


// update course

export const updateCourse = async (courseData) => {
  console.log(courseData)
  const user = JSON.parse(localStorage.getItem("user")) || null
  return axios.put(`/api/v1/courses/${courseData.courseId}`, courseData,{
    headers:{
      'authorization':"Bearer "+ user.token
    }
  });
}

export const useUpdateCourse = () => {
  const toast = useToast();
  const navigate = useNavigate();
return useMutation(updateCourse,{
  onSuccess: (data) => {
      toast({
        title: "Course Updated Successfully",
        status: "success",
        duration: 3000, // Duration in milliseconds
        isClosable: true,
      })
    navigate(`/coursedetails/${data.data.data._id}/${data.data.data.bootcamp}`);
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

export const useDeleteCourse = (academyId) => {
  const toast = useToast();
  const navigate = useNavigate();
return useMutation(deleteCourse,{
  onSuccess: (data) => {
    toast({
      title: "Course Deleted Successfully",
      status: "success",
      duration: 3000, // Duration in milliseconds
      isClosable: true,
    })
    navigate(`/academydetails/${academyId}`);
  },
})
}