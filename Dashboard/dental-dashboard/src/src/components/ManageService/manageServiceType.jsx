import React, {useEffect, useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    Box,
    Typography,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import {Edit, Delete} from "@mui/icons-material";
import axios from "../../config/axiosConfig";
import useGetAllService from "../../hooks/service/useGetAllServiceType";
import useUserStore from "../../hooks/auth/useUserStore";

const ManageServiceType = () => {
    const {services, loading, error, getAllService} = useGetAllService();
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedServiceType, setSelectedServiceType] = useState(null);
    const [editedName, setEditedName] = useState("");
    const {token} = useUserStore();

    useEffect(() => {
        if (token) {
            getAllService();
        }
    }, [token, getAllService]);

    const handleEditServiceType = (serviceType) => {
        setSelectedServiceType(serviceType);
        setEditedName(serviceType.typeName); // Điền tên loại dịch vụ hiện tại
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedServiceType(null);
        setEditedName("");
    };

    const handleSaveEdit = async () => {
        if (!editedName.trim()) {
            alert("Tên loại dịch vụ không được để trống!");
            return;
        }

        try {
            await axios.put(
                `/service-type/update/${selectedServiceType._id}`,
                {typeName: editedName}, // Dữ liệu gửi lên server
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Cập nhật loại dịch vụ thành công!");
            getAllService(); // Làm mới danh sách
            handleCloseEditModal(); // Đóng modal
        } catch (error) {
            console.error(
                "Lỗi khi cập nhật loại dịch vụ:",
                error.response?.data?.message || error.message
            );
        }
    };

    return (
        <Box sx={{padding: 4, marginTop: 8}}>
            <Typography variant="h6" sx={{fontWeight: "bold", mb: 2}}>
                Quản lý loại dịch vụ
            </Typography>

            {loading ? (
                <CircularProgress/>
            ) : error ? (
                <Typography color="error">Có lỗi xảy ra: {error}</Typography>
            ) : services?.length === 0 ? (
                <Typography>Không có loại dịch vụ nào để hiển thị</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{backgroundColor: "#f0f0f0"}}>
                                <TableCell sx={{fontWeight: "bold"}}>STT</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>
                                    Tên loại dịch vụ
                                </TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services?.map((serviceType, index) => (
                                <TableRow key={serviceType._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{serviceType.typeName}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Chỉnh sửa">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEditServiceType(serviceType)}
                                            >
                                                <Edit/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Xóa">
                                            <IconButton
                                                color="error"
                                                onClick={() =>
                                                    console.log("Hàm xóa loại dịch vụ chưa hoàn thiện")
                                                }
                                            >
                                                <Delete/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Modal chỉnh sửa */}
            <Dialog
                open={openEditModal}
                onClose={handleCloseEditModal}
                sx={{
                    "& .MuiDialog-paper": {
                        borderRadius: "12px",
                        padding: "20px",
                        maxWidth: "700px", // Đã tăng chiều rộng của modal
                        margin: "auto",
                    },
                }}
            >
                <DialogTitle sx={{textAlign: "center", fontWeight: "bold"}}>
                    Chỉnh sửa loại dịch vụ
                </DialogTitle>
                <DialogContent sx={{paddingTop: "20px"}}>
                    <TextField
                        fullWidth
                        label="Tên loại dịch vụ"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        margin="normal"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                                color: "#1976d2",
                            },
                            "& .MuiInputBase-input": {
                                height: "40px", // Tăng chiều cao của trường nhập liệu
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{justifyContent: "center"}}>
                    <Button
                        onClick={handleCloseEditModal}
                        color="secondary"
                        variant="outlined"
                        sx={{
                            borderRadius: "8px",
                            textTransform: "none",
                        }}
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSaveEdit}
                        color="primary"
                        variant="contained"
                        sx={{
                            borderRadius: "8px",
                            textTransform: "none",
                            backgroundColor: "#1976d2",
                            "&:hover": {
                                backgroundColor: "#1565c0",
                            },
                        }}
                    >
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ManageServiceType;