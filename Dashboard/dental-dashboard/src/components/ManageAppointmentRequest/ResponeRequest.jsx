import {useEffect, useState} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    TextField,
    Select,
    MenuItem,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Autocomplete, Avatar,
} from "@mui/material";
import {Edit} from "@mui/icons-material";
import useUserStore from "../../hooks/auth/useUserStore";
import axios from "../../config/axiosConfig";
import {toast} from "react-toastify";
import useGetService from "../../hooks/service/useGetAllService";
import moment from "moment";
import useAppointmentRequestStore from "../../hooks/appointmentRequest/useAppointmentRequestStore";
import useDoctorAvailable from "../../hooks/appointmentRequest/useDoctorAvailable";
import useSocket from "../../hooks/useSocket"

const ResponeRequest = ({open, onClose, onSuccess, selectedRequest}) => {
    const [requestData, setRequestData] = useState(selectedRequest);
    const [isEditing, setIsEditing] = useState(false);
    const {token, userLoggedIn} = useUserStore();
    const [selectedDoctor, setSelectedDoctor] = useState(selectedRequest?.doctorId);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const {services, getAllService} = useGetService();
    const [isChange, setIsChange] = useState(false);
    const {request, getRequestById} = useAppointmentRequestStore();
    const [openReject, setOpenReject] = useState(false);
    const [reasonReject, setReasonReject] = useState("");
    const [isLoadingEdit, setIsLoadingEdit] = useState(false);
    const [isLoadingResponse, setIsLoadingResponse] = useState(false);
    const {doctorAvailable, getDoctorAvailable} = useDoctorAvailable();
    const socket = useSocket();
    const [formData, setFormData] = useState({

        time: requestData?.appointmentTime || "",
        date: requestData?.appointmentDate || "",
        doctorId: requestData?.doctorId || "",
        service: requestData?.service || "",
        notes: requestData?.note || "",

    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (selectedRequest && selectedRequest.doctorId && selectedRequest.appointmentDate && doctorAvailable.length > 0) {
            // Tìm bác sĩ tương ứng
            const matchedDoctor = doctorAvailable.find(
                (doctor) => doctor.doctorId === selectedRequest.doctorId
            );

            if (matchedDoctor) {
                // Lấy các thời gian rảnh trong ngày
                const availableTimesForDate = matchedDoctor.availableTimes[selectedRequest.appointmentDate] || [];

                // Kiểm tra thời gian được chọn có nằm trong availableTimes không
                const isTimeAvailable = availableTimesForDate.includes(selectedRequest.appointmentTime);

                // Hiển thị trạng thái
                if (isTimeAvailable) {
                    toast.success("Không trùng lịch");
                } else {
                    toast.warning("Trùng lịch");
                }
            }
        }
    }, [selectedRequest]);

    useEffect(() => {
        if (formData.time) {
            setSelectedTime(formData.time);
        }
    }, [formData.time]);


    useEffect(() => {
        if (selectedRequest) {
            setFormData({
                time: selectedRequest?.appointmentTime || "",
                date: selectedRequest?.appointmentDate || "",
                doctorId: selectedRequest?.doctorId || "",
                service: selectedRequest?.service || "",
                notes: selectedRequest?.note || "",
            });
            setSelectedDoctor(selectedRequest?.doctorId);
            setSelectedTime(selectedRequest?.appointmentTime); // Đảm bảo selectedTime được cập nhật từ request
        }
    }, [selectedRequest]);


    useEffect(() => {
        getDoctorAvailable();
        if (token) {
            getAllService();
        }
        if (selectedRequest) {
            setRequestData(selectedRequest);
        }

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
        if (selectedRequest?.doctorId && doctorAvailable.length > 0) {
            const matchedDoctor = doctorAvailable.find(
                (doctor) => doctor.doctorId === selectedRequest.doctorId
            );
            setSelectedDoctor(matchedDoctor);
            if (matchedDoctor && selectedRequest?.appointmentDate) {
                setAvailableTimes(matchedDoctor.availableTimes[selectedRequest.appointmentDate] || []);
            }
        }
    }, [selectedRequest, doctorAvailable]);


    useEffect(() => {
        if (selectedRequest && services.length > 0) {
            const matchingService = services.find(
                (service) => service.name === selectedRequest.service
            );
            setFormData((prevFormData) => ({
                ...prevFormData,
                service: matchingService || null, // Gán null nếu không tìm thấy
            }));
        }
    }, [selectedRequest, services]);


    const handleDateChange = (e) => {
        const value = e.target.value; // Giá trị dạng "YYYY-MM-DD"
        const formattedDate = moment(value, "YYYY-MM-DD").format("DD/MM/YYYY"); // Chuyển thành "DD/MM/YYYY"
        setFormData({
            ...formData,
            date: formattedDate,
            time: null,
        });
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time ? time : null);
        setFormData({
            ...formData,
            time: time ? time : null,
        });
    };

    // Định dạng ngày để sử dụng trong trường ngày
    const formattedAppointmentDate = formData.date
        ? moment(formData.date, "DD/MM/YYYY").format("YYYY-MM-DD")
        : "";

    const handleReset = () => {

        setFormData(prevFormData => {
            const matchingService = services.find(
                (service) => service.name === (selectedRequest?.service || "")
            );
            const selectedDoc = doctorAvailable.find(doctor => doctor.doctorId === selectedRequest?.doctorId);
            if (selectedDoc) {
                setSelectedDoctor(selectedDoc);
            }
            setSelectedTime(selectedRequest?.appointmentTime || null);
            return {
                time: selectedRequest?.appointmentTime || "",
                date: selectedRequest?.appointmentDate || "",
                doctorId: selectedRequest?.doctorId || "",
                service: matchingService || null,
                notes: selectedRequest?.note || "",
            };
        });

    };


    const handleClose = () => {
        // if (selectedRequest) {
        //     handleReset(); // Reset form khi đóng dialog
        // } // Reset form khi đóng dialog
        onClose(); // Đóng dialog
        setIsEditing(false); // Đặt lại trạng thái chỉnh sửa
        setSelectedDoctor(null); // Xóa bác sĩ đã chọn
        setSelectedTime(null)
        // Reset lại formData nếu cần thiết
        setFormData({
            time: "",
            date: "",
            doctorId: "",
            service: null,
            notes: "",
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


    const handleEdit = () => {
        setIsEditing(true);
    };

    const isFormValid = () => {
        return (
            formData.date && formData.time && formData.service && selectedDoctor
        );
    };

    const handleSave = async () => {
        if (!selectedRequest._id) return;
        setIsLoadingEdit(true);
        if (!isFormValid()) {
            toast.error("Vui lòng điền đầy đủ thông tin", {autoClose: 3000});
            return;
        }
        const editByObject = [
            {
                by: userLoggedIn?.user.details.employeeName,
                at: new Date().toLocaleString("en-US", {
                    timeZone: "Asia/Ho_Chi_Minh", // Đảm bảo múi giờ là Việt Nam
                }),
            },
        ];
        const requestEdit = {
            appointmentDate: formData.date,
            appointmentTime: formData.time,
            service: formData.service.name,
            doctorId: formData.doctorId,
            note: formData.note || "",
            editBy: JSON.stringify(editByObject),
        };
        try {
            // Gửi yêu cầu cập nhật thông tin yêu cầu
            const response = await axios.put(
                `/appointment-request/change/${selectedRequest._id}`,
                requestEdit,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                const updatedRequest = response.data.updatedRequest;

                setFormData(() => {
                    return {
                        time: updatedRequest.appointmentTime,
                        date:
                        updatedRequest?.appointmentDate,
                        doctorId:
                        updatedRequest.doctorId,
                        service:
                        updatedRequest.service,
                        notes:
                        updatedRequest.note,
                    }
                })
                setSelectedTime(updatedRequest.appointmentTime);
                setSelectedDoctor(updatedRequest.doctorId);
                onSuccess(response.data.updatedRequest);
                toast.success("Cập nhật yêu cầu thành công", {autoClose: 3000});
                setIsEditing(false);
                setIsChange(true);
                setIsLoadingEdit(false);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật yêu cầu:", error);
            toast.error("Cập nhật yêu cầu không thành công", {autoClose: 3000});
            setIsChange(false);
            setIsLoadingEdit(false);
        }
    };
    useEffect(() => {
        if (request) {
            // Gán dữ liệu mới cho requestData
            setRequestData(request);
        }
    }, [request]);

    const handleCancelEdit = () => {
        handleReset();
        setIsEditing(false);
    };

    const handleResponse = async (status) => {
        if (!selectedRequest._id) return;
        setIsLoadingResponse(true);
        if (status === "rejected" && !reasonReject) {
            toast.error("Vui lòng nhập lý do từ chối", {autoClose: 3000});
            setIsLoadingResponse(false);
            return;
        }
        if (status === "accepted") {
            if (!selectedDoctor) {
                toast.error("Vui lòng chọn bác sĩ", {autoClose: 3000});
                setIsLoadingResponse(false);
                return;
            }
        }

        try {
            const response = await axios.put(
                `/appointment-request/response/${selectedRequest._id}`,
                {
                    status: status,
                    reasonReject: reasonReject,
                    acceptBy: userLoggedIn?.user.details.employeeName,
                    rejectBy: userLoggedIn?.user.details.employeeName,
                    doctorID: formData.doctorId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                // console.log("Response Data:", response.data);
                onSuccess();
                setIsLoadingResponse(false);
                toast.success("Phản hồi yêu cầu thành công", {autoClose: 3000});
                if (status === "rejected") {
                    setOpenReject(false);
                    setReasonReject("");
                }
                handleClose();
            }

        } catch (error) {
            console.error("Lỗi khi phản hồi yêu cầu:", error);
            if (error.status === 409) {
                toast.warning("Trùng lịch hẹn", {autoClose: 3000});
                setIsLoadingResponse(false);
            } else
                toast.error("Phản hồi yêu cầu không thành công", {autoClose: 3000});
            setIsLoadingResponse(false);
        }
    };

    const handleCloseReject = () => {
        setOpenReject(false);
        setReasonReject("");
    };


    const handleServiceSearchChange = (event, newValue) => {
        setFormData({
            ...formData,
            service: newValue,
        });
    };
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
            <DialogTitle>Phản hồi yêu cầu đặt lịch</DialogTitle>
            <DialogContent>
                <Box sx={{display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center"}}>
                    {/* Thông tin khách hàng */}
                    <Box sx={{flex: 0.8, width: "200px", display: "flex", flexDirection: "column"}}>
                        <Typography variant="subtitle1">Thông tin khách hàng</Typography>
                        <Box sx={{border: "1px solid #ccc", p: 2}}>
                            <Typography>Tên: <strong>{selectedRequest?.customerName}</strong></Typography>
                            <Typography>Số điện thoại: <strong>{selectedRequest?.customerPhone}</strong></Typography>
                            <Typography>Email: <strong>{selectedRequest?.customerEmail || "Chưa cung cấp"}</strong></Typography>
                            <Typography>Giới
                                tính: <strong>{selectedRequest?.gender === "male" ? "Nam" : "Nữ"}</strong></Typography>
                            <TextField
                                label="Ghi chú"
                                value={formData.note}
                                onChange={(e) => setFormData({...formData, note: e.target.value})}
                                multiline
                                rows={4}
                                InputProps={{readOnly: !isEditing}}
                                fullWidth
                            />
                        </Box>
                    </Box>

                    {/* Thông tin lịch hẹn */}
                    <Box sx={{flex: 1, minWidth: "300px", display: "flex", flexDirection: "column"}}>
                        <Typography variant="subtitle1">Thông tin lịch hẹn</Typography>
                        <Box sx={{border: "1px solid #ccc", p: 2, gap: 2, display: "flex", flexDirection: "column"}}>
                            <Autocomplete
                                value={formData.service}
                                onChange={handleServiceSearchChange}
                                options={services}
                                getOptionLabel={(option) => option?.name || ""}
                                renderInput={(params) => <TextField {...params} label="Dịch vụ"/>}
                                isOptionEqualToValue={(option, value) => option?.name === value?.name}
                                disabled={!isEditing}
                            />

                            <TextField
                                type="date"
                                lable="Ngày hẹn"
                                name="date"
                                value={formattedAppointmentDate}
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
                                    readOnly: !isEditing,
                                }}
                            />
                            <Typography sx={{fontSize: '1.1rem'}}>Giờ yêu cầu: {formData.time} giờ</Typography>

                            <FormControl fullWidth sx={{mb: 2}}>
                                <InputLabel>Vui lòng chọn bác sĩ</InputLabel>
                                <Select
                                    value={formData.doctorId || ""}
                                    onChange={handleDoctorChange}
                                    label="Vui lòng chọn bác sĩ"
                                    name="doctor"
                                    error={!!errors.doctor}
                                    helperText={errors.doctor}
                                    disabled={!isEditing}
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
                                        disabled={!isEditing}
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
                </Box>
            </DialogContent>
            <DialogActions>
                <Box sx={{display: "flex", gap: 2}}>
                    {!isEditing && (
                        <Button
                            onClick={handleEdit}
                            color="primary"
                            startIcon={<Edit/>}
                            variant="contained"
                            disabled={isLoadingResponse}
                        >
                            Thay đổi yêu cầu
                        </Button>
                    )}
                    {isEditing &&
                        (!isLoadingEdit ? (
                            <>
                                <Button onClick={handleSave} color="success">
                                    Lưu thay đổi
                                </Button>

                                <Button onClick={handleCancelEdit} color="error">
                                    Hủy thay đổi
                                </Button>
                            </>
                        ) : (
                            <Typography variant="body2">
                                Đang lưu thay đổi...
                            </Typography>
                        ))}
                </Box>
                {!isLoadingResponse ? (
                    <>
                        <Button onClick={() => handleResponse("accepted")} color="success" variant="contained"
                                disabled={isEditing}
                        >
                            Chấp nhận
                        </Button>
                        <Button onClick={() => setOpenReject(true)} color="error" variant="contained"
                                disabled={isEditing}>
                            Từ chối
                        </Button>
                        <Button onClick={handleClose} color="primary" variant="outlined">
                            Đóng
                        </Button>
                    </>
                ) : (
                    <Typography>Đang xử lý...</Typography>
                )}
            </DialogActions>

            {/* Dialog từ chối yêu cầu */}
            <Dialog open={openReject} onClose={handleCloseReject} maxWidth="sm" fullWidth>
                <DialogTitle>Xác nhận từ chối</DialogTitle>
                <DialogContent>
                    <TextField
                        sx={{mt: 2}}
                        label="Lý do từ chối"
                        value={reasonReject}
                        onChange={(e) => setReasonReject(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReject} color="error">Hủy</Button>
                    <Button onClick={() => handleResponse("rejected")} color="error" variant="contained">Xác
                        nhận</Button>
                </DialogActions>
            </Dialog>
        </Dialog>

    );
};

export default ResponeRequest;
