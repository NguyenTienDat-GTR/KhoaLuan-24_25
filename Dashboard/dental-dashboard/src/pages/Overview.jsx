import React, { useState } from "react";
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
  Medication,
  EditCalendar,
  AttachMoney,
} from "@mui/icons-material"; // Import icons
import Select from "react-select";

const Overview = ({ isSidebarOpen }) => {
  const cardWidth = isSidebarOpen ? "calc(50% - 16px)" : "calc(50% - 8px)";
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

  // State cho các combobox
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  // Danh sách các giá trị cho năm, tháng, ngày
  const years = [
    { label: "Không chọn", value: null },
    ...Array(5)
      .fill()
      .map((_, i) => ({
        label: (2020 + i).toString(),
        value: 2020 + i,
      })),
  ];

  const months = [
    { label: "Không chọn", value: null },
    ...Array(12)
      .fill()
      .map((_, i) => ({
        label: (i + 1).toString(),
        value: i + 1,
      })),
  ];

  const days = [
    { label: "Không chọn", value: null },
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

  return (
    <Box sx={{ paddingY: 6, paddingX: 0.5 }}>
      <Typography variant="h6" sx={{ fontWeight: "Bold" }}>
        Tổng quan
      </Typography>
      {/* Chọn năm */}
      <Box sx={{ gap: "1rem", display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontSize: "1.3rem" }}>
          Hiển thị dữ liệu theo:{" "}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            gap: "1rem",
          }}
        >
          <FormControl sx={{ mb: 2, width: "15rem" }}>
            <Select
              options={years}
              value={selectedYear}
              onChange={handleYearChange}
              placeholder="Chọn năm"
            />
          </FormControl>

          {/* Chọn tháng (phải chọn năm trước) */}
          <FormControl
            sx={{ mb: 2, width: "15rem" }}
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
            sx={{ mb: 2, width: "15rem" }}
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
          justifyContent: "space-between",
          flexWrap: "wrap", // Responsive wrapping
          gap: 2, // Spacing between cards
        }}
      >
        {/* Card 1: Tổng số lịch hẹn */}
        <Card
          sx={{
            width: cardWidth,
            backgroundColor: "#f0f8ff",
            boxShadow: 10,
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccessAlarm sx={{ fontSize: 40, color: "#3f51b5" }} />
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  color: "#3f51b5",
                  fontWeight: "bold",
                }}
              >
                Tổng số lịch hẹn
              </Typography>
            </Box>
            <Typography
              sx={{
                padding: "2rem",
                fontSize: "2.2rem",
                color: "#ff5722",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              150
            </Typography>
          </CardContent>
        </Card>

        {/* Card 2: Tổng số bệnh nhân */}
        <Card
          sx={{
            width: cardWidth,
            backgroundColor: "#e1f5fe",
            boxShadow: 10,
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ fontSize: 40, color: "#4caf50" }} />
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
                padding: "2rem",
                fontSize: "2.2rem",
                color: "#ff5722",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              80
            </Typography>
          </CardContent>
        </Card>

        {/* Card 3: Số lịch hẹn chờ phản hồi */}
        <Card
          sx={{
            width: cardWidth,
            backgroundColor: "#FFE7BA",
            boxShadow: 10,
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <EditCalendar sx={{ fontSize: 40, color: "#FF6347" }} />
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  color: "#FF6347",
                  fontWeight: "bold",
                }}
              >
                Số lịch hẹn chờ phản hồi
              </Typography>
            </Box>
            <Typography
              sx={{
                padding: "2rem",
                fontSize: "2.2rem",
                color: "#ff5722",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              20
            </Typography>
          </CardContent>
        </Card>

        {/* Card 4: Số lượng thuốc */}
        <Card
          sx={{
            width: cardWidth,
            backgroundColor: "#ffccbc",
            boxShadow: 10,
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AttachMoney sx={{ fontSize: 40, color: "#e53935" }} />
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  color: "#e53935",
                  fontWeight: "bold",
                }}
              >
                Tổng doanh thu
              </Typography>
            </Box>
            <Typography
              sx={{
                padding: "2rem",
                fontSize: "2.2rem",
                color: "#ff5722",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              120.000.000 VND
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Chart Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Biểu đồ số lượng lịch hẹn
        </Typography>
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
