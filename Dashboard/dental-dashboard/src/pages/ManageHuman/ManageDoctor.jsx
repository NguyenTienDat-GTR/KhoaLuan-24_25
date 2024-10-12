import React, { useState } from "react";
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
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Add, Edit, Visibility } from "@mui/icons-material";
import CreateDoctor from "../../components/ManageDoctor/createDoctor";
import DoctorDetail from "../../components/ManageDoctor/DoctorDetail";

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openCreateDoctor, setOpenCreateDoctor] = useState(false);
  const [openDoctorDetail, setOpenDoctorDetail] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = [
    {
      id: "BS00001",
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "a@gmail.com",
      workingSchedule: {
        Monday: ["08:00 - 12:00", "13:00 - 17:00"],
        Wednesday: ["08:00 - 12:00"],
        Friday: ["13:00 - 17:00"],
      },
      status: "active",
    },
    {
      id: "BS00002",
      name: "Trần Thị B",
      phone: "0987654321",
      email: "b@gmail.com",
      workingSchedule: {
        Tuesday: ["08:00 - 12:00"],
        Thursday: ["13:00 - 17:00"],
      },
      status: "inactive",
    },
    {
      id: "BS00003",
      name: "Lê Thị C",
      phone: "0912345678",
      email: "c@gmail.com",
      workingSchedule: {
        Monday: ["08:00 - 17:00"],
        Wednesday: ["08:00 - 17:00"],
        Friday: ["08:00 - 17:00"],
      },
      status: "active",
    },
    {
      id: "BS00004",
      name: "Phạm Văn D",
      phone: "0123456780",
      email: "d@gmail.com",
      workingSchedule: {
        Saturday: ["08:00 - 12:00", "13:00 - 17:00"],
        Sunday: ["08:00 - 12:00"],
      },
      status: "inactive",
    },
    {
      id: "BS00005",
      name: "Trần Thị E",
      phone: "0987654320",
      email: "e@gmail.com",
      workingSchedule: {
        Saturday: ["08:00 - 12:00"],
        Sunday: ["13:00 - 17:00"],
      },
      status: "active",
    },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.phone.includes(searchTerm) ||
        doctor.email.toLowerCase().includes(searchTerm)) &&
      (selectedDay === "" || doctor.workingHours.includes(selectedDay)) &&
      (selectedTime === "" || doctor.workingHours.includes(selectedTime)) &&
      (statusFilter === "" || doctor.status === statusFilter)
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
        <TextField
          label="Tìm kiếm theo mã, họ tên, số điện thoại hoặc email"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "40%", bgcolor: "#f5f5f5" }} // Thay đổi màu nền
        />
        <Box
          className="filter"
          sx={{
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
                <MenuItem value="Thứ Hai">Thứ Hai</MenuItem>
                <MenuItem value="Thứ Ba">Thứ Ba</MenuItem>
                <MenuItem value="Thứ Tư">Thứ Tư</MenuItem>
                <MenuItem value="Thứ Năm">Thứ Năm</MenuItem>
                <MenuItem value="Thứ Sáu">Thứ Sáu</MenuItem>
                <MenuItem value="Thứ Bảy">Thứ Bảy</MenuItem>
                <MenuItem value="Chủ Nhật">Chủ Nhật</MenuItem>
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
                <MenuItem value="Cả ngày">Cả ngày</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="caption">Trạng thái:</Typography>
        <RadioGroup
          row
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <FormControlLabel value="" control={<Radio />} label="Tất cả" />
          <FormControlLabel
            value="active"
            control={<Radio />}
            label="Còn hoạt động"
          />
          <FormControlLabel
            value="inactive"
            control={<Radio />}
            label="Đã nghỉ"
          />
        </RadioGroup>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ bgcolor: "#4caf50" }}
          onClick={handleOpenCreateDoctor}
        >
          Thêm mới bác sĩ
        </Button>
      </Box>

      <TableContainer sx={{ boxShadow: 2, borderRadius: 1 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Số thứ tự</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mã</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Họ tên</TableCell>
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
                  hover
                  sx={{
                    backgroundColor:
                      doctor.status === "inactive" ? "#ffebee" : "inherit", // Màu đỏ nhạt cho bác sĩ đã nghỉ
                  }}
                >
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell>{doctor.id}</TableCell>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>
                    {/* Chuyển đổi lịch làm việc thành chuỗi để hiển thị */}
                    {Object.entries(doctor.workingSchedule).map(
                      ([day, times]) => (
                        <div key={day}>
                          {daysOfWeek[day]}: {times.join(", ")}{" "}
                          {/* Sử dụng từ điển để hiển thị ngày bằng tiếng Việt */}
                        </div>
                      )
                    )}
                  </TableCell>

                  <TableCell>
                    <Tooltip title="Xem chi tiết">
                      <IconButton
                        onClick={() => handleOpenDoctorDetail(doctor)}
                      >
                        <Visibility sx={{ color: "green" }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredDoctors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* Dialog thêm mới bác sĩ */}
      <CreateDoctor open={openCreateDoctor} onClose={handleCloseCreateDoctor} />
      {/* Dialog xem chi tiết bác sĩ */}
      <DoctorDetail
        open={openDoctorDetail}
        onClose={() => setOpenDoctorDetail(false)}
        doctor={selectedDoctor}
      />
    </Box>
  );
};

export default ManageDoctor;
