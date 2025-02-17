import React, { Suspense } from "react";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import BookingForm from "../components/BookingForm"
const Header = React.lazy(() => import("../components/Header"));
const Footer = React.lazy(() => import("../components/Footer"));
const BookingFormContact = React.lazy(() =>
  import("../components/Contacts/BookingFromContact")
);
const Contact = () => {
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
            height: "auto",
            width: "100vw",
            paddingTop: { md: "8rem", xs: "6rem", sm: "8rem" }
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "RGB (54,49,52)",
              fontSize: {
                xs: "2rem",
                sm: "2rem",
                md: "2rem",
              },
              fontWeight: "bold",
            }}
          >
            LIÊN HỆ
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
        <BookingFormContact />
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
export default Contact;
