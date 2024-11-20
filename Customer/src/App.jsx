import React, {Suspense, useState, useEffect} from "react";
import {Box, CircularProgress} from "@mui/material";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useInView} from "react-intersection-observer";
import {Toaster} from 'react-hot-toast';

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
import ArticleDetail from "./components/Services/ArrticleDetail";

const Bracket = React.lazy(() => import("./components/Services/Bracket"));
const ChildrentsDentistry = React.lazy(() =>
    import("./components/Services/ChildrentsDentistry")
);
const Periodontitis = React.lazy(() =>
    import("./components/Services/Periodontitis")
);
const Gums = React.lazy(() => import("./components/Services/Gums"));
const Pulp = React.lazy(() => import("./components/Services/Pulp"));
const ToothDecay = React.lazy(() => import("./components/Services/ToothDecay"));
const RemovableBraces = React.lazy(() =>
    import("./components/Services/RemovableBraces")
);
const ClearBraces = React.lazy(() =>
    import("./components/Services/ClearBraces")
);
const DentalPartialDenture = React.lazy(() =>
    import("./components/Services/DentalPartialDenture")
);
const Implant = React.lazy(() => import("./components/Services/Implant"));
const Whiten = React.lazy(() => import("./components/Services/Whiten"));
const Scaling = React.lazy(() => import("./components/Services/Scaling"));
const Fillings = React.lazy(() => import("./components/Services/Fillings"));
import Porcelain from "./components/Services/Porcelain";
import CremicVeneer from "./components/Services/CremicVeneer";

const LazyComponent = ({Component}) => {
    const [isInView, setIsInView] = useState(false);
    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            setIsInView(true);
        }
    }, [inView]);

    return (
        <Box ref={ref} sx={{margin: "0 auto"}}>
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
                                    width: {xs: "40px", sm: "50px", md: "60px"}, // Responsive size
                                    height: {xs: "40px", sm: "50px", md: "60px"}, // Make sure both width and height are set
                                }}
                            />
                        </Box>
                    }
                >
                    <Component/>
                </Suspense>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50vh", // Responsive height when not in view
                        color: "#aaa",
                        fontSize: {xs: "1rem", sm: "1.2rem", md: "1.5rem"}, // Responsive font size
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
        <>
            <Toaster />
            <Router>
                <Routes>
                    <Route path="/" element={<LazyComponent Component={Home}/>}/>
                    <Route path="/Intro" element={<LazyComponent Component={Intro}/>}/>
                    <Route
                        path="/Contact"
                        element={<LazyComponent Component={Contact}/>}
                    />
                    <Route path="/service/:serviceId" element={<ArticleDetail/>}/>

                    <Route
                        path="/Booking"
                        element={<LazyComponent Component={Booking}/>}
                    />
                    <Route path="/Infor" element={<LazyComponent Component={Infor}/>}/>
                    <Route
                        path="/Cach-su-dung-baking-soda-lam-trang-rang-hieu-qua-tai-nha"
                        element={<LazyComponent Component={BakingSoda}/>}
                    />
                    <Route
                        path="/PriceList"
                        element={<LazyComponent Component={PriceList}/>}
                    />
                    <Route path="/Braces" element={<LazyComponent Component={Braces}/>}/>

                    <Route
                        path="/Services"
                        element={<LazyComponent Component={Services}/>}
                    />
                    <Route
                        path="/nieng-rang-mac-cai"
                        element={<LazyComponent Component={Bracket}/>}
                    />
                    <Route
                        path="/nieng-rang-thao-lap"
                        element={<LazyComponent Component={RemovableBraces}/>}
                    />
                    <Route
                        path="/nieng-rang-trong-suot"
                        element={<LazyComponent Component={ClearBraces}/>}
                    />
                    <Route
                        path="/ham-gia-thao-lap"
                        element={<LazyComponent Component={DentalPartialDenture}/>}
                    />
                    <Route
                        path="/cay-ghep-implant"
                        element={<LazyComponent Component={Implant}/>}
                    />
                    <Route
                        path="/rang-su-tham-my"
                        element={<LazyComponent Component={Porcelain}/>}
                    />
                    <Route
                        path="/tay-trang-rang"
                        element={<LazyComponent Component={Whiten}/>}
                    />
                    <Route
                        path="/cao-voi-rang"
                        element={<LazyComponent Component={Scaling}/>}
                    />
                    <Route
                        path="/tram-rang"
                        element={<LazyComponent Component={Fillings}/>}
                    />
                    <Route
                        path="/dan-su-veneer"
                        element={<LazyComponent Component={CremicVeneer}/>}
                    />

                    <Route
                        path="/nha-khoa-tre-em"
                        element={<LazyComponent Component={ChildrentsDentistry}/>}
                    />
                    <Route
                        path="/dieu-tri-nha-chu"
                        element={<LazyComponent Component={Periodontitis}/>}
                    />
                    <Route
                        path="/dieu-tri-nuou"
                        element={<LazyComponent Component={Gums}/>}
                    />
                    <Route
                        path="/dieu-tri-tuy"
                        element={<LazyComponent Component={Pulp}/>}
                    />
                    <Route
                        path="/dieu-tri-sau-rang"
                        element={<LazyComponent Component={ToothDecay}/>}
                    />

                    {/* Add more routes */}
                </Routes>
            </Router>
        </>
    );
};

export default App;
