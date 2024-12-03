import React, {useEffect, useState} from "react";
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

const Overview = ({isSidebarOpen}) => {
    const cardWidth = isSidebarOpen ? "calc(25% - 16px)" : "calc(25% - 8px)";
    const {userLoggedIn, token} = useUserStore();
    const {patients, getAllPatients} = usePatientStore();
    const [countPatient, setCountPatient] = useState(0);
    const {tickets, getAllTickets, getTicketByDoctor, ticketByDoctor} = useTicketStore();
    const [countTicket, setCountTicket] = useState(0);
    const [countRequest, setCountRequest] = useState(0);
    const {appointmentRequests, getAllRequestAppointment} = useAppointmentRequestStore();
    const [countInvoice, setCountInvoice] = useState(0);
    const {invoices, getAllInvoices, totalAmount, getTotalAmount} = useInvoiceStore();

    // State cho các combobox
    // State cho các combobox
    const [selectedYear, setSelectedYear] = useState("all");
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [filters, setFilters] = useState({
        year: null,
        quarter: null,
        month: null,
        doctorId: null,
    });

    // Danh sách các giá trị cho năm, quý, tháng
    const years = [
        {label: "Tất cả", value: "all"},
        ...Array(5)
            .fill()
            .map((_, i) => ({
                label: (2023 + i).toString(),
                value: 2023 + i,
            })),
    ];

    useEffect(() => {
        setSelectedYear({label: "Tất cả", value: "all"});
    }, []);

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
        {label: "Quý 1 (Tháng 1-3)", value: 1},
        {label: "Quý 2 (Tháng 4-6)", value: 2},
        {label: "Quý 3 (Tháng 7-9)", value: 3},
        {label: "Quý 4 (Tháng 10-12)", value: 4},
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
            quarter: selectedQuarter ? selectedQuarter?.value : null,
            month: selectedMonth ? selectedMonth?.value : null,
        });
        if (userLoggedIn.user?.role === "doctor") {
            setFilters({...filters, doctorId: userLoggedIn.user?.details.employeeID});
        }

    }, [selectedYear, selectedQuarter, selectedMonth]);


    useEffect(() => {
        if (token && (selectedYear || selectedQuarter || selectedMonth)) {

            // Gọi API khi có thay đổi trong các bộ lọc
            if (userLoggedIn?.user.role === "admin") {
                getAllPatients(token);
                getAllTickets(token, {filters});
                getAllRequestAppointment(token, {filters})
                getAllInvoices(token, {filters})
                getTotalAmount(token, {filters})

            } else if (userLoggedIn?.user.role === "doctor") {
                getTicketByDoctor(token, userLoggedIn.user?.details.employeeID, {filters});
            }
        }
    }, [selectedYear, selectedQuarter, selectedMonth, token, filters]);

    useEffect(() => {
        if (userLoggedIn?.user.role === "admin") {
            setCountPatient(patients.length);
            // Cập nhật lại tổng số lịch hẹn khi tickets thay đổi
            setCountTicket(tickets.length);
            setCountRequest(appointmentRequests.length);
            setCountInvoice(invoices.length);
        } else if (userLoggedIn?.user.role === "doctor") {
            setCountTicket(ticketByDoctor.length);
        }
    }, [patients, tickets, ticketByDoctor, filters, invoices, appointmentRequests]);

    return (
        <Box sx={{paddingY: 6, paddingX: 0.5}}>
            <Typography variant="h6" sx={{fontWeight: "Bold"}}>
                Tổng quan
            </Typography>
            {/* Bộ lọc */}
            <Box sx={{gap: "1rem", display: "flex", alignItems: "center"}}>
                <Typography sx={{fontSize: "1.3rem"}}>Hiển thị dữ liệu theo: </Typography>
                <Box sx={{display: "flex", alignContent: "center", gap: "1rem"}}>
                    <FormControl sx={{mb: 2, width: "10rem"}} disabled={selectedYear?.value === "all"}>
                        <InputLabel shrink={true}>Chọn năm</InputLabel>
                        <Select
                            options={years}
                            value={selectedYear}
                            onChange={handleYearChange}
                            label="Chọn năm"
                        />
                    </FormControl>

                    <FormControl sx={{mb: 2, width: "10rem"}}
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

                    <FormControl sx={{mb: 2, width: "10rem"}}
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
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <AccessAlarm sx={{fontSize: 40, color: "#3f51b5"}}/>
                            <Typography
                                sx={{
                                    fontSize: "1.3rem",
                                    color: "#3f51b5",
                                    fontWeight: "bold",
                                }}
                            >
                                {userLoggedIn?.user.role !== "doctor" ? "Tổng số lịch hẹn" : "Số lịch hẹn yêu cầu"}
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
                    </CardContent>
                </Card>

                {/* Card 2 */}
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
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <AccountCircle sx={{fontSize: 40, color: "#4caf50"}}/>
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
                        </CardContent>
                    </Card>
                )}
                {/*card 3*/}
                {userLoggedIn?.user.role === "admin" && (
                    <Card
                        sx={{
                            width: cardWidth,
                            backgroundColor: "#F0F8BD",
                            boxShadow: 10,
                            height: "8rem",
                        }}
                    >
                        <CardContent>
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <CalendarToday sx={{fontSize: 40, color: "#FF6DFA"}}/>
                                <Typography
                                    sx={{
                                        fontSize: "1.3rem",
                                        color: "#FF6DFA",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Tổng số yêu cầu
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
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <PaymentsOutlined sx={{fontSize: 40, color: "#3f51b5"}}/>
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
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <AttachMoney sx={{fontSize: 40, color: "#4caf50"}}/>
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
                {userLoggedIn.user.role === "admin" && (
                    <>
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
                            <TopServiceChart filters={filters}/>
                        </Box>

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
                            <TopDoctorChart filters={filters}/>
                        </Box>

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
                            <AppointmentSumaryChart filters={filters}/>
                        </Box>
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
                            <TotalSumaryInvoiceChart filters={filters}/>
                        </Box>
                    </>
                )}
            </Box>


        </Box>
    );
};

export default Overview;
