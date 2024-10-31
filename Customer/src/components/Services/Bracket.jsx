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
import rangMacCai from "../Services/img/nieng-rang/nieng-rang-mac-cai.jpg";
import r1 from "../Services/img/nieng-rang/nieng-rnag-mac-cai/1.jpg";
import r2 from "../Services/img/nieng-rang/nieng-rnag-mac-cai/2.jpg";
import r3 from "../Services/img/nieng-rang/nieng-rnag-mac-cai/3.jpg";
import r4 from "../Services/img/nieng-rang/nieng-rnag-mac-cai/4.jpg";
import r5 from "../Services/img/nieng-rang/nieng-rnag-mac-cai/5.jpg";

const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));

const images = [
    { id: 1, src: rangMacCai },
    { id: 2, src: r1 },
    { id: 3, src: r2 },
    { id: 4, src: r3 },
    { id: 5, src: r4 },
    { id: 6, src: r5 },
];

const Bracket = () => {
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
            case "Niềng răng mắc cài kim loại mặt ngoài":
                setPrice("32.000.000 - 44.000.000 VND");
                setServiceImage(r2);
                break;
            case "Niềng răng mắc cài kim loại mặt trong":
                setPrice("52,000,000 - 85.000.000 VND");
                setServiceImage(r4);
                break;
            case "Niềng răng mắc cài sứ":
                setPrice("50.000.000 - 65.000.000 VND");
                setServiceImage(r3);
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
                            Niềng răng mắc cài
                        </Typography>
                        <Typography>
                            Niềng răng mắc cài là phương pháp chỉnh nha cổ điển được ứng dụng phổ biến giúp khắc phục các khuyết điểm về răng, lấy lại nụ cười khỏe đẹp, ăn nhai dễ dàng.
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
                                            <TableCell>Niềng răng mắc cài</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Thời gian niềng:</TableCell>
                                            <TableCell>1 - 2 năm</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Phương pháp:</TableCell>
                                            <TableCell>Chỉnh nha bằng mắc cài kim loại | mắc cài sứ </TableCell>

                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        )}

                        {/* Tab Panel: Bài viết đánh giá */}
                        {tabIndex === 1 && (
                            <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginTop: "10px" }}>
                                <Typography variant="h6" color="orange">Bài viết đánh giá về ưu, nhược điểm của từng dòng mắc cài phổ biến hiện nay</Typography>
                                { /*kim loại mặt ngoài*/}
                                <Box>
                                    <Typography variant="h6" >1. Niềng răng mắc cài kim loại mặt ngoài</Typography>
                                    <Box marginLeft={"10px"}>
                                        <Typography color="blue"> *** Ưu điểm *** </Typography>
                                        <Typography >
                                            - Chi phí rẻ nhất trong các loại mắc cài. Mắc cài làm bằng vàng có chi phí cao hơn <br />
                                            - Không đòi hỏi sử dụng công nghệ cao trong hỗ trợ điều trị <br />
                                            - Thời gian điều trị ngắn do lực kéo mạnh <br />
                                            - Cấu trúc dây thun có thể mang nhiều màu sắc, thích hợp sử dụng cho trẻ em <br />
                                            <br></br>
                                        </Typography>
                                    </Box>
                                    <Box marginLeft={"10px"}>
                                        <Typography color="blue"> *** Nhược điểm *** </Typography>
                                        <Typography >
                                            - Kém thẩm mỹ vì các mắc cài sẽ lộ rõ khi giao tiếp<br />
                                            - Các vấn đề dễ xảy ra như mắc cài bị bung tuột<br />
                                            - Chất liệu của kim loại có thể gây kích ứng nướu, có hại cho cơ thể đối với một số người nhạy cảm. <br />
                                            - Gây tổn thương các mô mềm trong khoang miệng (cắn môi, cắn má,...)<br />
                                            - Cần kiêng kỵ nhiều loại đồ ăn cứng, dai, dính khi đang trong thời gian niềng răng

                                        </Typography>
                                    </Box>
                                </Box>
                                { /*kim loại mặt trong*/}
                                <Box marginTop={"10px"}>

                                    <Typography variant="h6" >2. Niềng răng mắc cài kim loại mặt trong (Mắc cài mặt lưỡi)</Typography>
                                    <Box marginLeft={"10px"}>
                                        <Typography color="blue"> *** Ưu điểm *** </Typography>
                                        <Typography >
                                            Tính thẩm mỹ cao nhất trong tất cả các loại mắc cài niềng răng do mắc cài được gắn vào mặt trong của răng,
                                            phù hợp với bệnh nhân thường xuyên phải giao tiếp.
                                            <br></br>
                                            <br />
                                        </Typography>
                                    </Box>
                                    <Box marginLeft={"10px"}>
                                        <Typography color="blue"> *** Nhược điểm *** </Typography>
                                        <Typography >
                                            - Chi phí cao hơn nhiều so với các loại mắc cài niềng răng khác <br />
                                            - Vệ sinh răng miệng, ăn uống khó khăn hơn<br />
                                            - Đòi hỏi bác sĩ phải có tay nghề cao thì mới thực hiện đạt hiệu quả cao<br />
                                            - Thời gian niềng răng sẽ kéo dài hơn

                                        </Typography>
                                    </Box>
                                </Box>
                                { /*sứ*/}
                                <Box marginTop={"10px"}>

                                    <Typography variant="h6" >3. Niềng răng mắc cài sứ</Typography>
                                    <Box marginLeft={"10px"}>
                                        <Typography color="blue"> *** Ưu điểm *** </Typography>
                                        <Typography >
                                            - Có tính thẩm mỹ cao do mắc cài có màu sắc tương đồng như màu răng thật, khi giao tiếp khó bị phát hiện<br />
                                            - Chất liệu sứ, pha lê thân thiện với sức khỏe con người<br />
                                            - Dây thun có độ đàn hồi cao cho kết quả chỉnh nha đạt hiệu quả cao<br />
                                            - Rút ngắn thời gian niềng răng <br />
                                            <br></br>
                                        </Typography>
                                    </Box>
                                    <Box marginLeft={"10px"}>
                                        <Typography color="blue"> *** Nhược điểm *** </Typography>
                                        <Typography >
                                            - Chi phí cao hơn mắc cài kim loại <br />
                                            - Thời gian điều trị lâu hơn mắc cài kim loại<br />
                                            - Do làm bằng vật liệu sứ, pha lê nên nếu va chạm mạnh thì mắc cài có thể bị phá vỡ<br />
                                            - Chốt niềng răng lớn hơn so với các loại khác có thể gây cảm giác không thoải mái<br />
                                            - Cần vệ sinh răng miệng và mắc cài đúng cách nếu không chân đế có thể bị nhiễm màu<br />
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
                            <MenuItem value="Niềng răng mắc cài kim loại mặt ngoài">Niềng răng mắc cài kim loại mặt ngoài</MenuItem>
                            <MenuItem value="Niềng răng mắc cài kim loại mặt trong">Niềng răng mắc cài kim loại mặt trong</MenuItem>
                            <MenuItem value="Niềng răng mắc cài sứ">Niềng răng mắc cài sứ</MenuItem>
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

export default Bracket;
