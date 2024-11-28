import React, {useEffect, useState} from "react";
import {
    Box,
    Typography,
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Button,
    Avatar,
    FormControl,
    InputLabel,
    Select, RadioGroup, Radio, FormControlLabel,
} from "@mui/material";
import axios from "../../config/axiosConfig";
import useSocket from "../../hooks/useSocket";
import toast from "react-hot-toast";
import useDoctorAvailable from "../../hooks/useDoctorAvailable";
import moment from "moment";

const CreateAppointmentRequest = ({open, onClose, selectedService}) => {
    const socket = useSocket();
    const now = new Date();
    const currentHour = now.getHours();

    // Kiểm tra giờ hiện tại
    const defaultDate = currentHour >= 15
        ? moment(now).add(1, "day").format("DD/MM/YYYY") // Ngày hôm sau
        : moment(now).format("DD/MM/YYYY"); // Ngày hiện tại

    const [formData, setFormData] = useState(() => {
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
            notes: "",
        };
    });


    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const {doctorAvailable, getDoctorAvailable} = useDoctorAvailable();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        getDoctorAvailable();
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on("newAppointment", () => {
            getDoctorAvailable();
        });

        // Cleanup socket event listener when component unmounts
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
        const {name, value} = e.target;
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
        if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (!validateDateTime()) return;

        // Kiểm tra ngày hợp lệ
        const formattedDate = moment(formData.date, "DD/MM/YYYY");
        if (!formattedDate.isValid()) {
            toast.error("Ngày không hợp lệ.");
            return;
        }

        const day = String(formattedDate.date()).padStart(2, "0");
        const month = String(formattedDate.month() + 1).padStart(2, "0"); // month() trả về tháng từ 0-11
        const year = formattedDate.year();

        const appointmentData = {
            customerName: formData.name,
            customerPhone: formData.phone,
            customerEmail: formData.email,
            gender: formData.gender,
            appointmentDate: `${day}/${month}/${year}`,
            appointmentTime: selectedTime,
            service: selectedService?.name,
            doctorId: formData.doctorId,
            note: formData.notes,
        };

        setLoading(true);
        try {
            const response = await axios.post("/appointment-request/create", appointmentData);
            if (response.status === 201) {
                setLoading(false);
                handleClose();
                handleReset();
                toast.success(response.data.message);
            }
            if (response.status === 409) {
                setLoading(false);
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data.message);
            setLoading(false);
        }
    };


    const handleDateChange = (e) => {
        const value = e.target.value; // Giá trị dạng "YYYY-MM-DD"
        const formattedDate = moment(value, "YYYY-MM-DD").format("DD/MM/YYYY"); // Chuyển thành "DD/MM/YYYY"
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
                notes: "",
            };
        });
        setErrors({});
        setSelectedDoctor(null);
        setAvailableTimes([]);
        setSelectedTime(null);
    }

    const handleClose = () => {
        onClose();
        handleReset();
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
            <Box sx={{position: "relative", padding: "1rem"}}>
                <Typography variant="h6" component="h2">
                    Đặt lịch cho dịch vụ: {selectedService?.name}
                </Typography>
            </Box>

            <DialogContent sx={{display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center"}}>
                {/* Cột bên trái */}
                <Box sx={{flex: 0.8, width: "200px", display: "flex", flexDirection: "column"}}>
                    <TextField
                        label="Họ tên"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                        sx={{mb: 2}}
                    />
                    <TextField
                        label="Số điện thoại"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        fullWidth
                        sx={{mb: 2}}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        sx={{mb: 2}}
                    />
                    <FormControl fullWidth sx={{
                        mb: 2,
                        justifyContent: "flex-start",
                        flexDirection: 'row',
                        gap: 2,
                        alignItems: 'center'
                    }}>
                        <Typography>Giới tính</Typography>
                        <RadioGroup
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            error={!!errors.gender}
                            helperText={errors.gender}
                            sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: 'center'}}
                        >
                            <FormControlLabel value="male" control={<Radio/>} label="Nam"/>
                            <FormControlLabel value="female" control={<Radio/>} label="Nữ"/>
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        label="Ghi chú"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                        sx={{mb: 2}}
                    />
                </Box>

                {/* Cột giữa */}
                <Box sx={{flex: 1, minWidth: "300px", display: "flex", flexDirection: "column"}}>
                    <TextField
                        label="Dịch vụ"
                        value={selectedService?.name || ""}
                        fullWidth
                        disabled
                        sx={{mb: 2}}
                    />
                    <Typography

                        sx={{
                            fontWeight: 'bold',
                            fontSize: {sm: '0.8rem', md: '1rem'},
                            mb: 2
                        }}
                    >
                        Khoảng giá: {selectedService?.priceRange} VND
                    </Typography>

                    <TextField
                        type="date"
                        lable="Chọn ngày hẹn"
                        name="date"
                        value={moment(formData.date, "DD/MM/YYYY").format("YYYY-MM-DD")}
                        onChange={handleDateChange}
                        error={!!errors.date}
                        helperText={errors.date}
                        fullWidth
                        sx={{mb: 2}}
                        inputProps={{
                            min: new Date().toISOString().split("T")[0],
                            max: new Date(new Date().setDate(new Date().getDate() + 7))
                                .toISOString()
                                .split("T")[0],
                        }}
                    />


                    <FormControl fullWidth sx={{mb: 2}}>
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
                {/*Cột bên phải*/}
                <Box sx={{flex: 1, minWidth: "300px", display: "flex", flexDirection: "column"}}>
                    {selectedDoctor && (
                        <Box sx={{display: "flex", alignItems: "center", mb: 2}}>
                            <Avatar src={selectedDoctor.doctorAvatar}
                                    sx={{mr: 2, width: "10rem", height: '10rem', border: '1px solid grey'}}/>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Typography variant="body1" sx={{
                                    fontWeight: 'bold',
                                    fontSize: {sm: '0.8rem'}
                                }}> Bác sĩ: {selectedDoctor.doctorName}</Typography>
                                <Typography variant="body1" sx={{fontWeight: 'bold', fontSize: {sm: '0.8rem'}}}>Giới
                                    tính: {selectedDoctor.doctorGender === "male" ? "Nam" : "Nữ"}</Typography>
                            </Box>
                        </Box>
                    )}

                    {availableTimes.length > 0 ? (
                        <Box sx={{display: "flex", flexWrap: "wrap", gap: 1, mt: 2}}>
                            {availableTimes.map((time) => (
                                <Button
                                    key={time}
                                    onClick={() => handleTimeSelect(time)}
                                    variant={selectedTime === time ? "contained" : "outlined"}
                                    sx={{flex: "0 1 48%"}}
                                >
                                    {time}
                                </Button>
                            ))}
                        </Box>
                    ) : (
                        <Typography variant="body2" color="textSecondary" sx={{mt: 2}}>
                            Không có giờ trống cho ngày đã chọn.
                        </Typography>
                    )}

                    {/* Thêm helperText cho trường thời gian */}
                    {errors.time && (
                        <Typography variant="body2" color="error" sx={{mt: 1}}>
                            {errors.time}
                        </Typography>
                    )}

                </Box>
            </DialogContent>

            <DialogActions>
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
            </DialogActions>
        </Dialog>
    );
};

export default CreateAppointmentRequest;
