import { useState } from "react";
import axios from "../../config/axiosConfig"; // Đường dẫn này có thể tùy chỉnh theo project
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useUserStore from "../auth/useUserStore";

const useCreateEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token } = useUserStore();

  const createEmployee = async (employeeData, avatarFile) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Tạo formData để gửi dữ liệu, bao gồm cả file ảnh
      const formData = new FormData();
      formData.append("employeeName", employeeData.employeeName);
      formData.append("gender", employeeData.gender);
      formData.append("birthDate", employeeData.birthDate);
      formData.append("employeePhone", employeeData.employeePhone);
      formData.append("employeeEmail", employeeData.employeeEmail);
      formData.append("citizenID", employeeData.citizenID);
      formData.append("address", employeeData.address);
      formData.append("workingTime", JSON.stringify(employeeData.workingTime));
      formData.append(
        "employeeSpecialization",
        JSON.stringify(employeeData.employeeSpecialization)
      );
      formData.append("position", "receptionist");
      formData.append("createBy", employeeData.createBy);
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
      setError(
        err.response?.data?.message || "Đã xảy ra lỗi khi thêm nhân viên"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    createEmployee,
    loading,
    error,
    success,
  };
};

export default useCreateEmployee;
