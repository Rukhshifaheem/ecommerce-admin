import { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "", new_price: "", old_price: "", category: "women", image: ""
  });

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result); // Store Base64 image
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleChange = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value
    });
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure image is stored in productDetails
    const updatedProductDetails = {
      ...productDetails,
      image: image, // Store Base64 image
    };
  
    try {
      const response = await axios.post("http://localhost:3000/product/addProduct", updatedProductDetails, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 201) {
        setProductDetails({ name: "", new_price: "", old_price: "", category: "women", image: "" });
        setImage(false); // Reset image preview
        
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="sm:mt-2 md:mt-16 p-4 sm:p-6 lg:p-10 sm:w-full lg:w-3/4 bg-white shadow-lg rounded-lg md:ml-0">
      {/* Product Title */}
      <div className="mb-3">
        <label className="block text-gray-500 font-semibold mb-3">Product title</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          placeholder="Type here"
          value={productDetails.name}
          onChange={handleChange}
          name="name"
        />
      </div>

      {/* Price & Offer Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-500 font-semibold mb-3">Price</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            placeholder="Type here"
            value={productDetails.old_price}
            onChange={handleChange}
            name="old_price"
          />
        </div>
        <div>
          <label className="block text-gray-500 font-semibold mb-3">Offer Price</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            placeholder="Type here"
            value={productDetails.new_price}
            onChange={handleChange}
            name="new_price"
          />
        </div>
      </div>

      {/* Product Category */}
      <div className="mb-3">
        <label className="block text-gray-500 font-semibold mb-3">Product Category</label>
        <select 
          className="w-full sm:w-1/2 px-4 py-2 text-gray-500 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mb-3"
          value={productDetails.category}
          onChange={handleChange}
          name="category"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      {/* Upload Image */}
      <div className="mb-3">
        <label
          htmlFor="file-input"
          className="w-full sm:w-1/2 md:w-1/4 h-32 flex flex-col items-center justify-center border-2 border-gray-200 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 mb-5"
        >
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              className="w-full h-32 object-cover rounded-md"
            />
          ) : (
            <>
              <FaCloudUploadAlt className="text-4xl text-gray-500 mb-2" />
              <span className="text-gray-700 font-medium">Upload</span>
            </>
          )}
        </label>
        <input onChange={imageHandler} type="file" id="file-input" className="hidden" />
      </div>

      {/* Add Button */}
      <button 
        className="w-full sm:w-1/3 bg-blue-600 text-white py-2 rounded-md text-md font-semibold hover:bg-blue-700 transition"
        onClick={handleSubmit}
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;

