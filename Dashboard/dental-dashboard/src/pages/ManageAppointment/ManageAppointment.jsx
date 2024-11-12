import React, {
  useEffect,
  useState,
  memo,
  useMemo,
  useCallback,
  useRef,
} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import viLocale from "@fullcalendar/core/locales/vi";
import { Box, Button, TextField, Typography, Tooltip } from "@mui/material";
import moment from "moment";
import "../../css/calendar.css";
import useTicketStore from "../../hooks/appointmentTicket/useTicketStore";
import useUserStore from "../../hooks/auth/useUserStore";
import useSocket from "../../hooks/useSocket";
import axios from "../../config/axiosConfig";

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
      editable={false}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={weekendsVisible}
      eventContent={(arg) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            objectFit: "cover",
          }}
        >
          {/* Tạo chấm tròn màu theo trạng thái */}
          <span
            style={{
              backgroundColor: arg.event.extendedProps.dotColor,
              borderRadius: "50%",
              width: "10px",
              height: "10px",
              marginRight: "2px",
            }}
          ></span>
          <Tooltip
            title={`Khách hàng: ${arg.event.title} - Giờ: ${moment(
              arg.event.start
            ).format("HH:mm")}`}
            arrow
            sx={{
              backgroundColor: "#000", // Đổi màu nền của tooltip
              color: "#fff", // Đổi màu chữ của tooltip
              fontSize: "2rem", // Thay đổi kích thước font chữ
              maxWidth: 250, // Giới hạn chiều rộng của tooltip
              padding: "8px", // Tăng khoảng cách padding cho tooltip
            }}
          >
            <span
              className="fc-event-title"
              style={{
                textOverflow: "ellipsis", // Cắt gọn title nếu quá dài
                whiteSpace: "nowrap", // Không xuống dòng
                overflow: "hidden", // Ẩn phần thừa
                cursor: "pointer", // Thêm con trỏ tay khi hover
                maxWidth: "100%", // Đảm bảo title nằm trong box
                display: "block", // Đảm bảo title chiếm toàn bộ chiều rộng
              }}
            >
              {arg.event.title}
            </span>
          </Tooltip>
        </div>
      )}
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

          {/* Nút sửa, hủy */}
           <Box
            sx={{
              mt: 2,
              mb: 1,
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              display: "flex",
              justifyContent: "center", // Canh giữa
              gap: 2,
            }}
          >
            <Tooltip title="Sửa phiếu hẹn" arrow>
              <Button
                variant="contained"
                color="warning"
                sx={{
                  maxWidth: "150px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Sửa phiếu hẹn
              </Button>
            </Tooltip>
            <Tooltip title="Hủy phiếu hẹn" arrow>
              <Button
                variant="contained"
                color="error"
                sx={{
                  maxWidth: "150px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Hủy phiếu hẹn
              </Button>
            </Tooltip>
          </Box>

          {/* Nút tạo khách hàng và xác nhận */}
          <Box
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: "center", // Canh giữa
              width: "100%",
              gap: 2,
            }}
          >
            <Tooltip title="Tạo khách hàng" arrow>
              <Button
                variant="contained"
                color="success"
                sx={{
                  maxWidth: "150px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Tạo khách hàng
              </Button>
            </Tooltip>
            {!ticketById.isCustomerArived && (
              <Tooltip title="Xác nhận đã đến" arrow>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Xác nhận đã đến
                </Button>
              </Tooltip>
            )}
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
      const now = moment();
      let dotColor = "#27F3F3"; // Màu của chấm tròn sẽ thay đổi theo trạng thái của ticket

      if (ticket.status === "cancelled") {
        dotColor = "#020202";
      } else if (ticket.status === "done") {
        dotColor = "#12D009";
      } else if (ticket.status === "waiting") {
        const diffMinutes = start.diff(now, "minutes");
        if (ticket.isCustomerArived) {
          dotColor = "#102AEF"; // Đã đến
        } else if (diffMinutes <= 15) {
          dotColor = "#F70836"; // Còn 15 phút
        } else if (diffMinutes <= 30) {
          dotColor = "#E3C40D"; // Còn 30 phút
        }
      }

      return start.isValid() && end.isValid()
        ? {
            id: ticket._id,
            title: ticket.customerName,
            start: start.toDate(),
            end: end.toDate(),
            dotColor: dotColor, // Gán màu của chấm tròn
          }
        : null;
    })
    .filter(Boolean);

const ManageAppointment = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const { token, userLoggedIn } = useUserStore();
  const { tickets, getAllTickets, loading, ticketById, getTicketById } =
    useTicketStore();
  const socket = useSocket();
  const [ticketByDoctor, setTicketByDoctor] = useState([]);
  const intervalRef = useRef(null);

  // Handle events and tick every 30 seconds
  const checkTime = useCallback(() => {
    if (selectedEvent) {
      const now = moment();
      const requestedTime = moment(
        `${selectedEvent.startDate} ${selectedEvent.startTime}`,
        "DD/MM/YYYY HH:mm"
      );

      // If the requested time is approaching or in the past, update status
      if (requestedTime.diff(now, "minutes") <= 15) {
        console.log("Event time is near or in the past!");
        // Do something when it's near the requested time
      }
    }
  }, [selectedEvent]);

  const fetchTickets = async () => {
    if (token) {
      if (userLoggedIn?.user.role === "doctor") {
        // Lấy các ticket của bác sĩ
        await getTicketByDoctor(token);
      } else {
        // Lấy tất cả các ticket
        await getAllTickets(token);
      }
    }
  };

  // Set interval to check every 30 seconds
  useEffect(() => {
    fetchTickets();

    if (socket) {
      socket.off("response");
      socket.on("response", fetchTickets);
      socket.off("response");
      socket.on("responseTicket", fetchTickets);
      socket.off("responseTicket");
    }

    intervalRef.current = setInterval(() => {
      checkTime();
    }, 30000); // 30 seconds

    return () => {
      // Clean up the interval when the component is unmounted
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [token, socket, userLoggedIn?.user.role, checkTime]);

  const getTicketByDoctor = async (token) => {
    try {
      const response = await axios.get(
        `/ticket/getByDoctor/${userLoggedIn?.user.details.employeeID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setTicketByDoctor(response.data.tickets);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedEvent) getTicketById(token, selectedEvent.id);
  }, [selectedEvent, token, getTicketById]);

  const formattedEvents = useMemo(
    () =>
      userLoggedIn?.user.role === "doctor"
        ? formatTickets(ticketByDoctor)
        : formatTickets(tickets),
    [tickets, ticketByDoctor, userLoggedIn?.user.role]
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

      {/* Chú thích màu sắc */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
          ml: "3",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#27F3F3",
            }}
          />
          <Typography variant="body2">Đang chờ</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#F70836",
            }}
          />
          <Typography variant="body2">Còn ít hơn 15 phút</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#E3C40D",
            }}
          />
          <Typography variant="body2">Còn ít hơn 30 phút</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#12D009",
            }}
          />
          <Typography variant="body2">Đã khám</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#020202",
            }}
          />
          <Typography variant="body2">Đã hủy</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#102AEF",
            }}
          />
          <Typography variant="body2">Khách đã đến</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageAppointment;
