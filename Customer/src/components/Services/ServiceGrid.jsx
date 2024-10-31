import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useServiceStore from "../../hooks/useServiceStore";
import CreateAppointmentRequest from "./createAppointmentRequest";

const ServiceGrid = () => {
  const navigate = useNavigate();
  const { category, getAllService } = useServiceStore();
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [filteredCategories, setFilteredCategories] = useState(category);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpen = (service) => {
    setSelectedService(service);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedService(null);
    setOpen(false);
  };

  useEffect(() => {
    getAllService();
  }, [getAllService]);

  useEffect(() => {
    if (selectedCategory === "Tất cả") {
      setFilteredCategories(category);
    } else {
      setFilteredCategories(
        category.filter((cat) => cat.typeName === selectedCategory)
      );
    }
  }, [selectedCategory, category]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "100vw" }}>
      <TextField
        select
        label="Chọn loại dịch vụ"
        value={selectedCategory}
        onChange={handleCategoryChange}
        sx={{ marginBottom: "20px", minWidth: 200 }}
      >
        <MenuItem value="Tất cả">Tất cả</MenuItem>
        {category.map((cat) => (
          <MenuItem key={cat._id} value={cat.typeName}>
            {cat.typeName}
          </MenuItem>
        ))}
      </TextField>

      {filteredCategories.map((cat) => (
        <Box key={cat._id} sx={{ marginBottom: "40px" }}>
          <Typography variant="h5" gutterBottom>
            {cat.typeName}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {cat.serviceList.map((service) => (
              <Card
                key={service._id}
                sx={{
                  width: "23%", // Chiều rộng chiếm khoảng 1/4 để thành 4 cột
                  minWidth: "13rem",
                  maxWidth: "15rem",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#76B0EA",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: "150px", objectFit: "cover" }}
                  image={service.imageUrls?.[0] || "fallback-image-url"}
                  alt={service.name || "Service Image"}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {service.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Giá:{" "}
                    {service.priceRange.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => navigate(`/service/${service._id}`)}
                      size="small"
                    >
                      Xem thêm
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleOpen(service)}
                    >
                      Đặt lịch
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
      <CreateAppointmentRequest
        open={open} // Chuyển từ handleOpen thành open
        handleClose={handleClose}
        selectedService={selectedService}
      />
    </Box>
  );
};

export default ServiceGrid;
