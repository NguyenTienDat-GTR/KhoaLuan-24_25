import React, {useEffect, useState} from 'react'
import useUserStore from "../../hooks/auth/useUserStore.jsx";
import useAppointmentRequestStore from "../../hooks/appointmentRequest/useAppointmentRequestStore.jsx";
import {
    Box, Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import * as XLSX from "xlsx"; // Thư viện hỗ trợ xuất Excel

const TableRequestRejected = ({filters}) => {
    const {token} = useUserStore();
    const {requestedRejected, getRequestRejected} = useAppointmentRequestStore();
    const [countRequest, setCountRequest] = useState(0);

    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5); // Cố định mỗi trang 5 dòng

    // Xử lý thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        if (token)
            getRequestRejected(token, {filters})
    }, [token, filters])

    useEffect(() => {
        setCountRequest(requestedRejected?.length)
    }, [filters, token, requestedRejected]);

    const currentRequests = requestedRejected?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Hàm xử lý xuất file Excel
    const handleExportToExcel = () => {
        const formattedData = requestedRejected.map((request, index) => ({
            STT: index + 1,
            "Khách hàng": request?.name || "",
            "Ngày gửi yêu cầu": request?.createAt || "",
            "Hủy bởi": request?.rejectedBy || "",
            "Lí do huỷ": request?.reasonReject || ""
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách yêu cầu bị huủy");

        XLSX.writeFile(workbook, "Danh_sach_yeu_cau_bi_huy.xlsx");
    };

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 1,
            gap: 3,
        }}>
            <Typography sx={{mt: 1, fontWeight: 'bold'}}>Số yêu cầu bị từ chối: {countRequest}</Typography>
            <TableContainer sx={{width: '90%', border: 1}}>
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: '#f0f0f0'}}>
                            <TableCell sx={{fontWeight: 'bold'}}>STT</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Tên khách hàng</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Ngày gửi yêu cầu</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Từ chối bởi</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Lí do</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRequests?.map((request, index) => (
                            <TableRow key={request._id || index}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{request?.customerName}</TableCell>
                                <TableCell>{request?.createAt}</TableCell>
                                <TableCell>{request?.rejectBy}</TableCell>
                                <TableCell>{request?.reasonReject}</TableCell>
                            </TableRow>
                        ))}
                        {requestedRejected?.length === 0 && (
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
                count={requestedRejected?.length || 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]} // Ẩn tùy chọn số dòng mỗi trang
            />
            <Button sx={{mb: 2}} onClick={handleExportToExcel} color="primary" variant="contained">Xuất file</Button>
        </Box>
    )
}
export default TableRequestRejected
