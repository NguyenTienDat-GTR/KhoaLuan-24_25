import { create } from "zustand";
import axios from "../../config/axiosConfig";

const useAppointmentRequestStore = create((set) => ({
  appointmentRequests: [],
  loading: false,
  error: null,

  getAllRequestAppointment: async (token) => {
    set({ loading: true });
    try {
      const response = await axios.get("/appointment-request/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        set({ appointmentRequests: response.data.request, loading: false });
      }
    } catch (error) {
      set({ error: error?.response?.data.message, loading: false });
    }
  },
}));

export default useAppointmentRequestStore;
