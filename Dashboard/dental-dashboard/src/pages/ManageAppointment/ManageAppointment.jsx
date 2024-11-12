import React, { useEffect, useState, memo, useMemo, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import viLocale from "@fullcalendar/core/locales/vi";
import { Box, Button, TextField, Typography } from "@mui/material";
import moment from "moment";
import "../../css/calendar.css";
import useTicketStore from "../../hooks/appointmentTicket/useTicketStore";
import useUserStore from "../../hooks/auth/useUserStore";
import useSocket from "../../hooks/useSocket";

// CalendarComponent
const CalendarComponent = memo(
  ({ events, onEventClick, onDateClick, weekendsVisible }) => (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventClick={onEventClick}
      dateClick={onDateClick}
      height="100%"
      locale={viLocale}
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
  ),
  (prevProps, nextProps) =>
    prevProps.events === nextProps.events &&
    prevProps.weekendsVisible === nextProps.weekendsVisible
);

const areEqual = (prevProps, nextProps) => {
  // So sánh để ngăn component render lại nếu ticketById không thay đổi
  return (
    JSON.stringify(prevProps.ticketById) ===
    JSON.stringify(nextProps.ticketById)
  );
};

const EventDetails = memo(
  ({ ticketById }) => (
    <Box
      sx={{
        flex: 3,
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
        height: "100%",
        position: "relative",
      }}
    >
      {ticketById ? (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Chi tiết lịch hẹn
          </Typography>
          <Typography variant="body1">
            <strong>Tên khách hàng:</strong> {ticketById?.customerName}
          </Typography>
          <Typography variant="body1">
            <strong>Ngày:</strong> {ticketById?.requestedDate}
          </Typography>
          <Typography variant="body1">
            <strong>Bắt đầu:</strong> {ticketById?.requestedTime}
          </Typography>
          <Typography variant="body1">
            <strong>Kết thúc:</strong> {ticketById?.endTime}
          </Typography>
          <Typography variant="body1">
            <strong>Điện thoại:</strong> {ticketById?.customerPhone}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {ticketById?.customerEmail}
          </Typography>
          <Typography variant="body1">
            <strong>Dịch vụ:</strong> {ticketById?.requestedService}
          </Typography>
          <Typography variant="body1">
            <strong>Ghi chú:</strong> {ticketById?.note}
          </Typography>
          <Typography variant="body1">
            <strong>Vấn đề:</strong> {ticketById?.concern}
          </Typography>
          <Typography variant="body1">
            <strong>Tên bác sĩ:</strong> {ticketById?.doctorName}
          </Typography>
          <Typography variant="body1">
            <strong>Số điện thoại bác sĩ:</strong> {ticketById?.doctorPhone}
          </Typography>
          <Typography variant="body1">
            <strong>Email bác sĩ:</strong>{" "}
            {ticketById?.doctorEmail || "Chưa cập nhật"}
          </Typography>
          <Typography variant="body1">
            <strong>Trạng thái:</strong>{" "}
            {ticketById?.status === "waiting"
              ? "Chờ khám"
              : ticketById?.status === "cancelled"
              ? "Đã hủy"
              : "Đã khám"}
          </Typography>
          <Typography variant="body1">
            <strong>Khách hàng đã đến:</strong>{" "}
            {ticketById?.isCustomerArived ? "Có" : "Không"}
          </Typography>
          <Typography variant="body1">
            <strong>Xác nhận bởi:</strong>{" "}
            {ticketById?.confirmedBy || "Chưa xác nhận"}
          </Typography>
          <Box sx={{ mt: 2, position: "absolute", bottom: 0, mb: 1 }}>
            <Button variant="contained" color="warning" sx={{ mr: 1 }}>
              Sửa
            </Button>
            <Button variant="contained" color="primary">
              Xác nhận KH đã đến
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="body1">Chọn lịch hẹn để xem chi tiết</Typography>
      )}
    </Box>
  ),
  areEqual
);

const formatTickets = (tickets) =>
  tickets
    .map((ticket) => {
      const start = moment(
        `${ticket.requestedDate} ${ticket.requestedTime}`,
        "DD/MM/YYYY HH:mm"
      );
      const end = moment(
        `${ticket.requestedDate} ${ticket.endTime}`,
        "DD/MM/YYYY HH:mm"
      );
      return start.isValid() && end.isValid()
        ? {
            id: ticket._id,
            title: ticket.customerName,
            start: start.toDate(),
            end: end.toDate(),
          }
        : null;
    })
    .filter(Boolean);

const ManageAppointment = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const { token } = useUserStore();
  const { tickets, getAllTickets, loading, ticketById, getTicketById } =
    useTicketStore();
  const socket = useSocket();

  useEffect(() => {
    if (token) getAllTickets(token);
    if (socket) {
      socket.off("response"); // tránh lắng nghe sự kiện nhiều lần
      socket.on("response", () => getAllTickets(token));
    }
  }, [token, socket, getAllTickets]);

  useEffect(() => {
    if (selectedEvent) getTicketById(token, selectedEvent.id);
  }, [selectedEvent, token, getTicketById]);

  const formattedEvents = useMemo(
    () => (tickets ? formatTickets(tickets) : []),
    [tickets]
  );

  const handleEventClick = useCallback(
    (info) => setSelectedEvent(info.event),
    []
  );
  const handleDateClick = useCallback(() => setSelectedEvent(null), []);

  return (
    <Box sx={{ paddingY: 6, paddingX: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Quản lý lịch hẹn
      </Typography>
      <Box sx={{ mt: 2, width: "100%" }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Tìm kiếm lịch hẹn"
            variant="outlined"
            sx={{ width: "60%" }}
          />
          <Box
            sx={{ display: "flex", gap: 2, alignItems: "center", width: "40%" }}
          >
            <Button variant="contained" color="primary">
              Thêm lịch hẹn
            </Button>
            <Button variant="contained" color="secondary">
              Làm mới
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", height: "80vh" }}>
        <Box sx={{ flex: 7, mr: 2 }}>
          <CalendarComponent
            events={formattedEvents}
            onEventClick={handleEventClick}
            onDateClick={handleDateClick}
            weekendsVisible={weekendsVisible}
          />
        </Box>
        <EventDetails ticketById={ticketById} />
      </Box>
    </Box>
  );
};

export default ManageAppointment;
