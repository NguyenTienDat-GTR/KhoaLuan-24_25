//nha chu
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
import nhachu from "../Services/img/benh/nha-chu/slide.jpg";
import r1 from "../Services/img/benh/nha-chu/r1.jpg";
import r2 from "../Services/img/benh/nha-chu/r2.jpg";
import r3 from "../Services/img/benh/nha-chu/r3.jpg";
import r4 from "../Services/img/benh/nha-chu.jpg";


const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));

const images = [
    { id: 1, src: nhachu },
    { id: 2, src: r1 },
    { id: 3, src: r2 },
    { id: 4, src: r3 },
    { id: 5, src: r4 },

];

const Periodontitis = () => {
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
            case "Điều trị nha chu 1R":
                setPrice("1.000.000 VND/răng");
                setServiceImage(r1);
                break;
            case "Điều trị nha chu 1 cụm":
                setPrice("2.000.000 VND/cụm");
                setServiceImage(r2);
                break;
            case "Điều trị nha chu 1 hàm":
                setPrice("6.000.000 VND/hàm");
                setServiceImage(r4);
                break;
            case "Điều trị nha chu 2 hàm":
                setPrice("10.000.000 VND/2 hàm");
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
                            Điều trị bệnh nha chu
                        </Typography>
                        <Typography>
                            Bệnh nha chu (Periodontitis) là một bệnh nhiễm trùng nướu nghiêm trọng làm tổn thương mô mềm và phá hủy xương xung quanh răng.
                            Viêm nha chu có thể khiến răng bị lỏng hoặc dẫn đến mất răng.
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
                                            <TableCell>Điều trị bệnh nha chu</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Thời gian :</TableCell>
                                            <TableCell>- Từ 2 - 4 tuần đối với trường hợp nhẹ
                                                <br />
                                                - Trong trường nặng hơn,
                                                thời gian điều trị có thể kéo dài đến vài tháng và
                                                đòi hỏi tái khám định kỳ để theo dõi và ngăn ngừa bệnh tái phát.
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Phương pháp :</TableCell>
                                            <TableCell>- Làm sạch sâu
                                                <br />
                                                - Điều trị bằng thuốc
                                                <br />
                                                - Phẩu thuật nướu
                                                <br />
                                                - Ghép xương
                                                <br />
                                                - Thay đổi thói quen răng miệng
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </Box>
                        )}

                        {/* Tab Panel: Bài viết đánh giá */}
                        {tabIndex === 1 && (
                            <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginTop: "10px" }}>
                                <Typography variant="h6" color="orange">Bệnh nha chu và phương pháp điều trị</Typography>
                                <Box marginLeft={"10px"}>
                                    <Typography>
                                        Bệnh nha chu là một bệnh rất phổ biến của vùng răng miệng, hay gặp ở lứa tuổi trung niên,
                                        người già và là một trong những nguyên nhân thường gặp của tình trạng mất răng ở người lớn.
                                        Bệnh diễn tiến thầm lặng nên rất dễ bị bỏ qua, thường được phát hiện rất trễ khi bệnh đã nặng   <br /> <br /> </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="h6" > Nguyên nhân gây bệnh: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            Sự phát triển của vi khuẩn trong mảng bám răng là nguyên nhân chính của bệnh.
                                            Nếu không đánh răng, vệ sinh răng miệng tốt, mảng bám răng sẽ tích tụ và dần dần khoáng hóa trở thành cao răng với lượng vi khuẩn ngày càng tăng.
                                            Các độc tố do vi khuẩn tạo nên sẽ gây viêm lợi,
                                            phá hủy mô nâng đỡ răng khiến lợi dần dần không bám chắc chắn vào bề mặt chân răng. <br />
                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>
                                <Box>
                                    <Typography variant="h6" > Các yếu tố & nguy cơ gây bệnh: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Chế độ dinh dưỡng và vệ sinh răng miệng không tốt. <br />
                                            - Giảm sức đề kháng cơ thể, phụ nữ có thai. <br />
                                            - Hút thuốc lá. <br />
                                            - Các bệnh toàn thân như tiểu đường, HIV/AIDS, nhiễm trùng nhiễm độc… <br />
                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>
                                <Box>
                                    <Typography variant="h6" > Các triệu chứng của bệnh: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Chảy máu khi chải răng <br />
                                            - Lợi sưng đỏ, dễ chảy máu <br />
                                            - Mảng bám răng và cao răng bám trên bề mặt răng, nhất là vùng cổ răng. <br />
                                            - Hơi thở hôi <br />
                                            - Ấn vào túi lợi có thể thấy dịch hoặc mủ chảy ra <br />
                                            - Răng lung lay, di lệch, cảm giác đau khó nhai. <br />
                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>

                                <Box>
                                    <Typography variant="h6" >Phương pháp điều trị: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            1. Làm sạch sâu (Scaling & Root Planing): Đây là bước cơ bản và quan trọng để loại bỏ mảng bám và cao răng dưới nướu.
                                            Quá trình này giúp làm sạch các túi nha chu và bề mặt chân răng, ngăn vi khuẩn phát triển thêm.<br />

                                            2. Điều trị bằng thuốc: Đôi khi, bác sĩ sẽ kê đơn thuốc kháng sinh hoặc kháng viêm để kiểm soát nhiễm trùng và giảm viêm. Thuốc có thể được bôi trực tiếp vào túi nha chu hoặc uống theo chỉ định.<br />

                                            3. Phẫu thuật nướu (Gum Surgery): Đối với các trường hợp nghiêm trọng, phẫu thuật có thể cần thiết để làm sạch túi nha chu sâu và tái tạo mô nướu. Các phương pháp phẫu thuật thường bao gồm:<br />
                                            - Phẫu thuật giảm túi: Cắt bỏ và khâu nướu để giảm độ sâu của túi nha chu. <br />
                                            - Ghép nướu: Sử dụng mô nướu từ vùng khác để tái tạo và che phủ vùng chân răng bị lộ.<br />
                                            4. Ghép xương: Nếu mất xương do bệnh nha chu, có thể cần ghép xương để tái tạo cấu trúc xương hỗ trợ răng.<br />

                                            5.Thay đổi thói quen vệ sinh răng miệng: Bác sĩ sẽ hướng dẫn bệnh nhân cách chải răng đúng cách và sử dụng chỉ nha khoa để duy trì hiệu quả điều trị và ngăn ngừa tái phát.<br /><br />
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
                            <MenuItem value="Điều trị nha chu 1R">Điều trị nha chu 1R</MenuItem>
                            <MenuItem value="Điều trị nha chu 1 cụm">Điều trị nha chu 1 cụm</MenuItem>
                            <MenuItem value="Điều trị nha chu 1 hàm">Điều trị nha chu 1 hàm</MenuItem>
                            <MenuItem value="Điều trị nha chu 2 hàm">Điều trị nha chu 2 hàm</MenuItem>
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

export default Periodontitis;
