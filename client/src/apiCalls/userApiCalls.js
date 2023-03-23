import axios from "axios"
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";



// User to login

export const login = async (userData) => {
    return axios.post("/api/v1/auth/login", userData);
  }

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation(login,{
    onSuccess: (data) => {
      localStorage.setItem("user",JSON.stringify(data?.data))
      navigate("/");
    },
  })
}

// User to Register

export const register = async (userData) => {
    return axios.post("/api/v1/auth/register", userData);
  }

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation(register,{
    onSuccess: (data) => {
      navigate("/");
    },
  })
}
