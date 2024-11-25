import React, {useEffect, useState} from 'react'
import useUserStore from "../../hooks/auth/useUserStore";
import axios from "../../config/axiosConfig";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Box} from "@mui/material";

const TopDoctorChart = () => {
    const [topDoctor, setTopDoctor] = useState([]);
    const {token, userLoggedIn} = useUserStore();

    const fetchTopDoctor = async () => {
        try {
            const res = await axios.get("/ticket/getTopDoctor", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTopDoctor(res.data.topDoctors);
        } catch (error) {
            console.error("Error in fetchTopDoctor:", error);
        }
    }

    useEffect(() => {
        if (token)
            fetchTopDoctor()
    }, [])
    return (
        <Box height={300} sx={{border: 'solid 1px #000000', width:'100%'}}>
            <ResponsiveContainer>
                <BarChart data={topDoctor} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="doctorName"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="totalTickets" name="Số phiếu hẹn" fill="#32AEF4"/>
                </BarChart>
            </ResponsiveContainer>
        </Box>
    )
}
export default TopDoctorChart
