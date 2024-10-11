import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CreateAccount from "../components/ManageAccount/CreateAccount";
import EditAccount from "../components/ManageAccount/EditAccount";

const initialAccounts = [
  {
    id: 1,
    code: "AC001",
    name: "Nguyễn Văn A",
    username: "nvana",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    code: "AC002",
    name: "Trần Thị B",
    username: "ttb",
    role: "Nhân viên",
    status: "Inactive",
  },
  {
    id: 3,
    code: "AC003",
    name: "Lê Văn C",
    username: "lvc",
    role: "Admin",
    status: "Active",
  },
  {
    id: 4,
    code: "AC004",
    name: "Phạm Thị D",
    username: "ptd",
    role: "Bác sĩ",
    status: "Active",
  },
  {
    id: 5,
    code: "AC005",
    name: "Ngô Văn E",
    username: "nve",
    role: "Bác sĩ",
    status: "Inactive",
  },
  {
    id: 6,
    code: "AC006",
    name: "Ngô Văn F",
    username: "nvef",
    role: "Bác sĩ",
    status: "active",
  },
];

const ManageAccount = ({ isSidebarOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [createAccountDialogOpen, setCreateAccountDialogOpen] = useState(false);
  const [editAccountDialogOpen, setEditAccountDialogOpen] = useState(false);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState(initialAccounts);

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && account.status === "Active") ||
      (filterStatus === "inactive" && account.status === "Inactive");

    return matchesSearch && matchesStatus;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (account) => {
    setSelectedAccount(account);
    setEditAccountDialogOpen(true);
  };

  const handleDeleteClick = (account) => {
    setSelectedAccount(account);
    setDeleteConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setAccounts(accounts.filter((acc) => acc.id !== selectedAccount.id));
    setDeleteConfirmDialogOpen(false);
  };

  return (
    <Box sx={{ paddingY: 6, paddingX: 0.5 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Quản lý tài khoản
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <TextField
          label="Tìm kiếm theo mã, tên, hoặc tên tài khoản"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, marginRight: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={() => setCreateAccountDialogOpen(true)}
        >
          Tạo tài khoản mới
        </Button>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="body1">Lọc trạng thái:</Typography>
        <RadioGroup row value={filterStatus} onChange={handleFilterChange}>
          <FormControlLabel value="all" control={<Radio />} label="Tất cả" />
          <FormControlLabel value="active" control={<Radio />} label="Active" />
          <FormControlLabel
            value="inactive"
            control={<Radio />}
            label="Inactive"
          />
        </RadioGroup>
      </Box>
      <TableContainer sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                Số thứ tự
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mã</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                Họ tên
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tên tài khoản</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Vai trò</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Trạng thái</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAccounts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((account, index) => (
                <TableRow
                  key={account.id}
                  sx={{ "&:hover": { backgroundColor: "#e0f7fa" } }}
                >
                  <TableCell sx={{ width: "5%" }}>
                    {index + 1 + page * rowsPerPage}
                  </TableCell>
                  <TableCell>{account.code}</TableCell>
                  <TableCell sx={{ width: "25%" }}>{account.name}</TableCell>
                  <TableCell>{account.username}</TableCell>
                  <TableCell>{account.role}</TableCell>
                  <TableCell
                    sx={{
                      color: account.status === "Active" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {account.status}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Chỉnh sửa" arrow>
                      <IconButton
                        sx={{ color: "blue" }}
                        onClick={() => handleEditClick(account)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa" arrow>
                      <IconButton
                        sx={{ color: "red" }}
                        onClick={() => handleDeleteClick(account)}
                      >
                        <Delete />
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
        count={filteredAccounts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <CreateAccount
        open={createAccountDialogOpen}
        onClose={() => setCreateAccountDialogOpen(false)}
      />
      <EditAccount
        open={editAccountDialogOpen}
        onClose={() => setEditAccountDialogOpen(false)}
        account={selectedAccount}
        onUpdate={(updatedAccount) => {
          setAccounts((prevAccounts) =>
            prevAccounts.map((acc) =>
              acc.id === updatedAccount.id ? updatedAccount : acc
            )
          );
          setEditAccountDialogOpen(false);
        }}
      />

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={deleteConfirmDialogOpen}
        onClose={() => setDeleteConfirmDialogOpen(false)}
      >
        <DialogTitle>Xác nhận xóa tài khoản</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa tài khoản{" "}
            <strong>{selectedAccount?.name}</strong> không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmDialogOpen(false)}>
            Hủy bỏ
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": { backgroundColor: "darkred" },
            }}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageAccount;
