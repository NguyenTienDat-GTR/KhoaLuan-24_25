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
  Avatar,
  Input,
  IconButton,
  Chip,
  DialogActions,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "../../config/axiosConfig";
import { toast } from "react-toastify";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import useUserStore from "../../hooks/auth/useUserStore";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import "../../css/loadingEffect.css";

const EmployeeDetail = ({ open, onClose, employee }) => {
  const [formData, setFormData] = useState({
    employeeID: "",
    employeeName: "",
    birthDate: null,
    gender: "male",
    citizenID: "",
    employeePhone: "",
    employeeEmail: "",
    address: "",
    employeeSpecialization: [],
    workingTime: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    },
    urlAvatar: "",
    isWorking: true,
    editBy: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  // const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const { userLoggedIn, setUserLoggedIn, token } = useUserStore();
  const [newSpecialization, setNewSpecialization] = useState("");

  useEffect(() => {
    // setToken(Cookies.get("token"));
    if (token) {
      const decodedUser = jwtDecode(token);
      setUserLoggedIn(token);
    }
  }, [token]);

  // Chuyển đổi workingTime từ mảng sang đối tượng
  const workingTimeObject = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  useEffect(() => {
    if (employee) {
      employee.workingTime.forEach((time) => {
        workingTimeObject[time.day] = time.timeSlots;
      });

      const parsedBirthDate = employee.birthDate
        ? dayjs(employee.birthDate, "DD/MM/YYYY")
        : null;

      setFormData({
        employeeID: employee.employeeID,
        employeeName: employee.employeeName,
        birthDate: parsedBirthDate,
        gender: employee.gender,
        citizenID: employee.citizenID,
        employeePhone: employee.employeePhone,
        employeeEmail: employee.employeeEmail,
        address: employee.address,
        employeeSpecialization: employee.employeeSpecialization || [],
        workingTime: workingTimeObject,
        urlAvatar: employee.urlAvatar,
        isWorking: employee.isWorking,
      });
    }
  }, [employee]);

  // Xử lý thay đổi input cho bằng cấp mới
  const handleSpecializationChange = (e) => {
    setNewSpecialization(e.target.value);
  };

  // Thêm bằng cấp mới vào danh sách
  const handleAddSpecialization = () => {
    if (newSpecialization.trim()) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        employeeSpecialization: [
          ...prevFormData.employeeSpecialization,
          newSpecialization,
        ],
      }));
      setNewSpecialization(""); // Reset input
    }
  };

  // Xóa bằng cấp khỏi danh sách
  const handleDeleteSpecialization = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      employeeSpecialization: prevFormData.employeeSpecialization.filter(
        (item, i) => i !== index
      ),
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // Create a local URL for the selected file
      setImageFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleScheduleChange = (day, time) => {
    setFormData((prevData) => {
      const updatedSchedule = { ...prevData.workingTime };
      const timeIndex = updatedSchedule[day]?.indexOf(time);
      if (timeIndex > -1) {
        updatedSchedule[day]?.splice(timeIndex, 1);
      } else {
        updatedSchedule[day]?.push(time);
      }
      return { ...prevData, workingTime: updatedSchedule };
    });
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleCancelEdit = () => {
    setFormData({
      employeeID: employee.employeeID,
      employeeName: employee.employeeName,
      birthDate: employee.birthDate ? dayjs(employee.birthDate) : null,
      gender: employee.gender,
      citizenID: employee.citizenID,
      employeePhone: employee.employeePhone,
      employeeEmail: employee.employeeEmail,
      address: employee.address,
      employeeSpecialization: employee.employeeSpecialization || [], // Chuyển đổi thành chuỗi nếu là mảng
      workingTime: workingTimeObject,
      urlAvatar: employee.urlAvatar,
      isWorking: employee.isWorking,
    });
    setIsEditing(false);
    setNewSpecialization(""); // Reset input
  };
  // Hàm xử lý khi dialog đóng
  const handleClose = () => {
    if (isEditing) {
      setIsEditing(false); // Nếu đang chỉnh sửa, đặt lại isEditing thành false
      setFormData({
        employeeID: employee.employeeID,
        employeeName: employee.employeeName,
        birthDate: employee.birthDate ? dayjs(employee.birthDate) : null,
        gender: employee.gender,
        citizenID: employee.citizenID,
        employeePhone: employee.employeePhone,
        employeeEmail: employee.employeeEmail,
        address: employee.address,
        employeeSpecialization: employee.employeeSpecialization || [], // Chuyển đổi thành chuỗi nếu là mảng
        workingTime: workingTimeObject,
        urlAvatar: employee.urlAvatar,
        isWorking: employee.isWorking,
      });
      setNewSpecialization(""); // Reset input
    }
    onClose(); // Gọi hàm onClose từ component cha để đóng Dialog
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

  const updateEmployee = async () => {
    console.log("file trước", imageFile);
    console.log("token trước", token);
    // Tạo FormData từ formData state
    const formDataToSend = new FormData();

    // Chuyển đổi `workingTime` thành định dạng mà backend mong đợi
    const workingTimeArray = Object.keys(formData.workingTime)
      .filter((day) => formData.workingTime[day].length > 0)
      .map((day) => ({
        day: day,
        timeSlots: formData.workingTime[day],
      }));

    const specializationArray = formData.employeeSpecialization;
    // Thêm các trường vào FormData
    for (const key in formData) {
      if (key === "workingTime") {
        formDataToSend.append(key, JSON.stringify(workingTimeArray)); // Chuyển đổi thành JSON
      } else if (key === "birthDate") {
        formDataToSend.append(
          key,
          formData.birthDate ? formData.birthDate.format("DD/MM/YYYY") : ""
        ); // Đảm bảo định dạng là DD/MM/YYYY
      } else if (key === "employeeSpecialization") {
        formDataToSend.append(key, JSON.stringify(specializationArray)); // Chuyển đổi thành JSON
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Cập nhật editBy thành một mảng đối tượng
    const editByObject = [
      {
        by: userLoggedIn?.user.details.employeeName,
        at: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Ho_Chi_Minh", // Thay đổi múi giờ sang giờ Việt Nam
        }),
      },
    ];
    formDataToSend.append("editBy", JSON.stringify(editByObject));
    // Nếu có hình đại diện, thêm nó vào FormData
    if (imageFile) {
      formDataToSend.append("employeeAvatar", imageFile);
    }
    setLoading(true);
    try {
      const response = await axios.put(
        `/employee/update/${formDataToSend.get("employeeID")}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setLoading(false);
        setImageFile(null);
        console.log("file sau", imageFile);
        setIsEditing(false);
      }

      if (response.data.token) {
        // setToken(response.data.token); // Cập nhật token
        Cookies.set("token", response.data.token, { expires: 1 }); // Lưu token vào cookie
        // Cập nhật thông tin người dùng và avatar
        const decodedUser = jwtDecode(response.data.token);
        setUserLoggedIn(response.data.token);
        setFormData((prev) => ({
          ...prev,
          urlAvatar: decodedUser.user.details.urlAvatar, // Cập nhật avatar
        }));
      }
      toast.success(response.data.message, {
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (error) {
      toast.error(error.response?.data.message, {
        autoClose: 3000,
        hideProgressBar: false,
      });
      console.error("Cập nhật thất bại:", error);
    }
  };

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    updateEmployee();
  };

  const timeSlots = ["08:00 - 12:00", "13:00 - 17:00"];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Thông tin nhân viên</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 4, mt: 2 }}>
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
                src={!imageFile ? formData?.urlAvatar : avatar} // Display selected avatar
                sx={{ width: 120, height: 120 }}
              />
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: !isEditing ? "#C5C5C5" : "primary",
                  cursor: !isEditing ? "not-allowed" : "pointer",
                }}
              >
                Tải lên ảnh đại diện
                <input
                  required
                  autoFocus
                  disabled={!isEditing}
                  type="file"
                  name="employeeAvatar"
                  hidden
                  accept="image/*"
                  onChange={handleAvatarChange} // Handle file selection
                  style={{
                    backgroundColor: !isEditing ? "#5C5C5C" : "transparent", // Change background color based on isEditing
                    cursor: !isEditing ? "not-allowed" : "pointer", // Change cursor style when not editing
                  }}
                />
              </Button>
            </Box>
            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Mã nhân viên"
                variant="outlined"
                name="employeeID"
                value={formData?.employeeID || ""}
                InputProps={{
                  readOnly: true,
                  style: {
                    cursor: "not-allowed", // Always set to not-allowed
                  },
                }}
                InputLabelProps={{
                  shrink: !!formData?.employeeID,
                }}
              />
              <TextField
                label="Họ tên"
                variant="outlined"
                name="employeeName"
                value={formData?.employeeName || ""}
                onChange={handleInputChange}
                InputProps={{
                  readOnly: !isEditing,
                  style: {
                    cursor: isEditing ? "text" : "not-allowed", // Only show text cursor when editing
                  },
                }}
                InputLabelProps={{
                  shrink: !!formData?.employeeName,
                }}
              />
              <DesktopDatePicker
                label="Ngày tháng năm sinh"
                value={formData?.birthDate}
                onChange={(newValue) =>
                  setFormData({ ...formData, birthDate: newValue })
                }
                format="DD/MM/YYYY"
                componentsProps={{
                  textField: {
                    fullWidth: true,
                    InputProps: {
                      readOnly: !isEditing,
                    },
                  },
                }}
              />
              <TextField
                label="Căn cước công dân"
                variant="outlined"
                name="citizenID"
                value={formData?.citizenID || ""}
                onChange={handleInputChange}
                InputProps={{
                  readOnly: !isEditing,
                }}
                InputLabelProps={{
                  shrink: !!formData?.citizenID,
                }}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Giới tính</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={formData?.gender || ""}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Nam"
                    disabled={!isEditing}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Nữ"
                    disabled={!isEditing}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Số điện thoại"
                variant="outlined"
                name="employeePhone"
                value={formData?.employeePhone || ""}
                onChange={handleInputChange}
                InputProps={{
                  readOnly: !isEditing,
                }}
                InputLabelProps={{
                  shrink: !!formData?.employeePhone,
                }}
              />
              <TextField
                label="Email"
                variant="outlined"
                name="employeeEmail"
                value={formData?.employeeEmail || ""}
                onChange={handleInputChange}
                InputProps={{
                  readOnly: !isEditing,
                }}
                InputLabelProps={{
                  shrink: !!formData?.employeeEmail,
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
                  shrink: !!formData?.address,
                }}
              />
              <Box sx={{ flex: 1 }}>
                {/* Bằng cấp */}
                <TextField
                  label="Thêm bằng cấp"
                  value={newSpecialization}
                  onChange={handleSpecializationChange}
                  disabled={!isEditing}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleAddSpecialization}
                        disabled={!newSpecialization.trim()}
                      >
                        <AddCircleOutline color="success" />
                      </IconButton>
                    ),
                  }}
                  fullWidth
                />

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">
                    Danh sách bằng cấp:
                  </Typography>
                  <Box
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}
                  >
                    {formData.employeeSpecialization.map((spec, index) => (
                      <Chip
                        key={index}
                        label={spec}
                        onDelete={() => handleDeleteSpecialization(index)}
                        deleteIcon={<Delete />}
                        color="primary"
                        disabled={!isEditing} // Chỉ xóa được khi đang chỉnh sửa
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 2,
              gap: "0.5rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Trạng thái làm việc:</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData?.isWorking || false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isWorking: e.target.checked,
                    })
                  }
                  disabled={!isEditing}
                />
              }
              label="Đang hoạt động"
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Giờ làm việc</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {Object.keys(daysOfWeek)
                .reduce((acc, day, index) => {
                  if (index % 3 === 0) {
                    acc.push([]); // Tạo một mảng mới mỗi 3 ngày
                  }
                  acc[acc.length - 1].push(day); // Thêm ngày vào hàng hiện tại
                  return acc;
                }, [])
                .map((dayGroup, groupIndex) => (
                  <Box
                    key={groupIndex}
                    sx={{ display: "flex", flexDirection: "column", flex: 1 }}
                  >
                    {dayGroup.map((day) => (
                      <Box key={day} sx={{ marginTop: 1 }}>
                        <Typography variant="body1">
                          {daysOfWeek[day]}
                        </Typography>
                        {timeSlots.map((time) => (
                          <FormControlLabel
                            key={time}
                            control={
                              <Checkbox
                                checked={
                                  formData?.workingTime[day]?.includes(time) ||
                                  false
                                }
                                onChange={() => handleScheduleChange(day, time)}
                                disabled={!isEditing}
                              />
                            }
                            label={time}
                          />
                        ))}
                      </Box>
                    ))}
                  </Box>
                ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          {!loading ? (
            isEditing ? (
              <>
                <Button
                  onClick={handleCancelEdit}
                  color="error"
                  sx={{ marginRight: 2 }}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleUpdateEmployee}
                  variant="contained"
                  color="primary"
                >
                  Lưu
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  color="error"
                  sx={{ marginRight: 2 }}
                >
                  Đóng
                </Button>
                <Button
                  onClick={handleEditToggle}
                  variant="contained"
                  color="primary"
                >
                  Chỉnh sửa
                </Button>
              </>
            )
          ) : (
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
              {"Đang cập nhật ...".split("").map((char, index) => (
                <span
                  key={index}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {char}
                </span>
              ))}
            </Typography>
          )}
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default EmployeeDetail;
