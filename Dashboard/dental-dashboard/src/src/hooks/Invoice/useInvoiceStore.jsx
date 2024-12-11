import {create} from "zustand";
import axios from "../../config/axiosConfig";

const useInvoiceStore = create((set) => ({
    invoices: [],
    loading: false,
    error: null,
    selectedInvoice: null,
    totalAmount: 0,

    getTotalAmount: async (token, {filters}) => {
        set({loading: true});
        try {
            const params = {};
            // Kiểm tra các filters và truyền vào params
            if (filters?.year) params.year = filters.year;
            if (filters?.quarter) params.quarter = filters.quarter;
            if (filters?.month) params.month = filters.month;
            const response = await axios.get("/invoice/total-amount", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: params,
            });
            set({totalAmount: response.data.totalAmount, loading: false});
        } catch (error) {
            set({error: error.response.data, loading: false});
        }
    },

    // Action để set selectedInvoice
    setSelectedInvoice: (invoice) => set({selectedInvoice: invoice}),

    getAllInvoices: async (token, {filters}) => {
        set({loading: true});
        try {
            const params = {};
            // Kiểm tra các filters và truyền vào params
            if (filters?.year) params.year = filters.year;
            if (filters?.quarter) params.quarter = filters.quarter;
            if (filters?.month) params.month = filters.month;
            const response = await axios.get("/invoice/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: params,
            });
            set({invoices: response.data, loading: false});
        } catch (error) {
            set({error: error.response.data, loading: false});
        }
    },
}));

export default useInvoiceStore;