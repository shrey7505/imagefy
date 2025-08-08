import React, { useContext } from "react";
import { assets } from "../assets/assets.js"; // Adjust the path if needed
import { AppContext } from "../context/AppContect.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GenerateBtn = () => {
    const { user, setShowLogin } = useContext(AppContext);
 const navigate = useNavigate();

   const onclickhandler = () => {
    if (!user) {
      setShowLogin(true);
    } else {
      navigate("/result");
    }
  };


  return (
    <motion.section className="w-full py-16  flex flex-col items-center justify-center text-center"
    initial={{ opacity: 0.2, y: 100 }}
    transition={{  duration: 1.1 }}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1a1a1a] mb-6">
        See the magic. <span className="font-bold">Try now</span>
      </h2>

      {/* Button */}
      <button onClick={onclickhandler}
        className="flex items-center gap-2 mt-10 px-6 py-3 sm:px-7 sm:py-3.5 bg-black text-white text-sm sm:text-base font-medium rounded-full hover:bg-transparent hover:text-black border border-black transition-all duration-300"
      >
        Generate Images <img src={assets.star_group} alt="Magic Icon" className="w-5 h-5" />
      </button>
    </motion.section>
  );
};

export default GenerateBtn;
