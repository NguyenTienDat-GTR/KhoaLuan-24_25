import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Avatar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useUserStore from "../hooks/auth/useUserStore";

const Sidebar = ({ open, onToggleSidebar, onPathChange, menuItems }) => {
  const [openSubMenu, setOpenSubMenu] = useState({});
  const { userLoggedIn, setUserLoggedIn, token } = useUserStore();

  useEffect(() => {
    // const token = Cookies.get("token");
    if (token) {
      // const decodedUser = jwtDecode(token);
      setUserLoggedIn(token);
    }
  }, [Cookies.get("token")]);

  const toggleSubMenu = (index) => {
    setOpenSubMenu((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: open ? 240 : 60,
          boxSizing: "border-box",
          transition: "width 0.3s",
          bgcolor: "#f7f7f7",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", height: "2.7rem" }}>
          {open && (
            <>
              <Typography
                sx={{
                  color: "rgba(100,100,255)",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {userLoggedIn?.user.details.employeeName}
              </Typography>
            </>
          )}
        </Box>
        <IconButton
          onClick={onToggleSidebar}
          sx={{ color: "rgba(21,182,210,0.63)" }}
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem
              button={true}
              component={item.subItems ? "div" : Link} // Chuyển sang 'div' nếu có subItems
              to={!item.subItems ? `/${item.path}` : undefined} // Đảm bảo không có link cho các mục cha có subItems
              onClick={() => {
                if (item.subItems) {
                  toggleSubMenu(index); // Chỉ mở/đóng submenu nếu có subItems
                } else {
                  onPathChange(item.text); // Nếu không có subItems, cập nhật path
                }
              }}
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: open ? "space-between" : "center",
                alignItems: "center",
                padding: open ? "10px 10px" : "10px 5px",
                cursor: "pointer",
                fontSize: "10px !important", // Giảm kích thước font chữ
              }}
            >
              <Tooltip title={item.text} arrow placement="right">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {item.icon}
                  {open && (
                    <ListItemText
                      primary={item.text}
                      sx={{
                        marginLeft: 1,
                        color: "#000012",
                      }}
                    />
                  )}
                </Box>
              </Tooltip>
              {item.subItems && open && (
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation(); // Ngăn sự kiện nổi lên ListItem
                    toggleSubMenu(index); // Hiển thị/ẩn submenu
                  }}
                  sx={{ width: "20%" }}
                >
                  {openSubMenu[index] ? (
                    <ArrowDropDownIcon />
                  ) : (
                    <ArrowRightIcon />
                  )}
                </IconButton>
              )}
            </ListItem>
            {item.subItems && open && openSubMenu[index] && (
              <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
                {item.subItems.map((subItem, subIndex) => (
                  <ListItem
                    button={true}
                    key={subIndex}
                    component={Link}
                    to={`/${item.path}/${subItem.path}`}
                    onClick={() => onPathChange(subItem.text, true, item.text)} // Truyền thêm parentPath
                    sx={{ paddingLeft: 1 }}
                  >
                    <Tooltip title={subItem.text} arrow placement="right">
                      <ListItemText
                        primary={subItem.text}
                        sx={{ color: "#1C1C1C", fontSize: "0.7rem" }} // Giảm kích thước font chữ cho subItem
                      />
                    </Tooltip>
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
