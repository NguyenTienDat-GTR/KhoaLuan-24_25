import React, { useState } from "react";
import { Box, Button, Pagination, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import baking from "../images/infor/lam-trang-rang-bang-bakingsoda.jpg"; // Replace with your actual image paths
import rang4 from "..//images/intro/TRIP.jpg";
import rang5 from "..//images/intro/NRCN.png";
import rang6 from "..//images/intro/NKTQ.png";

const itemsPerPage = 9;

// Define the articles array with title, content, and image for each article
const articles = [
  {
    id: 1,
    title: "Cách sử dụng baking soda làm trắng răng hiệu quả tại nhà",
    content: "Hàm răng trắng sáng là mơ ước của nhiều người bởi nó giúp tăng thêm sự tự tin và cải thiện vẻ ngoài. ",
    image: baking,
    route: "/Cach-su-dung-baking-soda-lam-trang-rang-hieu-qua-tai-nha",
  },
  {
    id: 2,
    title: "Tiêu đề 2",
    content: "Nội dung - 3 dòng",
    image: rang4,
    route: "/article/2",
  },
  {
    id: 3,
    title: "Tiêu đề 3",
    content: "Nội dung - 2 dòng",
    image: rang5,
    route: "/article/3",
  },
  {
    id: 4,
    title: "Tiêu đề 4",
    content: "Nội dung - 3 dòng",
    image: rang6,
    route: "/article/4",
  },
  // You can add more articles here
  ...Array.from({ length: 104 }, (_, index) => ({
    id: index + 5,
    title: `Tiêu đề ${index + 5}`,
    content: `Nội dung - ${index % 2 === 0 ? "2 dòng" : "3 dòng"}`,
    image: index % 4 === 0 ? baking : index % 4 === 1 ? rang4 : index % 4 === 2 ? rang5 : rang6,
    route: `/article/${index + 5}`,
  })),
];

const Acticles = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const currentData = articles.slice(
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
      {/* Flexbox layout for articles */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Allow items to wrap when there's not enough space
          gap: "1.5rem", // Space between items
          justifyContent: "center", // Center items horizontally
          width: { xs: "100vw", sm: "100vw", md: "100vw" },
        }}
      >
        {currentData.map((item) => (
          <Box
            key={item.id}
            sx={{
              flexBasis: { xs: "100%", sm: "25%", md: "25%" }, // Define the size of each item based on screen size
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
            {/* Image */}
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
                src={item.image} // Use the image from the article object
                alt={item.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Title */}
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              {item.title}
            </Typography>

            {/* Content */}
            <Typography
              variant="body2"
              sx={{
                marginBottom: "1rem",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              {item.content}
            </Typography>

            {/* Detail button */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                padding: { xs: "0.5rem 1rem", sm: "0.75rem 1.5rem" },
              }}
              onClick={() => navigate(item.route)} // Navigate to the article's detail page
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
