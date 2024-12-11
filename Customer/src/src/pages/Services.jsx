import React, { Suspense } from "react";
import { Box, CircularProgress, Typography, Divider } from "@mui/material";

const ServiceGrid = React.lazy(() =>
  import("../components/Services/ServiceGrid")
);
const Header = React.lazy(() => import("../components/Header"));
const Footer = React.lazy(() => import("../components/Footer"));
const BookingForm = React.lazy(() => import("../components/BookingForm"));
const Services = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
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
              height: "100vh",
              width: "100vw",
            }}
          >
            <CircularProgress
              sx={{
                width: { xs: "50px", sm: "70px", md: "100px" },
                height: { xs: "50px", sm: "70px", md: "100px" },
              }}
            />
          </Box>
        }
      >
        <Header />
      </Suspense>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
          height: "auto",
          width: "100vw",
          mt: { xs: "1rem", sm: "1rem", md: "1rem" },
          paddingTop: { md: "8rem", xs: "5rem" },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "RGB(54,49,52)",
            fontSize: { xs: "2rem", sm: "2rem", md: "2rem" },
            fontWeight: "bold",
            paddingTop: { md: "0", xs: "0.5rem", sm: "2rem" },
          }}
        >
          CÁC DỊCH VỤ CỦA HBT
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
              height: "100vh",
              width: "100vw",
            }}
          >
            <CircularProgress
              sx={{
                width: { xs: "50px", sm: "70px", md: "100px" },
                height: { xs: "50px", sm: "70px", md: "100px" },
              }}
            />
          </Box>
        }
      >
        <ServiceGrid />
      </Suspense>
      <br></br>
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
              height: "100vh",
              width: "100vw",
            }}
          >
            <CircularProgress
              sx={{
                width: { xs: "50px", sm: "70px", md: "100px" },
                height: { xs: "50px", sm: "70px", md: "100px" },
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

export default Services;
