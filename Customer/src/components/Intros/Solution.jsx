import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Solution = () => {
  return (
    <Box>
      {/* Container tổng cho các hình ảnh */}
      <Box
        className="container"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // 1 cột trên mobile, 2 cột trên tablet và desktop
          flexWrap: "wrap", // Tự động xuống dòng nếu không đủ chỗ
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          mt: "1rem",
          width: { xs: "100vw", sm: "100vw", md: "100vw" }, // 100% trên mobile, 90% trên tablet, 80
        }}
      >
        {/* Mỗi Box này sẽ chứa 1 hình ảnh */}
        {[
          "Răng Sứ Thẩm Mỹ",
          " Trồng răng Implant",
          "Niềng răng - Chỉnh nha",
          "Điều trị tổng quát",
        ].map((item, index) => (
          <Box
            key={index}
            className="container-image"
            sx={{
              position: "relative",
              width: { xs: "90%", sm: "45%", md: "45%" }, // 90% trên mobile, 45% trên tablet và desktop
              height: { xs: "17rem", sm: "20rem", md: "27rem" }, // Điều chỉnh chiều cao tùy theo thiết bị
              mx: "auto", // Canh giữa các hình ảnh
            }}
          >
            {/* Hình ảnh */}
            <Box
              component="img"
              src={`https://picsum.photos/600?random=${item}`}
              alt={`Ảnh ${item}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Giữ tỉ lệ ảnh, cắt phần dư
              }}
            />

            {/* Tiêu đề trên ảnh */}
            <Box
              sx={{
                position: "absolute",
                top: "40%", // Vị trí trên ảnh
                left: "10%",
                color: "red",
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: "bold",
              }}
            >
              {item}
            </Box>

            {/* Nút Button trên ảnh */}
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
