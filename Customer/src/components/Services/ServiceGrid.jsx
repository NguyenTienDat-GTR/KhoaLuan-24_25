import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import rang3 from "..//images/intro/rs.jpg";
import rang4 from "..//images/intro/TRIP.jpg";
import rang5 from "..//images/intro/NRCN.png";
import rang6 from "..//images/intro/NKTQ.png";
const servicesData = [
  {
    id: "nha-khoa-tham-my",
    title: "Nha Khoa Thẩm Mỹ",
    description:
      "Sự lựa chọn tuyệt vời cho những ai muốn cải thiện nụ cười của mình.",
    imgSrc: rang3,
  },
  {
    id: "phuc-hinh-rang-da-mat",
    title: "Phục Hình Răng Đã Mất",
    description:
      "Giải pháp hiệu quả cho những người mất răng, mang lại lợi ích về thẩm mỹ và chức năng.",
    imgSrc:rang4,
  },
  {
    id: "nieng-rang-chinh-nha",
    title: "Niềng Răng - Chỉnh Nha",
    description:
      "Giải pháp hiệu quả để cải thiện sự sắp xếp của răng và hàm, mang lại lợi ích về thẩm mỹ và chức năng.",
    imgSrc: rang5,
  },
  {
    id: "dieu-tri-tong-quat",
    title: "Điều Trị Tổng Quát",
    description:
      "Một phần quan trọng trong chăm sóc sức khỏe răng miệng, giúp duy trì và cải thiện tình trạng răng miệng của bệnh nhân.",
    imgSrc: rang6,
  },
];

const ServiceGrid = () => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        padding: "30px",
        justifyContent: { xs: "center", sm: "flex-start", md: "flex-start" },
      }}
    >
      {servicesData.map((service) => (
        <Grid
          item
          key={service.id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            textAlign: { xs: "center", sm: "left", md: "left" },
          }}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f6f6f6",
              padding: { xs: "10px", sm: "12px", md: "16px" },
            }}
          >
            <CardMedia
              component="img"
              image={service.imgSrc}
              alt={service.title}
              sx={{
                height: 150,
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: { xs: "8px", sm: "12px", md: "16px" },
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1rem", md: "1.25rem" },
                }}
              >
                {service.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.9rem", sm: "0.8rem", md: "1rem" },
                }}
              >
                {service.description}
              </Typography>
            </CardContent>
            <Button
              component={Link}
              to={`/Services/${service.id}`}
              variant="contained"
              color="error"
              sx={{
                margin: 2,
                fontSize: { xs: "0.8rem", sm: "0.75rem", md: "0.875rem" },
              }}
            >
              Xem thêm
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ServiceGrid;
