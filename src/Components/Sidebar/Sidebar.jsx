import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiBarChart } from "react-icons/fi"; // You can use this icon for the dashboard

const Sidebar = () => {
  return (
    <div className="sm:w-full sm:h-auto md:w-64 md:min-h-screen bg-white shadow-md p-4 z-10 relative pt-20">
      {/* Sidebar Menu */}
      <nav className="bg-gray-100 flex sm:flex justify-center w-full md:flex-col mt-3 space-y-3">
        <Link
          to="/dashboard" // New route for Dashboard
          className="flex items-center gap-3 text-gray-700 p-2 rounded-md hover:bg-gray-100"
        >
          <FiBarChart className="text-xl text-green-500" />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>

        <Link
          to="/addProduct" // Update with your route path
          className="flex items-center gap-3 text-gray-700 p-2 rounded-md hover:bg-gray-100"
        >
          <FaShoppingCart className="text-xl text-yellow-500" />
          <span className="text-sm font-medium">Add Product</span>
        </Link>
        <Link
          to="/listProduct" // Update with your route path
          className="flex items-center gap-3 text-gray-700 p-2 rounded-md hover:bg-gray-100"
        >
          <HiOutlineClipboardList className="text-xl text-blue-500" />
          <span className="text-sm font-medium">Product List</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
