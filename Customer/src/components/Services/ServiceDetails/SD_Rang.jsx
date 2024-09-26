import React, { Suspense } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Header = React.lazy(() => import("../../Header"));
const Footer = React.lazy(() => import("../../Footer"));

const SD_Rang = () => {
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
            Các dịch vụ của Hoàng Kim về răng
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
          {/* <ServiceGrid /> */}
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

export default SD_Rang;
