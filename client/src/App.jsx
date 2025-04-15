import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CarDetails from "./pages/CarDetails";
import SearchCars from "./pages/SearchCars";
import MyRentals from "./pages/MyRentals";
import RentalDetails from "./pages/RentalDetails";
import PageNotFound from "./pages/PageNotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRentals from "./pages/AdminRentals";
import AdminUserDetails from "./pages/AdminUserDetails";
import AdminCars from "./pages/AdminCars";
import AdminReviews from "./pages/AdminReviews";
import Layout from "./Layout";
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        {/* <Navbar /> */}
          <Routes >
        
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/car/:id" element={<CarDetails />} />
              <Route path="/search/:query" element={<SearchCars />} />
              <Route path="/my-rentals" element={<MyRentals />} />
              <Route path="/rental/:rid" element={<RentalDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>

            <Route path="/admin" >
              <Route index element={<AdminDashboard />} />
              <Route path="cars" element={<AdminCars />} />
              <Route path="rentals" element={<AdminRentals />} />
              <Route path="users" element={<AdminUserDetails />} />
              <Route path="reviews" element={<AdminReviews />} />
            </Route>

        
          </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        {/* <Footer /> */}
      </Router>
    </div>
  );
};

export default App;
