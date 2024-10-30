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
import CreateEmployee from "../../components/ManageEmployee/CreateEmployee";
import EmployeeDetail from "../../components/ManageEmployee/EmployeeDetail";
import useEmployeeStore from "../../hooks/employee/useGetAllEmployee";
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

const ManageEmployee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCreateEmployee, setOpenCreateEmployee] = useState(false);
  const [openEmployeeDetail, setOpenEmployeeDetail] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { employees, loading, error, getAllEmployees } = useEmployeeStore();
  const { userLoggedIn, token } = useUserStore();
  const [searchType, setSearchType] = useState("employeeID");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    if (token) {
      getAllEmployees(token);
    }
  }, [token, employees]);

  const filteredEmployees = employees.filter((employee) => {
    const worksOnSelectedDay =
      selectedDay === "" ||
      employee.workingTime.some((time) => daysOfWeek[time.day] === selectedDay);

    const worksInSelectedTime =
      selectedTime === "" ||
      employee.workingTime.some((time) =>
        time.timeSlots.includes(selectedTime)
      );

    // Tìm kiếm dựa trên trường searchType được chọn
    const isMatch = employee[searchType]
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (
      isMatch &&
      worksOnSelectedDay &&
      worksInSelectedTime &&
      (statusFilter === "" || employee.isWorking === (statusFilter === "true"))
    );
  });

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenCreateEmployee = () => setOpenCreateEmployee(true);
  const handleCloseCreateEmployee = () => setOpenCreateEmployee(false);

  const handleOpenEmployeeDetail = (employee) => {
    setSelectedEmployee(employee);
    setOpenEmployeeDetail(true);
  };

  return (
    <Box sx={{ paddingY: 6, paddingX: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Quản lý nhân viên
      </Typography>

      <Box
        sx={{ display: "flex", alignItems: "center", marginBottom: 2, gap: 4 }}
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
          {userLoggedIn?.user.role === "admin" && (
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ bgcolor: "#4caf50" }}
              onClick={handleOpenCreateEmployee}
            >
              Thêm mới nhân viên
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
              <TableCell sx={{ fontWeight: "bold" }}>Số điện thoại</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee, index) => (
                <TableRow
                  key={employee.employeeID}
                  sx={{ "&:hover": { backgroundColor: "#e0f7fa" } }}
                >
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell>{employee.employeeID}</TableCell>
                  <TableCell>{employee.employeeName}</TableCell>
                  <TableCell>{employee.employeePhone}</TableCell>
                  <TableCell>{employee.employeeEmail}</TableCell>
                  <TableCell>
                    {userLoggedIn?.user.role === "admin" && (
                      <Tooltip title="Chi tiết và chỉnh sửa">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenEmployeeDetail(employee)}
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
        count={filteredEmployees.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <CreateEmployee
        open={openCreateEmployee}
        onClose={handleCloseCreateEmployee}
      />
      <EmployeeDetail
        open={openEmployeeDetail}
        onClose={() => setOpenEmployeeDetail(false)}
        employee={selectedEmployee}
      />
    </Box>
  );
};

export default ManageEmployee;
