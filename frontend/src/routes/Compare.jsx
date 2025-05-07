import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Compare.css';

const Compare = ({loggedIn}) => {
  const Navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [selectedCar1, setSelectedCar1] = useState("");
  const [selectedCar2, setSelectedCar2] = useState("");
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!loggedIn) {
      Navigate('/');
    } else {
      fetchAvailableCars();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Navigate, loggedIn]);

  const fetchAvailableCars = async () => {
    try {
      setLoading(true);
      // Fetch all available cars to populate dropdowns
      const saleCarsResponse = await fetch('http://localhost:5000/api/Salecars');
      const rentCarsResponse = await fetch('http://localhost:5000/api/Rentcars');
      
      if (saleCarsResponse.ok && rentCarsResponse.ok) {
        const saleCarsData = await saleCarsResponse.json();
        const rentCarsData = await rentCarsResponse.json();

        
        // Format options for dropdown with just carID and display info
        const formattedCars = [...saleCarsData, ...rentCarsData].map(car => ({
          carID: car.carID || car.CarID,
          displayName: `${car.Make || car.make || 'Unknown'} ${car.Model || car.model || 'Model'} ${car.Year || car.year || ''}`,
          price: car.Price || car.price || car.total_price || 0
        }));
        
        setCars(formattedCars);
      } else {
        setError("Failed to load cars. Please refresh the page.");
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setError("Error loading cars. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  const compareSelected = async () => {
    if (!selectedCar1 || !selectedCar2) {
      alert("Please select two cars to compare");
      return;
    }

    // Clear any previous comparison and errors
    setComparisonData(null);
    setError(null);
    
    // Convert to integers
    const carId1 = parseInt(selectedCar1, 10);
    const carId2 = parseInt(selectedCar2, 10);
   
    if (isNaN(carId1) || isNaN(carId2)) {
      setError("Invalid car selection");
      return;
    }

    setLoading(true);
    try {
      console.log(`Comparing cars ${carId1} and ${carId2}`);
      const response = await fetch(`http://localhost:5000/api/CompareCars?car_id1=${carId1}&car_id2=${carId2}`);
      
      if (response.ok) {
        const data = await response.json();
        
        if (!data || data.length < 2) {
          setError("Couldn't load comparison data for both cars.");
          return;
        }
        
        setComparisonData(data);
      } else {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.error || "Failed to compare cars. Please try again.");
      }
    } catch (error) {
      console.error("Error comparing cars:", error);
      setError("Error comparing cars. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to determine if a value should be treated as "better" when higher
  const isHigherBetter = (key) => {
    const lowerBetterFields = ['Price', 'price', 'total_price'];
    return !lowerBetterFields.includes(key);
  };

  // Helper function to format comparison value display
  const formatValue = (value, key) => {
    if (value === null || value === undefined) return 'N/A';
    
    // Format currency values
    if (key.toLowerCase().includes('price')) {
      return `$${value.toLocaleString()}`;
    }
    
    // Format year values
    if (key === 'Year') {
      return value;
    }
    
    // Long text values
    if (typeof value === 'string' && value.length > 100) {
      return value.substring(0, 100) + '...';
    }
    
    return value;
  };

  return (
    <div className="compare-container">
      <h1 className="compare-title">Compare Cars</h1>
      
      {error && (
        <div className="error-message">{error}</div>
      )}
      
      <div className="car-selection">
        <div className="car-select-container">
          <label className="car-select-label">Select First Car</label>
          <select 
            className="car-select"
            value={selectedCar1}
            onChange={(e) => setSelectedCar1(e.target.value)}
            disabled={loading}
          >
            <option value="">Select a car</option>
            {cars.map(car => (
              <option key={`car1-${car.carID}`} value={car.carID}>
                {car.displayName} - {car.price ? `$${car.price}` : 'For Rent'}
              </option>
            ))}
          </select>
        </div>
        
        <div className="car-select-container">
          <label className="car-select-label">Select Second Car</label>
          <select 
            className="car-select"
            value={selectedCar2}
            onChange={(e) => setSelectedCar2(e.target.value)}
            disabled={loading}
          >
            <option value="">Select a car</option>
            {cars.map(car => (
              <option key={`car2-${car.carID}`} value={car.carID}>
                {car.displayName} - {car.price ? `$${car.price}` : 'For Rent'}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="compare-button-container">
        <button 
          className="compare-button"
          onClick={compareSelected}
          disabled={loading || !selectedCar1 || !selectedCar2}
        >
          {loading ? "Comparing..." : "Compare Cars"}
        </button>
      </div>
      
      {comparisonData && comparisonData.length >= 2 && (
        <div className="comparison-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>{comparisonData[0]?.Make || 'Car 1'} {comparisonData[0]?.Model || ''}</th>
                <th>{comparisonData[1]?.Make || 'Car 2'} {comparisonData[1]?.Model || ''}</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(comparisonData[0])
                .filter(key => key !== 'CarID' && key !== 'carID' && key !== 'Description') // Filter out unnecessary fields
                .map(key => {
                  // Get values for comparison
                  const value1 = comparisonData[0][key];
                  const value2 = comparisonData[1][key];
                  
                  // Determine if values are numeric and can be compared
                  const isNumber1 = typeof value1 === 'number' && !isNaN(value1);
                  const isNumber2 = typeof value2 === 'number' && !isNaN(value2);
                  const canCompare = isNumber1 && isNumber2;
                  
                  // Determine which is better (for some values, lower is better)
                  const higherIsBetter = isHigherBetter(key);
                  
                  let class1 = "equal-value";
                  let class2 = "equal-value";
                  
                  if (canCompare && value1 !== value2) {
                    if (higherIsBetter) {
                      class1 = value1 > value2 ? "better-value" : "worse-value";
                      class2 = value2 > value1 ? "better-value" : "worse-value";
                    } else {
                      class1 = value1 < value2 ? "better-value" : "worse-value";
                      class2 = value2 < value1 ? "better-value" : "worse-value";
                    }
                  }

                  return (
                    <tr key={key}>
                      <td className="feature-name">{key}</td>
                      <td className={class1}>
                        {formatValue(value1, key)}
                      </td>
                      <td className={class2}>
                        {formatValue(value2, key)}
                      </td>
                    </tr>
                  );
                })}
                
              {/* Add description row separately if it exists */}
              {comparisonData[0].Description && (
                <tr>
                  <td className="feature-name">Description</td>
                  <td colSpan="2" className="description-cell">
                    <div className="car-description">
                      <h4>{comparisonData[0].Make} {comparisonData[0].Model}</h4>
                      <p>{comparisonData[0].Description}</p>
                    </div>
                    <div className="car-description">
                      <h4>{comparisonData[1].Make} {comparisonData[1].Model}</h4>
                      <p>{comparisonData[1].Description}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Compare;