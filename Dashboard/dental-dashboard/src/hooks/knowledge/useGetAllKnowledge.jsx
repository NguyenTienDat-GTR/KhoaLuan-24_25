import { create } from "zustand";
import axios from "../../config/axiosConfig";
import dayjs from "dayjs";

const formatDate = (dateString) => {
  return dayjs(dateString).format('DD/MM/YYYY, h:mm:ss A')
}

const useGetAllKnowledge = create((set) => ({
  loading: false,
  error: null,
  knowledges: [],

  getAllKnowledge: async () => {
    set({ loading: true, error: null });
    try {
        const response = await axios.get("/knowledge/getAll");
        console.log("Dữ liệu trả về từ API:", response.data);

        if (response.status === 200) {
            const formattedKnowledges = response.data.data?.map(knowledge => ({
                ...knowledge,
                createAt: formatDate(knowledge.createAt) // Định dạng ngày tháng
            })) || [];
            set({ knowledges: formattedKnowledges, loading: false });
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

export default useGetAllKnowledge;
