import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/axiosConfig";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert, Grid
} from "@mui/material";

const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));
import CreateAppointmentRequest from "./CreateAppointmentRequest";


const ArticleDetail = () => {
  const { serviceId } = useParams();
  const [article, setArticle] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [openBookingForm, setOpenBookingForm] = useState(false);

  const romanize = (num) => {
    const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
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

        // Kiểm tra và lấy blog từ response
        if (response.data && response.data.service && response.data.service.blog) {
          console.log("Blog data:", response.data.service.blog);  // In ra blog data
          setArticle(response.data.service.blog);  // Cập nhật state article
        } else {
          console.error("Không có blog trong dữ liệu trả về.");
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
    setOpenBookingForm(true);
  };

  const handleCloseBookingForm = () => {
    setOpenBookingForm(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Suspense fallback={<CircularProgress />}>
        <Header />
      </Suspense>
      <Box sx={{  marginTop: 15 }}>
        <Typography variant="h4" sx={{ color: 'red', textAlign: 'center' , }}>{article.title}</Typography>
        {article.imageUrls && article.imageUrls.length > 0 && (
          <Box sx={{ marginTop: 1, marginLeft: { md: 30 } }}>
            {article.imageUrls.map((imageUrl, imgIndex) => (
              <img key={imgIndex} src={imageUrl} width="100%" height={400} />
            ))}
          </Box>
        )}
        {article.mainHeadings.map((mainHeading, index) => (
          <Box key={index} sx={{ marginTop: 2, padding:5 }}>
            <Typography variant="h5">{`${romanize(index + 1)}. ${mainHeading.title}`}</Typography>

            {/* Hiển thị hình ảnh nếu có */}
            {mainHeading.imageUrls && mainHeading.imageUrls.length > 0 && (
              <Box sx={{ marginTop: 1 }}>
                {mainHeading.imageUrls.map((imageUrl, imgIndex) => (
                  <img key={imgIndex} src={imageUrl} alt={`Main heading ${index}-${imgIndex}`} width="100%" />
                ))}
              </Box>
            )}
            <Typography>{mainHeading.content}</Typography>

            {mainHeading.subheadings && mainHeading.subheadings.map((subHeading, subIndex) => (
              <Box key={subIndex} sx={{ marginTop: 2, paddingLeft: 2 }}>
                <Typography variant="h6">{`${subIndex + 1}. ${subHeading.title}`}</Typography>
                {/* Hiển thị hình ảnh nếu có */}
                {subHeading.imageUrls && subHeading.imageUrls.length > 0 && (
                  <Box sx={{ marginTop: 1 }}>
                    {subHeading.imageUrls.map((imageUrl, imgIndex) => (
                      <img key={imgIndex} src={imageUrl} alt={`Subheading ${subIndex}-${imgIndex}`} width="100%" />
                    ))}
                  </Box>
                )}
                <Typography>{subHeading.content}</Typography>

                {subHeading.subSubheadings && subHeading.subSubheadings.map((subSubheading, subSubIndex) => (
                  <Box key={subSubIndex} sx={{ marginTop: 1, paddingLeft: 2 }}>
                    <Typography variant="subtitle1">{subSubheading.title}</Typography>
                    {/* Hiển thị hình ảnh nếu có */}
                    {subSubheading.imageUrls && subSubheading.imageUrls.length > 0 && (
                      <Box sx={{ marginTop: 1 }}>
                        {subSubheading.imageUrls.map((imageUrl, imgIndex) => (
                          <img key={imgIndex} src={imageUrl} alt={`SubSubheading ${subSubIndex}-${imgIndex}`} width="100%" />
                        ))}
                      </Box>
                    )}
                    <Typography>{subSubheading.content}</Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Box sx={{ marginTop: 15 }}>
       
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
          handleClose={handleCloseBookingForm}
          selectedService={selectedService} // Truyền dịch vụ được chọn
        />
      </Box>
      <Suspense fallback={<CircularProgress />}>
        <Footer />
      </Suspense>
    </Box>
  );
};

export default ArticleDetail;