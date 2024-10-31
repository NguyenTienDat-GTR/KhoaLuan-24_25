//nha khoa trẻ em
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
import nhakhoatreem from "../Services/img/benh/chinh_nha_tre_em.jpg";
import r1 from "../Services/img/benh/nha-khoa-tre-em/slide.jpg";
import r2 from "../Services/img/benh/nha-khoa-tre-em/nho-rang.jpg";
import r3 from "../Services/img/benh/nha-khoa-tre-em/nieng.jpg";
import r4 from "../Services/img/benh/nha-khoa-tre-em/tram-rang.jpg";


const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));

const images = [
    { id: 1, src: nhakhoatreem },
    { id: 2, src: r1 },
    { id: 3, src: r2 },
    { id: 4, src: r3 },
    { id: 5, src: r4 },

];

const ChildrentsDentistry = () => {
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
            case "Niềng răng trẻ em":
                setPrice("32.000.000 - 44.000.000 VND");
                setServiceImage(r3);
                break;
            case "Nhổ răng trẻ em bôi tê tại chỗ":
                setPrice("200.000 VND/răng");
                setServiceImage(r2);
                break;
            case "Nhổ răng trẻ em gây mê ":
                setPrice("500.000 VND/răng");
                setServiceImage(r2);
                break;
            case "Trám răng trẻ em":
                setPrice("500.000 VND/răng");
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
                            Nha khoa trẻ em
                        </Typography>
                        <Typography>
                            Khám nha định kỳ là một hành động đúng đắn để chăm sóc sức khỏe răng miệng cho trẻ.
                            Lần hẹn gặp bác sĩ nha khoa đầu tiên của bé phải được thực hiện ngay sau khi bé mọc răng và
                            nên nhớ không được muộn hơn sinh nhật 1 tuổi của bé.
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
                                            <TableCell>Nha khoa trẻ em</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Thời gian :</TableCell>
                                            <TableCell>Ngay sau khi mọc răng, trước 1 tuối</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </Box>
                        )}

                        {/* Tab Panel: Bài viết đánh giá */}
                        {tabIndex === 1 && (
                            <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginTop: "10px" }}>
                                <Typography variant="h6" color="orange">Vì sao phải thực hiện các dịch vụ nha khoa trẻ em?</Typography>
                                <Box marginLeft={"10px"}>
                                    <Typography>
                                        - Giúp trẻ tránh các khuyết điểm và biến chứng răng hàm như: sâu răng, viêm nướu, sai lệch khớp cắn, răng mọc lộn xộn, khấp khểnh… <br />

                                        - Định hướng phát triển răng hàm trong tương lai, giúp bé sở hữu hàm răng đều đẹp và thực hiện tốt các chức năng vốn có.<br />

                                        - Đảm bảo sức khỏe cho trẻ, tránh bị ảnh hưởng xấu bởi bệnh nha chu.<br /><br />
                                    </Typography>
                                </Box>
                                <Typography variant="h6" color="orange">Các dịch vụ nha khoa trẻ em phổ biến hiện nay</Typography>
                                { /*kim loại mặt ngoài*/}
                                <Box>
                                    <Typography variant="h6" >1. Dịch vụ niềng răng trẻ em</Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            Niềng răng cho trẻ em thường ở 3 giai đoạn, chủ yếu là giai đoạn răng sữa (bắt đầu từ ngày đầu tiên khi có chiếc răng nhú mọc cho đến khi trẻ 5 tuổi),
                                            giai đoạn răng hỗn hợp (lúc bé từ 6 tuổi tới 12 tuổi) và giai đoạn răng vĩnh viễn (trẻ từ 13 tới 21 tuổi).
                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>

                                <Box marginTop={"10px"}>

                                    <Typography variant="h6" >2. Dịch vụ nhổ răng sữa không đau, an toàn cho trẻ em</Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            Khi thấy răng sữa của trẻ bị lung lay hoặc tới tuổi thay răng mà răng không có dấu hiệu rụng đi thì ba mẹ nên nhanh chóng đưa bé đến trung tâm nha khoa uy tín để bác sĩ tiến hành nhổ răng sữa đúng giai đoạn.
                                            Độ tuổi thay răng sữa được chia thành các nhóm như sau: <br />

                                            - Hai răng cửa giữa: 6-7 tuổi <br />
                                            - Hai răng cửa bên cạnh: 7-8 tuổi <br />
                                            - Hai răng nanh: 9-12 tuổi <br />
                                            - Hai răng hàm đầu tiên: 9-11 tuổi <br />
                                            - Hai răng hàm thứ 2: 10-12 tuổi <br />
                                            Việc nhổ răng sữa đúng thời điểm, đúng cách sẽ giúp bộ nhá về sau của con phát triển đúng trên cung hàm, hạn chế được những lệch lạc không mong muốn do răng. <br /> <br />
                                        </Typography>
                                    </Box>

                                </Box>
                                { /*sứ*/}
                                <Box marginTop={"10px"}>

                                    <Typography variant="h6" >3. Hàn trám răng phòng ngừa răng sâu, khắc phục răng mẻ vỡ</Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Trám phòng ngừa sâu răng là dịch vụ nha khoa trẻ em được thực hiện bằng cách dùng các vật liệu trám bít chuyên dụng để đắp lên các hố rãnh trên mặt nhai răng hàm để ngăn ngừa sâu răng hình thành và
                                            phát triển sớm ở trẻ nhỏ. Nếu có bất cứ dấu hiệu nào của bệnh lý sâu răng thì thực hiện trám bít càng sớm càng tốt là khuyến cáo chung của các chuyên gia.
                                            <br />
                                            - Tùy vào tình trạng răng hàm cụ thể mà bác sĩ sẽ tư vấn thực hiện trám bít gián tiếp hoặc trực tiếp để mang lại kết quả cao nhất.
                                            Phương pháp đơn giản nhưng bạn cần lưu ý khám răng cho trẻ ở đâu hội tụ đội ngũ bác sỹ giỏi để đảm bảo tiến hành nhẹ nhàng, an toàn cho bé nhé!


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
                            <MenuItem value="Niềng răng trẻ em">Niềng răng trẻ em</MenuItem>
                            <MenuItem value="Nhổ răng trẻ em bôi tê tại chỗ">Nhổ răng trẻ em bôi tê tại chỗ</MenuItem>
                            <MenuItem value="Nhổ răng trẻ em gây mê">Nhổ răng trẻ em gây mê</MenuItem>
                            <MenuItem value="Trám răng trẻ em">Trám răng trẻ em</MenuItem>
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

export default ChildrentsDentistry;
