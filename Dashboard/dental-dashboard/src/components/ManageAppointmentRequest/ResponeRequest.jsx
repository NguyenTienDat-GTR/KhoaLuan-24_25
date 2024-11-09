import { useEffect, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Tooltip,
  FormControl,
  InputLabel,
  Autocomplete,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import useUserStore from "../../hooks/auth/useUserStore";
import axios from "../../config/axiosConfig";
import { toast } from "react-toastify";
import useGetService from "../../hooks/service/useGetAllService";
import moment from "moment";

const ResponeRequest = ({ open, onClose, onSuccess, selectedRequest }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(
    selectedRequest?.appointmentDate || ""
  );
  const [appointmentTime, setAppointmentTime] = useState(
    selectedRequest?.appointmentTime || ""
  );
  const [doctorGender, setDoctorGender] = useState(
    selectedRequest?.genderDoctor || "all"
  ); // Chuyển sang chuỗi
  const [selectedService, setSelectedService] = useState(
    selectedRequest?.service || null
  );
  const [note, setNote] = useState(selectedRequest?.note || "");
  const { token, userLoggedIn } = useUserStore();
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { services, getAllService } = useGetService();

  const getListDoctor = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/appointment-request/doctor-availability",
        { appointmentRequest: selectedRequest },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setDoctors(
          Array.isArray(response.data.availableDoctors)
            ? response.data.availableDoctors
            : []
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi lấy danh sách bác sĩ", { autoClose: 3000 });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRequest && token) {
      getListDoctor();
    }
  }, [selectedRequest]);

  useEffect(() => {
    if (token) {
      getAllService();
    }
  }, []);

  useEffect(() => {
    if (selectedRequest && selectedRequest.appointmentDate) {
      const formattedDate = moment(
        selectedRequest.appointmentDate,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      setAppointmentDate(formattedDate);
    }
  }, [selectedRequest?.appointmentDate]); // Đảm bảo rằng effect chỉ chạy khi appointmentDate thay đổi

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const formattedDate = moment(selectedDate, "YYYY-MM-DD").format(
      "DD/MM/YYYY"
    );
    setAppointmentDate(formattedDate);
  };

  const formattedAppointmentDate = moment(
    appointmentDate,
    "DD/MM/YYYY"
  ).isValid()
    ? moment(appointmentDate, "DD/MM/YYYY").format("YYYY-MM-DD")
    : "";

  const handleReset = () => {
    setSelectedService(null);
    setNote(selectedRequest?.note || "");
    setDoctorGender(selectedRequest?.genderDoctor || "all");
    setAppointmentDate(selectedRequest?.appointmentDate || "");
    setAppointmentTime(selectedRequest?.appointmentTime || "");
    setSelectedService(selectedRequest?.service.name || "");
  };

  const handleClose = () => {
    handleReset();
    onClose();
    setIsEditing(false);
    setSelectedDoctor(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSuccess();
  };

  const handleCancelEdit = () => {
    handleReset();
    setIsEditing(false);
  };

  const handleAccept = () => {};

  const handleReject = () => {};

  const handleGenderChange = (event) => {
    setDoctorGender(event.target.value);
  };

  const handleServiceSearchChange = (event, newValue) => {
    setSelectedService(newValue); // For Autocomplete, the selected value is passed in 'newValue'
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="90vw" fullWidth>
      <DialogTitle>Phản hồi yêu cầu đặt lịch</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", gap: 3, flexDirection: "row", mt: 2 }}>
          {/* Left side: 2 boxes stacked in a row */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              gap: 3,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {/* Box for request info */}
            <Box
              sx={{
                flex: 1,
                position: "relative",
                maxWidth: "450px",
                minHeight: "370px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Ensure the content takes up full height
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  position: "absolute",
                  top: "-10px",
                  left: "10px",
                  backgroundColor: "#fff",
                  padding: "0 8px",
                  fontSize: "14px",
                }}
              >
                Thông tin yêu cầu
              </Typography>
              <Box sx={{ border: "1px solid #ccc", p: 2, height: "100%" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography>
                    Tên khách hàng:{" "}
                    <strong>{selectedRequest?.customerName}</strong>
                  </Typography>
                  <Typography>
                    Số điện thoại:{" "}
                    <strong>{selectedRequest?.customerPhone}</strong>
                  </Typography>
                  <Typography>
                    Email:{" "}
                    <strong>
                      {selectedRequest?.customerEmail || "Chưa cung cấp"}
                    </strong>
                  </Typography>
                  <Typography>
                    Giới tính bác sĩ yêu cầu:{" "}
                    <strong>
                      {selectedRequest?.genderDoctor === "male" ? "Nam" : "Nữ"}
                    </strong>
                  </Typography>
                  <Typography>
                    Dịch vụ yêu cầu:{" "}
                    <strong>{selectedRequest?.service.name}</strong>
                  </Typography>
                  <Typography>
                    Ngày yêu cầu:{" "}
                    <strong>{selectedRequest?.appointmentDate}</strong>
                  </Typography>
                  <Typography>
                    Giờ yêu cầu:{" "}
                    <strong>{selectedRequest?.appointmentTime}</strong>
                  </Typography>
                  <Typography>
                    Ghi chú:{" "}
                    <strong>
                      {selectedRequest?.note || "Không có ghi chú"}
                    </strong>
                  </Typography>
                  <Typography>
                    Bác sĩ:{" "}
                    <strong>
                      {selectedDoctor?.doctor.employeeName ||
                        "Chưa chọn bác sĩ"}
                    </strong>
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Box for changing request */}
            <Box
              sx={{
                flex: 1,
                position: "relative",
                minWidth: "350px",
                minHeight: "370px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Ensure content stretches to fill height
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  position: "absolute",
                  top: "-10px",
                  left: "10px",
                  backgroundColor: "#fff",
                  padding: "0 8px",
                  fontSize: "14px",
                }}
              >
                Thay đổi yêu cầu
              </Typography>
              <Box sx={{ border: "1px solid #ccc", p: 2, height: "100%" }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2,
                    mt: 1,
                  }}
                >
                  <TextField
                    label="Ngày yêu cầu"
                    type="date"
                    value={formattedAppointmentDate}
                    onChange={handleDateChange}
                    fullWidth
                    InputProps={{ readOnly: !isEditing }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Giờ yêu cầu</InputLabel>
                    <Select
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      fullWidth
                      disabled={!isEditing}
                    >
                      {[...Array(9).keys()]
                        .map((i) => `${i + 8}:00`)
                        .filter((time) => time !== "12:00")
                        .map((time) => (
                          <MenuItem key={time} value={time}>
                            {time}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <Autocomplete
                    value={selectedService}
                    onChange={handleServiceSearchChange}
                    options={services} // Dữ liệu dịch vụ
                    getOptionLabel={(option) => option?.name || "Chọn dịch vụ"} // Hiển thị tên dịch vụ
                    filterOptions={(options, state) =>
                      options.filter((option) =>
                        option.name
                          .toLowerCase()
                          .includes(state.inputValue.toLowerCase())
                      )
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Tìm kiếm dịch vụ" />
                    )}
                    disableClearable
                    disabled={!isEditing}
                  />

                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle1">Giới tính</Typography>
                    <RadioGroup
                      row
                      value={doctorGender}
                      onChange={handleGenderChange}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio disabled={!isEditing} />}
                        label="Nam"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio disabled={!isEditing} />}
                        label="Nữ"
                      />
                      <FormControlLabel
                        value="all"
                        control={<Radio disabled={!isEditing} />}
                        label="Tất cả"
                      />
                    </RadioGroup>
                  </Box>
                </Box>
                <TextField
                  sx={{ mt: 2 }}
                  label="Ghi chú"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                  InputProps={{ readOnly: !isEditing }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {!isEditing && (
                      <Button
                        onClick={handleEdit}
                        color="primary"
                        startIcon={<Edit />}
                        variant="contained"
                      >
                        Thay đổi yêu cầu
                      </Button>
                    )}
                    {isEditing && (
                      <>
                        <Button onClick={handleSave} color="success">
                          Lưu
                        </Button>
                        <Button onClick={handleCancelEdit} color="error">
                          Hủy thay đổi
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Table for doctor list */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Danh sách bác sĩ phù hợp</Typography>
          <Box
            sx={{
              mt: 3,
              border: "1px solid #ccc",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Mã</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Họ tên</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Giới tính</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Thời gian rảnh
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!isLoading ? (
                    Array.isArray(doctors) && doctors.length > 0 ? (
                      doctors.map((doctor) => (
                        <Tooltip title="Nhấn để chọn bác sĩ" arrow>
                          <TableRow
                            key={doctor.doctor.employeeID}
                            onClick={() => setSelectedDoctor(doctor)}
                            sx={{
                              backgroundColor:
                                selectedDoctor?.doctor.employeeID ===
                                doctor.doctor.employeeID
                                  ? "#b2ebf2" // Màu nền khi bác sĩ được chọn
                                  : "transparent",
                              "&:hover": {
                                backgroundColor: "#e0f7fa",
                                cursor: "pointer",
                              },
                            }}
                          >
                            <TableCell>{doctor.doctor.employeeID}</TableCell>
                            <TableCell>{doctor.doctor.employeeName}</TableCell>
                            <TableCell>
                              {doctor.doctor.gender === "male" ? "Nam" : "Nữ"}
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1, // Điều chỉnh khoảng cách giữa các phần tử
                                }}
                              >
                                {doctor.availableTimes.map((time, index) => (
                                  <Typography
                                    key={index}
                                    sx={{ width: "auto" }}
                                  >
                                    {time}
                                  </Typography>
                                ))}
                              </Box>
                            </TableCell>
                          </TableRow>
                        </Tooltip>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          Không có bác sĩ nào phù hợp.
                        </TableCell>
                      </TableRow>
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Đang tải dữ liệu...
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccept} color="success" variant="contained">
          Chấp nhận
        </Button>
        <Button onClick={handleReject} color="error" variant="contained">
          Từ chối
        </Button>
        <Button onClick={handleClose} color="error" variant="outlined">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResponeRequest;
