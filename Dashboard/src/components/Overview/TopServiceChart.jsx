import React, {useEffect, useState} from 'react'
import useUserStore from "../../hooks/auth/useUserStore";
import axios from "../../config/axiosConfig";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Box} from "@mui/material";

const TopServiceChart = ({filters}) => {
    const [topServices, setTopServices] = useState([]);
    const {token, userLoggedIn} = useUserStore();

    const fetchTopServices = async () => {
        try {


            const res = await axios.get("/service/topServices", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: filters,
            });
            setTopServices(res.data.topServices);
        } catch (error) {
            console.error("Error in fetchTopServices:", error);
        }
    }

    useEffect(() => {
        if (token) {
            fetchTopServices(); // Hàm sẽ được gọi lại mỗi khi filters thay đổi
        }
    }, [filters, token]);
    return (
        <Box height={300} sx={{border:'solid 1px #000000', width:'100%'}}>
        <ResponsiveContainer>
            <BarChart data={topServices} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Số lần đặt" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
        </Box>
    )
}
export default TopServiceChart
