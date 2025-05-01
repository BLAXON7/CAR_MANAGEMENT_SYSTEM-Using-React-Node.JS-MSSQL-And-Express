import React, { useEffect  } from "react";
import {useNavigate } from "react-router-dom";

// onclick="{()=>
// {
// remove item from local storage nULL
// ISLogged=false;
// }}"

const Dashboard = ({loggedIn}) => {
  const Navigate = useNavigate();
  const username=localStorage.getItem("username");
  const userrole=localStorage.getItem("userrole");
  const useremail=localStorage.getItem("Email");
  const userid=localStorage.getItem("userid");
  
  useEffect (()=>
    {
      if(!loggedIn)
      {
        Navigate('/');
      }
      
    },[Navigate, loggedIn])
    return (
      <div className="min-h-screen flex flex-col md:flex-row text-white font-oxanium">
        
        {/* Left Panel */}
        <div
          className="flex-1 p-4 flex items-center justify-center shadow-md"
          style={{
            backgroundImage: 'linear-gradient(111.1deg, rgba(59,123,136,1) 2.5%, rgba(17,20,34,1) 100.3%)',
          }}
        />
    
        {/* Center Panel */}
        <div className="flex-1 p-6 bg-slate-900 flex items-center justify-center shadow-lg">
          <div className="flex flex-col items-center text-center space-y-6">
            
            <img
              className="rounded-full h-44 w-44 border-4 border-slate-700 shadow-lg"
              src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?auto=format&fit=crop&w=2832&q=80"
              alt="profile"
            />
            
            <h2 className="text-4xl font-extrabold tracking-wide">{username}</h2>
    
            <div className="text-lg space-y-1 text-slate-300">
              <p><span className="text-white font-semibold">User ID:</span> {userid}</p>
              <p><span className="text-white font-semibold">Role:</span> {userrole}</p>
              <p><span className="text-white font-semibold">Email:</span> {useremail}</p>
            </div>
          </div>
        </div>
    
        {/* Right Panel */}
        <div
          className="flex-1 p-4 flex items-center justify-center shadow-md"
          style={{
            backgroundImage: 'linear-gradient(111.1deg, rgba(59,123,136,1) 2.5%, rgba(17,20,34,1) 100.3%)',
          }}
        />
      </div>
    );
    

};


export default Dashboard;
