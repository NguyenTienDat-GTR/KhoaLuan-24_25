import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    CircularProgress,
    Box,
    TextField,
    Divider,
    Typography,
    MenuItem,
} from "@mui/material";
import axios from "../../config/axiosConfig";
import useUserStore from "../../hooks/auth/useUserStore";
import useGetAllService from "../../hooks/service/useGetAllServiceType";
import {toast} from "react-toastify"

const EditService = ({selectedService, onClose, open, onRefresh}) => {
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {userLoggedIn, setUserLoggedIn, token} = useUserStore();
    const {services, getAllService} = useGetAllService();


    const units = {
        tooth: "Răng",
        jaw: "Hàm",
        treatment: "Liệu trình",
        set: "Bộ",
        session: "Lần",
    };

    useEffect(() => {
        setService(selectedService)
    }, [selectedService])

    const handleSave = async () => {
        const updatedService = {
            ...service,
            price: service.price || "",
            description: service.description || "",
            priceRange: service.priceRange || "",
            unit: service.unit || "",
            discount: service.discount || "",
            duration: service.duration || "", // Thời gian thực hiện
            //serviceTypeName: service.serviceTypeName|| "", // Loại dịch vụ
        };
        console.log(updatedService);

        try {
            setLoading(true)
            const response = await axios.put(`/service/update/${selectedService._id}`, updatedService, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response)
            if (response.status === 200) {
                toast.success("Cập nhật dịch vụ thành công!");
                onRefresh();
                onClose();

            } else {
                console.error(response);
                toast.error("Không thể cập nhật dịch vụ. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi cập nhật dịch vụ:", error.response?.data || error.message);
            toast.error(`Lỗi: ${error.response?.data?.message || "Không thể cập nhật dịch vụ."}`);
        } finally {
            setLoading(false)
        }
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{color: "red", fontWeight: "bold", textAlign: "center"}}>
                Chỉnh sửa dịch vụ
            </DialogTitle>
            <DialogContent>
                {error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <>
                        <Box>
                            <TextField
                                label="Tên dịch vụ"
                                variant="outlined"
                                fullWidth
                                value={service?.name || ""} // Dùng state 'service'
                                onChange={(e) => setService({...service, name: e.target.value})}
                                sx={{mb: 2}}
                            />
                            <TextField
                                label="Giá"
                                variant="outlined"
                                fullWidth
                                value={service?.price || ""}
                                onChange={(e) => setService({...service, price: e.target.value})}
                                sx={{mb: 2}}
                            />
                            <TextField
                                label="Khoảng giá"
                                variant="outlined"
                                fullWidth
                                value={service?.priceRange || ""}
                                onChange={(e) => setService({...service, priceRange: e.target.value})}
                                sx={{mb: 2}}
                            />
                            <TextField
                                select
                                label="Đơn vị tính"
                                variant="outlined"
                                fullWidth
                                value={service?.unit || ""}
                                onChange={(e) => setService({...service, unit: e.target.value})}
                                sx={{mb: 2}}
                            >
                                {Object.entries(units).map(([key, label]) => (
                                    <MenuItem key={key} value={key}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Thời gian thực hiện (phút)"
                                variant="outlined"
                                fullWidth
                                value={service?.duration || ""}
                                onChange={(e) => setService({...service, duration: e.target.value})}
                                sx={{mb: 2}}
                            />
                            <TextField
                                label="Giảm giá (%)"
                                variant="outlined"
                                fullWidth
                                value={service?.discount || ""}
                                onChange={(e) => setService({...service, discount: e.target.value})}
                                sx={{mb: 2}}
                            />
                            <TextField
                                label="Mô tả"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={service?.description || ""}
                                onChange={(e) => setService({...service, description: e.target.value})}
                                sx={{mb: 2}}
                            />
                        </Box>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                {!loading ?
                    (
                        <>
                            <Button onClick={onClose} color="error">
                                Đóng
                            </Button>
                            <Button onClick={handleSave} color="success">
                                Lưu
                            </Button>
                        </>
                    ) : <Typography>Đang cập nhật...</Typography>
                }
            </DialogActions>
        </Dialog>
    );
};

export default EditService;
