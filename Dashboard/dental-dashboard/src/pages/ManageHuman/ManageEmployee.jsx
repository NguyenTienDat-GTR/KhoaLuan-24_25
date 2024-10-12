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
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Add, Edit, Visibility } from "@mui/icons-material";

const ManageEmployee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const employees = [
    {
      id: "NV00001",
      name: "Nguyễn Văn X",
      phone: "0123456789",
      email: "x@gmail.com",
      position: "Lễ tân",
      status: "active",
    },
    {
      id: "NV00002",
      name: "Trần Thị Y",
      phone: "0987654321",
      email: "y@gmail.com",
      position: "Quản lý",
      status: "inactive",
    },
    {
      id: "NV00003",
      name: "Lê Văn Z",
      phone: "0912345678",
      email: "z@gmail.com",
      position: "Nhân viên kỹ thuật",
      status: "active",
    },
  ];

  const filteredEmployees = employees.filter((employee) => {
    return (
      (employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.phone.includes(searchTerm) ||
        employee.email.toLowerCase().includes(searchTerm)) &&
      (statusFilter === "" || employee.status === statusFilter)
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ paddingY: 6, paddingX: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Quản lý nhân viên
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
          gap: 10,
        }}
      >
        <TextField
          label="Tìm kiếm theo mã, họ tên, số điện thoại hoặc email"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "40%", bgcolor: "#f5f5f5" }}
        />
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
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ bgcolor: "#4caf50" }}
        >
          Thêm mới nhân viên
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
              <TableCell sx={{ fontWeight: "bold" }}>Chức vụ</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee, index) => (
                <TableRow
                  key={employee.id}
                  hover
                  sx={{
                    backgroundColor:
                      employee.status === "inactive" ? "#ffebee" : "inherit",
                  }}
                >
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Tooltip title="Xem chi tiết">
                      <IconButton>
                        <Visibility sx={{ color: "green" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                      <IconButton>
                        <Edit sx={{ color: "blue" }} />
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
        count={filteredEmployees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ManageEmployee;
