import React, { Suspense } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const ServiceGrid = React.lazy(() =>
  import("../components/Services/ServiceGrid")
);
const Header = React.lazy(() => import("../components/Header"));
const Footer = React.lazy(() => import("../components/Footer"));

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
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "RGB(54,49,52)",
            fontSize: { xs: "1rem", sm: "2rem", md: "2rem" },
            fontWeight: "bold",
          }}
        >
          CÁC DỊCH VỤ CỦA HOÀNG KIM
        </Typography>
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
