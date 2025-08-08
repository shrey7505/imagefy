import React, { useContext, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContect";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Login = () => {
  const [state, setState] = useState("signup"); // "signup" or "login"
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "login") {
        const { data } = await axios.post(`${backendUrl}/api/users/login`, {
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser({
            name: data.user?.name || data.name,
            _id: data.user?.id || data.user?._id,
            email: data.user?.email,
          });
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          toast.success(
            state === "login" ? "Login successful!" : "Registration successful!"
          );
        } else {
          toast.error(
            data.message ||
              (state === "login" ? "Login failed" : "Registration failed")
          );

          return;
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/users/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser({
            name: data.user?.name || data.name,
            _id: data.user?.id || data.user?._id, // Handle both id and _id
            email: data.user?.email,
          });
          localStorage.setItem("token", data.token);

          setShowLogin(false);
        } else {
          toast.error(data.message || "Registration failed");
        }
      }
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    }
  }; // ✅ fixed: this closing brace was missing

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="relative bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-md flex flex-col gap-6"
      >
        <img
          src={assets.cross_icon}
          alt="cross icon"
          onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 cursor-pointer hover:scale-110 transition-transform duration-200"
        />

        <h1 className="text-2xl font-bold text-center text-gray-800">
          {state === "signup" ? "Sign Up" : "Login"}
        </h1>

        <p className="text-sm text-gray-600 text-center">
          {state === "signup"
            ? "Welcome to our platform! Please sign up to continue."
            : "Welcome back! Please log in to your account."}
        </p>

        {/* Full Name - only for signup */}
        {state === "signup" && (
          <div className="flex items-center gap-3 border rounded-lg px-4 py-2">
            <PersonIcon className="text-gray-500" />
            <input
              onChange={(e) => setname(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter Full Name"
              required
              className="w-full focus:outline-none text-gray-800 placeholder-gray-400"
            />
          </div>
        )}

        {/* Email */}
        <div className="flex items-center gap-3 border rounded-lg px-4 py-2">
          <EmailIcon className="text-gray-500" />
          <input
            onChange={(e) => setemail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Email Address"
            required
            className="w-full focus:outline-none text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-3 border rounded-lg px-4 py-2">
          <LockIcon className="text-gray-500" />
          <input
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter Password"
            required
            className="w-full focus:outline-none text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Forgot Password (only for login) */}
        {state === "login" && (
          <p className="text-sm text-blue-500 text-right cursor-pointer hover:underline">
            Forgot Password?
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="rounded-full mt-1 bg-blue-500 text-black w-full py-2 font-semibold hover:bg-transparent hover:text-black border border-black transition-all duration-300"
        >
          {state === "signup" ? "Create Account" : "Log In"}
        </button>

        {/* Switch Mode */}
        <p className="text-sm text-center text-gray-600 mt-2">
          {state === "signup" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Log In
              </span>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <span
                onClick={() => setState("signup")}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </form>
    </motion.div>
  );
};

export default Login;
