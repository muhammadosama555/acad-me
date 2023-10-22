import { useMutation, useQuery} from 'react-query'
import axios from 'axios'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";


// get orders

const getOrders = async () => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return await axios.get(`${API_BASE_URL}/orders`, {
    headers: {
      'authorization': "Bearer " + token,
    },
  })
}

export const useGetOrders = () => {
  return useQuery('orders', getOrders)
}

// delete order

export const deleteOrder = async (orderId) => {
  console.log(orderId)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.delete(`${API_BASE_URL}/orders/${orderId}`,{
    headers:{
      'authorization':"Bearer "+ token
    }
  });
}

export const useDeleteOrder = () => {
  const queryClient = useQueryClient()
return useMutation(deleteOrder,{
  onSuccess: (data) => {
    queryClient.invalidateQueries('orders');
 
  },
})
}

// get order details

const getOrderDetails = async (orderId) => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return await axios.get(`${API_BASE_URL}/orders/${orderId}`, {
    headers: {
      'authorization': "Bearer " + token,
    },
  })
}

export const useGetOrderDetails = (orderId) => {
 
  return useQuery(['order', orderId], () => getOrderDetails(orderId))
}

