import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarSearchModal from "./CarSearchModal";

export function Seller() {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    carID: "",
    VIN: "",
    Condition: "",
    Location: "",
    State: "NEW", // Default to NEW
    Price: "",
    Negotiable: "0" // Default to non-negotiable (0)
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showCarSearch, setShowCarSearch] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  // Check if user is logged in and has seller role
  useEffect(() => {
    const userID = localStorage.getItem("userid");
    const userRole = localStorage.getItem("userrole");
    
    if (!userID) {
      setError("You must be logged in to access this page");
      setTimeout(() => Navigate('/'), 2000);
    } 
    else if (userRole !== "Seller") {
      setError("Only sellers can list cars for sale");
      setTimeout(() => Navigate('/'), 2000);
    }
  }, [Navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convert numeric inputs to appropriate format
    if (name === "carID" || name === "Price") {
      const numValue = value === "" ? "" : Number(value);
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectCar = (car) => {
    console.log("Received car in parent:", car); // Debug
    console.log("Car ID value:", car.CarID);     // Debug specific ID value
    console.log("Car keys:", Object.keys(car));  // Show all properties
    
    setSelectedCar(car);
    
    const carID = car.CarID || car.carID || car.carid || car.carId;
    
    console.log("Extracted carID:", carID);      // Debug the extracted value
    
    if (!carID) {
      console.error("Could not find car ID in the selected car object:", car);
    }
    
    // Force carID to be a number type for the form
    const numericCarID = carID ? Number(carID) : "";
    console.log("Setting carID in form:", numericCarID); // Debug the value being set
    
    setFormData(prev => {
      const updated = { 
        ...prev, 
        carID: numericCarID
      };
      console.log("Updated form data:", updated); // Debug final form state
      return updated;
    });
    
    setShowCarSearch(false);
  };

  // Validate form before submission
  const validateForm = () => {
    // Check for required fields
    if (!formData.carID) return "Car ID is required";
    if (!formData.VIN) return "VIN is required";
    if (!formData.Condition) return "Condition rating is required";
    if (!formData.Location) return "Location is required";
    if (!formData.State) return "State (NEW/USED) is required";
    if (!formData.Price) return "Price is required";
    
    // Validate VIN format (17 characters, alphanumeric)
    if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(formData.VIN)) {
      return "VIN must be 17 alphanumeric characters (excluding I, O, Q)";
    }
    
    // Validate Condition (must be 1-10)
    if (!/^(10|[1-9])$/.test(formData.Condition)) {
      return "Condition must be a number from 1-10";
    }
    
    // Validate State
    if (formData.State !== "NEW" && formData.State !== "USED") {
      return "State must be either NEW or USED";
    }
    
    // Validate Price (must be positive)
    if (parseFloat(formData.Price) <= 0) {
      return "Price must be greater than zero";
    }
    
    return null; // No validation errors
  };

  // Submit handler (same as before)
  const handleSubmit = async(e) => {
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
    
    // Get the user ID from localStorage (from login)
    const userID = localStorage.getItem("userid");
    
    if (!userID) {
      setError("You must be logged in to add a car");
      setLoading(false);
      return;
    }
    
    try {
      // First, get the Client_ID for this user - fix this part
      const sellerIDResponse = await fetch(`http://localhost:5000/api/GetClientID?userID=${userID}`);
      
      if (!sellerIDResponse.ok) {
        const errorText = await sellerIDResponse.text();
        throw new Error(`Failed to retrieve seller ID: ${errorText}`);
      }
      
      const sellerData = await sellerIDResponse.json();
      
      // Debug - check what's coming back
      console.log("Seller data:", sellerData);
      
      // Make sure we have a Client_ID
      if (!sellerData || !sellerData.Client_ID) {
        throw new Error("Your seller profile isn't properly set up. Please contact support.");
      }
      
      const clientID = sellerData.Client_ID;
      
      // Build query string with all parameters
      const queryParams = new URLSearchParams({
        carID: formData.carID,
        Client_ID: clientID, // Send Client_ID instead of userID
        VIN: formData.VIN,
        Condition: formData.Condition,
        Location: formData.Location,
        State: formData.State,
        Price: formData.Price,
        Negotiable: formData.Negotiable
      }).toString();
      
      // Log the query for debugging
      console.log("Sending request with params:", queryParams);
      
      const response = await fetch(`http://localhost:5000/api/AddCarForSale?${queryParams}`, {
        method: "GET",
      });
      
      if(response.ok) {
        setSuccess(true);
        // Reset form after successful submission
        setFormData({
          carID: "",
          VIN: "",
          Condition: "",
          Location: "",
          State: "NEW",
          Price: "",
          Negotiable: "0"
        });
        setSelectedCar(null);
      } else {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to add car for sale");
      }
    }
    catch (error) {
      console.error("Add car API error:", error);
      setError(error.message || "An error occurred. Please check your connection and try again.");
    } 
    finally {
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
        <h4 className="text-xl font-oxaniun text-[#E0E0E0] font-extrabold mb-2">Add Car For Sale</h4>
        <p className="text-sm text-[#E0E0E0] font-bold mb-6">Fill out the form to list your car.</p>

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
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Car</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="carID"
                value={formData.carID}
                onChange={handleChange}
                placeholder="Car ID"
                required
                min="1"
                className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
              <button 
                type="button" 
                onClick={() => setShowCarSearch(true)}
                className="bg-slate-800 px-4 py-2 text-sm text-[#E0E0E0] rounded-md hover:bg-slate-700"
              >
                Search
              </button>
            </div>
            {selectedCar && (
              <div className="mt-2 p-2 bg-[#1e293b] rounded-md">
                <p className="text-sm text-[#E0E0E0]">
                  <span className="font-bold">Selected:</span> {selectedCar.MakeName} {selectedCar.ModelName} {selectedCar.VariantName} ({selectedCar.Year})
                </p>
              </div>
            )}
          </div>
          
          {/* Rest of the form remains mostly the same */}
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">VIN</label>
            <input
              type="text"
              name="VIN"
              value={formData.VIN}
              onChange={handleChange}
              placeholder="Enter VIN (17 characters)"
              required
              maxLength="17"
              className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
          </div>
          
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Condition (1-10)</label>
            <input
              type="number"
              name="Condition"
              value={formData.Condition}
              onChange={handleChange}
              placeholder="Rate from 1-10"
              required
              min="1"
              max="10"
              className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
            <p className="text-xs text-gray-400 mt-1">10 = Perfect, 1 = Poor condition</p>
          </div>
          
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Location</label>
            <input
              type="text"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              placeholder="Enter city"
              required
              className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
          </div>
          
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">State</label>
            <select
              name="State"
              value={formData.State}
              onChange={handleChange}
              required
              className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
            >
              <option value="NEW">NEW</option>
              <option value="USED">USED</option>
            </select>
          </div>
          
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Price</label>
            <input
              type="number"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              min="1"
              step="0.01"
              className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
          </div>
          
          <div className="w-full">
            <label className="block mb-1 text-sm text-[#E0E0E0] font-bold">Negotiable Price</label>
            <select
              name="Negotiable"
              value={formData.Negotiable}
              onChange={handleChange}
              className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className={`mt-4 rounded-md ${loading || success ? 'bg-slate-600' : 'bg-slate-800'} py-2 px-4 text-sm text-[#E0E0E0] border border-transparent transition-all shadow-md hover:bg-slate-700 hover:shadow-lg active:bg-slate-700 ${loading || success ? 'cursor-not-allowed' : ''}`}
          >
            {loading ? "Adding Car..." : success ? "Added Successfully!" : "Submit"}
          </button>
        </form>
      </div>
      
      {/* Car search modal */}
      <CarSearchModal 
        isOpen={showCarSearch} 
        onClose={() => setShowCarSearch(false)} 
        onSelectCar={handleSelectCar} 
        context="Seller"
      />
    </div>
  );
}

export default Seller;