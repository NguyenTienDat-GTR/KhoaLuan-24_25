import React, { Suspense } from "react";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";

// Lazy load Header and Slider components
const Header = React.lazy(() => import("../components/Header"));
const Slider = React.lazy(() => import("../components/Homes/Slider"));
const Footer = React.lazy(() => import("../components/Footer"));
const IntroductionHK = React.lazy(() => import("../components/Intros/IntrodutionHK"));
const Solution = React.lazy(() => import("../components/Intros/Solution"));
const BookingForm = React.lazy(() => import("../components/BookingForm"));
const Intro = () => {
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
            {/* Thêm nội dung của trang bên dưới Header */}
            <Box
                sx={{
                    flex: 1, // Chiếm phần còn lại của không gian
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
                    NHA KHOA HOÀNG KIM
                </Typography>
            </Box>
            <IntroductionHK />
            <hr style={{ width: "1000px", fontSize: "50px" }} />

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
                        color: "RGB (54,49,52)",
                        fontSize: {
                            xs: "1rem",
                            sm: "2rem",
                            md: "2rem",
                        },
                        fontWeight: "bold",
                    }}
                >
                    CÁC GIẢI PHÁP TỐT NHẤT
                </Typography>
            </Box>
            <Solution />
            <Suspense>

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
                    <br /> <hr style={{ width: "1000px", fontSize: "50px" }} /><br />
                    <BookingForm />
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
export default Intro;