import React, {useEffect, useState} from "react";
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
    RadioGroup,
    FormControlLabel,
    Radio,
    IconButton,
    Tooltip,
} from "@mui/material";
import {LockReset} from "@mui/icons-material";
import axios from "../../config/axiosConfig.js";
import {toast} from 'react-toastify';
import useUserStore from "../../hooks/auth/useUserStore.jsx";

// Ánh xạ role tiếng Anh sang tiếng Việt
const roleMap = {
    admin: "Admin",
    doctor: "Bác sĩ",
    employee: "Nhân viên",
};

// Chuyển đổi vai trò từ tiếng Việt sang tiếng Anh để gửi lên server
const roleMapReverse = {
    Admin: "admin",
    "Bác sĩ": "doctor",
    "Nhân viên": "employee",
};

const roles = ["Admin", "Bác sĩ", "Nhân viên"];
const statuses = ["Active", "Inactive"];

const EditAccount = ({open, onClose, account, onUpdate}) => {
    const [role, setRole] = useState(roleMap[account?.role]); // Chuyển role từ model sang tiếng Việt
    const [status, setStatus] = useState(
        account?.isActive ? "Active" : "Inactive"
    );
    const [isChanged, setIsChanged] = useState(false);

    const {token} = useUserStore()

    useEffect(() => {
        setRole(roleMap[account?.role]);
        setStatus(account?.isActive ? "Active" : "Inactive");
    }, [account]);

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        setIsChanged(true);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setIsChanged(true);
    };

    const handleResetPassword = () => {
        console.log(`Reset password for ${account.username}`);
        onClose();
    };


    const handleUpdate = () => {
            const updatedRole = roleMapReverse[role];
            const updatedAccount = {username: account.username, role: updatedRole, isActive: status === "Active"};
            axios.put('/account/update', updatedAccount, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(response => {
                    toast.success('Cập nhật thành công:', response.data);
                    onUpdate(response.data.account); // Gửi dữ liệu đã cập nhật về parent component
                    onClose();
                })
                .catch(error => {
                    toast.error('Lỗi khi cập nhật tài khoản!');
                    console.error('Lỗi khi cập nhật tài khoản:', error.response?.data?.message || error.message);
                });
        }
    ;


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{fontWeight: "bold", textAlign: "center"}}>
                Chỉnh sửa tài khoản
            </DialogTitle>
            <DialogContent>
                <Box sx={{marginBottom: 2}}>
                    <Typography variant="body1" sx={{fontWeight: "bold"}}>
                        Mã: {account?.employeeID}
                    </Typography>
                    <Typography variant="body1" sx={{fontWeight: "bold"}}>
                        Họ tên: {account?.employeeName}
                    </Typography>
                    <Typography variant="body1" sx={{fontWeight: "bold"}}>
                        Tên tài khoản: {account?.username}
                    </Typography>
                </Box>

                <Box sx={{marginTop: 2}}>
                    <Typography variant="body1" sx={{fontWeight: "bold"}}>
                        Chọn vai trò:
                    </Typography>
                    <TextField
                        select
                        value={role}
                        onChange={handleRoleChange}
                        fullWidth
                        variant="outlined"
                        sx={{marginTop: 1}}
                    >
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Box sx={{marginTop: 2}}>
                    <Typography variant="body1" sx={{fontWeight: "bold"}}>
                        Trạng thái tài khoản:
                    </Typography>
                    <RadioGroup value={status} onChange={handleStatusChange}>
                        {statuses.map((status) => (
                            <FormControlLabel
                                key={status}
                                value={status}
                                control={<Radio/>}
                                label={status}
                            />
                        ))}
                    </RadioGroup>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleResetPassword}
                    startIcon={<LockReset/>}
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
