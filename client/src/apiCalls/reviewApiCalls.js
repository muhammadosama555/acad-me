import { toast } from "react-toastify";
import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { useQueryClient } from 'react-query'
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";

// get view by academyId

const getReviewByAcademyId = async (academyId) => {
    return await axios.get(`${API_BASE_URL}/bootcamps/${academyId}/reviews`)
  }
  
  export const useGetReviewByAcademyId  = (academyId) => {
   
    return useQuery(['review', academyId], () => getReviewByAcademyId(academyId))
  }

// post review

export const postReview = async (reviewData) => {
    console.log(reviewData)
    const currentUser = store.getState().userSlice.currentUser;
    const token = currentUser ? currentUser.token : null;
    return axios.post(`${API_BASE_URL}/bootcamps/${reviewData.bootcampId}/reviews`, reviewData,{
      headers:{
        'authorization':"Bearer "+ token
      }
    });
  }
  
  export const usePostReview = () => {
    const queryClient = useQueryClient()
  return useMutation(postReview,{
    onSuccess: (data) => {
      toast.success('Review Added Sucessfully!');
        queryClient.invalidateQueries('review');
    },
  })
  }