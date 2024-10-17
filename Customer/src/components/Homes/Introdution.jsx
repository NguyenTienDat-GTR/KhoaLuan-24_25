import React from "react";
import { Box, Typography } from "@mui/material";
import rangThua from '../images/rang-thua.png';
import rangMom from '../images/rang-mom.png';
import rangVau from '../images/rang-vau.png';
import rangKhapKhenh from '../images/rang-khap-khenh.png';

const Introdution = () => {
  return (
    <Box
      className="container"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: { xs: "column", sm: "row", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        mt: { xs: "none", sm: "1rem", md: "1rem" },
        gap: "2rem",
        width: { xs: "100%", sm: "100vw", md: "100%" },
      }}
    >
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
            width: "70%",
            height: "auto",
            ml: { xs: "0", sm: "2rem", md: "2rem" },
          }}
        >
          <Typography
            sx={{
              color: "rgba(0,120,233,1)",
              fontSize: {
                xs: "1rem",
                sm: "1rem",
                md: "1.5rem",
              },
              fontWeight: "bold",
            }}
          >
            Khắc phục mọi tình trạng răng
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
            Với phác đồ điều trị chuẩn xác từ các bác sĩ của nha khoa Hoàng Kim
            cùng công nghệ chuẩn đoán hình ảnh, thiết kế nụ cười có độ chính xác
            98% sẽ giúp bạn khắc phục mọi vấn đề của răng miệng
          </Typography>
        </Box>
      </Box>
      <Box
        className="container-image"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(2, 1fr)" },
          gridRowGap: { xs: "1rem", sm: "1rem", md: "1rem" },
          width: { xs: "100%", sm: "50%", md: "50%" },
          height: "auto",
          mr: { xs: "0", sm: "3rem", md: "2rem" },
        }}
      >
        <Box
          component="img"
          src={rangThua}
          alt="răng thưa"
          sx={{
            width: { xs: "80%", sm: "90%", md: "90%" }, // Giảm width của ảnh
            height: { xs: "10rem", sm: "10rem", md: "15rem" },
            objectFit: "cover",
            mx: "auto", // Canh giữa ảnh
          }}
        ></Box>
         
        <Box
          component="img"
          src={rangVau}
          alt="răng vầu"
          sx={{
            width: { xs: "80%", sm: "90%", md: "90%" }, // Giảm width của ảnh
            height: { xs: "10rem", sm: "10rem", md: "15rem" },
            objectFit: "cover",
            mx: "auto", // Canh giữa ảnh
          }}
        />
        <Box
          component="img"
          src={rangMom}
          alt="răng móm"
          sx={{
            width: { xs: "80%", sm: "90%", md: "90%" }, // Giảm width của ảnh
            height: { xs: "10rem", sm: "10rem", md: "15rem" },
            objectFit: "cover",
            mx: "auto", // Canh giữa ảnh
          }}
        />
        <Box
          component="img"
          src={rangKhapKhenh}
          alt="răng khấp khểnh"
          sx={{
            width: { xs: "80%", sm: "90%", md: "90%" }, // Giảm width của ảnh
            height: { xs: "10rem", sm: "10rem", md: "15rem" },
            objectFit: "cover",
            mx: "auto", // Canh giữa ảnh
          }}
        />
      </Box>
    </Box>
  );
};

export default Introdution;
