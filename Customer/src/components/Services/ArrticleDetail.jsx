import React, {useEffect, useState, Suspense} from "react";
import {useParams} from "react-router-dom";
import axios from "../../config/axiosConfig";
import {
    Box,
    Button,
    Typography,
    CircularProgress,

} from "@mui/material";

const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));
import CreateAppointmentRequest from "./createAppointmentRequest";
//import { PriceChange } from "@mui/icons-material";


const ArticleDetail = () => {
    const {serviceId} = useParams();
    const [article, setArticle] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [openBookingForm, setOpenBookingForm] = useState(false);

    const romanize = (num) => {
        const lookup = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1
        };
        let roman = '';
        for (let i in lookup) {
            while (num >= lookup[i]) {
                roman += i;
                num -= lookup[i];
            }
        }
        return roman;
    };
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`/service/getById/${serviceId}`);
                const serviceData = response.data.service;

                // // Kiểm tra và lấy blog từ response
                // if (response.data && response.data.service && response.data.service.blog) {
                //   console.log("Blog data:", response.data.service.blog);  // In ra blog data
                //   setArticle(response.data.service.blog);  // Cập nhật state article
                // } else {
                //   console.error("Không có blog trong dữ liệu trả về.");
                //   setArticle(null);
                // }
                if (serviceData) {
                    setSelectedService({
                        id: serviceData._id,
                        name: serviceData.name, // Lấy tên dịch vụ
                        priceRange: serviceData.priceRange, // Lấy giá dịch vụ
                    });
                    setArticle(serviceData.blog); // Lấy bài viết từ dịch vụ
                } else {
                    console.error("Không có dịch vụ với ID này.");
                    setArticle(null);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu bài viết:", error);
                setArticle(null);
            }
        };

        fetchArticle();
    }, [serviceId]);

    if (!article) return <Typography>Đang tải...</Typography>;
    const handleOpenBookingForm = () => {
        // setSelectedService({ id: serviceId, name: article?.serviceId, priceRange: article?.priceRange })
        setOpenBookingForm(true);
    };

    const handleCloseBookingForm = () => {
        setOpenBookingForm(false);
    };

    return (
        <Box sx={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <Suspense fallback={<CircularProgress/>}>
                <Header/>
            </Suspense>
            <Box sx={{marginTop: 18}}>
                <Typography variant="h4" sx={{color: 'red', textAlign: 'center',}}>{article.title}</Typography>
                {article.imageUrls && article.imageUrls.length > 0 && (
                    <Box sx={{marginTop: 1, marginLeft: {md: 30}}}>
                        {article.imageUrls.map((imageUrl, imgIndex) => (
                            <img key={imgIndex} src={imageUrl} width="100%" height={400}/>
                        ))}
                    </Box>
                )}
                {article.mainHeadings.map((mainHeading, index) => (
                    <Box key={index} sx={{paddingLeft: 5, paddingTop: 3}}>
                        <Typography variant="h5" sx={{
                            color: "blue",
                            fontWeight: "bold",
                            fontSize: "18px"
                        }}>{`${romanize(index + 1)}. ${mainHeading.title}`}</Typography>

                        {/* Hiển thị hình ảnh nếu có */}
                        {mainHeading.imageUrls && mainHeading.imageUrls.length > 0 && (
                            <Box sx={{marginTop: 1}}>
                                {mainHeading.imageUrls.map((imageUrl, imgIndex) => (
                                    <img key={imgIndex} src={imageUrl} alt={`Main heading ${index}-${imgIndex}`}
                                         width="100%"/>
                                ))}
                            </Box>
                        )}
                        <Typography
                            sx={{textAlign: "justify", textIndent: "20px", marginLeft: "20px", lineHeight: 1.6}}>
                            {mainHeading.content.split('\n').map((line, idx) => (
                                <span key={idx}>
                  {line}
                                    <br/> {/* Xuống dòng */}
                </span>
                            )) || "Không có nội dung"}
                        </Typography>

                        {mainHeading.subheadings && mainHeading.subheadings.map((subHeading, subIndex) => (
                            <Box key={subIndex} sx={{marginTop: 2, paddingLeft: 2}}>
                                <Typography sx={{
                                    color: "blue",
                                    fontSize: "16px"
                                }}>{`${subIndex + 1}. ${subHeading.title}`}</Typography>
                                {/* Hiển thị hình ảnh nếu có */}
                                {subHeading.imageUrls && subHeading.imageUrls.length > 0 && (
                                    <Box sx={{marginTop: 1}}>
                                        {subHeading.imageUrls.map((imageUrl, imgIndex) => (
                                            <img key={imgIndex} src={imageUrl}
                                                 alt={`Subheading ${subIndex}-${imgIndex}`} width="100%"/>
                                        ))}
                                    </Box>
                                )}
                                <Typography sx={{
                                    textAlign: "justify",
                                    textIndent: "20px",
                                    marginLeft: "20px",
                                    lineHeight: 1.6
                                }}>{subHeading.content}</Typography>

                                {subHeading.subSubheadings && subHeading.subSubheadings.map((subSubheading, subSubIndex) => (
                                    <Box key={subSubIndex} sx={{marginTop: 1, paddingLeft: 2}}>
                                        <Typography variant="subtitle1">{subSubheading.title}</Typography>
                                        {/* Hiển thị hình ảnh nếu có */}
                                        {subSubheading.imageUrls && subSubheading.imageUrls.length > 0 && (
                                            <Box sx={{marginTop: 1}}>
                                                {subSubheading.imageUrls.map((imageUrl, imgIndex) => (
                                                    <img key={imgIndex} src={imageUrl}
                                                         alt={`SubSubheading ${subSubIndex}-${imgIndex}`} width="100%"/>
                                                ))}
                                            </Box>
                                        )}
                                        <Typography sx={{
                                            textAlign: "justify",
                                            textIndent: "20px",
                                            marginLeft: "20px",
                                            lineHeight: 1.6
                                        }}>{subSubheading.content}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Box>
                ))}
                <Typography sx={{fontWeight: 'bold', mt: 2, ml: 10}} variant="body1">Khoảng giá của dịch
                    vụ {selectedService.priceRange ? `${selectedService.priceRange} VND` : "Chưa cập nhật"} </Typography>
            </Box>
            <Box sx={{marginTop: 15}}>

                <Button vvariant="contained"
                        color="error"
                        onClick={handleOpenBookingForm}
                        sx={{
                            position: "fixed",
                            bottom: "20px",
                            right: "20px",
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            zIndex: 1000,
                            backgroundColor: "red",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "#cc0000",
                            },
                        }}>
                    Đặt lịch
                </Button>

                {/* Booking Form Dialog */}
                <CreateAppointmentRequest
                    open={openBookingForm}
                    onClose={handleCloseBookingForm}
                    selectedService={selectedService} // Truyền dịch vụ được chọn
                />
            </Box>
            <Suspense fallback={<CircularProgress/>}>
                <Footer/>
            </Suspense>
        </Box>
    );
};

export default ArticleDetail;