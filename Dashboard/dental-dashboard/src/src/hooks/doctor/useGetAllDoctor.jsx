import { create } from "zustand";
import axios from "../../config/axiosConfig";

const useDoctorStore = create((set) => ({
  doctors: [],
  loading: false,
  error: null,

  getAllDoctors: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/employee/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const doctors = response.data.employees.filter(
        (employee) => employee.position === "doctor"
      );
      set({ doctors, loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Đã xảy ra lỗi khi tải danh sách bác sĩ",
        loading: false,
      });
    }
  },
}));

export default useDoctorStore;
