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
import thaoLap from "../Services/img/nieng-rang/thao-lap.jpg";
import r1 from "../Services/img/nieng-rang/thao-lap/r1.jpg";
import r2 from "../Services/img/nieng-rang/thao-lap/r2.jpg";
import r3 from "../Services/img/nieng-rang/thao-lap/r3.jpg";
import r4 from "../Services/img/nieng-rang/thao-lap/r4.jpg";
import r5 from "../Services/img/nieng-rang/thao-lap/r5.jpg";

const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));

const images = [
    { id: 1, src: thaoLap },
    { id: 2, src: r1 },
    { id: 3, src: r2 },
    { id: 4, src: r3 },
    { id: 5, src: r4 },
    { id: 6, src: r5 },
];

const RemovableBraces = () => {
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
            case "Niềng răng tháo lắp kim loại":
                setPrice("32.000.000 - 44.000.000 VND");
                setServiceImage(r2);
                break;
            case "Niềng răng Invisalign":
                setPrice("75,000,000 - 135.000.000 VND");
                setServiceImage(r5);
                break;
            case "Niềng răng tháo lắp 3D clear":
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
                            Niềng răng tháo lắp
                        </Typography>
                        <Typography>
                            Niềng răng tháo lắp là phương pháp mà bạn có thể tự tháo ra/lắp vào các khí cụ chỉnh nha trong quá trình niềng răng. Phương pháp này còn được gọi là niềng răng không mắc cài vì sử dụng những khay niềng trong suốt dễ dàng đeo, tháo để nắn chỉnh các tình trạng sai lệch răng như hô, móm, lệch lạc, răng thưa,…
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
                                            <TableCell>Niềng răng tháo lắp</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Thời gian niềng:</TableCell>
                                            <TableCell>1 - 2 năm</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Phương pháp:</TableCell>
                                            <TableCell>Chỉnh nha bằng phương pháp niềng răng tháo lắp</TableCell>

                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        )}

                        {/* Tab Panel: Bài viết đánh giá */}
                        {tabIndex === 1 && (
                            <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginTop: "10px" }}>
                                <Typography variant="h6" color="orange">Niềng răng tháo lắp</Typography>
                                { /*kim loại mặt ngoài*/}
                                <Box>
                                    <Typography variant="h6" >Các đặc điểm nổi bật của niềng răng tháo lắp</Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Không sử dụng các khí cụ niềng răng như mắc cài, dây cung hoặc dây thun mà sử dụng khay nhựa trong suốt được chế tác sao ra từ khung hàm của chính bệnh nhân;<br />
                                            - Quy trình đeo niềng đơn giản, bệnh nhân chỉ cần nhận khay niềng và đeo khay theo đúng chỉ dẫn của bác sĩ;<br />
                                            - Thời gian thăm khám, theo dõi tình trạng răng khá rộng, khoảng 2 - 3 tháng mới cần tái khám 1 lần;<br />
                                            - Người bệnh sẽ thấy rõ kết quả niềng răng dựa trên sự so sánh khay niềng đầu tiên với khay niềng cuối cùng;<br />
                                            - Đeo hàm chỉnh nha tháo lắp giữ được độ thẩm mỹ tối đa. Người đối diện gần như không thể nhận ra các khay niềng vì chúng hoàn toàn trong suốt.
                                            <br></br>
                                        </Typography>
                                    </Box>
                                </Box>
                                { /*kim loại mặt trong*/}
                                <Box marginTop={"10px"}>

                                    <Typography variant="h6" >Quy trình thực hiện niềng răng tháo lắp</Typography>

                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Bệnh nhân thăm khám với bác sĩ, thống nhất về phương pháp niềng răng cụ thể;<br />
                                            - Bác sĩ lấy dấu mẫu hàm để chế tạo khay niềng trong suốt cho từng người bệnh;<br />
                                            - Sau khi chế tạo xong khay niềng, người bệnh được hướng dẫn cụ thể về cách sử dụng, vệ sinh răng miệng trong quá trình niềng răng.
                                            Tương tự, với niềng răng tháo lắp ở trẻ em thì trẻ cũng được phát khí cụ chỉnh nha để sử dụng tại nhà;<br />
                                            - Định kỳ tái khám theo lịch hẹn của bác sĩ để có sự điều chỉnh phù hợp.<br /><br />

                                        </Typography>
                                    </Box>
                                </Box>
                                { /*sứ*/}
                                <Box marginTop={"10px"}>

                                    <Typography variant="h6" >Lưu ý khi niềng răng tháo lắp</Typography>
                                    <Box marginLeft={"10px"}>
                                        <Typography color="blue"> *** Ưu điểm *** </Typography>
                                        <Typography >
                                            -Tuân thủ thời gian đeo khay niềng: Bệnh nhân cần tuân thủ thời gian đeo khay niềng một cách khắt khe để mang lại hiệu quả tốt như dự đoán ban đầu.
                                            Mỗi ngày bạn nên đeo khay niềng 24/24h hoặc tối thiểu là 22/24h. Đồng thời, bạn cũng cần định kỳ thay khay niềng theo chỉ định của bác sĩ;<br />
                                            - Vệ sinh khay niềng: Bệnh nhân nên vệ sinh khay niềng sạch sẽ sau mỗi ngày ăn uống.
                                            Việc này giúp làm giảm các nguy cơ mắc bệnh lý răng miệng trong quá trình niềng răng;<br />
                                            - Không ngâm rửa khay niềng với nước nóng: Khay niềng được làm từ nhựa.
                                            Dù có là nhựa tốt thì cũng vẫn sẽ bị biến dạng khi ngâm vào nước nóng. Do đó, bạn cần tuyệt đối lưu ý không được để khay niềng tiếp xúc với nước nóng/nước sôi;<br />
                                            - Khi đeo khay niềng không cắn đồ cứng: Vì được làm từ nhựa nên khay niềng có thể bị nứt, móp, vỡ nếu bạn cắn vật dụng hay thức ăn quá cứng.
                                            Chính vì vậy, khi sử dụng khay niềng trong suốt thì bạn nên ăn các loại thức ăn mềm, cắt nhỏ thức ăn;<br />
                                            - Vệ sinh răng miệng kỹ càng: Mỗi ngày bạn nên đánh răng ít nhất 2 lần bằng bàn chải lông mềm, đặc biệt là sau khi ăn để loại bỏ các mảng bám gây hại,
                                            đảm bảo sức khỏe răng miệng. Bạn cũng nên duy trì thói quen sử dụng chỉ nha khoa, thay vì tăm xỉa răng để loại bỏ vi khuẩn và mảng bám trên răng hiệu quả mà
                                            không gây ảnh hưởng tới nướu răng hay làm thưa kẽ răng.<br />
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
                            <MenuItem value="Niềng răng tháo lắp kim loại">Niềng răng tháo lắp kim loại</MenuItem>
                            <MenuItem value="Niềng răng Invisalign">Niềng răng Invisalign</MenuItem>
                            <MenuItem value="Niềng răng tháo lắp 3D clear">Niềng răng tháo lắp 3D clear</MenuItem>
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

export default RemovableBraces;
