import { Box, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";

const Footer = () => {
  return (
    <Box
      className="container-footer"
      sx={{
        padding: "20px 0",
        textAlign: "center",
        fontSize: "15px",
        fontWeight: "bold",
        width: "100%",
      }}
    >
      <Box
        className="contact-container"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row", md: "row" },
          justifyContent: { xs: "center", sm: "space-evenly" },
          alignItems: "flex-start", // Căn chỉnh các phần tử con bắt đầu từ phía trên
          width: "100%",
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        {/* Liên hệ */}
        <Box className="content-container" sx={{ mb: { xs: "1rem", sm: 0 } }}>
          <Typography
            className="title"
            sx={{
              color: "rgba(0,120,233,1)",
              fontSize: { xs: "1.2rem", sm: "1.1rem", md: "1.5rem" },
              fontWeight: "bold",
              mb: "0.5rem",
            }}
          >
            Liên hệ
          </Typography>
          <Typography
            className="content"
            sx={{
              display: "flex",
              alignItems: "center", // Căn chỉnh các phần tử con theo chiều dọc
              fontSize: { xs: "1rem", sm: "0.9rem", md: "1.2rem" },
              lineHeight: "1.5rem", // Đặt line-height để căn chỉnh các biểu tượng với văn bản
            }}
          >
            <PhoneIcon sx={{ color: "rgba(0,120,233,1)", mr: "0.5rem" }} />
            0123456789
          </Typography>
        </Box>

        {/* Địa chỉ */}
        <Box className="content-container" sx={{ mb: { xs: "1rem", sm: 0 } }}>
          <Typography
            className="title"
            sx={{
              color: "rgba(0,120,233,1)",
              fontSize: { xs: "1.2rem", sm: "1.1rem", md: "1.5rem" },
              fontWeight: "bold",
              mb: "0.5rem",
            }}
          >
            Địa chỉ
          </Typography>
          <Typography
            className="content"
            sx={{
              display: "flex",
              alignItems: "center", // Căn chỉnh các phần tử con theo chiều dọc
              fontSize: { xs: "1rem", sm: "0.9rem", md: "1.2rem" },
              lineHeight: "1.5rem", // Đặt line-height để căn chỉnh các biểu tượng với văn bản
            }}
          >
            <LocationOnIcon sx={{ color: "rgba(0,120,233,1)", mr: "0.5rem" }} />
            12, đường Nguyễn Văn Bảo, phường 4, <br /> Quận Gò Vấp, TP. Hồ Chí
            Minh
          </Typography>
        </Box>

        {/* Giờ làm việc */}
        <Box className="content-container">
          <Typography
            className="title"
            sx={{
              color: "rgba(0,120,233,1)",
              fontSize: { xs: "1.2rem", sm: "1.1rem", md: "1.5rem" },
              fontWeight: "bold",
              mb: "0.5rem",
            }}
          >
            Giờ làm việc
          </Typography>
          <Typography
            className="content"
            sx={{
              display: "flex",
              alignItems: "center", // Căn chỉnh các phần tử con theo chiều dọc
              fontSize: { xs: "1rem", sm: "0.9rem", md: "1.2rem" },
              lineHeight: "1.5rem", // Đặt line-height để căn chỉnh các biểu tượng với văn bản
            }}
          >
            <AccessTimeIcon sx={{ color: "rgba(0,120,233,1)", mr: "0.5rem" }} />
            Thứ 2 – thứ 7: 08:00 – 19:30 <br /> Chủ nhật: 08:00 – 17:00
          </Typography>
        </Box>
      </Box>

      {/* Copyright container */}
      <Box
        className="coppyright-container"
        sx={{ mt: "1rem", color: "rgba(0,120,233,1)" }}
      >
        Copyright © 2024 Nha Khoa HOÀNG KIM - 12, đường Nguyễn Văn Bảo, phường
        4, Quận Gò Vấp
      </Box>
    </Box>
  );
};

export default Footer;
