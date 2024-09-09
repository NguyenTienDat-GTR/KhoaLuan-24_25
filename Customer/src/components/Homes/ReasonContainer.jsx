import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

const reasons = [
  {
    img: "https://picsum.photos/240/160?random=1",
    texts: [
      "Đội ngũ bác sĩ chuyên nghiệp",
      "Được đào tạo bài bản-Chuyên sâu",
      "Hàng ngàn khách hàng tin tưởng & lựa chọn mỗi năm",
    ],
  },
  {
    img: "https://picsum.photos/240/160?random=2",
    texts: [
      "Chúng tôi cam kết chất lượng dịch vụ dành cho khách hàng",
      "Chế độ bảo hành cũng như giải quyết khiếu nại ở mức cao nhất",
    ],
  },
  {
    img: "https://picsum.photos/240/160?random=3",
    texts: ["Chăm sóc tận tình", "Hỗ trợ 24/7", "Phục vụ chu đáo mọi nhu cầu"],
  },
  {
    img: "https://picsum.photos/240/160?random=4",
    texts: [
      "Giá cả hợp lý",
      "Không phát sinh chi phí",
      "Nhiều gói dịch vụ phù hợp",
    ],
  },
];

const ReasonContainer = () => {
  return (
    <Box
      className="container"
      sx={{
        width: "100%",
        height: "auto",
        mt: "1rem",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: { xs: "wrap", md: "nowrap" },
        alignItems: "stretch", // Các content sẽ có cùng chiều cao
        gap: "1rem",
      }}
    >
      {reasons.map((reason, index) => (
        <Box
          key={index}
          className="content"
          sx={{
            width: { xs: "100%", sm: "45%", md: "20%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start", // Nội dung text sẽ nằm ở đầu content
            alignItems: "center",
            padding: "1rem",
            mb: { xs: "0.5rem", sm: "0" },
            flexGrow: 1, // Giúp các content kéo dài theo chiều cao
          }}
        >
          <Box
            component="img"
            src={reason.img}
            alt={`reason ${index + 1}`}
            sx={{
              width: { xs: "90%", sm: "100%", md: "18rem" },
              height: { xs: "auto", sm: "9rem", md: "10rem" },
              mb: "1rem",
            }}
          />
          <Box
            className="text"
            sx={{
              width: { xs: "90%", sm: "80%", md: "90%" },
              textAlign: { xs: "left", md: "center" },
            }}
          >
            {reason.texts.map((text, textIndex) => (
              <Box
                key={textIndex}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  mb: "0.5rem",
                }}
              >
                <CheckCircleIcon sx={{ color: "rgba(0,101,159,1)" }} />
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", sm: "0.9rem", md: "1rem" },
                    color: "rgba(23,26,31,1)",
                    textAlign: "left",
                  }}
                >
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ReasonContainer;
