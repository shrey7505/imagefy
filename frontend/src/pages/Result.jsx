import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { FaDownload, FaRedo } from "react-icons/fa";
import { AppContext } from "../context/AppContect";

const Result = () => {
  const [image, setimage] = useState(assets.sample_img_2);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { generateImg } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsImgLoading(true);
    setLoading(true); // ✅ Start animation

    if (inputValue) {
      const resultImage = await generateImg(inputValue);
      if (resultImage) {
        setimage(resultImage);
      }
    }

    setLoading(false); // ✅ Stop animation
    setInputValue("");
  };

  return (
    <form className="max-w-lg mx-auto px-6 py-12" onSubmit={handleSubmit}>
      {/* AI Image Preview with Loading Bar */}
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
        <img
          src={image}
          alt="Generated preview"
          className="rounded-lg w-full object-cover"
        />

        {/* Loader Spinner Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex justify-center items-center z-10">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        {/* Animated Bottom Bar */}
        <span
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 ${
            loading ? "w-full animate-[slide_10s_linear_infinite]" : "w-0"
          }`}
        />
      </div>

      {loading && (
        <p className="text-center text-gray-500 text-sm mb-8">
          Generating image, please wait...
        </p>
      )}

      {!isImgLoading && (
        <div className="flex flex-col gap-4 w-full">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            name="prompt"
            type="text"
            placeholder="Describe what you want to generate..."
            className="w-full rounded-xl border border-gray-300 px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            aria-label="Image generation prompt"
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Generate ✨
          </button>
        </div>
      )}

      {isImgLoading && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          {/* Download Button */}
          <button
            type="button"
            className="w-full sm:w-1/2 px-6 py-3 flex items-center justify-center gap-2 border border-purple-600 text-purple-600 font-semibold rounded-xl shadow-md bg-transparent hover:bg-purple-600 hover:text-white transition-all duration-300 hover:shadow-lg"
          >
            <FaDownload size={16} />
            <a href={image} download className="text-inherit font-semibold">
              Download
            </a>
          </button>

          {/* Generate Another Button */}
          <button
            type="button"
            className="w-full sm:w-1/2 px-6 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:from-purple-700 hover:to-blue-600 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
            onClick={() => {
              setIsImgLoading(false);
            }}
          >
            <FaRedo size={16} />
            <span>Generate Another</span>
          </button>
        </div>
      )}
    </form>
  );
};

export default Result;
