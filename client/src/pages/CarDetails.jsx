import React, { useEffect, useState } from "react";
import { FaGasPump, FaUsers, FaRegComment, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCar, getCars } from "../features/car/carSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { addRental, getRental } from "../features/rental/rentalSlice";
import { Calendar, Clock, Fuel, Users } from "lucide-react";
import { addCarReview, getCarReviews } from "../features/reviews/reviewSlice";
import GoBackButton from "../components/GoBackButton";

const CarDetails = () => {

  const { car, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.car
  );

  const {
    rental,
    isRentalLoading,
    isRentalSuccess,
    isRentalError,
    rentalErrorMessage,
  } = useSelector((state) => state.rental);

  const {
    reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    message: reviewsMessage,
  } = useSelector((state) => state.reviews);

  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let comments = [];
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropDate, setDropDate] = useState("");
  const [duration, setDuration] = useState(1);

  const handleBooking = (e) => {
    e.preventDefault();

    let pickup = pickupDate.split("-");
    let formattedPickup = `${pickup[1]}/${pickup[2]}/${pickup[0]}`;
    let drop = dropDate.split("-");
    let formattedDrop = `${drop[1]}/${drop[2]}/${drop[0]}`;

    dispatch(
      addRental({
        id: id,
        pickupDate: formattedPickup,
        dropDate: formattedDrop,
      })
    );
    
    if (isRentalSuccess) {
      dispatch(getCar(id))
      navigate("/my-rentals");
    }
  };

  const renderStars = (rating) => {
    // Ensure rating is a valid number between 0 and 5
    const validRating = Math.min(Math.max(Number(rating) || 0, 0), 5);

    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const isHalfStar = validRating > i && validRating < starValue;
      const isFullStar = validRating >= starValue;

      return (
        <div key={i} className="relative">
          <FaStar
            className={`w-4 h-4 ${isFullStar ? 'text-yellow-400' : 'text-gray-300'}`}
          />
          {isHalfStar && (
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <FaStar className="w-4 h-4 text-yellow-400" />
            </div>
          )}
        </div>
      );
    });
  };

  const handleReview = (e) => {
    e.preventDefault();
    if (!rating || rating < 1 || rating > 5) {
      toast.error('Please select a valid rating between 1 and 5');
      return;
    }
    const ratingNumber = Number(rating);
    console.log("FromHandleReview")
    dispatch(addCarReview({ comment, rating: ratingNumber, id }));
    setComment('');
    setRating(0);
  };

  useEffect(() => {
    dispatch(getCar(id));
    dispatch(getCarReviews(id));
    console.log(rental)

    if (!user) {
      navigate("/login");
    }

    if (isError && message) {
      toast.error(message);
    }
  }, [id, user, rental]);

  useEffect(() => {
    if (pickupDate && dropDate) {
      const start = new Date(pickupDate);
      const end = new Date(dropDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDuration(diffDays);
    }
  }, [pickupDate, dropDate]);

  if (isLoading || isRentalLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-red-500">{message}</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          <h2 className="text-2xl font-bold">Car not found</h2>
        </div>
      </div>
    );
  }

  return (
    <main className={`max-w-screen relative min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="absolute top-0 left-10 right-0 flex items-center gap-3 p-4 bg-transparent z-10">
        <GoBackButton/>
        <h1 className={`text-2xl mb-1 font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Car Details</h1>
        <div className="w-10"></div> {/* Placeholder for alignment */}
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className={`rounded-2xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="relative">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-[500px] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h2 className="text-3xl font-bold text-white uppercase">
                {car.name}
              </h2>
              <p className="text-gray-200 mt-1 uppercase">
                by {car.company}
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl shadow-lg p-6 lg:p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-start mb-6">
            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`}>
              ₹{car.rate}/day
            </div>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase`}>
              Registration : {car.registration}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 py-6 border-y border-gray-100">
            <div className="flex items-center gap-3">
              <FaGasPump className="w-6 h-6 text-emerald-500" />
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Fuel Type</p>
                <p className={`font-semibold uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{car.fuelType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaUsers className="w-6 h-6 text-emerald-500" />
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Category</p>
                <p className={`font-semibold uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{car.category}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Description</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
              {car.description ? car.description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit Molestiae quos explicabo libero rerum ut excepturi illum sint dolore mollitia tenetur numquam distinctio, autem asperiores dicta accusantium voluptate dolorem sit quibusdam!"}
            </p>
          </div>

          {/* Book Now Button */}
          <div className="mt-8">
            {car.isBooked ? (
              <form onSubmit={handleBooking}>
                <label htmlFor="dropDate" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Car Will Be Available On : </label>
                <input
                  value={car?.rental?.dropDate}
                  onChange={(e) => setDropDate(e.target.value)}
                  type="text"
                  placeholder={`${car?.rental?.dropDate}`}
                  className={`border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-green-200 bg-white text-gray-900'} p-4 rounded-md w-full my-1`}
                  disabled
                />
              </form>
            ) : (
              <form onSubmit={handleBooking}>
                <label htmlFor="dropDate" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Pickup Date</label>
                <input
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  type="date"
                  className={`border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-green-200 bg-white text-gray-900'} p-4 rounded-md w-full my-1`}
                />
                <label htmlFor="dropDate" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Drop Date</label>
                <input
                  value={dropDate}
                  onChange={(e) => setDropDate(e.target.value)}
                  type="date"
                  className={`border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-green-200 bg-white text-gray-900'} p-4 rounded-md w-full my-1`}
                />
                
                <button
                  className={
                    car.isBooked
                      ? "w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors text-lg font-semibold disabled:cursor-not-allowed"
                      : "w-full bg-emerald-500 text-white py-3 px-6 rounded-lg hover:bg-emerald-600 transition-colors text-lg font-semibold"
                  }
                  disabled={car.isBooked}
                >
                  {car.isBooked ? "Not Available" : "Book Now"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className={`mt-8 rounded-2xl shadow-lg p-6 lg:p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center gap-2 mb-6">
          <FaRegComment className="w-5 h-5 text-emerald-500" />
          <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Reviews & Comments</h3>
        </div>

        <form onSubmit={handleReview} className="mb-8">
          <input type="number" placeholder="Rating (Out of 5)" className={`w-full mb-3 p-4 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
            value={rating}
            min={1}
            max={5}
            onChange={(e) => setRating(e.target.value)} />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className={`w-full p-4 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
            rows={3}
          />
          <button type="submit" className="mt-2 bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
            Post Review
          </button>
        </form>

        <div className="space-y-6">
          {reviews && reviews.length > 0 ? (
            reviews?.map((review) => (
              <div
                key={review?._id}
                className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} pb-6 last:border-0`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      {review?.userName}
                    </h4>
                    <div className="flex items-center gap-1">
                      {renderStars(review?.rating)}
                    </div>
                  </div>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(review?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {review?.comment}
                </p>
              </div>
            ))
          ) : (
            <p className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              No reviews yet. Be the first to review!
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default CarDetails;
