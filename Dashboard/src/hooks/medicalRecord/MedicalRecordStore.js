import {create} from "zustand";
import axios from "../../config/axiosConfig";

const useMedicalRecordStore = create((set) => ({
    records:[],
    loading: false,
    error: null,
    record: null,

    getAllMedicalRecords: async (token) => {
        set({loading: true});
        try {
            const response = await axios.get("/medical-record/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            //đảo ngược mảng records để hiển thị record mới nhất lên đâuuf
            set({records: response.data.reverse(), loading: false});
        } catch (error) {
            set({error: error.response.data, loading: false});
        }
    },
}));

export default useMedicalRecordStore;