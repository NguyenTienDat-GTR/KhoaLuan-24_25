import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "../../config/axiosConfig";
import useUserStore from "../../hooks/auth/useUserStore";
import { toast } from "react-toastify";

const CreateAccount = ({ open, onClose, onAccountCreated }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("");
  const { userLoggedIn, setUserLoggedIn, token } = useUserStore();
  const [userList, setUserList] = useState([]);

  const getListUsers = async () => {
    try {
      const respone = await axios.get("/account/employee-without-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserList(respone.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (token) {
      getListUsers();
    }
  }, [token, userList]);

  const createAccount = async () => {
    toast.warning("Đang tạo tài khoản", {
      autoClose: 3000,
      hideProgressBar: false,
    });
    console.log("Tạo tài khoản với:", selectedUser.employeeID);
    try {
      const data = {
        username: selectedUser.employeeID,
        role: role,
        createBy: userLoggedIn?.user.details.employeeName,
      };
      const response = await axios.post("/account/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      toast.success(response.data.message, {
        autoClose: 3000,
        hideProgressBar: false,
      });
      if (response.status == 201) {
        onAccountCreated();
        onClose();
        setRole("");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message, {
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  const handleCreateAccount = () => {
    // Xử lý tạo tài khoản mới
    createAccount();
    console.log("Tạo tài khoản với:", { selectedUser, role });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        Tạo Tài Khoản Mới
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginY: 2 }}>
          <Autocomplete
            options={userList}
            getOptionLabel={(option) =>
              `${option.employeeID} - ${option.employeeName}`
            }
            onChange={(event, newValue) => {
              setSelectedUser(newValue); // Cập nhật người dùng được chọn
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nhập mã hoặc tên để tìm kiếm người dùng"
                variant="outlined"
                fullWidth
              />
            )}
            // Tùy chọn để hiển thị kết quả tìm kiếm
            filterOptions={(options, { inputValue }) =>
              options.filter(
                (option) =>
                  option.employeeID
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                  option.employeeName
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
              )
            }
          />
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Chọn vai trò:
          </Typography>
          <TextField
            select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ marginTop: 1 }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="doctor">Bác sĩ</MenuItem>
            <MenuItem value="employee">Nhân Viên</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          onClick={handleCreateAccount}
          color="success"
          disabled={!selectedUser || !role} // Kích hoạt nút khi cả hai trường đều có giá trị
          sx={{
            backgroundColor: selectedUser && role ? "primary.main" : "grey.400",
            border: "1px solid", // Thêm viền
            borderColor: "primary.main", // Màu viền
            color: "white",
            "&:hover": {
              backgroundColor:
                selectedUser && role ? "primary.dark" : "grey.400",
            },
          }}
        >
          Tạo Tài Khoản
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAccount;
