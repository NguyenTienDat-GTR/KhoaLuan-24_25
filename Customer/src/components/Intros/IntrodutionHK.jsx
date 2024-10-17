import React from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import rang1 from "..//images/intro/r3.png";
import rang2 from "..//images/intro/r1.png";

const IntrodutionHK = () => {
  return (
    <Box>
      <Box
        className="container"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          mt: { xs: "none", sm: "1rem", md: "1rem" },
          gap: "2rem",
          width: { xs: "100vw", sm: "100vw", md: "100vw" },
        }}
      >
        <Box
          className="container-text"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100vw", sm: "50%", md: "60%" }, // Giảm width của container-text
            height: { xs: "auto", sm: "auto", md: "auto" },
            mt: { xs: "1rem", sm: "1rem", md: "1rem" },
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
                marginLeft: "50px",
              }}
            >
              Khắc phục mọi tình trạng răng
            </Typography>
            <Box
              sx={{
                width: "100%",
                fontSize: {
                  xs: "1rem",
                  sm: "1rem",
                  md: "1.2rem",
                },
              }}
            >
              <Typography sx={{ textAlign: "justify", textIndent: "30px" }}>
                <strong>Nha Khoa HBT</strong> là một hệ thống phòng khám
                nha khoa nổi tiếng, chuyên cung cấp các dịch vụ chăm sóc và điều
                trị răng miệng chất lượng cao. Với hơn nhiều năm kinh nghiệm
                trong ngành, sở hữu đội ngũ bác sĩ nha khoa giàu kinh nghiệm và
                được đào tạo chuyên sâu trong các lĩnh vực như chỉnh nha, cấy
                ghép Implant, bọc răng sứ, tẩy trắng răng, và các giải pháp thẩm
                mỹ nha khoa khác.
              </Typography>
              <Typography sx={{ textAlign: "justify", textIndent: "30px" }}>
                Phòng khám cam kết sử dụng trang thiết bị hiện đại, cùng với các
                công nghệ tiên tiến trong điều trị nhằm mang đến hiệu quả điều
                trị tối ưu và an toàn cho khách hàng. Đặc biệt, Nha Khoa HBT luôn chú trọng đến chất lượng dịch vụ và sự hài lòng của
                khách hàng, với phương châm “Nụ cười là niềm tin”.
              </Typography>
              <Typography sx={{ textAlign: "justify", textIndent: "30px" }}>
                Hệ thống phòng khám của Nha Khoa HBT không chỉ tập trung
                vào việc điều trị mà còn cung cấp các gói dịch vụ thẩm mỹ răng
                miệng, giúp khách hàng cải thiện thẩm mỹ và tự tin hơn trong
                giao tiếp.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          className="container-image"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(1, 0fr)", sm: "repeat(1, 1fr)" },
            gridRowGap: { xs: "1rem", sm: "1rem", md: "1rem" },
            width: { xs: "100vw", sm: "45%", md: "50%" },
            height: "auto",
            mr: { xs: "0", sm: "3rem", md: "2rem" },
            paddingX: { xs: "1rem", sm: "1rem", md: "1rem" },
          }}
        >
          <Box
            component="img"
            src={rang1}
            alt="giới thiệu nha khoa"
            sx={{
              width: { xs: "100vw", sm: "26rem", md: "100%" }, // Giảm width của ảnh
              height: { xs: "15rem", sm: "30rem", md: "34rem" },
              margin: { xs: "0 auto", sm: "0", md: "0" },
              objectFit: "full",
              mx: { xs: "auto" }, // Canh giữa ảnh
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100vw", sm: "100vw", md: "100vw" },
          mt: "1rem",
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
        className="container"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          mt: { xs: "none", sm: "1rem", md: "1rem" },
          gap: "2rem",
          width: { xs: "100vw", sm: "100vw", md: "100vw" },
        }}
      >
        <Box
          className="container-text"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "95%", sm: "50%", md: "50%" }, // Giảm width của container-text
            height: { xs: "auto", sm: "auto", md: "auto" },
            mt: { xs: "1rem", sm: "0", md: "0" },
            // px: { xs: "1rem", sm: "0", md: "0" }, // Padding horizontal trên mobile
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", sm: "90%", md: "80%" },
              height: "auto",
              ml: { xs: "0", sm: "0", md: "2rem" },
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
            <Box
              sx={{
                width: "100%",
                fontSize: {
                  xs: "0.8rem",
                  sm: "1rem",
                  md: "1.2rem",
                },
              }}
            >
              <Typography sx={{ textAlign: "justify", textIndent: "30px" }}>
                <strong>Nha Khoa HBT </strong>cam kết mang đến dịch vụ nha
                khoa chất lượng cao, an toàn và hiện đại nhất cho khách hàng.
              </Typography>
              <Typography sx={{ textAlign: "justify", textIndent: "30px" }}>
                Phòng khám không chỉ hướng tới việc cải thiện nụ cười cho khách
                hàng mà còn tạo dựng uy tín thông qua chất lượng dịch vụ và sự
                hài lòng của khách hàng.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          className="container-text"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", sm: "60%", md: "50%" }, // Giảm width của container-text
            height: { xs: "auto", sm: "auto", md: "auto" },
            mt: { xs: "0", sm: "0", md: "0" },
            // px: { xs: "1rem", sm: "0", md: "0" }, // Padding horizontal trên mobile
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "95%", sm: "90%", md: "80%" },
              height: "auto",
              ml: { xs: "0", sm: "0", md: "2rem" },
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
            <List>
              <ListItem
                sx={{
                  textAlign: "justify",
                  width: "100%",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                    md: "1.2rem",
                  },
                  textIndent: "30px",
                }}
              >
                Nha Khoa HBT mong muốn trở thành một trong những hệ thống
                nha khoa hàng đầu tại Việt Nam, đem đến tiêu chuẩn quốc tế trong
                chăm sóc sức khỏe răng miện
              </ListItem>

              <ListItem
                sx={{
                  textAlign: "justify",
                  width: "100%",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                    md: "1.2rem",
                  },
                  textIndent: "30px",
                }}
              >
                Phòng khám tập trung vào việc nâng cao sức khỏe răng miệng và
                cải thiện thẩm mỹ nụ cười, giúp mọi khách hàng đều có thể tự tin
                trong giao tiếp.
              </ListItem>
              <ListItem
                sx={{
                  textAlign: "justify",
                  width: "100%",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                    md: "1.2rem",
                  },
                  textIndent: "30px",
                }}
              >
                Bên cạnh đó, Nha Khoa HBT cũng chú trọng đến việc giáo dục
                sức khỏe răng miệng, giúp khách hàng hiểu rõ hơn về cách chăm
                sóc răng miệng hiệu quả.
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
      <Box
        className="container"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          mt: { xs: "none", sm: "2rem", md: "2rem" },
          gap: "2rem",
          width: { xs: "100vw", sm: "100vw", md: "100vw" },
        }}
      >
        <Box
          className="container-image"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(1, 0fr)", sm: "repeat(2, 1fr)" },
            gridRowGap: { xs: "1rem", sm: "0.5rem", md: "1rem" },
            width: { xs: "95%", sm: "40%", md: "50%" },
            height: "auto",
            mr: { xs: "0", sm: "3rem", md: "2rem" },
            paddingX: { xs: "1rem", sm: "1rem", md: "1rem" },
          }}
        >
          <Box
            component="img"
            src={rang2}
            alt="giới thiệu nha khoa"
            sx={{
              width: { xs: "21rem", sm: "27rem", md: "40rem" }, // Giảm width của ảnh
              height: { xs: "15rem", sm: "25rem", md: "35rem" },
              objectFit: "cover",
              margin: { xs: "0 auto", sm: "0 auto", md: "0 auto" },
            }}
          />
        </Box>
        <Box
          className="container-text"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100vw", sm: "60vw", md: "50vw" }, // Giảm width của container-text
            height: { xs: "auto", sm: "auto", md: "auto" },
            mt: { xs: "0", sm: "0", md: "0" },
            // px: { xs: "1rem", sm: "0", md: "0" }, // Padding horizontal trên mobile
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "flex-start",
              width: { xs: "100%", sm: "100%", md: "100%" },
              height: "auto",
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
                ml: { xs: "0.5rem", sm: "0", md: "0" },
              }}
            >
              Giá trị cốt lõi
            </Typography>

            <List
              sx={{
                width: "95%",
                fontSize: {
                  xs: "1rem",
                  sm: "1rem",
                  md: "1.2rem",
                },
                mr: { xs: "0.5rem", sm: "0", md: "0.5rem" },
              }}
            >
              <ListItem>
                <ListItemText
                  primary={
                    <Typography component="span">
                      <strong>Chất lượng: </strong>
                      Đảm bảo chất lượng dịch vụ cao nhất với đội ngũ bác sĩ
                      chuyên nghiệp, trang thiết bị hiện đại và quy trình điều
                      trị an toàn.
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={
                    <Typography component="span">
                      <strong>Tận Tâm: </strong>
                      Mọi hoạt động của Nha Khoa HBT đều lấy khách hàng
                      làm trung tâm, chú trọng đến sự thoải mái và hài lòng của
                      khách hàng.
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={
                    <Typography component="span">
                      <strong>Đổi mới: </strong>
                      Luôn cập nhật các công nghệ tiên tiến và phương pháp điều
                      trị mới nhất để mang lại trải nghiệm tốt nhất cho khách
                      hàng.
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={
                    <Typography component="span">
                      <strong>Đáng tin cậy: </strong>
                      Đảm bảo mọi dịch vụ nha khoa đều minh bạch, chính xác và
                      đáp ứng tiêu chuẩn y tế cao.
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={
                    <Typography component="span">
                      <strong>Phát triển bền vững: </strong>
                      Xây dựng một môi trường làm việc bền vững và chuyên
                      nghiệp, luôn hướng đến sự phát triển lâu dài và bền vững
                      của công ty.
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default IntrodutionHK;
