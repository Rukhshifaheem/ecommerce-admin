import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import AdminDashboard from "../../Components/AdminDashboard/AdminDashboard"; // Import Dashboard
import PrivateRoute from "../../Components/PrivateRoute/PrivateRoute"; // Import the PrivateRoute component

const Admin = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/listProduct" element={<ListProduct />} />
          
          {/* Protect Admin Dashboard route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
