import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import carPlaceholder from './image.png';

const MyRentals = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    if (!loggedIn) {
      navigate('/');
      return;
    }

    const fetchRentals = async () => {
      try {
        const userId = localStorage.getItem('userid');
        if (!userId) {
          navigate('/');
          return;
        }

        const response = await fetch('http://localhost:5000/api/my-rentals/my-rentals');
        const data = await response.json();

        if (data.success) {
          setRentals(data.data);
        } else {
          setError('Failed to fetch rentals');
        }
      } catch (err) {
        console.error('Error fetching rentals:', err);
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [loggedIn, navigate]);

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (rentals.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Rentals Yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't rented any cars yet. Check out our marketplace to find cars available for rent!
          </p>
          <button
            onClick={() => navigate('/marketplace')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Rental Cars
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Rentals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rentals.map((rental) => (
          <div key={rental.rental_id} className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Car Image */}
            <div className="h-48 bg-gray-200 relative">
              {rental.image_url ? (
                <img 
                  src={rental.image_url} 
                  alt={`${rental.MakeName} ${rental.ModelName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={carPlaceholder} 
                  alt="Default car placeholder"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  rental.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {rental.status}
                </span>
              </div>
            </div>

            {/* Rental Info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {rental.MakeName} {rental.ModelName}
                  </h3>
                  <p className="text-sm text-gray-500">{rental.VariantName}</p>
                </div>
                <p className="text-xl font-bold text-blue-600">{formatPrice(rental.total_price)}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📅</span>
                  {formatDate(rental.start_date)} - {formatDate(rental.end_date)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📍</span>
                  {rental.Location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">💰</span>
                  Security Deposit: {formatPrice(rental.security_deposit)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRentals; 