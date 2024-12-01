import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    DialogActions,
    CircularProgress,
} from "@mui/material";
import axios from "../../config/axiosConfig";
import useUserStore from "../../hooks/auth/useUserStore";

const PolicyDetail = ({ open, onClose, policyId, onSave }) => {
    const [policy, setPolicy] = useState("");
    const [originalPolicy, setOriginalPolicy] = useState(""); // Lưu dữ liệu gốc
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    //const { token } = useUserStore();
    const { userLoggedIn, setUserLoggedIn, token } = useUserStore();
    const fetchDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`/policy/getById/${policyId}`);
            const fetchedPolicy = response.data?.policy || response.data;
            setPolicy(fetchedPolicy);
            setOriginalPolicy(fetchedPolicy); // Lưu dữ liệu gốc khi tải thành công
        } catch (error) {
            console.error("Error fetching policy:", error);
            setError("Không thể tải thông tin chính sách. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open && policyId) {
            fetchDetails();
        }
    }, [open, policyId]);

    const handleClose = () => {
        onClose();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true // Chọn định dạng 12 giờ
        };
        return date.toLocaleString('en-US', options).replace(',', ''); // Thay thế dấu phẩy để phù hợp định dạng
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleCancel = () => {
        setPolicy(originalPolicy); // Khôi phục lại dữ liệu gốc
        setIsEditing(false); // Thoát khỏi chế độ chỉnh sửa
    };
    useEffect(() => {
        if (token) {
            setUserLoggedIn(token);
        }
    }, [token]);

    const handleSave = async () => {
        console.log("Data being sent:", {
            title: policy.title,
            summary: policy.summary,
            mainHeadings: policy.mainHeadings,
            createBy: policy.createBy,
        });
        try {
            setLoading(true);  // Bắt đầu trạng thái loading
            setError(null);    // Xóa thông báo lỗi trước khi gửi yêu cầu

            // Gửi yêu cầu cập nhật chính sách tới API
            const response = await axios.put(`/policy/update/${policyId}`, policy, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                // Cập nhật dữ liệu gốc với dữ liệu đã lưu
                setOriginalPolicy(policy);
                onSave(policy); // Gọi hàm onSave với dữ liệu đã cập nhật
            } else {
                setError("Cập nhật chính sách không thành công. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Error updating policy:", error);
            setError("Không thể cập nhật chính sách. Vui lòng thử lại.");
        } finally {
            setLoading(false); // Kết thúc trạng thái loading
            setIsEditing(false); // Thoát khỏi chế độ chỉnh sửa
        }
    };

    if (loading) {
        return (
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Chi tiết chính sách</DialogTitle>
                <DialogContent>
                    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                        <CircularProgress />
                        <Typography sx={{ ml: 2 }}>Đang tải chi tiết chính sách...</Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>Chi tiết chính sách</DialogTitle>
            <DialogContent>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label="Tên chính sách"
                    value={policy.title || ""}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !isEditing }} // Cho phép chỉnh sửa nếu isEditing là true
                    onChange={(e) => setPolicy({ ...policy, title: e.target.value })}
                />
                <TextField
                    label="Nội dung tóm tắt của chính sách"
                    value={policy.summary || ""}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !isEditing }} // Cho phép chỉnh sửa nếu isEditing là true
                    onChange={(e) => setPolicy({ ...policy, summary: e.target.value })}
                />
                <TextField
                    label="Người tạo chính sách"
                    value={policy.createBy || ""}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }} // Không cho phép chỉnh sửa
                />
                <TextField
                    label="Thời gian tạo chính sách"
                    value={policy.createAt ? formatDate(policy.createAt) : ""}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }} // Không cho phép chỉnh sửa
                />

                {/* Thêm hiển thị các trường trong mainHeadings */}
                <Typography variant="h6" sx={{ mt: 2 }}>Các tiêu đề chính:</Typography>
                {policy.mainHeadings && policy.mainHeadings.length > 0 ? (
                    policy.mainHeadings.map((main, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <TextField
                                label={`Tiêu đề chính ${index + 1}`}
                                variant="outlined"
                                fullWidth
                                value={main.title || ""}
                                InputProps={{ readOnly: !isEditing }} // Cho phép chỉnh sửa nếu isEditing là true
                                onChange={(e) =>
                                    setPolicy(prev => {
                                        const updatedHeadings = [...prev.mainHeadings];
                                        updatedHeadings[index].title = e.target.value;
                                        return { ...prev, mainHeadings: updatedHeadings };
                                    })
                                }
                                sx={{ mb: 1 }}
                            />
                            <TextField
                                label={`Nội dung ${index + 1}`}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={5}
                                value={main.content || ""}
                                InputProps={{ readOnly: !isEditing }} // Cho phép chỉnh sửa nếu isEditing là true
                                onChange={(e) =>
                                    setPolicy(prev => {
                                        const updatedHeadings = [...prev.mainHeadings];
                                        updatedHeadings[index].content = e.target.value;
                                        return { ...prev, mainHeadings: updatedHeadings };
                                    })
                                }
                                sx={{ mb: 2 }}
                            />
                            {main.imageUrls?.length && (
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        Hình ảnh hiện tại:
                                    </Typography>
                                    {main.imageUrls.map((url, imgIndex) => (
                                        <Box key={imgIndex}>
                                            <img
                                                src={url}
                                                alt={`Hình ảnh bài viết ${imgIndex + 1}`}
                                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                            // onChange={handleImageChange(index, imgIndex, false, imgIndex)} // Thêm logic xử lý hình ảnh
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    ))
                ) : (
                    <Typography color="textSecondary">Không có tiêu đề nào.</Typography>
                )}
            </DialogContent>
            <DialogActions>
                {isEditing ? (
                    <>
                        <Button onClick={handleSave} sx={{
                            backgroundColor: 'blue',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'darkblue',
                                borderColor: 'darkblue',
                            }
                        }}>Lưu</Button>
                        <Button onClick={handleCancel} sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'darkred',
                                borderColor: 'darkred',
                            }
                        }}>Hủy</Button>
                    </>
                ) : (
                    <>
                        <Button onClick={handleEditToggle} sx={{
                            backgroundColor: 'blue',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'darkblue',
                                borderColor: 'darkblue',
                            }
                        }}>Chỉnh sửa</Button>
                        <Button onClick={handleClose} sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'darkred',
                                borderColor: 'darkred',
                            }
                        }}>Đóng</Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default PolicyDetail;
