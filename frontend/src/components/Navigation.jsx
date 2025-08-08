import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContect.jsx";

const Navigation = () => {
  const { user, setUser, setShowLogin, logout, credit } =
    useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
  console.log("User state changed:", user);
}, [user]);
console.log("Current Navbar State:", { user, credit });

  return (
    <div className="flex justify-between items-center py-4">
      <div>
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          <img
            src={assets.logo}
            alt=""
            className="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-40"
          />
        </Link>
      </div>

      <div>
        {user ? (
          <div className="flex justify-between items-center py-4 gap-2 sm:gap-4 md:gap-4 ">
            <button
              onClick={() => navigate("/buy-credit")}
              className="flex justify-between items-center gap-2 bg-blue-100 px-4 py-2 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img src={assets.credit_star} alt="star img" className="w-5" />
              <p className="text-xs sm:text-sm font-medium text-gray-700">
                Credits left : {credit}
              </p>
            </button>
            <p className="text-gray-700 max-sm:hidden pl-4"> Hi, {user.name}</p>
            <div className="relative group">
              <img
                src={assets.profile_icon}
                alt=""
                className="w-10 drop-shadow"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded-md  text-sm transition-all duration-300 pt-12">
                <ul className="list-none p-2 bg-white rounded-md border text-sm">
                  <li onClick={logout} className="cursor-pointer">
                    LogOut
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center py-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            <p
              className="cursor-pointer"
              onClick={() => navigate("/buy-credit")}
            >
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-900 text-white px-4 py-2 rounded hover:bg-zinc-600 rounded-md transition-colors duration-300 text-sm rounded-full"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
