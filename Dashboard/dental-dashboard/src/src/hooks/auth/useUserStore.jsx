import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const useUserStore = create((set) => ({
  userLoggedIn: null,
  token: "",
  setUserLoggedIn: (token) => {
    const decodedUser = jwtDecode(token);
    set({ userLoggedIn: decodedUser, token });
  },
  clearUser: () => set({ userLoggedIn: null, token: "" }),
  restoreUserFromCookie: () => {
    const token = Cookies.get("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      set({ userLoggedIn: decodedUser, token });
    }
  },
}));

export default useUserStore;
