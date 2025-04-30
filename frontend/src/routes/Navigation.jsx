import React from "react";
import { useNavigate,Link } from "react-router-dom";

const Nav = () => {
  const Navigate=useNavigate();

  const handleLogout = async ()=>
  {
      //localStorage.removeItem("userdata"); //----------------------
      Navigate('/');
  }
  return (
    <nav className="w-full px-6 py-3 bg-slate-900 shadow-md font-oxanium">
      <div className="max-w-full mx-auto flex items-center justify-between text-white">

        {/* Brand Name */}
        <div className="text-2xl font-bold text-cyan-100 tracking-wide">
          VELOCE
        </div>

        {/* Centered Links */}
        <ul className="flex gap-6 text-sm font-semibold justify-center items-center">
          <li>
            <Link to="/Dashboard" className="hover:text-gray-300">Dashboard</Link>
          </li>
          <li>
            <Link to="/Marketplace" className="hover:text-gray-300">Marketplace</Link>
          </li>
          <li>
            <Link to="/Compare" className="hover:text-gray-300">Compare</Link>
          </li>
          <li>
            <Link to="/Rentals" className="hover:text-gray-300">Rentals</Link>
          </li>
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
