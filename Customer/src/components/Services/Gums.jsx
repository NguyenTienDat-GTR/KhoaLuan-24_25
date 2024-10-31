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
import nuou from "../Services/img/benh/nuou.jpg";
import r1 from "../Services/img/benh/nuou/r1.jpg";
import r2 from "../Services/img/benh/nuou/r2.jpg";
import r3 from "../Services/img/benh/nuou/r3.jpg";
import r4 from "../Services/img/benh/nuou/r4.jpg";


const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));

const images = [
    { id: 1, src: nuou },
    { id: 2, src: r1 },
    { id: 3, src: r2 },
    { id: 4, src: r3 },
    { id: 5, src: r4 },

];

const Gums = () => {
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
            case "Điều trị cắt cuống răng":
                setPrice("1.000.000 - 1.500.000 VND/ca");
                setServiceImage(r1);
                break;
            case "Điều trị cắt lợi trùm":
                setPrice("5.000.000 - 1.000.000 VND/ca");
                setServiceImage(r3);
                break;
            case "Phẫu thuật hở lợi":
                setPrice("10.000.000 - 15.000.000 VND/ca");
                setServiceImage(r2);
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
                            Điều trị viêm nướu
                        </Typography>
                        <Typography>
                            Viêm nướu răng (Hay còn gọi là viêm lợi hoặc viêm chân răng) là tình trạng viêm cấp tính phổ biến gây ảnh hưởng đến nha chu
                            (các mô nâng đỡ và bao quanh răng). Một trong những dấu hiệu chính của viêm nướu chân răng là đau răng, xuất hiện sự viêm nhiễm nướu, sưng đỏ hoặc chảy máu chân răng.
                            Viêm nướu răng cần được chẩn đoán và điều trị sớm để tránh những vấn đề nghiêm trọng hơn
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
                                            <TableCell>Điều trị viêm nướu</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Thời gian :</TableCell>
                                            <TableCell>-Với các trường hợp nhẹ, việc điều trị có thể kéo dài từ 1 đến 2 tuần
                                                <br />
                                                -  Đối với các trường hợp nặng hơn, quá trình điều trị có thể kéo dài từ 3 đến 6 tháng
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Phương pháp :</TableCell>
                                            <TableCell>- Làm sạch sâu
                                                <br />
                                                - Điều trị bằng thuốc
                                                <br />
                                                - Điều trị bằng laser
                                                <br />
                                                - Phẩu thuật nướu (trường hợp nặng)
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
                                <Typography variant="h6" color="orange">Viêm nướu răng: dấu hiệu, nguyên nhân, cách phòng ngừa</Typography>
                                <Box marginLeft={"10px"}>
                                    <Typography>
                                        Viêm nướu (hay viêm lợi) là bệnh nướu do các mảng bám có chứa vi khuẩn,
                                        tích tụ trên răng và gây viêm mô nướu xung quanh. Mảng bám trên răng gây kích ứng nướu
                                        , khiến nướu bị viêm, sưng đỏ hoặc chảy máu.
                                        Vi khuẩn trong mảng bám có thể dẫn đến mất khoáng làm men răng suy yếu.
                                        <br /> <br /> </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="h6" > Dấu hiệu viêm nướu: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Sưng nướu răng.<br />
                                            - Nướu có màu đỏ sẫm hoặc đỏ tím.<br />
                                            - Nướu dễ chảy máu khi đánh răng hoặc dùng chỉ nha khoa.<br />
                                            - Hôi miệng.<br />
                                            - Tụt nướu.<br />
                                            - Khi chạm vào nướu bị mềm.<br />
                                            - Đau nướu răng.<br />
                                            - Nướu răng có mủ, lở nướu.<br />
                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>
                                <Box>
                                    <Typography variant="h6" > Nguyên nhân gây bệnh: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Viêm nướu do mảng bám: mảng bám trên răng là một màng dính,
                                            không nhìn thấy được, chứa nhiều vi khuẩn. Chúng hình thành mỗi ngày trên răng,
                                            khi tinh bột và đường trong thức ăn tương tác với vi khuẩn thường có trong miệng. <br />
                                            - Mảng bám biến thành cao răng: Mảng bám trên răng có thể cứng lại dưới đường viền nướu,
                                            hình thành cao răng, tích tụ vi khuẩn. Cao răng làm cho mảng bám khó loại bỏ hơn,
                                            tạo lá chắn bảo vệ vi khuẩn và gây kích ứng dọc theo đường viền nướu. Cần vệ sinh răng miệng đúng cách để loại bỏ cao răng.
                                            <br />
                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>
                                <Box>
                                    <Typography variant="h6" > Các yếu tố làm tăng nguy cơ viêm nướu: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Thói quen chăm sóc răng miệng kém.<br />
                                            - Hút thuốc lá.<br />
                                            - Tuổi già.<br />
                                            - Khô miệng.<br />
                                            - Dinh dưỡng kém, thiếu vitamin C.<br />
                                            - Răng khấp khểnh khó làm sạch.<br />
                                            - Mắc các bệnh làm giảm khả năng miễn dịch như bệnh bạch cầu, HIV/AIDS hoặc điều trị ung thư.<br />
                                            - Tác dụng phụ của thuốc như phenytoin điều trị co giật động kinh và một số thuốc chẹn kênh canxi.<br />
                                            - Thay đổi nội tiết tố trong thời kỳ mang thai, chu kỳ kinh nguyệt hoặc sử dụng thuốc tránh thai.<br />
                                            - Di truyền.<br />
                                            - Nhiễm virus và nấm nhất định.<br />
                                            <br></br>
                                        </Typography>
                                    </Box>

                                </Box>

                                <Box>
                                    <Typography variant="h6" >Phương pháp điều trị: </Typography>
                                    <Box marginLeft={"10px"}>

                                        <Typography >
                                            - Cạo vôi và làm sạch gốc răng: Quy trình này tương tự như làm sạch răng thông thường nhưng tiếp cận sâu hơn phần chân răng bên dưới nướu. Cạo vôi răng loại bỏ cao răng và vi khuẩn.
                                            Kết hợp làm sạch sâu bề mặt chân răng để tái tạo sự lành mạnh và tái bám dính của mô nướu và các dây chằng quanh răng.<br />
                                            - Nước súc miệng kháng khuẩn: sử dụng nước súc miệng kháng khuẩn có thể giúp tiêu diệt vi khuẩn gây bệnh viêm nướu răng.<br />
                                            - Sử dụng thuốc trị viêm nướu răng: trong trường hợp cần thiết, nha sĩ hoặc bác sĩ nha khoa sẽ chỉ định người bệnh dùng một số loại thuốc điều trị viêm nướu răng như: thuốc giảm đau Acetaminophen, Ibuprofen,… hỗ trợ giảm đau, kháng viêm.<br />
                                            - Khắc phục những vấn đề do phục hồi răng: răng mọc lệch, mão răng, cầu răng không đúng quy cách hoặc các vật liệu phục hồi không phù hợp, có thể gây kích ứng nướu và khiến việc loại bỏ mảng bám khó khăn hơn.
                                            Nếu các vấn đề về răng hoặc phục hồi răng góp phần gây viêm nướu, nha sĩ có thể đưa ra phương pháp khắc phục vấn đề này.<br /><br />
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
                            <MenuItem value="Điều trị cắt cuống răng">Điều trị cắt cuống răng</MenuItem>
                            <MenuItem value="Điều trị cắt lợi trùm">Điều trị cắt lợi trùm</MenuItem>
                            <MenuItem value="Phẫu thuật hở lợi">Phẫu thuật hở lợi</MenuItem>
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

export default Gums;
