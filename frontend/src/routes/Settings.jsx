import React, { useEffect,useState  } from "react";
import {useNavigate } from "react-router-dom";
import "./Settings.css"


const Setting = ({loggedIn}) => {
  const Navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  

  const HandleSubmit = async (event) => {
    try {
        event.preventDefault();
        const email=localStorage.getItem("Email");
      const response = await fetch(`http://localhost:5000/api/ResetPassword?Email=${encodeURIComponent(email)}&OldPassword=${encodeURIComponent(oldPassword)}&NewPassword=${encodeURIComponent(newPassword)}`);



      if(!response.ok)
      {
        alert('Error resetting password');

      }
      else
      {
        alert('Password reset Successfully!');
      }
      
    } catch (err) {
      console.error(err);
    }
  };

 

  useEffect (()=>
    {
      if(!loggedIn)
      {
        Navigate('/');
      }
      else
      {
      }
    },[Navigate, loggedIn])




  return (
    <div class="body">
        <h1 class="title">SETTINGS</h1>
        <div class="settings">
        <form class="resetpass" onSubmit={HandleSubmit}>
            <h1 class="form_text">CHANGE YOUR PASSWORD</h1>
            <div class="flex flex-col items-center gap-4 mt-10">
        <div class="w-full max-w-sm min-w-[200px]">
            <input class="w-full bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow mb-10 font-oxanium" 
            required value={oldPassword} onChange={(e)=> setOldPassword(e.target.value)} placeholder="Old Password" />
        </div>
        <div class="w-full max-w-sm min-w-[200px]">
            <input class="w-full bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow font-oxanium" 
            required value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} placeholder="New Password" />
        </div>
        </div>
        <div class="flex flex-col items-center gap-4 mt-10">
        <button type="submit"
        class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none font">
        Submit</button>
        </div>
        </form>
        </div>
    </div>
  );
};


export default Setting;
