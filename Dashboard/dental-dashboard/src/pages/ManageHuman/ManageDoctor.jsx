import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Add, Visibility } from "@mui/icons-material";
import CreateDoctor from "../../components/ManageDoctor/CreateDoctor";
import DoctorDetail from "../../components/ManageDoctor/DoctorDetail";
import Cookies from "js-cookie";
import useDoctorStore from "../../hooks/doctor/useGetAllDoctor";
import { jwtDecode } from "jwt-decode";
import useUserStore from "../../hooks/auth/useUserStore";

const daysOfWeek = {
  Monday: "Thứ Hai",
  Tuesday: "Thứ Ba",
  Wednesday: "Thứ Tư",
  Thursday: "Thứ Năm",
  Friday: "Thứ Sáu",
  Saturday: "Thứ Bảy",
  Sunday: "Chủ Nhật",
};

const ManageDoctor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCreateDoctor, setOpenCreateDoctor] = useState(false);
  const [openDoctorDetail, setOpenDoctorDetail] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { doctors, loading, error, getAllDoctors } = useDoctorStore();
  const { userLoggedIn, setUserLoggedIn, token } = useUserStore();
  const [searchType, setSearchType] = useState("employeeID");

  // const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      setUserLoggedIn(token);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getAllDoctors(token);
    }
  }, [token, doctors]);

  const refreshData = () => {
    getAllDoctors(token);
  };

  // Lọc danh sách bác sĩ dựa trên các filter
  const filteredDoctors = doctors.filter((doctor) => {
    const worksOnSelectedDay =
      selectedDay === "" ||
      doctor.workingTime.some((time) => daysOfWeek[time.day] === selectedDay);

    const worksInSelectedTime =
      selectedTime === "" ||
      doctor.workingTime.some((time) => time.timeSlots.includes(selectedTime));

    // Tìm kiếm dựa trên trường searchType được chọn
    const isMatch = doctor[searchType]
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (
      isMatch &&
      worksOnSelectedDay &&
      worksInSelectedTime &&
      (statusFilter === "" || doctor.isWorking === (statusFilter === "true"))
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenCreateDoctor = () => {
    setOpenCreateDoctor(true);
  };

  const handleCloseCreateDoctor = () => {
    setOpenCreateDoctor(false);
  };

  const handleOpenDoctorDetail = (doctor) => {
    console.log(doctor);
    setSelectedDoctor(doctor);
    setOpenDoctorDetail(true);
  };

  return (
    <Box sx={{ paddingY: 6, paddingX: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Quản lý bác sĩ
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "45%",
            border: "1px solid #ccc",
            paddingX: 2,
            paddingBottom: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: 1,
              justifyContent: "space-evenly",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Tìm kiếm theo:
            </Typography>
            <RadioGroup
              row
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <FormControlLabel
                value="employeeID"
                control={<Radio />}
                label="Mã"
              />
              <FormControlLabel
                value="employeeName"
                control={<Radio />}
                label="Tên"
              />
              <FormControlLabel
                value="employeePhone"
                control={<Radio />}
                label="SĐT"
              />
              <FormControlLabel
                value="employeeEmail"
                control={<Radio />}
                label="Email"
              />
            </RadioGroup>
          </Box>
          <TextField
            label="Tìm kiếm"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ bgcolor: "#f5f5f5" }}
          />
        </Box>
        <Box
          className="filter"
          sx={{
            mt: 2,
            position: "relative",
            width: "50%",
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component="label"
            sx={{
              position: "absolute",
              top: "-10px",
              left: 10,
              bgcolor: "white",
              px: 0.5,
              fontSize: "0.875rem",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Thời gian làm việc
          </Typography>
          <Box
            sx={{
              width: "45%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginTop: 0.5 }}>Theo ngày:</Typography>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <Select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                displayEmpty
                sx={{ bgcolor: "#f5f5f5" }}
              >
                <MenuItem value="">
                  <em>Tất cả ngày</em>
                </MenuItem>
                {Object.values(daysOfWeek).map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              width: "40%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginTop: 1 }}>Theo giờ:</Typography>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <Select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                displayEmpty
                sx={{ bgcolor: "#f5f5f5" }}
              >
                <MenuItem value="">
                  <em>Tất cả giờ</em>
                </MenuItem>
                <MenuItem value="08:00 - 12:00">08:00 - 12:00</MenuItem>
                <MenuItem value="13:00 - 17:00">13:00 - 17:00</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          marginBottom: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "50%",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Trạng thái:
          </Typography>
          <RadioGroup
            row
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <FormControlLabel value="" control={<Radio />} label="Tất cả" />
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Còn hoạt động"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Đã nghỉ"
            />
          </RadioGroup>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {/* Chỉ hiển thị nút "Thêm mới bác sĩ" nếu người dùng là admin */}
          {userLoggedIn?.user.role === "admin" && (
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ bgcolor: "#4caf50" }}
              onClick={handleOpenCreateDoctor}
            >
              Thêm mới bác sĩ
            </Button>
          )}
        </Box>
      </Box>

      <TableContainer sx={{ boxShadow: 2, borderRadius: 1 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Số thứ tự</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mã</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Họ tên</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Giới tính</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Số điện thoại</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Giờ làm việc</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDoctors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((doctor, index) => (
                <TableRow
                  key={`${doctor.id}-${index}`}
                  sx={{
                    backgroundColor:
                      doctor.status === "inactive" ? "#ffebee" : "inherit",
                    "&:hover": { backgroundColor: "#e0f7fa" },
                  }}
                >
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell>{doctor.employeeID}</TableCell>
                  <TableCell>{doctor.employeeName}</TableCell>
                  <TableCell>
                    {doctor.gender === "male" ? "Nam" : "Nữ"}
                  </TableCell>
                  <TableCell>{doctor.employeePhone}</TableCell>
                  <TableCell>{doctor.employeeEmail}</TableCell>
                  <TableCell>
                    {doctor.workingTime?.map((time, i) => (
                      <Typography key={i}>
                        {daysOfWeek[time.day]}: {time.timeSlots.join(", ")}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>
                    {/* Chỉ hiển thị nút "Xem chi tiết" nếu người dùng là admin */}
                    {userLoggedIn?.user.role === "admin" && (
                      <Tooltip title="Chi tiết và chỉnh sửa">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDoctorDetail(doctor)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredDoctors.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <CreateDoctor open={openCreateDoctor} onClose={handleCloseCreateDoctor} />
      <DoctorDetail
        open={openDoctorDetail}
        onClose={() => setOpenDoctorDetail(false)}
        doctor={selectedDoctor}
        onSuccess={refreshData}
      />
    </Box>
  );
};

export default ManageDoctor;
