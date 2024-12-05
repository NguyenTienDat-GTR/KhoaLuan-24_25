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
import {Box, Button, TextField, Typography, Tooltip, FormControl, MenuItem, InputLabel, Select} from "@mui/material";
import moment from "moment";
import "../../css/calendar.css";
import useTicketStore from "../../hooks/appointmentTicket/useTicketStore";
import useUserStore from "../../hooks/auth/useUserStore";
import useSocket from "../../hooks/useSocket";
import CancelAppointment from "../../components/ManageAppointmentRequest/CancelAppointment";
import ConfirmCustomerArrived from "../../components/ManageAppointmentRequest/ConfirmCustomerArrived";
import {useNavigate} from "react-router-dom";
import useCustomerIdStore from '../../hooks/patient/useCustomerIdStore';
import useServiceAppointmentStore from "../../hooks/appointmentTicket/useServiceAppointmentStore";
import useDoctorStore from "../../hooks/doctor/useGetAllDoctor.jsx";
import TicketDetailDialog from "../../components/AppointmentTicket/TicketDetailDialog.jsx";
import CreateAppointmentTicket from "../../components/AppointmentTicket/CreateAppointmentTicket.jsx";

// CalendarComponent
const CalendarComponent = memo(
    ({events, onEventClick, onDateClick, weekendsVisible}) => (
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
            slotMinTime="08:00:00" // Bắt đầu hiển thị từ 8:00
            slotMaxTime="19:00:00" // Kết thúc hiển thị vào 19:00
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
                        maxWidth: '100%'
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
                            zIndex: 999999, // Đảm bảo tooltip hiển thị trên cùng
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

const EventDetails = memo(({ticketById, handleCancel, user, handleConfirm}) => {
    const navigate = useNavigate();
    const setCustomerId = useCustomerIdStore((state) => state.setCustomerId);
    const setServiceAppointment = useServiceAppointmentStore((state) => state.setServiceName);
    const setTicketId = useTicketStore((state) => state.setTicketId);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleStartExam = (customerId, serviceName, ticketId) => {
        if (customerId) {
            setCustomerId(customerId);  // Cập nhật customerId vào store
            navigate(`/dashboard/kham-benh/${customerId}`);
            console.log(customerId);
        } else {
            toast.error("Không tìm thấy thông tin khách hàng");
        }
        if (serviceName) {
            setServiceAppointment(serviceName);
        }
        if (ticketId) {
            setTicketId(ticketId);
        }
    };

    return (
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
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                        }}
                    >
                        <Typography variant="h6" sx={{mb: 2}}>
                            Thông tin lịch hẹn
                        </Typography>
                        <Typography
                            sx={{
                                mb: 2,
                                textDecoration: "underline",
                                cursor: "pointer",
                                color: "blue",
                            }}
                            onClick={handleOpenDialog}
                        >
                            Xem chi tiết
                        </Typography>
                    </Box>

                    {/* Trạng thái */}
                    <Typography
                        variant="body1"
                        sx={{
                            backgroundColor:
                                ticketById.status === "waiting"
                                    ? "#27F3F3"
                                    : ticketById?.status === "cancelled"
                                        ? "#020202"
                                        : "#12D009",
                            color:
                                ticketById.status === "waiting"
                                    ? "#020202"
                                    : ticketById?.status === "cancelled"
                                        ? "#fff"
                                        : "#020202",
                        }}
                    >
                        <strong>Trạng thái:</strong>{" "}
                        {ticketById?.status === "waiting"
                            ? "Chờ khám"
                            : ticketById?.status === "cancelled"
                                ? "Đã hủy"
                                : "Đã khám"}
                    </Typography>

                    {/* Thông tin khách hàng */}
                    <Typography variant="body1">
                        <strong>Tên khách hàng:</strong> {ticketById?.customer.name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Điện thoại:</strong> {ticketById?.customer.phone}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Email:</strong> {ticketById?.customer.email}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Giới tính:</strong>{" "}
                        {ticketById?.customer.gender === "female" ? "Nữ" : "Nam"}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Ngày hẹn:</strong> {ticketById?.requestedDate}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Bắt đầu:</strong> {ticketById?.requestedTime}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Kết thúc:</strong> {ticketById?.endTime}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Dịch vụ:</strong> {ticketById?.requestedService}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Ghi chú:</strong> {ticketById?.note}
                    </Typography>

                    {/* Thông tin bác sĩ */}
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
                        <strong>Khách hàng đã đến:</strong>{" "}
                        {ticketById?.isCustomerArrived ? "Có" : "Không"}
                    </Typography>

                    {/* Các trường bổ sung theo trạng thái */}
                    {ticketById?.status === "waiting" && ticketById?.isCustomerArrived && (
                        <>
                            <Typography variant="body1">
                                <strong>Xác nhận bởi:</strong>{" "}
                                {ticketById?.confirmedBy || "Chưa xác nhận"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Đã đến lúc:</strong>{" "}
                                {ticketById?.arrivedAt || "Không xác định"}
                            </Typography>
                        </>
                    )}
                    {ticketById?.status === "cancelled" && (
                        <>
                            <Typography variant="body1">
                                <strong>Lý do hủy:</strong>{" "}
                                {ticketById?.reasonCancelled || "Không xác định"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Hủy bởi:</strong>{" "}
                                {ticketById?.cancelledBy || "Không xác định"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Hủy lúc:</strong>{" "}
                                {ticketById?.cancelledAt || "Không xác định"}
                            </Typography>
                        </>
                    )}
                    {ticketById?.status === "done" && (
                        <>
                            <Typography variant="body1">
                                <strong>Hoàn thành bởi:</strong>{" "}
                                {ticketById?.doneBy || "Không xác định"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Hoàn thành lúc:</strong>{" "}
                                {ticketById?.doneAt || "Không xác định"}
                            </Typography>
                        </>
                    )}

                    {/* Action Buttons */}
                    <Box
                        sx={{
                            mt: 2,
                            mb: 1,
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                            flexWrap: "wrap",
                        }}
                    >
                        {ticketById?.status === "waiting" &&
                            !ticketById?.isCustomerArrived &&
                            user.user.role !== "doctor" && (
                                <>
                                    <Tooltip title="Hủy phiếu hẹn" arrow>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            sx={{
                                                maxWidth: "150px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                fontSize: "0.8rem",
                                            }}
                                            onClick={handleCancel}
                                        >
                                            Hủy lịch hẹn
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Xác nhận đã đến" arrow>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                maxWidth: "150px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                fontSize: "0.8rem",
                                            }}
                                            onClick={handleConfirm}
                                        >
                                            Xác nhận đã đến
                                        </Button>
                                    </Tooltip>
                                </>
                            )}
                        {ticketById?.status === "waiting" &&
                            ticketById?.isCustomerArrived &&
                            user.user.role !== "employee" &&
                            user?.user?.details.employeeID === ticketById?.doctorId
                            &&
                            (
                                <Tooltip title="Tạo khách hàng" arrow>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        sx={{
                                            maxWidth: "150px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            fontSize: "0.8rem",
                                        }}
                                        onClick={() => handleStartExam(ticketById?.customer?._id, ticketById.requestedService, ticketById?._id)}
                                    >
                                        Bắt đầu khám
                                    </Button>
                                </Tooltip>
                            )}
                    </Box>

                    <TicketDetailDialog
                        open={isDialogOpen}
                        ticket={ticketById}
                        onClose={handleCloseDialog}
                    />
                </>
            ) : (
                <Typography variant="body1">Chọn lịch hẹn để xem chi tiết</Typography>
            )}
        </Box>
    );
    areEqual;
});

const ManageAppointment = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const {token, userLoggedIn} = useUserStore();
    const {tickets, getAllTickets, loading, ticketById, getTicketById, getTicketByDoctor, ticketByDoctor} =
        useTicketStore();
    const socket = useSocket();
    const intervalRef = useRef(null);
    const [formattedEvents, setFormattedEvents] = useState([]);
    const [openCancel, setOpenCancel] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const {doctors, getAllDoctors} = useDoctorStore();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [openCreate, setOpenCreate] = useState(false)


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase()); // Lưu giá trị tìm kiếm và chuyển về chữ thường
    };


    useEffect(() => {
        if (token) {
            getAllDoctors(token);
            fetchTickets();
        }
    }, [token]);

    useEffect(() => {
        const fetchFilteredTickets = async () => {
            if (token) {
                if (selectedDoctor) {
                    // Lọc lịch hẹn theo bác sĩ
                    const filters = {
                        doctorId: selectedDoctor.employeeID,
                    };
                    await getAllTickets(token, {filters});
                } else {
                    // Lấy tất cả lịch hẹn nếu không chọn bác sĩ
                    await getAllTickets(token, {});
                }
            }
        };

        fetchFilteredTickets();
    }, [selectedDoctor, token]);


    const handleCancel = () => {
        setOpenCancel(true);
    };

    const handleConfirm = () => {
        setOpenConfirm(true);
    }

    // Format tickets và cập nhật màu của dotColor
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
                let dotColor = "#27F3F3"; // Màu mặc định cho chờ khám

                if (ticket.status === "cancelled") {
                    dotColor = "#020202";
                } else if (ticket.status === "done") {
                    dotColor = "#12D009";
                } else if (ticket.status === "waiting") {
                    const diffMinutes = start.diff(now, "minutes");
                    if (ticket.isCustomerArrived) {
                        dotColor = "#102AEF";
                    } else if (diffMinutes <= 15) {
                        dotColor = "#F70836";
                    } else if (diffMinutes <= 30) {
                        dotColor = "#E3C40D";
                    }
                }

                return start.isValid() && end.isValid()
                    ? {
                        id: ticket._id,
                        title: ticket.customer.name,
                        start: start.toDate(),
                        end: end.toDate(),
                        dotColor: dotColor,
                    }
                    : null;
            })
            .filter(Boolean);

    const fetchTickets = async () => {
        if (!token || !userLoggedIn) return;

        try {
            if (userLoggedIn?.user.role === "doctor") {
                // Lấy lịch hẹn của bác sĩ đang đăng nhập
                const doctorId = userLoggedIn?.user.details.employeeID;
                await getTicketByDoctor(token, doctorId, {});
            } else {
                // Lấy tất cả lịch hẹn hoặc lọc theo bác sĩ được chọn
                const filters = selectedDoctor
                    ? {doctorId: selectedDoctor.employeeID}
                    : {};
                await getAllTickets(token, {filters});
            }
        } catch (error) {
            console.error("Lỗi khi lấy lịch hẹn:", error);
        }
    };


    // Hàm checkTime để cập nhật dotColor mỗi 30 giây
    const checkTime = useCallback(() => {
        setFormattedEvents((prevEvents) => {
            return prevEvents.map((event) => {
                const now = moment();
                const start = moment(event.start);
                let dotColor = event.dotColor;

                const diffMinutes = start.diff(now, "minutes");

                if (event.status === "cancelled") {
                    dotColor = "#020202";
                } else if (event.status === "done") {
                    dotColor = "#12D009";
                } else if (event.status === "waiting") {
                    if (event.isCustomerArrived) {
                        dotColor = "#102AEF";
                    } else if (diffMinutes <= 15) {
                        dotColor = "#F70836";
                    } else if (diffMinutes <= 30) {
                        dotColor = "#E3C40D";
                    } else {
                        dotColor = "#27F3F3";
                    }
                }

                return {
                    ...event,
                    dotColor: dotColor,
                };
            });
        });
    }, []);

    // Thiết lập interval để check mỗi 30 giây
    useEffect(() => {
        fetchTickets();

        if (socket) {
            socket.off("newAppointment");
            socket.on("newAppointment", fetchTickets);
            socket.off("responseTicket");
            socket.on("responseTicket", () => {
                fetchTickets();
                if (selectedEvent) getTicketById(token, selectedEvent.id);
            });
        }
        // Thiết lập interval để kiểm tra thời gian định kỳ
        intervalRef.current = setInterval(() => {
            checkTime();
        }, 30000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [token, socket, userLoggedIn?.user.role, checkTime, selectedEvent]);

    useEffect(() => {
        if (selectedEvent) getTicketById(token, selectedEvent.id);
    }, [selectedEvent, token]);

    useEffect(() => {
        const processTickets = () => {
            let filteredTickets = tickets;

            if (userLoggedIn?.user.role === "doctor") {
                // Chỉ hiển thị lịch hẹn của bác sĩ đang đăng nhập
                filteredTickets = ticketByDoctor;
            } else if (selectedDoctor) {
                // Lọc theo bác sĩ được chọn (nếu có)
                filteredTickets = tickets.filter(ticket => ticket.doctorId === selectedDoctor.employeeID);
            }

            // Áp dụng tìm kiếm theo tên khách hàng
            if (searchQuery) {
                filteredTickets = filteredTickets.filter(ticket =>
                    ticket.customer?.name.toLowerCase().includes(searchQuery)
                );
            }

            // Cập nhật các sự kiện đã định dạng
            setFormattedEvents(formatTickets(filteredTickets));
        };

        processTickets();
    }, [tickets, ticketByDoctor, selectedDoctor, searchQuery, userLoggedIn]);


    const handleEventClick = useCallback(
        (info) => setSelectedEvent(info.event),
        []
    );
    const handleDateClick = useCallback(() => setSelectedEvent(null), []);

    const handleSelectChange = (event) => {
        const doctorId = event.target.value;
        const selected = doctors.find((doc) => doc.employeeID === doctorId) || null;
        setSelectedDoctor(selected); // Cập nhật bác sĩ đã chọn
    };

    const filteredEvents = formattedEvents.filter((event) =>
        event.title.toLowerCase().includes(searchQuery)
    );


    return (
        <Box sx={{paddingY: 6, paddingX: 2}}>
            <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: 2}}>
                Quản lý lịch hẹn
            </Typography>
            <Box sx={{mt: 2, width: "100%"}}>
                <Box sx={{display: "flex", gap: 2, mb: 2}}>
                    <TextField
                        label="Tìm kiếm lịch hẹn theo tên khách hàng"
                        variant="outlined"
                        sx={{width: "60%"}}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Box
                        sx={{display: "flex", gap: 2, alignItems: "center", width: "40%"}}
                    >
                        {userLoggedIn.user?.role !== "doctor" &&
                            <FormControl sx={{minWidth: 200}}>
                                <InputLabel>Bác sĩ</InputLabel>
                                <Select
                                    value={selectedDoctor ? selectedDoctor.employeeID : ""}
                                    onChange={handleSelectChange}
                                    label="Bác sĩ"
                                >
                                    <MenuItem value="">Tất cả</MenuItem>
                                    {doctors?.map((doctor) => (
                                        <MenuItem key={doctor.employeeID} value={doctor.employeeID}>
                                            {doctor.employeeName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>}
                        <Button variant="contained" color="primary" onClick={() => setOpenCreate(true)}>
                            Thêm lịch hẹn
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box sx={{display: "flex", height: "80vh"}}>
                <Box sx={{flex: 7, mr: 2}}>
                    <CalendarComponent
                        events={filteredEvents}
                        onEventClick={handleEventClick}
                        onDateClick={handleDateClick}
                        weekendsVisible={weekendsVisible}
                    />
                </Box>
                <EventDetails ticketById={ticketById} handleCancel={handleCancel} user={userLoggedIn}
                              handleConfirm={handleConfirm}/>
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
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
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
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
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
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
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
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
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
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
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
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
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

            <CancelAppointment
                open={openCancel}
                onClose={() => setOpenCancel(false)}
                ticketId={selectedEvent?.id}
                refreshTicket={() => getTicketById(token, selectedEvent?.id)}
            />

            <ConfirmCustomerArrived
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                ticketId={selectedEvent?.id}
                refreshTicket={() => getTicketById(token, selectedEvent?.id)}
            />

            <CreateAppointmentTicket
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onSuccess={fetchTickets}
            />

        </Box>
    );
};

export default ManageAppointment;
