import React from "react";
import {
  Container,
  Grid,
  Typography,
  Link,
  Box,
  // Các component khác của Material-UI tùy theo thiết kế
} from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              NHA KHOA HOÀNG KIM
            </Typography>
            <Typography variant="body2">
              Địa chỉ: 12, đường Nguyễn Văn Bảo, phường 4, Quận Gò Vấp
              <br />
              Giờ làm việc: ...
              <br />
              Hotline: ...
              <br />
              Email: ...
              <br />
              Website: ...
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              CHÍNH SÁCH - HỖ TRỢ
            </Typography>
            <Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
            <br />
            <Link href="/chinh-sach-bao-hanh">Chính sách bảo hành</Link>
            <br />
            {/* Các link khác */}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              LIÊN KẾT MẠNG XÃ HỘI
            </Typography>
            {/* Các icon mạng xã hội */}
            <Typography variant="h6" gutterBottom>
              ĐỐI TÁC THANH TOÁN
            </Typography>
            {/* Các logo đối tác */}
          </Grid>
        </Grid>
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
      </Container>
    </footer>
  );
};

export default Footer;
