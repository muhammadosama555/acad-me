import { toast } from "react-toastify";
import axios from "axios"
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { loginSuccess, logoutSuccess } from "../redux/reducers/userReducers ";
import { persistor } from "../redux/store";
import { useDispatch } from "react-redux";
console.log(toast)


// User to login

export const login = async (userData) => {
    return axios.post(`${API_BASE_URL}/auth/login`, userData);
  }

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation(login,{
    onSuccess: (data) => {
      console.log(data)
      dispatch(loginSuccess(data.data));
      toast.success('Login Sucessfully!');
      navigate("/");
    },
  })
}

// User to Register

export const register = async (userData) => {
    return axios.post(`${API_BASE_URL}/auth/register`, userData);
  }

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation(register,{
    onSuccess: (data) => {
      toast.success('Account Created Sucessfully!');
      navigate("/login");
    },
  })
}

// User to logout

export const logout = async () => {
  return axios.get(`${API_BASE_URL}/auth/logout`);
}

export const useLogout = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
return useMutation(logout,{
  onSuccess: (data) => {
    dispatch(logoutSuccess());
    toast.success('Logout Sucessfully!');
    persistor.purge();
    navigate("/");
  },
})
}