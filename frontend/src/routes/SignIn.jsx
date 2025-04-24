import React, {useState} from "react";

import "./SignIn.css"

const SignIn = () => {
    const [Login, SetLogin] = useState(true);
      
        return (
          <div className="login">
            <div className="Form-container">
              <div className="relative flex flex-col rounded-xl bg-transparent">
                <h4 className="block text-xl font-medium text-[#E0E0E0]">
                  {Login ? "Login" : "Sign Up"}
                </h4>
                <p className="text-[#E0E0E0] font-light">
                  {Login
                    ? "Welcome back to Veloce! Enter your credentials to login."
                    : "Want to try Veloce! Enter your details to register."}
                </p>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                  <div className="mb-1 flex flex-col gap-6">
                    {!Login && (
                      <div className="w-full max-w-sm min-w-[200px]">
                        <label className="block mb-2 text-sm text-[#E0E0E0]">Your Name</label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                      </div>
                    )}
                    <div className="w-full max-w-sm min-w-[200px]">
                      <label className="block mb-2 text-sm text-[#E0E0E0]">Email</label>
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      />
                    </div>
      
                    <div className="w-full max-w-sm min-w-[200px]">
                      <label className="block mb-2 text-sm text-[#E0E0E0]">Password</label>
                      <input
                        type="password"
                        placeholder="Your Password"
                        className="w-full bg-transparent placeholder:text-[#E0E0E0] text-[#E0E0E0] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      />
                    </div>
                  </div>
                  {Login && (
                    <div className="inline-flex items-center mt-2">
                      <label className="flex items-center cursor-pointer relative" htmlFor="check-2">
                        <input
                          type="checkbox"
                          className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                          id="check-2"
                        />
                        <span className="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </label>
                      <label className="cursor-pointer ml-2 text-[#E0E0E0] text-sm" htmlFor="check-2">
                        Remember Me
                      </label>
                    </div>
                  )}
                  <button
                    type="button"
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