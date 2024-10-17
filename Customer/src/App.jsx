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
const BakingSoda = React.lazy(() =>
  import(".//components/Infors/ArticlesDetails/BakingSoda")
);

const PriceList = React.lazy(() => import("./pages/PriceList"));
const Braces = React.lazy(() => import("./pages/Braces"));
const Services = React.lazy(() => import("./pages/Services"));
const SD_Rang = React.lazy(() =>
  import(".//components/Services/ServiceDetails/SD_Rang")
);
const SD_PhucHinh = React.lazy(() =>
  import("./components/Services/ServiceDetails/SD_PhucHinh")
);
const SD_Kham = React.lazy(() =>
  import(".//components/Services/ServiceDetails/SD_Kham")
);
const SD_Nieng = React.lazy(() =>
  import(".//components/Services/ServiceDetails/SD_Nieng")
);



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
          path="/articles/Cach-su-dung-baking-soda-lam-trang-rang-hieu-qua-tai-nha"
          element={<LazyComponent Component={BakingSoda} />}
        />
        <Route
          path="/PriceList"
          element={<LazyComponent Component={PriceList} />}
        />
        <Route path="/Braces" element={<LazyComponent Component={Braces} />} />

        <Route
          path="/Services"
          element={<LazyComponent Component={Services} />}
        />

        <Route
          path="/Services/nha-khoa-tham-my"
          element={<LazyComponent Component={SD_Rang} />}
        />

        <Route
          path="/Services/phuc-hinh-rang-da-mat"
          element={<LazyComponent Component={SD_PhucHinh} />}
        />

        <Route
          path="/Services/dieu-tri-tong-quat"
          element={<LazyComponent Component={SD_Kham} />}
        />

        <Route
          path="/Services/nieng-rang-chinh-nha"
          element={<LazyComponent Component={SD_Nieng} />}
        />
        {/* Add more routes */}
      </Routes>
    </Router>
  );
};

export default App;
