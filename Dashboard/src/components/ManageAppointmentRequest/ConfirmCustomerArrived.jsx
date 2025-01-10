import React, {useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import axios from "../../config/axiosConfig";
import useUserStore from "../../hooks/auth/useUserStore";
import {toast} from "react-toastify";


const ConfirmCustomerArrived = ({open, onClose, ticketId, refreshTicket}) => {
    const [isLoadingResponse, setIsLoadingResponse] = useState(false);
    const {token, userLoggedIn} = useUserStore();

    const handleResponse = async () => {
        setIsLoadingResponse(true);
        console.log(ticketId)
        try {
            const response = await axios.put(`/ticket/confirmCustomerIsArrived/${ticketId}`, {
                confirmedBy: userLoggedIn?.user.details.employeeName,

            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                onClose();
                setIsLoadingResponse(false);
                toast.success(response.data.message, {
                    autoClose: 3000,
                });
                refreshTicket();
            }
        } catch (error) {
            console.log(error);
            setIsLoadingResponse(false);
            toast.error(error.response?.data.message, {
                autoClose: 3000,
            })
        }
    }

    const handleCloseConfirm = () => {
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleCloseConfirm}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Xác nhận khách hàng đến</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1">
                    Bạn có chắc chắn khách hàng đã đến?
                </Typography>
            </DialogContent>
            <DialogActions>
                {!isLoadingResponse ? (
                    <>
                        <Button
                            onClick={handleCloseConfirm}
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
export default ConfirmCustomerArrived
