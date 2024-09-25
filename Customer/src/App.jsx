import React, { Suspense, useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useInView } from "react-intersection-observer";

// Lazy load components
const Home = React.lazy(() => import("./pages/Home"));
const Intro = React.lazy(() => import("./pages/Intro"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Booking = React.lazy(() => import("./pages/Booking"));
const Infor = React.lazy(() => import("./pages/Infor"));
const PriceList = React.lazy(() => import("./pages/PriceList"));

const LazyComponent = ({ Component }) => {
  const [isInView, setIsInView] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setIsInView(true);
    }
  }, [inView]);

  return (
    <Box ref={ref} sx={{ margin: "0 auto" }}>
      {isInView ? (
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Full screen height for better centering
                width: "100vw",
              }}
            >
              <CircularProgress
                sx={{
                  color: "rgba(21,182,210,0.63)",
                  width: { xs: "40px", sm: "50px", md: "60px" }, // Responsive size
                  height: { xs: "40px", sm: "50px", md: "60px" }, // Make sure both width and height are set
                }}
              />
            </Box>
          }
        >
          <Component />
        </Suspense>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh", // Responsive height when not in view
            color: "#aaa",
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" }, // Responsive font size
          }}
        >
          Kéo xuống để tải thêm...
        </Box>
      )}
    </Box>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LazyComponent Component={Home} />} />
        <Route path="/Intro" element={<LazyComponent Component={Intro} />} />
        <Route
          path="/Contact"
          element={<LazyComponent Component={Contact} />}
        />
        <Route
          path="/Booking"
          element={<LazyComponent Component={Booking} />}
        />
        <Route path="/Infor" element={<LazyComponent Component={Infor} />} />
        <Route
          path="/PriceList"
          element={<LazyComponent Component={PriceList} />}
        />
        {/* Add more routes */}
      </Routes>
    </Router>
  );
};

export default App;
