import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../features/car/carSlice";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TrendingCars = () => {
  const { isLoading, isError, cars, pagination, message } = useSelector(
    (state) => state.car
  );
  const { theme } = useSelector((state) => state.theme);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars(currentPage));

    if (isError && message) {
      toast.error(message);
    }
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination?.pages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} animate-pulse`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className={`h-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} rounded w-1/2 mb-12 mx-auto`}></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} h-64`}></div>
            <div className={`rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} h-64`}></div>
            <div className={`rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} h-64`}></div>
            <div className={`rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} h-64`}></div>
            <div className={`rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} h-64`}></div>
            <div className={`rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} h-64`}></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-12 uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Trending Cars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars?.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>

        {/* Pagination Controls */}
        {pagination && pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${currentPage === 1
                ? `${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
                : "bg-emerald-500 text-white hover:bg-emerald-600"
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-full ${currentPage === page
                    ? "bg-emerald-500 text-white"
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                    }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.pages}
              className={`p-2 rounded-full ${currentPage === pagination.pages
                ? `${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
                : "bg-emerald-500 text-white hover:bg-emerald-600"
                }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingCars;
