import { Box, Typography, Grid } from "@mui/material";
import React from "react";

const PriceService = () => {
  const services = [
    {
      categoryId: 1,
      categoryName: "Cạo Vôi đánh bóng",
      services: [{ serviceId: 1, name: "Cạo vôi răng", price: "99.000" }],
    },
    {
      categoryId: 2,
      categoryName: "ĐIỀU TRỊ VIÊM LỢI – NHA CHU",
      services: [
        { serviceId: 2, name: "Điều trị viêm lợi cấp 1  ", price: "1.500.000" },
        {
          serviceId: 3,
          name: "Điều trị viêm nha chu mức độ 2 (hàm)",
          price: "2.000.000",
        },
      ],
    },
    {
      categoryId: 3,
      categoryName: "TRÁM RĂNG",
      services: [
        {
          serviceId: 4,
          name: "Trám răng GIC",
          price: "50.000",
        },
        {
          serviceId: 5,
          name: "Trám răng Composite 3M Mỹ",
          price: "100.000",
        },
        {
          serviceId: 6,
          name: "Trám răng Tokuyama Nhật",
          price: "100.000",
        },
      ],
    },
    {
      categoryId: 4,
      categoryName: "ĐIỀU TRỊ TUỶ",
      services: [
        {
          serviceId: 7,
          name: "Điều trị tuỷ răng trẻ em",
          price: "500.000",
        },
        {
          serviceId: 8,
          name: "Điều trị tuỷ răng 1 chân",
          price: "500.000",
        },
        {
          serviceId: 9,
          name: "Điều trị tuỷ răng 2 chân",
          price: "1.000.000",
        },
        {
          serviceId: 10,
          name: "Điều trị tuỷ lại răng đã điều trị hỏng",
          price: "1.000.000",
        },
        {
          serviceId: 11,
          name: "Chốt sợi điều trị tuỷ",
          price: "300.000",
        },
      ],
    },
    {
      categoryId: 5,
      categoryName: "NHỔ RĂNG",
      services: [
        {
          serviceId: 12,
          name: "Nhổ răng sữa có chích tê",
          price: "50.000",
        },
        {
          serviceId: 13,
          name: "Rạch lợi trùm",
          price: "300.000",
        },
        {
          serviceId: 14,
          name: "Nhổ chân răng các vị trí",
          price: "500.000",
        },
        {
          serviceId: 15,
          name: "Nhổ răng vị trí 1, 2, 3, 4, 5",
          price: "500.000",
        },
        {
          serviceId: 16,
          name: "Nhổ răng vị trí 6,7",
          price: "1.000.000",
        },
        {
          serviceId: 17,
          name: "Nhổ răng khôn",
          price: "1.000.000",
        },
        {
          serviceId: 18,
          name: "Phương pháp quay ly tâm (PRF)",
          price: "1.000.000",
        },
      ],
    },
    {
      categoryId: 6,
      categoryName: "CHỈNH NHA",
      services: [
        {
          serviceId: 19,
          name: "Chỉnh nha cố định",
          price: "30.000.000",
        },
        {
          serviceId: 20,
          name: "Chỉnh nha mắc cài",
          price: "20.000.000",
        },
        {
          serviceId: 21,
          name: "Chỉnh nha mắc cài tự nhiên",
          price: "25.000.000",
        },
      ],
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "95%", sm: "90%", md: "80%" },
        margin: { xs: "0 auto", sm: "0 auto", md: "0 auto" },
        padding: { xs: "1rem 0.5rem", sm: "1rem 0.5rem", md: "1rem 0.5rem" },
      }}
    >
      {services.map((service) => (
        <Box
          key={service.categoryId}
          sx={{
            marginBottom: "1.5rem",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              color: "primary.main",
              marginBottom: "1rem",
              textTransform: "uppercase",
              fontSize: { sx: "1rem", sm: "2rem", md: "2rem" },
            }}
          >
            {service.categoryName}
          </Typography>
          <Grid container spacing={2} sx={{ padding: "0.5rem" }}>
            {service.services.map((item) => (
              <React.Fragment key={item.serviceId}>
                <Grid
                  item
                  xs={7}
                  sm={6}
                  md={6}
                  sx={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: { sx: "0.4rem", sm: "1.5rem", md: "1.5rem" },
                  }}
                >
                  {item.name}
                </Grid>
                <Grid
                  item
                  xs={5}
                  sm={6}
                  md={6}
                  sx={{
                    textAlign: "right",
                    color: "secondary.main",
                    fontSize: { sx: "0.4rem", sm: "1.5rem", md: "1.5rem" },
                  }}
                >
                  {item.price} VND
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default PriceService;
