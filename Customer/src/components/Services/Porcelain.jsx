//rang su
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

import cercon from "..//images/pricelist/cercon.png";
import serrconHT from "..//images/pricelist/cercon-ht.jpg";
import ddbio from "..//images/pricelist/ddbio.jpg";
import lavaPlus from "..//images/pricelist/Lava-Plus.jpg";
import orodentBleach from "..//images/pricelist/orodent-bleachjpg.jpg";
import rangSuEmax from "..//images/pricelist/rang-su-emax.jpg";
import spGold from "..//images/pricelist/sp-gold.png";

import spWhite from "..//images/pricelist/sp-white.png";
import suDuc from "..//images/pricelist/su-dua.png";
import suMy from "..//images/pricelist/su-my.jpg";
import suTitan from "..//images/pricelist/su-titan.jpg";
import Zirconia from "..//images/pricelist/zirconia.jpg";

const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));

const images = [
    { id: 1, src: Zirconia },
    { id: 2, src: cercon },
    { id: 3, src: serrconHT },
    { id: 4, src: ddbio },
    { id: 5, src: lavaPlus },
    { id: 6, src: orodentBleach },
    { id: 7, src: spGold },
    { id: 8, src: spWhite },
    { id: 9, src: rangSuEmax },
    { id: 10, src: suDuc },
    { id: 11, src: suMy },
    { id: 12, src: suTitan },

];

const Porcelain = () => {
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
            case "Sứ kim loại Titan":
                setPrice("1.500.000 VND/răng");
                setServiceImage(suTitan);
                break;
            case "Sứ kim loại Mỹ":
                setPrice("800.000 VND/răng");
                setServiceImage(suMy);
                break;
            case "Sứ kim loại Đức":
                setPrice("1.000.000 VND/răng");
                setServiceImage(suDuc);
                break;
            case "Sứ Zirconia":
                setPrice("2.200.000 VND/răng");
                setServiceImage(Zirconia);
                break;
            case "Sứ Cercon":
                setPrice("3.000.000 VND/răng");
                setServiceImage(cercon);
                break;
            case "Sứ Cercon HT":
                setPrice("3.900.000 VND/răng");
                setServiceImage(serrconHT);
                break;
            case "Sứ Emax":
                setPrice("4.900.000 VND/răng");
                setServiceImage(rangSuEmax);
                break;
            case "Sứ DDBIO":
                setPrice("3.500.000 VND/răng");
                setServiceImage(ddbio);
                break;
            case "Sứ Lava Plus":
                setPrice("6.000.000 VND/răng");
                setServiceImage(lavaPlus);
                break;
            case "Sứ Orodent Bleach":
                setPrice("12.000.000 VND/răng");
                setServiceImage(orodentBleach);
                break;
            case "Sứ Orodent White":
                setPrice("7.000.000 VND/răng");
                setServiceImage(spWhite);
                break;
            case "Sứ Orodent Gold":
                setPrice("8.000.000 VND/răng");
                setServiceImage(spGold);
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

            <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: "20px",
                justifyContent: "center",
                alignItems: "flex-start",
                minHeight: "100vh",
                padding: { xs: "10px", md: "40px" },
            }}>

                {/* Left side: Image and Thumbnails */}
                <Box sx={{
                    width: { xs: "48%", md: "60%", sm:"70%" },
                    marginBottom: { xs: "20px", md: "0" },
                    marginTop: { md: "5rem", xs: "5rem", sm: "7rem" },
                    mb: { xs: "20px", md: "0" },
                }}>
                    <Box sx={{ margin: "1rem" }}>
                        <Typography sx={{
                            fontSize: { md: "25px", xs: "22px" },
                            fontWeight: "bold",
                            color: "red"
                        }}>
                            Răng sứ thẩm mỹ
                        </Typography>
                        <Typography>
                            Bọc răng sứ thẩm mỹ là phương pháp phục hình bằng vật liệu sứ giúp phục hồi chức năng và cải thiện thẩm mỹ,
                            giúp mang lại dáng răng đều, đẹp, màu sắc tự nhiên như răng thật.
                            Trong đó, Bác sĩ sẽ tiến hành mài nhẹ răng hư để làm cùi răng, sau đó lắp mão răng sứ lên trên.
                            Phần mão sứ này sẽ có độ trong và màu sắc trắng sáng tự nhiên như răng thật.
                            Bên cạnh việc cải thiện thẩm mỹ, phương án bọc răng sứ còn giúp bảo vệ răng thật trước những loại vi khuẩn gây hại cho răng.
                        </Typography>
                    </Box>
                    {/* Main Image */}
                    <Box sx={{ position: "relative",
                         overflow: "hidden", objectFit: "fixed",
                          borderRadius: "8px" }}>
                        <img src={selectedImage} alt="Main" style={{ width: "100%", 
                            height: "450px" }} />
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
                                            <TableCell>Răng sứ thẩm mỹ</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Quy trình bọc răng sứ thẩm mỹ:</TableCell>
                                            <TableCell>
                                                Bước 1: Chụp ảnh, video, scan răng và ghi nhận mong muốn của khách hàng. <br />
                                                Bước 2: Lên thiết kế 3D theo chỉ định của bác sĩ.<br />
                                                Bước 3: In thiết kế 3D, làm mock-up trên miệng khách hàng và xác nhận đồng ý thiết kế răng. Scan lại kết quả mock-up, lấy dấu silicon để làm răng tạm.<br />
                                                Bước 4: Mài cùi, so màu răng. Scan răng sau khi mài cùi<br />
                                                Bước 5: Làm răng tạm nhựa sau khi mài cùi bằng dấu silicon.<br />
                                                Bước 6: Gửi các file scan răng đến labo sản xuất răng sứ.<br />
                                                Bước 7: Gắn sứ cho khách hàng.<br />
                                            </TableCell>

                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        )}

                        {/* Tab Panel: Bài viết đánh giá */}
                        {tabIndex === 1 && (
                            <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginTop: "10px" }}>
                                <Typography variant="h6" color="orange">
                                    Bài viết đánh giá về ưu, nhược điểm của từng dòng răng sứ
                                </Typography>

                                <Grid container spacing={2} marginTop={"10px"}>
                                    <Grid item xs={15} sm={5} md={6} >
                                        <Box>
                                            <Typography variant="h6">1. Răng sứ Zirconia</Typography>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Ưu điểm ***</Typography>
                                                <Typography>
                                                    - Tính thẩm mỹ cao<br />
                                                    - Chịu lực tốt<br />
                                                    - Tương thích cao<br />
                                                    - Tuổi thọ cao<br />
                                                </Typography>
                                            </Box>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Nhược điểm ***</Typography>
                                                <Typography>- Chi phí cao<br /></Typography>
                                            </Box>
                                        </Box>

                                        <Box marginTop={"10px"}>
                                            <Typography variant="h6">2. Răng sứ Cercon & Cerson HT</Typography>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Ưu điểm ***</Typography>
                                                <Typography>
                                                    - Tính thẩm mỹ vượt trội, không đen viền nướu<br />
                                                    - Lành tính cao, an toàn tuyệt đối<br />
                                                    - Độ bền cao, đảm bảo ăn nhai chắc chắn<br />
                                                    - Tuổi thọ lâu dài
                                                </Typography>
                                            </Box>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Nhược điểm ***</Typography>
                                                <Typography>
                                                    - Không che lắp được phần trụ răng bị biến màu<br />
                                                    - Chi phí cao hơn các loại răng sứ khác
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box marginTop={"10px"}>
                                            <Typography variant="h6">3. Răng sứ DDBIO</Typography>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Ưu điểm ***</Typography>
                                                <Typography>
                                                    - Tính an toàn sinh học cao<br />
                                                    - Tính thẩm mỹ tuyệt vời<br />
                                                    - Độ bền cao và lâu dài<br />
                                                    - Tính chính xác và tinh tế cao<br />
                                                    - Giá cả hợp lý
                                                </Typography>
                                            </Box>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Nhược điểm ***</Typography>
                                                <Typography>- Không còn được ưa chuộng trên thị trường<br /></Typography>
                                            </Box>
                                        </Box>

                                        <Box marginTop={"10px"}>
                                            <Typography variant="h6">4. Răng sứ Lava Plus</Typography>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Ưu điểm ***</Typography>
                                                <Typography>
                                                    - Tính thẩm mỹ vượt trội, không đen viền nướu<br />
                                                    - Khả năng chống nhiễm màu tốt, ổn định lâu dài<br />
                                                    - Độ bền cao, đảm bảo ăn nhai chắc chắn<br />
                                                    - Không gây ra kích ứng
                                                </Typography>
                                            </Box>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Nhược điểm ***</Typography>
                                                <Typography>- Chi phí cao hơn các loại răng sứ khác<br /></Typography>
                                            </Box>
                                        </Box>
                                        <Box marginTop={"10px"}>
                                            <Typography variant="h6">5. Răng sứ Orodent Bleach |Gold |White </Typography>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Ưu điểm ***</Typography>
                                                <Typography>
                                                    - Bảo tồn cùi răng tối đa, che màu cùi răng hoàn hảo<br />
                                                    - Độ bền uốn cao<br />
                                                    - Tính thẩm mỹ hoàn hảo <br />
                                                    - Sở hữu đầy đủ bảo hiểm, giấy tờ chứng nhận
                                                </Typography>
                                            </Box>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Nhược điểm ***</Typography>
                                                <Typography>- Trong thời gian đầu khi bọc răng sứ Orodent, bạn sẽ gặp tình trạng ê buốt răng nhẹ do chưa quen.<br />
                                                    - Răng sứ Orodent có giá cao hơn răng sứ kim loại – chất liệu răng sứ phổ biến đời đầu.<br />
                                                    - Quy trình thiết kế và chế tác răng sứ Orodent đòi hỏi kỹ thuật cao cùng công nghệ, máy móc tối tân nên không phải nha khoa nào cũng có thể đáp ứng.
                                                    <br></br></Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={15} sm={5} md={6} >


                                        <Box marginTop={"10px"}>
                                            <Typography variant="h6">6. Răng sứ Emax</Typography>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Ưu điểm ***</Typography>
                                                <Typography>
                                                    - Tính thẩm mỹ vượt cao<br />
                                                    - Hoàn toàn lành tính với cơ thể<br />
                                                    - Cảm giác ăn nhai thoải mái<br />
                                                    - Có tuổi thọ cao
                                                </Typography>
                                            </Box>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Nhược điểm ***</Typography>
                                                <Typography>- Được khuyến cáo không nên ứng dụng để làm cầu răng sứ vì độ cứng của dòng sứ này không cao.<br />
                                                    - Không phù hợp với răng sẫm màu vì mão răng sứ Emax có đặc điểm là độ trong mờ cao. Điều này gây khó khăn cho việc phục hình.<br /></Typography>
                                            </Box>
                                        </Box>
                                        <Box marginTop={"10px"}>
                                            <Typography variant="h6">7. Răng sứ kim loại thường</Typography>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Ưu điểm ***</Typography>
                                                <Typography>
                                                    - Răng sứ kim loại thường có chi phí khá rẻ, phù hợp với điều kiện kinh tế của nhiều khách hàng.<br />
                                                    - Màu sắc của răng sứ kim loại gần giống với răng thật.<br />
                                                    - Có độ cứng và độ chịu lực khá cao, giúp bạn thoải mái ăn uống.
                                                </Typography>
                                            </Box>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Nhược điểm ***</Typography>
                                                <Typography>
                                                    - Sau một thời gian sử dụng phần khung sườn kim loại dễ bị oxy hóa, phần cổ răng bị đen dần.<br />
                                                    - Có thể thấy rõ ánh đen kim loại.<br />
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box marginTop={"10px"}>
                                            <Typography variant="h6">8. Răng sứ Titan</Typography>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Ưu điểm ***</Typography>
                                                <Typography>
                                                    - So với răng sứ kim loại thường, răng sứ Titan nhẹ hơn nhưng lại chắc khỏe hơn.<br />
                                                    - Độ bền cao, ít nhạy cảm với thức ăn nóng, lạnh.<br />
                                                    - Không làm nướu và các mô mềm xung quanh bị kích ứng hay tổn thương.<br />
                                                    - Phù hợp với người dị ứng với kim loại, người có kích thước buồng tủy lớn.<br />
                                                    - Chi phí làm răng hợp lý.
                                                </Typography>
                                            </Box>
                                            <Box marginLeft={"10px"}>
                                                <Typography color="blue">*** Nhược điểm ***</Typography>
                                                <Typography>
                                                    - Sau một thời gian sử dụng người dùng sẽ gặp phải tình trạng đen viền nướu.<br />
                                                    Tuổi thọ không cao, người dùng phải thay mới sau 7-10 năm..<br />
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                    </Box>
                </Box>

                {/* Right side: Form đặt lịch */}
                <Box
                    sx={{
                        width: { xs: "40%", md: "40%",sm:"60%" },
                        padding: "20px",
                        backgroundColor: "#fff",
                        boxShadow: 3,
                        borderRadius: "10px",
                        marginTop:{md:"120px"}
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
                        Đặt lịch tư vấn
                    </Typography>

                    <Grid container spacing={2}>
                        {/* Họ tên */}
                        <Grid item xs={12}>
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
                        </Grid>

                        {/* Số điện thoại */}
                        <Grid item xs={12}>
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
                        </Grid>

                        {/* Email */}
                        <Grid item xs={12}>
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
                        </Grid>

                        {/* Chọn ngày và Thời gian */}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={12} sm={6}>
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
                                <Grid item xs={12} sm={6}>
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

                        {/* Dịch vụ */}
                        <Grid item xs={12}>
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
                        </Grid>

                        {/* Hình ảnh minh họa và giá tiền */}
                        {serviceImage && (
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                                    <img src={serviceImage} alt="Service Illustration" style={{ width: '100px', marginRight: '20px' }} />
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>{price}</Typography>
                                </Box>
                            </Grid>
                        )}

                        {/* Giới tính bác sĩ */}
                        <Grid item xs={12}>
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
                        </Grid>

                        {/* Ghi chú */}
                        <Grid item xs={12}>
                            <TextField
                                name="notes"
                                label="Ghi chú (nếu có)"
                                value={formData.notes}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>

                        {/* Button Đặt lịch */}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleBookingSubmit}
                                fullWidth
                                sx={{ marginTop: "20px" }}
                            >
                                Đặt lịch
                            </Button>
                        </Grid>
                    </Grid>
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

export default Porcelain;
