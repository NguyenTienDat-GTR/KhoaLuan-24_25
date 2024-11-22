import {create} from "zustand";
import axios from "../../config/axiosConfig";

const usePatientStore = create((set) => ({
    patients: [],
    loading: false,
    error: null,

    getAllPatients: async (token) => {
        set({loading: true, error: null});
        try {
            const response = await axios.get("/customer/getAll", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                set({patients: response.data, loading: false});
            }

        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Đã xảy ra lỗi khi tải danh sách bệnh nhân",
                loading: false,
            });
        }
    },
}));

export default usePatientStore;
