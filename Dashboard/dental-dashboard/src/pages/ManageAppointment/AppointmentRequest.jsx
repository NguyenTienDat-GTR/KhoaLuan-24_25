import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Info } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import useSocket from "../../hooks/useSocket";
import useAppointmentRequestStore from "../../hooks/appointmentRequest/useAppointmentRequestStore";
import useUserStore from "../../hooks/auth/useUserStore";
import ResponeRequest from "../../components/ManageAppointmentRequest/ResponeRequest";

const statuses = ["Tất cả", "Chờ phản hồi", "Chấp nhận", "Đã hủy"];
const filterOptions = ["Tên khách hàng", "Số điện thoại", "Email"];

const AppointmentRequest = () => {
  dayjs.locale("vi");
  const [filterOption, setFilterOption] = useState("Tên khách hàng");
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState("Chờ phản hồi");
  const [selectedDate, setSelectedDate] = useState(null);
  const [page, setPage] = useState(1);
  const socket = useSocket();
  const [appointments, setAppointments] = useState([]);
  const { appointmentRequests, loading, getAllRequestAppointment } =
    useAppointmentRequestStore();
  const { token, setUserLoggedIn } = useUserStore();
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialogResponse, setOpenDialogResponse] = useState(false);

  useEffect(() => {
    getAllRequestAppointment(token);
    setAppointments(appointmentRequests);
  }, [token, getAllRequestAppointment, appointmentRequests]);

  // useEffect(() => {
  //   if (token) {
  //     setUserLoggedIn(token);
  //   }
  // }, [token]);

  useEffect(() => {
    if (!socket) return;
    socket.on("newAppointmentRequest", (newRequest) => {
      console.log(newRequest);
      setAppointments((prev) => [...prev, newRequest]); // Cập nhật danh sách yêu cầu
    });

    return () => {
      socket.off("newAppointmentRequest");
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

  const refreshAppointments = () => {
    getAllRequestAppointment(token);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
      <Box sx={{ paddingY: 6, paddingX: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Quản lý yêu cầu đặt lịch hẹn
        </Typography>

        {/* Bộ lọc */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          {/* Hộp tìm kiếm và trạng thái */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "65%",
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Tìm kiếm theo:
                </Typography>
                <RadioGroup
                  row
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                  sx={{ gap: 1 }}
                >
                  {filterOptions.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
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
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                padding: 2,
                borderRadius: 1,
              }}
            >
              <Typography>Trạng thái:</Typography>
              <RadioGroup
                row
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                sx={{ gap: 1 }}
              >
                {statuses.map((status) => (
                  <FormControlLabel
                    key={status}
                    value={status}
                    control={<Radio />}
                    label={status}
                  />
                ))}
              </RadioGroup>
            </Box>
          </Box>

          {/* Hộp dịch vụ, ngày và nút tạo mới */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "30%",
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                displayEmpty
                variant="outlined"
                fullWidth
              >
                <MenuItem value="">Loại dịch vụ</MenuItem>
              </Select>

              <Select
                value={service}
                onChange={(e) => setService(e.target.value)}
                displayEmpty
                variant="outlined"
                fullWidth
              >
                <MenuItem value="">Dịch vụ</MenuItem>
              </Select>
            </Box>

            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              label="Lọc theo ngày"
              inputFormat="DD/MM/YYYY"
              renderInput={(params) => <TextField {...params} fullWidth />}
            />

            <Button variant="contained" color="primary" fullWidth>
              Tạo yêu cầu mới
            </Button>
          </Box>
        </Box>

        {/* Bảng hiển thị yêu cầu */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>STT</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Tên KH</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Số điện thoại</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Ngày yêu cầu</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Giờ yêu cầu</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Dịch vụ yêu cầu
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments
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
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {appointment.customerName}
                      </TableCell>
                      <TableCell>{appointment.customerPhone}</TableCell>
                      <TableCell>{appointment.customerEmail}</TableCell>
                      <TableCell>{appointment.appointmentDate}</TableCell>
                      <TableCell>{appointment.appointmentTime}</TableCell>
                      <TableCell>{appointment.service.name}</TableCell>
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
                            <IconButton onClick={(e) => e.stopPropagation()}>
                              <Info color="primary" />
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
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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
    </LocalizationProvider>
  );
};

export default AppointmentRequest;
