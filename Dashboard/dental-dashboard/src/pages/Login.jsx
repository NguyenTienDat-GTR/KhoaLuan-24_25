import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  FormControl,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

const FullScreenContainer = styled(Box)({
  display: "flex",
  height: "100vh", // Chiều cao toàn màn hình
});

const BackgroundBox = styled(Box)({
  flex: 1, // Chiếm 50% chiều rộng
  backgroundImage:
    "url('https://cdn.pixabay.com/photo/2023/12/12/09/03/dental-8444852_1280.png')", // Đường dẫn đến hình ảnh nền nha khoa
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const LoginContainer = styled(Box)({
  flex: 1, // Chiếm 50% chiều rộng
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(84,181,224, 1)",
});

const LoginPaper = styled(Paper)({
  padding: "2rem",
  maxWidth: "400px",
  width: "100%",
  textAlign: "center",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)", // Hiệu ứng làm mờ nền phía sau form
  backgroundColor: "rgba(255, 255, 255, 1)", // Đặt màu nền trong suốt một chút để form nổi bật trên hình nền
});

const StyledFormControl = styled(FormControl)({
  width: "100%", // Đặt chiều rộng của FormControl bằng với chiều rộng của Paper
  marginBottom: "1rem", // Khoảng cách giữa các trường
});

const Login = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const { login } = useAuth(); // Lấy hàm login từ context

  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    // Xử lý xác thực ở đây nếu cần thiết
    login();
    navigate("/dashboard/tong-quan"); // Chuyển hướng đến trang tổng quan
  };

  return (
    <FullScreenContainer className="fullscreen-container">
      {/* Cột chứa hình nền bên trái */}
      <BackgroundBox className="BackgroundBox" />

      {/* Cột chứa form đăng nhập bên phải */}
      <LoginContainer className="LoginContainer">
        <LoginPaper elevation={3}>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Đăng nhập HBT
          </Typography>
          <form onSubmit={handleSubmit}>
            <StyledFormControl>
              <TextField
                required
                id="username"
                label="Tên đăng nhập"
                name="username"
                autoComplete="username"
                autoFocus
              />
            </StyledFormControl>
            <StyledFormControl>
              <TextField
                required
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </StyledFormControl>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Đăng nhập
            </Button>
          </form>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Quên mật khẩu? <a href="#">Nhấn vào đây</a>
          </Typography>
        </LoginPaper>
      </LoginContainer>
    </FullScreenContainer>
  );
};

export default Login;
