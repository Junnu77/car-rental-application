import React, { useEffect, useState } from "react";
import { Car, Plus, Edit, Trash2, X, ImageIcon, ChevronLeft, ChevronRight, Flame, Droplet, Leaf, BatteryCharging, Gauge, Truck, Package, Mountain, Wind, Clipboard, CheckCircle, Clock, DollarSign } from "lucide-react";
import Sidebar from "../components/DashboardComps/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { addCar, adminAllCars, removeCar, update, updateExistingCar } from "../features/admin/adminSlice";
import { toast } from "react-toastify";

const AdminCars = () => {
  // Admin state import
  const { cars, isAdminLoading, carEdit, isAdminSuccess, pagination } = useSelector((state) => state.admin);
  const { theme } = useSelector((state) => state.theme);
  // dispatch function
  const dispatch = useDispatch();
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  // Form data state
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    registration: '',
    description: '',
    image: '',
    category: 'suv',
    fuelType: 'petrol',
    transmission: 'Manual',
    rate: '',
    mileage: '',
    seats: ''
  });

  // Fetch all cars on component mount and when currentPage changes
  useEffect(() => {
    dispatch(adminAllCars(currentPage));
  }, [currentPage]);

  // Fetch car data when modal opens for editing
  useEffect(() => {
    setFormData({
      company: carEdit.edit?.company || '',
      name: carEdit.edit?.name || '',
      registration: carEdit.edit?.registration || '',
      description: carEdit.edit?.description || '',
      image: carEdit.edit?.image || '',
      category: carEdit.edit?.category || 'suv',
      fuelType: carEdit.edit?.fuelType || 'petrol',
      transmission: carEdit.edit?.transmission || 'Manual',
      rate: carEdit.edit?.rate || '',
      mileage: carEdit.edit?.mileage || '',
      seats: carEdit.edit?.seats || ''
    });
  }, [carEdit]);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Dispatch action to add or update car
    carEdit.isEdit ? dispatch(updateExistingCar({ ...formData, id: carEdit.edit._id })) : dispatch(addCar(formData));
    if (isAdminSuccess) {
      toast.success("Car added successfully");
    }
    dispatch(adminAllCars(currentPage));
    // close modal after submitting
    setIsModalOpen(false);
    // Reset form data after submission
    setFormData({
      company: '',
      name: '',
      registration: '',
      description: '',
      image: '',
      category: 'suv',
      fuelType: 'petrol',
      transmission: 'Manual',
      rate: '',
      mileage: '',
      seats: ''
    });
  };
   // Edit function
  const handleEdit = (car) => {
    setIsModalOpen(true);
    console.log(car, "car");
    dispatch(update(car));
  };
  //  Delete function
  const deleteCar = (carId) => {
    dispatch(removeCar(carId))
    dispatch(adminAllCars(currentPage));
    toast.success("Car deleted successfully");
  }

  // Get status color based on booking status
  const getStatusColor = (isBooked) => {
    return isBooked
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800";
  };
  // Pagination function
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination?.pages) {
      setCurrentPage(newPage);
      dispatch(adminAllCars(newPage));
    }
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar />
      <main className="flex-1 p-6 lg:ml-64">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
              <Car size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold">Car Management</h1>
          </div>
            {/* Modal Button  */}
          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add New Car
          </button>
        </div>

        <div className={` rounded-lg ${theme === "dark" ? "bg-gray-900 text-gray-100 border border-gray-600" : "bg-gray-50 text-gray-900 border border-gray-200"}  shadow-sm overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${theme === "dark" ? "divide-gray-600" : "divide-gray-200"}`}>
              <thead className={`bg-gray-50 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
                <tr>
                  <th scope="col" className={`px-20 py-3 text-left text-xs font-medium  uppercase tracking-wider`}>
                    Car
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider`}>
                    Fuel Type
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider`}>
                    Details
                  </th>
                  <th scope="col" className={`px-9 py-3 text-left text-xs font-medium  uppercase tracking-wider`}>
                    Status
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider`}>
                    Daily Rate
                  </th>
                  <th scope="col" className={`px-6 py-3 text-right text-xs font-medium  uppercase tracking-wider`}>
                    Actions
                  </th>
                </tr>
              </thead>
              {isAdminLoading ? (
                // Loader
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
                <tbody className={`${theme === "dark" ? "bg-gray-900 divide-y divide-gray-600" : "bg-white divide-y divide-gray-200"} `}>
                  {cars?.map((car) => (
                    <tr key={car?._id} className={`${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"} `}>
                      {/* Car Details */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-14 w-20 flex-shrink-0 rounded-md overflow-hidden">
                            <img className="h-full w-full object-cover" src={car?.image} alt={car?.name} />
                          </div>
                          <div className="ml-4">
                            <div className={`text-sm font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-900"} flex items-center space-x-2`}>
                              <Car className="w-4 h-4 text-blue-500" />
                              <span>{car?.name}</span>
                            </div>
                            <div className="text-sm text-gray-500 flex items-center space-x-2">
                              <span>{car?.company}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Fuel Type */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${theme === "dark" ? "text-gray-200" : "text-gray-900"} font-semibold flex items-center space-x-2`}>
                          {car?.fuelType.toLowerCase() === "petrol" && <Flame className="w-4 h-4 text-orange-500" />}
                          {car?.fuelType.toLowerCase() === "diesel" && <Droplet className="w-4 h-4 text-blue-500" />}
                          {car?.fuelType.toLowerCase() === "cng" && <Leaf className="w-4 h-4 text-green-500" />}
                          {car?.fuelType.toLowerCase() === "ev" && <BatteryCharging className="w-4 h-4 text-emerald-500" />}
                          <span>{car?.fuelType.toUpperCase()}</span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2">
                          <Gauge className="w-4 h-4 text-gray-400" />
                          <span>{car?.mileage} km/l</span>
                        </div>
                      </td>

                      {/* Details */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${theme === "dark" ? "text-gray-200" : "text-gray-900"} font-semibold flex items-center space-x-2`}>
                          {car?.category.toLowerCase() === "suv" && <Truck className="w-4 h-4 text-blue-500" />}
                          {car?.category.toLowerCase() === "sedan" && <Car className="w-4 h-4 text-gray-500" />}
                          {car?.category.toLowerCase() === "hatchback" && <Package className="w-4 h-4 text-yellow-500" />}
                          {car?.category.toLowerCase() === "jeep" && <Mountain className="w-4 h-4 text-green-500" />}
                          {car?.category.toLowerCase() === "coupe" && <Wind className="w-4 h-4 text-purple-500" />}
                          <span>{car?.category.toUpperCase()} ({car?.transmission})</span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2">
                          <Clipboard className="w-4 h-4 text-gray-400" />
                          <span>Registration: {car?.registration?.slice(0, 10)}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(car?.isBooked)}`}>
                          {car?.isBooked ? (
                            <span className="flex items-center space-x-1">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Booked</span>
                            </span>
                          ) : (
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <span>Available</span>
                            </span>
                          )}
                        </span>
                      </td>

                      {/* Daily Rate */}
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>
                        <div className="flex items-center space-x-2">
                          {/* <DollarSign className="w-4 h-4 text-green-500" /> */}
                          <span>₹{car?.rate}/day</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(car)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteCar(car?._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
              {/* Pagiantion Buttons */}
        {pagination && pagination.pages > 1 && (
          <div className={`flex justify-center items-center gap-2 py-4 ${theme === "dark" ? "bg-gray-900 " : "bg-white border-t border-gray-200 shadow-sm rounded-lg"} `}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full ${currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.pages}
              className={`p-2 rounded-full ${currentPage === pagination.pages && theme === "dark"
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div
            className={`fixed inset-0 ${
              theme === "dark" ? "bg-gray-900/50" : "bg-gray-900/30"
            } backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`${
                theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-900"
              } rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl border ${
                theme === "dark" ? "border-gray-700" : "border-gray-100"
              } 
              `}
              // ${
              //   theme === "dark"
              //     ? "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
              //     : "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              // }
            >
              {/* Modal Header */}
              <div
                className={`flex justify-between items-center p-6 border-b ${
                  theme === "dark" ? "border-gray-700" : "border-gray-300"
                } sticky top-0 ${
                  theme === "dark" ? "bg-gray-900" : "bg-white"
                } backdrop-blur-sm`}
              >
                <h2 className="text-xl font-semibold">
                  {carEdit.isEdit ? "Edit Car" : "Add New Car"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-8">
                {/* Image URL Preview Section */}
                <div
                  className={`mb-8 p-6 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <label
                    className="block text-sm font-medium mb-3"
                    htmlFor="image"
                  >
                    Car Image
                  </label>
                  <div className="flex items-start space-x-6">
                    <div className="flex-1">
                      <div
                        className={`flex items-center rounded-lg border p-2 ${
                          theme === "dark"
                            ? "bg-gray-900 border-gray-700"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <ImageIcon
                          className={`w-5 h-5 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          } mx-2`}
                        />
                        <input
                          type="url"
                          name="image"
                          placeholder="Enter image URL"
                          value={formData.image}
                          onChange={handleInputChange}
                          className={`flex-1 block w-full border-0 focus:ring-0 p-1 ${
                            theme === "dark"
                              ? "text-gray-300 placeholder:text-gray-500"
                              : "text-gray-900 placeholder:text-gray-400"
                          }`}
                        />
                      </div>
                      <p
                        className={`mt-2 text-sm ${
                          theme === "dark" ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        Provide a valid URL for the car image
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="company">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`block w-full rounded-lg p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-gray-300"
                          : "bg-white border-gray-200 text-gray-900"
                      }`}
                      required
                    />
                  </div>

                  {/* Car Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="name">
                      Car Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`block w-full rounded-lg p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-gray-300"
                          : "bg-white border-gray-200 text-gray-900"
                      }`}
                      required
                    />
                  </div>

                  {/* Registration */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="registration">
                      Registration
                    </label>
                    <input
                      type="text"
                      name="registration"
                      value={formData.registration}
                      onChange={handleInputChange}
                      className={`block w-full rounded-lg p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-gray-300"
                          : "bg-white border-gray-200 text-gray-900"
                      }`}
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="category">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`block w-full rounded-lg p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-gray-300"
                          : "bg-white border-gray-200 text-gray-900"
                      }`}
                      required
                    >
                      {["suv", "sedan", "hatchback", "jeep", "coupe"].map((option) => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Fuel Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="fuelType">
                      Fuel Type
                    </label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      className={`block w-full rounded-lg p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-gray-300"
                          : "bg-white border-gray-200 text-gray-900"
                      }`}
                      required
                    >
                      {["diesel", "petrol", "cng", "ev"].map((option) => (
                        <option key={option} value={option}>
                          {option.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Transmission */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="transmission">
                      Transmission
                    </label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      className={`block w-full rounded-lg p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-gray-300"
                          : "bg-white border-gray-200 text-gray-900"
                      }`}
                      required
                    >
                      {["Manual", "Automatic"].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rate */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="rate">
                      Rate (per day)
                    </label>
                    <div className="relative">
                      <span
                        className={`absolute inset-y-0 left-0 pl-3 flex items-center ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        ₹
                      </span>
                      <input
                        type="number"
                        name="rate"
                        value={formData.rate}
                        onChange={handleInputChange}
                        className={`block w-full rounded-lg p-2 pl-8 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-gray-300"
                            : "bg-white border-gray-200 text-gray-900"
                        }`}
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  {/* Mileage */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="mileage">
                      Mileage (km/l)
                    </label>
                    <input
                      type="number"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      className={`block w-full rounded-lg p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-gray-300"
                          : "bg-white border-gray-200 text-gray-900"
                      }`}
                      min="0"
                      step="0.1"
                      required
                    />
                  </div>

                  {/* Seats */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="seats">
                      Seats
                    </label>
                    <input
                      type="number"
                      name="seats"
                      value={formData.seats}
                      onChange={handleInputChange}
                      className={`block w-full rounded-lg p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-gray-300"
                          : "bg-white border-gray-200 text-gray-900"
                      }`}
                      min="1"
                      max="10"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className={`block w-full rounded-lg p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-gray-300"
                        : "bg-white border-gray-200 text-gray-900"
                    }`}
                    required
                  />
                </div>

                {/* Modal Footer */}
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className={`px-6 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                      theme === "dark"
                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Save Car
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminCars;