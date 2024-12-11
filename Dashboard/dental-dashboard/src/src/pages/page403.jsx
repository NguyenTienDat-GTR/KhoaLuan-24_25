import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

const Page403 = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#1a237e', // Màu nền đậm
                color: '#fff', // Font chữ màu trắng
                textAlign: 'center',
                p: 3,
                backgroundImage: 'url(https://source.unsplash.com/1600x900/?security,lock)', // URL hình nền
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    backdropFilter: 'blur(10px)', // Làm mờ nền
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Màu tối nhẹ
                    padding: 5,
                    borderRadius: 3,
                }}
            >
                <ErrorOutlineIcon sx={{ fontSize: 120, color: '#ff1744', mb: 3 }} /> {/* Màu đỏ nổi bật */}
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    403 - Forbidden
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Xin lỗi, bạn không có quyền truy cập vào trang này.
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => navigate('/dashboard/tong-quan')}
                    sx={{
                        bgcolor: '#ff1744',
                        '&:hover': {
                            bgcolor: '#d50000', // Màu khi hover
                        },
                    }}
                >
                    Trở về trang chủ
                </Button>
            </Box>
        </Box>
    );
};

export default Page403;
