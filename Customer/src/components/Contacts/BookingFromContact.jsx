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
          mb: 5
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
