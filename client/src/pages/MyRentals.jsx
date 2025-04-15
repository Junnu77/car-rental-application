import React, { useEffect } from "react";
import RentalCard from "../components/RentalCard";
import { useDispatch, useSelector } from "react-redux";
import { getRentals } from "../features/rental/rentalSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const MyRentals = () => {
  const { rentals, isLoading, isError, message } = useSelector(
    (state) => state.rental
  );
  const { theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRentals());
    

    if (isError && message) {
      toast.error(message);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError && message) {
    return (
      <div className={`p-10 text-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <h2 className={`text-3xl ${theme === 'dark' ? 'text-red-300' : 'text-red-400'} font-bold text-center mb-12 uppercase`}>
          No Rentals Yet
        </h2>
      </div>
    );
  }

  return (
    <section className={`relative py-10 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-12 uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          My Rentals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rentals.map((rental) => (
            <RentalCard key={rental._id} rental={rental} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyRentals;
