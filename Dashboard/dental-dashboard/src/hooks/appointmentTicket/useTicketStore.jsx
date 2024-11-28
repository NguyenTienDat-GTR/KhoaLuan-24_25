import {create} from "zustand";
import axios from "../../config/axiosConfig";

const useTicketStore = create((set) => ({
    tickets: [],
    loading: false,
    error: null,
    ticketById: null,
    ticketByDoctor: [],
    ticketId: null,

    getAllTickets: async (token) => {
        set({loading: true});
        try {
            const response = await axios.get("/ticket/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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

    getTicketByDoctor: async (token, doctorId) => {
        set({loading: true});
        try {
            const response = await axios.get(`/ticket/getByDoctor/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.status === 200) {
                set({ticketByDoctor: response.data.tickets, loading: false});
            }
        } catch (error) {
            set({error: error?.response?.data.message, loading: false});
        }
    },

    setTicketId: (id) => set({ticketId: id}),
}));

export default useTicketStore;
