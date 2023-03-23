import { useMutation, useQuery} from 'react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// get academies

const getAcadimies = async (currentPage) => {
  return await axios.get(`/api/v1/bootcamps?page=${currentPage}`)
}

export const useGetAcadimies = (currentPage) => {
 
  return useQuery(['academies',currentPage], () => getAcadimies(currentPage))
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
 
  return useQuery(['courses', academyId], () => getAcademyCourses(academyId))
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
const navigate = useNavigate();
return useMutation(postAcademy,{
  onSuccess: (data) => {
    navigate("/");
  },
})
}