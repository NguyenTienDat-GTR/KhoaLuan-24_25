import React, { useState } from "react";
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

const users = [
  { id: "AC001", name: "Nguyễn Văn A" },
  { id: "AC002", name: "Trần Thị B" },
  { id: "AC003", name: "Lê Văn C" },
];

const CreateAccount = ({ open, onClose }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("");

  const handleCreateAccount = () => {
    // Xử lý tạo tài khoản mới
    console.log("Tạo tài khoản với:", { selectedUser, role });
    onClose(); // Đóng dialog sau khi tạo tài khoản
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        Tạo Tài Khoản Mới
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginY: 2 }}>
          <Autocomplete
            options={users}
            getOptionLabel={(option) => `${option.id} - ${option.name}`}
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
                  option.id.toLowerCase().includes(inputValue.toLowerCase()) ||
                  option.name.toLowerCase().includes(inputValue.toLowerCase())
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
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">Bác sĩ</MenuItem>
            <MenuItem value="Staff">Nhân Viên</MenuItem>
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
