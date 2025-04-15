import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, Mail, Phone, Calendar, Clock, Car, Tag, Fuel, DollarSign, AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';

const RentalsTable = ({ users }) => {
  const [expandedUsers, setExpandedUsers] = useState({});
  const { theme } = useSelector((state) => state.theme);
  
  // Toggle expansion for user rentals
  const toggleUserExpansion = (userId) => {
    setExpandedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };
  // Get appropriate styles based on rental status
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'booked':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get only valid rentals from user
  const getUserRentals = (user) => {
    return user.rentals.filter(rental => 
      typeof rental === "object" && rental !== null && rental !== "null"
    );
  };
  
  // Check if user has any valid rentals
  const hasValidRentals = (user) => {
    return getUserRentals(user).length > 0;
  };
  
  // Format date for consistent display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    // Handle different date formats
    if (dateString.includes("GMT")) {
      return new Date(dateString).toLocaleDateString();
    }
    return dateString;
  };
  
  return (
    <div className={`rounded-lg ${theme === "dark" ? "bg-gray-900 text-gray-100 border border-gray-600" : "bg-white text-gray-900 border border-gray-200"} shadow-lg overflow-hidden`}>
      <div className={`px-6 py-4 border-b ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gradient-to-r from-indigo-50 to-white"}`}>
        <h3 className={`font-semibold text-lg ${theme === "dark" ? "text-gray-100" : "text-gray-800"} flex items-center`}>
          <Car size={20} className={`${theme === "dark" ? "text-indigo-400" : "text-indigo-600"} mr-2`} />
          Recent Rentals
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gradient-to-r from-gray-50 to-gray-100 text-left"}`}>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <User size={16} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                  <span>Customer</span>
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                  <span>Email</span>
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Phone size={16} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                  <span>Phone</span>
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Car size={16} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                  <span>Total Rentals</span>
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                  <span>Join Date</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className={`${theme === "dark" ? "divide-y divide-gray-700" : "divide-y divide-gray-200"}`}>
            {users?.map((user) => (
              <React.Fragment key={user._id}>
                <tr className={`${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-colors duration-150`}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {hasValidRentals(user) && (
                      <button
                        onClick={() => toggleUserExpansion(user._id)}
                        className={`p-2 rounded-full ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-indigo-100"} transition-colors`}
                      >
                        {expandedUsers[user._id] ? (
                          <ChevronUp size={18} className={`${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`} />
                        ) : (
                          <ChevronDown size={18} className={`${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`} />
                        )}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-indigo-100"}`}>
                        <User size={20} className={`${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`} />
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail size={16} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} mr-2`} />
                      <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Phone size={16} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} mr-2`} />
                      <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>{user.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${theme === "dark" ? "bg-indigo-800 text-indigo-200" : "bg-indigo-100 text-indigo-800"}`}>
                      <Car size={14} className="mr-1" />
                      {getUserRentals(user).length}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                      <Calendar size={14} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} mr-1`} />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
                {/* Expanded Rentals Section */}
                {expandedUsers[user._id] && (
                  <tr>
                    <td colSpan="6" className="px-6 py-3">
                      <div className={`rounded-lg p-4 mb-3 border ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"} shadow-inner`}>
                        <div className="flex items-center mb-4 space-x-2">
                          <Car size={18} className={`${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`} />
                          <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-700"}`}>Rental History</h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className={`min-w-full divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"} rounded-lg overflow-hidden`}>
                            <thead className={`${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gradient-to-r from-gray-100 to-gray-50"}`}>
                              <tr>
                                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  <div className="flex items-center space-x-1">
                                    <Car size={14} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                    <span>Car</span>
                                  </div>
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  <div className="flex items-center space-x-1">
                                    <Fuel size={14} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                    <span>Fuel Type</span>
                                  </div>
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  <div className="flex items-center space-x-1">
                                    <Calendar size={14} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                    <span>Pickup</span>
                                  </div>
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  <div className="flex items-center space-x-1">
                                    <Calendar size={14} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                    <span>Drop</span>
                                  </div>
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  <div className="flex items-center space-x-1">
                                    <DollarSign size={14} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                    <span>Bill</span>
                                  </div>
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  <div className="flex items-center space-x-1">
                                    <AlertCircle size={14} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                    <span>Status</span>
                                  </div>
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  <div className="flex items-center space-x-1">
                                    <Clock size={14} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                    <span>Actions</span>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className={`${theme === "dark" ? "bg-gray-900 divide-y divide-gray-700" : "bg-white divide-y divide-gray-200"}`}>
                              {getUserRentals(user).map((rental) => (
                                <tr key={rental._id} className={`${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-colors duration-150`}>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <div className="flex items-center space-x-3">
                                      <div className={`flex-shrink-0 h-12 w-20 rounded overflow-hidden shadow-sm ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
                                        <img
                                          className="h-12 w-20 object-cover transform hover:scale-110 transition-transform duration-300"
                                          src={rental.car?.image || "https://via.placeholder.com/150"}
                                          alt={rental.car?.name || "Car"}
                                        />
                                      </div>
                                      <div>
                                        <div className={`text-sm font-medium ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>{rental.car?.name}</div>
                                        <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{rental.car?.company}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${theme === "dark" ? "bg-blue-800 text-blue-200" : "bg-blue-50 text-blue-700"}`}>
                                      <Fuel size={12} className="mr-1" />
                                      {rental.car?.fuelType}
                                    </div>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <div className={`flex items-center text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                                      <Calendar size={14} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} mr-1`} />
                                      {formatDate(rental.pickupDate)}
                                    </div>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <div className={`flex items-center text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                                      <Calendar size={14} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} mr-1`} />
                                      {formatDate(rental.dropDate)}
                                    </div>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <div className={`inline-flex items-center text-sm font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
                                      <DollarSign size={14} className={`${theme === "dark" ? "text-emerald-400" : "text-emerald-500"} mr-1`} />
                                      {rental.totalBill}
                                    </div>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <span className={`px-2.5 py-1 inline-flex items-center text-xs font-medium rounded-full ${getStatusStyles(rental.status)}`}>
                                      <AlertCircle size={12} className="mr-1" />
                                      {rental.status}
                                    </span>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <div className="flex space-x-2">
                                      <button className={`p-1 rounded ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-indigo-100"} transition-colors`}>
                                        <Clock size={16} className={`${theme === "dark" ? "text-blue-400" : "text-blue-500"}`} />
                                      </button>
                                      <button className={`p-1 rounded ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-indigo-100"} transition-colors`}>
                                        {rental.status === "Completed" ? (
                                          <Check size={16} className={`${theme === "dark" ? "text-green-400" : "text-green-500"}`} />
                                        ) : (
                                          <AlertCircle size={16} className={`${theme === "dark" ? "text-yellow-400" : "text-yellow-500"}`} />
                                        )}
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`px-6 py-4 border-t ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gradient-to-r from-white to-indigo-50"} flex justify-between items-center`}>
        <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Showing {users?.length} of {users?.length} users</span>
        {/* <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 bg-indigo-600 border border-indigo-600 rounded text-sm text-white hover:bg-indigo-700 transition-colors">
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default RentalsTable;