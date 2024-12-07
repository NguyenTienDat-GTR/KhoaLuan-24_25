import {create} from "zustand";
import axios from "../../config/axiosConfig";

const useAppointmentRequestStore = create((set) => ({
    appointmentRequests: [],
    loading: false,
    error: null,
    requestByid: null,
    requestedRejected: [],

    getAllRequestAppointment: async (token, {filters}) => {
        set({loading: true});
        try {
            const params = {};

            // Kiểm tra các filters và truyền vào params
            if (filters?.year) params.year = filters.year;
            if (filters?.quarter) params.quarter = filters.quarter;
            if (filters?.month) params.month = filters.month;
            if (filters?.doctorId) params.doctorId = filters.doctorId;

            const response = await axios.get("/appointment-request/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: params,
            });
            if (response.status === 200) {
                set({appointmentRequests: response.data.request, loading: false});
            }
        } catch (error) {
            set({error: error?.response?.data.message, loading: false});
        }
    },

    getRequestById: async (id, token) => {
        set({loading: true});
        try {
            const response = await axios.get(`/appointment-request/getById/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                set({requestByid: response.data.request, loading: false});
            }
        } catch (error) {
            set({error: error?.response?.data.message, loading: false});
        }
    },
    getRequestRejected: async (token,{filters}) => {
        set({loading: true});
        try {
            const params = {};

            // Kiểm tra các filters và truyền vào params
            if (filters?.year) params.year = filters.year;
            if (filters?.quarter) params.quarter = filters.quarter;
            if (filters?.month) params.month = filters.month;
            if (filters?.rejectBy) params.rejectBy = filters.rejectBy;

            const response = await axios.get("/appointment-request/rejected", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: params,
            });
            if (response.status === 200) {
                set({requestedRejected: response.data.requests, loading: false});
            }
        } catch (error) {
            set({error: error?.response?.data.message, loading: false});
        }
    },
}));

export default useAppointmentRequestStore;
