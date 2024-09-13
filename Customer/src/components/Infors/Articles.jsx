import React, { useState } from "react";
import { Box, Button, Pagination, Typography } from "@mui/material";

const itemsPerPage = 9;

const data = Array.from({ length: 108 }, (_, index) => ({
  id: index + 1,
  title: `Tiêu đề ${index + 1}`,
  content: `Nội dung - ${index % 2 === 0 ? "2 dòng" : "3 dòng"}`,
}));

const Acticles = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        width: { xs: "100vw", sm: "100vw", md: "100vw" },
      }}
    >
      {/* Flexbox layout */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Cho phép các phần tử xuống dòng khi không đủ không gian
          gap: "1.5rem", // Khoảng cách giữa các phần tử
          justifyContent: "center", // Căn giữa các phần tử theo chiều ngang
          width: { xs: "100vw", sm: "100vw", md: "100vw" },
        }}
      >
        {currentData.map((item) => (
          <Box
            key={item.id}
            sx={{
              flexBasis: { xs: "100%", sm: "25%", md: "25%" }, // Định nghĩa kích thước mỗi phần tử dựa trên màn hình
              maxWidth: { xs: "100%", sm: "25%", md: "25%" },
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
              padding: "1rem",
              backgroundColor: "#f9f9f9",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            {/* Hình ảnh */}
            <Box
              sx={{
                width: "100%",
                height: { xs: "120px", sm: "150px" },
                backgroundColor: "#e0e0e0",
                marginBottom: "1rem",
              }}
            >
              <Box
                component="img"
                src="https://picsum.photos/390/150"
                alt={item.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Tiêu đề */}
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              {item.title}
            </Typography>

            {/* Nội dung */}
            <Typography
              variant="body2"
              sx={{
                marginBottom: "1rem",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              {item.content}
            </Typography>

            {/* Nút xem chi tiết */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                padding: { xs: "0.5rem 1rem", sm: "0.75rem 1.5rem" },
              }}
            >
              Xem Chi Tiết
            </Button>
          </Box>
        ))}
      </Box>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="primary"
          siblingCount={0}
          boundaryCount={1}
          size="small"
        />
      </Box>
    </Box>
  );
};

export default Acticles;
