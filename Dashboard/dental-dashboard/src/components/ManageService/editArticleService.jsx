import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, 
    Button, CircularProgress, Box, TextField, Divider, Typography } from "@mui/material";
import axios from "../../config/axiosConfig";

const EditArticleService = ({ serviceId, closeModal, open }) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hàm fetch chi tiết bài viết
  const fetchDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`/service/getById/${serviceId}`);
      setService(response.data?.service || response.data);

    } catch (error) {
      console.error("Error fetching article:", error);
      setError("Không thể tải thông tin bài viết. Vui lòng thử lại.");
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
        <DialogTitle>Chỉnh sửa bài viết dịch vụ</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Đang tải bài viết dịch vụ...</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  const handleSave = async () => {
    try {
      const updatedArticle = {
        ...service?.blog,
        title: service?.blog?.title,
        createBy: service?.blog?.createBy,
        content: service?.blog?.content,
      };

      const response = await axios.put(`/service/updateArticle/${serviceId}`, updatedArticle);
      alert('Cập nhật bài viết thành công!');
      closeModal();
    } catch (error) {
      console.error('Lỗi cập nhật bài viết:', error);
      alert('Không thể cập nhật bài viết. Vui lòng thử lại.');
    }
  };

  return (
    <Dialog open={open} onClose={closeModal} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>Chỉnh sửa bài viết dịch vụ</DialogTitle>
      <DialogContent>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Box>
              <TextField
                label="Tiêu đề bài viết"
                variant="outlined"
                fullWidth
                value={service?.blog?.title || ""}
                onChange={(e) => setService({ ...service, blog: { ...service.blog, title: e.target.value } })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Tác giả"
                variant="outlined"
                fullWidth
                value={service?.blog?.createBy || ""}
                onChange={(e) => setService({ ...service, blog: { ...service.blog, createBy: e.target.value } })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Nội dung bài viết"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={service?.blog?.content || ""}
                onChange={(e) => setService({ ...service, blog: { ...service.blog, content: e.target.value } })}
                sx={{ mb: 2 }}
              />
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">Đóng</Button>
        <Button onClick={handleSave} color="primary">Lưu</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditArticleService;
