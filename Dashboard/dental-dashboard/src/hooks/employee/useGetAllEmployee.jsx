import { create } from "zustand";
import axios from "../../config/axiosConfig";

const useEmployeeStore = create((set) => ({
  employees: [],
  loading: false,
  error: null,

  getAllEmployees: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/employee/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const emp = response.data.employees.filter(
        (employee) => employee.position !== "doctor"
      );
      set({ employees: emp, loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Đã xảy ra lỗi khi tải danh sách nhân viên",
        loading: false,
      });
    }
  },
}));
export default useEmployeeStore;
