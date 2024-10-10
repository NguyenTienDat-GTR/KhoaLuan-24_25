import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Avatar,
  Tooltip, // Nhập Tooltip
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Sidebar = ({ open, onToggleSidebar, onPathChange, menuItems }) => {
  const [openSubMenu, setOpenSubMenu] = useState({});

  const toggleSubMenu = (index) => {
    setOpenSubMenu((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const user = {
    name: "Nguyễn Văn An",
    avatarUrl: "https://picsum.photos/200",
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
              <Avatar
                alt={user.name}
                src={user.avatarUrl}
                sx={{ marginRight: 1, cursor: "pointer" }}
              />
              <span style={{ color: "rgba(100,100,255)", fontWeight: "bold" }}>
                {user.name}
              </span>
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
              component={Link}
              to={`/${item.path}`} // Sử dụng item.path
              onClick={() => onPathChange(item.text)} // Truyền item.path thay vì item.text
              sx={{
                display: "flex",
                justifyContent: open ? "flex-start" : "center",
                alignItems: "center",
                padding: open ? "10px 20px" : "10px 5px",
              }}
            >
              <Tooltip title={item.text} arrow placement="right">
                {/* Thêm Tooltip */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {item.icon}
                  {open && (
                    <ListItemText
                      primary={item.text}
                      sx={{ marginLeft: 1, color: "#000012" }}
                    />
                  )}
                </Box>
              </Tooltip>
              {item.subItems && open && (
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation(); // Ngăn sự kiện nổi lên ListItem
                    event.preventDefault(); // Ngăn điều hướng trang
                    toggleSubMenu(index); // Hiển thị/ẩn submenu
                  }}
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
                        sx={{ color: "#1C1C1C", fontSize: "0.1rem" }}
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
