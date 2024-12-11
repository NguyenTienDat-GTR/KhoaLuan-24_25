import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
} from "@mui/material";
import {toast} from "react-toastify";
import axios from "../../config/axiosConfig";
import useUserStore from "../../hooks/auth/useUserStore.jsx";

const EditPatient = ({open, onClose, patient, onRefresh}) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        gender: "",
    });
    const [error, setError] = useState("");
    const {token} = useUserStore()

    useEffect(() => {
        if (patient) {
            setFormData({
                name: patient.name || "",
                phone: patient.phone || "",
                email: patient.email || "",
                gender: patient.gender || "male",
            });
        }
    }, [patient]);

    const handleSave = async () => {
        try {
            const response = await axios.put(`/customer/update/${patient._id}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.success(response.data.message, {autoClose: 2000});
                onRefresh();
                onClose();
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Lỗi khi cập nhật bệnh nhân.";
            toast.error(errorMessage);
            setError(errorMessage);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Chỉnh sửa thông tin bệnh nhân</DialogTitle>
            <DialogContent>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label="Họ tên"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <TextField
                    label="Số điện thoại"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <TextField
                    label="Email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <RadioGroup
                    row
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2}}
                >
                    <Typography>Giới tính</Typography>
                    <FormControlLabel value="male" control={<Radio/>} label="Nam"/>
                    <FormControlLabel value="female" control={<Radio/>} label="Nữ"/>
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error" variant="outlined">
                    Hủy
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained">
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPatient;
