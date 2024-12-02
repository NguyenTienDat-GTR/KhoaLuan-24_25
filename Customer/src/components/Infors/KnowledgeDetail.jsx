import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "../../config/axiosConfig";
const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));
const Slider = React.lazy(() => import("../Homes/Slider"));

const KnowledgeDetail = () => {
  const { knowledgeId } = useParams(); // Lấy ID từ URL
  console.log("knowledge ID:", knowledgeId); // Log ID để kiểm tra

  const [knowledge, setKnowledge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hàm gọi API để lấy chi tiết chính sách
    const fetchKnowledgeDetail = async () => {
      try {
        const response = await axios.get(
          `/knowledge/getById/${knowledgeId}` // Endpoint của bạn
        );
        console.log("Knowledge data:", response.data);

        setKnowledge(response.data); // Lưu dữ liệu vào state
      } catch (err) {
        setError("Không thể tải thông tin chính sách.");
      } finally {
        setLoading(false);
      }
    };

    if (knowledgeId) { // Kiểm tra knowledgeId trước khi gọi API
      fetchKnowledgeDetail();
    } else {
      setLoading(false); // Nếu không có knowledgeId, không cần gọi API
      setError("ID chính sách không hợp lệ.");
    }
  }, [knowledgeId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-US', options).replace(',', '');
  };


  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!knowledge) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography>Không tìm thấy thông tin chính sách.</Typography>
      </Box>
    );
  }
  console.log("Knowledge state in render:", knowledgeId);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Suspense fallback={<CircularProgress />}>
        <Header />
      </Suspense>
      <Box
        sx={{
          flex: 1, // Chiếm phần còn lại của không gian
          paddingTop: { md: "8rem", xs: "5rem" },

        }}
      >
        {/* Nội dung của trang */}
        <Slider />
      </Box>
      <Typography
        variant="h4"
        sx={{ color: "red", textAlign: "center" }} // Màu đỏ và căn giữa
      >
        {knowledge.data.title || "Không có tiêu đề"}
      </Typography>
      <Box sx={{ paddingLeft: 8, marginRight: 5 }}>
        {/* Hiển thị thông tin chính sách */}
        <Typography variant="subtitle2">
          {`Tác giả: ${knowledge.data.createBy || "Không rõ"}, ${knowledge.data.createAt ? formatDate(knowledge.data.createAt) : "Không rõ"}`}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ marginTop: 2,textAlign: "justify", textIndent: "20px" }} // Thụt vào đầu dòng
        >
          {knowledge.data.summary || "Không có tóm tắt"}
        </Typography>


        {/* Hiển thị mainHeadings */}
        {knowledge.data.mainHeadings?.length > 0 ? (
          knowledge.data.mainHeadings.map((mainHeading, index) => (
            <Box key={mainHeading._id} sx={{ marginTop: 2 }}>
              <Typography
                variant="h5"
                sx={{ color: "blue", fontWeight: "bold", fontSize: "18px" }} // Màu xanh, in đậm, cỡ chữ 18
              >
                {`${index + 1}. ${mainHeading.title || "Không có tiêu đề"}`}
              </Typography>
              {mainHeading.subheadings?.length > 0 ? (
                mainHeading.subheadings.map((subheading, subIndex) => (
                  <Box key={subheading._id} sx={{ marginLeft: 2 }}> {/* Thụt vào đầu dòng cho subheading */}
                    <Typography
                      sx={{ color: "blue", fontSize: "16px" }} // Màu xanh cho subheading
                    >
                      {subheading.title}
                    </Typography>
                    <Typography
                      sx={{  textAlign: "justify", textIndent: "20px" ,marginLeft: "20px",lineHeight: 1.6}} // Thụt đầu dòng cho dòng đầu tiên và căn giữa
                    >
                      {subheading.content || "Không có nội dung"}
                    </Typography>
                  </Box>
                ))
              ) : null}
              <Typography
                sx={{ textAlign: "justify", textIndent: "20px" }} // Thụt đầu dòng cho dòng đầu tiên và căn giữa
              >
               {mainHeading.content.split('\n').map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br /> {/* Xuống dòng */}
                  </span>
                )) || "Không có nội dung"}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>Không có dữ liệu cho mainHeadings.</Typography>
        )}
      </Box>

      <Suspense fallback={<CircularProgress />}>
        <Footer />
      </Suspense>
    </Box>
  );
};

export default KnowledgeDetail;
