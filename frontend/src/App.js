
import React from "react";
import { BrowserRouter as Router, Routes, Route /*,link*/ } from "react-router-dom";
import './App.css'
import About from "./routes/About_Us";
import Dashboard from "./routes/Dashboard";
import Setting  from "./routes/Setting";
import Marketplace from "./routes/Marketplace ";
import Rent from "./routes/Rent";
import Compare from "./routes/Car_compare";
import SignIn from "./routes/SignIn";

const App = () => {
  return (
    <Router>
      <div>
        
      </div>
      <Routes>
      <Route path="/Rental" element={<Rent/>}/>
        <Route path="/marketplace" element={<Marketplace/>}/>
        <Route path="/settings" element={<Setting />} />
         <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/" element={<SignIn/>}/>
      </Routes>
    </Router>
  );
};

export default App;

