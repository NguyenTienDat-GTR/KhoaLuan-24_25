import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Sử dụng Day.js để xử lý ngày
import dayjs from "dayjs"; // Import dayjs

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());

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
          className="container-image"
          sx={{
            width: { xs: "0", sm: "35%", md: "30%" },
            display: { xs: "none", sm: "flex" },
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <Box
            component="img"
            src="https://picsum.photos/350/400"
            sx={{
              width: { sm: "18rem", md: "22rem" },
              height: { sm: "30rem", md: "30rem" },
            }}
          />
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
                placeholder="Họ và tên"
                fullWidth
                sx={{
                  flex: 1,
                  maxWidth: { xs: "100%", sm: "48%" },
                  "& .MuiInputBase-root": {
                    height: { xs: "2.5rem", sm: "3rem" },
                  },
                }}
              />
              <TextField
                placeholder="Số điện thoại"
                fullWidth
                sx={{
                  flex: 1,
                  maxWidth: { xs: "100%", sm: "48%" },
                  "& .MuiInputBase-root": {
                    height: { xs: "2.5rem", sm: "3rem" },
                  },
                }}
              />
            </Box>
            <Box
              className="problem"
              sx={{
                width: "100%",
                textAlign: "left",
                padding: { xs: "0 1rem", sm: "0 1rem", md: "0 2rem" },
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
                <FormControlLabel
                  control={<Checkbox />}
                  label="Sứ nha khoa thẩm mỹ"
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "0.875rem", md: "1rem" },
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Điều trị bệnh lý nha khoa"
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "0.875rem", md: "1rem" },
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Niềng răng - cải thiện khớp cắn"
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "0.875rem", md: "1rem" },
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Phục hình răng đã mất"
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "0.875rem", md: "1rem" },
                  }}
                />
              </Box>
            </Box>

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
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ marginBottom: "0.5rem" }}>
                  Ngày đặt lịch hẹn
                </Typography>
                <DatePicker
                  label="Chọn ngày"
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: 0,
                        },
                        "& .MuiInputBase-root": {
                          height: { xs: "2.5rem", sm: "3rem" },
                        },
                      }}
                    />
                  )}
                />
              </Box>

              {/* TimePicker */}
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ marginBottom: "0.5rem" }}>
                  Giờ đặt lịch hẹn
                </Typography>
                <TimePicker
                  label="Chọn giờ"
                  value={selectedTime}
                  onChange={(newTime) => setSelectedTime(newTime)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: 0,
                        },
                        "& .MuiInputBase-root": {
                          height: { xs: "2.5rem", sm: "3rem" },
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Box>

            <TextareaAutosize
              placeholder="Ghi chú..."
              minRows={2}
              maxRows={3}
              style={{
                width: "93%",
                height: "4rem",
                maxHeight: "4rem",
                overflowY: "auto",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                margin: "0 auto",
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
              <Button
                variant="outlined"
                sx={{
                  width: { xs: "100%", sm: "40%" },
                  height: { xs: "2.5rem", sm: "3rem" },
                }}
              >
                Nhập lại
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgba(0,74,211,1)",
                  width: { xs: "100%", sm: "40%" },
                  height: { xs: "2.5rem", sm: "3rem" },
                }}
              >
                Đặt lịch
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default BookingForm;
