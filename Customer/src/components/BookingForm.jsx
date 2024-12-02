import React, { useEffect, useState } from "react";
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
  Avatar,
  InputLabel,
  Select,Grid
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import axios from "../config/axiosConfig";
import useSocket from "../hooks/useSocket";
import useDoctorAvailable from "../hooks/useDoctorAvailable";

const BookingForm = () => {
  const socket = useSocket();
  const now = new Date();
  const currentHour = now.getHours();

  const defaultDate =
    currentHour >= 15
      ? moment(now).add(1, "day").format("DD/MM/YYYY")
      : moment(now).format("DD/MM/YYYY");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "male",
    time: "",
    date: defaultDate,
    doctorId: "",
    serviceId:"",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { doctorAvailable, getDoctorAvailable } = useDoctorAvailable();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [services, setServices] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  useEffect(() => {
    getDoctorAvailable();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/service/getAll'); // Thay đổi đường dẫn API theo nhu cầu của bạn
        console.log(response.data);

        setServices(response.data); // Giả sử API trả về danh sách dịch vụ
        console.log(setServices)
      } catch (error) {
        console.error("Lỗi khi lấy thông tin dịch vụ:", error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("newAppointment", () => {
      getDoctorAvailable();
    });
    return () => {
      if (socket) {
        socket.off("newAppointment");
      }
    };
  }, [socket]);

  useEffect(() => {
    if (selectedDoctor && formData.date) {
      const times = selectedDoctor.availableTimes?.[formData.date] || [];
      setAvailableTimes(times);
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDoctor, formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDoctorChange = (e) => {
    const selectedDocId = e.target.value;
    const selectedDoc = doctorAvailable.find(doctor => doctor.doctorId === selectedDocId);

    if (selectedDoc) {
      setSelectedDoctor(selectedDoc);
      setFormData({
        ...formData,
        doctorId: selectedDocId,
      });
      if (formData.date) {
        setAvailableTimes(selectedDoc.availableTimes[formData.date] || []);
      }

    }
  };


  const handleTimeSelect = (time) => {
    console.log(typeof time)
    setSelectedTime(time ? time : null);
    setFormData({
      ...formData,
      time: time ? time : null,
    });
  };


  const validateDateTime = () => {
    if (!formData.date || !formData.time) {
      toast.error("Vui lòng chọn cả ngày và giờ.");
      return false;
    }

    // Chuyển đổi ngày từ định dạng DD/MM/YYYY sang YYYY-MM-DD
    const formattedDate = moment(formData.date, "DD/MM/YYYY").format("YYYY-MM-DD");
    const dateString = `${formattedDate} ${formData.time}`;

    const appointmentTimestamp = Date.parse(dateString);

    if (isNaN(appointmentTimestamp)) {
      toast.error("Ngày hoặc giờ không hợp lệ.");
      return false;
    }

    const currentDateTime = new Date();
    const appointmentDateTime = new Date(appointmentTimestamp);

    if (appointmentDateTime <= currentDateTime) {
      toast.error("Thời gian đặt lịch phải lớn hơn thời gian hiện tại.");
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
    if (!formData.doctorId) newErrors.doctor = "Vui lòng chọn bác sĩ";
    if (!formData.serviceId) newErrors.services = "Vui lòng chọn dịch vụ";
    if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!validateDateTime()) {
      return;
    }

    const formattedDate = moment(formData.date, "DD/MM/YYYY");
    if (!formattedDate.isValid()) {
      toast.error("Ngày không hợp lệ.");

      return;
    }

    const day = String(formattedDate.date()).padStart(2, "0");
    const month = String(formattedDate.month() + 1).padStart(2, "0");
    const year = formattedDate.year();

    const appointmentData = {
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      gender: formData.gender,
      appointmentDate: `${day}/${month}/${year}`,
      appointmentTime: selectedTime,
      doctorId: formData.doctorId,
      serviceId:formData.serviceId,
      note: formData.notes,
    };

    setLoading(true);
    try {
      const response = await axios.post(
        "/appointment-request/create",
        appointmentData
      );
      if (response.status === 201) {
        setSnackbarMessage(
          "Yêu cầu đặt lịch thành công. Hãy kiểm tra tin nhắn hoặc email của bạn!"
        );
        setSnackbarOpen(true);
        setLoading(false);
      }
      if (response.status === 409) {
        setLoading(false);
        // Toast message for conflict can be added here
      }
    } catch (error) {
      console.error("Lỗi đặt lịch:", error);
      setSnackbarMessage(error?.response?.data.message);
      setSnackbarOpen(true);
      setLoading(false);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    const formattedDate = moment(value, "YYYY-MM-DD").format("DD/MM/YYYY");
    setFormData({
      ...formData,
      date: formattedDate,
    });
  };

  const handleReset = () => {
    setFormData(() => {
      const now = new Date();
      const currentHour = now.getHours();

      // Kiểm tra giờ hiện tại
      const defaultDate = currentHour >= 15
        ? moment(now).add(1, "day").format("DD/MM/YYYY") // Ngày hôm sau
        : moment(now).format("DD/MM/YYYY"); // Ngày hiện tại

      return {
        name: "",
        phone: "",
        email: "",
        gender: "male",
        time: "",
        date: defaultDate, // Gán ngày mặc định
        doctorId: "",
        serviceId: "",
        notes: "",
      };
    });
    setErrors({});
    setSelectedDoctor(null);
    setAvailableTimes([]);
    setSelectedTime(null);
  }
  const handleServiceChange = (event) => {
    const selectedServiceId = event.target.value;
    const selectedService = services.find(
      (service) => service._id === selectedServiceId
    ); // Tìm dịch vụ tương ứng theo ID
  
    setSelectedService(selectedService); // Lưu dịch vụ đã chọn
    setFormData((prevData) => ({ ...prevData, serviceId: selectedServiceId }));
  
    console.log("Dịch vụ được chọn:", selectedService); // Debug

  }
  const handleClose = () => {
    onClose();
    handleReset();
  }


  return (
    <Box sx={{ padding: "2rem", width: "75%", backgroundColor: "#e3f2fd", margin: "0 auto" }}>
      <Typography variant="h6" component="h2" padding={2}>
        Đặt lịch hẹn với chúng tôi ngay
      </Typography>

      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {/* Cột 1 */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2, flexDirection: 'row', gap: 2, alignItems: 'center' }}>
            <Typography>Giới tính</Typography>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              error={!!errors.gender}
              helperText={errors.gender}
              sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: 'center' }}
            >
              <FormControlLabel value="male" control={<Radio />} label="Nam" />
              <FormControlLabel value="female" control={<Radio />} label="Nữ" />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Cột 2 */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Chọn dịch vụ</InputLabel>
            <Select
              value={formData.serviceId || ""}
              onChange={handleServiceChange}
              label="Chọn dịch vụ"
              name="services"
              error={!!errors.services}
              helperText={errors.services}
            >
              {Array.isArray(services) && services.length > 0 ? (
                services.map((service) => (
                  <MenuItem key={service._id} value={service._id}>
                    {service.name} {/* Hiển thị tên dịch vụ */}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Không có dịch vụ nào</MenuItem>
              )}
            </Select>
          </FormControl>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: { sm: '0.8rem', md: '1rem' },
              mb: 2
            }}
          >

            Khoảng giá: {selectedService?.priceRange} VND
          </Typography>

          <TextField
            type="date"
            label="Chọn ngày hẹn"
            name="date"
            value={moment(formData.date, "DD/MM/YYYY").format("YYYY-MM-DD")}
            onChange={handleDateChange}
            error={!!errors.date}
            helperText={errors.date}
            fullWidth
            sx={{ mb: 2 }}
            inputProps={{
              min: new Date().toISOString().split("T")[0],
              max: new Date(new Date().setDate(new Date().getDate() + 7))
                .toISOString()
                .split("T")[0],
            }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Vui lòng chọn bác sĩ</InputLabel>
            <Select
              value={formData.doctorId || ""}
              onChange={handleDoctorChange}
              label="Vui lòng chọn bác sĩ"
              name="doctor"
              error={!!errors.doctor}
              helperText={errors.doctor}
            >
              {Array.isArray(doctorAvailable) && doctorAvailable.length > 0 ? (
                doctorAvailable.map((doctor) => (
                  <MenuItem key={doctor.doctorId} value={doctor.doctorId}>
                    {doctor.doctorName}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Không có bác sĩ nào</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>

        {/* Cột 3: Thông tin bác sĩ */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {selectedDoctor && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar src={selectedDoctor.doctorAvatar}
                sx={{ mr: 2, width: "10rem", height: '10rem', border: '1px solid grey' }} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body1" sx={{
                  fontWeight: 'bold',
                  fontSize: { sm: '0.8rem' }
                }}> Bác sĩ: {selectedDoctor.doctorName}</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: { sm: '0.8rem' } }}>
                  Giới tính: {selectedDoctor.doctorGender === "male" ? "Nam" : "Nữ"}
                </Typography>
              </Box>
            </Box>
          )}

          {availableTimes.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  variant={selectedTime === time ? "contained" : "outlined"}
                  sx={{ flex: "0 1 48%" }}
                >
                  {time}
                </Button>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Không có giờ trống cho ngày đã chọn.
            </Typography>
          )}

          {/* Thêm helperText cho trường thời gian */}
          {errors.time && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors.time}
            </Typography>
          )}

          {!loading ? (
            <>
              <Button onClick={handleClose} color="error">
                Hủy
              </Button>
              <Button
                onClick={handleBookingSubmit}
                color="success"
                variant="contained"
              >
                Đặt lịch
              </Button>
            </>
          ) : (
            <Typography variant="subtitle1">Đang xử lí yêu cầu...</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BookingForm;