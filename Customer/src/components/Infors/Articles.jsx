import React, { useState, useEffect } from "react";
import { Box, Button, Pagination, Typography,CircularProgress, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";

const itemsPerPage = 9;

// Define the articles array with title, content, and image for each article


const Acticles = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [knowledge, setKnowledge] = useState([]); // state để lưu trữ danh sách chính sách
  const [loading, setLoading] = useState(true);

  const handleKnowledgeClick = (knowledgeId) => {

    console.log(knowledgeId);
    if (knowledgeId) {
      navigate(`/knowledge/${knowledgeId}`); // Điều hướng đến trang chi tiết chính sách
    } else {
      console.error("Invalid knowledge ID"); // Log thông báo nếu ID không hợp lệ
    }

  };
  useEffect(() => {
    // Hàm gọi API
    const fetchKnowledges = async () => {
      try {
        const response = await axios.get("/knowledge/getAll");

        setKnowledge(response.data.data); // Đặt state
        console.log(response.data);

      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu kiến thức:", error);
      } finally {
        setLoading(false); // Đặt loading thành false khi đã hoàn thành
      }
    };

    fetchKnowledges();
  }, []); // Chỉ gọi API khi component được mount

// Xử lý phân trang
const handlePageChange = (event, value) => {
  setPage(value);
};

// Tính toán các bài viết sẽ hiển thị dựa trên trang hiện tại
const startIndex = (page - 1) * itemsPerPage;
const currentKnowledge = Array.isArray(knowledge) ? knowledge.slice(startIndex, startIndex + itemsPerPage) : [];



if (loading) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
}

  return (
    <Box sx={{ paddingLeft: 5}}>
      <Grid container spacing={2}>
        {currentKnowledge.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                padding: 2,
                position: "relative",
                textAlign: "center",
                height: "400px", // Chiều cao cố định cho khung
                overflow: "hidden", //
              }}
            >
              
              {item.imageUrls && item.imageUrls.length > 0 ? (
                <img
                  src={item.imageUrls[0]} // Sử dụng hình ảnh đầu tiên
                  alt={item.title}
                  style={{ width: "100%", height: "55%", borderRadius: 8 }} // Thêm border-radius để đẹp hơn
                />
              ) : (
                <Typography variant="body2" color="gray">Hình ảnh không có</Typography> // Thông báo nếu không có hình ảnh
              )}
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "red", marginTop: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "gray", maxHeight: "60px", overflow: "hidden" }}>
                {item.summary}
              </Typography>
              <Button
                onClick={() => handleKnowledgeClick(item._id)}
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  marginTop: 2,
                  "&:hover": {
                    backgroundColor: "darkred",
                  },
                }}
              >
                Xem Chi Tiết
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          //count={Math.ceil(knowledge.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default Acticles;
