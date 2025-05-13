import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './my-purchases.css';

const MyPurchases = ({ loggedIn, userType }) => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    if (!loggedIn) {
      navigate('/');
      return;
    }

    const fetchPurchases = async () => {
      try {
        const userId = localStorage.getItem('userid');
        if (!userId) {
          navigate('/');
          return;
        }

        const response = await fetch('http://localhost:5000/api/my-purchases/my-purchases');
        const data = await response.json();

        if (data.success) {
          // Filter purchases for the current user
          const userPurchases = data.data.filter(
            purchase => purchase.Sender_ID === parseInt(userId)
          );
          setPurchases(userPurchases);
        } else {
          setError('Failed to fetch purchases');
        }
      } catch (err) {
        console.error('Error fetching purchases:', err);
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
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
      <div className="my-purchases-container">
        <div className="loading-spinner">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-purchases-container">
        <div className="error-state">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="my-purchases-container">
        <div className="empty-state">
          <div className="empty-state-icon">🚗</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Purchases Yet</h2>
          <p className="empty-state-text">
            You haven't purchased any cars yet. Start exploring our marketplace to find your perfect car!
          </p>
          <button
            onClick={() => navigate('/marketplace')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Cars
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-purchases-container">
      <div className="my-purchases-content">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Purchases</h1>
        
        <div className="purchases-grid">
          {purchases.map((purchase) => (
            <div key={purchase.Sale_Cars_ID} className="purchase-card">
              <div className="purchase-image">
                {/* Car image placeholder */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    purchase.State === 'NEW' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {purchase.State}
                  </span>
                </div>
              </div>

              <div className="purchase-info">
                <div className="purchase-header">
                  <div>
                    <h3 className="purchase-title">
                      {purchase.MakeName} {purchase.ModelName}
                    </h3>
                    <p className="text-sm text-gray-500">{purchase.VariantName}</p>
                  </div>
                  <p className="purchase-price">{formatPrice(purchase.Price)}</p>
                </div>

                <div className="purchase-details">
                  <div className="purchase-detail">
                    <span>📍</span>
                    <span>{purchase.Location}</span>
                  </div>
                  <div className="purchase-detail">
                    <span>🚗</span>
                    <span>{purchase.Transmission} • {purchase.FuelType}</span>
                  </div>
                  <div className="purchase-detail">
                    <span>📅</span>
                    <span>Year: {purchase.Year}</span>
                  </div>
                  <div className="purchase-detail">
                    <span>⭐</span>
                    <span>Condition: {purchase.Condition}/10</span>
                  </div>
                </div>

                <div className={`purchase-status ${
                  purchase.transaction_status === 'Completed' ? 'status-completed' : 'status-pending'
                }`}>
                  {purchase.transaction_status}
                </div>

                <div className="purchase-date">
                  <p>Purchased on: {formatDate(purchase.transaction_date)}</p>
                  <p className="mt-1">Payment Method: {purchase.payment_method}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPurchases; 