import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Divider } from "@mui/material";
import CreateAppointmentRequest from "../Services/createAppointmentRequest";

import caoVoi from "..//images/pricelist/cao-voi-rang.png"; // Chỉnh lại đường dẫn cho đúng
import cercon from "..//images/pricelist/cercon.png";
import serrconHT from "..//images/pricelist/cercon-ht.jpg";
import ddbio from "..//images/pricelist/ddbio.jpg";
import lavaPlus from "..//images/pricelist/Lava-Plus.jpg";
import nhaChu from "..//images/pricelist/nha-chu.jpg";
import nhaKhoaTreEm from "..//images/pricelist/nha-khoa-tre-em.jpg";
import orodentBleach from "..//images/pricelist/orodent-bleachjpg.jpg";
import rangSuEmax from "..//images/pricelist/rang-su-emax.jpg";
import spGold from "..//images/pricelist/sp-gold.png";
import sauRang from "..//images/pricelist/sau-rang.jpg";
import spWhite from "..//images/pricelist/sp-white.png";
import suDuc from "..//images/pricelist/su-dua.png";
import suMy from "..//images/pricelist/su-my.jpg";
import suTitan from "..//images/pricelist/su-titan.jpg";
import tayRang from "..//images/pricelist/tay-trang-rang.jpg";
import trongSuot from "..//images/pricelist/trong-suot.jpg";
import Zirconia from "..//images/pricelist/zirconia.jpg";
import danSu from "..//Services/img/dan-su/dan-su-venner.jpg";
import tramRang from "..//Services/img/tram_rang/tram-rang.jpg";
import rangThaoLap from "..//Services/img/phuc-hinh/rang-gia-thao-lap.jpg";
import thaoLap from "..//Services/img/nieng-rang/thao-lap.jpg";
import rangMacCai from "..//Services/img/nieng-rang/nieng-rang-mac-cai.jpg";
import Implant from "..//images/intro/TRIP.jpg";

import nuou from "..//Services/img/benh/nuou.jpg";

import tuy from "..//Services/img/benh/tuy.jpg";


const PriceService = () => {
  const services = [
    {
      categoryId: 1,
      categoryName: "Nha khoa thẩm mỹ",
      services: [
        {
          serviceId: 2,
          name: "Cạo vôi răng",
          price: "99.000 VNĐ/hàm",
          img: caoVoi,
        },
        {
          serviceId: 3,
          name: "Tẩy trắng răng",
          price: "99.000 VNĐ/hàm",
          img: tayRang,
        },
        {
          serviceId: 4,
          name: "Dán sứ Veener",
          price: "6.000.000 VNĐ/răng",
          img: danSu,
        },
        {
          serviceId: 5,
          name: "Trám răng",
          price: "99.000 VNĐ/răng",
          img: tramRang,
        },
      ],

    },
    {
      categoryId: 6,
      categoryName: "ĐIỀU TRỊ LỢI – NHA CHU",

      services: [
        {
          serviceId: 7,
          name: "Điều trị sâu răng  ",
          price: "500.000 - 1.000.000 VNĐ/răng",
          img: sauRang,
        },
        {
          serviceId: 8,
          name: "Điều trị viêm nha chu ",
          price: "500.000 - 1.000.000 VNĐ/răng",
          img: nhaChu,
        },
        {
          serviceId: 9,
          name: "Điều trị nướu",
          price: "500.000 - 1.000.000 VNĐ/răng",
          img: nuou,
        },
        {
          serviceId: 10,
          name: "Điều trị tủy",
          price: "500.000 - 1.000.000 VNĐ/răng",
          img: tuy,
        },
        {
          serviceId: 11,
          name: "Nha khoa trẻ em",
          price: "500.000 - 1.000.000 VNĐ/răng",
          img: nhaKhoaTreEm,
        },

      ],
    },
    {
      categoryId: 12,
      categoryName: "niềng răng cố định - chỉnh nha",
      services: [
        {
          serviceId: 13,
          name: "Niềng răng mắc cài",
          price: "30.000.000 - 50.000.000 VNĐ/liệu trình",
          img: rangMacCai,
        },
        {
          serviceId: 14,
          name: "Niềng răng tháo lắp",
          price: "5.000.000 - 8.000.000 VNĐ/hàm",
          img: thaoLap,
        },
        {
          serviceId: 15,
          name: "Niềng răng trong suốt",
          price: "32.000.000 - 70.000.000 VNĐ/hàm",
          img: trongSuot,
        },
      ],
    },
    {
      categoryId: 16,
      categoryName: "phục hình răng đã mất",
      services: [
        {
          serviceId: 17,
          name: "Hàm giả tháo lắp",
          price: "800.000 - 1.000.000 VNĐ/răng",
          img: rangThaoLap,
        },
        {
          serviceId: 18,
          name: "Cấy ghép Implant",
          price: "3.000.000 - 13.000.000 VNĐ/răng",
          img: Implant,
        },

      ],
    },
    {
      categoryId: 19,
      categoryName: "răng sứ",
      services: [
        {
          serviceId: 20,
          name: "Sứ kim loại Titan",
          price: "1.500.000 VNĐ/răng",
          img: suTitan,
        },
        {
          serviceId: 21,
          name: "Sứ kim loại Mỹ",
          price: "800.000  VNĐ/răng",
          img: suMy,
        },
        {
          serviceId: 22,
          name: "Sứ kim loại Đức",
          price: "1.000.000  VNĐ/răng",
          img: suDuc,
        },
        {
          serviceId: 23,
          name: "Sứ Zirconia ",
          price: "2.200.000  VNĐ/răng",
          img: Zirconia,
        },
        {
          serviceId: 24,
          name: "Sứ Cercon",
          price: "3.000.000  VNĐ/răng",
          img: cercon,
        },
        {
          serviceId: 25,
          name: "Sứ Cercon HT",
          price: "3.900.000  VNĐ/răng",
          img: serrconHT,
        },
        {
          serviceId: 26,
          name: "Sứ DDBIO ",
          price: "3.500.000 VNĐ/răng",
          img: ddbio,
        },
        {
          serviceId: 27,
          name: "Sứ Emax ",
          price: "4.900.000  VNĐ/răng",
          img: rangSuEmax,
        },
        {
          serviceId: 28,
          name: "Sứ Lava Plus",
          price: "6.000.000  VNĐ/răng",
          img: lavaPlus,
        },
        {
          serviceId: 29,
          name: "Sứ Orodent Bleach",
          price: "12.000.000  VNĐ/răng",
          img: orodentBleach,
        },
        {
          serviceId: 30,
          name: "Sứ Orodnet White",
          price: "7.000.000  VNĐ/răng",
          img: spWhite,
        },
        {
          serviceId: 31,
          name: "Sứ Orodent Gold",
          price: "8.000.000  VNĐ/răng",
          img: spGold,
        },
        // {
        //   serviceId: 5,
        //   name: "Sứ kim loại Titan",
        //   price: "1.000.000",
        //   img: ,
        // },
      ],
    },

  ];
  const [selectedService, setSelectedService] = useState(null);
  // const handleMouseEnter = (service) => {
  //   console.log('Selected Service:', service);
  //   setSelectedService(service);
  // };

  // const handleMouseLeave = () => {
  //   setSelectedService(null);
  // };
  const handleClick = (service) => {
    setSelectedService(service);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "90%", sm: "90%", md: "80%" },
        margin: { xs: "0 0", sm: "0 auto", md: "0 auto" },
        padding: { xs: "1rem 0.5rem", sm: "1rem 0.5rem", md: "1rem 0.5rem" },
      }}
    >
      {services.map((service) => (
        <Box
          key={service.categoryId}
          sx={{
            marginBottom: "1.5rem",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "primary.main",
              marginBottom: "1rem",
              textTransform: "uppercase",
              fontSize: { xs: "2rem", sm: "2rem", md: "2rem" },
            }}
          >
            {service.categoryName}
          </Typography>

          <Grid container spacing={2} sx={{ padding: "0.5rem" }}>
            {service.services.map((item) => (
              <React.Fragment key={`${service.categoryId}-${item.serviceId}`}>
                <Grid
                  item
                  xs={7}
                  sm={6}
                  md={6}
                  sx={{
                    textAlign: "left",
                    fontWeight: "bold",
                    marginTop: { md: "4rem", sm: "3rem", xs: "1rem" },
                    fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                  }}
                >
                  {item.name}
                  {item.img && (
                    <Box
                      component="img"
                      src={item.img}
                      sx={{
                        width: { xs: "8rem", sm: "15rem", md: "20rem" },
                        height: { xs: "4rem", sm: "10rem", md: "10rem" },
                        margin: { xs: "-3rem 10rem 1rem", md: "-6rem 28rem 1rem" },
                      }}
                     
                    />
                  )}
                </Grid>

                <Grid
                  item
                  xs={5}
                  sm={6}
                  md={6}
                  sx={{
                    textAlign: "right",
                    color: "secondary.main",
                    marginTop: { md: "4rem", sm: "3rem", xs: "1rem" },
                    fontSize: { xs: "1rem", sm: "1.5rem", md: "1.5rem" },
                  }}
                  onClick={() => handleClick(item)}
                >
                  {item.price}
                  <Typography color="gray">Nhấn vào để đặt lịch</Typography>
                </Grid>
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
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      ))}
      {selectedService && (
        <CreateAppointmentRequest
          open={!!selectedService}
          handleClose={() => setSelectedService(null)}
          selectedService={selectedService}
        />
      )}
    </Box>
  );
};

export default PriceService;