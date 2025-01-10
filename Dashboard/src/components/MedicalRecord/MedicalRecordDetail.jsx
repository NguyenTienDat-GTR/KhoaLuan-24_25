import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box
} from "@mui/material";

const MedicalRecordDetail = ({ open, onClose, medicalRecord }) => {
    if (!medicalRecord) return null; // Không hiển thị nếu không có dữ liệu

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Chi tiết hồ sơ điều trị</DialogTitle>
            <DialogContent>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Thông tin bệnh nhân
                    </Typography>
                    <Typography><strong>Tên bệnh nhân:</strong> {medicalRecord.customerID?.name}</Typography>
                    <Typography><strong>Số điện thoại:</strong> {medicalRecord.customerID?.phone}</Typography>
                    <Typography><strong>Email:</strong> {medicalRecord.customerID?.email}</Typography>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Thông tin điều trị
                    </Typography>
                    <Typography><strong>Bác sĩ điều trị:</strong> {medicalRecord.doctorName}</Typography>
                    <Typography><strong>Ngày điều trị:</strong> {medicalRecord.date}</Typography>
                    <Typography><strong>Chẩn đoán:</strong> {medicalRecord.diagnosis || "Không có"}</Typography>
                    <Typography><strong>Kết quả:</strong> {medicalRecord.result || "Không có"}</Typography>
                    <Typography><strong>Ghi chú:</strong> {medicalRecord.note || "Không có"}</Typography>
                </Box>

                <Box>
                    <Typography variant="h6" gutterBottom>
                        Dịch vụ đã sử dụng
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>STT</strong></TableCell>
                                    <TableCell><strong>Dịch vụ</strong></TableCell>
                                    <TableCell><strong>Sử dụng cho răng/hàm</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {medicalRecord.usedService.map((service, index) => (
                                    <TableRow key={service.service._id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{service.service.name}</TableCell>
                                        <TableCell>{service.for || "Không có"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MedicalRecordDetail;
