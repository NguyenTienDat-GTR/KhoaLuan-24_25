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
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { Person, ExitToApp } from "@mui/icons-material";
import { useAuth } from "../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

const Header = ({ sidebarOpen, currentPath, menuItems, onPathChange }) => {
  const pathParts = currentPath.split("/");
  const { logout, isLoggedIn } = useAuth();
  const navigation = useNavigate();

  const generateLink = (index) => {
    if (pathParts[index].trim() === "Tổng quan") {
      return "/dashboard/tong-quan";
    }

    const menuItem = menuItems.find(
      (item) => item.text === pathParts[index].trim()
    );
    if (menuItem) {
      return `/${menuItem.path}`;
    }

    return "//dashboard/tong-quan";
  };

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
          top: "1%",
          right: "5%",
          position: "fixed",
          width: "auto",
        }}
      >
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <Avatar alt="User Name" src="/path-to-avatar.jpg" />
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
          onClick={handleMenuClose}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Person sx={{ marginRight: 1 }} />
          <Typography variant="body1">Profile</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ExitToApp sx={{ marginRight: 1 }} />
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>

      {/* Path Navigation */}
      <Box
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
      </Box>
    </AppBar>
  );
};

export default Header;
