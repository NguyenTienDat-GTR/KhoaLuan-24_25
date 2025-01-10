import React, {useState, useEffect} from "react";
import {
    Box,
    Typography,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    Pagination,
} from "@mui/material";
import {Info, Visibility} from "@mui/icons-material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import useSocket from "../../hooks/useSocket";
import useAppointmentRequestStore from "../../hooks/appointmentRequest/useAppointmentRequestStore";
import useUserStore from "../../hooks/auth/useUserStore";
import ResponeRequest from "../../components/ManageAppointmentRequest/ResponeRequest";
import Page403 from "../page403.jsx";
import RequestDetailDialog from "../../components/ManageAppointmentRequest/RequestDetailDialog.jsx";

const statuses = ["Tất cả", "Chờ phản hồi", "Chấp nhận", "Đã hủy"];
const filterOptions = ["Tên khách hàng", "Số điện thoại", "Email"];

const AppointmentRequest = () => {
    dayjs.locale("vi");
    const [filterOption, setFilterOption] = useState("Tên khách hàng");
    const [searchQuery, setSearchQuery] = useState("");
    const [status, setStatus] = useState("Chờ phản hồi");
    const [page, setPage] = useState(1);
    const socket = useSocket();
    const [appointments, setAppointments] = useState([]);
    const {appointmentRequests, loading, getAllRequestAppointment} =
        useAppointmentRequestStore();
    const {token, setUserLoggedIn, userLoggedIn} = useUserStore();
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [openDialogResponse, setOpenDialogResponse] = useState(false);
    const [openDialogDetail, setOpenDialogDetail] = useState(false);
    const [selectedRequestDetail, setSelectedRequestDetail] = useState(null);

// Mở dialog chi tiết yêu cầu
    const handleOpenDialogDetail = (request) => {
        setSelectedRequestDetail(request);
        setOpenDialogDetail(true);
    };

// Đóng dialog chi tiết yêu cầu
    const handleCloseDialogDetail = () => {
        setOpenDialogDetail(false);
    };

    useEffect(() => {
        getAllRequestAppointment(token, {});
        setAppointments(appointmentRequests);
    }, [token, appointmentRequests]);

    useEffect(() => {
        const filtered = status === "Tất cả"
            ? appointments
            : appointments.filter((appointment) => {
                if (status === "Chờ phản hồi") return appointment.status === "pending";
                if (status === "Chấp nhận") return appointment.status === "accepted";
                if (status === "Đã hủy") return appointment.status === "rejected";
                return true;
            });

        // Lọc theo tiêu chí tìm kiếm
        const searchFiltered = filtered.filter((appointment) => {
            const query = searchQuery.toLowerCase();
            if (filterOption === "Tên khách hàng") {
                return appointment.customerName.toLowerCase().includes(query);
            }
            if (filterOption === "Số điện thoại") {
                return appointment.customerPhone.toLowerCase().includes(query);
            }
            if (filterOption === "Email") {
                return appointment.customerEmail.toLowerCase().includes(query);
            }
            return true;
        });

        setFilteredAppointments(searchFiltered);
    }, [status, appointments, searchQuery, filterOption]);


    useEffect(() => {
        if (!socket) return;
        socket.on("newAppointmentRequest", (newRequest) => {
            // console.log(newRequest);
            setAppointments((prev) => [...prev, newRequest]); // Cập nhật danh sách yêu cầu
        });

        socket.on("response", () => {
            getAllRequestAppointment(token, {});
        });

        return () => {
            socket.off("newAppointmentRequest");
            socket.off("response");
        };
    }, [socket]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleOpenDialogResponse = (request) => {
        setSelectedRequest(request);
        setOpenDialogResponse(true);
    };

    const handleCloseDialogResponse = () => {
        setOpenDialogResponse(false);
    };

    const refreshAppointments = (updatedRequest) => {
        getAllRequestAppointment(token, {});
        setSelectedRequest(updatedRequest);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
            {userLoggedIn?.user?.role !== "doctor" ? (
                <>
                    <Box sx={{paddingY: 6, paddingX: 2}}>
                        <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: 2}}>
                            Quản lý yêu cầu đặt lịch hẹn
                        </Typography>

                        {/* Bộ lọc */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            {/* Hộp tìm kiếm v */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    width: "50%",
                                }}
                            >
                                <Box
                                    sx={{
                                        border: "1px solid #ddd",
                                        padding: 2,
                                        borderRadius: 1,
                                        gap: 2,
                                    }}
                                >
                                    <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                                        <Typography sx={{fontWeight: "bold"}}>
                                            Tìm kiếm theo:
                                        </Typography>
                                        <RadioGroup
                                            row
                                            value={filterOption}
                                            onChange={(e) => setFilterOption(e.target.value)} // Cập nhật giá trị filterOption
                                            sx={{gap: 1}}
                                        >
                                            {filterOptions.map((option) => (
                                                <FormControlLabel
                                                    key={option}
                                                    value={option}
                                                    control={<Radio/>}
                                                    label={option}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </Box>
                                    <TextField
                                        variant="outlined"
                                        placeholder={`Tìm kiếm theo ${filterOption.toLowerCase()}`}
                                        fullWidth
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật từ khóa tìm kiếm
                                    />
                                </Box>
                            </Box>

                            {/* Hộp trạng thaí */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    width: "50%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        border: "1px solid #ddd",
                                        padding: 2,
                                        borderRadius: 1,
                                        gap: 0.5
                                    }}
                                >
                                    <Typography>Trạng thái:</Typography>
                                    <RadioGroup
                                        row
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        sx={{gap: 1}}
                                    >
                                        {statuses.map((status) => (
                                            <FormControlLabel
                                                key={status}
                                                value={status}
                                                control={<Radio/>}
                                                label={status}
                                            />
                                        ))}
                                    </RadioGroup>
                                </Box>
                            </Box>
                        </Box>

                        {/* Bảng hiển thị yêu cầu */}
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead sx={{backgroundColor: "#f0f0f0"}}>
                                    <TableRow>
                                        <TableCell sx={{fontWeight: "bold"}}>STT</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Tên KH</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Số điện thoại</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Email</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Ngày yêu cầu</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Giờ yêu cầu</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>
                                            Dịch vụ yêu cầu
                                        </TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Trạng thái</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredAppointments
                                        .slice((page - 1) * 10, page * 10)
                                        .map((appointment, index) => (
                                            <Tooltip
                                                key={appointment._id}
                                                title={
                                                    appointment.status === "pending"
                                                        ? "Nhấn để phản hồi yêu cầu"
                                                        : ""
                                                }
                                                arrow
                                            >
                                                <TableRow
                                                    sx={{
                                                        "&:hover": {
                                                            backgroundColor: "#e0f7fa",
                                                            cursor:
                                                                appointment.status === "pending"
                                                                    ? "pointer"
                                                                    : "default",
                                                        },
                                                    }}
                                                    onClick={() =>
                                                        appointment.status === "pending" &&
                                                        handleOpenDialogResponse(appointment)
                                                    }
                                                >
                                                    <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                                                    <TableCell sx={{fontWeight: "bold"}}>
                                                        {appointment.customerName}
                                                    </TableCell>
                                                    <TableCell>{appointment.customerPhone}</TableCell>
                                                    <TableCell>{appointment.customerEmail}</TableCell>
                                                    <TableCell>{appointment.appointmentDate}</TableCell>
                                                    <TableCell>{appointment.appointmentTime}</TableCell>
                                                    <TableCell>
                                                        {appointment.service || "Dịch vụ không tồn tại"}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                color:
                                                                    appointment.status === "pending"
                                                                        ? "orange"
                                                                        : appointment.status === "accepted"
                                                                            ? "green"
                                                                            : "red",
                                                            }}
                                                        >
                                                            {appointment.status === "pending"
                                                                ? "Chờ phản hồi"
                                                                : appointment.status === "accepted"
                                                                    ? "Chấp nhận"
                                                                    : "Đã hủy"}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        {appointment.status !== "pending" && (
                                                            <Tooltip title="Xem chi tiết">
                                                                <IconButton onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleOpenDialogDetail(appointment); // Mở dialog chi tiết
                                                                }}>
                                                                    <Visibility color="primary"/>
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            </Tooltip>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Phân trang */}
                        <Box sx={{display: "flex", justifyContent: "center", mt: 2}}>
                            <Pagination
                                count={Math.ceil(appointments.length / 10)}
                                page={page}
                                onChange={handlePageChange}
                            />
                        </Box>
                    </Box>

                    <ResponeRequest
                        open={openDialogResponse}
                        onClose={handleCloseDialogResponse}
                        selectedRequest={selectedRequest}
                        onSuccess={refreshAppointments}
                    />

                    <RequestDetailDialog
                        open={openDialogDetail}
                        onClose={handleCloseDialogDetail}
                        request={selectedRequestDetail}
                    />
                </>) : (<Page403/>)}
        </LocalizationProvider>
    );
};

export default AppointmentRequest;
