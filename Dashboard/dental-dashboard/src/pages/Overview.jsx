import React, {useEffect, useState} from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";

import {
    AccessAlarm,
    AccountCircle,
    Medication,
    EditCalendar,
    AttachMoney,
} from "@mui/icons-material"; // Import icons
import Select from "react-select";
import useUserStore from "../hooks/auth/useUserStore";
import usePatientStore from "../hooks/patient/usePatientStore";
import useTicketStore from "../hooks/appointmentTicket/useTicketStore";
import TopServiceChart from "../components/Overview/TopServiceChart";
import TopDoctorChart from "../components/Overview/TopDoctorChart";
import AppointmentSumaryChart from "../components/Overview/AppointmentSumaryChart";

const Overview = ({isSidebarOpen}) => {
    const cardWidth = isSidebarOpen ? "calc(25% - 16px)" : "calc(25% - 8px)";
    const {userLoggedIn, token} = useUserStore();
    const {patients, getAllPatients} = usePatientStore();
    const [countPatient, setCountPatient] = useState(0);
    const {tickets, getAllTickets, getTicketByDoctor, ticketByDoctor} = useTicketStore();
    const [countTicket, setCountTicket] = useState(0);

    // State cho các combobox
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);

    // Danh sách các giá trị cho năm, tháng, ngày
    const years = [
        {label: "Không chọn", value: null},
        ...Array(5)
            .fill()
            .map((_, i) => ({
                label: (2020 + i).toString(),
                value: 2020 + i,
            })),
    ];

    const months = [
        {label: "Không chọn", value: null},
        ...Array(12)
            .fill()
            .map((_, i) => ({
                label: (i + 1).toString(),
                value: i + 1,
            })),
    ];

    const days = [
        {label: "Không chọn", value: null},
        ...Array(31)
            .fill()
            .map((_, i) => ({
                label: (i + 1).toString(),
                value: i + 1,
            })),
    ];
    const handleYearChange = (option) => {
        setSelectedYear(option);
        setSelectedMonth(null); // Reset tháng và ngày khi chọn lại năm
        setSelectedDay(null);
    };

    const handleMonthChange = (option) => {
        setSelectedMonth(option);
        setSelectedDay(null); // Reset ngày khi chọn lại tháng
    };

    useEffect(() => {

        if (userLoggedIn?.user.role !== "doctor") {
            getAllPatients(token)
            getAllTickets(token);
            setCountPatient(patients.length);
            setCountTicket(tickets.length);
        } else {
            getTicketByDoctor(token, userLoggedIn?.user.details.employeeID);
            setCountTicket(ticketByDoctor.length);
        }
    }, [patients, tickets]);

    return (
        <Box sx={{paddingY: 6, paddingX: 0.5}}>
            <Typography variant="h6" sx={{fontWeight: "Bold"}}>
                Tổng quan
            </Typography>
            {/* Chọn năm */}
            <Box sx={{gap: "1rem", display: "flex", alignItems: "center"}}>
                <Typography sx={{fontSize: "1.3rem"}}>
                    Hiển thị dữ liệu theo:{" "}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignContent: "center",
                        gap: "1rem",
                    }}
                >
                    <FormControl sx={{mb: 2, width: "15rem"}}>
                        <Select
                            options={years}
                            value={selectedYear}
                            onChange={handleYearChange}
                            placeholder="Chọn năm"
                        />
                    </FormControl>

                    {/* Chọn tháng (phải chọn năm trước) */}
                    <FormControl
                        sx={{mb: 2, width: "15rem"}}
                        disabled={!selectedYear?.value}
                    >
                        <Select
                            options={months}
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            placeholder="Chọn tháng"
                            isDisabled={!selectedYear?.value}
                        />
                    </FormControl>

                    {/* Chọn ngày (phải chọn năm và tháng trước) */}
                    <FormControl
                        sx={{mb: 2, width: "15rem"}}
                        disabled={!selectedMonth?.value}
                    >
                        <Select
                            options={days}
                            value={selectedDay}
                            onChange={setSelectedDay}
                            placeholder="Chọn ngày"
                            isDisabled={!selectedMonth?.value}
                        />
                    </FormControl>
                </Box>
            </Box>

            {/* Flexbox container for cards */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap", // Responsive wrapping
                    gap: 3, // Spacing between cards
                }}
            >
                {/* Card 1: Tổng số lịch hẹn */}
                <Card
                    sx={{
                        width: cardWidth,
                        backgroundColor: "#f0f8ff",
                        boxShadow: 10,
                        height: "8rem"
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

                {/* Card 2: Tổng số bệnh nhân */}
                {userLoggedIn?.user.role === "admin" && (
                    <Card
                        sx={{
                            width: cardWidth,
                            backgroundColor: "#e1f5fe",
                            boxShadow: 10,
                            height: "8rem"
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
                    </Card>)}


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
                            <TopServiceChart />
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
                            <TopDoctorChart />
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
                            <AppointmentSumaryChart />
                        </Box>
                    </>
                )}
            </Box>



        </Box>
    );
};

export default Overview;
