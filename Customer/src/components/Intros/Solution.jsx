import React from "react";
import { Box, Typography, Button } from "@mui/material";
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
const Solution = () => {
    return (
        <Box>
            <Box
                className="container"
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row", md: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                    mt: { xs: "none", sm: "1rem", md: "1rem" },
                    gap: "2rem",
                    width: { xs: "100%", sm: "100vw", md: "100%" },
                }}
            >
                <Box
                    className="container-image"
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(2, 1fr)" },
                        gridRowGap: { xs: "1rem", sm: "1rem", md: "1rem" },
                        width: { xs: "80%", sm: "50%", md: "50%" },
                        height: "auto",
                        mr: { xs: "0", sm: "3rem", md: "2rem" },
                        position: "relative" // Để điều chỉnh các phần tử khác trên ảnh
                    }}
                >
                    {/* Box chứa hình ảnh */}
                    <Box
                        component="img"
                        src="https://picsum.photos/100"
                        alt="giới thiệu nha khoa"
                        sx={{
                            width: { xs: "90%", sm: "90%", md: "90%" }, // Tùy chỉnh width của ảnh
                            height: { xs: "10rem", sm: "10rem", md: "10rem" }, // Tùy chỉnh height của ảnh
                            objectFit: "cover", // Giữ tỉ lệ ảnh, cắt phần dư
                            mx: "auto", // Canh giữa ảnh theo chiều ngang
                        }}
                        style={{ width: "700px", height: "450px", marginLeft: "30px" }} // Style inline cho ảnh
                    />

                    {/* Tiêu đề trên ảnh */}
                    <Box

                        sx={{
                            position: "absolute", // Đặt tiêu đề trên ảnh
                            top: "40%", // Vị trí trên ảnh
                            left: "10%", // Khoảng cách từ trái
                            color: "red", // Màu chữ
                            fontSize: { xs: "1.5rem", md: "3rem" },
                            fontWeight: "bold",
                        }}
                    >
                        Răng Sứ Thẩm Mỹ
                    </Box>

                    {/* Nút Button trên ảnh */}
                    <Button
                        variant="contained"
                        sx={{
                            position: "absolute",
                            top: "60%", // Vị trí của button
                            left: "20%",
                            backgroundColor: "#1976d2", // Màu nền của button
                            color: "white",
                            padding: "0.5rem 1.5rem", // Kích thước button
                            fontSize: "1rem",
                        }}
                    >
                        Xem Chi Tiết
                    </Button>
                </Box>

                <Box
                    className="container-image"
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(2, 1fr)" },
                        gridRowGap: { xs: "1rem", sm: "1rem", md: "1rem" },
                        width: { xs: "80%", sm: "50%", md: "50%" },
                        height: "auto",
                        mr: { xs: "0", sm: "3rem", md: "2rem" },
                        position: "relative" // Để điều chỉnh các phần tử khác trên ảnh
                    }}
                >
                    {/* Box chứa hình ảnh */}
                    <Box
                        component="img"
                        src="https://picsum.photos/280"
                        alt="giới thiệu nha khoa"
                        sx={{
                            width: { xs: "90%", sm: "90%", md: "90%" }, // Tùy chỉnh width của ảnh
                            height: { xs: "10rem", sm: "10rem", md: "10rem" }, // Tùy chỉnh height của ảnh
                            objectFit: "cover", // Giữ tỉ lệ ảnh, cắt phần dư
                            mx: "auto", // Canh giữa ảnh theo chiều ngang
                        }}
                        style={{ width: "700px", height: "450px" }} // Style inline cho ảnh
                    />

                    {/* Tiêu đề trên ảnh */}
                    <Box

                        sx={{
                            position: "absolute", // Đặt tiêu đề trên ảnh
                            top: "40%", // Vị trí trên ảnh
                            left: "10%", // Khoảng cách từ trái
                            color: "red", // Màu chữ
                            fontSize: { xs: "1.5rem", md: "3rem" },
                            fontWeight: "bold",
                        }}
                    >
                        Trồng răng Implant
                    </Box>

                    {/* Nút Button trên ảnh */}
                    <Button
                        variant="contained"
                        sx={{
                            position: "absolute",
                            top: "60%", // Vị trí của button
                            left: "20%",
                            backgroundColor: "#1976d2", // Màu nền của button
                            color: "white",
                            padding: "0.5rem 1.5rem", // Kích thước button
                            fontSize: "1rem",
                        }}
                    >
                        Xem Chi Tiết
                    </Button>
                </Box>

            </Box>
            <br />
            <Box
                className="container"
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row", md: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                    mt: { xs: "none", sm: "1rem", md: "1rem" },
                    gap: "2rem",
                    width: { xs: "100%", sm: "100vw", md: "100%" },
                }}
            >

                <Box
                    className="container-image"
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(2, 1fr)" },
                        gridRowGap: { xs: "1rem", sm: "1rem", md: "1rem" },
                        width: { xs: "80%", sm: "50%", md: "50%" },
                        height: "auto",
                        mr: { xs: "0", sm: "3rem", md: "2rem" },
                        position: "relative" // Để điều chỉnh các phần tử khác trên ảnh
                    }}
                >
                    {/* Box chứa hình ảnh */}
                    <Box
                        component="img"
                        src="https://picsum.photos/250"
                        alt="giới thiệu nha khoa"
                        sx={{
                            width: { xs: "90%", sm: "90%", md: "90%" }, // Tùy chỉnh width của ảnh
                            height: { xs: "10rem", sm: "10rem", md: "10rem" }, // Tùy chỉnh height của ảnh
                            objectFit: "cover", // Giữ tỉ lệ ảnh, cắt phần dư
                            mx: "auto", // Canh giữa ảnh theo chiều ngang
                        }}
                        style={{ width: "700px", height: "450px", marginLeft: "30px" }} // Style inline cho ảnh
                    />

                    {/* Tiêu đề trên ảnh */}
                    <Box

                        sx={{
                            position: "absolute", // Đặt tiêu đề trên ảnh
                            top: "40%", // Vị trí trên ảnh
                            left: "10%", // Khoảng cách từ trái
                            color: "red", // Màu chữ
                            fontSize: { xs: "1.5rem", md: "3rem" },
                            fontWeight: "bold",
                        }}
                    >
                        Niềng răng - Chỉnh nha
                    </Box>

                    {/* Nút Button trên ảnh */}
                    <Button
                        variant="contained"
                        sx={{
                            position: "absolute",
                            top: "60%", // Vị trí của button
                            left: "20%",
                            backgroundColor: "#1976d2", // Màu nền của button
                            color: "white",
                            padding: "0.5rem 1.5rem", // Kích thước button
                            fontSize: "1rem",
                        }}
                    >
                        Xem Chi Tiết
                    </Button>
                </Box>


                <Box
                    className="container-image"
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(2, 1fr)" },
                        gridRowGap: { xs: "1rem", sm: "1rem", md: "1rem" },
                        width: { xs: "80%", sm: "50%", md: "50%" },
                        height: "auto",
                        mr: { xs: "0", sm: "3rem", md: "2rem" },
                        position: "relative" // Để điều chỉnh các phần tử khác trên ảnh
                    }}
                >
                    {/* Box chứa hình ảnh */}
                    <Box
                        component="img"
                        src="https://picsum.photos/300"
                        alt="giới thiệu nha khoa"
                        sx={{
                            width: { xs: "90%", sm: "90%", md: "90%" }, // Tùy chỉnh width của ảnh
                            height: { xs: "10rem", sm: "10rem", md: "10rem" }, // Tùy chỉnh height của ảnh
                            objectFit: "cover", // Giữ tỉ lệ ảnh, cắt phần dư
                            mx: "auto", // Canh giữa ảnh theo chiều ngang
                        }}
                        style={{ width: "700px", height: "450px" }} // Style inline cho ảnh
                    />

                    {/* Tiêu đề trên ảnh */}
                    <Box

                        sx={{
                            position: "absolute", // Đặt tiêu đề trên ảnh
                            top: "40%", // Vị trí trên ảnh
                            left: "10%", // Khoảng cách từ trái
                            color: "red", // Màu chữ
                            fontSize: { xs: "1.5rem", md: "3rem" },
                            fontWeight: "bold",
                        }}
                    >
                        Điều trị tổng quát
                    </Box>

                    {/* Nút Button trên ảnh */}
                    <Button
                        variant="contained"
                        sx={{
                            position: "absolute",
                            top: "60%", // Vị trí của button
                            left: "20%",
                            backgroundColor: "#1976d2", // Màu nền của button
                            color: "white",
                            padding: "0.5rem 1.5rem", // Kích thước button
                            fontSize: "1rem",
                        }}
                    >
                        Xem Chi Tiết
                    </Button>
                </Box>

            </Box>
        </Box>

    );
};

export default Solution;
