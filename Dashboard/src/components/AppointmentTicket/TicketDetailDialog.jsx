import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
} from "@mui/material";

const TicketDetailDialog = ({open, ticket, onClose}) => {
    if (!ticket) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Chi tiết lịch hẹn</DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    {/* Cột 1: Thông tin khách hàng */}
                    <Box sx={{flex: 1}}>
                        <Typography><strong>Khách hàng:</strong> {ticket.customer.name}</Typography>
                        <Typography><strong>Số điện thoại:</strong> {ticket.customer.phone}</Typography>
                        <Typography><strong>Email:</strong> {ticket.customer.email || "Không có"}</Typography>
                        <Typography>
                            <strong>Giới tính:</strong> {ticket.customer.gender === "female" ? "Nữ" : "Nam"}
                        </Typography>
                    </Box>

                    {/* Cột 2: Thông tin lịch hẹn */}
                    <Box sx={{flex: 1}}>
                        <Typography><strong>Dịch vụ:</strong> {ticket.requestedService}</Typography>
                        <Typography><strong>Ngày hẹn:</strong> {ticket.requestedDate}</Typography>
                        <Typography><strong>Thời gian:</strong> {ticket.requestedTime}</Typography>
                        <Typography><strong>Kết thúc:</strong> {ticket.endTime || "Không xác định"}</Typography>
                        <Typography><strong>Ghi chú:</strong> {ticket.note || "Không có"}</Typography>
                    </Box>

                    {/* Cột 3: Thông tin bác sĩ */}
                    <Box sx={{flex: 1}}>
                        <Typography><strong>Bác sĩ:</strong> {ticket.doctorName || "Chưa phân công"}</Typography>
                        <Typography><strong>Số điện thoại bác sĩ:</strong> {ticket.doctorPhone || "Không có"}
                        </Typography>
                        <Typography><strong>Email bác sĩ:</strong> {ticket.doctorEmail || "Không có"}</Typography>
                        <Typography><strong>Trạng
                            thái:</strong> {ticket.status === "done" ? "Hoàn thành" : ticket.status === "cancelled" ? "Đã hủy" : "Đang chờ khám"}
                        </Typography>
                        {ticket.status === "cancelled" && (
                            <>
                                <Typography><strong>Lý do hủy:</strong> {ticket.reasonCancelled || "Không xác định"}
                                </Typography>
                                <Typography><strong>Hủy bởi:</strong> {ticket.cancelledBy || "Không xác định"}
                                </Typography>
                                <Typography><strong>Hủy lúc:</strong> {ticket.cancelledAt || "Không xác định"}
                                </Typography>
                            </>
                        )}
                        {ticket.status === "done" && (
                            <>
                                <Typography><strong>Hoàn thành bởi:</strong> {ticket.doneBy || "Không xác định"}
                                </Typography>
                                <Typography><strong>Hoàn thành lúc:</strong> {ticket.doneAt || "Không xác định"}
                                </Typography>
                            </>
                        )}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">Đóng</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TicketDetailDialog;
