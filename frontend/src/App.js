import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import SignIn from "./routes/SignIn";
import Dashboard from "./routes/Dashboard";
import Nav from "./routes/Navigation";
import Compare from "./routes/Compare";
import MarketPlace from "./routes/Marketplace";
import Rentals from "./routes/Rentals";
import Setting from "./routes/Settings";
import Seller from "./routes/Seller";

const App = () => {
  const [loggedIn, Islogged] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Nav />
        <Routes>
          <Route path="/" element={<SignIn Islogged={Islogged} />} />
          <Route path="/Dashboard" element={<Dashboard loggedIn={loggedIn} />} />
          <Route path="/Compare" element={<Compare loggedIn={loggedIn} />} />
          <Route path="/Marketplace" element={<MarketPlace loggedIn={loggedIn} />} />
          <Route path="/Settings" element={<Setting loggedIn={loggedIn} />} />
          <Route path="/Rentals" element={<Rentals loggedIn={loggedIn} />} />
          <Route path="/Sellers" element={<Seller loggedIn={loggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
