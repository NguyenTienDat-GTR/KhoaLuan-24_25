import {useState, useEffect} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    TextField,
    Autocomplete,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button, FormControl, InputLabel, Select, MenuItem, Avatar, DialogActions
} from "@mui/material";
import useUserStore from "../../hooks/auth/useUserStore.jsx";
import axios from "../../config/axiosConfig.js";
import {toast} from "react-toastify";
import useDoctorAvailable from "../../hooks/appointmentRequest/useDoctorAvailable";
import useGetService from "../../hooks/service/useGetAllService";
import usePatientStore from "../../hooks/patient/usePatientStore.jsx";
import moment from "moment";

const CreateAppointmentTicket = ({open, onClose, onSuccess}) => {
    const {token, userLoggedIn} = useUserStore(); // Lấy token từ hook người dùng
    const isDoctor = userLoggedIn?.user.role === "doctor";
    const loggedInDoctorId = userLoggedIn?.user.details.employeeID;
    const [isNewCustomer, setIsNewCustomer] = useState(isDoctor ? false : true);
    const [formData, setFormData] = useState({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        gender: "",
        service: "",
        date: isDoctor ? moment().add(1, "days").format("DD/MM/YYYY") : moment().format("DD/MM/YYYY"),
        time: "",
        doctorId: isDoctor ? loggedInDoctorId : "",
        notes: ""
    });
    const {doctorAvailableOffline, getDoctorAvailableOffline} = useDoctorAvailable();
    const {services, getAllService} = useGetService();
    const {patients, getAllPatients} = usePatientStore();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(false)
    const [ticketId, setTicketId] = useState(null)
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        // Lấy danh sách bác sĩ
        getAllService();
        getDoctorAvailableOffline();

        if (token) {
            getAllPatients(token);
        }
    }, [token]);


    useEffect(() => {
        // Lọc danh sách bác sĩ theo vai trò
        if (isDoctor) {
            const doctor = doctorAvailableOffline.find(
                (doctor) => doctor.doctorId === loggedInDoctorId
            );
            setFilteredDoctors(doctor ? [doctor] : []);
            setSelectedDoctor(doctor)
            setFormData((prev) => ({
                ...prev,
                doctorId: loggedInDoctorId,
            }));
        } else {
            setFilteredDoctors(doctorAvailableOffline);
        }
    }, [doctorAvailableOffline, isDoctor, loggedInDoctorId]);

    const handleCustomerTypeChange = (event) => {
        if (isDoctor) return;
        setIsNewCustomer(event.target.value === "true");
        setFormData(prevState => ({
            ...prevState,
            customerName: "",
            customerPhone: "",
            customerEmail: "",
            customerGender: "",
        }));
    };

    const confirmCustomerArrived = async () => {
        try {
            const response = await axios.put(`/ticket/confirmCustomerIsArrived/${ticketId}`, {
                confirmedBy: userLoggedIn?.user.details.employeeName,

            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                toast.success(response.data.message, {
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data.message, {
                autoClose: 3000,
            })
        }
    }

    const handleClose = () => {
        setFormData(() => {
            return {
                customerName: "",
                customerPhone: "",
                customerEmail: "",
                gender: "",
                service: "",
                date: isDoctor ? moment().add(1, "days").format("DD/MM/YYYY") : moment().format("DD/MM/YYYY"),
                time: "",
                doctorId: "",
                notes: ""
            }

        })

        setSelectedService(null)
        setSelectedTime(null)
        setSelectedCustomer(null)
        setSelectedDoctor(null)
        setTicketId(null)
        setIsNewCustomer(isDoctor ? false : true)
        setAvailableTimes(null)
        onClose()

    }

    const handleFormSubmit = async () => {

        if (isNewCustomer) {
            // Xử lý tạo khách hàng mới
            const {customerName, customerPhone, customerEmail, gender} = formData;
            if (!customerName || !customerPhone || !customerEmail || !gender) {
                toast.error("Vui lòng điền đầy đủ thông tin khách hàng.");
                return;
            }
        } else {
            if (!selectedCustomer) {
                toast.error("Vui lòng chọn khách hàng cũ.");
                return;
            }
        }

        if (!selectedService) {
            toast.error("Vui lòng chọn dịch vụ.");
            return
        }

        if (!selectedDoctor) {
            toast.error("Vui lòng chọn bác sĩ.");
            return
        }

        // Xử lý tạo phiếu hẹn
        try {
            setLoading(true)
            const response = await axios.post("/ticket/create",
                {
                    customerName: !isNewCustomer ? selectedCustomer?.name : formData.customerName,
                    customerPhone: !isNewCustomer ? selectedCustomer?.phone : formData.customerPhone,
                    customerEmail: !isNewCustomer ? selectedCustomer?.email : formData.customerEmail,
                    gender: !isNewCustomer ? selectedCustomer?.gender : formData.gender,
                    requestedDate: formData.date,
                    requestedTime: formData.time,
                    service: selectedService?.name,
                    note: formData.notes,
                    doctorId: selectedDoctor.doctorId,
                    createBy: userLoggedIn?.user.details.employeeName,
                    isNewCustomer
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            if (response.status === 201) {
                toast.success("Tạo phiếu hẹn thành công.");
                onSuccess();
                setTicketId(response.data.ticket._id)
            }
        } catch (error) {
            toast.error(error.response?.data.message);
            console.log("Error when creating appointment ticket: ", error);
        } finally {
            setLoading(false)
        }
    };

    const handleServiceSearchChange = (event, newValue) => {
        setFormData({
            ...formData,
            service: newValue,
        });
        setSelectedService(newValue);
    };

    const handleCustomerSearchChange = (event, newValue) => {
        setSelectedCustomer(newValue)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleDoctorChange = (e) => {
        if (isDoctor) return
        const selectedDocId = e.target.value;
        const selectedDoc = filteredDoctors.find(doctor => doctor.doctorId === selectedDocId);

        if (selectedDoc) {
            setSelectedDoctor(selectedDoc);
            setFormData({
                ...formData,
                doctorId: selectedDocId,
            });
            if (formData.date) {
                // Cập nhật lại giờ trống khi chọn bác sĩ và có ngày hẹn
                setAvailableTimes(selectedDoc.availableTimes[formData.date] || []);
            }
        }
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time ? time : null);
        setFormData({
            ...formData,
            time: time ? time : null,
        });
    };

    const formattedAppointmentDate = formData.date
        ? moment(formData.date, "DD/MM/YYYY").format("YYYY-MM-DD")
        : "";

    const handleDateChange = (e) => {
        const value = e.target.value; // Giá trị dạng "YYYY-MM-DD"
        const formattedDate = moment(value, "YYYY-MM-DD").format("DD/MM/YYYY"); // Chuyển thành "DD/MM/YYYY"
        setFormData({
            ...formData,
            date: formattedDate,
            time: null, // Reset thời gian khi thay đổi ngày
        });
        if (selectedDoctor && formattedDate) {
            // Cập nhật lại giờ trống khi chọn ngày mới
            setAvailableTimes(selectedDoctor.availableTimes[formattedDate] || []);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="80vw">
            <DialogTitle>Tạo Phiếu Hẹn</DialogTitle>
            <DialogContent>
                <Box sx={{display: "flex", flexDirection: "row", gap: 2}}>
                    {/* Cột 1: Thông tin khách hàng */}
                    <Box sx={{flex: 1, mt: 1}}>
                        {/* Chọn khách hàng mới hoặc cũ */}
                        <RadioGroup row value={isNewCustomer} onChange={handleCustomerTypeChange}>
                            <FormControlLabel value={true} disabled={ticketId} control={<Radio/>}
                                              label="Khách hàng mới"/>
                            <FormControlLabel value={false} disabled={ticketId} control={<Radio/>}
                                              label="Khách hàng cũ"/>
                        </RadioGroup>

                        {/* Thông tin khách hàng */}
                        {isNewCustomer ? (
                            <Box sx={{display: "flex", flexDirection: "column", gap: 2, mt: 1}}>
                                <TextField label="Họ Tên" value={formData.customerName}
                                           onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                                           fullWidth sx={{mt: 1}} disabled={ticketId}/>
                                <TextField label="Số Điện Thoại" value={formData.customerPhone}
                                           onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                                           fullWidth sx={{mt: 1}} disabled={ticketId}/>
                                <TextField label="Email" value={formData.customerEmail}
                                           onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                                           fullWidth sx={{mt: 1}} disabled={ticketId}/>
                                <FormControl fullWidth sx={{
                                    mt: 1,
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
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: 'center'
                                        }}

                                    >
                                        <FormControlLabel value="male" disabled={ticketId} control={<Radio/>}
                                                          label="Nam"/>
                                        <FormControlLabel value="female" disabled={ticketId} control={<Radio/>}
                                                          label="Nữ"/>
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        ) : (
                            <Autocomplete
                                value={selectedCustomer}
                                onChange={handleCustomerSearchChange}
                                options={patients} // Dữ liệu khách hàng từ API
                                getOptionLabel={(option) => `${option.name} - ${option.phone || ''} - ${option.email || ''}`}
                                renderInput={(params) => <TextField {...params} label="Tìm khách hàng "/>}
                                fullWidth
                                sx={{mt: 2}}
                                disabled={ticketId}
                            />
                        )}
                        <TextField
                            label="Ghi Chú"
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            multiline
                            rows={4}
                            fullWidth
                            sx={{mt: 3}}
                            disabled={ticketId}
                        />
                    </Box>

                    {/* Cột 2: Thông tin lịch hẹn */}
                    <Box sx={{flex: 1, mt: 1}}>
                        <Autocomplete
                            value={formData.service}
                            onChange={handleServiceSearchChange}
                            options={services}
                            getOptionLabel={(option) => option?.name || ""}
                            renderInput={(params) => <TextField {...params} label="Dịch vụ"/>}
                            isOptionEqualToValue={(option, value) => option?.name === value?.name}
                            disabled={ticketId}
                        />
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: {sm: '0.8rem', md: '1rem'},
                                mt: 2
                            }}
                        >
                            Khoảng giá: {selectedService?.priceRange} VND
                        </Typography>
                        <TextField
                            type="date"
                            label="Ngày hẹn"
                            name="date"
                            value={formattedAppointmentDate}
                            onChange={handleDateChange}
                            fullWidth
                            sx={{mt: 2}}
                            inputProps={{
                                min: isDoctor
                                    ? new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]
                                    : new Date().toISOString().split("T")[0],
                                max: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0],
                            }}
                            disabled={ticketId}
                        />
                        <FormControl fullWidth sx={{mt: 2}}>
                            <InputLabel>Vui lòng chọn bác sĩ</InputLabel>
                            <Select value={formData.doctorId || ""} onChange={handleDoctorChange}
                                    label="Vui lòng chọn bác sĩ" disabled={ticketId || isDoctor}>
                                {filteredDoctors.map((doctor) => (
                                    <MenuItem key={doctor.doctorId} value={doctor.doctorId}>
                                        {doctor.doctorName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Cột 3: Thông tin bác sĩ và giờ */}
                    <Box sx={{flex: 1, mt: 1}}>
                        {selectedDoctor && (
                            <Box sx={{display: "flex", alignItems: "center", mb: 2}}>
                                <Avatar src={selectedDoctor.doctorAvatar}
                                        sx={{mr: 2, width: "10rem", height: '10rem', border: '1px solid grey'}}/>
                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <Typography variant="body1" sx={{fontWeight: 'bold', fontSize: {sm: '0.8rem'}}}> Bác
                                        sĩ: {selectedDoctor.doctorName}</Typography>
                                    <Typography variant="body1" sx={{fontWeight: 'bold', fontSize: {sm: '0.8rem'}}}>Giới
                                        tính: {selectedDoctor.doctorGender === "male" ? "Nam" : "Nữ"}</Typography>
                                </Box>
                            </Box>
                        )}

                        {availableTimes?.length > 0 ? (
                            <Box sx={{display: "flex", flexWrap: "wrap", gap: 1, mt: 2}}>
                                {availableTimes?.map((time) => (
                                    <Button key={time} onClick={() => handleTimeSelect(time)}
                                            variant={formData.time === time ? "contained" : "outlined"}
                                            sx={{flex: "0 1 48%"}}
                                            disabled={ticketId}
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

                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                {!loading ?
                    <>
                        <Button onClick={handleClose} color="error">Đóng</Button>
                        {!ticketId ?
                            <Button onClick={handleFormSubmit} variant="contained" color="success">Tạo mới</Button>
                            : !isDoctor &&
                            <Button onClick={confirmCustomerArrived} variant="contained" color="success">Xác nhận KH đã
                                đến</Button>
                        }
                    </> :
                    <Typography>Đang tạo mới...</Typography>}
            </DialogActions>
        </Dialog>

    );
};

export default CreateAppointmentTicket;
