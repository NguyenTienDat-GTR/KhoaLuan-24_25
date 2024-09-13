import React from "react";
import { Container, Grid, Typography, Box, Link } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Box
        maxWidth="lg"
        sx={{
          width: { xs: "100%", sm: "100%", md: "100vw" },
          // overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "100vw" },
            display: "flex",
            flexDirection: { xs: "column", sm: "row", md: "row" }, // Chiều dọc trên mobile, hàng ngang trên desktop và tablet
            justifyContent: {
              xs: "space-evenly",
              sm: "center",
              md: "center",
            }, // Căn đều các cột trên desktop và tablet
            alignItems: "flex-start",
            m: "1rem auto",
            backgroundColor: "rgba(21,182,210,0.72)",
            padding: { xs: "1rem", sm: "2rem", md: "2rem" },
            overflow: "hidden",
          }}
        >
          <Box
            className="information"
            sx={{
              flex: 1,
              marginBottom: {
                xs: "1rem",
                md: "0",
                // width: { xs: "100%", sm: "33%", md: "33%" },
                flex: 1,
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              NHA KHOA HOÀNG KIM
            </Typography>
            <Box>
              <Typography>
                Địa chỉ: <br />
                12, đường Nguyễn Văn Bảo, phường 4, Quận Gò Vấp
              </Typography>
              <Typography>Giờ làm việc: ...</Typography>
              <Typography>Hotline: ...</Typography>
              <Typography>Email: ...</Typography>
              <Typography>Website: ...</Typography>
            </Box>
          </Box>

          <Box
            className="information"
            sx={{
              flex: 1,
              marginBottom: {
                xs: "1rem",
                md: "0",
                // width: { xs: "100%", sm: "33%", md: "50px" },
                flex: 1,
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              CHÍNH SÁCH - HỖ TRỢ
            </Typography>
            <Link href="/chinh-sach-bao-mat" sx={{ display: "block" }}>
              Chính sách bảo mật
            </Link>
            <Link href="/chinh-sach-bao-hanh" sx={{ display: "block" }}>
              Chính sách bảo hành
            </Link>
            {/* Thêm các link khác */}
          </Box>

          <Box
            className="information"
            sx={{
              flex: 1,
              //  width: { xs: "100%", sm: "33%",
              md: "auto",
            }}
          >
            <Typography variant="h6" gutterBottom>
              LIÊN KẾT MẠNG XÃ HỘI
            </Typography>
            {/* Các icon mạng xã hội */}
            <Typography variant="h6" gutterBottom>
              ĐỐI TÁC THANH TOÁN
            </Typography>
            {/* Các logo đối tác */}
          </Box>
        </Box>

        <Box mt={3}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            {new Date().getFullYear()}
            {" Nha Khoa HOÀNG KIM - "}
            <Link color="inherit" href="/">
              12, đường Nguyễn Văn Bảo, phường 4, Quận Gò Vấp
            </Link>
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
