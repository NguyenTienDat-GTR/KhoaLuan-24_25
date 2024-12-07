import React, {useEffect, useState} from 'react'
import useUserStore from "../../../hooks/auth/useUserStore.jsx";
import useTicketStore from "../../../hooks/appointmentTicket/useTicketStore.jsx";
import * as XLSX from "xlsx";
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
} from "@mui/material"; // Thư viện hỗ trợ xuất Excel

const DialogTicketDoneOfDoctor = ({filters, open, onClose}) => {
    const {token, userLoggedIn} = useUserStore();
    const {getTicketDoneOfDoctor, ticketDoneOfDoctor} = useTicketStore();

    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10); // Cố định mỗi trang 10 dòng

    useEffect(() => {
        if (token)
            getTicketDoneOfDoctor(token, {filters})
    }, [token, filters]);

    // Xử lý thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Lấy dữ liệu của trang hiện tại
    const currentTickets = ticketDoneOfDoctor?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Hàm xử lý xuất file Excel
    const handleExportToExcel = () => {
        const formattedData = ticketDoneOfDoctor.map((ticket, index) => ({
            STT: index + 1,
            "Khách hàng": ticket.customer?.name || "",
            "Điện thoại": ticket.customer?.phone || "",
            "Email": ticket.customer?.email || "",
            "Giới tính": ticket.customer?.gender === "male" ? "Nam" : "Nữ",
            "Ngày hẹn": ticket.requestedDate || "",
            "Trạng thái": ticket?.status === "done" ? "Đã hoàn thành" : ticket?.status === "waiting" ? "Chờ xác nhận" : "Đã hủy",
            "Ngày hoàn thành": ticket?.doneAt || ""
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách lịch hẹn hoàn thành");

        XLSX.writeFile(workbook, "Danh_sach_lich_hen_hoan_thanh.xlsx");
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Số lịch hẹn hoàn thành</DialogTitle>
            <DialogContent sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{width: '100%', mt: "5rem"}}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{backgroundColor: '#f0f0f0'}}>
                                    <TableCell sx={{fontWeight: 'bold'}}>STT</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Khách hàng</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Điện thoại</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Email</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Giới tính</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Ngày hẹn</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Trạng thái</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Ngày hoàn thành</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentTickets?.map((ticket, index) => (
                                    <TableRow key={ticket._id || index}>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{ticket.customer?.name}</TableCell>
                                        <TableCell>{ticket.customer?.phone}</TableCell>
                                        <TableCell>{ticket.customer?.email}</TableCell>
                                        <TableCell>{ticket.customer?.gender === "male" ? "Nam" : "Nữ"} </TableCell>
                                        <TableCell>{ticket.requestedDate}</TableCell>
                                        <TableCell>{ticket?.status === "done" ? "Đã hoàn thành" : ticket?.status === "waiting" ? "Chờ xác nhận" : "Đã hủy"}</TableCell>
                                        <TableCell>{ticket?.doneAt}</TableCell>
                                    </TableRow>
                                ))}
                                {currentTickets?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            Không có dữ liệu
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={ticketDoneOfDoctor?.length || 0}
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
export default DialogTicketDoneOfDoctor
