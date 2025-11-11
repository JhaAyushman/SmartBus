import axios from "axios";

const loginUser = async (loginCredentials) => {
  const baseURL = "https://smartbusbackend.onrender.com/user/login";

  try {
    const response = await axios.post(baseURL, loginCredentials);

    if (response.data.token) {
      sessionStorage.setItem("authToken", response.data.token);
      return {
        success: true,
        token: response.data.token,
        user: response.data.user,
      };
    }

    return { success: false, message: "Login failed" };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};

export { loginUser };
