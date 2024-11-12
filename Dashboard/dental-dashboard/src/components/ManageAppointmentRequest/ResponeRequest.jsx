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
import useAppointmentRequestStore from "../../hooks/appointmentRequest/useAppointmentRequestStore";

const ResponeRequest = ({ open, onClose, onSuccess, selectedRequest }) => {
  const [requestData, setRequestData] = useState(selectedRequest);
  const [isEditing, setIsEditing] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(
    requestData?.appointmentDate || ""
  );
  const [appointmentTime, setAppointmentTime] = useState(
    requestData?.appointmentTime || ""
  );
  const [doctorGender, setDoctorGender] = useState(
    requestData?.genderDoctor || "all"
  ); // Chuyển sang chuỗi
  const [selectedService, setSelectedService] = useState(
    requestData?.service || ""
  );
  const [note, setNote] = useState(requestData?.note || "");
  const { token, userLoggedIn } = useUserStore();
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { services, getAllService } = useGetService();
  const [isChange, setIsChange] = useState(false);
  const { request, getRequestById } = useAppointmentRequestStore();
  const [openReject, setOpenReject] = useState(false);
  const [reasonReject, setReasonReject] = useState("");
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);

  useEffect(() => {
    if (selectedRequest) {
      setRequestData(selectedRequest);
    }
  }, [selectedRequest]);

  useEffect(() => {
    if (requestData) {
      const formattedDate = moment(
        requestData.appointmentDate,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      setAppointmentDate(formattedDate);
      setAppointmentTime(requestData.appointmentTime || "");
      setDoctorGender(requestData.genderDoctor || "all");
      setSelectedService(requestData.service || "");
      setNote(requestData.note || "");
      setSelectedDoctor(null); // Reset doctor selection after update
    }
  }, [requestData]); // Re-run when requestData changes

  useEffect(() => {
    if (requestData && services) {
      const matchingService = services.find(
        (service) => service.name === requestData.service
      );
      setSelectedService(matchingService || null); // Set null if no match is found
    }
  }, [requestData, services]);

  const getListDoctor = async () => {
    if (!selectedRequest._id) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/appointment-request/doctor-availability/${selectedRequest._id}`,
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
    if (isChange) {
      getListDoctor().then(() => setIsChange(false));
    }
  }, [selectedRequest, token, isChange]);

  useEffect(() => {
    if (token) {
      getAllService();
    }
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setAppointmentDate(moment(selectedDate).format("YYYY-MM-DD"));
  };

  // Định dạng ngày để sử dụng trong trường ngày
  const formattedAppointmentDate = moment(
    appointmentDate,
    "DD/MM/YYYY"
  ).isValid()
    ? moment(appointmentDate, "DD/MM/YYYY").format("YYYY-MM-DD")
    : appointmentDate;

  const handleReset = () => {
    // Đặt lại tất cả các giá trị về ban đầu từ selectedRequest
    setSelectedService(
      services.find((service) => service.name === requestData?.service) || ""
    );
    setNote(requestData?.note || "");
    setDoctorGender(requestData?.genderDoctor || "all");
    setAppointmentDate(requestData?.appointmentDate || "");
    setAppointmentTime(requestData?.appointmentTime || "");
    setSelectedDoctor(null); // Đặt lại bác sĩ
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

  const isFormValid = () => {
    return (
      appointmentDate && appointmentTime && selectedService && doctorGender
    );
  };

  const handleSave = async () => {
    if (!selectedRequest._id) return;
    setIsLoadingEdit(true);
    if (!isFormValid()) {
      toast.error("Vui lòng điền đầy đủ thông tin", { autoClose: 3000 });
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
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
      service:
        typeof selectedService === "string"
          ? selectedService
          : selectedService.name,
      genderDoctor: doctorGender,
      note: note,
      editBy: JSON.stringify(editByObject),
    };
    console.log("Request edit:", requestEdit);
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

        // Cập nhật requestData với dữ liệu mới ngay lập tức
        setRequestData(updatedRequest); // Không cần setTimeout

        // Gọi lại getRequestById để làm mới thông tin
        getRequestById(response.data.updatedRequest._id, token);
        // console.log("Updated Request:", response.data.updatedRequest);
        onSuccess(response.data.updatedRequest);
        toast.success("Cập nhật yêu cầu thành công", { autoClose: 3000 });
        setIsEditing(false);
        setIsChange(true);
        handleReset();
        setIsLoadingEdit(false);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật yêu cầu:", error);
      toast.error("Cập nhật yêu cầu không thành công", { autoClose: 3000 });
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
      toast.error("Vui lòng nhập lý do từ chối", { autoClose: 3000 });
      setIsLoadingResponse(false);
      return;
    }
    if (status === "accepted") {
      if (!selectedDoctor) {
        toast.error("Vui lòng chọn bác sĩ", { autoClose: 3000 });
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
          doctorID: selectedDoctor?.doctor.employeeID || "",
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
        toast.success("Phản hồi yêu cầu thành công", { autoClose: 3000 });
        if (status === "rejected") {
          setOpenReject(false);
          setReasonReject("");
        }
        handleClose();
      }
    } catch (error) {
      console.error("Lỗi khi phản hồi yêu cầu:", error);
      toast.error("Phản hồi yêu cầu không thành công", { autoClose: 3000 });
      setIsLoadingResponse(false);
    }
  };

  const handleOpenReject = () => {
    setOpenReject(true);
  };
  const handleCloseReject = () => {
    setOpenReject(false);
    setReasonReject("");
  };

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
                    Tên khách hàng: <strong>{requestData?.customerName}</strong>
                  </Typography>
                  <Typography>
                    Số điện thoại: <strong>{requestData?.customerPhone}</strong>
                  </Typography>
                  <Typography>
                    Email:{" "}
                    <strong>
                      {requestData?.customerEmail || "Chưa cung cấp"}
                    </strong>
                  </Typography>
                  <Typography>
                    Giới tính bác sĩ yêu cầu:{" "}
                    <strong>
                      {requestData?.genderDoctor === "male"
                        ? "Nam"
                        : requestData?.genderDoctor === "all"
                        ? "Tất cả"
                        : "Nữ"}
                    </strong>
                  </Typography>
                  <Typography>
                    Dịch vụ yêu cầu: <strong>{requestData?.service}</strong>
                  </Typography>
                  <Typography>
                    Ngày yêu cầu:{" "}
                    <strong>{requestData?.appointmentDate}</strong>
                  </Typography>
                  <Typography>
                    Giờ yêu cầu: <strong>{requestData?.appointmentTime}</strong>
                  </Typography>
                  <Typography>
                    Ghi chú:{" "}
                    <strong>{requestData?.note || "Không có ghi chú"}</strong>
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
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
                    }
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
                        disable={isLoadingResponse}
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
        {!isLoadingResponse ? (
          <>
            <Button
              onClick={() => handleResponse("accepted")}
              color="success"
              variant="contained"
            >
              Chấp nhận
            </Button>
            <Button
              onClick={() => setOpenReject(true)}
              color="error"
              variant="contained"
            >
              Từ chối
            </Button>
            <Button onClick={handleClose} color="error" variant="outlined">
              Đóng
            </Button>
          </>
        ) : (
          <Typography variant="body2">Đang xử lý...</Typography>
        )}
      </DialogActions>

      {/* Dialog từ chối yêu cầu */}
      <Dialog
        open={openReject}
        onClose={handleCloseReject}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Xác nhận từ chối</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            Bạn có chắc chắn muốn từ chối yêu cầu này?
          </Typography>
          <TextField
            sx={{ mt: 2 }}
            label="Lý do từ chối"
            multiline
            rows={4}
            fullWidth
            required
            onChange={(e) => setReasonReject(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {!isLoadingResponse ? (
            <>
              <Button
                onClick={handleCloseReject}
                color="error"
                variant="outlined"
              >
                Hủy
              </Button>
              <Button
                onClick={() => handleResponse("rejected")}
                color="success"
                variant="contained"
              >
                Xác nhận
              </Button>
            </>
          ) : (
            <Typography variant="body2">Đang xử lý...</Typography>
          )}
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default ResponeRequest;
