
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import SignIn from "./routes/SignIn";
import Dashboard from "./routes/Dashboard";
import Nav from "./routes/Navigation";


const App = () => {
  
  
  return (
<Router>
      <div className="min-h-screen bg-slate-800">
        <Nav />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

