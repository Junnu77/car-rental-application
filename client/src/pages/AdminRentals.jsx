import React, { useEffect } from "react";
import { Calendar, Plus, Clock, User, Car, Check, X } from "lucide-react";
import Sidebar from "../components/DashboardComps/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllRentalsAdmin } from "../features/admin/adminSlice";

const AdminRentals = () => {
  const dispatch = useDispatch();
  const { allUsers, isAdminLoading } = useSelector((state) => state.admin);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(getAllRentalsAdmin());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const getStatusColor = (isBooked) => {
    return isBooked
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800";
  };

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar />
      <main className="flex-1 p-6 lg:ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Rentals Management</h1>
          {/* <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add New Rental
          </button> */}
        </div>

        <div className={`rounded-lg ${theme === "dark" ? "bg-gray-900 text-gray-100 border border-gray-600" : "bg-white text-gray-900 border border-gray-200"} shadow-sm overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${theme === "dark" ? "divide-gray-600" : "divide-gray-200"}`}>
              <thead className={`${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Car
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Dates
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              {isAdminLoading ? (
                <tbody>
                  <tr>
                    <td colSpan="6">
                      <div className="flex items-center justify-center h-[400px]">
                        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-emerald-500"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className={`${theme === "dark" ? "bg-gray-900 divide-y divide-gray-600" : "bg-white divide-y divide-gray-200"}`}>
                  {allUsers
                    .filter((user) => Array.isArray(user.rentals) && user.rentals.length > 0)
                    .map((user) =>
                      user.rentals.map((rental) => (
                        <tr key={rental._id} className={`${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <User className="h-5 w-5 text-gray-400 mr-2" />
                              <div>
                                <div className={`text-sm ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>{user.name}</div>
                                <div className="text-xs text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Car className="h-5 w-5 text-gray-400 mr-2" />
                              <div>
                                <div className={`text-sm ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>{rental.car?.name}</div>
                                <div className="text-xs text-gray-500">{rental.car?._id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                              <div className={`text-sm ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>
                                {formatDate(rental.pickupDate)} to {formatDate(rental.dropDate)}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(rental?.car?.isBooked)}`}>
                              {rental?.car?.isBooked ? "Booked" : "Available"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            ₹{rental.totalBill || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="p-1 rounded hover:bg-blue-50 text-blue-600">
                                <Clock className="h-5 w-5" />
                              </button>
                              {rental?.car?.isBooked ? (
                                <button className="p-1 rounded hover:bg-red-50 text-red-600">
                                  <X className="h-5 w-5" />
                                </button>
                              ) : (
                                <button className="p-1 rounded hover:bg-green-50 text-green-600">
                                  <Check className="h-5 w-5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminRentals;