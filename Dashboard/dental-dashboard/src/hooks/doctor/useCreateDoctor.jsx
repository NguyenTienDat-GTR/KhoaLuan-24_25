import { useState } from "react";
import axios from "../../config/axiosConfig"; // Đường dẫn này có thể tùy chỉnh theo project
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const useCreateDoctor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = Cookies.get("token");

  const createDoctor = async (doctorData, avatarFile) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

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
      formData.append("position", "doctor");
      formData.append("createBy", doctorData.createBy);
      formData.append("employeeAvatar", avatarFile);
      // Gửi request POST đến server
      const response = await axios.post("/employee/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
      toast.success(response.data.message, {
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data.message, {
        autoClose: 3000,
        hideProgressBar: false,
      });
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
