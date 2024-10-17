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
import logo from "../components/images/phong-kham/logo.png";

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
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { sm: "2", md: "0" },
          marginX: { xs: "0", sm: "0", md: "0" },
          paddingY: { xs: "1rem", sm: "2rem", md: "2rem" },
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
            width: { xs: "100%", sm: "30%", md: "35%" },
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
              THÔNG TIN LIÊN HỆ
            </Typography>

            <Typography
              variant="h4"
              sx={{
                color: "red",
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" },
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                  width: { xs: "3rem", sm: "3.5rem", md: "4.5rem" },
                  marginRight: { xs: "0.5rem", sm: "1rem" },
                }}
              />
              NHA KHOA HBT
            </Typography>

            <Box
              sx={{
                width: "100%",
                fontSize: {
                  xs: "0.8rem",
                  sm: "1rem",
                  md: "1.2rem",
                },
                textAlign: "justify",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <PinDropOutlinedIcon /> <strong>Địa chỉ:</strong>
                <Typography
                  sx={{
                    flex: 1,
                  }}
                >
                  877 Tân Kỳ Tân Quý, Phường Bình Hưng Hoà A, Quận Bình Tân, Tp.Hồ Chí Minh
                </Typography>
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <AccessTimeOutlinedIcon /> <strong>Giờ làm việc:</strong>
                <Typography
                  sx={{
                    flex: 1,
                  }}
                >
                  9:00 AM - 5:00 PM
                </Typography>
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <PhoneInTalkOutlinedIcon />
                <strong> Hotline:</strong>
                <Typography
                  sx={{
                    flex: 1,
                  }}
                >
                  0906070338
                </Typography>
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <EmailOutlinedIcon /> <strong>Email:</strong>
                <Typography
                  sx={{
                    flex: 1,
                  }}
                >
                  phongkhamnhakhoahbt@gmail.com
                </Typography>
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <LanguageOutlinedIcon /> <strong>Website:</strong>
                <Typography
                  sx={{
                    flex: 1,
                  }}
                >
                  www.nhakhoahbt.com
                </Typography>
              </Typography>
            </Box>
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
            height: { xs: "auto", sm: "auto", md: "auto" },
            mt: { xs: "2rem", sm: "0", md: "0" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
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

      {/* Google Maps Section */}
      <Box
        sx={{
          width: "100vw",
          height: "400px",
          margin: "2rem 0",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.276222213822!2d106.6030617!3d10.7901435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ddcd606f70d%3A0x2110af5b7e1538f!2sNha%20Khoa%20HBT!5e0!3m2!1svi!2s!4v1728461171449!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </Box>

      <Box
        mt={3}
        sx={{
          textAlign: "center",
          width: { xs: "100vw", sm: "100vw", md: "100vw" },
        }}
      >
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          {new Date().getFullYear()}
          {" Nha Khoa HBT - "}
          <Link color="inherit" href="/">
            877 Tân Kỳ Tân Quý, Phường Bình Hưng Hoà A, Quận Bình Tân, Tp.Hồ Chí Minh
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
