import React, { Suspense } from "react";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";

// Lazy load Header and Slider components
const Header = React.lazy(() => import("../components/Header"));
const Footer = React.lazy(() => import("../components/Footer"));
const PriceService = React.lazy(() =>
  import("../components/PriceList/PriceService")
);
const BookingForm = React.lazy(() => import("../components/BookingForm"));

const PriceList = () => {
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
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: "2rem", sm: "2rem", md: "2rem" }, // Responsive font sizeF
          fontWeight: "bold",
          padding: { xs: "5px", sm: "10px", md: "15px" }, // Responsive padding
          paddingTop: { md: "8rem", xs: "6rem", sm: "9rem" },
        }}
      >
        BẢNG GIÁ NHA KHOA HBT
      </Typography>
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
        <PriceService />
      </Suspense>
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
    </Box>
  );
};

export default PriceList;
