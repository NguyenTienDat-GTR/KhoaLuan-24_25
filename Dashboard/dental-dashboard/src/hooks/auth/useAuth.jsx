import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "../../config/axiosConfig";
import React, { createContext, useContext } from "react";

export const useAuth = create((set) => ({
  isLoggedIn: !!Cookies.get("token"), // Kiểm tra token trong cookie
  token: Cookies.get("token") || null,

  login: async (username, password) => {
    try {
      const response = await axios.post("/auth/login", { username, password });
      const { token } = response.data;

      // Lưu token vào cookie
      Cookies.set("token", token, { expires: 1 }); // Lưu trong 1 ngày

      // Cập nhật trạng thái đăng nhập
      set({ isLoggedIn: true, token });
      return true;
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
    }
  },

  logout: () => {
    // Xóa token khỏi cookie và cập nhật trạng thái đăng xuất
    Cookies.remove("token");
    set({ isLoggedIn: false, token: null });
  },
}));

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const { isLoggedIn, login, logout } = useAuth(); // Lấy trạng thái và hàm từ hook useAuth

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
