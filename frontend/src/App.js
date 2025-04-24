
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import SignIn from "./routes/SignIn";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
      </Routes>
    </Router>
  );
};

export default App;

