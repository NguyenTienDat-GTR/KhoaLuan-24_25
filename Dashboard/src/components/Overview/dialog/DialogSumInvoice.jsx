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
import useInvoiceStore from "../../../hooks/Invoice/useInvoiceStore.jsx";
import * as XLSX from "xlsx";


const DialogSumInvoice = ({filters, open, onClose}) => {
    const {token, userLoggedIn} = useUserStore();
    const {getAllInvoices, invoices} = useInvoiceStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10); // Cố định mỗi trang 10 dòng

    useEffect(() => {
        if (token) {
            getAllInvoices(token, {filters});
        }
    }, [token, filters]);


    // Xử lý thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Lấy dữ liệu của trang hiện tại
    const currentInvoices = invoices?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Hàm xử lý xuất file Excel
    const handleExportToExcel = () => {
        const formattedData = invoices.map((invoice, index) => ({
            STT: index + 1,
            "Khách hàng": invoice?.customer?.name || "",
            "Tổng tiền": `${invoice?.invoice?.totalAmount.toLocaleString()} VNĐ` || "",
            "Trạng thái": invoice?.invoice?.isPaid ? "Đã thanh toán" : "Chưa thanh toán",
            "Ngày tạo": invoice?.invoice?.createAt || ""
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách hóa đơn");

        XLSX.writeFile(workbook, "Danh_sach_hoa_don.xlsx");
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
                                    <TableCell sx={{fontWeight: 'bold'}}>Tổng tiền</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Trạng thái</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Ngày tạo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentInvoices?.map((invoice, index) => (
                                    <TableRow key={invoice.invoice._id || index}>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{invoice?.customer?.name}</TableCell>
                                        <TableCell>{invoice?.invoice?.totalAmount.toLocaleString()} VNĐ</TableCell>
                                        <TableCell>{invoice?.invoice?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</TableCell>
                                        <TableCell>{invoice?.invoice?.createdAt} </TableCell>
                                    </TableRow>
                                ))}
                                {invoices?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            Không có dữ liệu
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={invoices?.length || 0}
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
export default DialogSumInvoice
