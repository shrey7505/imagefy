import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadCredit = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/users/credits`, {
      headers: { token },
    });
    console.log("Credit response:", data);
    if (data.success) {
      setCredit(data.creditBalance);
      const updatedUser = {
        ...user,
        creditBalance: data.creditBalance,
        name: data.name,
        _id: data._id // Make sure to use _id consistently
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  } catch (error) {
    toast.error("Failed to load credit. Please try again.");
    console.error("Error loading credit:", error);
  }
};

  useEffect(() => {
    if (token) {
      loadCredit();
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  const generateImg = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/images/generate-image`,
        { prompt },
        {
          headers: {
            token: token, // ✅ Standard format
          },
        }
      );

      if (data.success) {
        loadCredit();
        toast.success("Image generated successfully!");
        return data.resultImage; // Assuming the response contains the image URL
      } else {
        loadCredit();
        console.log(data.creditBalance);
        if (data.creditBalance <= 0) {
          navigate("/buy-credit");
        }
      }
    } catch (error) {
      if (error.response?.status === 403) {
        // Handle insufficient credits
        navigate("/buy-credit");
        toast.error("Insufficient credits. Please purchase more.");
      } else {
        toast.error(
          error.message || "Failed to generate image. Please try again."
        );
      }
      console.error("Error generating image:", error);
    }
  };

  const value = {
    user,
    setUser,
    showLogin,
    backendUrl,
    setShowLogin,
    token,
    setToken,
    credit,
    setCredit,
    loadCredit,
    logout,
    generateImg,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
