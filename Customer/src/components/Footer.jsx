import React from "react";
import {
  Container,
  Grid,
  Typography,
  Link,
  Box,
  // Các component khác của Material-UI tùy theo thiết kế
} from "@mui/material";
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
// import Fontisto from '@expo/vector-icons/Fontisto';
const Footer = () => {
  return (
    <footer>
      <Container maxWidth="lg">
        <Box sx={{
          flex: 1,
          backgroundColor: "#59cbdf",
          width: "100vw",
          height: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1000,
          padding: { xs: "0.5rem", sm: "1rem", md: "1.5rem" },
          boxSizing: "border-box",
          gap: { sm: "2", md: "0" },
          marginLeft: "-200px",
        }}>

          <Box
            className="container-text"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%", md: "50%" }, // Giảm width của container-text
              height: { xs: "auto", sm: "15rem", md: "20rem" },
              mt: { xs: "2rem", sm: "0", md: "0" },
              // px: { xs: "1rem", sm: "0", md: "0" }, // Padding horizontal trên mobile
            }}
          >

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "80%",
                height: "auto",
                ml: { xs: "0", sm: "2rem", md: "2rem" },
              }}
            >

              <Typography
                sx={{
                  color: "#fff",
                  fontSize: {
                    xs: "1rem",
                    sm: "1rem",
                    md: "1.5rem",
                  },
                  fontWeight: "bold",
                }}
              >
                Thông tin liên hệ
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: "red",
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" },
                }}

              >
                NHA KHOA HOÀNG KIM
              </Typography>

              <Typography
                sx={{
                  width: "100%",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                    md: "1.2rem",
                  },
                }}
              >
                <p style={{ textAlign: 'justify', textIndent: "30px" }}>
                  <p></p>
                  <PinDropOutlinedIcon /> <b>Địa chỉ:</b>
                  <p></p>
                  <AccessTimeOutlinedIcon /> <b>Giờ làm việc:</b>
                  <p></p>
                  <PhoneInTalkOutlinedIcon /><b> Hotline:</b>
                  <p></p>
                  <EmailOutlinedIcon /> <b>Email:</b>
                  <p></p>
                  <LanguageOutlinedIcon /> <b>Website:</b>

                </p>

              </Typography>
            </Box>
          </Box>
          <Box
            className="container-text"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%", md: "50%" }, // Giảm width của container-text
              height: { xs: "auto", sm: "15rem", md: "25rem" },
              mt: { xs: "2rem", sm: "0", md: "0" },
              // px: { xs: "1rem", sm: "0", md: "0" }, // Padding horizontal trên mobile
            }}
          >

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "80%",
                height: "auto",
                ml: { xs: "0", sm: "2rem", md: "2rem" },
              }}
            >

              <Typography
                sx={{
                  color: "#fff",
                  fontSize: {
                    xs: "1rem",
                    sm: "1rem",
                    md: "1.5rem",
                  },
                  fontWeight: "bold",
                }}
              > CHÍNH SÁCH - HỖ TRỢ
              </Typography>
              <Typography
                sx={{
                  width: "100%",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                    md: "1.2rem",
                  },
                }}
              ><ul>
                  <p style={{ textAlign: 'justify' }}>

                    <li>
                      <a href="/" style={{ color: "#363134" }}>
                        Chính sách bảo mật thông tin khách hàng
                      </a> <br />
                    </li>

                    <li>
                      <a href="/" style={{ color: "#363134" }}>
                        Chính sách bảo hành các dịch vụ
                        </a>
                    </li>
                    <li>
                      <a href="/" style={{ color: "#363134" }}>
                        Chính sách thanh toán</a>
                    </li>
                    <li>
                      <a href="/" style={{ color: "#363134" }}>
                        Giấy phép hoạt động</a>
                    </li>
                    <li>
                      <a href="/" style={{ color: "#363134" }}>
                        Hướng dẫn đặt lịch hẹn</a>
                    </li>

                  </p>
                </ul>
              </Typography>
            </Box>
          </Box>
          <Box
            className="container-text"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%", md: "50%" }, // Giảm width của container-text
              height: { xs: "auto", sm: "15rem", md: "20rem" },
              mt: { xs: "2rem", sm: "0", md: "0" },
              // px: { xs: "1rem", sm: "0", md: "0" }, // Padding horizontal trên mobile
            }}
          >

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "80%",
                height: "auto",
                ml: { xs: "0", sm: "2rem", md: "2rem" },
              }}
            >

              <Typography
                sx={{
                  color: "#FFF",
                  fontSize: {
                    xs: "1rem",
                    sm: "1rem",
                    md: "1.5rem",
                  },
                  fontWeight: "bold",
                }}
              >
                LIÊN KẾT MẠNG XÃ HỘI
              </Typography>
              <Typography
                sx={{
                  width: "100%",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                    md: "1.2rem",
                  },
                }}
              >
                <FacebookOutlinedIcon />

              </Typography>
              <Typography
                sx={{
                  color: "#FFF",
                  fontSize: {
                    xs: "1rem",
                    sm: "1rem",
                    md: "1.5rem",
                  },
                  fontWeight: "bold",
                }}
              >
                ĐỐI TÁC THANH TOÁN
              </Typography>
              <Typography
                sx={{
                  width: "100%",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                    md: "1.2rem",
                  },
                }}
              >

                <FacebookOutlinedIcon />

              </Typography>
            </Box>
          </Box>
        </Box>

        <Box mt={3}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            {new Date().getFullYear()}
            {" Nha Khoa HOÀNG KIM - "}
            <Link color="inherit" href="/">
              12, đường Nguyễn Văn Bảo, phường 4, Quận Gò Vấp
            </Link>
          </Typography>
        </Box>
      </Container >
    </footer >
  );
};

export default Footer;
