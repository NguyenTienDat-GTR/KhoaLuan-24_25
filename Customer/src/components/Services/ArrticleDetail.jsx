import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/axiosConfig";
import { Box, Typography } from "@mui/material";

const ArticleDetail = () => {
  const { serviceId } = useParams();
  const [article, setArticle] = useState(null);

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

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">{article.title}</Typography>
      {article.mainHeadings.map((mainHeading, index) => (
        <Box key={index} sx={{ marginTop: 2 }}>
          <Typography variant="h5">{mainHeading.title}</Typography>
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
              <Typography variant="h6">{subHeading.title}</Typography>
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
  );
};

export default ArticleDetail;