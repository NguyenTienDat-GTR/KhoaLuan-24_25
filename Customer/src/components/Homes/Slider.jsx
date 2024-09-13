import React from "react";
import { Box, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const items = [
  {
    name: "First Slide",
    description: "This is the first carousel slide description",
    img: "https://picsum.photos/2000/500",
  },
  {
    name: "Second Slide",
    description: "This is the second carousel slide description",
    img: "https://picsum.photos/2001/500",
  },
];

const Slider = () => {
  return (
    <Box
      sx={{
        width: "100vw", // Full screen width
        height: "auto",
      }}
    >
      <Carousel
        sx={{
          width: "100%", // Ensure the carousel takes up the full width of its container
          "& .MuiPaper-root": {
            width: "100%", // Ensure each carousel item takes up the full width
            height: { xs: "20rem", sm: "25rem", md: "30rem" }, // Responsive height
          },
        }}
      >
        {items.map((item, i) => (
          <CarouselItem key={i} item={item} />
        ))}
      </Carousel>
    </Box>
  );
};

function CarouselItem(props) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 0,
        height: { xs: "20rem", sm: "25rem", md: "30rem" },
        backgroundColor: "transparent", // Ensure background doesn't affect layout
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        sx={{
          width: "100%",
          height: { xs: "20rem", sm: "25rem", md: "30rem" },
          objectFit: "cover", // Ensure the image covers the area without distortion
        }}
        src={props.item.img}
        alt={props.item.name}
      />
    </Paper>
  );
}

export default Slider;
