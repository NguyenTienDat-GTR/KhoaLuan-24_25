import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    CircularProgress,
    Box,
    Typography,
    Divider
} from "@mui/material";
import axios from "../../config/axiosConfig";

const ServiceDetailModal = ({selectedService, onClose, open}) => {
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


    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{color: 'red', fontWeight: 'bold', textAlign: 'center'}}>Chi tiết dịch vụ</DialogTitle>
            <DialogContent>
                {error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <>
                        {/* Hiển thị thông tin dịch vụ */}
                        <Box>
                            <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold', color: 'blue'}}>
                                {selectedService?.name || "Không có tên dịch vụ"}
                            </Typography>
                            <Divider/>
                            <Typography sx={{fontWeight: 'bold'}}>
                                Giá: {selectedService?.price ? selectedService.price.toLocaleString("vi-VN") : "Không có giá"} VND
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}}>
                                Khoảng giá: {selectedService?.priceRange || "Không có thông tin"} VND
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}}>
                                Đơn vị tính: {units[selectedService?.unit] || "Không có thông tin"}
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}}>
                                Giảm giá: {selectedService?.discount || 0}%
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}}>
                                Mô tả: {selectedService?.description || "Không có mô tả"}
                            </Typography>
                            {selectedService?.imageUrls?.length > 0 && (
                                <Box sx={{mt: 2}}>
                                    <Typography variant="body1" sx={{fontWeight: "bold"}}>
                                        Hình ảnh dịch vụ:
                                    </Typography>
                                    <Box display="flex" gap={2} sx={{flexWrap: "wrap"}}>
                                        {selectedService.imageUrls.map((url, index) => (
                                            <img
                                                key={index}
                                                src={url}
                                                alt={`Hình ảnh bài viết ${index + 1}`}
                                                style={{width: "100px", height: "auto", marginBottom: "10px"}}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </Box>

                        <Divider sx={{my: 2}}/>

                        {/* Hiển thị bài viết */}
                        <Box>
                            <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold', color: 'blue'}}>
                                Bài viết liên quan
                            </Typography>
                            {selectedService?.blog ? (
                                <Box>
                                    <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                                        <strong>Tiêu đề:</strong> {selectedService.blog.title || "Không có tiêu đề"}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Tác giả:</strong> {selectedService.blog.createBy || "Không rõ"}
                                    </Typography>

                                    {/* Hiển thị các Tiêu đề chính (Main Headings) */}
                                    {selectedService.blog.mainHeadings?.length > 0 ? (
                                        <Box>
                                            <Typography variant="body1" sx={{mt: 2}}>
                                                <strong>Các tiêu đề chính:</strong>
                                            </Typography>
                                            {selectedService.blog.mainHeadings.map((main, index) => (
                                                <Box key={index} sx={{mb: 2}}>
                                                    <Typography variant="h6">
                                                        {["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][index]}. {main.title}
                                                    </Typography>
                                                    <Typography variant="body2">{main.content}</Typography>

                                                    {main.imageUrls?.length > 0 && (
                                                        <Box sx={{mt: 2}}>
                                                            <Typography variant="body1" sx={{fontWeight: "bold"}}>
                                                                Hình ảnh bài viết:
                                                            </Typography>
                                                            <Box display="flex" gap={2} sx={{flexWrap: "wrap"}}>
                                                                {main.imageUrls.map((url, index) => (
                                                                    <img
                                                                        key={index}
                                                                        src={url}
                                                                        alt={`Hình ảnh bài viết ${index + 1}`}
                                                                        style={{
                                                                            width: "100px",
                                                                            height: "auto",
                                                                            marginBottom: "10px"
                                                                        }}
                                                                    />
                                                                ))}
                                                            </Box>
                                                        </Box>
                                                    )}

                                                    {/* Hiển thị Tiêu đề phụ (Subheadings) */}
                                                    {main.subheadings?.length > 0 && (
                                                        <Box sx={{pl: 2}}>
                                                            <Typography variant="body1" sx={{mt: 1}}>
                                                                <strong>Các tiêu đề phụ:</strong>
                                                            </Typography>
                                                            {main.subheadings.map((sub, subIndex) => (
                                                                <Box key={subIndex} sx={{mb: 2}}>
                                                                    <Typography variant="h6">
                                                                        {subIndex + 1}. {sub.title}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2">{sub.content}</Typography>

                                                                    {sub.imageUrls?.length > 0 && (
                                                                        <Box sx={{mt: 2}}>
                                                                            <Typography variant="body1"
                                                                                        sx={{fontWeight: "bold"}}>
                                                                                Hình ảnh bài viết:
                                                                            </Typography>
                                                                            <Box display="flex" gap={2}
                                                                                 sx={{flexWrap: "wrap"}}>
                                                                                {sub.imageUrls.map((url, index) => (
                                                                                    <img
                                                                                        key={index}
                                                                                        src={url}
                                                                                        alt={`Hình ảnh bài viết ${index + 1}`}
                                                                                        style={{
                                                                                            width: "100px",
                                                                                            height: "auto",
                                                                                            marginBottom: "10px"
                                                                                        }}
                                                                                    />
                                                                                ))}
                                                                            </Box>
                                                                        </Box>
                                                                    )}

                                                                    {/* Hiển thị Tiêu đề cấp ba (SubSubheadings) */}
                                                                    {sub.subSubheadings?.length > 0 && (
                                                                        <Box sx={{pl: 2}}>
                                                                            <Typography variant="body1" sx={{mt: 1}}>
                                                                                <strong>Các tiêu đề cấp ba:</strong>
                                                                            </Typography>
                                                                            {sub.subSubheadings.map((subSub, subSubIndex) => (
                                                                                <Box key={subSubIndex} sx={{mb: 2}}>
                                                                                    <Typography variant="h6">
                                                                                        {["a", "b", "c", "d", "e"][subSubIndex]}. {subSub.title}
                                                                                    </Typography>
                                                                                    <Typography
                                                                                        variant="body2">{subSub.content}</Typography>

                                                                                    {/* Hiển thị hình ảnh nếu có */}
                                                                                    {subSub.imageUrls?.length > 0 && (
                                                                                        <Box sx={{mt: 2}}>
                                                                                            <Typography variant="body2"
                                                                                                        sx={{fontWeight: "bold"}}>
                                                                                                Hình ảnh:
                                                                                            </Typography>
                                                                                            <Box display="flex" gap={2}
                                                                                                 sx={{flexWrap: "wrap"}}>
                                                                                                {subSub.imageUrls.map((url, imgIndex) => (
                                                                                                    <img
                                                                                                        key={imgIndex}
                                                                                                        src={url}
                                                                                                        alt={`Hình ảnh bài viết ${imgIndex + 1}`}
                                                                                                        style={{
                                                                                                            width: "100px",
                                                                                                            height: "auto",
                                                                                                            marginBottom: "10px"
                                                                                                        }}
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
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ServiceDetailModal;