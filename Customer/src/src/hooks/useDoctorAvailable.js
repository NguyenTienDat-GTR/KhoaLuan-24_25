import axios from "../config/axiosConfig";
import {create} from "zustand";

const useDoctorAvailable = create((set) => ({
    doctorAvailable: [],
    loading: false,
    error: null,

    getDoctorAvailable: async () => {
        set({loading: true});
        try {
            const response = await axios.get("/ticket/getTimeOfDoctor");

            if (response.status === 200) {
                set({doctorAvailable: response.data, loading: false, error: null});
            }
        } catch (e) {
            set({loading: false, error: e.response?.data?.message || e.message});
        }
    }
}));

export default useDoctorAvailable;