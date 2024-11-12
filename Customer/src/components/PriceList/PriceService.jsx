import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Divider } from "@mui/material";
import CreateAppointmentRequest from "../Services/createAppointmentRequest";

import useServiceStore from "../../hooks/useServiceStore";

const PriceService = () => {
  const { category, getAllService } = useServiceStore();

  useEffect(() => {
    getAllService();
  }, []);

  const [selectedService, setSelectedService] = useState(null);

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
        width: { xs: "90%", sm: "90%", md: "90%" },
        margin: { xs: "0 0", sm: "0 auto", md: "0 auto" },
        padding: { xs: "1rem 0.5rem", sm: "1rem 0.5rem", md: "1rem 0.5rem" },
      }}
    >
      {category.map((service) => (
        <Box
          key={service._id}
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
            {service.typeName}
          </Typography>

          <Grid container spacing={2} sx={{ padding: "0.5rem" }}>
            {service.serviceList.map((item) => (
              <React.Fragment key={`${service._id}-${item._id}`}>
                <Grid
                  item
                  xs={7}
                  sm={6}
                  md={6}
                  sx={{
                    textAlign: "left",
                    fontWeight: "bold",
                    marginTop: { md: "4rem", sm: "3rem", xs: "1rem" },
                    fontSize: { xs: "1rem", sm: "1.5rem", md: "1.5rem" },
                  }}
                >
                  {item.name}
                  {item.imageUrls.length > 0 && (
                    <Box
                      component="img"
                      src={item.imageUrls[0]}
                      alt={item.name}
                      sx={{
                        width: { xs: "8rem", sm: "15rem", md: "20rem" },
                        height: { xs: "4rem", sm: "10rem", md: "10rem" },
                        margin: {
                          xs: "-3rem 10rem 1rem",
                          md: "-6rem 28rem 1rem",
                        },
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
                >
                  {item.priceRange}
                  <Typography
                    color="gray"
                    onClick={() => handleClick(item)}
                    sx={{ cursor: "pointer" }}
                  >
                    Nhấn để đặt lịch
                  </Typography>
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
