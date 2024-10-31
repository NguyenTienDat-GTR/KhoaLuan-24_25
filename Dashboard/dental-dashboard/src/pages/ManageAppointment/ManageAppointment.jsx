import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Button, TextField, Typography } from "@mui/material";
import viLocale from "@fullcalendar/core/locales/vi"; // Import ngôn ngữ tiếng Việt
import { formatDate } from "@fullcalendar/core";
import "../../css/calendar.css";

const events = [
  {
    title: "Hẹn gặp bác sĩ A",
    start: "2024-11-01T10:00:00",
    end: "2024-11-01T11:00:00",
  },
  {
    title: "Hẹn gặp bác sĩ A",
    start: "2024-11-01T14:00:00",
    end: "2024-11-01T15:00:00",
  },
  {
    title: "Kiểm tra sức khỏe",
    start: "2024-11-02T14:00:00",
    end: "2024-11-02T15:00:00",
  },
  {
    title: "Hẹn gặp bác sĩ B",
    start: "2024-11-03T16:00:00",
    end: "2024-11-03T17:00:00",
  },
  {
    title: "Hẹn gặp bác sĩ C",
    start: "2024-11-04T09:00:00",
    end: "2024-11-04T10:00:00",
  },
];

const ManageAppointment = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [weekendsVisible, setWeekendsVisible] = useState(true);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
  };

  const handleDateClick = () => {
    setSelectedEvent(null);
  };

  return (
    <Box sx={{ paddingY: 6, paddingX: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Quản lý lịch hẹn
      </Typography>
      {/* Phần 1: Tìm kiếm và nút chức năng */}
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField label="Tìm kiếm lịch hẹn" variant="outlined" fullWidth />
          <Button variant="contained" color="primary">
            Thêm lịch hẹn
          </Button>
          <Button variant="contained" color="secondary">
            Làm mới
          </Button>
        </Box>
      </Box>

      {/* Phần 2: Lịch và chi tiết lịch hẹn */}
      <Box sx={{ display: "flex", height: "80vh" }}>
        {/* Phần 2.1: Calendar */}
        <Box sx={{ flex: 7, mr: 2 }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            height="100%"
            locale={viLocale} // Sử dụng ngôn ngữ tiếng Việt
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
          />
        </Box>

        {/* Phần 2.2: Chi tiết lịch hẹn */}
        <Box
          sx={{
            flex: 3,
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          {selectedEvent ? (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Chi tiết lịch hẹn
              </Typography>
              <Typography variant="body1">
                <strong>Tiêu đề:</strong> {selectedEvent.title}
              </Typography>
              <Typography variant="body1">
                <strong>Bắt đầu:</strong> {selectedEvent.start.toISOString()}
              </Typography>
              <Typography variant="body1">
                <strong>Kết thúc:</strong> {selectedEvent.end.toISOString()}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="warning" sx={{ mr: 1 }}>
                  Sửa
                </Button>
                <Button variant="contained" color="error">
                  Xóa
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="body1">
              Chọn lịch hẹn để xem chi tiết
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ManageAppointment;
