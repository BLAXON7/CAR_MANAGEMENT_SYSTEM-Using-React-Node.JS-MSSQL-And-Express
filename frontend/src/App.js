import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import SignIn from "./routes/SignIn";
import Dashboard from "./routes/Dashboard";
import Nav from "./routes/Navigation";
import Compare from "./routes/Compare";

import Rentals from "./routes/Rentals";
import Setting from "./routes/Settings";
import Seller from "./routes/Seller";
import Rented from "./routes/RentedCars";
import Purchased from "./routes/PurchasedCars";
import AddCar from "./routes/AddCar";
import CarSearchModal from "./routes/CarSearchModal";
import MarketPlace from "./routes/Marketplace";
import MyPurchases from "./routes/MyPurchases";
import MyRentals from "./routes/MyRentals";
import SuggestCar from "./routes/SuggestCar";
import CarSuggestions from "./routes/CarSuggestions";


const App = () => {
  const [loggedIn, Islogged] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  const setEmail = async () =>
    {
      try
      {
          const userid = localStorage.getItem("userid");
          const res= await fetch(`http://localhost:5000/api/UserProfile?UserID=${encodeURIComponent(userid)}`);
  
          const data1=await res.json();
              localStorage.setItem("Email",data1[0].Email);
  
      }
     catch(err)
     {
      console.log(err);
     }   
  
    }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Nav />
        <Routes>
          <Route path="/" element={<SignIn Islogged={Islogged} setEmail={setEmail} />} />
          <Route path="/Dashboard" element={<Dashboard loggedIn={loggedIn} />} />
          <Route path="/Compare" element={<Compare loggedIn={loggedIn} />} />
          <Route path="/Marketplace" element={<MarketPlace loggedIn={loggedIn} />} />
          <Route path="/Settings" element={<Setting loggedIn={loggedIn} setEmail={setEmail} />} />
          <Route path="/Rentals" element={<Rentals loggedIn={loggedIn} />} />
          <Route path="/Sellers" element={<Seller loggedIn={loggedIn} />} />
          <Route path="/Purchased" element={<Purchased loggedIn={loggedIn} />} />
          <Route path="/Rented" element={<Rented loggedIn={loggedIn} />} />
          <Route path="/AddCar" element={<AddCar loggedIn={loggedIn} />} />
          <Route path="/CarSearchModal" element={<CarSearchModal loggedIn={loggedIn} />} />
          <Route path="/my-purchases" element={<MyPurchases loggedIn={loggedIn} />} />
          <Route path="/my-rentals" element={<MyRentals loggedIn={loggedIn} />} />
          <Route path="/SuggestCar" element={<SuggestCar loggedIn={loggedIn} />} />
          <Route path="/CarSuggestions" element={<CarSuggestions loggedIn={loggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
