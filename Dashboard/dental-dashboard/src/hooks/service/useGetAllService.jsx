import { create } from "zustand";
import axios from "../../config/axiosConfig";

const useGetAllService = create((set) => ({
  loading: false,
  error: null,
  services: [],

  getAllService: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/service-type/all")
      set({ services: response.data, loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Đã xảy ra lỗi khi tải danh sách dịch vụ",
        loading: false,
      });
    }
  },
}));

export default useGetAllService;
