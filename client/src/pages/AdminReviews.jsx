import React, { useEffect } from "react";
import { Star, User, Car, Calendar } from "lucide-react";
import Sidebar from "../components/DashboardComps/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsAdmin } from "../features/admin/adminSlice";

const AdminReviews = () => {
  const dispatch = useDispatch();
  const { allReviews, isAdminLoading } = useSelector((state) => state.admin);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(getAllReviewsAdmin());
  }, [dispatch]);

  const { userWithReviews } = allReviews;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-yellow-400"
        >
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="#FACC15" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <polygon
            fill="url(#halfGradient)"
            stroke="currentColor"
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          />
        </svg>
      );
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar />
      <main className="flex-1 p-6 lg:ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Reviews Management</h1>
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
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Comment
                  </th>
                </tr>
              </thead>
              {isAdminLoading ? (
                <tbody>
                  <tr>
                    <td colSpan="5">
                      <div className="flex items-center justify-center h-[400px]">
                        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-emerald-500"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className={`${theme === "dark" ? "bg-gray-900 divide-y divide-gray-600" : "bg-white divide-y divide-gray-200"}`}>
                  {userWithReviews?.map((user) =>
                    user.reviews.map((review) => (
                      <tr key={review?._id} className={`${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
                        {/* Customer */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <User className="h-5 w-5 text-gray-400 mr-2" />
                            <div>
                              <div className={`text-sm ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>{user?.name}</div>
                              <div className="text-xs text-gray-500">{user?.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Car */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Car className="h-5 w-5 text-gray-400 mr-2" />
                            <div>
                              <div className={`text-sm ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>{review?.carName}</div>
                              <div className="text-xs text-gray-500">{review?.car}</div>
                            </div>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                            <div className={`text-sm ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>{formatDate(review?.createdAt)}</div>
                          </div>
                        </td>

                        {/* Rating */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {renderStarRating(review?.rating)}
                            <span className={`ml-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{review?.rating.toFixed(1)}</span>
                          </div>
                        </td>

                        {/* Comment */}
                        <td className="px-6 py-4">
                          <p className={`text-sm ${theme === "dark" ? "text-gray-200" : "text-gray-900"} max-w-xs truncate`}>{review?.comment}</p>
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

export default AdminReviews;