import {create} from "zustand";
import axios from "../../config/axiosConfig";

const usePatientStore = create((set) => ({
    patients: [],
    loading: false,
    error: null,

    getAllPatients: async (token,{filters}) => {
        set({loading: true, error: null});
        try {

            const params = {};

            // Kiểm tra các filters và truyền vào params
            if (filters?.year) params.year = filters.year;
            if (filters?.quarter) params.quarter = filters.quarter;
            if (filters?.month) params.month = filters.month;

            const response = await axios.get("/customer/getAll", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: params,
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
