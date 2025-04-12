import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const ListProduct = () => {
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await axios.get("https://backend-rukhshifaheems-projects.vercel.app/product/allProducts");
      setAllProduct(response.data);
    } catch (error) {
      console.error("Error fetching all product:", error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const handleRemoveProduct = async (id) => {
    try {
      const response = await axios.delete(`https://backend-rukhshifaheems-projects.vercel.app/deleteProduct/${id}`);
      if (response.status === 200) {
        fetchAllProduct();
      }
    } catch (error) {
      console.error("Error removing product:", error);
      alert("Failed to remove product. Please try again.");
    }
  }

  return (
    <div className="sm:mt-2 md:mt-16 p-4 sm:p-6 lg:p-10 w-full max-w-5xl mx-auto">
      {/* Heading */}
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-6">
        All Products List
      </h1>

      {/* Table Header */}
      <div className="grid grid-cols-6 bg-gray-100 text-gray-700 font-semibold p-3 rounded-md text-xs sm:text-sm md:text-base">
        <p className="text-center">Product</p>
        <p className="text-center">Title</p>
        <p className="text-center">Old Price</p>
        <p className="text-center">New Price</p>
        <p className="text-center">Category</p>
        <p className="text-center">Remove</p>
      </div>

      {/* Product List */}
      {/* Product List */}
      <div className="divide-y divide-gray-300">
        {allProduct.map((product) => (
          <div key={product._id} className="p-3">
            <div className="grid grid-cols-6 items-center text-xs sm:text-sm md:text-base">
              <img
                src={product.image}
                alt={product.name}
                className="w-8 h-8 sm:w-10 sm:h-10 object-cover mx-auto"
              />
              <p className="text-center">{product.name}</p>
              <p className="text-center text-gray-500">${product.old_price}</p>
              <p className="text-center text-green-600 font-semibold">${product.new_price}</p>
              <p className="text-center">{product.category}</p>
              <AiOutlineClose
                onClick={() => handleRemoveProduct(product._id)}
                className="mx-auto text-red-500 cursor-pointer text-sm sm:text-lg hover:text-red-700"
              />
            </div>
            <hr />
          </div>
        ))}
      </div>

    </div>

  );
};

export default ListProduct;
