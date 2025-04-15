import { Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };

  return (
    <section className="relative h-screen">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3')] bg-cover bg-center">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/60' : 'bg-black/50'}`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          Find Your Perfect Ride
        </h1>
        <p className={`text-xl mb-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-200'} max-w-2xl`}>
          Discover our premium collection of luxury vehicles for an
          unforgettable driving experience.
        </p>

        <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by car name (e.g., Mercedes, BMW, Audi)"
            className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent pr-12"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
