import React from "react";
import {
  Container,
  Grid,
  Typography,
  Link,
  Box,
  List,
  ListItem,
} from "@mui/material";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

const Footer = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        width: { xs: "100vw", sm: "100vw", md: "100vw" },
        margin: "2rem 0",
        padding: { xs: "0", sm: "0", md: "0" },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#59cbdf",
          width: "100vw",
          height: "auto",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Column on mobile, row on tablet and desktop
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" }, // Align items for mobile and larger screens
          gap: { sm: "2", md: "0" },
          marginX: { xs: "0", sm: "0", md: "0" },
        }}
      >
        {/* Contact Section */}
        <Box
          className="container-contact"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", sm: "30%", md: "35%" }, // Adjust widths for mobile/tablet/desktop
            height: { xs: "auto", sm: "auto", md: "auto" },
            mt: { xs: "2rem", sm: "0", md: "0" },
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
                textAlign: "justify",
                textIndent: "30px",
              }}
            >
              <PinDropOutlinedIcon /> <strong>Địa chỉ:</strong>
              <AccessTimeOutlinedIcon /> <strong>Giờ làm việc:</strong>
              <PhoneInTalkOutlinedIcon />
              <strong> Hotline:</strong>
              <EmailOutlinedIcon /> <strong>Email:</strong>
              <LanguageOutlinedIcon /> <strong>Website:</strong>
            </Typography>
          </Box>
        </Box>

        {/* Policy Section */}
        <Box
          className="container-policy"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", sm: "30%", md: "30%" },
            height: { xs: "auto", sm: "15rem", md: "25rem" },
            mt: { xs: "2rem", sm: "0", md: "0" },
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
              CHÍNH SÁCH - HỖ TRỢ
            </Typography>

            <List>
              <Typography
                sx={{
                  width: "100%",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                    md: "1.2rem",
                  },
                  textAlign: "justify",
                }}
              >
                <ListItem>Chính sách bảo mật thông tin khách hàng</ListItem>
                <ListItem>Chính sách bảo hành các dịch vụ</ListItem>
                <ListItem>Chính sách thanh toán</ListItem>
                <ListItem>Giấy phép hoạt động</ListItem>
                <ListItem>Hướng dẫn đặt lịch hẹn</ListItem>
              </Typography>
            </List>
          </Box>
        </Box>

        {/* Social Section */}
        <Box
          className="container-social"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", sm: "30%", md: "30%" },
            height: { xs: "auto", sm: "15rem", md: "20rem" },
            mt: { xs: "2rem", sm: "0", md: "0" },
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
    </Container>
  );
};

export default Footer;
