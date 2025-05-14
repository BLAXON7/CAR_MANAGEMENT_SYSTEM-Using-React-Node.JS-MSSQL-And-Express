import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './market-place.css';
import carPlaceholder from './image.png';

const ReviewModal = ({ onClose, onSubmit, transactionId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg mx-4 transform transition-all">
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Success!</h2>
            <p className="text-green-600">Transaction completed successfully.</p>
          </div>
          
          {/* Transaction Details */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-1">Transaction Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Transaction ID: #{transactionId}</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Status: Completed</p>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Rate your experience</label>
            <div className="flex gap-3 justify-center my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <span className={`text-4xl ${
                    star <= (hoveredRating || rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}>
                    ★
                  </span>
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600">
              {rating ? `${rating} out of 5 stars` : 'Click to rate'}
            </p>
          </div>

          {/* Written Review */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Write a review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full h-20 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share your experience..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onSubmit({ rating, review })}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Submit Review
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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

            {/* Car Image */}
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 overflow-hidden">
              {car.image_url ? (
                <img 
                  src={car.image_url} 
                  alt={`${car.MakeName} ${car.ModelName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={carPlaceholder} 
                  alt="Default car placeholder"
                  className="w-full h-full object-cover"
                />
              )}
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

const TransactionModal = ({ onClose, onSubmit, car }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSubmit = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const userId = localStorage.getItem("userid");
      if (!userId) {
        throw new Error('User not logged in');
      }

      if (!startDate || !returnDate) {
        throw new Error('Please select both start and return dates');
      }

      const start = new Date(startDate);
      const end = new Date(returnDate);
      
      if (start >= end) {
        throw new Error('Return date must be after start date');
      }

      if (start < new Date()) {
        throw new Error('Start date cannot be in the past');
      }

      const paymentData = {
        CustomerID: parseInt(userId),
        RenterID: car.Client_ID,
        ClientCarID: car.Client_Car_ID,
        PaymentAmount: car.Actual_Amount_Paid || car.total_price,
        PaymentMethod: 'Credit Card',
        RenterRating: rating || null,
        CarRating: null,
        RenterFeedback: review || null,
        ActualReturnDate: returnDate,
        StartDate: startDate
      };

      const response = await fetch('http://localhost:5000/api/transactions/process-rental-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();
      
      if (data.success) {
        onSubmit({ 
          rating, 
          review, 
          transactionId: data.data?.transactionId,
          paymentStatus: 'Completed',
          paymentMethod: 'Credit Card',
          startDate,
          returnDate
        });
      } else {
        throw new Error(data.message || 'Failed to process payment');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setError(error.message || 'Failed to process payment');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg transform transition-all max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Complete Your Rental</h2>
            <p className="text-gray-600">Please select your rental dates and provide a rating</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {/* Car Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Rental Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-600">Car:</div>
              <div className="text-gray-900">{car.MakeName} {car.ModelName} {car.VariantName}</div>
              
              <div className="text-gray-600">Location:</div>
              <div className="text-gray-900">{car.Location}</div>
              
              <div className="text-gray-600">Amount:</div>
              <div className="text-gray-900">{formatPrice(car.Actual_Amount_Paid || car.total_price)}</div>
              
              <div className="text-gray-600">Payment Method:</div>
              <div className="text-gray-900">Credit Card</div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rate the Renter</label>
            <div className="flex gap-3 justify-center my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <span className={`text-3xl ${
                    star <= (hoveredRating || rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}>
                    ★
                  </span>
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600">
              {rating ? `${rating} out of 5 stars` : 'Click to rate'}
            </p>
          </div>

          {/* Review */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Write a Review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full h-20 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share your thoughts about the renter..."
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}
        </div>

        {/* Fixed Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className={`flex-1 bg-blue-600 text-white py-2 rounded-lg transition-colors ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Complete Rental'
              )}
            </button>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className={`flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg transition-colors ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PurchaseTransactionModal = ({ onClose, onSubmit, car }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Wallet');

  const handleSubmit = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const userId = localStorage.getItem("userid");
      if (!userId) {
        throw new Error('User not logged in');
      }

      const paymentData = {
        customerID: parseInt(userId),
        sellerID: car.Client_ID,
        clientCarID: car.Client_Car_ID,
        paymentAmount: car.Price,
        paymentMethod: paymentMethod
      };

      const response = await fetch('http://localhost:5000/api/transactions/purchase-car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();
      
      if (data.success) {
        onSubmit({ 
          transactionId: data.data?.transactionId,
          paymentStatus: 'Completed',
          paymentMethod: paymentMethod
        });
      } else {
        throw new Error(data.message || 'Failed to process payment');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setError(error.message || 'Failed to process payment');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg transform transition-all max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h2>
            <p className="text-gray-600">Please review your purchase details</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {/* Car Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Purchase Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-600">Car:</div>
              <div className="text-gray-900">{car.MakeName} {car.ModelName} {car.VariantName}</div>
              
              <div className="text-gray-600">Location:</div>
              <div className="text-gray-900">{car.Location}</div>
              
              <div className="text-gray-600">Amount:</div>
              <div className="text-gray-900">{formatPrice(car.Price)}</div>
              
              <div className="text-gray-600">Seller:</div>
              <div className="text-gray-900">{car.UserName}</div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Wallet">Wallet</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}
        </div>

        {/* Fixed Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className={`flex-1 bg-blue-600 text-white py-2 rounded-lg transition-colors ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Complete Purchase'
              )}
            </button>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className={`flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg transition-colors ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
            >
              Cancel
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
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const handleRentCar = async (car) => {
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        navigate('/');
        return;
      }

      setSelectedCar(car);
      setShowTransactionModal(true);
    } catch (error) {
      console.error('Error processing rental:', error);
    }
  };

  const handleContactSeller = async (car) => {
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        navigate('/');
        return;
      }

      setSelectedCar(car);
      setShowTransactionModal(true);
    } catch (error) {
      console.error('Error processing purchase:', error);
    }
  };

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
    // First check availability
    if (!car.Availability) {
      return false;
    }

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

            {/* Results Count with Availability Note */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredCars.length} available {filteredCars.length === 1 ? 'car' : 'cars'}
                {Object.entries(filters).some(([key, value]) => value) && ' matching your filters'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                * Only showing cars that are currently available for purchase
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
                    {car.image_url ? (
                      <img 
                        src={car.image_url} 
                        alt={`${car.MakeName} ${car.ModelName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={carPlaceholder} 
                        alt="Default car placeholder"
                        className="w-full h-full object-cover"
                      />
                    )}
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
                          onClick={() => handleContactSeller(car)}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Purchase
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

            {/* Empty State with Availability Message */}
            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl text-gray-600">No available cars found matching your criteria</h3>
                <p className="text-gray-500 mt-2">Cars might be currently unavailable or sold</p>
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
                    <img 
                      src={carPlaceholder} 
                      alt="Default car placeholder"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        car.RentalStatus === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {car.RentalStatus}
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
                        <p className="text-xl font-bold text-blue-600">{formatPrice(car.Actual_Amount_Paid || car.total_price)}</p>
                        <p className="text-sm text-gray-500">Payment: {car.payment_method}</p>
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
                        <p className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">📅</span>
                          {formatDate(car.start_date)} - {formatDate(car.end_date)}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">{car.Description}</p>
                      </div>

                      {/* Renter Info */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {car.Profile_Pic ? (
                              <img src={car.Profile_Pic} alt={car.UserName} className="w-full h-full object-cover rounded-full" />
                            ) : (
                              <span className="text-xl text-gray-600">{car.UserName?.[0]?.toUpperCase()}</span>
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

        {/* Transaction Modal */}
        {showTransactionModal && selectedCar && (
          activeTab === 'rent' ? (
            <TransactionModal
              car={selectedCar}
              onClose={() => {
                setShowTransactionModal(false);
                setSelectedCar(null);
              }}
              onSubmit={(data) => {
                setShowTransactionModal(false);
                setSelectedCar(null);
                // Optionally show a success message or redirect
              }}
            />
          ) : (
            <PurchaseTransactionModal
              car={selectedCar}
              onClose={() => {
                setShowTransactionModal(false);
                setSelectedCar(null);
              }}
              onSubmit={(data) => {
                setShowTransactionModal(false);
                setSelectedCar(null);
                // Optionally show a success message or redirect
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default MarketPlace;