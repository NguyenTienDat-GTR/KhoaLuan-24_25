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
import useAppointmentRequestStore from "../../../hooks/appointmentRequest/useAppointmentRequestStore.jsx";
import * as XLSX from "xlsx"; // Thư viện hỗ trợ xuất Excel


const DialogSumRequest = ({filters, open, onClose}) => {
    const {token, userLoggedIn} = useUserStore();
    const {getAllRequestAppointment, appointmentRequests} = useAppointmentRequestStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10); // Cố định mỗi trang 10 dòng

    useEffect(() => {
        if (token) {
            getAllRequestAppointment(token, {filters});
        }
    }, [token, filters]);


    // Xử lý thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Lấy dữ liệu của trang hiện tại
    const currentRequests = appointmentRequests?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Hàm xử lý xuất file Excel
    const handleExportToExcel = () => {
        const formattedData = appointmentRequests.map((request, index) => ({
            STT: index + 1,
            "Khách hàng": request?.name || "",
            "Điện thoại": request?.phone || "",
            Email: request?.email || "",
            "Giới tính": request?.gender === "male" ? "Nam" : "Nữ",
            "Ngày gửi yêu cầu": request?.createAt || ""
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách yêu cầu");

        XLSX.writeFile(workbook, "Danh_sach_yeu_cau.xlsx");
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Tổng số yêu cầu</DialogTitle>
            <DialogContent sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{width: '100%', mt: "15rem"}}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{backgroundColor: '#f0f0f0'}}>
                                    <TableCell sx={{fontWeight: 'bold'}}>STT</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Tên khách hàng</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Điện thoại</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Email</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Giới tính</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Ngày gửi yêu cầu</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentRequests?.map((request, index) => (
                                    <TableRow key={request._id || index}>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{request?.customerName}</TableCell>
                                        <TableCell>{request?.customerPhone}</TableCell>
                                        <TableCell>{request?.customerEmail}</TableCell>
                                        <TableCell>{request?.gender === "male" ? "Nam" : "Nữ"} </TableCell>
                                        <TableCell>{request?.createAt}</TableCell>
                                    </TableRow>
                                ))}
                                {appointmentRequests?.length === 0 && (
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
                        count={appointmentRequests?.length || 0}
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
    )
}
export default DialogSumRequest
