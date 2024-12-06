import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    TextField,
} from "@mui/material";
import axios from "../../config/axiosConfig";
import useUserStore from "../../hooks/auth/useUserStore";

const KnowledgeDetail = ({ open, onClose, knowledgeId, onSave }) => {

    const [knowledge, setKnowledge] = useState("");
    const [loading, setLoading] = useState(true);

    const [originalKnowledge, setOriginalKnowledge] = useState(""); // Lưu dữ liệu gốc
    const [error, setError] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    //const { token } = useUserStore();
    const { userLoggedIn, setUserLoggedIn, token } = useUserStore();


    const fetchDetails = async () => {

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`/knowledge/getById/${knowledgeId}`);
            const fetchedKnowledge = response.data?.knowledge || response.data;
            console.log("API response:", response.data);
            setKnowledge(fetchedKnowledge);
            setOriginalKnowledge(fetchedKnowledge);
        } catch (error) {
            console.error("Failed to fetch knowledge:", error);
            setError("Không thể tải thông tin kiến thức Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Received knowledgeId in KnowledgeDetail:", knowledgeId);
    }, [knowledgeId]);


    useEffect(() => {
        if (open && knowledgeId) {
            fetchDetails();
        }
    }, [open, knowledgeId]);

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
        setKnowledge(originalKnowledge); // Khôi phục lại dữ liệu gốc
        setIsEditing(false); // Thoát khỏi chế độ chỉnh sửa
    };
    useEffect(() => {
        if (token) {
            setUserLoggedIn(token);
        }
    }, [token]);

    const handleSave = async () => {
        console.log("Data being sent:", {
            title: knowledge.data.title,
            summary: knowledge.data.summary,
            mainHeadings: knowledge.data.mainHeadings,
            createBy: knowledge.data.createBy,
        });
        try {
            setLoading(true);  // Bắt đầu trạng thái loading
            setError(null);    // Xóa thông báo lỗi trước khi gửi yêu cầu

            // Gửi yêu cầu cập nhật chính sách tới API
            const response = await axios.put(`/knowledge/update/${knowledgeId}`, knowledge, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                // Cập nhật dữ liệu gốc với dữ liệu đã lưu
                setOriginalKnowledge(knowledge);
                onSave(knowledge); // Gọi hàm onSave với dữ liệu đã cập nhật
            } else {
                setError("Cập nhật kiến thức không thành công. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Error updating knowledge:", error);
            setError("Không thể cập nhật kiến thức Vui lòng thử lại.");
        } finally {
            setLoading(false); // Kết thúc trạng thái loading
            setIsEditing(false); // Thoát khỏi chế độ chỉnh sửa
        }
    };

    if (loading) {
        return (
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>Loading...</DialogTitle>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Chi tiết kiến thức</DialogTitle>
            <DialogContent>
                {error && <Typography color="error">{error}</Typography>}

                <TextField
                    label="Tên kiến thức"
                    value={knowledge.data.title || ""}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !isEditing }} // Cho phép chỉnh sửa nếu isEditing là true
                    onChange={(e) => setKnowledge({ ...knowledge, title: e.target.value })}
                />
                <TextField
                    label="Nội dung tóm tắt của kiến thức"
                    value={knowledge.data.summary || ""}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !isEditing }} // Cho phép chỉnh sửa nếu isEditing là true
                    onChange={(e) => setKnowledge({ ...knowledge, summary: e.target.value })}
                />
                <TextField
                    label="Người tạo kiến thức"
                    value={knowledge.data.createBy || ""}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }} // Không cho phép chỉnh sửa
                />
                <TextField
                    label="Thời gian tạo kiến thức"
                    value={knowledge.data.createAt ? formatDate(knowledge.data.createAt) : ""}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }} // Không cho phép chỉnh sửa
                />

                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                        Hình ảnh:
                    </Typography>
                    <Grid container spacing={2}>
                        {knowledge.data.imageUrls?.map((url, index) => (
                            <Grid item xs={6} md={4} key={index}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="100"
                                        width="100"
                                        image={url}
                                        alt={`Image ${index + 1}`}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Typography variant="h6" sx={{ mt: 2 }}>Các tiêu đề chính:</Typography>
                {knowledge?.data?.mainHeadings?.length > 0 ? (
                    knowledge.data.mainHeadings.map((main, index) => (
                        <Box key={index} sx={{ mb: 3 }}>
                            <TextField label={`Tiêu đề chính ${index + 1}`}
                                       variant="outlined"
                                       fullWidth
                                       value={main.title || ""}
                                       InputProps={{ readOnly: !isEditing }} // Cho phép chỉnh sửa nếu isEditing là true
                                       onChange={(e) =>
                                           setKnowledge(prev => {
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
                                    setKnowledge(prev => {
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

export default KnowledgeDetail;