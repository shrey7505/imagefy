import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContect.jsx";
import { useNavigate } from "react-router-dom";
import { animate, scroll } from "motion";
import { motion } from "framer-motion";

const Header = () => {
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
    <motion.header
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Badge */}
      <motion.div
        className="flex items-center gap-2 px-4 py-1 border border-gray-200 rounded-full text-sm font-medium shadow-sm mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <span>Best text to image generator</span>
        <img src={assets.star_icon} alt="star" className="w-4 h-4" />
      </motion.div>

      {/* Heading */}
      <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.2 }}>
        Turn text to <br />
        <span className="text-blue-600 font-bold">image</span>, in seconds.
      </motion.h1>

      {/* Subheading */}
      <motion.p className="mt-6 text-base sm:text-lg text-gray-500 max-w-2xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}>
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds – just type, and watch the magic happen.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={onclickhandler}
        className="mt-10 px-6 py-3 sm:px-7 sm:py-3.5 bg-black text-white text-sm sm:text-base font-medium rounded-full hover:bg-transparent hover:text-black border border-black transition-all duration-300"
       whileHover={{scale:1.05}}
       whileTap={{scale:0.95}}
       initial={{opacity:0}}
       animate={{opacity:1}}
       transition={{default:{duration:0.5},opacity:{delay:0.8,duration:1}}}
      >
        Generate Images ✨
      </motion.button>

      <motion.div className="flex flex-wrap justify-center gap-4 mt-10"
              initial={{ opacity: 0,  }}
              animate={{  opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}>
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <img
              key={index}
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              alt="Generated"
              className="w-16 sm:w-20 md:w-24 hover:scale-105 transition-transform duration-300 rounded-md cursor-pointer"
            />
          ))}
      </motion.div>

      <motion.p className="mt-4 text-center text-sm text-neutral-600"
              initial={{ opacity: 0, }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}>
        Generated Images from Imagefy
      </motion.p>
    </motion.header>
  );
};

export default Header;
