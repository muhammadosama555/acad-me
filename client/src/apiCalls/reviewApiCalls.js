import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { useQueryClient } from 'react-query'

// get view by academyId

const getReviewByAcademyId = async (academyId) => {
    return await axios.get(`/api/v1/bootcamps/${academyId}/reviews`)
  }
  
  export const useGetReviewByAcademyId  = (academyId) => {
   
    return useQuery(['review', academyId], () => getReviewByAcademyId(academyId))
  }

// post review

export const postReview = async (reviewData) => {
    console.log(reviewData)
    const user = JSON.parse(localStorage.getItem("user")) || null
    return axios.post(`/api/v1/bootcamps/${reviewData.bootcampId}/reviews`, reviewData,{
      headers:{
        'authorization':"Bearer "+ user.token
      }
    });
  }
  
  export const usePostReview = () => {
    const queryClient = useQueryClient()
  return useMutation(postReview,{
    onSuccess: (data) => {
        queryClient.invalidateQueries('review');
    },
  })
  }