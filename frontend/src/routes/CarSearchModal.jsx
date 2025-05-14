import React, { useState, useEffect } from "react";

const CarSearchModal = ({ isOpen, onClose, onSelectCar, context }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Search functionality
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
   
    setLoading(true);
    setError(null);
    
    try {
      // Use SearchCarsWithFeatures with context-specific filtering
      const showRentals = context === "Renter" ? 1 : 0;
      const showSales = context === "Seller" ? 1 : 0;
      
      const response = await fetch(`http://localhost:5000/api/SearchCarsWithFeatures?SearchTerm=${encodeURIComponent(searchTerm)}&ShowRentals=${showRentals}&ShowSales=${showSales}`);
      
      if (!response.ok) {
        throw new Error("Failed to search for cars");
      }
      
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error searching cars:", error);
      setError("Failed to search for cars. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  
  // Load available cars on initial render
  useEffect(() => {
    const loadInitialCars = async () => {
      setLoading(true);
      try {
        // Get both listed cars and newly added cars
        const showRentals = context === "Renter" ? 1 : 0;
        const showSales = context === "Seller" ? 1 : 0;
        
        const [featuredResponse, availableResponse] = await Promise.all([
          fetch(`http://localhost:5000/api/SearchCarsWithFeatures?ShowRentals=${showRentals}&ShowSales=${showSales}`),
          fetch(`http://localhost:5000/api/GetAllAvailableCars`)
        ]);

        if (!featuredResponse.ok || !availableResponse.ok) {
          throw new Error("Failed to load cars");
        }
        
        const featuredData = await featuredResponse.json();
        const availableData = await availableResponse.json();
        
        // Combine both sets of cars, avoiding duplicates
        const existingCarIds = new Set(featuredData.map(car => car.CarID));
        const uniqueAvailableCars = availableData.filter(car => !existingCarIds.has(car.CarID));
        
        // Mark the source of each car for UI purposes
        const combinedCars = [
          ...featuredData.map(car => ({ ...car, source: 'listed' })),
          ...uniqueAvailableCars.map(car => ({ ...car, source: 'new' }))
        ];
        
        setCars(combinedCars);
      } catch (error) {
        console.error("Error loading cars:", error);
        setError("Failed to load available cars. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    if (isOpen) {
      loadInitialCars();
    }
  }, [isOpen, context]);
  
  // If modal is not open, don't render anything
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-[#0f172a] rounded-xl p-6 w-full max-w-3xl" style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#E0E0E0]">Select a Car</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search by make, model, or variant..."
            className="w-full bg-[#1e293b] placeholder:text-[#94a3b8] text-[#e2e8f0] text-sm border border-[#334155] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#60a5fa] hover:border-[#475569]"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-slate-800 px-4 py-2 text-sm text-[#E0E0E0] rounded-md hover:bg-slate-700"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-800 text-white p-3 mb-4 rounded-md">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#60a5fa]"></div>
          </div>
        ) : cars.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No cars found. Try a different search term.</p>
        ) : (
          <div className="grid gap-4">
            {cars.map((car) => (
              <div 
                key={car.CarID} 
                className="bg-[#1e293b] p-4 rounded-lg cursor-pointer hover:bg-[#2d3748] transition-colors"
                onClick={() => {
                  const normalizedCar = {
                    ...car,
                    CarID: car.CarID || car.carID || car.carid || car.carId
                  };
                  onSelectCar(normalizedCar);
                }}
              >
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <h4 className="text-[#E0E0E0] font-bold">
                        {car.MakeName} {car.ModelName} {car.VariantName}
                      </h4>
                      {car.source === 'new' && (
                        <span className="ml-2 bg-green-800 text-green-100 text-xs px-2 py-0.5 rounded">
                          New Addition
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">
                      {car.Year} • {car.Color} • {car.Transmission || "N/A"}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {car.Description?.substring(0, 100)}
                      {car.Description?.length > 100 ? '...' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-[#334155] text-[#E0E0E0] px-2 py-1 rounded">
                      ID: {car.CarID}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarSearchModal;
