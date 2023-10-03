import { useMutation, useQuery} from 'react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";


// get academies

const getAcademies = async (currentPage=1,limit=4,search="",careers=[],sort="",maxRating=5) => {
   // Convert the careers array to a formatted string
  const formattedCareers = careers.map(career => `"${career}"`).join(',');
   const url = `${API_BASE_URL}/bootcamps?page=${currentPage}&limit=${limit}&search=${search}&careers=[${formattedCareers}]&sort=${sort}&maxRating=${maxRating}`;
   console.log(url); // Log the URL before making the request
  return await axios.get(url)
}

export const useGetAcademies = (currentPage,limit,search,careers,sort,maxRating) => {
  return useQuery(['academies',currentPage,limit,search,careers,sort,maxRating], () => getAcademies(currentPage,limit,search,careers,sort,maxRating))
}

// get academy details

const getAcademyDetails = async (academyId) => {
  return await axios.get(`${API_BASE_URL}/bootcamps/${academyId}`)
}

export const useGetAcademyDetails = (academyId) => {
  return useQuery(['academy', academyId], () => getAcademyDetails(academyId))
}



// get academy courses

const getAcademyCourses = async (academyId) => {
  return await axios.get(`${API_BASE_URL}/bootcamps/${academyId}/courses`)
}

export const useGetAcademyCourses = (academyId) => {
  return useQuery(['academyCourses', academyId], () => getAcademyCourses(academyId))
}

// post academy

export const postAcademy = async (academyData) => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.post(`${API_BASE_URL}/bootcamps`, academyData, {
    headers: {
      'authorization': "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
  });
}

export const usePostAcademy = () => {
const navigate = useNavigate();
return useMutation(postAcademy,{
  onSuccess: (data) => {
    toast.success('Academy Added Sucessfully!');
    navigate("/");
  },
})
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
const navigate = useNavigate();
return useMutation(updateAcademy,{
  onSuccess: (data) => {
    navigate(`/academydetails/${data.data.data._id}`);
    toast.success('Academy Updated Sucessfully!');

  },
})
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
  const navigate = useNavigate();
return useMutation(deleteAcademy,{
  onSuccess: (data) => {
    toast.success('Academy Deleted Sucessfully!');
    navigate("/");
  },
})
}