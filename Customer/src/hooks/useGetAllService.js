import { create } from "zustand";
import axios from "../config/axiosConfig.js";

const useGetService = create((set) => ({
    loading: false,
    error: null,
    services: [],

    getAllService: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get("/service/getAll");
            if (response.status === 200) {
                set({ services: response.data.services, loading: false });
            }
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

export default useGetService;
