import React, {useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import axios from "../../config/axiosConfig";
import useUserStore from "../../hooks/auth/useUserStore";
import {toast} from "react-toastify";

const CancelAppointment = ({open, onClose, ticketId, refreshTicket}) => {
    const [reasonCancel, setReasonCancel] = useState("");
    const [isLoadingResponse, setIsLoadingResponse] = useState(false);
    const {token, userLoggedIn} = useUserStore();

    const handleResponse = async () => {
        setIsLoadingResponse(true);
        try {
            const response = await axios.put(`/ticket/cancelTicket/${ticketId}`, {
                reason: reasonCancel,
                cancelledBy: userLoggedIn?.user.details.employeeName,

            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                onClose();
                setReasonCancel("");
                setIsLoadingResponse(false);
                toast.success(response.data.message,{
                    autoClose: 3000,
                });
                refreshTicket();
            }
        } catch (error) {
            console.log(error);
            setIsLoadingResponse(false);
            toast.error(error.response?.data.message,{
                autoClose: 3000,
            })
        }
    }

    const handleCloseCancel = () => {
        onClose();
        setReasonCancel("");
    }
    return (
        <Dialog
            open={open}
            onClose={handleCloseCancel}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Xác nhận hủy</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1">
                    Bạn có chắc chắn muốn hủy lịch hẹn này?
                </Typography>
                <TextField
                    sx={{mt: 2}}
                    label="Lý do hủy"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    onChange={(e) => setReasonCancel(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                {!isLoadingResponse ? (
                    <>
                        <Button
                            onClick={handleCloseCancel}
                            color="error"
                            variant="outlined"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={() => handleResponse()}
                            color="success"
                            variant="contained"
                        >
                            Xác nhận
                        </Button>
                    </>
                ) : (
                    <Typography variant="body2">Đang xử lý...</Typography>
                )}
            </DialogActions>
        </Dialog>
    )
}
export default CancelAppointment
