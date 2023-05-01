import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";


// admin to login

export const login = async (userData) => {
  return axios.post("/api/v1/auth/login", userData);
}

export const useLogin = () => {
return useMutation(login,{
  onSuccess: (data) => {
  localStorage.setItem("user",JSON.stringify(data?.data))
  
  },
})
}



// get all users

const getUsers = async () => {
  const user = JSON.parse(localStorage.getItem("user")) || null
  console.log(user.token)
  return await axios.get("/api/v1/auth/users?limit=999",{
    headers:{
      'authorization':"Bearer "+ user.token
    }
  })
}

export const useGetUsers = () => {
 
  return useQuery('users', getUsers)
}

// get user details

const getUser = async () => {
  return JSON.parse(localStorage.getItem("user")) || null
 
}

export const useGetUser = () => {
 
  return useQuery('user', getUser)
}

// delete user

export const deleteUser = async (userId) => {
  console.log(userId)
  const user = JSON.parse(localStorage.getItem("user")) || null
  return axios.delete(`/api/v1/auth/users/${userId}`,{
    headers:{
      'authorization':"Bearer "+ user.token
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
  const user = JSON.parse(localStorage.getItem("user")) || null
  return  axios.get(`/api/v1/auth/users/${userId}`,{
    headers:{
      'authorization':"Bearer "+ user.token
    }
  })
}

export const useGetUserDetails = (userId) => {
 
  return useQuery(['user', userId], () => getUserDetails(userId))
}

// update user

export const updateUser = async (userData) => {
  console.log(userData)
  const user = JSON.parse(localStorage.getItem("user")) || null
  return axios.put(`/api/v1/auth/users/${userData.userId}`, userData,{
    headers:{
      'authorization':"Bearer "+ user.token
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
  const user = JSON.parse(localStorage.getItem("user")) || null
  return axios.post("/api/v1/auth/users", userData,{
    headers:{
      'authorization':"Bearer "+ user.token
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
