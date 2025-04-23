import React, {useState} from "react";

import "./SignIn.css"

const SignIn = () => {
    
    const [Login,SetLogin]=useState(true);
    return (
        <div className="login">
            <div className="container">
            <div className="Intro">
            WELCOME TO VELOCE
            <div className="end"></div>
            <div className="line">
            <hr/>
            </div>
            </div>
            
        </div>
        </div>
      );

};

export default SignIn