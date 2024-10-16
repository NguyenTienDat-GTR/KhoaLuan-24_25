import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import {
  ManageAccounts,
  Notifications,
  Person,
  ExitToApp,
} from "@mui/icons-material";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Header = ({ sidebarOpen, currentPath, menuItems, onPathChange }) => {
  const pathParts = currentPath.split("/");
  const { logout, isLoggedIn } = useAuth();
  const [user, setUser] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
  }, [Cookies.get("token")]); // Theo dõi token

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (isLoggedIn) {
      logout(); // Call logout function
      handleMenuClose(); // Close the menu
      navigation("/dashboard/login"); // Navigate to login page
    }
  };
  const handleAccountInfor = () => {
    handleMenuClose();
    navigation("/dashboard/account-info");
  };

  const handleProfile = () => {
    handleMenuClose();
    navigation("/dashboard/profile");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      // Handle actions after logout if needed
    }
  }, [isLoggedIn]);

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: sidebarOpen ? 240 : 60,
        transition: "left 0.3s",
        width: "100vw",
        height: "4rem",
      }}
    >
      <Toolbar sx={{ padding: "0 16px", position: "relative" }}>
        <Typography
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
          }}
        >
          Nha Khoa HBT - Dashboard
        </Typography>
      </Toolbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // right: sidebarOpen ? "22%" : "10%",
          top: "-10",
          right: "5%",
          position: "fixed",
          width: "auto",
        }}
      >
        <IconButton color="inherit">
          <Notifications />
        </IconButton>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <Avatar
            alt="User Name"
            src={user?.user.details?.urlAvatar}
            sx={{ width: 50, height: 50 }}
          />
        </IconButton>
      </Box>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            position: "absolute",
            right: 10,
            top: "4rem",
          },
        }}
      >
        <MenuItem
          onClick={handleProfile}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Person sx={{ marginRight: 1 }} />
          <Typography variant="body1">Hồ sơ cá nhân</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleAccountInfor}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ManageAccounts sx={{ marginRight: 1 }} />
          <Typography variant="body1">Thông tin tài khoản</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ExitToApp sx={{ marginRight: 1 }} />
          <Typography variant="body1">Đăng xuất</Typography>
        </MenuItem>
      </Menu>

      {/* Path Navigation */}
      {/* <Box
        className="path"
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f7f7f7",
          width: "100%",
          paddingLeft: "1rem",
          color: "#808080",
        }}
      >
        {pathParts.map((part, index) => (
          <span key={index}>
            <Link
              to={generateLink(index)}
              onClick={() => onPathChange(part)}
              style={{ textDecoration: "none", color: "#8B8970" }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: "inline" }}
              >
                {part}
              </Typography>
            </Link>
            {index < pathParts.length - 1 && (
              <Typography
                variant="h6"
                noWrap
                component="span"
                sx={{ margin: "0 0.5rem" }}
              >
                /
              </Typography>
            )}
          </span>
        ))}
      </Box> */}
    </AppBar>
  );
};

export default Header;
