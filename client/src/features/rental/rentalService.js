import axios from "axios";
const BaseUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;


const fetchRentals = async (token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BaseUrl}/api/rentals`, options);
  return response.data;
};

const fetchRental = async (cid, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BaseUrl}/api/rentals/` + cid, options);
  return response.data;
};

const createRental = async (formData, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${BaseUrl}/api/rentals/` + formData.id,
    formData,
    options
  );
  return response.data;
};

const updateRental = async (formData, token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${BaseUrl}/api/rentals/${formData.rid}`,
    formData,
    options
  );
  return response.data;
};

const rentalService = { fetchRentals, createRental, fetchRental, updateRental };

export default rentalService;
