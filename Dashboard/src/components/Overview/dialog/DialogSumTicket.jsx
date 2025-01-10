import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Box,
    DialogActions,
    Button
} from "@mui/material";
import * as XLSX from "xlsx"; // Thư viện hỗ trợ xuất Excel
import useUserStore from "../../../hooks/auth/useUserStore.jsx";
import useTicketStore from "../../../hooks/appointmentTicket/useTicketStore.jsx";

const DialogSumTicket = ({filters, open, onClose}) => {
    const {token, userLoggedIn} = useUserStore();
    const {tickets, getAllTickets, getTicketByDoctor, ticketByDoctor} = useTicketStore();

    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10); // Cố định mỗi trang 10 dòng
    const [ticket, setTicket] = useState([]);

    useEffect(() => {
        if (userLoggedIn?.user.role !== "doctor") {
            if (token) {
                getAllTickets(token, {filters});
            }
        } else if (userLoggedIn?.user.role === "doctor") {
            getTicketByDoctor(token, userLoggedIn?.user.details.employeeID, {filters});
        }
    }, [token, filters]);

    useEffect(() => {
        if (userLoggedIn?.user.role !== "doctor") {
            setTicket(tickets)
        } else if (userLoggedIn?.user.role === "doctor") {
            setTicket(ticketByDoctor)
        }
    }, [token, filters, tickets, ticketByDoctor]);

    // Xử lý thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Lấy dữ liệu của trang hiện tại
    const currentTickets = ticket?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Hàm xử lý xuất file Excel
    const handleExportToExcel = () => {
        const formattedData = tickets.map((ticket, index) => ({
            STT: index + 1,
            "Khách hàng": ticket.customer?.name || "",
            "Điện thoại": ticket.customer?.phone || "",
            Email: ticket.customer?.email || "",
            "Giới tính": ticket.customer?.gender === "male" ? "Nam" : "Nữ",
            "Dịch vụ": ticket.requestedService || "",
            "Ngày hẹn": ticket.requestedDate || ""
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách lịch hẹn");

        XLSX.writeFile(workbook, "Danh_sach_lich_hen.xlsx");
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Tổng số lịch hẹn</DialogTitle>
            <DialogContent sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{width: '100%', mt: "15rem"}}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{backgroundColor: '#f0f0f0'}}>
                                    <TableCell sx={{fontWeight: 'bold'}}>STT</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Khách hàng</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Điện thoại</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Email</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Giới tính</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Dịch vụ</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Ngày hẹn</TableCell>
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
                                        <TableCell>{ticket.requestedService}</TableCell>
                                        <TableCell>{ticket.requestedDate}</TableCell>
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
                        count={tickets?.length || 0}
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
};

export default DialogSumTicket;
