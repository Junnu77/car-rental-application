import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import car from "./car/carSlice";
import rental from "./rental/rentalSlice";
import theme from "./theme/themeSlice";
import reviews from "./reviews/reviewSlice";
import admin from "./admin/adminSlice";

const store = configureStore({
  reducer: { auth, car, rental, theme, reviews, admin },
});

export default store;
