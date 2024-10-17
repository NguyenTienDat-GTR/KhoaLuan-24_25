import { Box, Typography } from "@mui/material";
import React from "react";
import Bacsi1 from "../images/bac-si/bs1.png";
import Bacsi2 from "../images/bac-si/bs2.png";
import Bacsi3 from "../images/bac-si/bs3.png"

const DoctorContainer = () => {
  return (
    <Box
      className="doctor-container"
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%" }, // Responsive width
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "rgba(21,171,255,0.27)",
        mt: "1rem",
      }}
    >
      {/* Tiêu đề lớn */}
      <Typography
        sx={{
          fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" }, // Responsive font size
          fontWeight: "bold",
          padding: "1rem 1rem 0 0",
          color: "rgba(0, 98, 189, 1)",
          textAlign: "center", // Căn giữa text trên mobile
        }}
      >
        ĐỘI NGŨ CHUYÊN GIA & BÁC SĨ NHA KHOA HBT
      </Typography>

      {/* Đoạn mô tả */}
      <Typography
        sx={{
          fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" }, // Responsive font size
          color: "rgba(0, 98, 189, 1)",
          textAlign: "center", // Căn giữa đoạn text
        }}
      >
        Nha khoa HBT khao khát xây dựng đội ngũ nhân viên, y bác sĩ phục
        vụ tận tâm,
        <br />
        trách nhiệm đảm bảo an toàn và chuyên nghiệp trong từng dịch vụ
      </Typography>

      {/* Container chứa hình ảnh bác sĩ */}
      <Box
        className="doctor-image-container"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row", md: "row" }, // Mobile: Flex theo cột
          justifyContent: "space-around", // Chia đều khoảng cách giữa các ảnh trên tablet và desktop
          alignItems: "center",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        {[
          { name: "BS. Nguyễn Văn An", image: Bacsi1},
          { name: "BS. Nguyễn Anh Thi", image: Bacsi2 },
          { name: "BS. Nguyễn Thị Lan Anh", image: Bacsi3},
        ].map((doctor, index) => (
          <Box key={index} sx={{ margin: { xs: "1rem 0", sm: "0 1rem" } }}>
            {/* Ảnh bác sĩ */}
            <Box
              component="img"
              src={doctor.image}
              alt={doctor.name}
              sx={{
                width: { xs: "15rem", sm: "14.55rem", md: "20rem" }, // Responsive width
                height: { xs: "20rem", sm: "20rem", md: "25rem" }, // Responsive height
                borderRadius: "1.5rem",
              }}
            />
            {/* Tên bác sĩ */}
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" }, // Responsive font size
                fontWeight: "bold",
                padding: "1rem 0",
                textAlign: "center", // Căn giữa tên bác sĩ
                color: "rgba(0, 98, 189, 1)",
              }}
            >
              {doctor.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DoctorContainer;
