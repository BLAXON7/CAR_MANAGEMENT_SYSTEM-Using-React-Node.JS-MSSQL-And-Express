import React, { useEffect  } from "react";
import {useNavigate } from "react-router-dom";


const Compare = ({loggedIn}) => {
  const Navigate = useNavigate();

  useEffect (()=>
    {
      if(!loggedIn)
      {
        Navigate('/');
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[[Navigate, loggedIn]])
  return (
    <div style={{textAlign:"center", fontFamily: "Impact, sans-serif",fontSize:30}}>
      COMPARE
    </div>
  );
};


export default Compare;
