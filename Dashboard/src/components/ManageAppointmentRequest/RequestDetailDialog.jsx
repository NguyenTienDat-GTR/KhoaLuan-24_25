import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography} from "@mui/material";
import {Button} from "@mui/material";

const RequestDetailDialog = ({open, onClose, request}) => {
    if (!request) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Chi tiết yêu cầu đặt lịch hẹn</DialogTitle>
            <DialogContent>
                <Box sx={{display: "flex", gap: 4}}>
                    {/* Cột bên trái */}
                    <Box sx={{flex: 1}}>
                        <Typography variant="h6">Thông tin khách hàng</Typography>
                        <Typography><strong>Tên khách hàng:</strong> {request.customerName}</Typography>
                        <Typography><strong>Số điện thoại:</strong> {request.customerPhone}</Typography>
                        <Typography><strong>Email:</strong> {request.customerEmail}</Typography>
                        <Typography><strong>Giới
                            tính:</strong> {request.gender === "male" ? "Nam" : request.gender === "female" ? "Nữ" : ""}
                        </Typography>
                    </Box>

                    {/* Cột bên phải */}
                    <Box sx={{flex: 1}}>
                        <Typography variant="h6">Thông tin yêu cầu</Typography>
                        <Typography><strong>Ngày yêu cầu:</strong> {request.appointmentDate}</Typography>
                        <Typography><strong>Giờ yêu cầu:</strong> {request.appointmentTime}</Typography>
                        <Typography><strong>Dịch vụ yêu cầu:</strong> {request.service}</Typography>
                        <Typography><strong>Ghi chú:</strong> {request.note || "Không có"}</Typography>
                        <Typography><strong>Trạng
                            thái:</strong> {request.status === "accepted" ? "Đã chấp nhận" : request.status === "rejected" ? "Đã từ chối" : "Đang chờ"}
                        </Typography>
                        {request.status === "rejected" ?
                            <>
                                <Typography><strong>Hủy bởi:</strong> {request.rejectBy}</Typography>
                                <Typography><strong>Lí do hủy :</strong> {request.reasonReject}</Typography>
                            </> : request.status === "accepted" ?
                                <Typography><strong>Chấp nhận bởi:</strong> {request.acceptBy}</Typography> : null}
                        <Typography><strong>Ngày tạo:</strong> {request.createAt}</Typography>
                        <Typography><strong>Tạo
                            bởi:</strong> {request.createBy === "customer" ? "Khách hàng" : request.createBy}
                        </Typography>
                        <Typography><strong>Chỉnh sửa bởi:</strong> {request.editBy?.map((edit) => (
                            <div key={edit._id}>
                                <Typography>{edit.by} vào {edit.at}</Typography>
                            </div>
                        ))}</Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">Đóng</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RequestDetailDialog;
