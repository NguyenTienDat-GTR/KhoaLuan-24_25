import { create } from "zustand";
import axios from "../../config/axiosConfig";
import dayjs from "dayjs";

const formatDate = (dateString) => {
  return dayjs(dateString).format('DD/MM/YYYY, h:mm:ss A')
}

const useGetPolicy = create((set) => ({
  loading: false,
  error: null,
  policies: [],

  getAllPolicy: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/policy/getAll");
      if (response.status === 200) {
        //console.log("dữ liệu backend", response.data.policies);
        
        const formattedPolicies = response.data.policies.map(policy => ({
          ...policy,
          createAt: formatDate(policy.createAt) // Định dạng ngày tháng
        }));
        set({ policies: formattedPolicies, loading: false });
      }
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Đã xảy ra lỗi khi tải danh sách chính sách",
        loading: false,
      });
    }
  },
}));

export default useGetPolicy;
