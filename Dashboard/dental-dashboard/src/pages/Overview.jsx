import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  AccessAlarm,
  AccountCircle,
  EventAvailable,
  Medication,
  EditCalendar,
} from "@mui/icons-material"; // Import icons

const Overview = () => {
  // Sample data for charts
  const data = [
    { name: "Mon", Appointments: 10, Emergency: 2 },
    { name: "Tue", Appointments: 15, Emergency: 1 },
    { name: "Wed", Appointments: 7, Emergency: 3 },
    { name: "Thu", Appointments: 20, Emergency: 0 },
    { name: "Fri", Appointments: 18, Emergency: 2 },
  ];

  // Sample data for pie chart (patients arrived vs. not arrived)
  const attendanceData = [
    { name: "Đến", value: 70 },
    { name: "Không đến", value: 30 },
  ];

  const revenueData = [
    { name: "Mon", Revenue: 2000000 },
    { name: "Tue", Revenue: 3000000 },
    { name: "Wed", Revenue: 1500000 },
    { name: "Thu", Revenue: 5000000 },
    { name: "Fri", Revenue: 2500000 },
  ];

  const COLORS = ["#82ca9d", "#ff8042"];

  // State for individual filters
  const [appointmentFilter, setAppointmentFilter] = useState("Tất cả");
  const [patientFilter, setPatientFilter] = useState("Tất cả");
  const [revenueFilter, setRevenueFilter] = useState("Tất cả");
  const [medicationFilter, setMedicationFilter] = useState("Tất cả");

  // State for chart filters
  const [pieChartFilter, setPieChartFilter] = useState("Tất cả");
  const [barChartFilter, setBarChartFilter] = useState("Tất cả");
  const [barChartDoubleFilter, setBarChartDoubleFilter] = useState("Tất cả");

  // State for common filter
  const [commonFilter, setCommonFilter] = useState("Tất cả");

  const filterOptions = [
    "Tất cả",
    "Năm nay",
    "Tháng này",
    "Tuần này",
    "Hôm nay",
  ];

  // Function to handle common filter change
  const handleCommonFilterChange = (value) => {
    setCommonFilter(value);
    setAppointmentFilter(value);
    setPatientFilter(value);
    setRevenueFilter(value);
    setMedicationFilter(value);
  };

  return (
    <Box sx={{ paddingY: 4, paddingX: 0.5 }}>
      {/* Common Filter */}
      <FormControl sx={{ mb: 2, width: "15rem" }}>
        <InputLabel shrink>Chọn thời gian chung</InputLabel>
        <Select
          value={commonFilter}
          onChange={(e) => handleCommonFilterChange(e.target.value)}
          variant="filled"
        >
          {filterOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Flexbox container for cards */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap", // Responsive wrapping
          gap: 2, // Spacing between cards
        }}
      >
        <Card
          sx={{ flex: "1 1 0", minWidth: 200, backgroundColor: "#f0f8ff" }} // Reduced width
        >
          <CardContent>
            <AccessAlarm sx={{ fontSize: 40, color: "#3f51b5" }} />
            <Typography sx={{ fontSize: "1.2rem" }}>
              Tổng số lịch hẹn
            </Typography>
            <Typography sx={{ fontSize: "1.5rem" }}>150</Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Chọn thời gian</InputLabel>
              <Select
                value={appointmentFilter}
                onChange={(e) => setAppointmentFilter(e.target.value)}
                variant="filled"
              >
                {filterOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        <Card
          sx={{ flex: "1 1 0", minWidth: 200, backgroundColor: "#e1f5fe" }} // Reduced width
        >
          <CardContent>
            <AccountCircle sx={{ fontSize: 40, color: "#4caf50" }} />
            <Typography sx={{ fontSize: "1.2rem" }}>
              Tổng số bệnh nhân
            </Typography>
            <Typography sx={{ fontSize: "1.5rem" }}>80</Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Chọn thời gian</InputLabel>
              <Select
                value={patientFilter}
                onChange={(e) => setPatientFilter(e.target.value)}
                variant="filled"
              >
                {filterOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        <Card
          sx={{ flex: "1 1 0", minWidth: 200, backgroundColor: "#ffe0b2" }} // Reduced width
        >
          <CardContent>
            <EditCalendar sx={{ fontSize: 40, color: "#ff9800" }} />
            <Typography sx={{ fontSize: "1.2rem" }}>
              Số lịch hẹn chờ phản hồi
            </Typography>
            <Typography sx={{ fontSize: "1.5rem" }}>20</Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Chọn thời gian</InputLabel>
              <Select
                value={revenueFilter}
                onChange={(e) => setRevenueFilter(e.target.value)}
                variant="filled"
              >
                {filterOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* New Card for additional information */}
        <Card
          sx={{ flex: "1 1 0", minWidth: 200, backgroundColor: "#ffccbc" }} // Reduced width
        >
          <CardContent>
            <Medication sx={{ fontSize: 40, color: "#e53935" }} />
            <Typography sx={{ fontSize: "1.2rem" }}>Số lượng thuốc</Typography>
            <Typography sx={{ fontSize: "1.5rem" }}>150</Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Chọn thời gian</InputLabel>
              <Select
                value={medicationFilter}
                onChange={(e) => setMedicationFilter(e.target.value)}
                variant="filled"
              >
                {filterOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Box>

      {/* Chart Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Biểu đồ số lượng lịch hẹn
        </Typography>
        <FormControl sx={{ mb: 2, width: "15rem" }}>
          <InputLabel>Chọn thời gian</InputLabel>
          <Select
            value={barChartDoubleFilter}
            onChange={(e) => setBarChartDoubleFilter(e.target.value)}
            variant="filled"
          >
            {filterOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Appointments" fill="#8884d8" />
            <Bar dataKey="Emergency" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Additional Charts Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Biểu đồ trạng thái lịch hẹn
        </Typography>
        <FormControl sx={{ mb: 2, width: "15rem" }}>
          <InputLabel>Chọn thời gian</InputLabel>
          <Select
            value={pieChartFilter}
            onChange={(e) => setPieChartFilter(e.target.value)}
            variant="filled"
          >
            {filterOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={attendanceData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {attendanceData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Revenue Chart Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Biểu đồ doanh thu
        </Typography>
        <FormControl sx={{ mb: 2, width: "15rem" }}>
          <InputLabel>Chọn thời gian</InputLabel>
          <Select
            value={barChartFilter}
            onChange={(e) => setBarChartFilter(e.target.value)}
            variant="filled"
          >
            {filterOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Revenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Overview;
