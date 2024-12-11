//ham gia thao lap
//nieng rang thao lap
import React, { useState, Suspense } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Snackbar,
    Alert, Grid
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Import images
import hamGia from "../Services/img/phuc-hinh/rang-gia-thao-lap.jpg";
import r1 from "../Services/img/phuc-hinh/ham-gia/1.jpg";
import r2 from "../Services/img/phuc-hinh/ham-gia/2.jpg";
import r3 from "../Services/img/phuc-hinh/ham-gia/3.jpg";
import r4 from "../Services/img/phuc-hinh/ham-gia/4.jpg";


const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));

const images = [
    { id: 1, src: hamGia },
    { id: 2, src: r1 },
    { id: 3, src: r2 },
    { id: 4, src: r3 },
    { id: 5, src: r4 },

];

const DentalPartialDenture = () => {
    const [selectedImage, setSelectedImage] = useState(images[0].src);
    const [tabIndex, setTabIndex] = useState(0); // Tab state
    const [service, setService] = useState(""); // State for selected service
    const [price, setPrice] = useState(""); // State for price
    const [serviceImage, setServiceImage] = useState("");
    const [error, setError] = useState(""); // Error state for validation
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [errors, setErrors] = useState({});

    // State cho formData bao gồm tất cả các trường
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        time: "9h",
        date: new Date().toISOString().split("T")[0], // Lấy ngày hôm nay
        doctorGender: "Nam", // Giá trị mặc định
        notes: "",
    });

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false); // Đóng thông báo khi người dùng bấm nút tắt
    };

    const handleServiceChange = (event) => {
        const selectedService = event.target.value;
        setService(selectedService);

        // Set price based on selected service
        switch (selectedService) {
            case "Phục hình toàn hàm - Răng nhựa":
                setPrice("15.000.000VND");
                setServiceImage(r2);
                break;
            case "Nền hàm tạm":
                setPrice("400.000VND");
                setServiceImage(r5);
                break;
            case "Khung kim loại":
                setPrice("3.500.000 VND");
                setServiceImage(r3);
                break;
            case "Khung đặc biệt Titan":
                setPrice("5.000.000VND");
                setServiceImage(r1);
                break;
            default:
                setPrice("");
                setSelectedImage("")
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setFormData({
            name: "",
            phone: "",
            email: "",
            time: "9h",
            date: new Date().toISOString().split("T")[0],
            doctorGender: "Nam",
            notes: "",
        });
        setService("");
        setPrice("");
        setError("");
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Vui lòng nhập họ tên";
        if (!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại";
        if (!formData.email) newErrors.email = "Vui lòng nhập email";
        if (!formData.date) newErrors.date = "Vui lòng chọn ngày";
        if (!formData.time) newErrors.time = "Vui lòng chọn thời gian";
        if (!formData.doctorGender) newErrors.doctorGender = "Vui lòng chọn bác sĩ";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBookingSubmit = () => {
        if (!validateForm()) {
            // Hiển thị lỗi nếu có trường trống
            setSnackbarMessage("Vui lòng nhập đầy đủ các trường bắt buộc");
            setOpenSnackbar(true);
            return;
        }

        // Logic đặt lịch ở đây, ví dụ gọi API

        // Sau khi đặt lịch thành công
        setSnackbarMessage("Đặt lịch thành công, vui lòng kiểm tra email sau 15 phút!");
        setOpenSnackbar(true);
        handleReset();
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Suspense fallback={<CircularProgress />}>
                <Header />
            </Suspense>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, marginLeft: { md: "50px" }, marginTop: { md: "70px" }, gap: "20px", padding: { md: "20px" }, justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                {/* Left side: Image and Thumbnails */}
                <Box sx={{
                    width: { xs: "100%", md: "60%" },
                    marginBottom: { xs: "20px", md: "0" },
                    marginTop: { md: "2rem", xs: "5rem", sm: "7rem" }
                }}>
                    <Box sx={{ margin: "1rem" }}>
                        <Typography sx={{
                            fontSize: { md: "25px", xs: "22px" },
                            fontWeight: "bold",
                            color: "red"
                        }}>
                            Hàm giả tháo lắp
                        </Typography>
                        <Typography>
                            Răng giả tháo lắp là một khung hàm có thể tháo lắp làm bằng nhựa dẻo hoặc khung kim loại và bên trên là các răng giả. Phương pháp này có thể áp dụng cho tình trạng mất một răng, nhiều răng và thậm chí là tất cả răng.
                        </Typography>
                    </Box>
                    {/* Main Image */}
                    <Box sx={{ position: "relative", overflow: "hidden", objectFit: "fixed", borderRadius: "8px" }}>
                        <img src={selectedImage} alt="Main" style={{ width: "90%", height: "450px" }} />
                    </Box>

                    {/* Thumbnails */}
                    <Box sx={{
                        display: "flex",
                        marginTop: "10px",
                        justifyContent: { xs: "center", md: "start" },
                    }}>
                        {images.map((image) => (
                            <Box key={image.id} onClick={() => setSelectedImage(image.src)} sx={{ cursor: "pointer", marginRight: "10px", border: selectedImage === image.src ? "2px solid #007bff" : "2px solid transparent", overflow: "hidden", borderRadius: "4px", transition: "transform 0.2s", '&:hover': { transform: "scale(1.1)" } }}>
                                <img src={image.src}
                                    style={{ width: "70px", height: "70px", transition: "transform 0.2s" }} />
                            </Box>
                        ))}
                    </Box>

                    {/* Tabs for Thông số kỹ thuật và Bài viết đánh giá */}
                    <Box sx={{ marginTop: "20px" }}>
                        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Tabs for information">
                            <Tab label="Thông số kỹ thuật" />
                            <Tab label="Bài viết đánh giá" />
                        </Tabs>

                        {/* Tab Panel: Thông số kỹ thuật */}
                        {tabIndex === 0 && (
                            <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginTop: "10px" }}>
                                <Typography variant="h6">Thông số kỹ thuật</Typography>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Loại sản phẩm:</TableCell>
                                            <TableCell>Hàm giả tháo lắp</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </Box>
                        )}

                        {/* Tab Panel: Bài viết đánh giá */}
                        {tabIndex === 1 && (
                            <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginTop: "10px" }}>
                                <Typography variant="h6" color="orange">Hàm giả tháo lắp</Typography>
                                <Box marginLeft={"10px"}>

                                    <Typography >
                                        Hiện có hai loại răng giả tháo lắp là: răng tháo lắp bán phần và răng tháo lắp toàn phần.
                                        Trong đó, răng tháo lắp bán phần được sử dụng trong trường hợp mất một răng hoặc vài răng nhằm cải thiện ăn nhai và ngăn chặn xô lệch. Còn răng giả toàn phần sẽ được sử dụng khi mất răng toàn hàm.
                                    </Typography>
                                </Box>
                                <Box marginTop={"10px"}>

                                    <Typography variant="h6" >Ưu và nhược điểm của hàm giả tháo lắp</Typography>
                                    <Box marginLeft={"10px"}>
                                        <Typography color="blue"> *** Ưu điểm *** </Typography>
                                        <Typography >
                                            - Chi phí thấp.<br />
                                            - Quy trình làm răng giả tháo lắp đơn giản, không mất nhiều thời gian.<br />
                                            - Phù hợp với người lớn tuổi vì không yêu cầu cao về sức khỏe hay điều kiện xương hàm, đồng thời răng giả cũng thuận tiện tháo gỡ.
                                            <br></br>
                                            <br />
                                        </Typography>
                                    </Box>
                                    <Box marginLeft={"10px"}>
                                        <Typography color="blue"> *** Nhược điểm *** </Typography>
                                        <Typography >
                                            - Khả năng ăn nhai bị hạn chế vì sức chịu lực nhai của hàm giả tháo lắp ở mức trung bình, không thể nhai mạnh. Đặc biệt, nếu nhai thức ăn không kỹ có thể dẫn đến các vấn đề về tiêu hóa. Do đó, bệnh nhân làm răng giả tháo lắp phải chú ý hơn trong chế độ ăn uống, hạn chế các món dai, cứng và dẻo.<br />
                                            - Độ thẩm mỹ thấp vì răng giả làm bằng nhựa rất dễ nhận ra, phần nhựa mô phỏng lợi có màu sắc không tự nhiên, nhất là với một số hàm giả lắp bán phần có các móc kim loại rất kém thẩm mỹ.<br />
                                            - Tuổi thọ ngắn, chỉ sau khoảng 3-5 năm thì bệnh nhân phải thay hàm tháo lắp toàn bộ.<br />
                                            - Không ngăn chặn được tình trạng tiêu xương hàm, từ đó tăng nguy cơ lão hóa sớm, gây hóp má làm mất thẩm mỹ toàn gương mặt.<br />

                                        </Typography>
                                    </Box>
                                </Box>

                                <Box marginTop={"10px"}>

                                    <Typography variant="h6" >Quy trình thực hiện trồng hàm giả tháo lắp</Typography>

                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Bước 1: Thăm khám và tư vấn điều trị<br />
                                            - Bước 2: Lấy dấu hàm<br />
                                            - Bước 3: Gắn hàm giả<br />
                                            - Bước 4: Hướng dẫn người bệnh cách chăm sóc tại nhà

                                            <br /><br />

                                        </Typography>
                                    </Box>
                                </Box>
                                { /*sứ*/}
                                <Box marginTop={"10px"}>

                                    <Typography variant="h6" >Lưu ý khi sử dụng hàm giả tháo lắp</Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Cần vệ sinh răng miệng mỗi ngày ít nhất 2 lần.<br />
                                            - Nên tháo hàm ra khi đi ngủ và ngâm trong dung dịch muối loãng.<br />
                                            - Tránh để hàm giả bị va chạm mạnh dẫn đến rơi vỡ.<br />
                                            - Không nên ăn đồ quá cứng hay quá dai.<br />
                                            - Kiểm tra răng miệng định kỳ.<br />
                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>

                {/* Right side: Form đặt lịch */}
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        padding: "20px",
                        boxShadow: 3,
                        borderRadius: "10px",
                        maxWidth: { xs: "100%", md: "40%" },
                        marginTop: { xs: "20px", md: "0" },
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
                        Đặt lịch tư vấn
                    </Typography>

                    <TextField
                        name="name"
                        label="Họ tên"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        name="phone"
                        label="Số điện thoại"
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />

                    {/* Date Picker and Time Select */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={6}>
                                <DatePicker
                                    label="Chọn ngày"
                                    value={formData.date}
                                    onChange={(newValue) =>
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            date: newValue,
                                        }))
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            error={!!errors.date}
                                            helperText={errors.date}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Thời gian"
                                    name="time"
                                    select
                                    value={formData.time}
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    {[...Array(9).keys()].map((hour) => (
                                        <MenuItem key={hour} value={`${9 + hour}h`}>
                                            {9 + hour}h
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </LocalizationProvider>

                    {/* Select Dịch vụ */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Dịch vụ</InputLabel>
                        <Select
                            value={service}
                            onChange={handleServiceChange}
                            label="Dịch vụ"
                        >
                            <MenuItem value="Phục hình toàn hàm - Răng nhựa">Phục hình toàn hàm - Răng nhựa</MenuItem>
                            <MenuItem value="Nền hàm tạm">Nền hàm tạm</MenuItem>
                            <MenuItem value="Khung kim loại">Khung kim loại</MenuItem>
                            <MenuItem value="Khung đặc biệt Titan">Khung đặc biệt Titan</MenuItem>
                            
                        </Select>

                    </FormControl>

                    {/* Hiển thị hình ảnh minh họa và giá tiền */}
                    {serviceImage && (
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                            <img src={serviceImage} alt="Service Illustration" style={{ width: '100px', marginRight: '20px' }} />
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>{price}</Typography>
                        </Box>
                    )}

                    {/* Giới tính bác sĩ */}
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>Giới tính bác sĩ</InputLabel>
                        <Select
                            name="doctorGender"
                            value={formData.doctorGender}
                            onChange={handleChange}
                            label="Giới tính bác sĩ"
                            error={!!errors.doctorGender}
                        >
                            <MenuItem value="Nam">Nam</MenuItem>
                            <MenuItem value="Nữ">Nữ</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        name="notes"
                        label="Ghi chú (nếu có)"
                        value={formData.notes}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBookingSubmit}
                        fullWidth
                        sx={{ marginTop: "20px" }}
                    >
                        Đặt lịch
                    </Button>
                </Box>

            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Ẩn sau 6 giây
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} // Hiển thị ở giữa màn hình
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarMessage.includes("thành công") ? "success" : "error"} // Thông báo lỗi hoặc thành công
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Suspense fallback={<CircularProgress />}>
                <Footer />
            </Suspense>
        </Box>
    );
};

export default DentalPartialDenture;
