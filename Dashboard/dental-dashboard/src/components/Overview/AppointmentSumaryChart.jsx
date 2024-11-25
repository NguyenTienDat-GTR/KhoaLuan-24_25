import React, { useEffect, useState } from 'react';
import useUserStore from "../../hooks/auth/useUserStore";
import axios from "../../config/axiosConfig";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"]; // Màu cho các trạng thái

const AppointmentSumaryChart = () => {
    const [appointmentData, setAppointmentData] = useState([]);
    const { token } = useUserStore();

    const fetchAppointmentSummary = async () => {
        try {
            const res = await axios.get("/ticket/appointmentSumary", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Chuyển đổi dữ liệu API thành định dạng phù hợp với PieChart
            const data = [
                { name: "Tổng số lịch hẹn", value: res.data.totalAppointments },
                { name: "Đã hủy", value: res.data.cancelled },
                { name: "Đang chờ", value: res.data.waiting },
                { name: "Đã hoàn thành", value: res.data.done },
            ];
            setAppointmentData(data);
        } catch (error) {
            console.error("Error in fetchAppointmentSummary:", error);
        }
    };

    useEffect(() => {
        if (token) fetchAppointmentSummary();
    }, [token]);

    return (
        <Box height={300} sx={{ border: 'solid 1px #000000', width: '100%' }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={appointmentData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {appointmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default AppointmentSumaryChart;
