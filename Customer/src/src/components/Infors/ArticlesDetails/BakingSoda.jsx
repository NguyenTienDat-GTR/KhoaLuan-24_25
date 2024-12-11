import React, { Suspense } from "react";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";

const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));
const BookingForm = React.lazy(() => import("../BookingForm"));
import logo from "../img/baking/nen1.jpg";
import baking from "../img/baking/baking.jpg";
import baking_ban_chai from "../img/baking/baking-ban-chai.jpg";
import baking_chanh from "..//img/baking/baking-chanh.jpg";

import baking_kho from "../img/baking/baking-kho.jpg";
import baking_water from "../img/baking/baking-water.jpg";
import trang_rang from "../img/baking/trang-rang.jpg";

const BakingSoda = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh", // Đảm bảo chiều cao tối thiểu của trang để Header luôn ở trên cùng
            }}
        >
            <Suspense
                fallback={
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh", // Full screen height for vertical centering
                            width: "100vw", // Full screen width for horizontal centering
                        }}
                    >
                        <CircularProgress
                            sx={{
                                width: { xs: "50px", sm: "70px", md: "100px" }, // Responsive width
                                height: { xs: "50px", sm: "70px", md: "100px" }, // Responsive height
                            }}
                        />
                    </Box>
                }
            >
                <Header />
                <Box
                    sx={{
                        justifyContent: "center",
                        alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
                        height: "auto",
                        width: "100vw",
                    }}
                >


                    <Typography
                        sx={{
                            color: 'blue',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: { xs: '24px', sm: '32px' },
                        }}
                    >
                        Cách sử dụng baking soda làm trắng răng hiệu quả tại nhà
                    </Typography>
                    <Box
                        sx={{
                            width: { xs: "100vw", sm: "100vw", md: "100vw" },
                            mt: "1rem",
                            mb: "1rem",
                        }}
                    >
                        <Divider
                            sx={{
                                borderBottomWidth: 1,
                                borderColor: "#000",
                                width: { xs: "30%", sm: "50%", md: "70%" },
                                margin: "0 auto",
                            }}
                        />
                    </Box>
                    <Box
                        component="img"
                        src={logo} // Replace with your logo image path
                        alt="Logo"
                        sx={{
                            width: { xs: "3rem", sm: "3.5rem", md: "4.5rem" }, // Adjust logo size
                            marginRight: { xs: "0.5rem", sm: "1rem" },
                        }}
                        style={{ height: 400, width: 800, objectFit: "cover", marginLeft: 350, marginTop: 15 }}
                    />
                    {/* Muc luc */}
                    <nav style={{ margin: '20px' }}>
                        <Typography
                            sx={{
                                color: 'red',
                                fontWeight: 'bold',
                                marginTop: '30px',
                                fontSize: { xs: '18px', sm: '24px' },
                            }}
                        >
                            Mục lục
                        </Typography>
                        <ul>
                            <li><a href="#baking-soda">I. Baking Soda là gì?</a></li>
                            <li><a href="#ways">II. Các cách làm trắng răng bằng Baking Soda</a></li>
                            <li><a href="#pros-cons">III. Ưu điểm và hạn chế của việc dùng Baking Soda làm trắng răng</a></li>
                            <li><a href="#notes">IV. Lưu ý khi sử dụng Baking Soda làm trắng răng</a></li>
                        </ul>
                    </nav>
                    {/* Bai viet */}
                    <Box style={{ marginLeft: '100px', marginRight: '50px' }} >
                        <section id="baking-soda">
                            <Typography
                                sx={{
                                    color: 'red',
                                    fontWeight: 'bold',
                                    marginTop: '30px',
                                    fontSize: { xs: '18px', sm: '24px' },
                                }}
                            >
                                I. Baking Soda là gì?
                            </Typography>
                            <Typography>
                                Baking soda hay Natri bicacbonat (NaHCO₃), là một loại muối hóa học tồn tại dưới dạng bột mịn, màu trắng, vị mặn, và dễ tan trong nước. Đây là nguyên liệu quen thuộc trong bếp ăn gia đình, thường được sử dụng để làm nở bánh.
                                <br />
                                Tuy nhiên, baking soda còn nổi tiếng với nhiều công dụng trong làm đẹp và chăm sóc cá nhân, đặc biệt là làm trắng răng.
                            </Typography>
                            <br />
                            <Typography>
                                <b>Tính chất làm trắng của baking soda:</b><br></br>

                            </Typography>
                            <ol>
                                <li>Trung hòa axit và bảo vệ men răng: Baking soda có tính kiềm, giúp trung hòa axit trong miệng – nguyên nhân chính gây ra sâu răng và mài mòn men răng. Việc trung hòa axit giúp giảm độ nhạy cảm của răng và bảo vệ lớp men răng khỏi bị ăn mòn.</li>
                                <li>Tẩy vết ố và mảng bám: Khi hòa với nước, baking soda tạo ra một phản ứng hóa học sinh ra các gốc tự do. Những gốc tự do này hoạt động như chất tẩy tự nhiên, giúp đánh bật các vết ố và mảng bám tích tụ trên bề mặt răng mà không làm hại men răng.</li>
                                <li>Đặc tính mài mòn nhẹ: Baking soda có khả năng mài mòn nhẹ nhưng đủ để làm sạch răng, giúp răng trông trắng sáng hơn chỉ sau vài lần sử dụng.</li>

                            </ol>
                            <Typography>Ngoài khả năng làm trắng răng, baking soda còn có nhiều công dụng khác như trị mụn đầu đen, làm đẹp da, nấu ăn, tẩy rửa, khử mùi cơ thể và hỗ trợ điều trị các vết côn trùng cắn.</Typography>
                            <Box
                                component="img"
                                src={baking} // Replace with your logo image path
                                alt="Baking"
                                sx={{
                                    width: { xs: "3rem", sm: "3.5rem", md: "4.5rem" }, // Adjust logo size
                                    marginRight: { xs: "0.5rem", sm: "1rem" },
                                }}
                                style={{ height: 400, width: 800, objectFit: "cover", marginLeft: 350, marginTop: 15 }}
                            />
                        </section>

                        <section id="ways">
                            <Typography
                                sx={{
                                    color: 'red',
                                    fontWeight: 'bold',
                                    marginTop: '30px',
                                    fontSize: { xs: '18px', sm: '24px' },
                                }}
                            >
                                II. Các cách làm trắng răng bằng Baking Soda
                            </Typography>
                            <Typography> Dưới đây là hướng dẫn chi tiết nhất từng bước để sử dụng baking soda làm trắng răng tại nhà, kèm theo các mẹo nhỏ và lưu ý quan trọng trong quá trình thực hiện:</Typography>
                            <Box >
                                <Box>
                                    <Typography
                                        sx={{
                                            color: 'red',
                                            fontWeight: 'bold',
                                            marginTop: '20px',
                                            fontSize: { xs: '16px', sm: '20px' },
                                        }}
                                    >
                                        1. Sử dụng Baking Soda đơn lẻ
                                    </Typography>
                                    <Box>
                                        <Typography
                                            sx={{
                                                color: 'red',
                                                fontWeight: 'bold',
                                                marginTop: '10px',
                                                fontSize: { xs: '16px', sm: '20px' },
                                            }}
                                        >
                                            1.1 Baking Soda với nước
                                        </Typography>
                                        <br></br>
                                        <Typography><b> Chuẩn bị: </b> </Typography>
                                        <ul>
                                            <li>1 Thìa cà phê baking soda</li>
                                            <li>Bàn chải đánh răng mềm</li>
                                            <li>Một ít nước sạch</li>
                                        </ul>
                                        <Typography><b> Các bước thực hiện: </b> </Typography>
                                        <ol>
                                            <li><b>Rửa sạch bàn chải:</b> Đảm bảo bàn chải đã được làm sạch và làm ướt nhẹ bằng nước sạch.</li>
                                            <li><b>Nhúng vào baking soda: </b>Nhúng bàn chải vào bột baking soda, lắc nhẹ để bột bám đều vào các lông bàn chải.</li>
                                            <li><b>Chải răng nhẹ nhàng:</b> Chải răng theo chuyển động tròn nhẹ nhàng, bắt đầu từ các răng cửa rồi di chuyển sang răng hàm, tập trung vào những vùng có vết ố vàng</li>
                                            <li><b>Thời gian chải: </b>Chải trong khoảng 2 phút. Đừng chà quá mạnh để tránh làm mòn men răng.</li>
                                            <li><b>Súc miệng sạch:</b> Sau khi chải xong, súc miệng thật kỹ với nước sạch để loại bỏ hoàn toàn baking soda khỏi miệng.</li>
                                            <li><b>Kiểm tra răng: </b>Kiểm tra xem có cặn baking soda còn sót lại hay không, nếu có, súc miệng thêm lần nữa.</li>

                                        </ol>


                                        <Typography><b>Mẹo nhỏ:</b></Typography>
                                        <ul>
                                            <li>Sử dụng bàn chải mềm để tránh gây tổn thương cho nướu.</li>
                                            <li>Không dùng bàn chải cũ để tránh vi khuẩn xâm nhập vào răng miệng.</li>

                                        </ul>
                                        <Box
                                            component="img"
                                            src={baking_water} // Replace with your logo image path
                                            alt="baking-water"
                                            sx={{
                                                width: { xs: "3rem", sm: "3.5rem", md: "4.5rem" }, // Adjust logo size
                                                marginRight: { xs: "0.5rem", sm: "1rem" },
                                            }}
                                            style={{ height: 400, width: 800, objectFit: "cover", marginLeft: 350, marginTop: 15 }}
                                        />
                                        {/* <Typography><b></b></Typography>
                                    <ul>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul> */}
                                    </Box>
                                    <Box>
                                        <Typography
                                            sx={{
                                                color: 'red',
                                                fontWeight: 'bold',
                                                marginTop: '10px',
                                                fontSize: { xs: '16px', sm: '20px' },
                                            }}
                                        >
                                            1.2 Baking Soda khô
                                        </Typography>
                                        <br></br>
                                        <Typography><b> Chuẩn bị: </b> </Typography>
                                        <ul>
                                            <li>1 Thìa cà phê baking soda</li>
                                            <li>Bàn chải đánh răng khô hoặc ngón tay</li>

                                        </ul>
                                        <Typography><b> Các bước thực hiện: </b> </Typography>
                                        <ol>
                                            <li><b>Rửa tay sạch sẽ:</b> Đảm bảo tay sạch nếu dùng ngón tay để bôi baking soda lên răng.</li>
                                            <li><b>Thoa baking soda trực tiếp: </b> Rắc một ít baking soda lên bàn chải khô hoặc lên ngón tay.</li>
                                            <li><b>Chà nhẹ lên răng: </b>Nhẹ nhàng chà bột lên bề mặt răng, đặc biệt là các vùng bị ố vàng. Giữ nguyên trong khoảng 1 phút.</li>
                                            <li><b>Súc miệng: </b>Súc miệng thật kỹ với nước để loại bỏ hoàn toàn baking soda.</li>
                                            <li><b>Lau răng:</b> Sử dụng khăn mềm để lau nhẹ bề mặt răng, giúp loại bỏ cặn còn sót lại.</li>

                                        </ol>
                                        <Box
                                            component="img"
                                            src={baking_ban_chai} // Replace with your logo image path
                                            alt="baking-ban-chai"
                                            sx={{
                                                width: { xs: "3rem", sm: "3.5rem", md: "4.5rem" }, // Adjust logo size
                                                marginRight: { xs: "0.5rem", sm: "1rem" },
                                            }}
                                            style={{ height: 400, width: 800, objectFit: "cover", marginLeft: 350, marginTop: 15 }}
                                        />
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            color: 'red',
                                            fontWeight: 'bold',
                                            marginTop: '20px',
                                            fontSize: { xs: '16px', sm: '20px' },
                                        }}
                                    >
                                        2. Sử dụng Baking Soda với nguyên liệu khác
                                    </Typography>
                                    <Box>
                                        <Typography
                                            sx={{
                                                color: 'red',
                                                fontWeight: 'bold',
                                                marginTop: '10px',
                                                fontSize: { xs: '16px', sm: '20px' },
                                            }}
                                        >
                                            2.1 Baking Soda với kem đánh răng
                                        </Typography>
                                        <br></br>
                                        <Typography><b> Chuẩn bị: </b> </Typography>
                                        <ul>
                                            <li>1 Thìa cà phê baking soda</li>
                                            <li>Một lượng kem đánh răng hằng ngày</li>
                                        </ul>
                                        <Typography><b> Các bước thực hiện: </b> </Typography>
                                        <ol>
                                            <li><b>Trộn hỗn hợp: </b> Trộn baking soda với kem đánh răng vào một chén nhỏ để tạo thành hỗn hợp sệt.</li>
                                            <li><b>Đánh răng: </b>Chải răng với hỗn hợp trong 2 phút, tập trung vào vùng bị ố.</li>
                                            <li><b>Súc miệng:</b>  Súc miệng kỹ với nước sạch để loại bỏ hết hỗn hợp</li>

                                        </ol>


                                        <Typography><b>Mẹo nhỏ:</b></Typography>
                                        <ul>
                                            <li>Có thể sử dụng hỗn hợp này vào buổi sáng để tạo cảm giác sạch sẽ và sảng khoái.</li>

                                        </ul>
                                        <Box
                                            component="img"
                                            src={baking_kho} // Replace with your logo image path
                                            alt="baking-voi-kem-danh-rang"
                                            sx={{
                                                width: { xs: "3rem", sm: "3.5rem", md: "4.5rem" }, // Adjust logo size
                                                marginRight: { xs: "0.5rem", sm: "1rem" },
                                            }}
                                            style={{ height: 400, width: 800, objectFit: "cover", marginLeft: 350, marginTop: 15 }}
                                        />
                                        {/* <Typography><b></b></Typography>
                                    <ul>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul> */}
                                    </Box>

                                    <Box>
                                        <Typography
                                            sx={{
                                                color: 'red',
                                                fontWeight: 'bold',
                                                marginTop: '10px',
                                                fontSize: { xs: '16px', sm: '20px' },
                                            }}
                                        >
                                            2.2 Baking Soda và nước cốt chanh
                                        </Typography>
                                        <br></br>
                                        <Typography><b> Chuẩn bị: </b> </Typography>
                                        <ul>
                                            <li>1 Thìa cà phê baking soda</li>
                                            <li>Vài giọt nước cốt chanh tươi</li>

                                        </ul>
                                        <Typography><b> Các bước thực hiện: </b> </Typography>
                                        <ol>
                                            <li><b>Pha hỗn hợp:</b> Cho baking soda vào một cái chén, nhỏ vài giọt nước cốt chanh vào để tạo thành hỗn hợp sủi bọt nhẹ.</li>
                                            <li><b>Thoa lên răng: </b>Dùng bàn chải hoặc ngón tay thoa hỗn hợp lên răng, tránh để dính vào nướu vì chanh có tính axit cao.</li>
                                            <li><b>Giữ yên: </b> Để hỗn hợp trên răng trong 1 – 2 phút nhưng không quá lâu để tránh ảnh hưởng đến men răng.</li>
                                            <li><b>Súc miệng: </b>Súc miệng thật kỹ với nước để loại bỏ hoàn toàn hỗn hợp và axit từ chanh.</li>
                                        </ol>


                                        <Typography><b>Lưu ý:</b></Typography>
                                        <ul>
                                            <li>Chỉ nên thực hiện phương pháp này 1 lần/tuần để tránh làm yếu men răng do axit.</li>
                                        </ul>
                                        <Box
                                            component="img"
                                            src={baking_chanh} // Replace with your logo image path
                                            alt="baking-voi-nuoc-cot-chanh"
                                            sx={{
                                                width: { xs: "3rem", sm: "3.5rem", md: "4.5rem" }, // Adjust logo size
                                                marginRight: { xs: "0.5rem", sm: "1rem" },
                                            }}
                                            style={{ height: 400, width: 800, objectFit: "cover", marginLeft: 350, marginTop: 15 }}
                                        />
                                        {/* <Typography><b></b></Typography>
                                    <ul>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul> */}
                                    </Box>
                                </Box>
                            </Box>


                        </section>

                        <section id="pros-cons">
                            <Typography
                                sx={{
                                    color: 'red',
                                    fontWeight: 'bold',
                                    marginTop: '30px',
                                    fontSize: { xs: '18px', sm: '24px' },
                                }}
                            >
                                III. Ưu điểm và hạn chế của việc dùng Baking Soda làm trắng răng
                            </Typography>
                            <Box>
                                <Typography
                                    sx={{
                                        color: 'red',
                                        fontWeight: 'bold',
                                        marginTop: '20px',
                                        fontSize: { xs: '16px', sm: '20px' },
                                    }}
                                >
                                    1. Ưu điểm:
                                </Typography>
                                <ul>
                                    <li><b>Nguyên liệu dễ kiếm:</b>Baking soda là sản phẩm phổ biến, dễ tìm thấy tại các cửa hàng tạp hóa, siêu thị, với chi phí thấp.</li>
                                    <li><b>Cách thực hiện đơn giản: </b>Các phương pháp làm trắng răng với baking soda đều dễ thực hiện, không đòi hỏi kỹ thuật cao và có thể thực hiện ngay tại nhà.</li>
                                    <li><b>Hiệu quả nhanh chóng:</b>Với đặc tính tẩy nhẹ và an toàn, baking soda có thể mang lại hiệu quả trắng răng rõ rệt chỉ sau vài lần sử dụng.</li>

                                </ul>
                                <Box
                                            component="img"
                                            src={trang_rang} // Replace with your logo image path
                                            alt="uu-diem"
                                            sx={{
                                                width: { xs: "3rem", sm: "3.5rem", md: "4.5rem" }, // Adjust logo size
                                                marginRight: { xs: "0.5rem", sm: "1rem" },
                                            }}
                                            style={{ height: 400, width: 800, objectFit: "cover", marginLeft: 350, marginTop: 15 }}
                                        />
                                {/* Thêm nội dung chi tiết */}
                            </Box>
                            <Box>
                                <Typography
                                    sx={{
                                        color: 'red',
                                        fontWeight: 'bold',
                                        marginTop: '20px',
                                        fontSize: { xs: '16px', sm: '20px' },
                                    }}
                                >
                                    2. Nhược điểm:
                                </Typography>
                                <ul>
                                    <li><b>Có thể gây hại men răng nếu sử dụng không đúng cách:</b>Baking soda có đặc tính mài mòn nhẹ, nếu sử dụng quá thường xuyên hoặc quá mạnh tay có thể gây tổn thương men răng.
                                        Mặc dù baking soda không có hoạt tính chống sâu răng, nó tương thích với fluoride và ở nồng độ cao có tác dụng diệt khuẩn đối với các tác nhân gây bệnh nha chu.
                                        Tuy nhiên, baking soda không phải là giải pháp toàn diện cho các vấn đề răng miệng và không thể thay thế hoàn toàn kem đánh răng thông thường.</li>
                                    <li><b>Không thể thay thế hoàn toàn kem đánh răng:</b>Baking soda không chứa fluoride, thành phần quan trọng giúp chống sâu răng.
                                        Do đó, không nên thay thế hoàn toàn kem đánh răng bằng baking soda mà chỉ nên sử dụng kết hợp để tăng hiệu quả làm trắng.</li>



                                </ul>
                                {/* Thêm nội dung chi tiết */}
                            </Box>

                        </section>

                        <section id="notes">
                            <Typography
                                sx={{
                                    color: 'red',
                                    fontWeight: 'bold',
                                    marginTop: '30px',
                                    fontSize: { xs: '18px', sm: '24px' },
                                }}
                            >
                                IV. Lưu ý khi sử dụng Baking Soda làm trắng răng
                            </Typography>
                            <ul>
                                <li>
                                    <b> Tần suất sử dụng:</b> Chỉ nên sử dụng baking soda tối đa 2 lần/tuần để tránh gây mòn men răng.
                                </li><li>   <b>   Không dùng cho trẻ em dưới 18 tuổi: </b>Men răng của trẻ em vẫn còn non nớt và dễ bị tổn thương, nên hạn chế sử dụng baking soda để tránh gây hại.
                                </li><li>  <b>   Hạn chế sử dụng baking soda với chanh hoặc giấm: </b>Việc kết hợp với các nguyên liệu có tính axit cao như chanh và giấm cần được kiểm soát chặt chẽ về tần suất để tránh tác động xấu lên men răng.
                                </li><li>  <b>    Tham khảo ý kiến bác sĩ: </b>Đối với những người đang niềng răng hoặc có vấn đề về răng miệng, nên tham khảo ý kiến của bác sĩ nha khoa trước khi sử dụng baking soda để đảm bảo an toàn.
                                </li><li>  <b>    Kết hợp với chế độ chăm sóc răng miệng đúng cách:</b> Bên cạnh việc sử dụng baking soda, cần duy trì chế độ vệ sinh răng miệng khoa học, hạn chế đồ ăn và thức uống có màu, và sử dụng kem đánh răng chứa fluoride để bảo vệ răng tốt hơn.</li>
                            </ul>
                        </section>
                    </Box>

                </Box>
                <Box
                    sx={{
                        width: { xs: "100vw", sm: "100vw", md: "100vw" },
                        mt: "1rem",
                        mb: "1rem",
                    }}
                >
                    <Divider
                        sx={{
                            borderBottomWidth: 1,
                            borderColor: "#000",
                            width: { xs: "30%", sm: "50%", md: "70%" },
                            margin: "0 auto",
                        }}
                    />
                </Box>
                <Suspense
                    fallback={
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh", // Full screen height for vertical centering
                                width: "100vw", // Full screen width for horizontal centering
                            }}
                        >
                            <CircularProgress
                                sx={{
                                    width: { xs: "50px", sm: "70px", md: "100px" }, // Responsive width
                                    height: { xs: "50px", sm: "70px", md: "100px" }, // Responsive height
                                }}
                            />
                        </Box>
                    }
                >
                    <BookingForm />
                </Suspense>
                <Suspense
                    fallback={
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh", // Full screen height for vertical centering
                                width: "100vw", // Full screen width for horizontal centering
                            }}
                        >
                            <CircularProgress
                                sx={{
                                    width: { xs: "50px", sm: "70px", md: "100px" }, // Responsive width
                                    height: { xs: "50px", sm: "70px", md: "100px" }, // Responsive height
                                }}
                            />
                        </Box>
                    }
                >
                    <Footer />
                </Suspense>
            </Suspense>
        </Box>
    );
};
export default BakingSoda;


