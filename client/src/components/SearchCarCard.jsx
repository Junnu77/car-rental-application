import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Calendar, Car, Fuel, Building2 } from "lucide-react";

const SearchCarCard = ({ car }) => {
    const { theme } = useSelector((state) => state.theme);

    return (
        <div className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="relative">
                <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-contain"
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        {car.name}
                    </h3>
                    <div className="flex items-center">
                        <span className={`text-emerald-500 font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`}>
                            ₹{car.rate}/day
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                        <Building2 className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                        <div className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span className="text-sm">Company:</span>
                            <span className="ml-1 font-medium">{car.company}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Car className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                        <div className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span className="text-sm">Category:</span>
                            <span className="ml-1 font-medium">{car.category}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Fuel className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                        <div className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span className="text-sm">Fuel Type:</span>
                            <span className="ml-1 font-medium">{car.fuelType}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                        <div className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span className="text-sm">Registration:</span>
                            <span className="ml-1 font-medium">{car.registration}</span>
                        </div>
                    </div>
                </div>
                <Link
                    to={`/car/${car._id}`}
                    className={`block w-full text-white text-center py-2 rounded-md transition-colors ${theme === 'dark'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default SearchCarCard; 