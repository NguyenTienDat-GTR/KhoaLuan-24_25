import React, {useEffect, useState} from "react";
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    Button, CircularProgress, Box, TextField, Divider, Typography
} from "@mui/material";
import axios from "../../config/axiosConfig";
import useUserStore from "../../hooks/auth/useUserStore";
import useGetAllService from "../../hooks/service/useGetAllServiceType";
import {toast} from "react-toastify";


const EditArticleService = ({selectedService, onClose, open}) => {
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const {userLoggedIn, setUserLoggedIn, token} = useUserStore();
    const {services, getAllService} = useGetAllService();


    useEffect(() => {
        if (token) {
            getAllService();
        }
    }, [token]);


    useEffect(() => {
        if (selectedService) {
            setService({...selectedService});
        }
    }, [selectedService]);

    const handleInputChange = (path, value) => {
        // Chia path thành các phần của object (ví dụ: "blog.title", "blog.mainHeadings[0].title")
        const keys = path.split('.');
        setService((prevState) => {
            // Sao chép state cũ
            let newState = {...prevState};

            // Duyệt qua các keys và cập nhật giá trị
            let current = newState;
            keys.forEach((key, index) => {
                // Kiểm tra nếu key là một chỉ mục mảng (ví dụ: mainHeadings[0].title)
                const arrayIndexMatch = key.match(/\[(\d+)\]/);
                if (arrayIndexMatch) {
                    const arrayIndex = parseInt(arrayIndexMatch[1], 10);
                    // Cập nhật nếu là một chỉ mục mảng
                    if (index === keys.length - 1) {
                        current[key.slice(0, arrayIndexMatch.index)] = current[key.slice(0, arrayIndexMatch.index)] || [];
                        current[key.slice(0, arrayIndexMatch.index)][arrayIndex] = value;
                    } else {
                        current[key.slice(0, arrayIndexMatch.index)] = current[key.slice(0, arrayIndexMatch.index)] || [];
                        current = current[key.slice(0, arrayIndexMatch.index)][arrayIndex];
                    }
                } else {
                    // Cập nhật nếu không phải là chỉ mục mảng
                    if (index === keys.length - 1) {
                        current[key] = value;
                    } else {
                        current[key] = current[key] || {};
                        current = current[key];
                    }
                }
            });

            return newState;
        });
    };

    const handleImageChange = (index, mainIndex, isSubheading, imageIndex) => (event) => {
        const file = event.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file); // Tạo URL cho hình ảnh vừa chọn

            // Cập nhật lại hình ảnh trong state
            setService((prevState) => {
                const updatedMainHeadings = [...prevState?.blog.mainHeadings];
                if (isSubheading) {
                    // Cập nhật hình ảnh cho tiêu đề phụ
                    updatedMainHeadings[mainIndex].subheadings[imageIndex].imageUrls = [
                        newImageUrl,  // Thay thế hình ảnh hiện tại bằng hình ảnh mới
                    ];
                } else {
                    // Cập nhật hình ảnh cho tiêu đề chính
                    updatedMainHeadings[mainIndex].imageUrls = [
                        newImageUrl,  // Thay thế hình ảnh hiện tại bằng hình ảnh mới
                    ];
                }
                return {
                    ...prevState,
                    blog: {
                        ...prevState.blog,
                        mainHeadings: updatedMainHeadings,
                    },
                };
            });
        }
    };

    const handleSave = async () => {
        try {
            const updatedArticle = {
                ...service?.blog,
                title: service?.blog?.title,
                createBy: service?.blog?.createBy,
                content: service?.blog?.content,
            };
            console.log(updatedArticle);
            setLoading(true)
            const response = await axios.put(`/article/update/${service._id}`, updatedArticle, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("kết quả lưu là:", response)
            if (response.status === 200) {
                toast.success(response.data?.message, {
                    autoClose: 2000,
                });
                setLoading(false)
                onClose();
            } else {
                console.error(response);
                setLoading(false)
                toast.error("Không thể cập nhật dịch vụ. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi cập nhật dịch vụ:", error.response?.data || error.message);
            setLoading(false)
            toast.error(`Lỗi: ${error.response?.data?.message || "Không thể cập nhật dịch vụ."}`);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{color: "red", fontWeight: "bold", textAlign: "center"}}>
                    Chỉnh sửa bài viết dịch vụ
                </DialogTitle>
                <DialogContent>
                    {error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <Box>
                            <Typography variant="h6" gutterBottom sx={{fontWeight: "bold", color: "blue"}}>
                                Bài viết liên quan
                            </Typography>
                            {service?.blog ? (
                                <Box>
                                    <TextField
                                        label="Tiêu đề"
                                        variant="outlined"
                                        fullWidth
                                        value={service.blog.title || ""}
                                        onChange={(e) => handleInputChange("blog.title", e.target.value)}
                                        sx={{mb: 2}}
                                    />
                                    <TextField
                                        label="Tác giả"
                                        variant="outlined"
                                        fullWidth
                                        value={service.blog.createBy || ""}
                                        onChange={(e) => handleInputChange("blog.createBy", e.target.value)}
                                        sx={{mb: 2}}
                                        disabled={true}
                                    />
                                    {/* Các tiêu đề chính */}
                                    {service.blog.mainHeadings?.length > 0 ? (
                                        <Box>
                                            <Typography variant="body1" sx={{mt: 2}}>
                                                <strong>Các tiêu đề chính:</strong>
                                            </Typography>
                                            {service.blog.mainHeadings.map((main, index) => (
                                                <Box key={index} sx={{mt: 1}}>
                                                    <TextField
                                                        label={`Tiêu đề chính ${index + 1}`}
                                                        variant="outlined"
                                                        fullWidth
                                                        value={main.title || ""}
                                                        onChange={(e) =>
                                                            handleInputChange(`blog.mainHeadings[${index}].title`, e.target.value)
                                                        }
                                                        sx={{mb: 1}}
                                                    />
                                                    <TextField
                                                        label={`Nội dung ${index + 1}`}
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline
                                                        rows={5}
                                                        value={main.content || ""}
                                                        onChange={(e) =>
                                                            handleInputChange(`blog.mainHeadings[${index}].content`, e.target.value)
                                                        }
                                                        sx={{mt: 1}}
                                                    />
                                                    {main.imageUrls?.length && (
                                                        <Box sx={{mt: 1}}>
                                                            <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                                                                Hình ảnh hiện tại:
                                                            </Typography>
                                                            {main.imageUrls.map((url, imgIndex) => (
                                                                <Box key={imgIndex}>
                                                                    <img
                                                                        src={url}
                                                                        alt={`Hình ảnh bài viết ${imgIndex + 1}`}
                                                                        style={{
                                                                            width: "100px",
                                                                            height: "100px",
                                                                            objectFit: "cover"
                                                                        }}
                                                                    />
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={handleImageChange(index, imgIndex, false, imgIndex)} // Thêm logic xử lý hình ảnh
                                                                    />
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                    )}
                                                </Box>
                                            ))}
                                        </Box>
                                    ) : (
                                        <Typography variant="body2" color="textSecondary">
                                            Không có Tiêu đề chính nào.
                                        </Typography>
                                    )}
                                </Box>
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    Không có thông tin bài viết.
                                </Typography>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    {!loading ? (
                        <>
                            <Button onClick={onClose} color="error" variant="outlined">
                                Đóng
                            </Button>
                            <Button onClick={handleSave} color="success" variant="contained">
                                Lưu
                            </Button>
                        </>) : (
                        <Typography>Đang xử lí.....</Typography>
                    )}
                </DialogActions>
            </Dialog>


        </>
    );
};

export default EditArticleService;