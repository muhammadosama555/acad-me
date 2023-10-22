import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";
import { loginSuccess } from "../redux/reducers/userReducers ";
import { useDispatch } from "react-redux";

// admin to login

export const login = async (userData) => {
  return axios.post(`${API_BASE_URL}/auth/login`, userData);
}

export const useLogin = () => {
  const dispatch = useDispatch();
return useMutation(login,{
  onSuccess: (data) => {
    dispatch(loginSuccess(data.data));
  
  
  },
})
}



// get all users

const getUsers = async () => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;

  return await axios.get(`${API_BASE_URL}/auth/users?limit=999`,{
    headers:{
      'authorization':"Bearer "+ token
    }
  })
}

export const useGetUsers = () => {
 
  return useQuery('users', getUsers)
}



// delete user

export const deleteUser = async (userId) => {
  console.log(userId)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.delete(`${API_BASE_URL}/auth/users/${userId}`,{
    headers:{
      'authorization':"Bearer "+ token
    }
  });
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
return useMutation(deleteUser,{
  onSuccess: (data) => {
    queryClient.invalidateQueries('users');
  
  },
})
}

// get user details

const getUserDetails = async (userId) => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return  axios.get(`${API_BASE_URL}/auth/users/${userId}`,{
    headers:{
      'authorization':"Bearer "+ token
    }
  })
}

export const useGetUserDetails = (userId) => {
 
  return useQuery(['user', userId], () => getUserDetails(userId))
}

// update user

export const updateUser = async (userData) => {
  console.log(userData)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.put(`${API_BASE_URL}/auth/users/${userData.userId}`, userData,{
    headers:{
      'authorization':"Bearer "+ token
    }
  });
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation(updateUser,{
    onSuccess: (data) => {
      queryClient.invalidateQueries('user');
    },
  })
  }

// create user

export const postUser = async (userData) => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.post(`${API_BASE_URL}/auth/users`, userData,{
    headers:{
      'authorization':"Bearer "+ token
    }
  });
}

export const usePostUser = () => {
const navigate = useNavigate();
return useMutation(postUser,{
  onSuccess: (data) => {
    navigate("/users");
  
  },
})
}
