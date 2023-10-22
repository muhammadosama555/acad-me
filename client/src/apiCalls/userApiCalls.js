import { toast } from "react-toastify";
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { loginSuccess, logoutSuccess } from "../redux/reducers/userReducers ";
import { persistor, store } from "../redux/store";
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

// get user details

const getUserDetails = async (userId,token) => {
  return await axios.get(`${API_BASE_URL}/auth/users/${userId}`, {
    headers: {
      'authorization': "Bearer " + token,
    },
  })
}

export const useGetUserDetails = (userId) => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return useQuery(['user', userId], () => getUserDetails(userId, token), {
    enabled: !!token, // Only enable the query when the token is available (user is logged in)
  })
  
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
  const queryClient = useQueryClient();

return useMutation(updateUser,{
  onSuccess: (data) => {
    toast.success('Profile Updated Sucessfully!');
    queryClient.invalidateQueries("user");

  },
})
}

// change password

export const changePassword = async (userData) => {
  return axios.post(`${API_BASE_URL}/auth/change-password`, userData, {
    headers: {
      authorization: "Bearer " + userData.token,
    },
  });
};

export const useChangePassword = () => {
  return useMutation(changePassword, {
    onSuccess: (data) => {
      toast.success("Password changed Successfully!");
    },
  });
};

// Generate Password

export const generatePassword = async (userData) => {
  return axios.put(`${API_BASE_URL}/auth/resetPassword`, userData);
};

export const useGeneratePassword = () => {
  const navigate = useNavigate();
  return useMutation(generatePassword, {
    onSuccess: (data) => {
      navigate("/");
      toast.success("Password Generated Successfully!");
    },
  });
};

// Generate Otp

export const generateOtp = async (userData) => {
  return axios.post(`${API_BASE_URL}/auth/generateOtp`, userData);
};

export const useGenerateOtp = () => {
  return useMutation(generateOtp, {
    onSuccess: (data) => {
      toast.success("OTP Generated Successfully!");
    },
  });
};
