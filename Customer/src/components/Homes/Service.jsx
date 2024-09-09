import { Box, CardMedia, Typography } from "@mui/material";
import React from "react";

const Service = () => {
  return (
    <Box
      className="container"
      sx={{
        display: "flex",
        flexWrap: "wrap", // Đảm bảo các phần tử sẽ tự động xuống dòng khi hết chiều ngang
        justifyContent: {
          xs: "space-evenly",
          sm: "space-between",
          md: "center",
        }, // Căn chỉnh cho các kích thước màn hình khác nhau
        gap: { xs: "1rem", sm: "1rem", md: "2rem" }, // Khoảng cách giữa các thẻ card
        width: { xs: "auto", sm: "96.3vw", md: "90%" }, // Độ rộng thay đổi theo màn hình
        margin: { xs: "0 auto", sm: "1rem 0", md: "3rem auto" }, // Margin tùy biến theo màn hình
        padding: "1rem",
      }}
    >
      {[
        "Chỉnh nha trẻ em",
        "Răng sứ thẩm mỹ",
        "Niềng răng mắc cài",
        "Dán sứ Veneer",
      ].map((title, index) => (
        <Box
          key={index}
          className="container-card"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "rgba(25,144,255,0.26)",
            borderRadius: "2rem",
            height: { xs: "10rem", sm: "15rem", md: "20rem" }, // Responsive height
            width: { xs: "8rem", sm: "9rem", md: "15rem" }, // Responsive width
            padding: "1rem",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              height: { xs: "8rem", sm: "12rem", md: "17rem" }, // Responsive height for images
              width: "100%",
            }}
            image={`https://picsum.photos/100?random=${index}`} // Random image for example
            alt={title}
          />
          <Typography
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
            }}
          >
            {title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Service;
