import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import axios from "../../config/axiosConfig";
import useSocket from "../../hooks/useSocket";

const CreateAppointmentRequest = ({ open, handleClose, selectedService }) => {
  const socket = useSocket();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    time: "",
    date: "",
    doctorGender: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleCloseDialog = () => {
    handleReset();
    handleClose();
  };
  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      time: "",
      date: "",
      doctorGender: "",
      notes: "",
    });
  };

  const validateDateTime = () => {
    if (!formData.date || !formData.time) {
      setSnackbarMessage("Vui lòng chọn cả ngày và giờ.");
      setSnackbarOpen(true);
      return false;
    }

    const dateString = `${formData.date} ${formData.time}`;
    const appointmentTimestamp = Date.parse(dateString);

    if (isNaN(appointmentTimestamp)) {
      setSnackbarMessage("Ngày hoặc giờ không hợp lệ.");
      setSnackbarOpen(true);
      return false;
    }

    const currentDateTime = new Date();
    const appointmentDateTime = new Date(appointmentTimestamp);

    // Kiểm tra không được đặt thời gian nhỏ hơn thời gian hiện tại
    if (appointmentDateTime <= currentDateTime) {
      setSnackbarMessage("Thời gian đặt lịch phải lớn hơn thời gian hiện tại.");
      setSnackbarOpen(true);
      return false;
    }

    // Kiểm tra thời gian đặt lịch không nhỏ hơn 2 giờ từ thời điểm hiện tại
    const twoHoursLater = new Date(
      currentDateTime.getTime() + 2 * 60 * 60 * 1000
    );
    if (appointmentDateTime < twoHoursLater) {
      setSnackbarMessage("Thời gian đặt lịch phải lớn hơn 2 giờ từ bây giờ.");
      setSnackbarOpen(true);
      return false;
    }

    // Kiểm tra không được đặt ngày lớn hơn 1 tháng
    const oneMonthLater = new Date(currentDateTime);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    if (appointmentDateTime > oneMonthLater) {
      setSnackbarMessage("Thời gian đặt lịch không được lớn hơn 1 tháng.");
      setSnackbarOpen(true);
      return false;
    }

    return true;
  };

  const handleBookingSubmit = async () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Họ tên không được để trống";
    if (!formData.phone) newErrors.phone = "Số điện thoại không được để trống";
    if (!formData.date) newErrors.date = "Ngày không được để trống";
    if (!formData.time) newErrors.time = "Thời gian không được để trống";
    if (!formData.doctorGender)
      newErrors.doctorGender = "Giới tính bác sĩ không được để trống";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Validate date and time
    if (!validateDateTime()) {
      return;
    }

    const formattedDate = new Date(formData.date);
    const day = String(formattedDate.getDate()).padStart(2, "0"); // Thêm số 0 ở đầu nếu cần
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = formattedDate.getFullYear();

    // Prepare data for the request
    const appointmentData = {
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      appointmentDate: `${day}/${month}/${year}`,
      appointmentTime: formData.time,
      service: selectedService?.name,
      genderDoctor:
        formData.doctorGender === "Nam"
          ? "male"
          : formData.doctorGender === "Tất cả"
          ? "all"
          : "female",
      note: formData.notes,
      concern: "", // Assuming you want to keep it empty or manage it later
      createBy: formData.name, // Using the customer's name
    };
    console.log(appointmentData);
    setLoading(true);
    try {
      const response = await axios.post(
        "/appointment-request/create",
        appointmentData
      );
      socket.emit("newAppointmentRequest", response.data.newRequest); // Phát sự kiện mới đến server
      if (response.status === 201) {
        setSnackbarMessage(
          "Yêu cầu đặt lịch thành công. Hãy kiểm tra tin nhắn hoặc email của bạn!"
        );
        setSnackbarOpen(true);
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 3000);
        setLoading(false);
        handleReset();
      }
    } catch (error) {
      console.error("Lỗi đặt lịch:", error);
      setSnackbarMessage(error?.response?.data.message);
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <Box sx={{ position: "relative", padding: "1rem" }}>
        <IconButton
          onClick={handleCloseDialog}
          sx={{ position: "absolute", right: 0, top: 0 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2">
          Đặt lịch cho dịch vụ: {selectedService?.name}
        </Typography>
      </Box>

      <DialogContent>
        <TextField
          label="Họ tên"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Số điện thoại"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          // error={!!errors.email}
          // helperText={errors.email}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Dịch vụ"
          value={selectedService?.name || ""}
          fullWidth
          disabled
          sx={{ mb: 2 }}
        />

        <TextField
          label="Giá"
          value={selectedService?.priceRange || ""}
          fullWidth
          disabled
          sx={{ mb: 2 }}
        />

        <TextField
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          error={!!errors.date}
          helperText={errors.date}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Thời gian"
          name="time"
          select
          value={formData.time}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          {/* Excluding 12:00 from the selection */}
          {[...Array(9).keys()]
            .filter((h) => h !== 4) // Assuming 12:00 corresponds to index 4
            .map((hour) => (
              <MenuItem key={hour + 8} value={`${hour + 8}:00`}>
                {hour + 8}:00
              </MenuItem>
            ))}
        </TextField>

        <TextField
          label="Giới tính bác sĩ"
          name="doctorGender"
          select
          value={formData.doctorGender}
          onChange={handleChange}
          error={!!errors.doctorGender}
          helperText={errors.doctorGender}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="Nam">Nam</MenuItem>
          <MenuItem value="Nữ">Nữ</MenuItem>
          <MenuItem value="Tất cả">Tất cả</MenuItem>
        </TextField>

        <TextField
          label="Ghi chú"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        {!loading ? (
          <>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: "60%" }}
              onClick={handleBookingSubmit}
            >
              Xác nhận đặt lịch
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2, width: "60%" }}
              onClick={handleReset}
            >
              Hủy
            </Button>
          </>
        ) : (
          <Typography>Đang gửi yêu cầu....</Typography>
        )}
      </DialogActions>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Dialog>
  );
};

export default CreateAppointmentRequest;
