//sâu răng


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
import saurang from "../Services/img/benh/sau-rang.jpg";
import r1 from "../Services/img/benh/sau-rang/r1.jpg";
import r2 from "../Services/img/benh/sau-rang/r2.jpg";
import r3 from "../Services/img/benh/sau-rang/r3.jpg";
import r4 from "../Services/img/benh/sau-rang/r4.jpg";
import r5 from "../Services/img/benh/sau-rang/r5.jpg";
import r6 from "../Services/img/benh/sau-rang/r6.jpg";


const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));

const images = [
    { id: 1, src: saurang },
    { id: 2, src: r1 },
    { id: 3, src: r2 },
    { id: 4, src: r3 },
    // { id: 5, src: r4 },
    // { id: 6, src: r5 },
    // { id: 7, src: r6 },


];

const ToothDecay = () => {
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
            case "Nhổ răng":
                setPrice("100.000 - 300.000 VND/răng");
                setServiceImage(r1);
                break;
            case "Nhổ răng cửa R1-2-3":
                setPrice("500.000 VNĐ/răng");
                setServiceImage(r4);
                break;
            case "Nhổ răng nhiều chân R4-5-6-7":
                setPrice("800.000 VND/răng");
                setServiceImage(r5);
                break;
            case "Tiểu phẩu răng khôn":
                setPrice("1.000.000 - 5.000.000 VND/răng");
                setServiceImage(r6);
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
                            Điều trị sâu răng
                        </Typography>
                        <Typography>
                            Sâu răng là vấn đề sức khỏe răng miệng phổ biến nhất trên thế giới.
                            Đối tượng dễ mắc sâu răng: trẻ em, thanh thiếu niên và người lớn tuổi.
                            Nếu sâu răng không được điều trị, chúng sẽ phát triển lớn hơn và ảnh hưởng đến các lớp cấu trúc răng, dẫn đến đau răng nghiêm trọng, nhiễm trùng và mất răng. </Typography>
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
                                            <TableCell>Điều trị sâu răng</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Thời gian :</TableCell>
                                            <TableCell>
                                                - Sâu răng nhẹ: 15-30 phút <br />
                                                - Sâu răng trung bình: 30-45 phút <br />
                                                - Sâu răng nặng: từ 1-3 buổi, mỗi buổi khoảng 30-60 phút <br />
                                                - Sâu răng rất nặng: có thể kéo dài nhiều buổi
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Phương pháp điều trị sâu răng :</TableCell>
                                            <TableCell>- Trám răng
                                                <br />
                                                - Điều trị tủy răng
                                                <br />
                                                - Đặt mão răng (crown)
                                                <br />
                                                - Nhổ răng
                                                <br />
                                                - Điều trị bằng fluoride

                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </Box>
                        )}

                        {/* Tab Panel: Bài viết đánh giá */}
                        {tabIndex === 1 && (
                            <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginTop: "10px" }}>
                                <Typography variant="h6" color="orange">Sâu răng: Dấu hiệu, nguyên nhân, cách điều trị và phòng ngừa</Typography>
                                <Box marginLeft={"10px"}>
                                    <Typography>
                                        Sâu răng là những vùng bị tổn thương vĩnh viễn trên bề mặt răng, phát triển thành những lỗ nhỏ li ti trên răng.
                                        Sâu răng do sự kết hợp của nhiều yếu tố, bao gồm vi khuẩn trong miệng, ăn vặt thường xuyên, nhâm nhi đồ uống có đường và vệ sinh răng miệng kém.
                                        <br /> <br /> </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="h6" > Dấu hiệu sâu răng: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Đau nhức: Cảm giác đau khi ăn uống hoặc khi răng tiếp xúc với đồ ngọt, nóng, lạnh, hoặc khi nhai. Đau có thể xuất hiện thoáng qua hoặc kéo dài.<br />

                                            - Răng nhạy cảm: Nhạy cảm với nhiệt độ hoặc đồ ngọt là dấu hiệu phổ biến, thường xuất hiện khi men răng bị tổn thương và ngà răng lộ ra.<br />

                                            - Lỗ sâu hoặc rãnh trên bề mặt răng: Có thể nhìn thấy những lỗ nhỏ hoặc rãnh màu nâu, đen trên răng, là dấu hiệu rõ ràng của sâu răng.<br />

                                            - Đổi màu răng: Răng bị sâu thường có các vết màu đen, nâu hoặc trắng đục do quá trình vi khuẩn phá hủy mô răng.<br />

                                            - Hơi thở có mùi: Hơi thở có mùi hôi dù vệ sinh răng miệng đều đặn có thể là dấu hiệu của sâu răng hoặc nhiễm trùng.<br />

                                            - Sưng nướu hoặc mặt: Khi sâu răng tiến triển và ảnh hưởng đến tủy răng, có thể gây sưng nướu hoặc mặt ở khu vực bị ảnh hưởng.<br />
                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>
                                <Box>
                                    <Typography variant="h6" > Nguyên nhân gây bệnh: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Các dạng mảng bám <br/>
                                            - Các axit trong mảng bám <br/>
                                            - Vi khuẩn và axit tấn công tủy răng <br/>    <br></br>
                                        </Typography>
                                    </Box>

                                </Box>
                                <Box>
                                    <Typography variant="h6" > Các yếu tố nguy cơ gây bệnh: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Men răng <br/>
                                            - HÌnh thể răng <br/>
                                            - Vị trí răng <br/> 
                                            - Nước bọt<br/>
                                            - Chế độ ăn<br/>   
                                            - Chải răng không đúng cách<br/>
                                            - Không nhận đủ florua<br/>
                                            - Trẻ nhỏ hoặc người lớn tuổi<br/>
                                            - Vết trám lâu ngày<br/>
                                            - Ợ nóng<br/>
                                            - Rối loại ăn uống
                                            <br/><br/>
                                        </Typography>
                                    </Box>

                                </Box>
                                <Box>
                                    <Typography variant="h6" >Cách phòng ngừa sâu răng: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Đánh răng thường xuyên <br/>
                                            - Dùng nước súc miệng <br/>
                                            - Thăm khám nha khoa thường xuyên <br/>
                                            - Trám bít hỗ rãnh <br/>
                                            - Uống một ít nước máy <br/>
                                            - Tránh ăn vặt và nhấm nháp thường xuyên <br/>
                                            - Ăn thức ăn có lợi cho răng <br/>
                                            - Điều trị kháng khuẩn <br/>
                                            - Phương pháp điều trị kết hợp
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
                            <MenuItem value="Nhổ răng">Nhổ răng</MenuItem>
                            <MenuItem value="Nhổ răng cửa R1-2-3">Nhổ răng cửa R1-2-3</MenuItem>
                            <MenuItem value="Nhổ răng nhiều chân R4-5-6-7">Nhổ răng nhiều chân R4-5-6-7</MenuItem>
                            <MenuItem value="Tiểu phẩu răng khôn">Tiểu phẩu răng khôn</MenuItem>
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

export default ToothDecay;
