import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
        <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1564694202225-cc1920e206ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRyYWZmaWMlMjBsaWdodHN8ZW58MHx8MHx8fDA%3D)] h-screen pt-8 w-full flex justify-between flex-col">
            <img className="w-16 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" />
            <div className="bg-white pb-7 py-4 px-4">
                <h2 className="text-2xl font-bold">Get Started With Uber</h2>
                <Link to="/login" className="flex justify-center items-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
            </div>
        </div>
    </div>
  );
}

export default Home;