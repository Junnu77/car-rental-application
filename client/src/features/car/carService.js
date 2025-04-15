import axios from "axios";
const BaseUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;


const fetchCars = async (page = 1) => {
  const response = await axios.get(`${BaseUrl}/api/car?page=${page}`);
  // console.log(response) 
  return response.data;
};

const fetchCar = async (id) => {
  const response = await axios.get(`${BaseUrl}/api/car/${id}`);
  return response.data;
};

const searchCar = async (query) => {
  const response = await axios.get(`${BaseUrl}/api/car/search?query=${query}`);
  // console.log(response)
  return response.data;
};

const carService = {
  fetchCars,
  fetchCar,
  searchCar,
};

export default carService;
