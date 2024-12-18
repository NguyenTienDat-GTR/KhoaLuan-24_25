import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "../../config/axiosConfig";
import React, { createContext, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import useUserStore from "./useUserStore";

export const useAuth = create((set) => ({
  isLoggedIn: !!Cookies.get("token"),
  token: Cookies.get("token") || null,

  login: async (username, password) => {
    try {
      const response = await axios.post("/auth/login", { username, password });

      const { token } = response.data;

      // Lưu token vào cookie
      Cookies.set("token", token, { expires: 1 }); // Lưu trong 1 ngày

      // Cập nhật trạng thái đăng nhập
      set({ isLoggedIn: true, token });

      // Cập nhật userLoggedIn trong useUserStore
      useUserStore.getState().setUserLoggedIn(token);

      toast.success(response.data.message, {
        autoClose: 3000,
        hideProgressBar: false,
      });
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        autoClose: 3000,
        hideProgressBar: false,
      });
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
    useUserStore.getState().clearUser();
  },
}));

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const { isLoggedIn, login, logout } = useAuth();
  const { restoreUserFromCookie } = useUserStore();

  useEffect(() => {
    // Khôi phục lại user từ cookie khi trang load lần đầu
    restoreUserFromCookie();
  }, [restoreUserFromCookie]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
