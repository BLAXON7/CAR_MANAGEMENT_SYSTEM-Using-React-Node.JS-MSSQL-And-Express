import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const CarSuggestions = ({ loggedIn }) => {
  const navigate = useNavigate();
  const adminID = localStorage.getItem("userid");
  const userRole = localStorage.getItem("userrole");
  
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [adminComment, setAdminComment] = useState("");
  const [processingId, setProcessingId] = useState(null);

  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchPendingSuggestions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/GetPendingCarSuggestions?adminID=${adminID}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setMessage({ text: `Error loading suggestions: ${error.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  }, [adminID]);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
      return;
    }
    
    if (userRole !== "Admin") {
      navigate("/Dashboard");
      return;
    }
    
    fetchPendingSuggestions();
  }, [loggedIn, navigate, userRole, fetchPendingSuggestions]); // Added fetchPendingSuggestions to dependency array

  const handleViewDetails = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setAdminComment(""); 
  };
  const handleProcessSuggestion = async (suggestionID, status) => {
    try {
      setProcessingId(suggestionID);
      
      const queryParams = new URLSearchParams({
        adminID,
        suggestionID,
        status,
        adminComment
      }).toString();

      const response = await fetch(`http://localhost:5000/api/ProcessCarSuggestion?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`Failed to ${status.toLowerCase()} suggestion`);
      }
      
      setMessage({ 
        text: `Suggestion ${status.toLowerCase()} successfully!`, 
        type: "success" 
      });
      
      // Remove the processed suggestion from the list
      setSuggestions(prev => prev.filter(s => s.SuggestionID !== suggestionID));
      setSelectedSuggestion(null);
      
    } catch (error) {
      console.error(`Error ${status.toLowerCase()}ing suggestion:`, error);
      setMessage({ text: `Error: ${error.message}`, type: "error" });
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div
      className="min-h-screen py-6 px-4"
      style={{
        backgroundImage: "linear-gradient(111.1deg, rgba(69,150,164,1) 2.5%, rgba(17,20,34,1) 100.3%)",
        height: "100%",
        overflowY: "auto"
      }}
    >
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 text-[#E0E0E0] font-oxanium text-center">Car Suggestions Review</h1>
        
        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Suggestion List */}
          <div className="md:col-span-1 bg-[#0f172a] shadow-md rounded-lg p-4 border border-gray-700" style={{ maxHeight: "80vh" }}>
            <h2 className="text-xl font-bold mb-4 text-[#E0E0E0] font-oxanium">Pending Suggestions</h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-2 max-h-[calc(80vh-120px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                {suggestions.map((suggestion) => (
                  <div 
                    key={suggestion.SuggestionID} 
                    className={`p-3 border rounded-lg cursor-pointer hover:bg-[#1e293b] transition ${selectedSuggestion?.SuggestionID === suggestion.SuggestionID ? 'bg-[#1e293b] border-blue-700' : 'border-gray-700'}`}
                    onClick={() => handleViewDetails(suggestion)}
                  >
                    <h3 className="font-medium text-[#E0E0E0] font-oxanium">
                      {suggestion.MakeName} {suggestion.ModelName}
                    </h3>
                    <div className="flex justify-between items-center mt-1 text-sm">
                      <span className="text-gray-400">By: {suggestion.UserName}</span>
                      <span className="text-gray-400">{new Date(suggestion.SubmittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-10">No pending suggestions to review.</p>
            )}
          </div>

          {/* Right Column - Suggestion Details */}
          <div className="md:col-span-2">
            {selectedSuggestion ? (
              <div className="bg-[#0f172a] shadow-md rounded-lg p-6 border border-gray-700" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <h2 className="text-2xl font-bold mb-4 text-[#E0E0E0] font-oxanium">
                  {selectedSuggestion.MakeName} {selectedSuggestion.ModelName} {selectedSuggestion.VariantName}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 font-oxanium">Car Information</h3>
                    <ul className="mt-2 space-y-2 text-[#E0E0E0]">
                      <li><span className="font-medium">Make:</span> {selectedSuggestion.MakeName}</li>
                      <li><span className="font-medium">Model:</span> {selectedSuggestion.ModelName}</li>
                      <li><span className="font-medium">Variant:</span> {selectedSuggestion.VariantName}</li>
                      <li><span className="font-medium">Country:</span> {selectedSuggestion.Country || 'Not specified'}</li>
                      <li><span className="font-medium">Category:</span> {selectedSuggestion.Category || 'Not specified'}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 font-oxanium">Technical Specifications</h3>
                    <ul className="mt-2 space-y-2 text-[#E0E0E0]">
                      <li><span className="font-medium">Year:</span> {selectedSuggestion.Year}</li>
                      <li><span className="font-medium">Color:</span> {selectedSuggestion.Color}</li>
                      <li><span className="font-medium">Fuel Type:</span> {selectedSuggestion.FuelType || 'Not specified'}</li>
                      <li><span className="font-medium">Transmission:</span> {selectedSuggestion.Transmission || 'Not specified'}</li>
                      <li><span className="font-medium">Suggested by:</span> {selectedSuggestion.UserName}</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-400 font-oxanium">Description</h3>
                  <p className="mt-2 text-[#E0E0E0]">{selectedSuggestion.Description}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-400 font-oxanium">Admin Comment</h3>
                  <textarea
                    value={adminComment}
                    onChange={(e) => setAdminComment(e.target.value)}
                    placeholder="Provide feedback for this suggestion (optional)"
                    className="mt-2 w-full bg-transparent placeholder:text-[#94a3b8] text-[#E0E0E0] text-sm border border-slate-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-500 shadow-sm focus:shadow"
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => handleProcessSuggestion(selectedSuggestion.SuggestionID, 'Rejected')}
                    className="px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 focus:ring-offset-[#0f172a] transition duration-200 shadow-md"
                    disabled={processingId !== null}
                  >
                    {processingId === selectedSuggestion.SuggestionID ? 'Rejecting...' : 'Reject'}
                  </button>
                  <button
                    onClick={() => handleProcessSuggestion(selectedSuggestion.SuggestionID, 'Approved')}
                    className="px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 focus:ring-offset-[#0f172a] transition duration-200 shadow-md"
                    disabled={processingId !== null}
                  >
                    {processingId === selectedSuggestion.SuggestionID ? 'Approving...' : 'Approve'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#0f172a] border border-gray-700 rounded-lg p-10 text-center h-full flex items-center justify-center">
                <div className="text-gray-400">
                  <svg className="h-16 w-16 mx-auto mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                  <h3 className="text-lg font-medium mb-1 font-oxanium text-[#E0E0E0]">Select a Suggestion</h3>
                  <p className="font-oxanium">Click on a suggestion from the left panel to view details.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSuggestions;  