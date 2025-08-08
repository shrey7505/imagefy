import express from "express";

import {
  registerUser,
  loginUser,
  userCraditBalance,
  paymentrzp,
  varifyrzp,
} from "../controllers/userController.js";
import userAuth from "../middleware/auth.js";

const Userrouter = express.Router();

Userrouter.post("/register", registerUser);
Userrouter.post("/login", loginUser);
Userrouter.get("/credits", userAuth, userCraditBalance);
Userrouter.post("/payment", userAuth, paymentrzp);
Userrouter.post("/verify", varifyrzp);
export default Userrouter;
