import React, {  useEffect,useState} from "react";
import {useNavigate } from "react-router-dom";

import "./SignIn.css"

const SignIn = ({Islogged}) => {
    const Navigate = useNavigate();
    const [Login, SetLogin] = useState(true);

    useEffect(() => {
      Islogged(false); 
      localStorage.removeItem("loggedIn"); 
    }, [Navigate,Islogged]);

   const [login_username,setluser]=useState("");
   const [login_pass,setlpass]=useState("");

   const [signup_pass,setspass]=useState("");
   const [signup_name,setsname]=useState("");
   const [signup_user,setsuser]=useState("");
   const [signup_role,setsrole]=useState("");
   const [signup_email,setsemail]=useState("");
   const [signup_phone,setsphone]=useState("");





const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (Login) {
      try {
        const response = await fetch(`http://localhost:5000/api/Login?username=${login_username}&password=${login_pass}`, {
          method: "GET",
        });
  
        const data = await response.json();
        console.log("Login Status:", data);
        if(response.ok)
        {
            Islogged(true);
            Navigate('/Dashboard');
        }
        else
        {
            alert('Wrong Credentials!');
        }
      } catch (error) {
        console.error("Login API error:", error);
      }
    } else {
        try {
            const response = await fetch(`http://localhost:5000/api/SignUp?name=${encodeURIComponent(signup_name)}&phone=${signup_phone}&email=${encodeURIComponent(signup_email)}&password=${encodeURIComponent(signup_pass)}&username=${signup_user}&role=${signup_role}`, {
              method: "GET",
            });
      
            const data = await response.json();
            console.log("SignIn Status:", data);
            if (response.ok && data.success) {
                alert('SignIn Successful!');
                Islogged(true);
                localStorage.setItem("loggedIn", "true");
                Navigate('/Dashboard');
              } else {
                alert('SignIn failed!');
              }
              
          } catch (error) {
            console.error("Login API error:", error);
          }
    }
  };

  

    return (
        <div className="login">
          <div className="Form-container">
            <div
              className={`relative flex flex-col rounded-xl bg-transparent ${Login ? 'pt-8' : ''}`}
              style={{
                height: '435px',
                overflowY: 'auto',
                scrollbarWidth: 'thin', // For Firefox
                scrollbarColor: '#FFFFFF #1E3A8A', // White ball on dark track for Firefox
              }}
            >
              <h4 className="block text-xl font-medium text-[#E0E0E0]">
                {Login ? "Login" : "Sign Up"}
              </h4>
              <p className="text-[#E0E0E0] font-light">
                {Login
                  ? "Welcome back to Veloce! Enter your credentials to login."
                  : "Want to try Veloce! Enter your details to register."}
              </p>
              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                  {/* Only show these inputs for sign-up */}
                  {!Login && (
                    <>
                      <div className="w-full max-w-sm min-w-[200px]">
                        <label className="block mb-2 text-sm text-[#E0E0E0]">Your Name</label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          required value={signup_name} onChange={(e)=> setsname(e.target.value)}
                          className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                      </div>
                      <div className="w-full max-w-sm min-w-[200px]">
                        <label className="block mb-2 text-sm text-[#E0E0E0]">Phone Number</label>
                        <input
                          type="text"
                          placeholder="Your Phone Number"
                          maxLength="11"
                          required value={signup_phone} onChange={(e)=> setsphone(e.target.value)}
                          pattern="^\d{11}$" // Ensures only 11 digits
                          className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                      </div>
                      <div className="w-full max-w-sm min-w-[200px]">
                        <label className="block mb-2 text-sm text-[#E0E0E0]">Role</label>
                        <div className="flex gap-4">
                          <label className="text-[#E0E0E0]">
                            <input type="radio" name="role" value="Seller" required onChange={(e)=> setsrole(e.target.value)} /> Seller
                          </label>
                          <label className="text-[#E0E0E0]">
                            <input type="radio" name="role" value="Renter" required onChange={(e)=> setsrole(e.target.value)} /> Renter
                          </label>
                          <label className="text-[#E0E0E0]">
                            <input type="radio" name="role" value="Customer" required onChange={(e)=> setsrole(e.target.value)} /> Customer
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                  {/* Login form fields */}
                  {Login && (
                    <>
                      <div className="w-full max-w-sm min-w-[200px]">
                        <label className="block mb-2 text-sm text-[#E0E0E0]">Username</label>
                        <input
                          type="text"
                          placeholder="Your Username"
                          required  value={login_username} onChange={(e)=> setluser(e.target.value)}
                          className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                      </div>
                      <div className="w-full max-w-sm min-w-[200px]">
                        <label className="block mb-2 text-sm text-[#E0E0E0]">Password</label>
                        <input
                          type="password"
                          placeholder="Your Password"
                          required  value={login_pass} onChange={(e)=> setlpass(e.target.value)}
                          className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                      </div>
                    </>
                  )}
                  {!Login && (
                    <div className="w-full max-w-sm min-w-[200px]">
                        <label className="block mb-2 text-sm text-[#E0E0E0]">Username</label>
                        <input
                        type="text"
                        placeholder="Choose a Username"
                        required value={signup_user} onChange={(e)=> setsuser(e.target.value)}
                        className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                    </div>
                    )}
                  {/* Sign-up email field */}
                  {!Login && (
                    <div className="w-full max-w-sm min-w-[200px]">
                      <label className="block mb-2 text-sm text-[#E0E0E0]">Email</label>
                      <input
                        type="email"
                        placeholder="Your Email"
                        required value={signup_email} onChange={(e)=> setsemail(e.target.value)}
                        className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      />
                    </div>
                  )}
                  {/* Sign-up password field */}
                  {!Login && (
                    <div className="w-full max-w-sm min-w-[200px]">
                      <label className="block mb-2 text-sm text-[#E0E0E0]">Password</label>
                      <input
                        type="password"
                        placeholder="Your Password"
                        required value={signup_pass} onChange={(e)=> setspass(e.target.value)}
                        className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      />
                    </div>
                  )}
                </div>
                <button
                  type="submit" 
                  className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-[#E0E0E0] transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  {Login ? "Login" : "Sign Up"}
                </button>
                <p className="flex justify-center mt-6 text-sm text-[#E0E0E0]">
                  {Login ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={() => SetLogin(!Login)}
                    type="button"
                    className="ml-1 text-sm font-semibold text-[#E0E0E0] underline"
                  >
                    {Login ? "Sign up" : "Login"}
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
        
      );
      
      
};

export default SignIn