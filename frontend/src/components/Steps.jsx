import React from "react";
import { stepsData } from "../assets/assets.js";
import { motion } from "framer-motion";

const Steps = () => {
  return (
    <motion.section className="w-full px-4 sm:px-6 md:px-8 py-8 max-w-5xl mx-auto text-center"
    
    initial={{ opacity: 0.2, y: 100 }}
    transition={{  duration: 1.1 }}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    >
      {/* Section Header */}
      <h2 className="text-3xl sm:text-4xl font-semibold">How it works</h2>
      <p className="mt-2 text-sm sm:text-base text-gray-500">
        Transform Words Into Stunning Images
      </p>

      {/* Steps List */}
      <div className="mt-10 flex flex-col gap-6">
        {stepsData.map((step, index) => (
          <div
            key={index}
            className="group transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-gray-300 border border-gray-200 rounded-xl p-4 sm:p-6 flex items-start sm:items-center gap-4 sm:gap-6 bg-white text-left"
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-300">
              <img
                src={step.icon}
                alt="icon"
                className="w-10  group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Text */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Steps;
