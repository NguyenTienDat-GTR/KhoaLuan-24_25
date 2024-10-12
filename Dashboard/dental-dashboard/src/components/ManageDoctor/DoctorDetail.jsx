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
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DoctorDetail = ({ open, onClose, doctor }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    dob: null,
    gender: "male",
    idCard: "",
    phone: "",
    email: "",
    address: "",
    degree: "",
    workingSchedule: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (doctor) {
      setFormData({
        id: doctor.id,
        name: doctor.name,
        dob: doctor.dob,
        gender: doctor.gender,
        idCard: doctor.idCard,
        phone: doctor.phone,
        email: doctor.email,
        address: doctor.address,
        degree: doctor.degree,
        workingSchedule: doctor.workingSchedule,
      });
    }
  }, [doctor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleScheduleChange = (day, time) => {
    setFormData((prevData) => {
      const updatedSchedule = { ...prevData.workingSchedule };
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>Thông tin bác sĩ</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 4, mt: 2 }}>
            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Mã bác sĩ"
                variant="outlined"
                name="id"
                value={formData?.id || ""}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: !!formData?.id,
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
                  shrink: !!formData?.id,
                }}
              />
              <DesktopDatePicker
                label="Ngày tháng năm sinh"
                value={formData?.dob}
                onChange={(newValue) =>
                  setFormData({ ...formData, dob: newValue })
                }
                componentsProps={{
                  textField: {
                    fullWidth: true,
                    InputProps: {
                      readOnly: !isEditing,
                    },
                  },
                }}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Giới tính</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={formData?.gender || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Nữ"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
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
                  shrink: !!formData?.id,
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
                  shrink: !!formData?.id,
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
                  shrink: !!formData?.id,
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
                  shrink: !!formData?.id,
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
                  shrink: !!formData?.id,
                }}
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="h6">Lịch làm việc</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 2,
              }}
            >
              {Object.keys(daysOfWeek).map((dayKey) => (
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
              color={!isEditing ? "primary" : "success"}
              onClick={handleEditToggle}
            >
              {isEditing ? "Lưu thông tin" : "Chỉnh sửa thông tin"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

export default DoctorDetail;
