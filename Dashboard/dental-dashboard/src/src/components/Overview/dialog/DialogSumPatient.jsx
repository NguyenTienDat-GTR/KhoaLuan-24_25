import React, {useEffect, useState} from 'react'
import {
    Box, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";
import useUserStore from "../../../hooks/auth/useUserStore.jsx";
import usePatientStore from "../../../hooks/patient/usePatientStore.jsx";
import * as XLSX from "xlsx"; // Thư viện hỗ trợ xuất Excel

const DialogSumPatient = ({filters, open, onClose}) => {
    const {token, userLoggedIn} = useUserStore();
    const {patients, getAllPatients} = usePatientStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10); // Cố định mỗi trang 10 dòng

    useEffect(() => {
        if (token) {
            getAllPatients(token, {filters});
        }
    }, [token, filters]);


    // Xử lý thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Lấy dữ liệu của trang hiện tại
    const currentPatients = patients?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Hàm xử lý xuất file Excel
    const handleExportToExcel = () => {
        const formattedData = patients.map((patient, index) => ({
            STT: index + 1,
            "Bệnh nhận": patient?.name || "",
            "Điện thoại": patient?.phone || "",
            Email: patient?.email || "",
            "Giới tính": patient?.gender === "male" ? "Nam" : "Nữ",
            "Ngày tạo": patient?.createdAt || ""
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách bệnh nhân");

        XLSX.writeFile(workbook, "Danh_sach_benh_nhan.xlsx");
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Tổng số bệnh nhân</DialogTitle>
            <DialogContent sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{width: '100%', mt: "15rem"}}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{backgroundColor: '#f0f0f0'}}>
                                    <TableCell sx={{fontWeight: 'bold'}}>STT</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Tên bệnh nhân</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Điện thoại</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Email</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Giới tính</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Ngày tạo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentPatients?.map((patient, index) => (
                                    <TableRow key={patient._id || index}>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{patient?.name}</TableCell>
                                        <TableCell>{patient?.phone}</TableCell>
                                        <TableCell>{patient?.email}</TableCell>
                                        <TableCell>{patient?.gender === "male" ? "Nam" : "Nữ"} </TableCell>
                                        <TableCell>{patient?.createdAt}</TableCell>
                                    </TableRow>
                                ))}
                                {patients?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            Không có dữ liệu
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={patients?.length || 0}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[]} // Ẩn tùy chọn số dòng mỗi trang
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error" variant="contained">Đóng</Button>
                <Button onClick={handleExportToExcel} color="primary" variant="contained">Xuất file</Button>
            </DialogActions>
        </Dialog>
    );
}
export default DialogSumPatient
