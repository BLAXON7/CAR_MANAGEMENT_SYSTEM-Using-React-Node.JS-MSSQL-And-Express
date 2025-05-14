import React, { useState, useEffect,useCallback } from "react";
import { useNavigate } from "react-router-dom";

const SuggestCar = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    makeName: "",
    country: "",
    modelName: "",
    category: "",
    variantName: "",
    fuelType: "",
    transmission: "",
    color: "",
    year: new Date().getFullYear(),
    description: ""
  });
  
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showForm, setShowForm] = useState(true);
  const userID = localStorage.getItem("userid");

  const fetchUserSuggestions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/GetUserCarSuggestions?userID=${userID}`);
      const data = await response.json();
      setUserSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  }, [userID]); // Add userID as dependency

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
      return;
    }
    
    fetchUserSuggestions();
  }, [loggedIn, navigate, fetchUserSuggestions]); // Added fetchUserSuggestions to dependency array




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setMessage({ text: "Submitting your suggestion...", type: "info" });
      
      const queryParams = new URLSearchParams({
        userID,
        MakeName: formData.makeName,
        Country: formData.country,
        ModelName: formData.modelName,
        Category: formData.category,
        VariantName: formData.variantName,
        FuelType: formData.fuelType,
        Transmission: formData.transmission,
        Color: formData.color,
        Year: formData.year,
        Description: formData.description
      }).toString();

      const response = await fetch(`http://localhost:5000/api/SubmitCarSuggestion?${queryParams}`);
      
      if (!response.ok) {
        throw new Error("Failed to submit suggestion");
      }
     
      const result = await response.json();
      
      if (result) {
        setMessage({ text: "Car suggestion submitted successfully!", type: "success" });
        setFormData({
          makeName: "",
          country: "",
          modelName: "",
          category: "",
          variantName: "",
          fuelType: "",
          transmission: "",
          color: "",
          year: new Date().getFullYear(),
          description: ""
        });
        
        // Refresh the suggestions list
        fetchUserSuggestions();
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      setMessage({ text: `Error: ${error.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2 py-1 bg-yellow-800 text-yellow-100 rounded-full text-xs font-medium">Pending</span>;
      case 'Approved':
        return <span className="px-2 py-1 bg-green-800 text-green-100 rounded-full text-xs font-medium">Approved</span>;
      case 'Rejected':
        return <span className="px-2 py-1 bg-red-800 text-red-100 rounded-full text-xs font-medium">Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-gray-800 text-gray-100 rounded-full text-xs font-medium">Unknown</span>;
    }
  };

  return (
    <div 
      className="min-h-screen py-10 px-4"
      style={{
        backgroundImage: "linear-gradient(111.1deg, rgba(69,150,164,1) 2.5%, rgba(17,20,34,1) 100.3%)",
        height: "100%",
        overflowY: "auto"
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-[#E0E0E0] font-oxanium text-center">Suggest a New Car</h1>
        
        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${
            message.type === 'success' ? 'bg-green-800 text-green-100' : 
            message.type === 'error' ? 'bg-red-800 text-red-100' : 
            'bg-blue-800 text-blue-100'}`}>
            {message.text}
          </div>
        )}

        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Left side - Form or Success Message */}
          <div className="flex-1">
            {showForm ? (
              <form onSubmit={handleSubmit} className="bg-[#0f172a] shadow-md rounded-lg p-6 border border-gray-700 max-h-[80vh] overflow-y-auto">
                {message.text && (
                <div className={`p-4 mb-6 rounded-md ${
                    message.type === 'success' ? 'bg-green-800 text-green-100' : 
                    message.type === 'error' ? 'bg-red-800 text-red-100' : 
                    'bg-blue-800 text-blue-100'}`}>
                    {message.text}
                </div>
                )}
                
                <p className="mb-4 text-[#E0E0E0] font-oxanium">
                  Submit your car suggestion for admin review. Once approved, the car will be added to our database.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-[#E0E0E0] text-sm font-bold mb-2 font-oxanium" htmlFor="makeName">
                      Make Name *
                    </label>
                    <input
                      type="text"
                      id="makeName"
                      name="makeName"
                      value={formData.makeName}
                      onChange={handleChange}
                      className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#E0E0E0] text-sm font-bold mb-2 font-oxanium" htmlFor="country">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#E0E0E0] text-sm font-bold mb-2 font-oxanium" htmlFor="modelName">
                      Model Name *
                    </label>
                    <input
                      type="text"
                      id="modelName"
                      name="modelName"
                      value={formData.modelName}
                      onChange={handleChange}
                      className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#E0E0E0] text-sm font-bold mb-2 font-oxanium" htmlFor="category">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
                    >
                      <option value="">Select Category</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Sports Car">Sports Car</option>
                      <option value="Truck">Truck</option>
                      <option value="Van">Van</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#E0E0E0] text-sm font-bold mb-2 font-oxanium" htmlFor="variantName">
                      Variant Name *
                    </label>
                    <input
                      type="text"
                      id="variantName"
                      name="variantName"
                      value={formData.variantName}
                      onChange={handleChange}
                      className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#E0E0E0] text-sm font-bold mb-2 font-oxanium" htmlFor="fuelType">
                      Fuel Type
                    </label>
                    <select
                      id="fuelType"
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
                      className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="Gasoline">Gasoline</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Electric</option>
                      <option value="CNG">CNG</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#E0E0E0] text-sm font-bold mb-2 font-oxanium" htmlFor="transmission">
                      Transmission
                    </label>
                    <select
                      id="transmission"
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleChange}
                      className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569] shadow-sm focus:shadow"
                    >
                      <option value="">Select Transmission</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                      <option value="CVT">CVT</option>
                      <option value="Semi-Automatic">Semi-Automatic</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#E0E0E0] text-sm font-bold mb-2 font-oxanium" htmlFor="color">
                      Color *
                    </label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#E0E0E0] text-sm font-bold mb-2 font-oxanium" htmlFor="year">
                      Year *
                    </label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-[#E0E0E0] text-sm font-bold mb-2 font-oxanium" htmlFor="description">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center justify-between mt-4">
                <button
                    type="submit"
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200 shadow-md hover:shadow-lg font-oxanium"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Suggestion"}
                </button>
                </div>
              </form>
            ) : (
              <div className="bg-[#0f172a] border border-gray-700 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <svg className="h-12 w-12 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-2xl font-semibold text-[#E0E0E0] font-oxanium">Suggestion Submitted!</h2>
                </div>
                <p className="text-[#E0E0E0] mb-6 font-oxanium">
                  Thank you for your car suggestion. An admin will review your submission shortly.
                  You'll be notified once it's approved or rejected.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 shadow-md hover:shadow-lg font-oxanium"
                >
                  Submit Another Suggestion
                </button>
              </div>
            )}
          </div>
          
          {/* Right side - Suggestions History */}
          <div className="lg:w-2/5">
            <div className="bg-[#0f172a] shadow-md rounded-lg p-6 border border-gray-700 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 text-[#E0E0E0] font-oxanium">Your Suggestions</h2>
              
              {loading && userSuggestions.length === 0 ? (
                <p className="text-[#E0E0E0]">Loading your suggestions...</p>
              ) : userSuggestions.length > 0 ? (
                <div className="space-y-4">
                  {userSuggestions.map((suggestion) => (
                    <div key={suggestion.SuggestionID} className="border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-[#E0E0E0] font-oxanium">
                          {suggestion.MakeName} {suggestion.ModelName}
                        </h3>
                        {getStatusBadge(suggestion.Status)}
                      </div>
                      <p className="text-sm text-gray-400 mb-1">Submitted: {new Date(suggestion.SubmittedAt).toLocaleDateString()}</p>
                      {suggestion.AdminComment && (
                        <div className="mt-2 text-sm">
                          <p className="font-medium text-[#E0E0E0] font-oxanium">Admin Feedback:</p>
                          <p className="text-gray-400">{suggestion.AdminComment}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">You haven't submitted any car suggestions yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestCar;