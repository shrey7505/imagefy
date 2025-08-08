import React from "react";
import { testimonialsData } from "../assets/assets.js"; // Adjust the path if needed
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";


const Review = () => {
  return (
    <motion.section className="w-full px-4 sm:px-6 md:px-12 py-16 max-w-6xl mx-auto text-center"
    initial={{ opacity: 0.2, y: 100 }}
    transition={{  duration: 1.1 }}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>
      {/* Header */}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
        Customer testimonials
      </h2>
      <p className="mt-2 text-gray-500 text-sm sm:text-base">
        What Our Users Are Saying
      </p>

      {/* Testimonial Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 transition-transform duration-300 hover:shadow-md hover:-translate-y-1"
          >
            {/* Profile Image */}
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mx-auto"
            />

            {/* Name & Role */}
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {testimonial.name}
            </h3>
            <p className="text-sm text-indigo-600 font-medium">
              {testimonial.role}
            </p>

            {/* Star Rating */}
            <div className="flex justify-center mt-2 mb-3 text-red-500">
              {Array.from({ length: testimonial.stars }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-sm text-gray-700 leading-relaxed">
              {testimonial.text}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Review;
