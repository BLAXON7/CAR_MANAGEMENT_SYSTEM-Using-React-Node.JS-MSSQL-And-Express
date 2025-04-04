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
            <div className="Tab">
            <p className="HeaderName">{Login ? "LOGIN" : "SIGNUP"}</p>
            {Login ?
            <div className="LoginFrame">
                <input placeholder="UserName" className="Ulogin"></input>
                <bR/>
                <input placeholder="Password" className="Plogin"></input>
                <bR/>
                <button type="submit" className="Blogin">LOGIN</button>
                <br/>
                <div className="switch-text">
                <span className="ltext">Not signed up?</span>
                <button className="LSWITCH" onClick={() => SetLogin(!Login)}>SIGNUP</button>
                </div>
            </div>
              :
            <div className="SignUpFrame">
                <input placeholder="UserName" className="Usign"></input>
                <bR/>
                <input placeholder="Password" className="Psign"></input>
                <bR/>
                <input placeholder="Confirm Password" className="Csign"></input>
                <bR/>
                <button type="submit" className="Bsign">SignUp</button>
                <br/>
                <div className="switch-text">
                <span className="stext">Already SignedUp?</span>
                <button className="SSWITCH" onClick={()=>SetLogin(!Login)}>LOGIN</button>
                </div>
            </div>
               }
            </div>
        </div>
        </div>
      );

};

export default SignIn