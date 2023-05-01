import { useMutation, useQuery} from 'react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

// get academies

const getAcademies = async (currentPage,limit,keyword) => {
  return await axios.get(`/api/v1/bootcamps?page=${currentPage}&limit=${limit}&keyword=${keyword}`)
}

export const useGetAcademies = (currentPage=1,limit=4,keyword="") => {
  return useQuery(['academies',currentPage,limit,keyword], () => getAcademies(currentPage,limit,keyword))
}

// get academy details

const getAcademyDetails = async (academyId) => {
  return await axios.get(`/api/v1/bootcamps/${academyId}`)
}

export const useGetAcademyDetails = (academyId) => {
  return useQuery(['academy', academyId], () => getAcademyDetails(academyId))
}



// get academy courses

const getAcademyCourses = async (academyId) => {
  return await axios.get(`/api/v1/bootcamps/${academyId}/courses`)
}

export const useGetAcademyCourses = (academyId) => {
  return useQuery(['academyCourses', academyId], () => getAcademyCourses(academyId))
}

// post academy

export const postAcademy = async (academyData) => {
  const user = JSON.parse(localStorage.getItem("user")) || null
  return axios.post("/api/v1/bootcamps", academyData,{
    headers:{
      'authorization':"Bearer "+ user.token
    }
  });
}

export const usePostAcademy = () => {
  const toast = useToast();
const navigate = useNavigate();
return useMutation(postAcademy,{
  onSuccess: (data) => {
    toast({
      title: "Academy Added Successfully",
      status: "success",
      duration: 3000, // Duration in milliseconds
      isClosable: true,
    })
    navigate("/");
  },
})
}

// update academy

export const updateAcademy = async (academyData) => {
  console.log(academyData)
  const user = JSON.parse(localStorage.getItem("user")) || null
  return axios.put(`/api/v1/bootcamps/${academyData.academyId}`, academyData,{
    headers:{
      'authorization':"Bearer "+ user.token
    }
  });
}

export const useUpdateAcademy = () => {
  const toast = useToast();
const navigate = useNavigate();
return useMutation(updateAcademy,{
  onSuccess: (data) => {
    navigate(`/academydetails/${data.data.data._id}`);
    toast({
      title: "Academy Updated Successfully",
      status: "success",
      duration: 3000, // Duration in milliseconds
      isClosable: true,
    })

  },
})
}

// delete academy

export const deleteAcademy = async (academyId) => {
  console.log(academyId)
  const user = JSON.parse(localStorage.getItem("user")) || null
  return axios.delete(`/api/v1/bootcamps/${academyId}`,{
    headers:{
      'authorization':"Bearer "+ user.token
    }
  });
}

export const useDeleteAcademy = () => {
  const toast = useToast();
  const navigate = useNavigate();
return useMutation(deleteAcademy,{
  onSuccess: (data) => {
    toast({
      title: "Academy Deleted Successfully",
      status: "success",
      duration: 3000, // Duration in milliseconds
      isClosable: true,
    })
    navigate("/");
  },
})
}