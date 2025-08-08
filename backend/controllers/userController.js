import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/usermodel.js";
import Razorpay from "razorpay";
import transactionModel from "../models/transactionmodel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        id: user._id, // Explicitly include the ID
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.json({ success: false, message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "please check your password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        id: user._id,
        email: user.email,
        creditBalance: user.creditBalance,
      },
      // Add this if needed
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.json({ success: false, message: "Server error" });
  }
};

const userCraditBalance = async (req, res) => {
  try {
    const userId = req.user.id;
    const User = await UserModel.findById(userId);
    if (User) {
      return res.json({
        success: true,
        creditBalance: User.creditBalance,
        name: User.name,
      });
    }
    if (!User) {
      return res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user credit balance:", error);
    res.json({ success: false, message: "Server error" });
  }
};

const razorpayInstance = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

const paymentrzp = async (req, res) => {
  console.log("RZP_KEY_ID:", process.env.RZP_KEY_ID);
console.log("RZP_KEY_SECRET:", process.env.RZP_KEY_SECRET);

  try {
    const { planId } = req.body;
    const userId = req.user.id; // Get user ID from auth middleware

    const user = await UserModel.findById(userId);
    if (!user || !planId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    // Plan configuration
    let planConfig;
    switch (planId) {
      case "Basic":
        planConfig = { plan: "Basic", credits: 100, amount: 50 };
        break;
      case "Advanced":
        planConfig = { plan: "Advanced", credits: 200, amount: 100 };
        break;
      case "Business":
        planConfig = { plan: "Business", credits: 500, amount: 250 };
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid plan" });
    }

    // Create transaction record
    const newTransaction = await transactionModel.create({
      userId: user._id,
      ...planConfig,
      date: new Date(),
      status: "PENDING_ORDER",
    });

    // Razorpay order options
    const options = {
      amount: planConfig.amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString(),
    };

    // Create Razorpay order
    const order = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order,
      transactionId: newTransaction._id,
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Payment processing failed",
    });
  }
};

const varifyrzp=async(req,res)=>{
  try {
    const {razorpay_order_id}= req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if(orderInfo.status === 'paid') {
      const transactionData=await transactionModel.findById(orderInfo.receipt);
      if(transactionData.payment) {
        return res.json({ success: false, message: "Payment already verified" });
      }
      const userdata = await UserModel.findById(transactionData.userId);

      const updatedCreditBalance = userdata.creditBalance + transactionData.credits;
      await UserModel.findByIdAndUpdate(transactionData.userId, {
        creditBalance: updatedCreditBalance,
      });
      transactionData.payment = true;
      transactionData.status = "COMPLETED";
      await transactionData.save();
    }
    else {
      return res.json({ success: false, message: "Payment not successful" });
    }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    res.json({ success: false, message: "Server error" });
    
  }

}

export { registerUser, loginUser, userCraditBalance, paymentrzp,varifyrzp };
