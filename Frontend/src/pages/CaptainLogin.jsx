import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email,setEmail] = useState('');
      const [password,setPassword] = useState('');
      const [captainData, setCaptainData] = useState({});
  
      const submitHandler = (e) => {
          e.preventDefault();
          setCaptainData({
              email:email,
              password:password
          })
          setEmail('');
          setPassword('');
      }
  
    return (
      <div className="p-7 h-screen flex flex-col justify-between">
          <div>
              <img className="w-20 mb-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="Uber" />
  
              <form onSubmit={(e)=>submitHandler(e)}>
                  <h3 className="text-lg font-medium mb-2">What's your email</h3>
                  <input 
                  type="email" 
                  placeholder="email@example.com" 
                  required 
                  className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  />
  
                  <h3 className="text-lg font-medium mb-2">Enter password</h3>
                  <input 
                  type="password" 
                  placeholder="Password"
                  className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  />
  
                  <button 
                  className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
                  >Login</button>
              </form>
              <p className="text-center">Join a fleet? <Link to="/captain-signup" className="text-blue-600"> Register as a Captain</Link> </p>
          </div>
          <div>
              <Link to="/login"
              className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                  Sign in as User
              </Link>
          </div>
      </div>
    );
}

export default CaptainLogin;