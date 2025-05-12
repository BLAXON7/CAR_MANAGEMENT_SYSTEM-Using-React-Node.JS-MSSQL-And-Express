import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const Navigate = useNavigate();
  const userId = localStorage.getItem("userid");
  const userRole = localStorage.getItem("userrole");
  
  const [formData, setFormData] = useState({
    MakeName: "",
    Country: "Unknown", // Default value matching the DB constraint
    ModelName: "",
    Category: "",
    VariantName: "",
    FuelType: "",
    Transmission: "",
    Color: "",
    Year: new Date().getFullYear(),
    Description: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Redirect non-admins
  useEffect(() => {
    if (!userId) {
      Navigate('/');
    } else if (userRole !== "Admin") {
      Navigate('/Dashboard');
    }
  }, [Navigate, userId, userRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form before submission
  const validateForm = () => {
    // Required fields validation
    if (!formData.MakeName) return "Make name is required";
    if (!formData.ModelName) return "Model name is required";
    if (!formData.VariantName) return "Variant name is required";
    if (!formData.Color) return "Color is required";
    if (!formData.Year) return "Year is required";
    if (!formData.Description) return "Description is required";
    
    // Year constraint matching the database CHECK constraint
    if (formData.Year < 1900 || formData.Year > new Date().getFullYear()) {
      return "Year must be between 1900 and " + new Date().getFullYear();
    }
    
    return null; // No validation errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    // Run validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setLoading(true);
    
    try {
      // Build query params - ONLY include parameters that the backend procedure expects
      const queryParams = new URLSearchParams({
        MakeName: formData.MakeName,
        Country: formData.Country || "Unknown",
        ModelName: formData.ModelName,
        Category: formData.Category || "",
        VariantName: formData.VariantName,
        FuelType: formData.FuelType || "",
        Transmission: formData.Transmission || "",
        Color: formData.Color,
        Year: formData.Year,
        Description: formData.Description
      }).toString();
      
      console.log("Sending request with params:", queryParams);
      
      const response = await fetch(`http://localhost:5000/api/AddCar?${queryParams}`, {
        method: "GET",
      });
      
      if(response.ok) {
        setSuccess(true);
        // Reset form after successful submission
        setFormData({
          MakeName: "",
          Country: "Unknown",
          ModelName: "",
          Category: "",
          VariantName: "",
          FuelType: "",
          Transmission: "",
          Color: "",
          Year: new Date().getFullYear(),
          Description: ""
        });
      } else {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to add car");
      }
    } catch (error) {
      console.error("Add car API error:", error);
      setError(error.message || "An error occurred. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-start min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(111.1deg, rgba(69,150,164,1) 2.5%, rgba(17,20,34,1) 100.3%)",
        maxHeight: "80vh",
        overflowY: "auto",
        height: "fit-content"
      }}
    >
      <div className="bg-[#0f172a] rounded-xl p-6 w-full max-w-md my-16" style={{ height: "auto", minHeight: "500px", overflowY: "auto" }}>
        <h4 className="text-xl font-oxaniun text-[#E0E0E0] font-extrabold mb-2">Add New Car</h4>
        <p className="text-sm text-[#E0E0E0] font-bold mb-6">Enter car details below</p>

        {error && (
          <div className="bg-red-800 text-white p-3 mb-4 rounded-md">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-800 text-white p-3 mb-4 rounded-md">
            Car added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Make</label>
            <input
              type="text"
              name="MakeName"
              value={formData.MakeName}
              onChange={handleChange}
              placeholder="Enter make (e.g. Toyota)"
              required
              maxLength={100}
              className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
            />
          </div>
          
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Country</label>
            <input
              type="text"
              name="Country"
              value={formData.Country}
              onChange={handleChange}
              placeholder="Enter country of origin"
              required
              maxLength={100}
              className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
            />
          </div>
          
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Model</label>
            <input
              type="text"
              name="ModelName"
              value={formData.ModelName}
              onChange={handleChange}
              placeholder="Enter model (e.g. Corolla)"
              required
              maxLength={100}
              className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
            />
          </div>
          
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Category</label>
            <input
              type="text"
              name="Category"
              value={formData.Category}
              onChange={handleChange}
              placeholder="Enter category (e.g. Sedan, SUV)"
              maxLength={100}
              className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
            />
          </div>
          
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Variant</label>
            <input
              type="text"
              name="VariantName"
              value={formData.VariantName}
              onChange={handleChange}
              placeholder="Enter variant (e.g. LE, XLE)"
              required
              maxLength={100}
              className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
            />
          </div>
          
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Fuel Type</label>
            <input
              type="text"
              name="FuelType"
              value={formData.FuelType}
              onChange={handleChange}
              placeholder="Enter fuel type"
              maxLength={50}
              className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
            />
          </div>
          
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Transmission</label>
            <input
              type="text"
              name="Transmission"
              value={formData.Transmission}
              onChange={handleChange}
              placeholder="Enter transmission type"
              maxLength={50}
              className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
            />
          </div>
          
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Color</label>
            <input
              type="text"
              name="Color"
              value={formData.Color}
              onChange={handleChange}
              placeholder="Enter color"
              required
              maxLength={50}
              className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
            />
          </div>
          
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Year</label>
            <input
              type="number"
              name="Year"
              value={formData.Year}
              onChange={handleChange}
              placeholder="Enter year"
              required
              min="1900"
              max={new Date().getFullYear()}
              className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
            />
          </div>
          
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Description</label>
            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              placeholder="Enter description"
              required
              rows="4"
              className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className={`mt-4 rounded-md ${loading || success ? 'bg-slate-600' : 'bg-slate-800'} py-2 px-4 text-sm text-[#E0E0E0] border border-transparent transition-all shadow-md hover:bg-slate-700 hover:shadow-lg active:bg-slate-700 ${loading || success ? 'cursor-not-allowed' : ''}`}
          >
            {loading ? "Adding Car..." : success ? "Added Successfully!" : "Add Car"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;