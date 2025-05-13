import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css"; // Import the Settings CSS

// onclick="{()=>
// {
// remove item from local storage nULL
// ISLogged=false;
// }}"

const Dashboard = ({loggedIn}) => {
  const Navigate = useNavigate();
  const username = localStorage.getItem("username");
  const userrole = localStorage.getItem("userrole");
  const useremail = localStorage.getItem("Email");
  const userid = localStorage.getItem("userid");
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if(!loggedIn) {
      Navigate('/');
      setError("Please login to access the dashboard");
    }
  }, [Navigate, loggedIn]);
      
    return (
    <div className="body">
      <h1 className="title">DASHBOARD</h1>
      <div className="flex flex-col items-center p-6 max-w-4xl mx-auto">
        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Profile Section */}
        <div className="w-full bg-green-600 rounded-xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <img
                className="rounded-full h-48 w-48 border-4 border-white/20 shadow-lg hover:scale-105 transition-transform duration-300"
                src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?auto=format&fit=crop&w=2832&q=80"
                alt="profile"
                onError={(e) => {
                  e.target.onerror = null;
                  setError("Failed to load profile image");
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <button 
                className="absolute bottom-2 right-2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                onClick={() => setError("Profile picture update feature coming soon!")}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-extrabold tracking-wide mb-4 text-white">
                {username || <span className="text-red-200">Username not found</span>}
              </h2>
              <div className="space-y-3 text-lg">
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <span className="bg-white/20 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <span className="text-white font-semibold">User ID:</span> 
                  <span className="text-white/90">{userid || "Not available"}</span>
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <span className="bg-white/20 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  <span className="text-white font-semibold">Role:</span>
                  <span className="text-white/90">{userrole || "Not assigned"}</span>
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <span className="bg-white/20 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <span className="text-white font-semibold">Email:</span>
                  <span className="text-white/90">{useremail || "No email provided"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
