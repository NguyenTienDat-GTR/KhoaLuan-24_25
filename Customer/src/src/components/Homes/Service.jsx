import { Box, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import React from "react";
import ChinhNhaTreEm from "../images/chinh_nha_tre_em.jpg";
import NhaChu from "../Services/img/benh/nha-chu.jpg";
import RangSuMy from "../images/rang-su-tham-my.jpg";
import NiengRangMacCai from "../images/nieng-rang-mac-cai.jpg";
import DanSuVeneer from "../images/dan-su-venner.jpg"

const services = [
  {
    title: "Điều trị nha chu",
    image: NhaChu,
    path: "/service/67338dae41275c60e13391eb", // Đường dẫn đến trang dịch vụ tương ứng
  },
  {
    title: "Răng sứ kim loại Mỹ",
    image: RangSuMy,
    path: "service/67346c6539b92e36966d0e90",
  },
  {
    title: "Niềng răng mắc cài",
    image:NiengRangMacCai,
    path: "/service/673362876223f9952a49243c",
  },
  {
    title: "Dán sứ Veneer",
    image: DanSuVeneer,
    path: "/service/673373c241275c60e13282f4",
  },
];

const Service = () => {
  return (
    <Box
      className="container"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: {
          xs: "space-evenly",
          sm: "space-between",
          md: "center",
        },
        gap: { xs: "1rem", sm: "1rem", md: "2rem" },
        width: { xs: "auto", sm: "96.3vw", md: "90%" },
        margin: { xs: "0 auto", sm: "1rem 0", md: "3rem auto" },
        padding: "1rem",
      }}
    >
      {services.map((service, index) => (
        <Link
          to={service.path} // Chuyển hướng đến đường dẫn tương ứng khi nhấp vào
          style={{ textDecoration: 'none', color: 'inherit' }} // Đảm bảo không có đường gạch chân
          key={index}
        >
          <Box
            className="container-card"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "rgba(25,144,255,0.26)",
              borderRadius: "2rem",
              height: { xs: "10rem", sm: "15rem", md: "20rem" },
              width: { xs: "8rem", sm: "9rem", md: "15rem" },
              padding: "1rem",
              transition: 'transform 0.2s', // Hiệu ứng chuyển động
              '&:hover': {
                transform: 'scale(1.05)', // Phóng to khi di chuột
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{
                height: { xs: "8rem", sm: "12rem", md: "17rem" },
                width: "100%",
              }}
              image={service.image}
              alt={service.title}
            />
            <Typography
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              {service.title}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Service;
