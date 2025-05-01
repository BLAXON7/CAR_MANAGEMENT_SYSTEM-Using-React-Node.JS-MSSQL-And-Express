import React, { useEffect  } from "react";
import {useNavigate } from "react-router-dom";


const Purchased = ({loggedIn}) => {
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
      Purchased by User
    </div>
  );
};


export default Purchased;
