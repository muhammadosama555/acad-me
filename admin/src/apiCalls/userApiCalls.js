import axios from "axios"
import { useMutation } from "react-query";


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


