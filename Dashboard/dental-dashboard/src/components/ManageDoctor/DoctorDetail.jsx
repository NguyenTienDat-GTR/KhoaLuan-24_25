import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";

const DoctorDetail = ({ open, onClose, doctor }) => {
  const [formData, setFormData] = useState(doctor);
  const [isEditing, setIsEditing] = useState(false);

  // Sử dụng useEffect để cập nhật formData khi `doctor` thay đổi
  useEffect(() => {
    if (doctor) {
      setFormData(doctor);
    }
  }, [doctor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleScheduleChange = (day, time) => {
    setFormData((prevData) => {
      const updatedSchedule = { ...prevData?.workingSchedule };
      const timeIndex = updatedSchedule[day]?.indexOf(time);
      if (timeIndex > -1) {
        updatedSchedule[day]?.splice(timeIndex, 1);
      } else {
        updatedSchedule[day]?.push(time);
      }
      return { ...prevData, workingSchedule: updatedSchedule };
    });
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleCancelEdit = () => {
    setFormData(doctor);
    setIsEditing(false);
  };

  const daysOfWeek = {
    Monday: "Thứ Hai",
    Tuesday: "Thứ Ba",
    Wednesday: "Thứ Tư",
    Thursday: "Thứ Năm",
    Friday: "Thứ Sáu",
    Saturday: "Thứ Bảy",
    Sunday: "Chủ Nhật",
  };

  const timeSlots = ["8:00 - 12:00", "13:00 - 17:00"];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Thông tin bác sĩ</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          {/* Các trường thông tin khác */}
          <TextField
            label="Mã bác sĩ"
            variant="outlined"
            name="id"
            value={formData?.id || ""}
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: !!formData?.id, // Luôn luôn thu nhỏ label nếu có giá trị
            }}
          />
          <TextField
            label="Họ tên"
            variant="outlined"
            name="name"
            value={formData?.name || ""}
            onChange={handleInputChange}
            InputProps={{
              readOnly: !isEditing,
            }}
            InputLabelProps={{
              shrink: !!formData?.id, // Luôn luôn thu nhỏ label nếu có giá trị
            }}
          />
          <TextField
            label="Ngày tháng năm sinh"
            variant="outlined"
            name="dob"
            value={formData?.dob || ""}
            onChange={handleInputChange}
            InputProps={{
              readOnly: !isEditing,
            }}
            InputLabelProps={{
              shrink: !!formData?.id, // Luôn luôn thu nhỏ label nếu có giá trị
            }}
          />
          <TextField
            label="Giới tính"
            variant="outlined"
            name="gender"
            value={formData?.gender || ""}
            onChange={handleInputChange}
            InputProps={{
              readOnly: !isEditing,
            }}
            InputLabelProps={{
              shrink: !!formData?.id, // Luôn luôn thu nhỏ label nếu có giá trị
            }}
          />
          <TextField
            label="Căn cước công dân"
            variant="outlined"
            name="idCard"
            value={formData?.idCard || ""}
            onChange={handleInputChange}
            InputProps={{
              readOnly: !isEditing,
            }}
            InputLabelProps={{
              shrink: !!formData?.id, // Luôn luôn thu nhỏ label nếu có giá trị
            }}
          />
          <TextField
            label="Số điện thoại"
            variant="outlined"
            name="phone"
            value={formData?.phone || ""}
            onChange={handleInputChange}
            InputProps={{
              readOnly: !isEditing,
            }}
            InputLabelProps={{
              shrink: !!formData?.id, // Luôn luôn thu nhỏ label nếu có giá trị
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData?.email || ""}
            onChange={handleInputChange}
            InputProps={{
              readOnly: !isEditing,
            }}
            InputLabelProps={{
              shrink: !!formData?.id, // Luôn luôn thu nhỏ label nếu có giá trị
            }}
          />
          <TextField
            label="Địa chỉ"
            variant="outlined"
            name="address"
            value={formData?.address || ""}
            onChange={handleInputChange}
            InputProps={{
              readOnly: !isEditing,
            }}
            InputLabelProps={{
              shrink: !!formData?.id, // Luôn luôn thu nhỏ label nếu có giá trị
            }}
          />
          <TextField
            label="Bằng cấp"
            variant="outlined"
            name="degree"
            value={formData?.degree || ""}
            onChange={handleInputChange}
            InputProps={{
              readOnly: !isEditing,
            }}
            InputLabelProps={{
              shrink: !!formData?.id, // Luôn luôn thu nhỏ label nếu có giá trị
            }}
          />
          {/* Lịch làm việc */}
          <Box>
            <Typography variant="h6">Lịch làm việc</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 2,
              }}
            >
              {Object.keys(daysOfWeek).map((dayKey, index) => (
                <Box
                  key={dayKey}
                  sx={{
                    padding: 2,
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    opacity:
                      !isEditing &&
                      formData?.workingSchedule?.[dayKey]?.length === 0
                        ? 0.5
                        : 1,
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {daysOfWeek[dayKey]}
                  </Typography>
                  {timeSlots.map((time) => (
                    <Typography key={time}>
                      {formData?.workingSchedule?.[dayKey]?.includes(time) ? (
                        <span>✔ {time}</span>
                      ) : (
                        <span>{time}</span>
                      )}
                    </Typography>
                  ))}
                  {/* Hiển thị checkbox khi đang chỉnh sửa */}
                  {isEditing && (
                    <Box>
                      {timeSlots.map((time) => (
                        <FormControlLabel
                          key={time}
                          control={
                            <Checkbox
                              checked={formData?.workingSchedule?.[
                                dayKey
                              ]?.includes(time)}
                              onChange={() =>
                                handleScheduleChange(dayKey, time)
                              }
                            />
                          }
                          label={time}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          {/* Button Đóng, Hủy và Chỉnh sửa */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
              gap: 2,
            }}
          >
            <Button variant="outlined" onClick={onClose}>
              Đóng
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelEdit}
              disabled={!isEditing} // Hủy chỉ nhấn được khi isEditing là true
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              color={!isEditing ? "primary" : "secondary"}
              onClick={handleEditToggle}
            >
              {isEditing ? "Lưu thông tin" : "Chỉnh sửa thông tin"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorDetail;
