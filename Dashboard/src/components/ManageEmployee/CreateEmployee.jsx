import React, { useState, useEffect } from "react";
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
  Typography,
  IconButton,
  DialogActions,
} from "@mui/material";
import {
  Add,
  RestartAlt,
  Save,
  Cancel,
  RemoveCircle,
} from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useCreateEmployee from "../../hooks/employee/useCreateEmployee";
import useUserStore from "../../hooks/auth/useUserStore";
import "../../css/loadingEffect.css";

const CreateEmployee = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("male");
  const [idCard, setIdCard] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [degree, setDegree] = useState("");
  const [degreeList, setDegreeList] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [workingSchedule, setWorkingSchedule] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const { createEmployee, loading, success } = useCreateEmployee();
  const { userLoggedIn, setUserLoggedIn, token } = useUserStore();

  const daysOfWeek = {
    Monday: "Thứ Hai",
    Tuesday: "Thứ Ba",
    Wednesday: "Thứ Tư",
    Thursday: "Thứ Năm",
    Friday: "Thứ Sáu",
    Saturday: "Thứ Bảy",
    Sunday: "Chủ Nhật",
  };

  useEffect(() => {
    if (token) {
      setUserLoggedIn(token);
    }
  }, []);

  const handleAddDegree = () => {
    if (degree.trim()) {
      setDegreeList((prevDegrees) => [...prevDegrees, degree]);
      setDegree("");
    }
  };

  const handleRemoveDegree = (index) => {
    setDegreeList((prevDegrees) => prevDegrees.filter((_, i) => i !== index));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setImageFile(file);
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
    setImageFile(null);
    setDegreeList([]);
  };

  useEffect(() => {
    handleReset();
  }, [success]);

  const handleCreate = () => {
    const filteredWorkingTime = Object.entries(workingSchedule)
      .filter(([day, slots]) => slots.length > 0)
      .map(([day, slots]) => ({
        day,
        timeSlots: slots,
      }));

    const employeeData = {
      employeeName: name,
      gender,
      birthDate: dob ? dob.format("DD/MM/YYYY") : "",
      employeePhone: phone,
      employeeEmail: email,
      citizenID: idCard,
      address,
      workingTime: filteredWorkingTime,
      employeeSpecialization: degreeList,
      createBy: userLoggedIn?.user.details.employeeName,
    };
    createEmployee(employeeData, imageFile);
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
        <DialogTitle>Thêm mới nhân viên</DialogTitle>
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
                marginTop: "1rem",
              }}
            >
              <Avatar
                alt="Avatar Preview"
                src={avatar}
                sx={{ width: 120, height: 120 }}
              />
              <Button variant="contained" component="label">
                Tải lên ảnh đại diện
                <input
                  required
                  autoFocus
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </Button>
            </Box>
            {/* Employee Details */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: "1rem",
              }}
            >
              <TextField
                label="Họ tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
              <DesktopDatePicker
                label="Ngày tháng năm sinh"
                value={dob}
                onChange={setDob}
                componentsProps={{ textField: { fullWidth: true } }}
              />
              <FormControl sx={{ height: "3.55rem", justifyContent: "center" }}>
                <FormLabel component="legend">Giới tính</FormLabel>
                <RadioGroup
                  row
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
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
                required
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: "1rem",
              }}
            >
              <TextField
                label="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Bằng cấp"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                onClick={handleAddDegree}
                startIcon={<Add />}
              >
                Thêm bằng cấp
              </Button>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {degreeList.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Typography>{item}</Typography>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveDegree(index)}
                    >
                      <RemoveCircle />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          {/* Working Schedule */}
          <Box>
            <h3>Lịch làm việc</h3>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Map days into schedule checkboxes */}
              {Object.keys(workingSchedule)
                .reduce((rows, day, index) => {
                  if (index % 3 === 0) rows.push([]);
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
                        <span>{daysOfWeek[day]}</span>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={workingSchedule[day].includes(
                                "08:00 - 12:00"
                              )}
                              onChange={() =>
                                handleCheckboxChange(day, "08:00 - 12:00")
                              }
                            />
                          }
                          label="08:00 - 12:00"
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
          {/* Actions */}
        </DialogContent>
        <DialogActions>
          {!loading && (
            <Button
              variant="outlined"
              startIcon={<RestartAlt />}
              onClick={handleReset}
              color="primary"
            >
              Reset
            </Button>
          )}
          {!loading && (
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleCreate}
              color="success"
            >
              Tạo
            </Button>
          )}
          {!loading && (
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={onClose}
              color="error"
            >
              Hủy
            </Button>
          )}
          {loading && (
            <Typography
              className="wave-effect"
              sx={{
                mr: "1px",
                width: "100%",
                textAlign: "right",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              {"Đang thêm nhân viên ...".split("").map((char, index) => (
                <span
                  key={index}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {char}{" "}
                </span>
              ))}
            </Typography>
          )}
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default CreateEmployee;
