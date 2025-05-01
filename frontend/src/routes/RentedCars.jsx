import React, { useEffect  } from "react";
import {useNavigate } from "react-router-dom";


const Rented = ({loggedIn}) => {
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
      Rented By Username
    </div>
  );
};


export default Rented;
