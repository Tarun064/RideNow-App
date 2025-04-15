import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {

    const [email,setEmail] = useState('');
        const [password,setPassword] = useState('');
        const [firstName,setFirstName] = useState('');
        const [lastName,setLastName] = useState('');
        const [userData, setUserData] = useState({});
    
        const submitHandler = (e) =>{
            e.preventDefault();
            setUserData({
                fullName:{
                    firstName:firstName,
                    lastName:lastName
                },
                email:email,
                password:password
            })
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
        }

  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
        <div>
            <img className="w-20 mb-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="Uber" />

            <form onSubmit={(e)=>submitHandler(e)}>
                <h3 className="text-lg font-medium mb-2">What's our Captain's name</h3>
                <div className="flex gap-4 mb-6">
                    <input 
                    type="text" 
                    placeholder="First Name" 
                    required 
                    className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
                    value={firstName}
                    onChange={(e)=> setFirstName(e.target.value)}
                    />
                    <input 
                    type="text" 
                    placeholder="Last Name" 
                    required 
                    className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
                    value={lastName}
                    onChange={(e)=> setLastName(e.target.value)}
                    />
                </div>
                <h3 className="text-lg font-medium mb-2">What's our Captain's email</h3>
                <input 
                type="email" 
                placeholder="email@example.com" 
                required 
                className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />

                <h3 className="text-lg font-medium mb-2">Enter password</h3>
                <input 
                type="password" 
                placeholder="Password"
                className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />

                <button 
                className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
                >Sign Up! Captain</button>
            </form>
            <p className="text-center">Already have an account? <Link to="/captain-login" className="text-blue-600"> Login Here</Link> </p>
        </div>
        <div>
            <p className="text-[10px] leading-tight">By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means,
                from Uber and its affiliates to the number provided. You also agree to our <span className="text-blue-600 underline">Terms of Use</span> and <span className="text-blue-600 underline">Privacy Policy</span>.
            </p>
        </div>
    </div>
  );
}

export default CaptainSignup;