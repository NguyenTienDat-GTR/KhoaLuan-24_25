import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  FormControl,
  FormLabel,
  Avatar,
} from "@mui/material";
import { Add, RestartAlt, Save, Cancel } from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "../../config/axiosConfig";
import Cookies from "js-cookie";

const CreateDoctor = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("male");
  const [idCard, setIdCard] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [degree, setDegree] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [workingSchedule, setWorkingSchedule] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  // Ánh xạ tên ngày tiếng Anh sang tiếng Việt
  const daysOfWeek = {
    Monday: "Thứ Hai",
    Tuesday: "Thứ Ba",
    Wednesday: "Thứ Tư",
    Thursday: "Thứ Năm",
    Friday: "Thứ Sáu",
    Saturday: "Thứ Bảy",
    Sunday: "Chủ Nhật",
  };

  // Handling avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // Create a local URL for the selected file
    }
  };

  const handleReset = () => {
    setName("");
    setDob(null);
    setGender("male");
    setIdCard("");
    setPhone("");
    setEmail("");
    setAddress("");
    setDegree("");
    setAvatar(null);
    setWorkingSchedule({
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    });
  };

  const handleCreate = () => {
    const dobString = dob ? dob.format("DDMMYYYY") : "";
    const doctorId = `${dobString}${idCard.slice(-4)}`.slice(0, 8);
    console.log("Doctor ID:", doctorId);
    console.log("Working Schedule:", workingSchedule);
    // Xử lý thêm bác sĩ mới ở đây
    onClose();
  };

  const handleCheckboxChange = (day, time) => {
    setWorkingSchedule((prevSchedule) => {
      const updatedTimes = prevSchedule[day].includes(time)
        ? prevSchedule[day].filter((t) => t !== time)
        : [...prevSchedule[day], time];
      return { ...prevSchedule, [day]: updatedTimes };
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>Thêm mới bác sĩ</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "row", gap: 4 }}
          >
            {/* Avatar upload */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                marginTop: 2,
              }}
            >
              <Avatar
                alt="Avatar Preview"
                src={avatar} // Display selected avatar
                sx={{ width: 120, height: 120 }}
              />
              <Button variant="contained" component="label">
                Tải lên ảnh đại diện
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleAvatarChange} // Handle file selection
                />
              </Button>
            </Box>
            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Họ tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <DesktopDatePicker
                label="Ngày tháng năm sinh"
                value={dob}
                onChange={setDob}
                componentsProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
              <FormControl sx={{ height: "3.55rem", justifyContent: "center" }}>
                <FormLabel component="legend">Giới tính</FormLabel>
                <RadioGroup
                  row
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
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
              <TextField
                label="Căn cước công dân"
                value={idCard}
                onChange={(e) => setIdCard(e.target.value)}
                fullWidth
              />
            </Box>

            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <TextField
                label="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
              />
              <TextField
                label="Bằng cấp"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                fullWidth
              />
            </Box>
          </Box>

          <Box>
            <h3>Lịch làm việc</h3>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {Object.keys(workingSchedule)
                .reduce((rows, day, index) => {
                  if (index % 3 === 0) rows.push([]); // Tạo hàng mới mỗi 3 ngày
                  rows[rows.length - 1].push(day);
                  return rows;
                }, [])
                .map((row, rowIndex) => (
                  <Box
                    key={rowIndex}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 5,
                    }}
                  >
                    {row.map((day) => (
                      <Box
                        key={day}
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <span>{daysOfWeek[day]}</span>{" "}
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={workingSchedule[day].includes(
                                "8:00 - 12:00"
                              )}
                              onChange={() =>
                                handleCheckboxChange(day, "8:00 - 12:00")
                              }
                            />
                          }
                          label="8:00 - 12:00"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={workingSchedule[day].includes(
                                "13:00 - 17:00"
                              )}
                              onChange={() =>
                                handleCheckboxChange(day, "13:00 - 17:00")
                              }
                            />
                          }
                          label="13:00 - 17:00"
                        />
                      </Box>
                    ))}
                  </Box>
                ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<RestartAlt />}
              onClick={handleReset}
              color="primary"
            >
              Reset
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleCreate}
              color="success"
            >
              Tạo
            </Button>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={onClose}
              color="error"
            >
              Hủy
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

export default CreateDoctor;
