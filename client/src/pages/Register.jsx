import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { registerUser } from "../features/auth/authSlice";

const Register = () => {
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const formFields = [
    { name: "name", label: "Enter Name", type: "text" },
    { name: "email", label: "Email address", type: "email" },
    { name: "phone", label: "Phone", type: "phone" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm password", type: "password" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords Not Match!", { position: "top-center" });
    } else {
      dispatch(registerUser(formData));
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    if (isError && message) {
      toast.error(message, {
        position: "top-center",
      });
    }
  }, [user, isError, message]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-md w-full space-y-8 p-8 rounded-2xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div>
          <h2 className={`text-center text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Create an account
          </h2>
          <p className={`mt-2 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-emerald-500 hover:text-emerald-400">
              Sign in here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {formFields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className={`ml-2 block text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
              I agree to the{" "}
              <a href="#" className="text-emerald-500 hover:text-emerald-400">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
