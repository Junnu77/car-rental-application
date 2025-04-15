import React from "react";
import { Calendar, Clock, User, Car, Check, X } from "lucide-react";
import { useSelector } from "react-redux";

const RentalsTable = ({users}) => {
  // Sample data for the table

  const {allRentals} = useSelector((state) => state.admin);
  // console.log(allRentals, "allRentals")
  // Sample data for the table
  console.log(users, "users")

  // users.map((user) => {
  //   console.log(user.name, "userName")
  // })
  const rentals = [
    {
      id: "RNT-001",
      customer: "John Smith",
      car: "Toyota Camry",
      startDate: "2025-04-01",
      endDate: "2025-04-08",
      status: "active",
    },
    {
      id: "RNT-002",
      customer: "Sarah Johnson",
      car: "Honda Civic",
      startDate: "2025-04-02",
      endDate: "2025-04-05",
      status: "completed",
    },
    {
      id: "RNT-003",
      customer: "Michael Brown",
      car: "Ford Explorer",
      startDate: "2025-04-05",
      endDate: "2025-04-10",
      status: "active",
    },
    {
      id: "RNT-004",
      customer: "Emily Davis",
      car: "Nissan Altima",
      startDate: "2025-04-03",
      endDate: "2025-04-06",
      status: "completed",
    },
    {
      id: "RNT-005",
      customer: "James Wilson",
      car: "Chevrolet Malibu",
      startDate: "2025-04-07",
      endDate: "2025-04-14",
      status: "upcoming",
    },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg">Recent Rentals</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rental ID
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rentals.map((rental) => (
              <tr key={rental.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {rental.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{rental.customer}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Car size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{rental.car}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {rental.startDate} - {rental.endDate}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(
                      rental.status
                    )}`}
                  >
                    {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="p-1 rounded hover:bg-gray-100">
                      <Clock size={16} className="text-blue-500" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100">
                      {rental.status === "completed" ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <span className="text-sm text-gray-500">Showing 5 of 24 rentals</span>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-600 border border-blue-600 rounded text-sm text-white hover:bg-blue-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentalsTable;