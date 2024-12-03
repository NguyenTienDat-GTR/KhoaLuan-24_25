import React, {useEffect, useState} from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Tooltip,
    FormControl,
    InputLabel,
} from "@mui/material";
import {CheckCircle, Payments, Visibility} from "@mui/icons-material";
import useUserStore from "../hooks/auth/useUserStore.jsx";
import useInvoiceStore from "../hooks/Invoice/useInvoiceStore.jsx";
import ConfirmPayment from "../components/Invoice/ConfirmPayment.jsx";
// import page403 from "./page403.js";

const ManageInvoice = () => {
        const [searchTerm, setSearchTerm] = useState("");
        const [searchType, setSearchType] = useState("name");
        const [statusFilter, setStatusFilter] = useState("unpaid");
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(5);
        const {token, userLoggedIn} = useUserStore();
        const {invoices, getAllInvoices, selectedInvoice, setSelectedInvoice} = useInvoiceStore();
        const [openConfirmPayment, setOpenConfirmPayment] = useState(false);


        useEffect(() => {
            if (token) {
                getAllInvoices(token);
            }
        }, [token]);

        const filteredInvoices = invoices.filter(({customer, invoice}) => {
            const searchValue = customer[searchType]?.toString().toLowerCase() || "";
            const isMatch = searchValue.includes(searchTerm.toLowerCase());
            const statusMatch =
                statusFilter === "all" ||
                (statusFilter === "paid" && invoice.isPaid) ||
                (statusFilter === "unpaid" && !invoice.isPaid);
            return isMatch && statusMatch;
        });

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        const handleRefresh = async () => {
            if (token) {
                await getAllInvoices(token);  // Làm mới danh sách hóa đơn
                if (selectedInvoice) {
                    // Cập nhật lại thông tin hóa đơn đã chọn
                    const updatedInvoice = invoices.find(inv => inv.invoice._id === selectedInvoice.invoice._id);
                    if (updatedInvoice) {
                        setSelectedInvoice(updatedInvoice);  // Cập nhật lại selectedInvoice
                    }
                }
            }
        }

        const handleSuccessfulPayment = async (updatedInvoice) => {
            if (token) {
                // Làm mới danh sách hóa đơn
                await getAllInvoices(token);
            }

            // // Cập nhật selectedInvoice với trạng thái mới của hóa đơn
            setSelectedInvoice({
                ...selectedInvoice,
                invoice: updatedInvoice
            });
        };


        const handleOpenConfirmPayment = ({customer, invoice}) => {
            setOpenConfirmPayment(true);
            setSelectedInvoice({invoice: invoice, customer: customer});
        };

        return (

            <Box sx={{paddingY: 6, paddingX: 2}}>
                <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: 2}}>
                    Quản lý hóa đơn
                </Typography>

                {/* Search box */}
                <Box sx={{display: "flex", alignItems: "center", gap: 2, marginBottom: 2}}>
                    <FormControl sx={{width: "30%"}}>
                        <InputLabel>Tìm kiếm theo</InputLabel>
                        <Select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            label="Tìm kiếm theo"
                        >
                            <MenuItem value="name">Tên khách hàng</MenuItem>
                            <MenuItem value="phone">Số điện thoại</MenuItem>
                            <MenuItem value="email">Email</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Tìm kiếm"
                        variant="outlined"
                        size="medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{bgcolor: "#f5f5f5", width: "50%"}}
                    />

                    <FormControl sx={{width: "20%"}}>
                        <InputLabel>Trạng thái</InputLabel>
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            label="Trạng thái"
                        >
                            <MenuItem value="all">Tất cả</MenuItem>
                            <MenuItem value="unpaid">Chưa thanh toán</MenuItem>
                            <MenuItem value="paid">Đã thanh toán</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Invoice table */}
                <TableContainer sx={{boxShadow: 2, borderRadius: 1}}>
                    <Table sx={{minWidth: 650}}>
                        <TableHead sx={{backgroundColor: "#f0f0f0"}}>
                            <TableRow>
                                <TableCell sx={{fontWeight: "bold"}}>Số thứ tự</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Tên khách hàng</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Số điện thoại</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Email</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Ngày tạo</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Trạng thái</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredInvoices
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(({customer, invoice}, index) => (
                                    <TableRow
                                        key={invoice._id}
                                        sx={{
                                            "&:hover": {backgroundColor: "#e0f7fa"},
                                        }}
                                    >
                                        <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                        <TableCell>{customer.name}</TableCell>
                                        <TableCell>{customer.phone}</TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>{invoice.createdAt}</TableCell>
                                        <TableCell sx={{color: invoice.isPaid ? "green" : "red"}}>
                                            {invoice.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Xem chi tiết và xác nhận thanh toán">
                                                <IconButton color={invoice.isPaid ? "success" : "warning"}
                                                            onClick={() => handleOpenConfirmPayment({customer, invoice})}>
                                                    <CheckCircle/>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={filteredInvoices.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <ConfirmPayment
                    open={openConfirmPayment}
                    onClose={() => setOpenConfirmPayment(false)}
                    selectedInvoice={selectedInvoice}
                    onSuccessfulPayment={handleSuccessfulPayment}  // Cập nhật giao diện khi thanh toán thành công
                />


            </Box>

        )
            ;
    }
;

export default ManageInvoice;
