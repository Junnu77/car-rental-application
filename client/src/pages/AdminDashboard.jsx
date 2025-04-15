import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";
import { Users, Car, Calendar, TrendingUp } from "lucide-react";
import Sidebar from "../components/DashboardComps/SideBar";
import StatCard from "../components/DashboardComps/StatCard";
import RentalsTable from "../components/DashboardComps/RentalsTable";
import { adminAllCars, getAllRentalsAdmin, getAllReviewsAdmin } from "../features/admin/adminSlice";

const AdminDashboard = () => {
  const { cars, allRentals, isAdminLoading } = useSelector((state) => state.admin);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminAllCars());
    dispatch(getAllRentalsAdmin());
    dispatch(getAllReviewsAdmin());
  }, [dispatch]);

  const { users, totalUsers, totalRentals } = allRentals;

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar />
      <main className="flex-1 p-6 lg:ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-sm">{`Last updated: ${new Date().toLocaleString()}`}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Users" 
            value={totalUsers} 
            icon={Users} 
            trend={{ value: 12, isPositive: true }} 
            theme={theme}
          />
          <StatCard 
            title="Total Cars" 
            value={cars?.length} 
            icon={Car} 
            trend={{ value: 8, isPositive: true }} 
            theme={theme}
          />
          <StatCard 
            title="Active Rentals" 
            value={totalRentals} 
            icon={Calendar} 
            trend={{ value: 5, isPositive: true }} 
            theme={theme}
          />
          <StatCard 
            title="Monthly Revenue" 
            value="$12,543" 
            icon={TrendingUp} 
            trend={{ value: 16, isPositive: true }} 
            theme={theme}
          />
        </div>
        
        {isAdminLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <div className={`rounded-lg ${theme === "dark" ? "bg-gray-900 text-gray-100 border border-gray-600" : "bg-white text-gray-900 border border-gray-200"} shadow-sm overflow-hidden`}>
            <RentalsTable users={users} />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
