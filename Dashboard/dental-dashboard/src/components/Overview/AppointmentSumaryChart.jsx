import React, {useEffect, useState} from 'react';
import useUserStore from "../../hooks/auth/useUserStore";
import axios from "../../config/axiosConfig";
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from "recharts";
import {Box, Typography} from "@mui/material";

const COLORS = ["#FF8042", "#0088FE", "#00C49F"]; // Màu cho các trạng thái

const AppointmentSumaryChart = ({filters}) => {
    const [appointmentData, setAppointmentData] = useState([]);
    const {token} = useUserStore();

    const fetchAppointmentSummary = async () => {
        try {
            const res = await axios.get("/ticket/appointmentSumary", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: filters,
            });
            // Tính tổng giá trị để tính phần trăm
            const total = res.data.cancelled + res.data.waiting + res.data.done;
            const data = [
                {name: "Đã hủy", value: res.data.cancelled},
                {name: "Đang chờ", value: res.data.waiting},
                {name: "Đã hoàn thành", value: res.data.done},
            ].map((item) => ({
                ...item,
                percentage: total > 0 ? ((item.value / total) * 100).toFixed(2) : 0, // Tính phần trăm
            }));
            setAppointmentData(data);
        } catch (error) {
            console.error("Error in fetchAppointmentSummary:", error);
        }
    };

    useEffect(() => {
        if (token) fetchAppointmentSummary();
    }, [filters, token]);

    // Custom label to display name and percentage
    const renderCustomLabel = ({name, percentage}) => `${name}: ${percentage}%`;

    return (
        <Box height={300} sx={{border: 'solid 1px #000000', width: '100%'}}>
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
                        label={({name, percentage}) => renderCustomLabel({name, percentage})}
                        labelLine={false}
                    >
                        {appointmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, name, props) => `${value} (${props.payload.percentage}%)`}
                    />
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default AppointmentSumaryChart;
