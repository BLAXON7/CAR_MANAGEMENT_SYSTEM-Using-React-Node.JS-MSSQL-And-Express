import React, { useEffect  } from "react";
import {useNavigate } from "react-router-dom";

// onclick="{()=>
// {
// remove item from local storage nULL
// ISLogged=false;
// }}"

const Dashboard = ({loggedIn}) => {
  const Navigate = useNavigate();

  
  useEffect (()=>
    {
      if(!loggedIn)
      {
        Navigate('/');
      }
      
    },[Navigate, loggedIn])
  return (
    <div style={{textAlign:"center",color:"darkblue", fontFamily: "Impact, sans-serif",fontSize:30}}>
      DASHBOARD
    </div>
  );
};


export default Dashboard;
