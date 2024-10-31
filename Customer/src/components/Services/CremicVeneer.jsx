//dan su Veneer//tram rang
//cao voi rang
//tay trang rang
//dieu tri nuou

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
import veneer from "../Services/img/dan-su/dan-su-venner.jpg";
import r1 from "../Services/img/dan-su/1.jpg";
import r2 from "../Services/img/dan-su/2.jpg";
import r3 from "../Services/img/dan-su/3.jpg";




const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));

const images = [
    { id: 1, src: veneer },
    { id: 2, src: r1 },
    { id: 3, src: r2 },
    { id: 4, src: r3 },


];

const CremicVeneer = () => {
    const [selectedImage, setSelectedImage] = useState(images[0].src);
    const [tabIndex, setTabIndex] = useState(0); // Tab state
    const [service, setService] = useState(""); // State for selected service
    const [price, setPrice] = useState(""); // State for price
    const [serviceImage, setServiceImage] = useState("");
    const [error, setError] = useState(""); // Error state for validation
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [warrantyPeriod, setWarrantyPeriod] = useState("");
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

        // Set price, image, and warranty period based on selected service
        switch (selectedService) {
            case "Veneer Emax CAD (Ivoclar – Đức)":
                setPrice("6.000.000 VND/răng");
                setServiceImage(r1);
                setWarrantyPeriod("5 năm");
                break;
            case "Veneer Emax Press (Ivoclar – Đức)":
                setPrice("6.400.000 VND/răng");
                setServiceImage(r2);
                setWarrantyPeriod("5 năm");
                break;
            case "Veneer Lisi Press (GC – Mỹ)":
                setPrice("10.000.000 VND/răng");
                setServiceImage(r3);
                setWarrantyPeriod("5 năm");
                break;
            case "Veneer Lisi Press Ultra Thin (GC – Mỹ)":
                setPrice("9.600.000 VND/răng");
                setServiceImage(veneer);
                setWarrantyPeriod("5 năm");
                break;
            default:
                setPrice("");
                setServiceImage("");
                setWarrantyPeriod("");
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
                            Dán sứ Veneer
                        </Typography>
                        <Typography>
                            Dán sứ Veneer được ví như một cách thay áo mới cho răng, giúp bạn tự tin với nụ cười trắng sáng, đảm bảo chức năng ăn nhai và hạn chế xâm lấn mô răng thật.
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
                                            <TableCell>Dán sứ veneer</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Chất liệu:</TableCell>
                                            <TableCell>Sứ cao cấp (Ceramic hoặc Porcelain)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Độ dày của veneer:</TableCell>
                                            <TableCell>Từ 0.2mm đến 0.5mm</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Độ bền:</TableCell>
                                            <TableCell>Từ 10 - 15 năm, tuỳ thuộc vào quá trình chăm sóc</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Thời gian điều trị:</TableCell>
                                            <TableCell>2 - 3 buổi điều trị, mỗi buổi khoảng 60 phút</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Quy trình dán sứ:</TableCell>
                                            <TableCell>
                                                Chụp ảnh, tư vấn - thiết kế 3D - làm veneer - dán veneer lên răng đã mài - kiểm tra lại
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </Box>
                        )}

                        {/* Tab Panel: Bài viết đánh giá */}
                        {tabIndex === 1 && (
                            <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginTop: "10px" }}>
                                <Typography variant="h6" color="orange">DÁN SỨ VENEER LÀ GÌ? CÓ TỐT KHÔNG?</Typography>
                                <Box marginLeft={"10px"}>
                                    <Typography>
                                        Công nghệ dán sứ Veneer hay còn gọi là mặt dán sứ Veneer, là một phương pháp sử dụng mặt dán làm bằng lớp sứ mỏng khoảng từ 0.2 mm - 0.5 mm.
                                        Mặt dán sứ này sẽ được dán cố định vào bên ngoài bề mặt răng cần được phục hình bằng keo dán răng sứ chuyên dụng sao cho ôm vừa khít toàn thân răng một cách tự nhiên nhất.
                                        <br /> <br /> </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="h6" > ƯU ĐIỂM NỔI BẬT CỦA DÁN RĂNG SỨ VENEER</Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Tính thẩm mỹ cao: Màu sắc tự nhiên như răng thật và không đổi màu theo thời gian<br />
                                            - Cho phép thiết kế nụ cười mới rạng rỡ theo ý bạn:  Giúp khắc phục các nhược điểm hiện tại của răng tự nhiên<br />
                                            - Tương hợp sinh học với mô nướu: Không gây biến chứng trong suốt quá trình sử dụng<br />
                                            - Độ bền cao: hời gian sử dụng từ 15 - 20 năm và có thể sử dụng vĩnh viễn nếu chăm sóc và vệ sinh đúng cách<br />
                                            - Bảo tồn răng: KHÔNG mài răng hay chỉ mài cực mỏng ( 0.2 - 0.5 mm ). Nha khoa I-DENT luôn ưu tiên phương án bảo tồn răng thật của bạn tối đa có thể mà vẫn đem đến hiệu quả với nụ cười mới mà bạn mong muốn<br />
                                            - Bảo vệ tủy răng, không đau: Men răng của bạn KHÔNG bị mài hay tỉ lệ mài rất ít, không gây ảnh hưởng đến cấu trúc răng, không lấn sâu vào mô răng nên tuyệt đối sẽ không xảy ra tình trạng ảnh hưởng đến tủy răng, gây chết tủy.<br />
                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>

                                <Box>
                                    <Typography variant="h6" > NHỮNG TRƯỜNG HỢP NÊN DÁN SỨ VENEER </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Răng mọc thưa, ở giữa các răng có khe hở nhỏ làm mất thẩm mỹ<br />
                                            - Răng bị mẻ, nứt hoặc răng bị bào mòn theo thời gian, chân răng ngắn<br />
                                            - Răng bị lệch lạc nhẹ, kích thước của các răng không đều nhau<br />
                                            - Răng hô, móm, vẩu ở mức độ nhẹ<br />
                                            - Răng bị xỉn màu, nhiễm kháng sinh tetracylin, ngả vàng, không thể tẩy trắng được<br />

                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>

                                <Box>
                                    <Typography variant="h6" > QUY TRÌNH DÁN RĂNG SỨ VENEER </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            Bước 1: Thăm khám và chụp phim X-Quang<br />
                                            Bước 2: Lên kế hoạch điều trị<br />
                                            Bước 3: Tiến hành gây tê và tạo hình cùi răng<br />
                                            Bước 4: Lấy dấu răng gửi về phòng Labo tại nha khoa<br />
                                            Bước 5: Gắn răng sứ Vener cố định
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
                           
                            <MenuItem value="Veneer Emax CAD (Ivoclar – Đức)">Veneer Emax CAD (Ivoclar – Đức)</MenuItem>
                            <MenuItem value="Veneer Emax Press (Ivoclar – Đức)">Veneer Emax Press (Ivoclar – Đức)</MenuItem>
                            <MenuItem value="Veneer Lisi Press (GC – Mỹ)">Veneer Lisi Press (GC – Mỹ)</MenuItem>
                            <MenuItem value="Veneer Lisi Press Ultra Thin (GC – Mỹ)">Veneer Lisi Press Ultra Thin (GC – Mỹ)</MenuItem>
                        </Select>

                    </FormControl>

                    {/* Hiển thị hình ảnh minh họa và giá tiền */}
                    {serviceImage && (
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                            <img src={serviceImage} alt="Service Illustration" style={{ width: '100px', marginRight: '20px' }} />
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{price}</Typography>
                                <Typography variant="body1">Thời gian bảo hành: {warrantyPeriod}</Typography>
                            </Box>
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

export default CremicVeneer;
