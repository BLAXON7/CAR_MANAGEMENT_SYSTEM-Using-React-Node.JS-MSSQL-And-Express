// import React, { useState, useEffect } from 'react';


// function App() {
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         fetch('http://localhost:5000')
//             .then((response) => response.text())
//             .then((data) => setMessage(data));
//     }, []);

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <h1>React Frontend</h1>
//             <p>{message}</p>
//         </div>
//     );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import About from "./routes/About_Us";
import Home from "./routes/Home";

const App = () => {
  return (
    <Router>
      <div className="p-4 bg-gray-800 text-white flex space-x-4">
        <div class="navbar">
        <Link to="/" className="home_on_nav">Home</Link>
        <Link to="/about" className="about_on_nav">About Us</Link>
        </div>
      </div>

      {/* Page Content Changes Here */}
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;

