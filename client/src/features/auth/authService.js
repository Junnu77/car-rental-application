import axios from "axios";
const BaseUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;


const register = async (formData) => {
  const response = await axios.post(`${BaseUrl}/api/auth/register`, formData);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const login = async (formData) => {
  const response = await axios.post(`${BaseUrl}/api/auth/login`, formData);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
