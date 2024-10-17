import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const useUserStore = create((set) => ({
  userLoggedIn: null,
  token: "",
  setUserLoggedIn: (token) => {
    const decodedUser = jwtDecode(token);
    set({ userLoggedIn: decodedUser, token });
  },
  clearUser: () => set({ userLoggedIn: null, token: "" }),
}));

export default useUserStore;
