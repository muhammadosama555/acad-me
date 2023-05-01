import { useToast } from "@chakra-ui/react";
import axios from "axios"
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";



// User to login

export const login = async (userData) => {
    return axios.post("/api/v1/auth/login", userData);
  }

export const useLogin = () => {
  const toast = useToast();
  const navigate = useNavigate();
  return useMutation(login,{
    onSuccess: (data) => {
      console.log(data)
      localStorage.setItem("user",JSON.stringify(data?.data))
      toast({
        title: "login Successfully",
        status: "success",
        duration: 3000, // Duration in milliseconds
        isClosable: true,
      })
      navigate("/");
    },
  })
}

// User to Register

export const register = async (userData) => {
    return axios.post("/api/v1/auth/register", userData);
  }

export const useRegister = () => {
  const toast = useToast();
  const navigate = useNavigate();
  return useMutation(register,{
    onSuccess: (data) => {
      toast({
        title: `account created Successfully`,
        status: "success",
        duration: 3000, // Duration in milliseconds
        isClosable: true,
      })
      navigate("/login");
    },
  })
}

// User to logout

export const logout = async () => {
  return axios.get("/api/v1/auth/logout");
}

export const useLogout = () => {
const navigate = useNavigate();
return useMutation(logout,{
  onSuccess: (data) => {
    navigate("/");
  },
})
}