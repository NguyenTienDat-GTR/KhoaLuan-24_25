import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { LockReset } from "@mui/icons-material";

const roles = ["Admin", "Bác sĩ", "Nhân viên"];

const EditAccount = ({ open, onClose, account, onUpdate }) => {
  const [role, setRole] = useState(account?.role);
  const [isChanged, setIsChanged] = useState(false);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setIsChanged(true);
  };

  const handleResetPassword = () => {
    // Handle password reset logic here
    console.log(`Reset password for ${account.username}`);
    onClose();
  };

  const handleUpdate = () => {
    onUpdate({ ...account, role }); // Update with new role
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        Chỉnh sửa tài khoản
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Mã: {account?.code}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Họ tên: {account?.name}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Tên tài khoản: {account?.username}
          </Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Chọn vai trò:
          </Typography>
          <TextField
            select
            value={role}
            onChange={handleRoleChange}
            fullWidth
            variant="outlined"
            sx={{ marginTop: 1 }}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleResetPassword}
          startIcon={<LockReset />}
          sx={{
            backgroundColor: "#f44336",
            color: "white",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
        >
          Đặt lại mật khẩu
        </Button>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: "#e0e0e0",
            color: "black",
            "&:hover": {
              backgroundColor: "#bdbdbd",
            },
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={handleUpdate}
          color="primary"
          disabled={!isChanged}
          sx={{
            backgroundColor: "#3f51b5",
            color: "white",
            "&:hover": {
              backgroundColor: "#303f9f",
            },
          }}
        >
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAccount;
