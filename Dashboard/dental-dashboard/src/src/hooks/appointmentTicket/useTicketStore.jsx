import {create} from "zustand";
import axios from "../../config/axiosConfig";

const useTicketStore = create((set) => ({
    tickets: [],
    loading: false,
    error: null,
    ticketById: null,
    ticketByDoctor: [],
    ticketId: null,
    ticketDoneOfDoctor:[],

    getAllTickets: async (token, {filters}) => {
        set({loading: true});
        try {
            const params = {};

            // Kiểm tra các filters và truyền vào params
            if (filters?.year) params.year = filters.year;
            if (filters?.quarter) params.quarter = filters.quarter;
            if (filters?.month) params.month = filters.month;

            // Nếu có doctorId, truyền vào
            if (filters?.doctorId) params.doctorId = filters.doctorId;

            const response = await axios.get("/ticket/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: params,
            });

            if (response.status === 200) {
                set({tickets: response.data.appointmentTickets, loading: false});
            }
        } catch (error) {
            set({error: error?.response?.data.message, loading: false});
        }
    },


    getTicketById: async (token, ticketId) => {
        set({loading: true});
        try {
            const response = await axios.get(`/ticket/getById/${ticketId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                set({ticketById: response.data.ticket, loading: false});
            }
        } catch (error) {
            set({error: error?.response?.data.message, loading: false});
        }
    },

    getTicketByDoctor: async (token, doctorId,{filters}) => {
        set({loading: true});
        try {
            const params = {};

            // Kiểm tra các filters và truyền vào params
            if (filters?.year) params.year = filters.year;
            if (filters?.quarter) params.quarter = filters.quarter;
            if (filters?.month) params.month = filters.month;

            // Nếu có doctorId, truyền vào
            if (filters?.doctorId) params.doctorId = filters.doctorId;

            const response = await axios.get(`/ticket/getByDoctor/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: params,
            });
            if (response.status === 200) {
                set({ticketByDoctor: response.data.tickets, loading: false});
            }
        } catch (error) {
            set({error: error?.response?.data.message, loading: false});
        }
    },

    setTicketId: (id) => set({ticketId: id}),

    getTicketDoneOfDoctor: async (token, {filters}) => {
        set({loading: true});
        try {
            const params = {};

            // Kiểm tra các filters và truyền vào params
            if (filters?.year) params.year = filters.year;
            if (filters?.quarter) params.quarter = filters.quarter;
            if (filters?.month) params.month = filters.month;

            // Nếu có doctorId, truyền vào
            if (filters?.doctorId) params.doctorId = filters.doctorId;

            const response = await axios.get("/ticket/doneOfDoctor", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: params,
            });

            if (response.status === 200) {
                set({ticketDoneOfDoctor: response.data.appointmentTickets, loading: false});
            }
        } catch (error) {
            set({error: error?.response?.data.message, loading: false});
        }
    }

}));

export default useTicketStore;
