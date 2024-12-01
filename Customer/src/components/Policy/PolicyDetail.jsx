import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "../../config/axiosConfig";
const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));
const Slider = React.lazy(() => import("../Homes/Slider"));

const PolicyDetail = () => {
  const { policyId } = useParams(); // Lấy ID từ URL
  console.log("Policy ID:", policyId); // Log ID để kiểm tra

  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hàm gọi API để lấy chi tiết chính sách
    const fetchPolicyDetail = async () => {
      try {
        const response = await axios.get(
          `/policy/getById/${policyId}` // Endpoint của bạn
        );
        console.log("Policy data:", response.data);

        setPolicy(response.data); // Lưu dữ liệu vào state
      } catch (err) {
        setError("Không thể tải thông tin chính sách.");
      } finally {
        setLoading(false);
      }
    };

    if (policyId) { // Kiểm tra policyId trước khi gọi API
      fetchPolicyDetail();
    } else {
      setLoading(false); // Nếu không có policyId, không cần gọi API
      setError("ID chính sách không hợp lệ.");
    }
  }, [policyId]);

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

  if (!policy) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography>Không tìm thấy thông tin chính sách.</Typography>
      </Box>
    );
  }
  console.log("Policy state in render:", policy);

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
        {policy.policy.title || "Không có tiêu đề"}
      </Typography>
      <Box sx={{ paddingLeft: 8, marginRight: 5 }}>
        {/* Hiển thị thông tin chính sách */}
        <Typography variant="subtitle2">
          {`Tác giả: ${policy.policy.createBy || "Không rõ"}, ${policy.policy.createAt ? formatDate(policy.policy.createAt) : "Không rõ"}`}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ marginTop: 2,textAlign: "justify", textIndent: "20px" }} // Thụt vào đầu dòng
        >
          {policy.policy.summary || "Không có tóm tắt"}
        </Typography>


        {/* Hiển thị mainHeadings */}
        {policy.policy.mainHeadings?.length > 0 ? (
          policy.policy.mainHeadings.map((mainHeading, index) => (
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

export default PolicyDetail;
