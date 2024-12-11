//tay trang rang
//dieu tri nuou

import React, {useState, Suspense} from "react";
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
import {LocalizationProvider, DatePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

// Import images
import tayTrang from "../Services/img/tay_rang/tay_trang.jpg";
import r1 from "../Services/img/tay_rang/1.png";
import r2 from "../Services/img/tay_rang/2.jpg";
import r3 from "../Services/img/tay_rang/3.png";


const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));

const images = [
    {id: 1, src: tayTrang},
    {id: 2, src: r1},
    {id: 3, src: r2},
    {id: 4, src: r3},


];

const Whiten = () => {
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
            case "Tẩy trắng răng tại phòng khám":
                setPrice("3.000.000 VND/ca");
                setServiceImage(r1);
                break;
            case "Tẩy trắng răng tại nhà":
                setPrice("1.300.000 VND/ca");
                setServiceImage(r3);
                break;
            case "Tẩy trắng răng tại phòng khám và tại nhà":
                setPrice("3.500.000 VND/liệu trình");
                setServiceImage(r2);
                break;
            case "Thuốc tẩy trắng tại nhà":
                setPrice("320.000 VND/ống");
                setServiceImage(r2);
                break;
            default:
                setPrice("");
                setSelectedImage("")
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
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
        <Box sx={{display: "flex", gap: 2, minHeight: "100vh"}}>
            <Suspense fallback={<CircularProgress/>}>
                <Header/>
            </Suspense>

            <Box sx={{
                display: "flex",
                flexDirection: {xs: "column", md: "row"},
                marginLeft: {md: "50px"},
                marginTop: {md: "70px"},
                gap: "20px",
                padding: {md: "20px"},
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh"
            }}>
                {/* Left side: Image and Thumbnails */}
                <Box sx={{
                    width: {xs: "100%", md: "60%"},
                    marginBottom: {xs: "20px", md: "0"},
                    marginTop: {md: "2rem", xs: "5rem", sm: "7rem"}
                }}>
                    <Box sx={{margin: "1rem"}}>
                        <Typography sx={{
                            fontSize: {md: "25px", xs: "22px"},
                            fontWeight: "bold",
                            color: "red"
                        }}>
                            Tẩy trắng răng
                        </Typography>
                        <Typography>
                            Tẩy trắng răng là một kỹ thuật nha khoa giúp răng trắng sáng hơn so với màu răng ban đầu một
                            cách an toàn.
                        </Typography>
                    </Box>
                    {/* Main Image */}
                    <Box sx={{position: "relative", overflow: "hidden", objectFit: "fixed", borderRadius: "8px"}}>
                        <img src={selectedImage} alt="Main" style={{width: "90%", height: "450px"}}/>
                    </Box>

                    {/* Thumbnails */}
                    <Box sx={{
                        display: "flex",
                        marginTop: "10px",
                        justifyContent: {xs: "center", md: "start"},
                    }}>
                        {images.map((image) => (
                            <Box key={image.id} onClick={() => setSelectedImage(image.src)} sx={{
                                cursor: "pointer",
                                marginRight: "10px",
                                border: selectedImage === image.src ? "2px solid #007bff" : "2px solid transparent",
                                overflow: "hidden",
                                borderRadius: "4px",
                                transition: "transform 0.2s",
                                '&:hover': {transform: "scale(1.1)"}
                            }}>
                                <img src={image.src}
                                     style={{width: "70px", height: "70px", transition: "transform 0.2s"}}/>
                            </Box>
                        ))}
                    </Box>

                    {/* Tabs for Thông số kỹ thuật và Bài viết đánh giá */}
                    <Box sx={{marginTop: "20px"}}>
                        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Tabs for information">
                            <Tab label="Thông số kỹ thuật"/>
                            <Tab label="Bài viết đánh giá"/>
                        </Tabs>

                        {/* Tab Panel: Thông số kỹ thuật */}
                        {tabIndex === 0 && (
                            <Box sx={{
                                padding: "20px",
                                backgroundColor: "#f9f9f9",
                                borderRadius: "8px",
                                marginTop: "10px"
                            }}>
                                <Typography variant="h6">Thông số kỹ thuật</Typography>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Loại hình dịch vụ:</TableCell>
                                            <TableCell>Tẩy trắng răng</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Thời gian :</TableCell>
                                            <TableCell>45-60 phút
                                            </TableCell>
                                        </TableRow>


                                    </TableBody>
                                </Table>
                            </Box>
                        )}

                        {/* Tab Panel: Bài viết đánh giá */}
                        {tabIndex === 1 && (
                            <Box sx={{
                                padding: "20px",
                                backgroundColor: "#f9f9f9",
                                borderRadius: "8px",
                                marginTop: "10px"
                            }}>
                                <Typography variant="h6" color="orange">Tẩy trắng răng là gì? Tẩy trắng răng có tốt
                                    không?</Typography>
                                <Box marginLeft={"10px"}>
                                    <Typography>
                                        Tẩy trắng răng là phương pháp giúp khôi phục và cải thiện tình trạng răng ố vàng
                                        được nhiều người ưa chuộng hiện nay.
                                        Là phương pháp thẫm mỹ nha khoa đơn giản với mức giá không quá cao, đây được xem
                                        là một trong những các đơn giản để có được một hàm răng trắng đều và đẹp.
                                        <br/> <br/> </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="h6"> Khi nào nên tẩy trắng răng? </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography>
                                            - Hàm răng không đều màu.<br></br>
                                            - Răng bị xỉn màu, ố vàng kém thẩm mỹ.<br/>
                                            - Răng bị nhiễm kháng sinh ở mức độ nhẹ.<br/>
                                            - Răng nhiễm Fluor.<br/>
                                            - Người mong muốn hàm răng trắng đẹp hơn.<br/>
                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>
                                <Box>
                                    <Typography variant="h6"> Không nên tẩy trắng răng? </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography>
                                            - Phụ nữ có thai và đang cho con bú.<br/>
                                            - Người mắc các bệnh lý nghiêm trọng về răng miệng như: viêm nha chu, hở
                                            chân răng, mòn cổ răng.<br/>
                                            - Người có tiền sử dị ứng hoặc có dấu hiệu dị ứng với thuốc tẩy trắng
                                            răng.<br/>
                                            - Trẻ em dưới 16 tuổi không nên tẩy răng vì lúc này răng còn yếu nên sẽ gây
                                            ảnh hưởng lớn lên tủy.<br/>
                                            <br/>
                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>
                                <Box>
                                    <Typography variant="h6"> Quy trình tẩy trắng răng chuẩn nha khoa </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography>
                                            Bước 1: Thăm khám và chụp phim X-quang<br/>
                                            Bước 2: Đo màu răng và vệ sinh răng miệng trước khi làm <br/>
                                            Bước 3: Cách ly lợi và chống ê buốt <br/>
                                            Bước 4 : Thoa thuốc và chiếu sánh sáng để kích hoạt thuốc
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
                        maxWidth: {xs: "100%", md: "40%"},
                        marginTop: {xs: "20px", md: "0"},
                    }}
                >
                    <Typography variant="h5" sx={{fontWeight: "bold", marginBottom: "20px"}}>
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
                        <Grid container spacing={2} sx={{mb: 2}}>
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
                                    sx={{mb: 2}}
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
                            <MenuItem value="Tẩy trắng răng tại phòng khám">Tẩy trắng răng tại phòng khám</MenuItem>
                            <MenuItem value="Tẩy trắng răng tại nhà">Tẩy trắng răng tại nhà</MenuItem>
                            <MenuItem value="Tẩy trắng răng tại phòng khám và tại nhà">Tẩy trắng rang tịa phòng khám và
                                tại nhà</MenuItem>
                            <MenuItem value="Thuốc tẩy trắng tại nhà">Thuốc tẩy trắng răng tại nhà</MenuItem>
                            // Set price based on selected service

                        </Select>
                    </FormControl>

                    {/* Hiển thị hình ảnh minh họa và giá tiền */}
                    {serviceImage && (
                        <Box sx={{display: 'flex', alignItems: 'center', marginTop: 2}}>
                            <img src={serviceImage} alt="Service Illustration"
                                 style={{width: '100px', marginRight: '20px'}}/>
                            <Typography variant="h6" sx={{fontWeight: "bold"}}>{price}</Typography>
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
                        sx={{marginTop: "20px"}}
                    >
                        Đặt lịch
                    </Button>
                </Box>

            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Ẩn sau 6 giây
                onClose={handleSnackbarClose}
                anchorOrigin={{vertical: "top", horizontal: "center"}} // Hiển thị ở giữa màn hình
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarMessage.includes("thành công") ? "success" : "error"} // Thông báo lỗi hoặc thành công
                    sx={{width: "100%"}}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Suspense fallback={<CircularProgress/>}>
                <Footer/>
            </Suspense>
        </Box>
    );
};

export default Whiten;
