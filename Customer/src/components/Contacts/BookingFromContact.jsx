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
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Sử dụng Day.js để xử lý ngày
import dayjs from "dayjs"; // Import dayjs
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import logo from "..//images/phong-kham/logo.png"
//import Phongkham from "..//components/images/phong-kham/phongkham1.png"

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
        className="container-booking"
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
        <Box
          className="container-text"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", sm: "50%", md: "50%" }, // Giảm width của container-text
            height: { xs: "auto", sm: "15rem", md: "20rem" },
            mt: { xs: "2rem", sm: "0", md: "0" },
            // px: { xs: "1rem", sm: "0", md: "0" }, // Padding horizontal trên mobile
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              height: "auto",
              ml: { xs: "0", sm: "2rem", md: "2rem" },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "rgba(0,74,211,1)",
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" },
              }}
            >
              NHA KHOA HBT
            </Typography>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: { xs: "3rem", sm: "3.5rem", md: "4.5rem" },
                marginRight: { xs: "0.5rem", sm: "1rem" },
              }}
            />
            <Box
              className="contact"
              sx={{
                width: "100%",
                fontSize: {
                  xs: "0.8rem",
                  sm: "1rem",
                  md: "1.2rem",
                },
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  mb: "0.5rem",
                  flexWrap: "wrap", // Cho phép xuống dòng khi không đủ không gian
                }}
              >
                <PinDropOutlinedIcon />
                <strong>Địa chỉ:</strong>
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                      md: "1.2rem",
                    },
                  }}
                >
                  877 Tân Kỳ Tân Quý, Phường Bình Hưng Hoà A, Quận Bình Tân, Tp.Hồ Chí Minh
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  mb: "0.5rem",
                  flexWrap: "wrap", // Cho phép xuống dòng khi không đủ không gian
                }}
              >
                <AccessTimeOutlinedIcon />
                <strong>Giờ làm việc:</strong>
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                      md: "1.2rem",
                    },
                  }}
                >
                  9:00 AM - 5:00 PM
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  mb: "0.5rem",
                  flexWrap: "wrap", // Cho phép xuống dòng khi không đủ không gian
                }}
              >
                <PhoneInTalkOutlinedIcon />
                <strong>Hotline:</strong>
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                      md: "1.2rem",
                    },
                  }}
                >
                  0906070338
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  mb: "0.5rem",
                  flexWrap: "wrap", // Cho phép xuống dòng khi không đủ không gian
                }}
              >
                <EmailOutlinedIcon />
                <strong>Email:</strong>
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                      md: "1.2rem",
                    },
                  }}
                >
                  phongkhamnhakhoahbt@gmail.com
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  mb: "0.5rem",
                  flexWrap: "wrap", // Cho phép xuống dòng khi không đủ không gian
                }}
              >
                <LanguageOutlinedIcon />
                <strong>Website:</strong>
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                      md: "1.2rem",
                    },
                  }}
                >
                  www.nhakhoahbt.com
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          className="booking-container"
          sx={{
            width: { xs: "100%", sm: "65%", md: "70%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Box
            className="title"
            sx={{
              textAlign: "center",
              mb: "1rem",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Nhận tư vấn miễn phí từ bác sĩ
            </Typography>
            <Typography variant="h5" sx={{ color: "rgba(0,74,211,1)" }}>
              ĐẶT LỊCH THĂM KHÁM NGAY
            </Typography>
          </Box>
          <form
            className="form-content"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Box
              className="name-phone"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "flex-start",
                gap: "1rem",
                width: "100%",
                maxWidth: "600px",
              }}
            >
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
            <br/>
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
          

            {/* Date & Time Selection */}
            <Box
              className="booking-date-time"
              sx={{
                width: "100%",
                textAlign: "left",
                padding: "1rem",
                display: "flex",
                flexDirection: { xs: "column", sm: "column", md: "row" },
                alignItems: {
                  xs: "flex-start",
                  sm: "flex-start",
                  md: "center",
                },
                gap: "1rem",
              }}
            >
              {/* DatePicker */}
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

            {/* Gender Selection */}
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

<br></br>
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
                onClick={handleSubmit} sx={{ width: "100%", maxWidth: "300px" ,
                 height: { xs: "2.5rem", sm: "3rem" }}}>
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
          </form>
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
