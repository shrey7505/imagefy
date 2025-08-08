import React, { useContext } from "react";
import { plans } from "../assets/assets";
import { motion } from "framer-motion";

import {
  MdWorkspacePremium,
  MdOutlineRocketLaunch,
  MdBusinessCenter,
} from "react-icons/md";
import { AppContext } from "../context/AppContect";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const icons = [
  <MdWorkspacePremium className="text-blue-600 text-4xl" />,
  <MdOutlineRocketLaunch className="text-blue-600 text-4xl" />,
  <MdBusinessCenter className="text-blue-600 text-4xl" />,
];

const BuyCradit = () => {
  const { user, backendUrl, loadCredit, token, setShowLogin } =
    useContext(AppContext);
  const navigate = useNavigate();
  console.log("User Info:", user);

  const initPay = (order) => {
    console.log("Order Details:", order);
    if (!window.Razorpay) {
      toast.error("Payment system not available. Please try again later.");
      console.error("Razorpay not loaded");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RZP_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to ₹500
      currency: order.currency,
      name: "Credit Payment",
      description: "Purchase Credits",
      // Replace with your logo URL
      order_id: order.id, // This is the order ID created by you in your backend
      receipt: order.receipt, // This is the receipt ID created by you in your backend
      handler: async (response) => {
        try {
          const {data} = await axios.post(
            `${backendUrl}/api/users/verify`,response,{headers:{token}})
          if(data.success) {
            toast.success("Payment successful!");
            loadCredit();
            navigate("/");
          } else {
            toast.error(data.message || "Payment verification failed.");
          } 
        } catch (error) {
          console.error("Payment handler error:", error);
          toast.error("Payment processing failed. Please try again.");
          
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentrzp = async (planId) => {
    console.log("Selected Plan ID:", planId);
    console.log("User Info:", user);
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      

      const payload = {
        planId,
      };

      console.log("Sending to backend:", payload);

      const { data } = await axios.post(
        `${backendUrl}/api/users/payment`,
         payload ,
        {
          headers: {
            token,
          },
        }
      );

      console.log("Payment Data:", data);

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error("Payment error:", error);
    }
  };
  return (
    <motion.section className=" py-16 px-4"
    initial={{ opacity: 0.2, y: 100 }}
    transition={{  duration: 1.1 }}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>
      <div className="text-center mb-12">
        <button className="px-5 py-1 text-sm font-medium bg-white border border-gray-300 rounded-full text-gray-700 mb-4 shadow-sm">
          OUR PLANS
        </button>
        <h2 className="text-3xl font-bold text-gray-800">Choose the plan</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className="bg-white rounded-2xl shadow-md px-8 py-10 text-center transform transition duration-300 hover:shadow-2xl hover:scale-[1.03]"
          >
            <div className="flex justify-center mb-4">{icons[index]}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {plan.id}
            </h3>
            <p className="text-sm text-gray-600 mb-6">{plan.desc}</p>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              ₹{plan.price}
              <span className="text-base font-medium text-gray-500">
                {" "}
                / {plan.credits} credits
              </span>
            </div>
            <button
              onClick={() => paymentrzp(plan.id)}
              className="mt-4 bg-black text-white px-6 py-2 rounded-md border border-black transition-all duration-300 hover:bg-transparent hover:text-black hover:shadow-md"
            >
              {user ? "Purchase" : "Get started"}
            </button>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default BuyCradit;
