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
import implant from "../Services/img/phuc-hinh/cay-ghep-implant.jpg";

import r2 from "../Services/img/phuc-hinh/Implant/2.jpg";
import r3 from "../Services/img/phuc-hinh/Implant/3.jpg";
import r4 from "../Services/img/phuc-hinh/Implant/4.jpg";
import r5 from "../Services/img/phuc-hinh/Implant/5.jpg";
import biotem from "../Services/img/phuc-hinh/Implant/biotem.jpg";
import dio from "../Services/img/phuc-hinh/Implant/dio.jpg";
import me from "../Services/img/phuc-hinh/Implant/me.jpg";

const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));

const images = [
    { id: 1, src: implant },

    { id: 3, src: r2 },
    { id: 4, src: r3 },
    { id: 5, src: r4 },
    { id: 6, src: r5 },
];

const Implant = () => {
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
            case "Trụ implant Biotem-HQ":
                setPrice("21.000.000 VND/trụ");
                setServiceImage(biotem);
                setWarrantyPeriod("10 năm");
                break;
            case "Trụ implant Dio-HQ":
                setPrice("21.000.000 VND/trụ");
                setServiceImage(dio);
                setWarrantyPeriod("10 năm");
                break;
            case "Trụ implant Megagen Anyridge-HQ":
                setPrice("30.000.000 VND/trụ");
                setServiceImage(me);
                setWarrantyPeriod("10 năm");
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
                            Cấy ghép Implant
                        </Typography>
                        <Typography>
                            Cấy ghép Implant là kỹ thuật trồng răng giả được thực hiện bằng cách cấy ghép một chân răng giả làm bằng titanium vào bên trong xương hàm ở vị trí răng đã mất để tạo ra các chân răng nhân tạo rồi gắn lên nó các chiếc răng giả cố định với mục đích thay thế răng đã bị mất đi.
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
                                            <TableCell>Trồng răng Implant</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Kích thước trụ:</TableCell>
                                            <TableCell>Đường kính: Từ 3.0 - 6.0 mm.<br />
                                                Chiều dài: Từ 6.0 - 16.0 mm.</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Chất liệu trụ :</TableCell>
                                            <TableCell>Titanium tinh khiết (là loại chất liệu tương thích sinh học cao với cơ thể người, hạn chế khả năng đào thải).</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Thời gian cấy ghép:</TableCell>
                                            <TableCell>Thông thường từ 30 phút đến 1 giờ cho một trụ.<br />
                                                Quá trình tích hợp xương từ 3 - 6 tháng, tùy vào loại trụ và cơ địa.</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Tỷ lệ thành công::</TableCell>
                                            <TableCell>Tỷ lệ thành công lên tới 95% - 98% nếu tuân thủ quy trình chăm sóc và điều trị đúng cách.</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Thời gian bảo hành:</TableCell>
                                            <TableCell>Thường từ 10 năm đến trọn đời, tùy vào loại trụ và chính sách của trung tâm nha khoa</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Kỹ thuật hỗ trợ:</TableCell>
                                            <TableCell>Công nghệ CT scan 3D để chẩn đoán và lập kế hoạch.<br />
                                                Kỹ thuật định vị kỹ thuật số giúp cấy ghép chính xác.</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Yêu cầu xương hàm:</TableCell>
                                            <TableCell>Độ dày và chiều cao xương hàm cần đạt yêu cầu nhất định để trụ Implant được cấy ghép và tích hợp tốt.</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        )}

                        {/* Tab Panel: Bài viết đánh giá */}
                        {tabIndex === 1 && (
                            <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginTop: "10px" }}>
                                <Typography variant="h6" color="orange">Cấy ghép Implant là gì - những điều nên biết trước khi thực hiện</Typography>
                                { /*kim loại mặt ngoài*/}

                                <Typography >
                                    Implant dùng chân răng nhân tạo cắm chặt trong xương, để làm trụ nâng đỡ các mão phục hình, các cầu răng và các phục hình tháo lắp (lọai bán hàm hay loại toàn hàm). Răng mới này có hình dáng và chức năng tương tự như các răng thật. Trường hợp mất 1 răng, nhiều răng, thậm chí mất răng toàn hàm do tai nạn, bệnh tật hoặc do bị thiếu răng bẩm sinh đều có thể được giải quyết bằng phương pháp cấy ghép implant. <br></br>
                                </Typography>


                                { /*kim loại mặt trong*/}
                                <Box marginTop={"10px"}>

                                    <Typography variant="h6" >Khi nào nên cấy ghép Implant?</Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Người đã bị mất răng có nhu cầu làm răng cố định mà không cần phải mài răng thật.<br />

                                            - Bị mất răng và không muốn dùng hàm tháo lắp, các răng còn lại không đủ sức để làm trụ cầu, nhất là những trường hợp bị mất quá nhiều răng.<br />

                                            - Người có nhu cầu làm răng giả nhưng vẫn muốn bảo tồn và không gây tiêu xương hàm tại vùng răng đã mất đi.
                                            <br></br>
                                            
                                        </Typography>
                                    </Box>

                                </Box>
                                { /*sứ*/}
                                <Box marginTop={"10px"}>

                                    <Typography variant="h6" >Ai không nên cấy ghép Implant?</Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Người bị tiểu đường mất kiểm soát.<br />

                                            - Thai phụ.<br />

                                            - Người có viêm nhiễm đang tiến triển ở vùng sẽ đặt Implant.<br />

                                            Ngoài ra, một số trường hợp sau cũng cần cân nhắc về việc đặt Implant:<br />

                                            - Không hợp tác với bác sĩ trong suốt quá trình điều trị.<br />

                                            - Giữ gìn vệ sinh răng miệng không tốt.<br />

                                            - Bị một số bệnh lý mạn tính nguy hiểm như: huyết áp, tim mạch,...<br />

                                            - Nghiện thuốc lá, bia rượu.<br />

                                            - Đã thực hiện xạ trị xương hàm. <br />
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
                            <MenuItem value="Trụ implant Biotem-HQ">Trụ implant Biotem-HQ</MenuItem>
                            <MenuItem value="Trụ implant Dio-HQ">Trụ implant Dio-HQ</MenuItem>
                            <MenuItem value="Trụ implant Megagen Anyridge-HQ">Trụ implant Megagen Anyridge-HQ</MenuItem>
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

export default Implant;
