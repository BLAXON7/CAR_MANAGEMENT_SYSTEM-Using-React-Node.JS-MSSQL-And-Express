import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="w-full px-4 py-3 bg-slate-900 shadow-md font-oxanium">
    <div className="max-w-full mx-auto flex justify-between items-center text-white">
      <ul className="flex gap-6 text-sm font-semibold">
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

      {/* Right: Brand */}
      <div className="text-2xl font-bold text-cyan-100 tracking-wide">
        VELOCE
        </div>

    </div>
  </nav>
  );
};

export default Nav;
