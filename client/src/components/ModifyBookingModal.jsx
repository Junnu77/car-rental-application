import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Info, Tag, User } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { updateCarRental } from '../features/rental/rentalSlice';

// Add this helper function at the top of your file
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date?.toISOString().split('T')[0];
};

const ModifyBookingModal = ({ rental, onClose }) => {
  // Initialize form data with formatted dates

  console.log("rental modal test 1",rental)
  const [formData, setFormData] = useState({
    pickupDate: formatDateForInput(rental?.pickupDate),
    dropDate: formatDateForInput(rental?.dropDate)
  });
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore body scrolling
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pickupDate = new Date(formData.pickupDate);
    const dropDate = new Date(formData.dropDate);
    const days = Math.max(1, Math.ceil((dropDate - pickupDate) / (1000 * 60 * 60 * 24)));

    const updatedData = {
      pickupDate: formData.pickupDate,
      dropDate: formData.dropDate,
      rid: rental._id
    };

    try {
      await dispatch(updateCarRental(updatedData)).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to update rental:', error);
    }
  };

  // Animation classes for modal entry
  const overlayClasses = "fixed inset-0 backdrop-blur-sm bg-black/30 z-40 flex items-center justify-center min-h-screen overflow-y-auto";
  const modalClasses = "bg-white rounded-lg shadow-2xl w-full max-w-lg z-50 transform transition-all duration-300 ease-in-out border border-gray-100";

  return (
    <div className={overlayClasses}>
      <div
        ref={modalRef}
        className={modalClasses}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-200 p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Modify Booking</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6">
          <div className="space-y-6">



            {/* Rental Period */}
            <fieldset className="border border-gray-200 rounded-lg p-4">
              <legend className="text-sm font-medium text-gray-700 px-2">Rental Period</legend>
              <div className="space-y-4">
                {/* Pickup Date */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={16} className="text-gray-400" />
                    <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">Pickup Date</label>
                  </div>
                  <input
                    type="date"
                    id="pickupDate"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Drop Date */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={16} className="text-gray-400" />
                    <label htmlFor="dropDate" className="block text-sm font-medium text-gray-700">Drop Date</label>
                  </div>
                  <input
                    type="date"
                    id="dropDate"
                    name="dropDate"
                    value={formData.dropDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </fieldset>
          </div>

          {/* Modal Footer */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white transition-colors duration-200 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyBookingModal;