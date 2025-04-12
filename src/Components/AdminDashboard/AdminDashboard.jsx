import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Utility function to get the token from cookies
const getTokenFromCookie = () => {
  const match = document.cookie.match(/(^| )token=([^;]+)/);
  return match ? match[2] : null;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const token = getTokenFromCookie();  // Get token from cookies
        
        if (!token) {
          console.log("No token found, redirecting to login.");
          navigate("/login");  // Redirect to login if no token
          return;
        }
        
        // Make the API call with the token
        const response = await axios.get("https://backend-rukhshifaheems-projects.vercel.app/admin/all-carts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCarts(response.data);
      } catch (error) {
        console.error("Error fetching carts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      {carts.length > 0 ? (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2 text-left">User Name</th>
              <th className="border-b p-2 text-left">Email</th>
              <th className="border-b p-2 text-left">Products</th>
              <th className="border-b p-2 text-left">Total Quantity</th>
              <th className="border-b p-2 text-left">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart) => {
              let totalQuantity = 0;
              let totalPrice = 0;

              cart.items.forEach((item) => {
                totalQuantity += item.quantity;
                totalPrice += item.productId.new_price * item.quantity;
              });

              return (
                <tr key={cart._id}>
                  <td className="border-b p-2">{cart.userId.name}</td>
                  <td className="border-b p-2">{cart.userId.email}</td>
                  <td className="border-b p-2">
                    {cart.items.map((item, index) => (
                      <div key={index}>
                        {item.productId.name} (Qty: {item.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="border-b p-2">{totalQuantity}</td>
                  <td className="border-b p-2">${totalPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>No carts found.</div>
      )}
    </div>
  );
};

export default AdminDashboard;
