import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";
export const generateImage = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Get from middleware
    const { prompt } = req.body;

    if (!userId || !prompt) {
      return res.status(400).json({ success: false, error: "User ID and prompt are required" });
    }

    const user = await userModel.findById(userId);

    if (user.creditBalance <= 0) {
      return res.status(403).json({ success: false, error: "Insufficient credit balance", creditBalance: user.creditBalance });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
        ...formData.getHeaders(), // ⬅️ Needed for FormData to work with axios
      },
      responseType: 'arraybuffer',
    });

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

    res.status(200).json({
      success: true,
      resultImage,
      creditBalance: user.creditBalance - 1,
      message: "Image generated successfully",
    });

  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
