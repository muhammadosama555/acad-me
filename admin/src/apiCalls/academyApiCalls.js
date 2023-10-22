import { useMutation, useQuery} from 'react-query'
import axios from 'axios'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";




// get academies

const getAcadimies = async () => {
  return await axios.get(`${API_BASE_URL}/bootcamps?limit=999`)
}

export const useGetAcadimies = () => {
 
  return useQuery('academies', getAcadimies)
}

// delete academy

export const deleteAcademy = async (academyId) => {
  console.log(academyId)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.delete(`${API_BASE_URL}/bootcamps/${academyId}`,{
    headers:{
      'authorization':"Bearer "+ token
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
  return await axios.get(`${API_BASE_URL}/bootcamps/${academyId}`)
}

export const useGetAcademyDetails = (academyId) => {
 
  return useQuery(['academy', academyId], () => getAcademyDetails(academyId))
}

// update academy

export const updateAcademy = async (academyData) => {
  console.log(academyData)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.put(`${API_BASE_URL}/bootcamps/${academyData.academyId}`, academyData,{
    headers:{
      'authorization':"Bearer "+ token
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
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.post(`${API_BASE_URL}/bootcamps`, academyData,{
    headers:{
      'authorization':"Bearer "+ token
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

// get academy courses

const getAcademyCourses = async (academyId) => {
  return await axios.get(`${API_BASE_URL}/bootcamps/${academyId}/courses`)
}

export const useGetAcademyCourses = (academyId) => {
 
  return useQuery(['courses', academyId], () => getAcademyCourses(academyId))
}