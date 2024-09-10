import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "none",
          width: "100vw",
          height: "auto",
          overflow: "hidden",
          top: 0,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "0 !important",
            margin: "0",
            boxSizing: "border-box",
          }}
        >
          <Box
            className="header"
            sx={{
              backgroundColor: "rgba(21,182,210,0.63)",
              width: "100vw",
              height: "auto",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 1000,
              padding: { xs: "0.5rem", sm: "1rem", md: "1.5rem" },
              boxSizing: "border-box",
              gap: { sm: "2", md: "0" },
              margin: "0",
            }}
          >
            <Box
              className="Name"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                width: { xs: "100%", sm: "50%" },
                boxSizing: "border-box",
                margin: "0",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "rgba(0,74,211,1)",
                  fontWeight: 900,
                  fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2.2rem" },
                }}
              >
                NHA KHOA
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  marginLeft: { xs: "0.5rem", sm: "1rem", md: "1.5rem" },
                  fontSize: { xs: "2rem", sm: "2rem", md: "3.2rem" },
                }}
              >
                HOÀNG KIM
              </Typography>
            </Box>
            <Box
              className="Contact"
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
                width: { xs: "100%", sm: "50%" },
                boxSizing: "border-box",
                margin: "0",
              }}
            >
              <Box
                className="address"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LocationOnIcon
                  sx={{
                    color: "#fff",
                    fontSize: { sm: "0.7rem", md: "1.5rem" },
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#fff",
                    fontWeight: 300,
                    fontSize: { sm: "0.7rem", md: "1.1rem" },
                  }}
                >
                  12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TP.Hồ Chí Minh
                </Typography>
              </Box>
              <Box
                className="phone number"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <PhoneIcon
                  sx={{
                    color: "#fff",
                    fontSize: { sm: "0.7rem", md: "1.5rem" },
                    fontWeight: "bold",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#fff",
                    fontWeight: 300,
                    fontSize: { sm: "0.7rem", md: "1.1rem" },
                  }}
                >
                  0123456789
                </Typography>
              </Box>
            </Box>
            <IconButton
              sx={{
                display: { xs: "block", sm: "none" },
                color: "rgba(0,120,233,0.8)",
                position: "absolute",
                fontSize: "2rem",
                top: "0rem",
                left: "0.5rem",
                zIndex: 1001,
                "&:focus": {
                  outline: "none",
                },
              }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            className="navbar"
            sx={{
              backgroundColor: "#fff",
              width: "100%",
              height: "auto",
              display: { xs: "none", sm: "flex" },
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              position: "relative",
              top: "auto",
              marginTop: "auto",
              padding: "0.5rem 0",
              boxSizing: "border-box",
              margin: "0",
            }}
          >
            <RouterLink to="/" style={{ textDecoration: "none" }}>
              <Typography
                color="rgba(0,120,233,0.8)"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 700,
                }}
              >
                Trang Chủ
              </Typography>
            </RouterLink>
            <RouterLink to="/" style={{ textDecoration: "none" }}>
              <Typography
                color="rgba(0,120,233,0.8)"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 700,
                }}
              >
                Giới thiệu
              </Typography>
            </RouterLink>
            <RouterLink to="/" style={{ textDecoration: "none" }}>
              <Typography
                color="rgba(0,120,233,0.8)"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 700,
                }}
              >
                Đặt lịch
              </Typography>
            </RouterLink>
            <RouterLink to="/" style={{ textDecoration: "none" }}>
              <Typography
                color="rgba(0,120,233,0.8)"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 700,
                }}
              >
                Bảng giá
              </Typography>
            </RouterLink>
            <RouterLink to="/" style={{ textDecoration: "none" }}>
              <Typography
                color="rgba(0,120,233,0.8)"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 700,
                }}
              >
                Niềng răng mắc cài
              </Typography>
            </RouterLink>
            <RouterLink to="/" style={{ textDecoration: "none" }}>
              <Typography
                color="rgba(0,120,233,0.8)"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 700,
                }}
              >
                Dịch vụ khác
              </Typography>
            </RouterLink>
            <RouterLink to="/" style={{ textDecoration: "none" }}>
              <Typography
                color="rgba(0,120,233,0.8)"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 700,
                }}
              >
                Kiến thức
              </Typography>
            </RouterLink>
            <RouterLink to="/" style={{ textDecoration: "none" }}>
              <Typography
                color="rgba(0,120,233,0.8)"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 700,
                }}
              >
                Liên hệ
              </Typography>
            </RouterLink>
          </Box>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerClose}
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            <Box
              sx={{
                width: 230,
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                backgroundColor: "#fff",
                boxSizing: "border-box",
                gap: "1rem",
              }}
            >
              <RouterLink to="/" style={{ textDecoration: "none" }}>
                <Typography
                  color="rgba(0,120,233,0.8)"
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    fontWeight: 700,
                  }}
                >
                  Trang Chủ
                </Typography>
              </RouterLink>
              <RouterLink to="/" style={{ textDecoration: "none" }}>
                <Typography
                  color="rgba(0,120,233,0.8)"
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    fontWeight: 700,
                  }}
                >
                  Giới thiệu
                </Typography>
              </RouterLink>
              <RouterLink to="/" style={{ textDecoration: "none" }}>
                <Typography
                  color="rgba(0,120,233,0.8)"
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    fontWeight: 700,
                  }}
                >
                  Đặt lịch
                </Typography>
              </RouterLink>
              <RouterLink to="/" style={{ textDecoration: "none" }}>
                <Typography
                  color="rgba(0,120,233,0.8)"
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    fontWeight: 700,
                  }}
                >
                  Bảng giá
                </Typography>
              </RouterLink>
              <RouterLink to="/" style={{ textDecoration: "none" }}>
                <Typography
                  color="rgba(0,120,233,0.8)"
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    fontWeight: 700,
                  }}
                >
                  Niềng răng mắc cài
                </Typography>
              </RouterLink>
              <RouterLink to="/" style={{ textDecoration: "none" }}>
                <Typography
                  color="rgba(0,120,233,0.8)"
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    fontWeight: 700,
                  }}
                >
                  Dịch vụ khác
                </Typography>
              </RouterLink>
              <RouterLink to="/" style={{ textDecoration: "none" }}>
                <Typography
                  color="rgba(0,120,233,0.8)"
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    fontWeight: 700,
                  }}
                >
                  Kiến thức
                </Typography>
              </RouterLink>
              <RouterLink to="/" style={{ textDecoration: "none" }}>
                <Typography
                  color="rgba(0,120,233,0.8)"
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    fontWeight: 700,
                  }}
                >
                  Liên hệ
                </Typography>
              </RouterLink>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
