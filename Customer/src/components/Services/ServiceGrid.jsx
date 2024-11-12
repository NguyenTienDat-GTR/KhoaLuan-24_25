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
  const [hoveredServiceId, setHoveredServiceId] = useState(null);

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
  const handleViewMore = (serviceId) => {
    navigate(`/service/${serviceId}`);
    console.log(serviceId);
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
              <Box
                key={service._id}
                sx={{
                  position: "relative", // Thêm position relative ở đây để box bên cạnh định vị theo card
                }}
                onMouseEnter={() => setHoveredServiceId(service._id)}
                onMouseLeave={() => setHoveredServiceId(null)}
              >
                <Card
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleViewMore(service._id)}
                        size="small"
                      >
                        Xem thêm
                      </Button>
                      {/* <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleOpen(service)}
                      >
                        Đặt lịch
                      </Button> */}
                    </Box>
                  </CardContent>
                </Card>

                {hoveredServiceId === service._id && (
                  <Box
                    className="hoverBox"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0, // Đặt box nằm cạnh bên phải card
                      width: "200px",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      color: "white",
                      padding: 2,
                      borderRadius: 1,
                      zIndex: 1,
                    }}
                  >
                    <Typography variant="h6">{service.name}</Typography>
                    {/* <Typography>Loại dịch vụ: {cat.typeName}</Typography> */}
                    <Typography variant="h6">
                      Thời gian: {service.duration} phút
                    </Typography>
                    <Typography variant="h6">
                      Giảm giá: {service.discount}
                    </Typography>
                    <Typography>
                      Giá:{" "}
                      {service.priceRange.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
      <CreateAppointmentRequest
        open={open}
        handleClose={handleClose}
        selectedService={selectedService}
      />
    </Box>
  );
};

export default ServiceGrid;
