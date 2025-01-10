import React, {useEffect, useState} from 'react'
import {Box, Card, CardContent, Typography} from "@mui/material";
import {AccountCircle, Check} from "@mui/icons-material";
import useUserStore from "../../../hooks/auth/useUserStore.jsx";
import useTicketStore from "../../../hooks/appointmentTicket/useTicketStore.jsx";
import DialogTicketDoneOfDoctor from "../dialog/DialogTicketDoneOfDoctor.jsx";

const CardTicketDoneOfDoctor = ({filters}, cardWidth) => {
    const {token, userLoggedIn} = useUserStore();
    const {getTicketDoneOfDoctor, ticketDoneOfDoctor} = useTicketStore();
    const [countTicket, setCountTicket] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (token)
            getTicketDoneOfDoctor(token, {filters});
    }, [token, filters]);

    useEffect(() => {
        if (ticketDoneOfDoctor)
            setCountTicket(ticketDoneOfDoctor.length);
    }, [token, ticketDoneOfDoctor, filters])

    return (
        <>
            <Card
                sx={{
                    width: cardWidth,
                    backgroundColor: "#e1f5fe",
                    boxShadow: 10,
                    height: "8rem",
                }}
            >
                <CardContent>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <Check sx={{fontSize: 40, color: "#4caf50"}}/>
                        <Typography
                            sx={{
                                fontSize: "1.3rem",
                                color: "#4caf50",
                                fontWeight: "bold",
                            }}
                        >
                            Số lịch hẹn hoàn thành
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            paddingX: "2rem",
                            fontSize: "2.2rem",
                            color: "#ff5722",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        {countTicket}
                    </Typography>
                    <Typography variant="caption"
                                sx={{
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    color: 'blue'
                                }}
                                onClick={() => setOpen(true)}
                    >Xem chi tiết</Typography>
                </CardContent>
            </Card>

            <DialogTicketDoneOfDoctor
                open={open}
                onClose={() => setOpen(false)}
                filters={filters}
            />
        </>
    )
}
export default CardTicketDoneOfDoctor
