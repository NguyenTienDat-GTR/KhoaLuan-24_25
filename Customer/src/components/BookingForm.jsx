import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextareaAutosize,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Phongkham from "../components/images/phong-kham/phongkham1.png";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    doctorGender: "", // Giới tính bác sĩ
    date: new Date().toISOString().split("T")[0], // Chọn ngày mặc định là hôm nay
    time: "9h", // Giờ mặc định là 8h
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.email) newErrors.email = "Vui lòng nhập email";
    if (!formData.doctorGender) newErrors.doctorGender = "Vui lòng chọn giới tính bác sĩ";
    if (!formData.date) newErrors.date = "Vui lòng chọn ngày";
    if (!formData.time) newErrors.time = "Vui lòng chọn giờ";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setSnackbarMessage("Đặt lịch thành công, vui lòng kiểm tra email sau 15 phút!");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Vui lòng nhập đầy đủ thông tin các trường!");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: { xs: "100%", sm: "95%", md: "80%" },
          margin: "0 auto",
          backgroundColor: "rgba(21,171,255,0.1)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          minHeight: "500px",
          height: "auto",
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            width: { xs: "0", sm: "35%", md: "30%" },
            display: { xs: "none", sm: "flex" },
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <Box component="img" src={Phongkham} sx={{ width: { sm: "18rem", md: "22rem" }, height: { sm: "30rem", md: "30rem" } }} />
        </Box>

        {/* Form Section */}
        <Box sx={{ width: { xs: "100%", sm: "65%", md: "70%" }, display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Nhận tư vấn miễn phí từ bác sĩ</Typography>
          <Typography variant="h5" sx={{ color: "rgba(0,74,211,1)" }}>ĐẶT LỊCH THĂM KHÁM NGAY</Typography>

          <Box className="name-phone"
            sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            {/* Name & Phone */}
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: "1rem", width: "100%", maxWidth: "600px" }}>
              <TextField
                label="Họ và tên"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
              />
              <TextField
                label="Số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                fullWidth
              />
            </Box>

            {/* Email */}
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              sx={{ maxWidth: "600px" }} // Added to maintain width consistency
            />

            {/* Date & Time on the same row */}
            <Box className="booking-date-time"
              sx={{
                display: "flex", gap: "1rem",
                width: "100%", maxWidth: "600px"
              }}>
              <TextField
                label="Ngày "
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                error={!!errors.date}
                helperText={errors.date}
                fullWidth
              />
              <TextField
                label="Thời gian"
                name="time"
                select
                value={formData.time}
                onChange={handleChange}
                fullWidth
              >
                {[...Array(9).keys()].map((hour) => (
                  <MenuItem key={hour} value={`${9 + hour}h`}>
                    {9 + hour}h
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Giới tính bác sĩ */}
            <FormControl component="fieldset"
              fullWidth error={!!errors.doctorGender}
              sx={{ mb: 2, maxWidth: "600px" }}>
              <FormLabel component="legend">Chọn giới tính bác sĩ</FormLabel>
              <RadioGroup
                row
                name="doctorGender"
                value={formData.doctorGender}
                onChange={handleChange}
              >
                <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
              </RadioGroup>
              {errors.doctorGender && (
                <Typography variant="body2" color="error">
                  {errors.doctorGender}
                </Typography>
              )}
            </FormControl>

            {/* Vấn đề bạn quan tâm */}
            <Box
              className="problem"
              sx={{
                width: "100%",
                textAlign: "left",
                padding: { xs: "0 1rem", sm: "0 1rem", md: "0 2rem" },
                maxWidth: "600px" // Added to maintain width consistency
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  mt: "1rem",
                  fontSize: { xs: "1rem", sm: "1rem", md: "1rem" },
                }}
              >
                Vấn đề bạn quan tâm:
              </Typography>
              <Box
                className="problem-content"
                sx={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr",
                  },
                  gap: { xs: "0.5rem", sm: "0.5rem", md: "1rem" },
                }}
              >
                <Box>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Nha khoa thẩm mỹ"
                  />
                  <Typography variant="body2" sx={{ marginLeft: "1.5rem" }}>
                    - Tẩy trắng răng
                    <br />
                    - Dán sứ veneer
                    <br />
                    - Trám răng
                    <br />
                    - Cạo vôi răng
                  </Typography>
                </Box>
                <Box>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Điều trị bệnh lý nha khoa"
                  />
                  <Typography variant="body2" sx={{ marginLeft: "1.5rem" }}>
                    - Nha khoa trẻ em
                    <br />
                    - Khám và điều trị sâu răng
                    <br />
                    - Điều trị nướu
                    <br />
                    - Điều trị tủy
                    <br />
                    - Điều trị nha chu
                  </Typography>
                </Box>
                <Box>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Niềng răng - cải thiện khớp cắn"
                  />
                  <Typography variant="body2" sx={{ marginLeft: "1.5rem" }}>
                    - Niềng răng mắc cài
                    <br />
                    - Niềng răng tháo lắp
                    <br />
                    - Niềng răng trong suốt
                  </Typography>
                </Box>
                <Box>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Phục hình răng đã mất"
                  />
                  <Typography variant="body2" sx={{ marginLeft: "1.5rem" }}>
                    - Hàm giả tháo lắp
                    <br />
                    - Cấy ghép implant
                    <br />
                    - Răng sứ thẩm mỹ
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Notes */}
            <TextareaAutosize
              aria-label="Ghi chú thêm"
              minRows={3}
              placeholder="Ghi chú thêm"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                borderColor: "#c4c4c4",
                fontSize: "1rem",
                maxWidth: "600px" // Added to maintain width consistency
              }}
            />

            {/* Submit Button */}
            <Box
              className="button-container"
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: {
                  xs: "space-evenly",
                  sm: "space-evenly",
                  md: "space-around",
                },
                alignItems: "center",
                gap: "1rem",
                height: { xs: "7rem", sm: "5rem", md: "5rem" },
              }}
            >
              <Button variant="contained" color="primary"
                onClick={handleSubmit} sx={{
                  width: "100%", maxWidth: "400px",
                  height: { xs: "2.5rem", sm: "3rem" }
                }}>
                ĐẶT LỊCH NGAY
              </Button>
              <Button
                variant="contained" color="error"
                sx={{
                  width: { xs: "100%", sm: "40%" },
                  height: { xs: "2.5rem", sm: "3rem" },
                }}
              >
                Nhập lại
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={Object.keys(errors).length > 0 ? "error" : "success"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
};

export default BookingForm;
