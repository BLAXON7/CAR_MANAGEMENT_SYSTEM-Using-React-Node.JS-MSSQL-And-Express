import React, { useEffect  } from "react";
import {useNavigate } from "react-router-dom";


const Rentals = ({loggedIn}) => {
  const Navigate = useNavigate();

  useEffect (()=>
    {
      if(!loggedIn)
      {
        Navigate('/');
      }
    },[Navigate, loggedIn])
  return (
    <div style={{textAlign:"center", fontFamily: "Impact, sans-serif",fontSize:30}}>
      Rentals
    </div>
  );
};


export default Rentals;
