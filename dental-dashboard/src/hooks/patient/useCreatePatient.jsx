import { useState } from "react";
import axios from "../../config/axiosConfig"; // Đường dẫn này có thể tùy chỉnh theo project
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useUserStore from "../auth/useUserStore";

const useCreatePatient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token } = useUserStore();

  const createPatient = async (patientData, avatarFile) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Tạo formData để gửi dữ liệu, bao gồm cả file ảnh
      const formData = new FormData();
      formData.append("employeeName", patientData.employeeName);
      formData.append("gender", patientData.gender);
      formData.append("birthDate", patientData.birthDate);
      formData.append("employeePhone", patientData.employeePhone);
      formData.append("employeeEmail", patientData.employeeEmail);
      formData.append("citizenID", patientData.citizenID);
      formData.append("address", patientData.address);
      formData.append("workingTime", JSON.stringify(patientData.workingTime));
      formData.append(
        "employeeSpecialization",
        JSON.stringify(patientData.employeeSpecialization)
      );
      formData.append("position", "patient");
      formData.append("createBy", patientData.createBy);
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
      setError(err.response?.data?.message || "Đã xảy ra lỗi khi thêm bệnh nhân");
    } finally {
      setLoading(false);
    }
  };

  return {
    createPatient,
    loading,
    error,
    success,
  };
};

export default useCreatePatient;
