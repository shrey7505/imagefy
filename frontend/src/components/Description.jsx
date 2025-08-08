import React from "react";
import {assets} from "../assets/assets.js"; // Use your uploaded image path
import { motion } from "framer-motion";

const Description = () => {
  return (
    <motion.section className="w-full px-4 sm:px-6 md:px-12 py-16 max-w-6xl mx-auto"
    initial={{ opacity: 0.2, y: 100 }}
    transition={{  duration: 1.1 }}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Create AI Images
        </h2>
        <p className="mt-2 text-base text-gray-500">
          Turn your imagination into visuals
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src={assets.sample_img_1}
            alt="AI Generated Image"
            className="rounded-xl shadow-lg w-full hover:scale-[1.02] transition-transform duration-300"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-left">
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
            Introducing the AI-Powered Text to Image Generator
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            Easily bring your ideas to life with our free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into eye-catching images with just a few
            clicks. Imagine it, describe it, and watch it come to life
            instantly.
          </p>
          <p className="text-gray-600 text-sm sm:text-base">
            Simply type in a text prompt, and our cutting-edge AI will generate
            high-quality images in seconds. From product visuals to character
            designs and portraits, even concepts that don’t yet exist can be
            visualized effortlessly. Powered by advanced AI technology, the
            creative possibilities are limitless!
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default Description;
