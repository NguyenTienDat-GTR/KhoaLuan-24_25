import { create } from "zustand";
import axios from "../../config/axiosConfig";

const useGetAllAccounts = create((set) => ({
  accounts: [],
  loading: false,
  error: null,

  getAllAccount: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/account/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const accounts = response.data;
      set({ accounts, loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Xảy ra lỗi khi tải danh sách tài khoản",
        loading: false,
      });
    }
  },
}));

export default useGetAllAccounts;
