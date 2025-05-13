import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './market-place.css';

const CarDetailsModal = ({ car, onClose, onContactSeller, loggedIn, isRental }) => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    if (!loggedIn) {
      navigate('/');
      return;
    }
    onContactSeller(car);
  };

  if (!car) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Car Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Car Basic Info */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {car.MakeName} {car.ModelName}
                </h3>
                <p className="text-xl text-gray-600">{car.VariantName}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'PKR',
                    maximumFractionDigits: 0
                  }).format(car.Price)}
                </p>
                {car.negotiable_price && (
                  <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Negotiable
                  </span>
                )}
              </div>
            </div>

            {/* Car Image Placeholder */}
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-6">
              {/* Add actual car image here when available */}
            </div>

            {/* Quick Info Pills */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                car.State === 'NEW' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
              }`}>
                {car.State}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                parseInt(car.Condition) >= 8 ? 'bg-green-100 text-green-800' :
                parseInt(car.Condition) >= 6 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                Condition: {car.Condition}/10
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                Year: {car.Year}
              </span>
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Make</span>
                  <span className="font-medium text-gray-900">{car.MakeName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Model</span>
                  <span className="font-medium text-gray-900">{car.ModelName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Variant</span>
                  <span className="font-medium text-gray-900">{car.VariantName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Year</span>
                  <span className="font-medium text-gray-900">{car.Year}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-medium text-gray-900">{car.Condition}/10</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h4>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Transmission</span>
                  <span className="font-medium text-gray-900">{car.Transmission}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Fuel Type</span>
                  <span className="font-medium text-gray-900">{car.FuelType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium text-gray-900">{car.Location}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">State</span>
                  <span className="font-medium text-gray-900">{car.State}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Description</h4>
            <p className="text-gray-600 whitespace-pre-wrap">{car.Description || 'No description available.'}</p>
          </div>

          {/* Seller Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h4>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl text-gray-600">{car.UserName?.[0]?.toUpperCase()}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{car.UserName}</p>
                {car.Rating_Count && (
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400">{'★'.repeat(Math.floor(car.Rating_Count))}</span>
                    <span className="ml-1 text-sm text-gray-600">({car.Rating_Count})</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Add Rental Specific Information */}
          {isRental && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Rental Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-medium">{formatDate(car.start_date)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">End Date</p>
                  <p className="font-medium">{formatDate(car.end_date)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Price</p>
                  <p className="font-medium">{formatPrice(car.total_price)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Security Deposit</p>
                  <p className="font-medium">{formatPrice(car.security_deposit)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button 
              onClick={handleContactClick}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isRental ? 'Rent Now' : 'Contact Seller'}
            </button>
            <button 
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility functions
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(price);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getConditionColor = (condition) => {
  const conditionNum = parseInt(condition);
  if (conditionNum >= 8) return 'bg-green-100 text-green-800';
  if (conditionNum >= 6) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

const getStateColor = (state) => {
  return state === 'NEW' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
};

const MarketPlace = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [rentalCars, setRentalCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('sale');
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    variant: '',
    location: '',
    minPrice: '',
    maxPrice: ''
  });
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    if (!loggedIn) {
      navigate('/');
      return;
    }

    const fetchCars = async () => {
      try {
        const [saleResponse, rentResponse] = await Promise.all([
          fetch('http://localhost:5000/api/marketplace/unique-cars-on-sale'),
          fetch('http://localhost:5000/api/marketplace/unique-cars-on-rent')
        ]);

        const saleData = await saleResponse.json();
        const rentData = await rentResponse.json();

        if (saleData.success) {
          const uniqueCars = [];
          const seenKeys = new Set();
          
          saleData.data.forEach(car => {
            const key = `${car.Sale_Cars_ID}-${car.VIN}`;
            if (!seenKeys.has(key)) {
              seenKeys.add(key);
              uniqueCars.push(car);
            }
          });
          
          setCars(uniqueCars);
        }

        if (rentData.success) {
          const uniqueRentalCars = [];
          const seenRentalKeys = new Set();
          
          rentData.data.forEach(car => {
            const key = `${car.rental_id}-${car.VIN}`;
            if (!seenRentalKeys.has(key)) {
              seenRentalKeys.add(key);
              uniqueRentalCars.push(car);
            }
          });
          
          setRentalCars(uniqueRentalCars);
        }
      } catch (err) {
        console.error("API Error:", err);
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [loggedIn, navigate]);

  // Get unique makes with data validation
  const uniqueMakes = Array.from(
    new Set(
      cars
        .filter(car => car.MakeName && typeof car.MakeName === 'string')
        .map(car => car.MakeName.trim())
    )
  ).sort();

  // Get unique models based on selected make
  const uniqueModels = Array.from(
    new Set(
      cars
        .filter(car => {
          const makeMatch = !filters.make || 
            (car.MakeName && car.MakeName.toLowerCase().trim() === filters.make.toLowerCase().trim());
          return makeMatch && car.ModelName && typeof car.ModelName === 'string';
        })
        .map(car => car.ModelName.trim())
    )
  ).sort();

  // Get unique variants based on selected make and model
  const uniqueVariants = Array.from(
    new Set(
      cars
        .filter(car => {
          const makeMatch = !filters.make || 
            (car.MakeName && car.MakeName.toLowerCase().trim() === filters.make.toLowerCase().trim());
          const modelMatch = !filters.model || 
            (car.ModelName && car.ModelName.toLowerCase().trim() === filters.model.toLowerCase().trim());
          return makeMatch && modelMatch && car.VariantName && typeof car.VariantName === 'string';
        })
        .map(car => car.VariantName.trim())
    )
  ).sort();

  // Get unique locations with data validation for both sale and rental cars
  const uniqueLocations = Array.from(
    new Set([
      ...cars
        .filter(car => car.Location && typeof car.Location === 'string')
        .map(car => car.Location.trim()),
      ...rentalCars
        .filter(car => car.Location && typeof car.Location === 'string')
        .map(car => car.Location.trim())
    ])
  ).sort();

  // Get price range for both sale and rental cars
  const priceRange = [...cars, ...rentalCars].reduce((range, car) => {
    const price = Number(car.Price || car.total_price);
    if (!isNaN(price)) {
      range.min = Math.min(range.min, price);
      range.max = Math.max(range.max, price);
    }
    return range;
  }, { min: Infinity, max: -Infinity });

  // Filter cars based on all filters
  const filteredCars = cars.filter(car => {
    const makeMatch = !filters.make || 
      (car.MakeName && car.MakeName.toLowerCase().trim() === filters.make.toLowerCase().trim());
    
    const modelMatch = !filters.model || 
      (car.ModelName && car.ModelName.toLowerCase().trim() === filters.model.toLowerCase().trim());
    
    const variantMatch = !filters.variant || 
      (car.VariantName && car.VariantName.toLowerCase().trim() === filters.variant.toLowerCase().trim());
    
    const locationMatch = !filters.location || 
      (car.Location && car.Location.toLowerCase().trim() === filters.location.toLowerCase().trim());
    
    const price = Number(car.Price);
    const minPriceMatch = !filters.minPrice || (price >= Number(filters.minPrice));
    const maxPriceMatch = !filters.maxPrice || (price <= Number(filters.maxPrice));

    return makeMatch && modelMatch && variantMatch && locationMatch && minPriceMatch && maxPriceMatch;
  });

  // Filter rental cars based on all filters
  const filteredRentalCars = rentalCars.filter(car => {
    const makeMatch = !filters.make || 
      (car.MakeName && car.MakeName.toLowerCase().trim() === filters.make.toLowerCase().trim());
    
    const modelMatch = !filters.model || 
      (car.ModelName && car.ModelName.toLowerCase().trim() === filters.model.toLowerCase().trim());
    
    const variantMatch = !filters.variant || 
      (car.VariantName && car.VariantName.toLowerCase().trim() === filters.variant.toLowerCase().trim());
    
    const locationMatch = !filters.location || 
      (car.Location && car.Location.toLowerCase().trim() === filters.location.toLowerCase().trim());
    
    const price = Number(car.total_price);
    const minPriceMatch = !filters.minPrice || (price >= Number(filters.minPrice));
    const maxPriceMatch = !filters.maxPrice || (price <= Number(filters.maxPrice));

    return makeMatch && modelMatch && variantMatch && locationMatch && minPriceMatch && maxPriceMatch;
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [filterName]: value };
      
      // Reset dependent filters
      if (filterName === 'make') {
        newFilters.model = '';
        newFilters.variant = '';
      } else if (filterName === 'model') {
        newFilters.variant = '';
      }
      
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      make: '',
      model: '',
      variant: '',
      location: '',
      minPrice: '',
      maxPrice: ''
    });
  };

  // Add handleViewDetails function
  const handleViewDetails = (car) => {
    setSelectedCar(car);
  };

  // Add handleCloseModal function
  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  const handleContactSeller = async (car) => {
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        navigate('/');
        return;
      }

      // Make sure we have the seller's username
      if (!car.UserName) {
        alert('Seller information is missing. Please try again later.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/marketplace/purchase-car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: userId,
          carId: car.Sale_Cars_ID,
          sellerUsername: car.UserName // Changed from sellerId to sellerUsername
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setSelectedCar(null);
        alert('Successfully contacted seller!');
      } else {
        alert(data.message || 'Failed to contact seller. Please try again.');
      }
    } catch (error) {
      console.error('Error contacting seller:', error);
      alert('Error contacting seller. Please try again.');
    }
  };

  const handleRentCar = async (car) => {
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        navigate('/');
        return;
      }

      // Here you would implement the actual rental logic
      // For now, we'll just show an alert
      alert('Rental functionality coming soon!');
    } catch (error) {
      console.error('Error renting car:', error);
      alert('Error renting car. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="marketplace-container">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="marketplace-container">
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="marketplace-container">
      <div className="marketplace-content">
        {/* Header with Tabs */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Car Marketplace</h1>
          
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="border border-gray-200 rounded-lg flex">
              <button
                onClick={() => setActiveTab('sale')}
                className={`px-6 py-3 text-sm font-medium rounded-l-lg transition-colors ${
                  activeTab === 'sale'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cars on Sale
              </button>
              <button
                onClick={() => setActiveTab('rent')}
                className={`px-6 py-3 text-sm font-medium rounded-r-lg transition-colors ${
                  activeTab === 'rent'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cars on Rent
              </button>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'sale' ? (
          <>
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Make Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.make}
                    onChange={(e) => handleFilterChange('make', e.target.value)}
                  >
                    <option value="">All Makes</option>
                    {uniqueMakes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>

                {/* Model Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.model}
                    onChange={(e) => handleFilterChange('model', e.target.value)}
                    disabled={!filters.make}
                  >
                    <option value="">All Models</option>
                    {uniqueModels.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>

                {/* Variant Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Variant</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.variant}
                    onChange={(e) => handleFilterChange('variant', e.target.value)}
                    disabled={!filters.model}
                  >
                    <option value="">All Variants</option>
                    {uniqueVariants.map(variant => (
                      <option key={variant} value={variant}>{variant}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {uniqueLocations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filters */}
                <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        placeholder="Min Price"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        min={priceRange.min}
                        max={priceRange.max}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Max Price"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        min={priceRange.min}
                        max={priceRange.max}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className="mt-4 text-right">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'}
                {Object.entries(filters).some(([key, value]) => value) && ' matching your filters'}
              </p>
            </div>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
              {filteredCars.map((car) => (
                <div 
                  key={`${car.Sale_Cars_ID}-${car.history_id || 'nil'}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Car Image */}
                  <div className="h-48 bg-gray-200 relative">
                    <div className="absolute top-4 right-4 space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStateColor(car.State)}`}>
                        {car.State}
                      </span>
                      {car.negotiable_price && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Negotiable
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Car Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {car.MakeName} {car.ModelName}
                        </h3>
                        <p className="text-sm text-gray-500">{car.VariantName}</p>
                      </div>
                      <p className="text-xl font-bold text-blue-600">{formatPrice(car.Price)}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(car.Condition)}`}>
                          Condition: {car.Condition}/10
                        </span>
                        <span className="text-sm text-gray-500">• {car.Year}</span>
                      </div>

                      <div className="space-y-2">
                        <p className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">📍</span> {car.Location}
                        </p>
                        <p className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">🚗</span> {car.Transmission} • {car.FuelType}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">{car.Description}</p>
                      </div>

                      {/* Seller Info */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                            {/* Add actual profile image here */}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{car.UserName}</p>
                            {car.Rating_Count && (
                              <div className="flex items-center">
                                <span className="text-yellow-400">{'★'.repeat(Math.floor(car.Rating_Count))}</span>
                                <span className="ml-1 text-sm text-gray-600">({car.Rating_Count})</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <button 
                          onClick={() => {
                            if (!loggedIn) {
                              navigate('/');
                              return;
                            }
                            handleContactSeller(car);
                          }}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Contact Seller
                        </button>
                        <button 
                          onClick={() => handleViewDetails(car)}
                          className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal */}
            {selectedCar && (
              <CarDetailsModal
                car={selectedCar}
                onClose={handleCloseModal}
                onContactSeller={handleContactSeller}
                loggedIn={loggedIn}
              />
            )}

            {/* Empty State */}
            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl text-gray-600">No cars found matching your criteria</h3>
                <button 
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Make Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.make}
                    onChange={(e) => handleFilterChange('make', e.target.value)}
                  >
                    <option value="">All Makes</option>
                    {uniqueMakes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>

                {/* Model Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.model}
                    onChange={(e) => handleFilterChange('model', e.target.value)}
                    disabled={!filters.make}
                  >
                    <option value="">All Models</option>
                    {uniqueModels.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>

                {/* Variant Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Variant</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.variant}
                    onChange={(e) => handleFilterChange('variant', e.target.value)}
                    disabled={!filters.model}
                  >
                    <option value="">All Variants</option>
                    {uniqueVariants.map(variant => (
                      <option key={variant} value={variant}>{variant}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {uniqueLocations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filters */}
                <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        placeholder="Min Price"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        min={priceRange.min}
                        max={priceRange.max}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Max Price"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        min={priceRange.min}
                        max={priceRange.max}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className="mt-4 text-right">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredRentalCars.length} {filteredRentalCars.length === 1 ? 'car' : 'cars'}
                {Object.entries(filters).some(([key, value]) => value) && ' matching your filters'}
              </p>
            </div>

            {/* Rental Cars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
              {filteredRentalCars.map((car) => (
                <div 
                  key={`${car.rental_id}-${car.VIN}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Car Image */}
                  <div className="h-48 bg-gray-200 relative">
                    <div className="absolute top-4 right-4 space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        car.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {car.status}
                      </span>
                    </div>
                  </div>

                  {/* Car Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {car.MakeName} {car.ModelName}
                        </h3>
                        <p className="text-sm text-gray-500">{car.VariantName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">{formatPrice(car.total_price)}</p>
                        <p className="text-sm text-gray-500">Security: {formatPrice(car.security_deposit)}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(car.Condition)}`}>
                          Condition: {car.Condition}/10
                        </span>
                        <span className="text-sm text-gray-500">• {car.Year}</span>
                      </div>

                      <div className="space-y-2">
                        <p className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">📍</span> {car.Location}
                        </p>
                        <p className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">🚗</span> {car.Transmission} • {car.FuelType}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Available:</span> {formatDate(car.start_date)} - {formatDate(car.end_date)}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">{car.Description}</p>
                      </div>

                      {/* Seller Info */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                            {car.Profile_Pic ? (
                              <img src={car.Profile_Pic} alt={car.UserName} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                <span className="text-gray-600">{car.UserName?.[0]?.toUpperCase()}</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{car.UserName}</p>
                            {car.Rating_Count && (
                              <div className="flex items-center">
                                <span className="text-yellow-400">{'★'.repeat(Math.floor(car.Rating_Count))}</span>
                                <span className="ml-1 text-sm text-gray-600">({car.Rating_Count})</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <button 
                          onClick={() => handleRentCar(car)}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Rent Now
                        </button>
                        <button 
                          onClick={() => handleViewDetails(car)}
                          className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredRentalCars.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl text-gray-600">No rental cars found matching your criteria</h3>
                <button 
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Modal */}
        {selectedCar && (
          <CarDetailsModal
            car={selectedCar}
            onClose={handleCloseModal}
            onContactSeller={activeTab === 'sale' ? handleContactSeller : handleRentCar}
            loggedIn={loggedIn}
            isRental={activeTab === 'rent'}
          />
        )}
      </div>
    </div>
  );
};

export default MarketPlace;