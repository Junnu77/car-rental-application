import axios from "axios";
const BaseUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;


const addReview = async ({ rating, comment, id, token }) => {
    const response = await axios.post(`${BaseUrl}/api/car/${id}/reviews/add`, { rating, comment }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log("responseFromService", response)
    return response.data;
};

const getReviews = async (id, token) => {
    const response = await axios.get(`${BaseUrl}/api/car/${id}/reviews`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export { addReview, getReviews };

