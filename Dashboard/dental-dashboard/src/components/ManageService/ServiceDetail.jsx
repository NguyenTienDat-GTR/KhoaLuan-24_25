import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, Box, Typography, Divider } from "@mui/material";
import axios from "../../config/axiosConfig";

const ServiceDetailModal = ({ serviceId, closeModal, open }) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Danh sách đơn vị tính bằng tiếng Việt
  const units = {
    tooth: "Răng",
    jaw: "Hàm",
    treatment: "Liệu trình",
    set: "Bộ",
    session: "Lần",
  };

  // Hàm fetch chi tiết dịch vụ và bài viết
  const fetchDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`/service/getById/${serviceId}`);
      setService(response.data?.service || response.data);
      console.log("Service data:", response.data);

    } catch (error) {
      console.error("Error fetching service:", error);
      setError("Không thể tải thông tin dịch vụ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Khi modal mở, reset lại trạng thái và gọi API để lấy dữ liệu nếu có serviceId
  useEffect(() => {
    if (open && serviceId) {
      fetchDetails();
      setService(null);
      setError(null);
    }
  }, [open, serviceId]);

  // Hiển thị khi đang tải
  if (loading) {
    return (
      <Dialog open={open} onClose={closeModal} maxWidth="md" fullWidth>
        <DialogTitle>Chi tiết dịch vụ</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Đang tải chi tiết dịch vụ và bài viết...</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={closeModal} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>Chi tiết dịch vụ</DialogTitle>
      <DialogContent>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            {/* Hiển thị thông tin dịch vụ */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'blue' }}>
                {service?.name || "Không có tên dịch vụ"}
              </Typography>
              <Divider />
              <Typography sx={{ fontWeight: 'bold' }}>
                Giá: {service?.price ? service.price.toLocaleString("vi-VN") : "Không có giá"} VND
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>
                Khoảng giá: {service?.priceRange || "Không có thông tin"}
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>
                Đơn vị tính: {units[service?.unit] || "Không có thông tin"}
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>
                Giảm giá: {service?.discount || 0}%
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>
                Mô tả: {service?.description || "Không có mô tả"}
              </Typography>
              {service?.imageUrls?.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Hình ảnh dịch vụ:
                  </Typography>
                  <Box display="flex" gap={2} sx={{ flexWrap: "wrap" }}>
                    {service.imageUrls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Hình ảnh bài viết ${index + 1}`}
                        style={{ width: "100px", height: "auto", marginBottom: "10px" }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
            
            <Divider sx={{ my: 2 }} />

            {/* Hiển thị bài viết */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'blue' }}>
                Bài viết liên quan
              </Typography>
              {service?.blog ? (
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    <strong>Tiêu đề:</strong> {service.blog.title || "Không có tiêu đề"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tác giả:</strong> {service.blog.createBy || "Không rõ"}
                  </Typography>

                  {/* Hiển thị các Tiêu đề chính (Main Headings) */}
                  {service.blog.mainHeadings?.length > 0 ? (
                    <Box>
                      <Typography variant="body1" sx={{ mt: 2 }}>
                        <strong>Các tiêu đề chính:</strong>
                      </Typography>
                      {service.blog.mainHeadings.map((main, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Typography variant="h6">
                            {["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][index]}. {main.title}
                          </Typography>
                          <Typography variant="body2">{main.content}</Typography>

                          {main.imageUrls?.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                Hình ảnh bài viết:
                              </Typography>
                              <Box display="flex" gap={2} sx={{ flexWrap: "wrap" }}>
                                {main.imageUrls.map((url, index) => (
                                  <img
                                    key={index}
                                    src={url}
                                    alt={`Hình ảnh bài viết ${index + 1}`}
                                    style={{ width: "100px", height: "auto", marginBottom: "10px" }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}

                          {/* Hiển thị Tiêu đề phụ (Subheadings) */}
                          {main.subheadings?.length > 0 && (
                            <Box sx={{ pl: 2 }}>
                              <Typography variant="body1" sx={{ mt: 1 }}>
                                <strong>Các tiêu đề phụ:</strong>
                              </Typography>
                              {main.subheadings.map((sub, subIndex) => (
                                <Box key={subIndex} sx={{ mb: 2 }}>
                                  <Typography variant="h6">
                                    {subIndex + 1}. {sub.title}
                                  </Typography>
                                  <Typography variant="body2">{sub.content}</Typography>

                                  {sub.imageUrls?.length > 0 && (
                                    <Box sx={{ mt: 2 }}>
                                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                        Hình ảnh bài viết:
                                      </Typography>
                                      <Box display="flex" gap={2} sx={{ flexWrap: "wrap" }}>
                                        {sub.imageUrls.map((url, index) => (
                                          <img
                                            key={index}
                                            src={url}
                                            alt={`Hình ảnh bài viết ${index + 1}`}
                                            style={{ width: "100px", height: "auto", marginBottom: "10px" }}
                                          />
                                        ))}
                                      </Box>
                                    </Box>
                                  )}

                                  {/* Hiển thị Tiêu đề cấp ba (SubSubheadings) */}
                                  {sub.subSubheadings?.length > 0 && (
                                    <Box sx={{ pl: 2 }}>
                                      <Typography variant="body1" sx={{ mt: 1 }}>
                                        <strong>Các tiêu đề cấp ba:</strong>
                                      </Typography>
                                      {sub.subSubheadings.map((subSub, subSubIndex) => (
                                        <Box key={subSubIndex} sx={{ mb: 2 }}>
                                          <Typography variant="h6">
                                            {["a", "b", "c", "d", "e"][subSubIndex]}. {subSub.title}
                                          </Typography>
                                          <Typography variant="body2">{subSub.content}</Typography>

                                          {/* Hiển thị hình ảnh nếu có */}
                                          {subSub.imageUrls?.length > 0 && (
                                            <Box sx={{ mt: 2 }}>
                                              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                                Hình ảnh:
                                              </Typography>
                                              <Box display="flex" gap={2} sx={{ flexWrap: "wrap" }}>
                                                {subSub.imageUrls.map((url, imgIndex) => (
                                                  <img
                                                    key={imgIndex}
                                                    src={url}
                                                    alt={`Hình ảnh bài viết ${imgIndex + 1}`}
                                                    style={{ width: "100px", height: "auto", marginBottom: "10px" }}
                                                  />
                                                ))}
                                              </Box>
                                            </Box>
                                          )}
                                        </Box>
                                      ))}
                                    </Box>
                                  )}
                                </Box>
                              ))}
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2">Không có bài viết liên quan.</Typography>
                  )}
                </Box>
              ) : (
                <Typography variant="body2">Không có bài viết liên quan.</Typography>
              )}
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceDetailModal;