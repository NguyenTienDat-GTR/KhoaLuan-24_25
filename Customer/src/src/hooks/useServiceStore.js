import axios from "../config/axiosConfig";
import { create } from "zustand";

const useServiceStore = create((set) => ({
    loading: false,
    error: null,
    category: [],
    getAllService: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get("/service-type/all")
            set({ category: response.data, loading: false });
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

export default useServiceStore;