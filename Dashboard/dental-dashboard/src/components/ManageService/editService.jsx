import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  Box,
  TextField,
  Divider,
  Typography,
  MenuItem,
} from "@mui/material";
import axios from "../../config/axiosConfig";
import useUserStore from "../../hooks/auth/useUserStore";
import useGetAllService from "../../hooks/service/useGetAllServiceType";

const EditService = ({ serviceId, onClose, open }) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userLoggedIn, setUserLoggedIn, token } = useUserStore();
  const { services, getAllService } = useGetAllService();

  useEffect(() => {
    if (token) {
      setUserLoggedIn(token);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getAllService();
    }
  }, [token, services]);

  const units = {
    tooth: "Răng",
    jaw: "Hàm",
    treatment: "Liệu trình",
    set: "Bộ",
    session: "Lần",
  };

  const fetchDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`/service/getById/${serviceId}`);
      setService(response.data?.service || response.data);
    } catch (error) {
      console.error("Error fetching service:", error);
      setError("Không thể tải thông tin dịch vụ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && serviceId) {
      fetchDetails();
      // setService(null);
      setError(null);
    }
  }, [open, serviceId]);

  const handleSave = async () => {
    const updatedService = {
      ...service,
      price: service.price|| "",
      description: service.description|| "",
      priceRange: service.priceRange|| "",
      unit: service.unit|| "",
      discount: service.discount|| "",
      duration: service.duration|| "", // Thời gian thực hiện
      //serviceTypeName: service.serviceTypeName|| "", // Loại dịch vụ
    };
console.log(updatedService);

    try {
      const response = await axios.put(`/service/update/${serviceId}`, updatedService, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      if (response.status === 200) {
        alert("Cập nhật dịch vụ thành công!");
        onClose();
      } else {
        console.error(response);
        alert("Không thể cập nhật dịch vụ. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi cập nhật dịch vụ:", error.response?.data || error.message);
      alert(`Lỗi: ${error.response?.data?.message || "Không thể cập nhật dịch vụ."}`);
    }
  };

  if (loading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Chỉnh sửa dịch vụ</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Đang tải chi tiết dịch vụ...</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
        Chỉnh sửa dịch vụ
      </DialogTitle>
      <DialogContent>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Box>
              <TextField
                label="Tên dịch vụ"
                variant="outlined"
                fullWidth
                value={service?.name || ""}
                onChange={(e) => setService({ ...service, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Giá"
                variant="outlined"
                fullWidth
                value={service?.price || ""}
                onChange={(e) => setService({ ...service, price: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Khoảng giá"
                variant="outlined"
                fullWidth
                value={service?.priceRange || ""}
                onChange={(e) => setService({ ...service, priceRange: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                select
                label="Đơn vị tính"
                variant="outlined"
                fullWidth
                value={service?.unit || ""}
                onChange={(e) => setService({ ...service, unit: e.target.value })}
                sx={{ mb: 2 }}
              >
                {Object.entries(units).map(([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Thời gian thực hiện (phút)"
                variant="outlined"
                fullWidth
                value={service?.duration || ""}
                onChange={(e) => setService({ ...service, duration: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Giảm giá (%)"
                variant="outlined"
                fullWidth
                value={service?.discount || ""}
                onChange={(e) => setService({ ...service, discount: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Mô tả"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={service?.description || ""}
                onChange={(e) => setService({ ...service, description: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
        <Button onClick={handleSave} color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditService;
