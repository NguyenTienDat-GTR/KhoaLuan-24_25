import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import rang3 from "..//images/intro/rs.jpg";
import rang4 from "../Services/img/nieng-rang/thao-lap.jpg";
import rang5 from "..//images/intro/NRCN.png";
import rang6 from "..//images/intro/NKTQ.png";

const Solution = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Răng Sứ Kim Loại Đức",
      image: rang3,
      route: "/service/67346dcd39b92e36966d25c8",
    },
    {
      title: "Hàm Giả Tháo Lắp",
      image: rang4,
      route: "/service/6733910c41275c60e1339212",
    },
    {
      title: "Niềng răng - Chỉnh nha",
      image: rang5,
      route: "/service/67335e896223f9952a4923ed",
    },
    {
      title: "Điều trị tổng quát",
      image: rang6,
      route: "/service/67335b70c6381088e7b983ab",
    },
  ];

  return (
    <Box>
      <Box
        className="container"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          mt: "1rem",
          width: { xs: "100vw", sm: "100vw", md: "100vw" },
        }}
      >
        {services.map((service, index) => (
          <Box
            key={index}
            className="container-image"
            sx={{
              position: "relative",
              width: { xs: "90%", sm: "45%", md: "45%" },
              height: { xs: "17rem", sm: "20rem", md: "27rem" },
              mx: "auto",
            }}
          >
            <Box
              component="img"
              src={service.image}
              alt={`Ảnh ${service.title}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: "40%",
                left: "10%",
                color: "red",
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: "bold",
              }}
            >
              {service.title}
            </Box>

            <Button
              variant="contained"
              sx={{
                position: "absolute",
                top: "60%",
                left: "10%",
                backgroundColor: "#1976d2",
                color: "white",
                padding: "0.5rem 1.5rem",
                fontSize: "1rem",
              }}
              onClick={() => navigate(service.route)}
            >
              Xem Chi Tiết
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Solution;
