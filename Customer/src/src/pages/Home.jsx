import React, { Suspense } from "react";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";

// Lazy load Header and Slider components
const Header = React.lazy(() => import("../components/Header"));
const Slider = React.lazy(() => import("../components/Homes/Slider"));
const Introduction = React.lazy(() =>
  import("../components/Homes/Introdution")
);
const Service = React.lazy(() => import("../components/Homes/Service"));
const DoctorContainer = React.lazy(() =>
  import("../components/Homes/DoctorContainer")
);
const Footer = React.lazy(() => import("../components/Footer"));
const ReasonContainer = React.lazy(() =>
  import("../components/Homes/ReasonContainer")
);
const BookingForm = React.lazy(() => import("../components/BookingForm"));

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Đảm bảo chiều cao tối thiểu của trang để Header luôn ở trên cùng
      }}
    >
      <Suspense
        fallback={
          <Box
            sx={{
              // position: fixed, // Giữ menu cố định 
              // top: 0, // Đặt menu ở vị trí đầu trang 
              // width: "100%", // Đảm bảo menu rộng bằng trang 
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
      </Suspense>
      {/* Thêm nội dung của trang bên dưới Header */}
      <Box
        sx={{
          flex: 1, // Chiếm phần còn lại của không gian
          paddingTop:{md: "8rem",xs:"5rem"}
        }}
      >
        {/* Nội dung của trang */}
        <Slider />
      </Box>
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
          variant="h1"
          sx={{
            color: "rgba(0,120,233,1)",
            fontSize: {
              xs: "2rem",
              sm: "3rem",
              md: "4rem",
            },
            fontWeight: "bold",
          }}
        >
          NHA KHOA HBT
        </Typography>
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
        <Introduction />
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
        <Service />
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
        <Box
          sx={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "0.8rem",
                sm: "1.3rem",
                md: "2rem",
              },
              textAlign: "center",
              color: "rgba(0,120,233,1)",
              padding: "0.3rem",
            }}
          >
            Nha khoa HBT tự hào là một trong những nha khoa chuẩn quốc tế,
            uy tín.
            <br />
            Với sứ mệnh chăm sóc răng miệng và nụ cười cho mọi nhà
          </Typography>
        </Box>
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
        <DoctorContainer />
      </Suspense>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100vw", sm: "100vw", md: "100vw" },
          mt: { xs: "1rem", sm: "1rem", md: "1rem" },
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "0.7rem",
              sm: "1rem",
              md: "1.5rem",
            },
            textAlign: "center",
            color: "rgba(0,120,233,1)",
          }}
        >
          LÍ DO NHA KHOA HBT LUÔN ĐƯỢC KHÁCH HÀNG TIN TƯỞNG
        </Typography>
      </Box>
      <Divider
        sx={{
          borderBottomWidth: 1,
          borderColor: "#000",
          width: { xs: "30%", sm: "30%", md: "20%" },
          margin: "0 auto",
        }}
      />
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
        <ReasonContainer />
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

export default Home;
