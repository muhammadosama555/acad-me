import { useToast } from "@chakra-ui/react"
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
    const toast = useToast();
    const queryClient = useQueryClient()
  return useMutation(postReview,{
    onSuccess: (data) => {
      toast({
        title: "Review Added Successfully",
        status: "success",
        duration: 3000, // Duration in milliseconds
        isClosable: true,
      })
        queryClient.invalidateQueries('review');
    },
  })
  }