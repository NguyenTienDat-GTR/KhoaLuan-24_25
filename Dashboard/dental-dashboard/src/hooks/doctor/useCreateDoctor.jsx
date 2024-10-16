import { useState } from "react";
import axios from "../../config/axiosConfig"; // Đường dẫn này có thể tùy chỉnh theo project
import Cookies from "js-cookie";

const useCreateDoctor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const createDoctor = async (doctorData, avatarFile) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Tạo formData để gửi dữ liệu, bao gồm cả file ảnh
      const formData = new FormData();
      formData.append("employeeName", doctorData.employeeName);
      formData.append("gender", doctorData.gender);
      formData.append("birthDate", doctorData.birthDate);
      formData.append("employeePhone", doctorData.employeePhone);
      formData.append("employeeEmail", doctorData.employeeEmail);
      formData.append("citizenID", doctorData.citizenID);
      formData.append("address", doctorData.address);
      formData.append("workingTime", JSON.stringify(doctorData.workingTime));
      formData.append(
        "employeeSpecialization",
        JSON.stringify(doctorData.employeeSpecialization)
      );
      formData.append("position", "doctor"); // Bác sĩ
      formData.append("createBy", Cookies.get("username")); // Lấy người tạo từ cookie hoặc authentication
      formData.append("urlAvatar", avatarFile); // File ảnh

      // Gửi request POST đến server
      const response = await axios.post("/api/doctor/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Đã xảy ra lỗi khi thêm bác sĩ");
    } finally {
      setLoading(false);
    }
  };

  return {
    createDoctor,
    loading,
    error,
    success,
  };
};

export default useCreateDoctor;
