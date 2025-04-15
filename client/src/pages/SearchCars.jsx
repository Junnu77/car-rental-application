import React, { useEffect } from "react";
import SearchCarCard from "../components/SearchCarCard";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { findCar } from "../features/car/carSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Car, Search } from "lucide-react";

const SearchCars = () => {
  const { cars, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.car
  );
  const { theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const { query } = useParams();

  useEffect(() => {
    dispatch(findCar(query));

    if (isError && message) {
      toast.error(message);
    }
  }, [query, isError, message]);

  if (isLoading) {
    return <Loader />;
  }

  if (!cars) {
    return <div className={`flex flex-col items-center justify-center min-h-[400px] animate-fade-in ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-8 pt-20`}>
      <div className="relative">
        <Car className={`w-20 h-20 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
      </div>
      <h2 className={`mt-6 text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        No Cars Found
      </h2>
      <p className={`mt-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-center max-w-sm`}>
        We couldn't find any rental cars matching your criteria
      </p>
      <Link to="/" className="mt-6 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-300 flex items-center gap-2">
        <Search className="w-4 h-4" />
        <span>Browse Available Cars</span>
      </Link>
    </div>
  }

  return (
    <section className={`py-20 px-5 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="w-full mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-12 uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Search Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {cars?.map((car) => (
            <SearchCarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchCars;
