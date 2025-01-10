import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    MenuItem,
    FormControl,
    InputLabel, TextField,
} from "@mui/material";

import {
    AccessAlarm,
    AccountCircle,
    Medication,
    EditCalendar,
    AttachMoney, RequestQuote, RequestPage, CalendarToday, PaymentsOutlined, Money,
} from "@mui/icons-material"; // Import icons
import Select from "react-select";
import useUserStore from "../hooks/auth/useUserStore";
import usePatientStore from "../hooks/patient/usePatientStore";
import useTicketStore from "../hooks/appointmentTicket/useTicketStore";
import TopServiceChart from "../components/Overview/TopServiceChart";
import TopDoctorChart from "../components/Overview/TopDoctorChart";
import AppointmentSumaryChart from "../components/Overview/AppointmentSumaryChart";
import useAppointmentRequestStore from "../hooks/appointmentRequest/useAppointmentRequestStore.jsx";
import useInvoiceStore from "../hooks/Invoice/useInvoiceStore.jsx";
import TotalSumaryInvoiceChart from "../components/Overview/TotalSumaryInvoiceChart.jsx";
import DialogSumTicket from "../components/Overview/dialog/DialogSumTicket.jsx";
import DialogSumPatient from "../components/Overview/dialog/DialogSumPatient.jsx";
import DialogSumRequest from "../components/Overview/dialog/DialogSumRequest.jsx";
import DialogSumInvoice from "../components/Overview/dialog/DialogSumInvoice.jsx";
import CardTicketDoneOfDoctor from "../components/Overview/card/CardTicketDoneOfDoctor.jsx";
import TableRequestRejected from "../components/Overview/TableRequestRejected.jsx";
import CountRequestChart from "../components/Overview/CountRequestChart.jsx";
import TableRequestAccepted from "../components/Overview/TableRequestAccepted.jsx";

const Overview = ({ isSidebarOpen }) => {
    const cardWidth = isSidebarOpen ? "calc(25% - 16px)" : "calc(25% - 8px)";
    const { userLoggedIn, token } = useUserStore();
    const { patients, getAllPatients } = usePatientStore();
    const [countPatient, setCountPatient] = useState(0);
    const { tickets, getAllTickets, getTicketByDoctor, ticketByDoctor } = useTicketStore();
    const [countTicket, setCountTicket] = useState(0);
    const [countRequest, setCountRequest] = useState(0);
    const { appointmentRequests, getAllRequestAppointment } = useAppointmentRequestStore();
    const [countInvoice, setCountInvoice] = useState(0);
    const { invoices, getAllInvoices, totalAmount, getTotalAmount } = useInvoiceStore();
    const [openSumTicket, setOpenSumTicket] = useState(false);
    const [openSumPatient, setOpenSumPatient] = useState(false);
    const [openSumRequest, setOpenSumRequest] = useState(false);
    const [openSumInvoice, setOpenSumInvoice] = useState(false);


    // State cho các combobox
    const [selectedYear, setSelectedYear] = useState({ label: "Tất cả", value: "all" });
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [filters, setFilters] = useState({
        year: null,
        quarter: null,
        month: null,
        doctorId: null,
        rejectBy: null,
    });

    // Danh sách các giá trị cho năm, quý, tháng
    const years = [
        { label: "Tất cả", value: "all" },
        ...Array(5)
            .fill()
            .map((_, i) => ({
                label: (2023 + i).toString(),
                value: 2023 + i,
            })),
    ];

    useEffect(() => {
        setSelectedYear({ label: "Tất cả", value: "all" });
    }, [token]);

    // Khi năm được chọn là "all", reset quý và tháng
    useEffect(() => {
        if (selectedYear?.value === "all") {
            setSelectedQuarter(null);
            setSelectedMonth(null);
        }
    }, [selectedYear]);

    // Khi quý được chọn, reset tháng
    useEffect(() => {
        if (selectedQuarter) {
            setSelectedMonth(null);
        }
    }, [selectedQuarter]);

    // Khi tháng được chọn, reset quý
    useEffect(() => {
        if (selectedMonth) {
            setSelectedQuarter(null);
        }
    }, [selectedMonth]);

    const quarters = [
        { label: "Quý 1 (Tháng 1-3)", value: 1 },
        { label: "Quý 2 (Tháng 4-6)", value: 2 },
        { label: "Quý 3 (Tháng 7-9)", value: 3 },
        { label: "Quý 4 (Tháng 10-12)", value: 4 },
    ];

    const months = [
        ...Array(12)
            .fill()
            .map((_, i) => ({
                label: (i + 1).toString(),
                value: i + 1,
            })),
    ];

    const handleYearChange = (option) => {
        setSelectedYear(option);
    };

    const handleQuarterChange = (option) => {
        setSelectedQuarter(option);
    };

    const handleMonthChange = (option) => {
        setSelectedMonth(option);
    };

    useEffect(() => {
        setFilters({
            year: selectedYear?.value !== "all" ? selectedYear?.value : null,
            quarter: selectedQuarter?.value || null,
            month: selectedMonth?.value || null,
            doctorId: userLoggedIn.user?.role === "doctor"
                ? userLoggedIn.user?.details.employeeID
                : null,
            rejectBy: userLoggedIn.user?.role === "employee" ? userLoggedIn.user?.details.employeeName : null
        });
    }, [selectedYear, selectedQuarter, selectedMonth, userLoggedIn]);


    const fetchData = async () => {
        // Gọi API khi có thay đổi trong các bộ lọc
        if (userLoggedIn?.user.role === "admin") {
            await getAllPatients(token, { filters });
            await getAllTickets(token, { filters });
            await getAllRequestAppointment(token, { filters })
            await getAllInvoices(token, { filters })
            await getTotalAmount(token, { filters })

        } else if (userLoggedIn?.user.role === "doctor") {
            await getTicketByDoctor(token, userLoggedIn.user?.details.employeeID, { filters });
            await getAllRequestAppointment(token, { filters })
        } else if (userLoggedIn?.user.role === "employee") {
            await getAllPatients(token, { filters });
            await getAllTickets(token, { filters });
        }
    }

    useEffect(() => {
        if (token && (selectedYear || selectedQuarter || selectedMonth)) {
            fetchData();

        }
    }, [selectedYear, selectedQuarter, selectedMonth, token, filters, userLoggedIn]);

    useEffect(() => {
        if (userLoggedIn?.user.role === "admin") {
            setCountPatient(patients.length);
            setCountTicket(tickets.length);
            setCountRequest(appointmentRequests.length);
            setCountInvoice(invoices.length);
        } else if (userLoggedIn?.user.role === "doctor") {
            setCountTicket(ticketByDoctor.length);
            setCountRequest(appointmentRequests.length);
        } else if (userLoggedIn?.user.role === "employee") {
            setCountPatient(patients.length);
            setCountTicket(tickets.length);
        }
    }, [patients, tickets, ticketByDoctor, filters, invoices, appointmentRequests, token, userLoggedIn]);

    return (
        <Box sx={{ paddingY: 6, paddingX: 0.5 }}>
            <Typography variant="h6" sx={{ fontWeight: "Bold" }}>
                Tổng quan
            </Typography>
            {/* Bộ lọc */}
            <Box sx={{ gap: "1rem", display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontSize: "1.3rem" }}>Hiển thị dữ liệu theo: </Typography>
                <Box sx={{ display: "flex", alignContent: "center", gap: "1rem" }}>
                    <FormControl sx={{ mb: 2, width: "10rem" }} disabled={selectedYear?.value === "all"}>
                        <InputLabel shrink={true}>Chọn năm</InputLabel>
                        <Select
                            options={years}
                            value={selectedYear}
                            onChange={handleYearChange}
                            label="Chọn năm"
                        />
                    </FormControl>

                    <FormControl sx={{ mb: 2, width: "10rem" }}
                        isDsisabled={selectedYear?.value === "all" || selectedMonth !== null}>
                        <InputLabel shrink={true}>Chọn quý</InputLabel>
                        <Select
                            options={quarters}
                            value={selectedQuarter}
                            onChange={handleQuarterChange}
                            label="Chọn quý"
                            isDisabled={selectedYear?.value === "all" || selectedMonth !== null}
                        />
                    </FormControl>

                    <FormControl sx={{ mb: 2, width: "10rem" }}
                        isDisabled={selectedYear?.value === "all" || selectedQuarter !== null}>
                        <InputLabel shrink={selectedMonth?.value !== null}>Chọn tháng</InputLabel>
                        <Select
                            options={months}
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            label="Chọn tháng"
                            isDisabled={selectedQuarter !== null || selectedYear?.value === "all"}
                        />
                    </FormControl>
                </Box>
            </Box>

            {/* Thông tin tổng hợp */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 3,
                }}
            >
                {/* Card 1 */}
                <Card
                    sx={{
                        width: cardWidth,
                        backgroundColor: "#f0f8ff",
                        boxShadow: 10,
                        height: "8rem",
                    }}
                >
                    <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <AccessAlarm sx={{ fontSize: 40, color: "#3f51b5" }} />
                            <Typography
                                sx={{
                                    fontSize: "1.3rem",
                                    color: "#3f51b5",
                                    fontWeight: "bold",
                                }}
                            >
                                {userLoggedIn?.user.role !== "doctor" ? "Tổng số lịch hẹn" : "Số lịch hẹn"}
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
                            onClick={() => setOpenSumTicket(true)}>Xem chi tiết</Typography>
                    </CardContent>
                </Card>

                {/* Card 2 */}
                <>
                    {userLoggedIn?.user.role !== "doctor" && (
                        <Card
                            sx={{
                                width: cardWidth,
                                backgroundColor: "#e1f5fe",
                                boxShadow: 10,
                                height: "8rem",
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <AccountCircle sx={{ fontSize: 40, color: "#4caf50" }} />
                                    <Typography
                                        sx={{
                                            fontSize: "1.3rem",
                                            color: "#4caf50",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Tổng số bệnh nhân
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
                                    {countPatient}
                                </Typography>
                                <Typography variant="caption"
                                    sx={{
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        color: 'blue'
                                    }}
                                    onClick={() => setOpenSumPatient(true)}
                                >Xem chi tiết</Typography>
                            </CardContent>
                        </Card>
                    )}

                    {userLoggedIn?.user?.role === "doctor" && (
                        <CardTicketDoneOfDoctor filters={filters} cardWidth={cardWidth} />
                    )}
                </>
                {/*card 3*/}
                {userLoggedIn?.user.role !== "employee" && (
                    <Card
                        sx={{
                            width: cardWidth,
                            backgroundColor: "#F0F8BD",
                            boxShadow: 10,
                            height: "8rem",
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <CalendarToday sx={{ fontSize: 40, color: "#FF6DFA" }} />
                                <Typography
                                    sx={{
                                        fontSize: "1.3rem",
                                        color: "#FF6DFA",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Số yêu cầu đặt lịch
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
                                {countRequest}
                            </Typography>
                            <Typography variant="caption"
                                sx={{
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    color: 'blue'
                                }}
                                onClick={() => setOpenSumRequest(true)}
                            >Xem chi tiết</Typography>
                        </CardContent>
                    </Card>
                )}
                {/*card 4*/}
                {userLoggedIn?.user.role === "admin" && (
                    <Card
                        sx={{
                            width: cardWidth,
                            backgroundColor: "#f0f8ff",
                            boxShadow: 10,
                            height: "8rem",
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <PaymentsOutlined sx={{ fontSize: 40, color: "#3f51b5" }} />
                                <Typography
                                    sx={{
                                        fontSize: "1.3rem",
                                        color: "#3f51b5",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Tổng số hóa đơn
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
                                {countInvoice}
                            </Typography>
                            <Typography variant="caption"
                                sx={{
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    color: 'blue'
                                }}
                                onClick={() => setOpenSumInvoice(true)}
                            >Xem chi tiết</Typography>
                        </CardContent>
                    </Card>
                )}
                {/* Card 5 */}
                {userLoggedIn?.user.role === "admin" && (
                    <Card
                        sx={{
                            width: cardWidth,
                            backgroundColor: "#e1f5fe",
                            boxShadow: 10,
                            height: "8rem",
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <AttachMoney sx={{ fontSize: 40, color: "#4caf50" }} />
                                <Typography
                                    sx={{
                                        fontSize: isSidebarOpen ? "1.1rem" : "1.3rem",
                                        color: "#4caf50",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Tổng tiền hóa đơn
                                </Typography>
                            </Box>
                            <Typography
                                sx={{
                                    paddingX: "2rem",
                                    fontSize: isSidebarOpen ? "1.3rem" : "1.5rem",
                                    color: "#ff5722",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                            >
                                {totalAmount.toLocaleString()} VNĐ
                            </Typography>
                        </CardContent>
                    </Card>


                )}
            </Box>


            {/* Chart Section */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap", // Cho phép các biểu đồ tự động xuống dòng
                    gap: 3, // Khoảng cách giữa các biểu đồ
                    width: "100%",
                    justifyContent: "space-between", // Căn đều các biểu đồ trên một dòng
                }}
            >
                {/* Biểu đồ 1 */}
                <Box
                    sx={{
                        flexBasis: "calc(50% - 1.5rem)", // Mỗi biểu đồ chiếm 50% chiều rộng trừ khoảng cách
                        marginTop: 4,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Biểu đồ dịch vụ được đặt nhiều nhất
                    </Typography>
                    <TopServiceChart filters={filters} />
                </Box>
                {userLoggedIn.user.role === "admin" && (
                    <>
                        {/* Biểu đồ 2 */}
                        <Box
                            sx={{
                                flexBasis: "calc(50% - 1.5rem)", // Tương tự như trên
                                marginTop: 4,
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Biểu đồ bác sĩ có nhiều lịch hẹn nhất
                            </Typography>
                            <TopDoctorChart filters={filters} />
                        </Box>
                    </>
                )}
                {userLoggedIn.user.role === "employee" && (
                    <>
                        {/* Biểu đồ 2 */}
                        <Box
                            sx={{
                                flexBasis: "calc(50% - 1.5rem)", // Tương tự như trên
                                marginTop: 4,
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Biểu đồ số lượng yêu cầu
                            </Typography>
                            <CountRequestChart filters={filters} />
                        </Box>
                    </>
                )}
                {userLoggedIn.user.role !== "employee" && (
                    <>
                        {/* Biểu đồ 3 */}
                        <Box
                            sx={{
                                flexBasis: "calc(50% - 1.5rem)", // Tương tự như trên
                                marginTop: 4,
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Biểu đồ trạng thái lịch hẹn
                            </Typography>
                            <AppointmentSumaryChart filters={filters} />
                        </Box>
                    </>
                )}
                {userLoggedIn.user.role === "admin" && (
                    <>
                        {/* Biểu đồ 4 */}
                        <Box
                            sx={{
                                flexBasis: "calc(50% - 1.5rem)", // Tương tự như trên
                                marginTop: 4,
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Biểu đồ tổng tiền hóa đơn
                            </Typography>
                            <TotalSumaryInvoiceChart filters={filters} />
                        </Box>
                    </>
                )}
            </Box>

            {/*Table section*/}
            <Box sx={{ width: '100%', mt: 5 }}>
                {
                    userLoggedIn.user?.role !== "doctor" && <TableRequestRejected filters={filters} />

                }
                {userLoggedIn.user?.role !== "doctor" && <TableRequestAccepted filters={filters} />}
            </Box>

            <DialogSumTicket
                open={openSumTicket}
                onClose={() => setOpenSumTicket(false)}
                filters={filters}
            />

            <DialogSumPatient
                open={openSumPatient}
                onClose={() => setOpenSumPatient(false)}
                filters={filters}
            />

            <DialogSumRequest
                open={openSumRequest}
                onClose={() => setOpenSumRequest(false)}
                filters={filters}
            />

            <DialogSumInvoice
                open={openSumInvoice}
                onClose={() => setOpenSumInvoice(false)}
                filters={filters}
            />

        </Box>
    );
};

export default Overview;
