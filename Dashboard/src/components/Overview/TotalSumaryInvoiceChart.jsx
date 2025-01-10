import React, {useEffect, useState} from 'react';
import useUserStore from "../../hooks/auth/useUserStore";
import axios from "../../config/axiosConfig";
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from "recharts";
import {Box} from "@mui/material";

const COLORS = ["#FF8042", "#0088FE"]; // Màu cho các trạng thái thanh toán

const TotalSumaryInvoiceChart = ({filters}) => {
    const [invoiceData, setInvoiceData] = useState([]);
    const {token} = useUserStore();

    const fetchInvoiceSummary = async () => {
        try {
            const res = await axios.get("/invoice/total-amount-all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: filters,
            });

            // Tính tổng giá trị để tính phần trăm
            const total = res.data.unpaidAmount + res.data.paidAmount;
            const data = [
                {
                    name: "Chưa thanh toán",
                    value: res.data.unpaidAmount,
                    percentage: ((res.data.unpaidAmount / total) * 100).toFixed(2),
                },
                {
                    name: "Đã thanh toán",
                    value: res.data.paidAmount,
                    percentage: ((res.data.paidAmount / total) * 100).toFixed(2),
                },
            ];
            setInvoiceData(data);
        } catch (error) {
            console.error("Error in fetchInvoiceSummary:", error);
        }
    };

    useEffect(() => {
        if (token) fetchInvoiceSummary();
    }, [filters, token]);

    // Tùy chỉnh nhãn hiển thị
    const renderCustomLabel = ({name, percentage}) => `${name}: ${percentage}%`;

    return (
        <Box height={300} sx={{border: 'solid 1px #000000', width: '100%'}}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={invoiceData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={({name, percentage}) => renderCustomLabel({name, percentage})}
                    >
                        {invoiceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, name, props) => {
                            const percentage = props.payload.percentage;
                            return [`${value.toLocaleString()}VNĐ (${percentage}%)`, name];
                        }}
                    />
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default TotalSumaryInvoiceChart;
