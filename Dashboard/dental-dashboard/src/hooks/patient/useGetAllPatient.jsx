import { create } from "zustand";
import axios from "../../config/axiosConfig";

const usePatientStore = create((set) => ({
  doctors: [],
  loading: false,
  error: null,

  getAllPatients: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/employee/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const patients = response.data.employees.filter(
        (employee) => employee.position === "patient"
      );
      set({ patients, loading: false });
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
