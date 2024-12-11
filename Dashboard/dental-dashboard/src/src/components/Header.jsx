import React, {useState, useEffect} from "react";
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
import {Link} from "react-router-dom";
import {useAuth} from "../hooks/auth/useAuth";
import {useNavigate} from "react-router-dom";
import {
    ManageAccounts,
    Notifications,
    Person,
    ExitToApp,
} from "@mui/icons-material";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import useUserStore from "../hooks/auth/useUserStore";

const Header = ({sidebarOpen, currentPath, menuItems, onPathChange}) => {
    const pathParts = currentPath.split("/");
    const {logout, isLoggedIn} = useAuth();
    const {userLoggedIn, setUserLoggedIn, token} = useUserStore();
    const navigation = useNavigate();

    useEffect(() => {
        if (token) {
            setUserLoggedIn(token);
        }
    }, [token]); // Theo dõi token

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
        navigation("/dashboard/thong-tin-tai-khoan");
    };

    const handleProfile = () => {
        handleMenuClose();
        navigation("/dashboard/ho-so-ca-nhan");
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
            <Toolbar sx={{padding: "0 16px", position: "relative"}}>
                <Typography
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontSize: {xs: "1rem", sm: "1.5rem", md: "2rem"},
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
                <Box>
                    <Typography>Xin chào, {userLoggedIn?.user?.details?.employeeName}</Typography>
                </Box>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                    <Avatar
                        alt={userLoggedIn?.user?.details?.employeeName}
                        src={userLoggedIn?.user?.details?.urlAvatar}
                        sx={{width: 50, height: 50}}
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
                    sx={{display: "flex", alignItems: "center"}}
                >
                    <Person sx={{marginRight: 1}}/>
                    <Typography variant="body1">Hồ sơ cá nhân</Typography>
                </MenuItem>
                <MenuItem
                    onClick={handleAccountInfor}
                    sx={{display: "flex", alignItems: "center"}}
                >
                    <ManageAccounts sx={{marginRight: 1}}/>
                    <Typography variant="body1">Thông tin tài khoản</Typography>
                </MenuItem>
                <MenuItem
                    onClick={handleLogout}
                    sx={{display: "flex", alignItems: "center"}}
                >
                    <ExitToApp sx={{marginRight: 1}}/>
                    <Typography variant="body1">Đăng xuất</Typography>
                </MenuItem>
            </Menu>
        </AppBar>
    );
};

export default Header;
