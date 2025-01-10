import React, {useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, IconButton,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import useUserStore from '../hooks/auth/useUserStore.jsx';
import axios from "../config/axiosConfig"
import {toast} from "react-toastify";
import {Visibility, VisibilityOff} from '@mui/icons-material';

const AccountInfo = () => {
    const {token, userLoggedIn} = useUserStore();
    const userDetails = userLoggedIn.user;

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);

    return (
        <Box sx={{paddingY: 6, paddingX: 0.5}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', marginBottom: 2}}>
                Thông tin tài khoản
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    width: '20%',
                    justifyContent: 'center',
                    border: 1,
                    borderRadius: '1rem',
                    paddingY: '2rem',
                    ml: '35%',
                    padding: '2rem',
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 1,
                    }}
                >
                    <Typography>
                        Tên tài khoản: <strong>{userDetails.username}</strong>
                    </Typography>
                    <Typography>
                        Vai trò:{' '}
                        <strong>
                            {userDetails.role === 'admin'
                                ? 'Admin'
                                : userDetails.role === 'doctor'
                                    ? 'Bác sĩ'
                                    : 'Nhân viên'}
                        </strong>
                    </Typography>
                    <Typography>
                        Trạng thái:{' '}
                        <strong>
                            {userDetails.isActive ? 'Đang hoạt động' : 'Vô hiệu hóa'}
                        </strong>
                    </Typography>
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{mt: 1}}
                        onClick={handleOpenDialog}
                    >
                        Thay đổi mật khẩu
                    </Button>
                </Box>
            </Box>

            {/* Dialog Thay Đổi Mật Khẩu */}
            <ChangePasswordDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                username={userDetails.username}
            />
        </Box>
    );
};

const ChangePasswordDialog = ({open, onClose, username}) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const {token, userLoggedIn} = useUserStore();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleToggleVisibility = (field) => {
        switch (field) {
            case 'oldPassword':
                setShowOldPassword(!showOldPassword);
                break;
            case 'newPassword':
                setShowNewPassword(!showNewPassword);
                break;
            case 'confirmPassword':
                setShowConfirmPassword(!showConfirmPassword);
                break;
            default:
                break;
        }
    };

    const handleChangePassword = async () => {
        if (newPassword.length < 6) {
            setErrorMessage('Mật khẩu mới phải có ít nhất 6 ký tự');
            return;
        }

        // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp không
        if (newPassword !== confirmPassword) {
            setErrorMessage('Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }

        try {
            setLoading(true)
            // Gọi API đổi mật khẩu
            const response = await axios.put(
                '/auth/change-password',
                {
                    username,
                    oldPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(response.data.message); // Hiển thị thông báo
            onClose(); // Đóng dialog nếu thành công
        } catch (error) {
            // Xử lý lỗi
            setErrorMessage(
                error.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại'
            );
        } finally {
            setLoading(false)
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Thay Đổi Mật Khẩu</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="Mật khẩu cũ"
                        type={showOldPassword ? 'text' : 'password'}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => handleToggleVisibility('oldPassword')}
                                        edge="end"
                                    >
                                        {showOldPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Mật khẩu mới"
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => handleToggleVisibility('newPassword')}
                                        edge="end"
                                    >
                                        {showNewPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Xác nhận mật khẩu mới"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => handleToggleVisibility('confirmPassword')}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {errorMessage && (
                        <Typography color="error" variant="body2">
                            {errorMessage}
                        </Typography>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                {!loading ?
                    <>
                        <Button onClick={onClose} color="error">
                            Hủy
                        </Button>
                        <Button onClick={handleChangePassword} variant="contained" color="primary">
                            Lưu
                        </Button>
                    </> : (
                        <Typography>Đang thay đổi mật khẩu....</Typography>
                    )}
            </DialogActions>
        </Dialog>
    );
};

export default AccountInfo;
