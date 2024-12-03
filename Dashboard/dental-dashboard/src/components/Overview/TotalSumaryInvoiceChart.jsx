import React, {useEffect, useState} from 'react';
import useUserStore from "../../hooks/auth/useUserStore";
import axios from "../../config/axiosConfig";
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from "recharts";
import {Box, Typography} from "@mui/material";

const COLORS = ["#0088FE", "#FF8042"]; // Màu cho các trạng thái thanh toán

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

            // Dữ liệu cho PieChart
            const data = [
                {name: "Chưa thanh toán", value: res.data.unpaidAmount},
                {name: "Đã thanh toán", value: res.data.paidAmount},
            ];
            setInvoiceData(data);
        } catch (error) {
            console.error("Error in fetchInvoiceSummary:", error);
        }
    };

    useEffect(() => {
        if (token) fetchInvoiceSummary();
    }, [filters, token]);

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
                        label
                    >
                        {invoiceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default TotalSumaryInvoiceChart;
