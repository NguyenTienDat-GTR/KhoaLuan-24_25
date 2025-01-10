import React, {useEffect, useState} from 'react';
import axios from "../../config/axiosConfig";
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from "recharts";
import {Box} from "@mui/material";
import useUserStore from "../../hooks/auth/useUserStore";

const COLORS = ["#FF8042", "#0088FE"]; // Màu cho Rejected (đỏ) và Accepted (xanh)

const CountRequestChart = ({filters}) => {
    const [requestData, setRequestData] = useState([]);
    const {token} = useUserStore();

    const fetchRequestCounts = async () => {
        try {
            const res = await axios.get("/appointment-request/count-by-user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: filters,
            });

            // Tính tổng để tính phần trăm
            const total = res.data.rejectedCount + res.data.acceptedCount;
            const data = [
                {
                    name: "Yêu cầu bị từ chối",
                    value: res.data.rejectedCount,
                    percentage: ((res.data.rejectedCount / total) * 100).toFixed(2),
                },
                {
                    name: "Yêu cầu được chấp nhận",
                    value: res.data.acceptedCount,
                    percentage: ((res.data.acceptedCount / total) * 100).toFixed(2),
                },
            ];
            setRequestData(data);
        } catch (error) {
            console.error("Error fetching request counts:", error);
        }
    };

    useEffect(() => {
        if (token) fetchRequestCounts();
    }, [filters, token]);

    // Tùy chỉnh nhãn hiển thị
    const renderCustomLabel = ({name, percentage}) => `${name}: ${percentage}%`;

    return (
        <Box height={300} sx={{border: 'solid 1px #000000', width: '100%'}}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={requestData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={({name, percentage}) => renderCustomLabel({name, percentage})}
                    >
                        {requestData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, name, props) => {
                            const percentage = props.payload.percentage;
                            return [`${value} (${percentage}%)`, name];
                        }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default CountRequestChart;
