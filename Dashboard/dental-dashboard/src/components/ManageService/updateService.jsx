import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    FormControl,
    Select,
    MenuItem,
    Typography,
    Box,
    IconButton,InputLabel
} from "@mui/material";
import {
    Delete,
    AddPhotoAlternate,
    
} from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "../../config/axiosConfig";
import useUserStore from "../../hooks/auth/useUserStore";

const UpdateService = ({ serviceId, onCancel, onSave }) => {
    const [formData, setFormData] = useState({
        serviceName: '',
        description: '',
        price: '',
        discount: '',
        images: [],
        serviceTypeName: '',
        duration: '',
    });
    const [serviceType, setServiceType] = useState('');
    const token = useUserStore((state) => state.token); // Lấy token từ store

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`/service/getById/${serviceId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response);
                
                if (response.status === 200) {
                    setFormData(response.data);
                    setServiceType(response.data.category || '');
                } else {
                    toast.error('Không thể lấy thông tin dịch vụ');
                }
            } catch (error) {
                toast.error('Đã xảy ra lỗi khi lấy thông tin dịch vụ');
            }
        };

        if (serviceId) {
            fetchService();
        }
    }, [serviceId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/service/update/${serviceId}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                toast.success('Dịch vụ đã được cập nhật thành công');
                onSave(); // Gọi callback từ parent để cập nhật lại danh sách
            } else {
                toast.error('Cập nhật dịch vụ thất bại');
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi cập nhật dịch vụ');
        }
    };

    const handleAddImages = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: [...formData.images, ...files] });
    };

    const handleRemoveImage = (index) => {
        const newImages = formData.images.filter((_, idx) => idx !== index);
        setFormData({ ...formData, images: newImages });
    };

    return (
        <Dialog open={true} onClose={onCancel}>
            <DialogTitle>Chỉnh sửa dịch vụ</DialogTitle>
            <DialogContent>
                <Box display="flex" gap={2}>
                    <Box flex={1} p={2} border={1} borderColor="grey.300" borderRadius={2}>
                        <Typography variant="h6">Thông tin dịch vụ</Typography>
                        <FormControl fullWidth required margin="normal" variant="outlined">
                            <Select
                                value={serviceType}
                                onChange={(e) => setServiceType(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="">Chọn loại dịch vụ *</MenuItem>
                                {/* Replace services.map with actual service types */}
                                {/* {services.map((type) => (
                                    <MenuItem key={type._id} value={type.typeName}>
                                        {type.typeName}
                                    </MenuItem>
                                ))} */}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Tên dịch vụ"
                            fullWidth
                            required
                            margin="normal"
                            name="serviceName"
                            value={formData.serviceName}
                            onChange={handleChange}
                        />

                        <Box display="flex" gap={2} mt={2}>
                            <TextField
                                label="Giá thấp nhất (VND)"
                                type="number"
                                fullWidth
                                required
                                name="minPrice"
                                value={formData.minPrice}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Giá cao nhất (VND)"
                                type="number"
                                fullWidth
                                required
                                name="maxPrice"
                                value={formData.maxPrice}
                                onChange={handleChange}
                            />
                        </Box>

                        <TextField
                            label="Giá (VND)"
                            type="number"
                            fullWidth
                            required
                            margin="normal"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />

                        <Typography variant="caption" display="block">
                            Giá trị bằng chữ: {/* render price text here */}
                        </Typography>

                        <TextField
                            label="Giảm giá (%)"
                            type="number"
                            fullWidth
                            margin="normal"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Mô tả"
                            fullWidth
                            required
                            multiline
                            rows={3}
                            margin="normal"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <FormControl fullWidth required margin="normal">
                            <InputLabel shrink={Boolean(formData.duration)}>Thời gian (phút)</InputLabel>
                            <Select
                                value={formData.duration}
                                onChange={handleChange}
                                name="duration"
                            >
                                <MenuItem value="">Chọn thời gian</MenuItem>
                                {[30, 60, 90, 120].map((time) => (
                                    <MenuItem key={time} value={time}>
                                        {time} phút
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box mt={2}>
                            <Button variant="outlined" component="label" startIcon={<AddPhotoAlternate />}>
                                Thêm hình ảnh
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    accept="image/*"
                                    onChange={handleAddImages}
                                />
                            </Button>
                            <Box display="flex" mt={2} gap={1} flexWrap="wrap">
                                {formData.images.map((image, index) => (
                                    <Box key={index} position="relative">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`service-image-${index}`}
                                            width="80"
                                            height="80"
                                            style={{ borderRadius: "4px" }}
                                        />
                                        <IconButton
                                            onClick={() => handleRemoveImage(index)}
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                                backgroundColor: "white",
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="secondary">Hủy</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">Cập nhật</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateService;
