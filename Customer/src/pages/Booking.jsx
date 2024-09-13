import React, { Suspense } from "react";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";

const Header = React.lazy(() => import("../components/Header"));
const Footer = React.lazy(() => import("../components/Footer"));
const BookingForm = React.lazy(() => import("../components/BookingForm"));
const Booking = () => {
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
        <br></br>
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
                    }}
                >
                    ĐẶT LỊCH
                </Typography>
            </Box>
            <hr style={{ width: "1000px", fontSize: "50px" }} />
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
          <BookingForm/>
  
        </Suspense>
        <br/><br/>
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
}
export default Booking;