//dieu tri tuy


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
import tuy from "../Services/img/benh/tuy.jpg";
import r1 from "../Services/img/benh/tuy/r1.jpg";
import r2 from "../Services/img/benh/tuy/r2.jpg";
import r3 from "../Services/img/benh/tuy/r3.jpg";
import r4 from "../Services/img/benh/tuy/r4.jpg";


const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));

const images = [
    { id: 1, src: tuy },
    { id: 2, src: r1 },
    { id: 3, src: r2 },
    { id: 4, src: r3 },
    { id: 5, src: r4 },

];

const Pulp = () => {
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
            case "Điều trị tủy răng":
                setPrice("500.000 - 2.000.000 VND/răng");
                setServiceImage(r1);
                break;
            case "Điều trị tủy răng lại":
                setPrice("2.000.000 - 3.000.000 VND/răng");
                setServiceImage(r3);
                break;
            case "Chốt sợi không kim loại mức 1-2":
                setPrice("700.000 - 1.100.000 VND/răng");
                setServiceImage(r4);
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
                            Điều trị viêm tủy
                        </Typography>
                        <Typography>
                            Điều trị ống tủy răng (nội nha) là một tiến trình y khoa nhằm điều trị tình trạng viêm nhiễm tại phần trung tâm của răng.
                            Hình thức chữa trị này sẽ không gây ra quá nhiều đau đớn và có thể giúp bệnh nhân giữ lại răng mà không cần phải thay thế chúng bằng răng giả.
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
                                            <TableCell>Loại hình dịch vụ:</TableCell>
                                            <TableCell>Điều trị tủy răng</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Thời gian :</TableCell>
                                            <TableCell>Thời gian điều trị tủy thường kéo dài từ 1 đến 3 buổi, tùy thuộc vào mức độ nghiêm trọng và vị trí của răng cần điều trị.
                                                Thông thường, mỗi buổi điều trị sẽ kéo dài khoảng 30 phút đến 1 giờ.
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Quy trình điều trị tủy răng :</TableCell>
                                            <TableCell>- Thăm khám và chuẩn đoán
                                                <br />
                                                - Gây tê
                                                <br />
                                                - Mở tủy
                                                <br />
                                                - Làm sạch và tạo hình ống tủy
                                                <br />
                                                - Trám bít ống tủy
                                                <br />
                                                - Phục hình răng
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </Box>
                        )}

                        {/* Tab Panel: Bài viết đánh giá */}
                        {tabIndex === 1 && (
                            <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginTop: "10px" }}>
                                <Typography variant="h6" color="orange">Viêm tủy răng: dấu hiệu, nguyên nhân, quy trình điều trị</Typography>
                                <Box marginLeft={"10px"}>
                                    <Typography>
                                        Điều trị tủy răng răng càng sớm càng tốt là khuyến cáo chung của các chuyên gia nha khoa dành cho tất cả mọi người khi có tủy răng bị viêm nhiễm, tổn thương. Bởi, tủy răng được ví như trái tim của răng, giúp nuôi dưỡng răng khỏe mạnh.
                                        Một khi tủy răng bị tổn thương, chắc chắn sẽ làm tăng nguy cơ các bệnh lý về răng miệng như: viêm tủy răng, hoại tử tủy, gây đau buốt, áp xe quanh chóp, tiêu xương răng…
                                        <br /> <br /> </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="h6" > Dấu hiệu viêm tủy: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Đau răng: Đau nhức có thể kéo dài, âm ỉ hoặc dữ dội, thường cảm thấy khi nhai hoặc khi răng tiếp xúc với thức ăn nóng, lạnh.<br />

                                            - Nhạy cảm: Răng có thể nhạy cảm với nhiệt độ hoặc áp lực, và cảm giác này có thể kéo dài sau khi kích thích.<br />

                                            - Sưng và viêm: Khu vực xung quanh răng có thể bị sưng hoặc viêm, có thể nhìn thấy hoặc cảm nhận được.<br />

                                            - Chảy mủ: Có thể có sự xuất hiện của mủ từ nướu hoặc răng.<br />

                                            - Thay đổi màu sắc: Răng có thể chuyển sang màu tối hoặc xỉn màu hơn bình thường.<br />

                                            - Khó chịu: Cảm giác khó chịu hoặc đau nhức có thể lan tỏa đến khu vực hàm, đầu hoặc tai.<br />
                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>
                                <Box>
                                    <Typography variant="h6" > Nguyên nhân gây bệnh: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Sâu răng nặng: Khi sâu răng tiến triển sâu vào trong răng, vi khuẩn sẽ xâm nhập vào buồng tủy và gây viêm nhiễm.<br />

                                            - Nứt hoặc gãy răng: Răng bị nứt hoặc gãy tạo cơ hội cho vi khuẩn xâm nhập vào bên trong và gây viêm tủy.<br />

                                            - Tác động mạnh: Chấn thương, va đập mạnh có thể làm tổn thương tủy răng, ngay cả khi không có dấu hiệu gãy hoặc nứt bên ngoài.<br />

                                            - Mòn răng: Mòn răng do nhai cắn hoặc do các yếu tố như nghiến răng có thể làm lộ tủy, gây viêm tủy.<br />

                                            - Can thiệp nha khoa không đúng cách: Một số thủ thuật nha khoa như trám răng, chỉnh nha hoặc điều trị sâu răng có thể gây kích ứng hoặc làm tổn thương tủy răng nếu không được thực hiện cẩn thận.<br />

                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>

                                <Box>
                                    <Typography variant="h6" >Quy trình điều trị viêm tủy: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            1. Thăm khám và chẩn đoán: Bác sĩ sẽ kiểm tra và chụp X-quang để xác định mức độ viêm nhiễm của tủy răng.<br/>

                                            2. Gây tê: Nếu răng còn nhạy cảm, bác sĩ sẽ gây tê để giảm đau trong quá trình điều trị.<br/>

                                            3. Mở tủy: Bác sĩ sẽ khoan qua răng để tiếp cận vào buồng tủy.<br/>

                                            4. Làm sạch và tạo hình ống tủy: Loại bỏ mô tủy nhiễm trùng và làm sạch các ống tủy bằng các dụng cụ chuyên dụng, sau đó tạo hình lại ống tủy để dễ dàng trám bít.<br/>

                                            5. Trám bít ống tủy: Sau khi làm sạch, các ống tủy được trám bít bằng vật liệu chuyên dụng (như Gutta-percha) để ngăn vi khuẩn xâm nhập.<br/>

                                            6. Phục hồi răng: Răng có thể được trám hoặc bọc mão sứ tùy vào mức độ hư tổn, giúp bảo vệ và khôi phục chức năng của răng.<br /><br />
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
                            <MenuItem value="Điều trị tủy răng">Điều trị tủy răng</MenuItem>
                            <MenuItem value="Điều trị tủy răng lại">Điều trị tủy răng lại</MenuItem>
                            <MenuItem value="Chốt sợi không kim loại mức 1-2">Chốt sợi không kim loại mức 1-2</MenuItem>
                               // Set price based on selected service

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

export default Pulp;
