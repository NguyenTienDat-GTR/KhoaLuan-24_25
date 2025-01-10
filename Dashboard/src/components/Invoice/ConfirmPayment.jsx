import React, {useState, useRef} from "react";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid,
} from "@mui/material";
import useUserStore from "../../hooks/auth/useUserStore.jsx";
import axios from "../../config/axiosConfig";
import {toast} from "react-toastify";
import useInvoiceStore from "../../hooks/Invoice/useInvoiceStore.jsx";

const ConfirmPayment = ({open, onClose, onSuccessfulPayment}) => {


    const {token, userLoggedIn} = useUserStore();
    const {selectedInvoice, setSelectedInvoice} = useInvoiceStore();
    const [loading, setLoading] = useState(false);
    const invoiceRef = useRef(null);  // Sử dụng ref để tham chiếu tới phần tử hóa đơn
    if (!selectedInvoice) return null; // Tránh lỗi nếu chưa chọn hóa đơn
    const {customer, invoice} = selectedInvoice;
    const units = {
        tooth: "Răng",
        jaw: "Hàm",
        treatment: "Liệu trình",
        set: "Bộ",
        session: "Lần",
    };

    const confirmPayment = async () => {
        const data = {
            paidBy: userLoggedIn.user?.details.employeeName,
            invoiceId: invoice._id
        };
        setLoading(true);
        try {
            const response = await axios.put(`/invoice/confirm-payment`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                toast.success(response.data.message, {
                    autoClose: 2000,
                });
                const updatedInvoice = response.data.invoice; // Lấy hóa đơn cập nhật từ API
                await onSuccessfulPayment(updatedInvoice);
                setSelectedInvoice({
                    ...selectedInvoice, // Copy toàn bộ dữ liệu cũ
                    invoice: updatedInvoice // Ghi đè dữ liệu mới
                });

                printInvoice(updatedInvoice); // In hóa đơn

            }

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data.message);
        } finally {
            setLoading(false);
        }
    };

    // Hàm in hóa đơn
    const printInvoice = (updatedInvoice) => {
        console.log("Invoice status before printing:", updatedInvoice.isPaid); // Kiểm tra trạng thái trước in
        html2canvas(invoiceRef.current, {
            useCORS: true,
            scrollX: 0,
            scrollY: -window.scrollY,
            width: invoiceRef?.current.scrollWidth,
            height: invoiceRef?.current.scrollHeight,
        }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 0, 0);
            pdf.save(`invoice_${updatedInvoice._id}.pdf`);
        }).catch((error) => {
            console.error("Có lỗi khi in hóa đơn:", error);
        });
    };

    const handleClose = () => {
        onClose();
        setSelectedInvoice(null);
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Xác nhận thanh toán</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} ref={invoiceRef}
                     sx={{padding: '1rem'}}> {/* Thêm ref để tham chiếu */}
                    <Typography variant="h5" fontWeight="bold" sx={{margin: '0 auto'}}>
                        Nha khoa HBT
                    </Typography>
                    <Box
                        sx={{margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
                        <Typography variant="body1" fontWeight="bold">
                            Địa chỉ: 877, Tân Kỳ Tân Quý, P. Bình Hưng Hòa A, Q.Bình Tân, TP.HCM
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            Số điện thoại: 0906070338
                        </Typography>
                    </Box>
                    {/* Thông tin khách hàng */}
                    <Typography variant="h6" fontWeight="bold">
                        Thông tin hóa đơn
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography><strong>Tên khách hàng:</strong> {customer?.name}</Typography>
                            <Typography><strong>Số điện thoại:</strong> {customer?.phone}</Typography>
                            <Typography><strong>Email:</strong> {customer?.email}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Ngày tạo hóa đơn:</strong> {invoice?.createdAt}</Typography>
                            <Typography><strong>Bác sĩ điều trị:</strong> {invoice?.createBy}</Typography>
                            <Typography><strong>Trạng
                                thái:</strong> {invoice?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</Typography>
                            {invoice?.isPaid && (
                                <>
                                    <Typography><strong>Nhân viên xác
                                        nhận:</strong> {invoice?.paidBy || "Không xác định"}
                                    </Typography>
                                    <Typography><strong>Thanh toán lúc:</strong> {invoice?.paidAt || "Không xác định"}
                                    </Typography>
                                </>
                            )}
                        </Grid>
                    </Grid>

                    {/* Thông tin dịch vụ */}
                    <Typography variant="h6" fontWeight="bold" mt={2}>
                        Chi tiết dịch vụ
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow sx={{backgroundColor: "#C3C5C6"}}>
                                <TableCell sx={{fontSize: "0.7rem"}}>Số thứ tự</TableCell>
                                <TableCell sx={{fontSize: "0.7rem"}}>Tên dịch vụ</TableCell>
                                <TableCell sx={{fontSize: "0.7rem"}}>Đơn vị tính</TableCell>
                                <TableCell sx={{fontSize: "0.7rem"}}>Tên răng/hàm</TableCell>
                                <TableCell sx={{fontSize: "0.7rem"}}>Giá (VNĐ)</TableCell>
                                <TableCell sx={{fontSize: "0.7rem"}}>Giảm giá (%)</TableCell>
                                <TableCell sx={{fontSize: "0.7rem"}}>Thành tiền (VNĐ)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoice?.usedServices.map((service, index) => (
                                <TableRow key={service._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{!invoice?.isPaid ? service.name : service.service.name}</TableCell>
                                    <TableCell
                                        sx={{textAlign: 'center'}}>{units[service.unit] || service.unit}</TableCell>
                                    <TableCell
                                        sx={{textAlign: 'center'}}>{service.unit === "tooth" || service.unit === "jaw" ? service.for || "N/A" : "-"}</TableCell>
                                    <TableCell sx={{textAlign: 'left'}}>{service.price.toLocaleString()}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{service.discount}</TableCell>
                                    <TableCell
                                        sx={{textAlign: 'left'}}>{service.finalPrice.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                            {/* Dòng tổng */}
                            <TableRow>
                                <TableCell colSpan={4} sx={{fontWeight: "bold", textAlign: "right"}}>
                                    Tổng:
                                </TableCell>
                                <TableCell sx={{fontWeight: "bold", textAlign: "left"}}>
                                    {invoice?.usedServices.reduce((sum, service) => sum + service.price, 0).toLocaleString()}
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell sx={{fontWeight: "bold", textAlign: "left"}}>
                                    {invoice?.usedServices.reduce((sum, service) => sum + service.finalPrice, 0).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    {/* Tổng hóa đơn */}
                    <Box sx={{
                        width: "300px",
                        marginLeft: "auto",
                    }}>
                        <Typography>Tổng
                            tiền: <strong>{invoice?.usedServices.reduce((sum, service) => sum + service.finalPrice, 0).toLocaleString()} VNĐ</strong></Typography>
                        <Typography>Giảm giá: <strong>{invoice?.discount} %</strong></Typography>
                        <Typography>
                            Số tiền giảm:
                            <strong>
                                {(
                                    invoice?.usedServices.reduce((sum, service) => sum + service.finalPrice, 0) * (invoice?.discount / 100)
                                ).toLocaleString()} VNĐ
                            </strong>
                        </Typography>
                        <Typography mt={2}>
                            Thành tiền: <strong>{invoice?.totalAmount.toLocaleString()} VNĐ</strong>
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                {!loading ? (
                    <>
                        <Button onClick={handleClose} color="error" variant="outlined">
                            Đóng
                        </Button>
                        {!invoice?.isPaid ? (<Button
                            onClick={confirmPayment}
                            color="success"
                            variant="contained"
                        >
                            Xác nhận thanh toán
                        </Button>) : (
                            <Button
                                onClick={() => printInvoice(invoice)}
                                color="primary"
                                variant="contained"
                            >
                                In hóa đơn
                            </Button>
                        )}
                    </>
                ) : (
                    <Typography>Đang xử lý...</Typography>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmPayment;