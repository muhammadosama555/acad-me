import { useMutation, useQuery} from 'react-query'
import axios from 'axios'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'



// get academies

const getAcadimies = async () => {
  return await axios.get("/api/v1/bootcamps")
}

export const useGetAcadimies = () => {
 
  return useQuery('academies', getAcadimies)
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
  const queryClient = useQueryClient()
return useMutation(deleteAcademy,{
  onSuccess: (data) => {
    queryClient.invalidateQueries('academies');
  },
})
}

// get academy details

const getAcademyDetails = async (academyId) => {
  return await axios.get(`/api/v1/bootcamps/${academyId}`)
}

export const useGetAcademyDetails = (academyId) => {
 
  return useQuery(['academy', academyId], () => getAcademyDetails(academyId))
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
  const queryClient = useQueryClient()
  return useMutation(updateAcademy,{
    onSuccess: (data) => {
      queryClient.invalidateQueries('academy');
    },
  })
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
    navigate("/acadamies");
  },
})
}