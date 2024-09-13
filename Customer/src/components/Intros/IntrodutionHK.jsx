import React from "react";
import { Box, Typography } from "@mui/material";
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
const IntrodutionHK = () => {
    return (
        <Box>
            <Box
                className="container"
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row", md: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                    mt: { xs: "none", sm: "1rem", md: "1rem" },
                    gap: "2rem",
                    width: { xs: "100%", sm: "100vw", md: "100%" },
                }}
            >
                <Box
                    className="container-text"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: { xs: "100%", sm: "50%", md: "60%" }, // Giảm width của container-text
                        height: { xs: "auto", sm: "15rem", md: "20rem" },
                        mt: { xs: "1rem", sm: "0", md: "0" },
                        // px: { xs: "1rem", sm: "0", md: "0" }, // Padding horizontal trên mobile

                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "95%",
                            height: "auto",
                            ml: { xs: "0", sm: "2rem", md: "2rem" },
                        }}
                    >
                        <Typography
                            sx={{
                                color: "rgba(0,120,233,1)",
                                fontSize: {
                                    xs: "1.2rem",
                                    sm: "1rem",
                                    md: "1.5rem",
                                },
                                fontWeight: "bold",
                                marginLeft: "50px"
                            }}
                        >
                            Khắc phục mọi tình trạng răng
                        </Typography>
                        <Typography
                            sx={{
                                width: "100%",
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1rem",
                                    md: "1.2rem",
                                },
                            }}
                        >
                            <p style={{ textAlign: 'justify', textIndent: "30px" }}>
                                <b>Nha Khoa Hoàng Kim</b> là một hệ thống phòng khám nha khoa nổi tiếng,
                                chuyên cung cấp các dịch vụ chăm sóc và điều trị răng miệng chất lượng cao.
                                Với hơn nhiều năm kinh nghiệm trong ngành, sở hữu đội ngũ bác sĩ nha khoa giàu kinh nghiệm
                                và được đào tạo chuyên sâu trong các lĩnh vực như chỉnh nha, cấy ghép Implant, bọc răng sứ, tẩy trắng răng,
                                và các giải pháp thẩm mỹ nha khoa khác.<br /></p>
                            <p style={{ textAlign: 'justify', textIndent: "30px" }}>
                                Phòng khám cam kết sử dụng trang thiết bị hiện đại,
                                cùng với các công nghệ tiên tiến trong điều trị nhằm mang đến hiệu quả điều trị tối ưu và
                                an toàn cho khách hàng. Đặc biệt, Nha Khoa Hoàng Kim luôn chú trọng đến chất lượng dịch vụ và
                                sự hài lòng của khách hàng, với phương châm “Nụ cười là niềm tin”.<br /></p>
                            <p style={{ textAlign: 'justify', textIndent: "30px" }}>
                                Hệ thống phòng khám của Nha Khoa Hoàng Kim không chỉ tập trung vào việc điều trị mà còn cung cấp các gói dịch vụ
                                thẩm mỹ răng miệng, giúp khách hàng cải thiện thẩm mỹ và tự tin hơn trong giao tiếp.<br />
                            </p>

                        </Typography>
                    </Box>
                </Box>
                <Box
                    className="container-image"
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(2, 1fr)" },
                        gridRowGap: { xs: "1rem", sm: "1rem", md: "1rem" },
                        width: { xs: "80%", sm: "50%", md: "50%" },
                        height: "auto",
                        mr: { xs: "0", sm: "3rem", md: "2rem" },

                    }}
                >
                    <Box
                        component="img"
                        src="https://picsum.photos/200"
                        alt="giới thiệu nha khoa"
                        sx={{
                            width: { xs: "90%", sm: "90%", md: "90%" }, // Giảm width của ảnh
                            height: { xs: "10rem", sm: "10rem", md: "10rem" },
                            objectFit: "cover",
                            mx: "auto", // Canh giữa ảnh
                        }}
                        style={{ width: "700px", height: "450px" }}
                    />

                </Box>
            </Box>
            <hr style={{ width: "1000px", fontSize: "50px" }} />
            <Box
                className="container"
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row", md: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                    mt: { xs: "none", sm: "1rem", md: "1rem" },
                    gap: "2rem",
                    width: { xs: "100%", sm: "100vw", md: "100%" },
                }}
            >
                <Box
                    className="container-text"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: { xs: "100%", sm: "50%", md: "50%" }, // Giảm width của container-text
                        height: { xs: "auto", sm: "15rem", md: "20rem" },
                        mt: { xs: "2rem", sm: "0", md: "0" },
                        // px: { xs: "1rem", sm: "0", md: "0" }, // Padding horizontal trên mobile
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "80%",
                            height: "auto",
                            ml: { xs: "0", sm: "2rem", md: "2rem" },
                        }}
                    >

                        <Typography
                            sx={{
                                color: "rgba(0,120,233,1)",
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1rem",
                                    md: "1.5rem",
                                },
                                fontWeight: "bold",
                            }}
                        >
                            <VolunteerActivismOutlinedIcon /> Tầm nhìn
                        </Typography>
                        <Typography
                            sx={{
                                width: "100%",
                                fontSize: {
                                    xs: "0.8rem",
                                    sm: "1rem",
                                    md: "1.2rem",
                                },
                            }}
                        >
                            <p style={{ textAlign: 'justify', textIndent: "30px" }}>
                                <b>Nha Khoa Hoàng Kim </b>am kết mang đến dịch vụ nha khoa chất lượng cao, an toàn và hiện đại nhất cho khách hàng. <br /></p>
                            <p style={{ textAlign: 'justify', textIndent: "30px" }}>
                                Phòng khám không chỉ hướng tới việc cải thiện nụ cười cho khách hàng mà còn tạo dựng uy tín thông qua chất lượng dịch vụ và sự hài lòng của khách hàng.<br />
                            </p>

                        </Typography>
                    </Box>
                </Box>
                <Box
                    className="container-text"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: { xs: "100%", sm: "50%", md: "50%" }, // Giảm width của container-text
                        height: { xs: "auto", sm: "15rem", md: "25rem" },
                        mt: { xs: "2rem", sm: "0", md: "0" },
                        // px: { xs: "1rem", sm: "0", md: "0" }, // Padding horizontal trên mobile
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "80%",
                            height: "auto",
                            ml: { xs: "0", sm: "2rem", md: "2rem" },
                        }}
                    >

                        <Typography
                            sx={{
                                color: "rgba(0,120,233,1)",
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1rem",
                                    md: "1.5rem",
                                },
                                fontWeight: "bold",
                            }}
                        >
                            <Diversity1OutlinedIcon /> Sứ mệnh
                        </Typography>
                        <Typography
                            sx={{
                                width: "100%",
                                fontSize: {
                                    xs: "0.8rem",
                                    sm: "1rem",
                                    md: "1.2rem",
                                },
                            }}
                        ><ul>
                                <p style={{ textAlign: 'justify' }}>

                                    <li>
                                        <p> <b>Nha Khoa Hoàng Kim </b>mong muốn trở thành một trong những hệ thống nha khoa hàng đầu tại Việt Nam,
                                            đem đến tiêu chuẩn quốc tế trong chăm sóc sức khỏe răng miệng. <br /></p>
                                    </li>

                                    <li>
                                        <p style={{ textAlign: 'justify' }}>
                                            Phòng khám tập trung vào việc nâng cao sức khỏe răng miệng và cải thiện thẩm mỹ nụ cười,
                                            giúp mọi khách hàng đều có thể tự tin trong giao tiếp.                                        </p>

                                    </li>
                                    <li>
                                        <p style={{ textAlign: 'justify' }}>
                                            Bên cạnh đó, Nha Khoa Hoàng Kim cũng chú trọng đến việc giáo dục sức khỏe răng miệng,
                                            giúp khách hàng hiểu rõ hơn về cách chăm sóc răng miệng hiệu quả.                                        </p>

                                    </li>
                                </p>
                            </ul>
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                className="container"
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row", md: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                    mt: { xs: "none", sm: "1rem", md: "1rem" },
                    gap: "2rem",
                    width: { xs: "100%", sm: "100vw", md: "100%" },
                }}
            >
                <Box
                    className="container-image"
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(2, 1fr)" },
                        gridRowGap: { xs: "1rem", sm: "1rem", md: "1rem" },
                        width: { xs: "80%", sm: "50%", md: "50%" },
                        height: "auto",
                        mr: { xs: "0", sm: "3rem", md: "2rem" },

                    }}
                >
                    <Box
                        component="img"
                        src="https://picsum.photos/200"
                        alt="giới thiệu nha khoa"
                        sx={{
                            width: { xs: "90%", sm: "90%", md: "90%" }, // Giảm width của ảnh
                            height: { xs: "10rem", sm: "10rem", md: "10rem" },
                            objectFit: "cover",
                            mx: "auto", // Canh giữa ảnh
                        }}
                        style={{ width: "700px", height: "450px", marginLeft: "50px" }}
                    />

                </Box>
                <Box
                    className="container-text"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: { xs: "100%", sm: "50%", md: "60%" }, // Giảm width của container-text
                        height: { xs: "auto", sm: "15rem", md: "20rem" },
                        mt: { xs: "1rem", sm: "0", md: "0" },
                        // px: { xs: "1rem", sm: "0", md: "0" }, // Padding horizontal trên mobile

                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "85%",
                            height: "auto",
                            ml: { xs: "0", sm: "2rem", md: "2rem" },
                        }}
                    >
                        <Typography
                            sx={{
                                color: "rgba(0,120,233,1)",
                                fontSize: {
                                    xs: "1.2rem",
                                    sm: "1rem",
                                    md: "1.5rem",
                                },
                                fontWeight: "bold",
                               
                            }}
                        >
                            Giá trị cốt lõi
                        </Typography>
                        <Typography
                            sx={{
                                width: "100%",
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1rem",
                                    md: "1.2rem"
                                },
                            }}
                        >
                            <ol>
                                <p style={{ textAlign: 'justify', marginLeft:'-80px' }}>

                                    <li>
                                        <b>Chất lượng: </b>
                                        Đảm bảo chất lượng dịch vụ cao nhất với đội ngũ bác sĩ chuyên nghiệp, trang thiết bị hiện đại và quy trình điều trị an toàn. <br />
                                    </li><br/>

                                    <li>
                                        <b>Tận Tâm:  </b>
                                        Mọi hoạt động của Nha Khoa Hoàng Kim đều lấy khách hàng làm trung tâm, chú trọng đến sự thoải mái và hài lòng của khách hàng.

                                    </li><br/>
                                    <li>
                                    <b>Đổi mới: </b>
                                        Luôn cập nhật các công nghệ tiên tiến và phương pháp điều trị mới nhất để mang lại trải nghiệm tốt nhất cho khách hàng.

                                    </li><br/>
                                    <li>
                                    <b>     Đáng tin cậy: </b>
                                        Đảm bảo mọi dịch vụ nha khoa đều minh bạch, chính xác và đáp ứng tiêu chuẩn y tế cao.

                                    </li><br/>
                                    <li> <b>Phát triển bền vững: </b>
                                        Xây dựng một môi trường làm việc bền vững và chuyên nghiệp, luôn hướng đến sự phát triển lâu dài và bền vững của công ty.

                                    </li>
                                </p>
                            </ol>
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </Box>

    );
};

export default IntrodutionHK;
