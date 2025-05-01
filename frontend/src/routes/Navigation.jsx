import React from "react";
import { useNavigate,Link } from "react-router-dom";

const Nav = () => {
  const Navigate=useNavigate();
  const userRole=localStorage.getItem("userrole");
  const handleLogout = async ()=>
  {
      Navigate('/');
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
      localStorage.removeItem("Email");
      localStorage.removeItem("userrole");

  }
  return (
    <nav className="w-full px-6 py-3 bg-slate-900 shadow-md font-oxanium">
      <div className="max-w-full mx-auto flex items-center justify-between text-white">

        <div className="text-2xl font-bold text-cyan-100 tracking-wide">
          VELOCE
        </div>

        <ul className="flex gap-6 text-sm font-semibold justify-center items-center">
          <li>
            <Link to="/Dashboard" className="hover:text-gray-300">Dashboard</Link>
          </li>

          {(userRole === "Seller" || userRole === "Renter" || userRole === "Customer") && (
            <li>
              <Link to="/Marketplace" className="hover:text-gray-300">Marketplace</Link>
            </li>
          )}

          {(userRole === "Seller" || userRole === "Renter" || userRole === "Customer") && (
            <li>
              <Link to="/Compare" className="hover:text-gray-300">Compare</Link>
            </li>
          )}

          {userRole === "Seller" && (
            <li>
              <Link to="/Sellers" className="hover:text-gray-300">Sell Car</Link>
            </li>
          )}

          {userRole === "Renter" && (
            <li>
              <Link to="/Rentals" className="hover:text-gray-300">List Rental</Link>
            </li>
          )}

          {userRole === "Customer" && (
            <>
              <li>
                <Link to="/Rented" className="hover:text-gray-300">My Rentals</Link>
              </li>
              <li>
                <Link to="/Purchased" className="hover:text-gray-300">My Purchases</Link>
              </li>
            </>
          )}

          <li>
            <Link to="/Settings" className="hover:text-gray-300">Settings</Link>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-600 transition duration-200 shadow-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
