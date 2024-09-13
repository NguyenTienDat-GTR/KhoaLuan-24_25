import React, { useState } from "react";
import { Box, Button, Grid, Pagination, Typography } from "@mui/material";

const itemsPerPage = 9; // Số lượng phần tử mỗi trang

const data = Array.from({ length: 108 }, (_, index) => ({
  id: index + 1,
  title: `Tiêu đề ${index + 1}`,
  content: `Nội dung - ${index % 2 === 0 ? "2 dòng" : "3 dòng"}`,
}));

const Acticles = () => {
  const [page, setPage] = useState(1);

  // Tính toán số trang
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const currentData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      {/* Grid cho hình ảnh và nội dung */}
      <Grid container spacing={2}>
        {currentData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                textAlign: "center",
                padding: "1rem",
              }}
            >
              {/* Hình ảnh */}
              <Box
                sx={{
                  width: "100%",
                  height: "150px",
                  backgroundColor: "#e0e0e0",
                  marginBottom: "1rem",
                }}
              >
                {/* Đây là vị trí cho hình ảnh, bạn có thể chèn hình vào */}
                <Box
                  component="img"
                  src="https://picsum.photos/200/500"
                  alt={item.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Tiêu đề */}
              <Typography variant="h6">{item.title}</Typography>

              {/* Nội dung */}
              <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
                {item.content}
              </Typography>

              {/* Nút xem chi tiết */}
              <Button variant="contained" color="primary">
                Xem Chi Tiết
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

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
        />
      </Box>
    </Box>
  );
};

export default Acticles;
