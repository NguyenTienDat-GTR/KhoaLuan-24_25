import React, { Suspense } from "react";
import { Box, CircularProgress, Typography, Divider } from "@mui/material";
import { Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import macCai from "../img/nieng-rang/nieng-rang-mac-cai.jpg"
import thaoLap from "../img/nieng-rang/thao-lap.jpg"
import trongSuot from "../img/nieng-rang/trong-suot.jpg"
const Header = React.lazy(() => import("../../Header"));
const Footer = React.lazy(() => import("../../Footer"));
const BookingForm = React.lazy(() => import("../../BookingForm"));
const servicesDataThamMy = [
  {
    title: "Niềng răng mắc cài",
    imgSrc: macCai, // Thay thế bằng đường dẫn ảnh thực tế
    link: '/tay-trang-rang', // Đường dẫn trang chi tiết
  },
  {
    title: "Niềng răng tháo lắp",
    imgSrc: thaoLap,
    link: '/dan-su-veneer',
  },
  {
    title: "Niềng răng trong suốt",
    imgSrc: trongSuot,
    link: '/tram-rang',
  },
  
  
];

const SD_Nieng = () => {
  const navigate = useNavigate(); // Hook để điều hướng

  const handleClick = (link) => {
    navigate(link); // Chuyển hướng đến trang chi tiết dịch vụ
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Đảm bảo chiều cao tối thiểu của trang để Header luôn ở trên cùng
        maxWidth: "100vw",
      }}
    >
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh", // Full screen height for vertical centering
              width: "100vw", // Full screen width for horizontal centering
            }}
          >
            <CircularProgress
              sx={{
                width: { xs: "50px", sm: "70px", md: "100px" }, // Responsive width
                height: { xs: "50px", sm: "70px", md: "100px" }, // Responsive height
              }}
            />
          </Box>
        }
      >
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
            height: "auto",
            width: "100vw",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "RGB (54,49,52)",
              fontSize: {
                xs: "1rem",
                sm: "2rem",
                md: "2rem",
              },
              fontWeight: "bold",
              mt: { xs: "1rem", sm: "1rem", md: "1rem" },
            }}
          >
            Các dịch vụ niềng răng và chỉnh sửa khớp cắn của HBT
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "100vw", sm: "100vw", md: "100vw" },
            mt: "1rem",
            mb: "1rem",
          }}
        >
          <Divider
            sx={{
              borderBottomWidth: 1,
              borderColor: "#000",
              width: { xs: "30%", sm: "50%", md: "70%" },
              margin: "0 auto",
            }}
          />
        </Box>
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Full screen height for vertical centering
                width: "100vw", // Full screen width for horizontal centering
              }}
            >
              <CircularProgress
                sx={{
                  width: { xs: "50px", sm: "70px", md: "100px" }, // Responsive width
                  height: { xs: "50px", sm: "70px", md: "100px" }, // Responsive height
                }}
              />
            </Box>
          }
        >
          <Grid container spacing={3} sx={{ padding: '20px' }}>
            {servicesDataThamMy.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}> {/* 4 cột trên màn hình lớn */}
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={service.imgSrc}
                    alt={service.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {service.title}
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        margin: 0.5,
                        width:300,
                        fontSize: { xs: "0.8rem", sm: "0.75rem", md: "0.875rem" },
                      }}
                      onClick={() => handleClick(service.link)} // Điều hướng khi bấm
                    >
                      Xem thêm
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Suspense>
<br/>
<Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Full screen height for vertical centering
                width: "100vw", // Full screen width for horizontal centering
              }}
            >
              <CircularProgress
                sx={{
                  width: { xs: "50px", sm: "70px", md: "100px" }, // Responsive width
                  height: { xs: "50px", sm: "70px", md: "100px" }, // Responsive height
                }}
              />
            </Box>
          }
        >
          <BookingForm />
        </Suspense>
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Full screen height for vertical centering
                width: "100vw", // Full screen width for horizontal centering
              }}
            >
              <CircularProgress
                sx={{
                  width: { xs: "50px", sm: "70px", md: "100px" }, // Responsive width
                  height: { xs: "50px", sm: "70px", md: "100px" }, // Responsive height
                }}
              />
            </Box>
          }
        >
          <Footer />
        </Suspense>
      </Suspense>
    </Box>
  );
};

export default SD_Nieng;
