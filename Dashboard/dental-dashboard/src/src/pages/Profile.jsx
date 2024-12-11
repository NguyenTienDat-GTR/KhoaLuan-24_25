import React from "react";
import useUserStore from "../hooks/auth/useUserStore.jsx";
import {Avatar, Box, Typography} from "@mui/material";

const Profile = ({isSidebarOpen}) => {
    const {token, userLoggedIn} = useUserStore();
    const userDetails = userLoggedIn.user.details;

    // Format workingTime thành chuỗi hiển thị
    const formatWorkingTime = (workingTime) =>
        workingTime
            .map(
                (work) =>
                    `- ${translateDay(work.day)}: ${work.timeSlots.join(", ")}`
            )
            .join("\n");

    // Chuyển đổi ngày từ tiếng Anh sang tiếng Việt
    const translateDay = (day) => {
        const days = {
            Monday: "Thứ hai",
            Tuesday: "Thứ ba",
            Wednesday: "Thứ tư",
            Thursday: "Thứ năm",
            Friday: "Thứ sáu",
            Saturday: "Thứ bảy",
            Sunday: "Chủ nhật",
        };
        return days[day] || day;
    };

    return (
        <Box sx={{paddingY: 6, paddingX: 0.5}}>
            <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: 2}}>
                Thông tin cá nhân
            </Typography>
            <Box sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                border: 1,
                borderRadius: '1rem',
                paddingY: '2rem'
            }}>
                {/* Box đầu tiên */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        ml: "5rem",
                    }}
                >
                    <Typography>Mã: <strong>{userDetails.employeeID}</strong></Typography>
                    <Typography>Họ tên: <strong>{userDetails.employeeName}</strong></Typography>
                    <Typography>Giới tính: <strong>{userDetails.gender === "male" ? "Nam" : "Nữ"}</strong></Typography>
                    <Typography>Ngày sinh: <strong>{userDetails.birthDate}</strong></Typography>
                    <Typography>Căn cước: <strong>{userDetails.citizenID}</strong></Typography>
                    <Typography>Số điện thoại: <strong>{userDetails.employeePhone}</strong></Typography>
                    <Typography>Email: <strong>{userDetails.employeeEmail}</strong></Typography>
                    <Typography>Địa chỉ: <strong>{userDetails.address}</strong></Typography>
                    <Typography>
                        Trạng thái làm việc: <strong>{userDetails.isWorking ? "Đang làm việc" : "Nghỉ việc"}</strong>
                    </Typography>
                    <Typography>
                        Vị trí: <strong>{userDetails.position === "doctor" ? "Bác sĩ" : "Lễ tân"}</strong>
                    </Typography>
                </Box>

                {/* Box thứ hai */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                    }}
                >
                    <Typography>
                        Bằng cấp:
                        {userDetails.employeeSpecialization.length > 0 ? (
                            <ul>
                                {userDetails.employeeSpecialization.map((special, index) => (
                                    <li key={index}><strong>{special}</strong></li>
                                ))}
                            </ul>
                        ) : (
                            <strong>Không có</strong>
                        )}
                    </Typography>
                    <Typography>
                        Thời gian làm việc:
                        {userDetails.workingTime.length > 0 ? (
                            <pre>{formatWorkingTime(userDetails.workingTime)}</pre>
                        ) : (
                            <strong>Không có</strong>
                        )}
                    </Typography>

                </Box>

                {/* Box thứ ba */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography>
                        Hình ảnh:
                        <Avatar
                            src={userDetails.urlAvatar}
                            sx={{width: 150, height: 150, mt: 1, border: 1}}
                        />
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;
