
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import About from "./routes/About_Us";
import Dashboard from "./routes/Dashboard";
import Setting  from "./routes/Setting";
import Marketplace from "./routes/Marketplace ";
import Rent from "./routes/Rent";
import Compare from "./routes/Car_compare";

const App = () => {
  return (
    <Router>
      <div className="p-4 bg-gray-800 text-white flex space-x-4">
        <div class="navbar">
        <Link to="/" className="elements_on_nav">Dashboard</Link>
        <Link to="/marketplace" className="elements_on_nav">Marketplace</Link>
        <Link to="/Rental" className="elements_on_nav">Rent A Car</Link>
        <Link to="/compare" className="elements_on_nav">Compare Cars</Link>
        <Link to="/about" className="elements_on_nav">About Us</Link>
        <Link to="/settings" className="elements_on_nav">Settings</Link>
        </div>
      </div>

      {/* Page Content Changes Here */}
      <Routes>
      <Route path="/Rental" element={<Rent/>}/>
        <Route path="/marketplace" element={<Marketplace/>}/>
        <Route path="/settings" element={<Setting />} />
         <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/compare" element={<Compare />} />

      </Routes>
    </Router>
  );
};

export default App;

