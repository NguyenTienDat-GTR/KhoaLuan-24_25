import React, { Suspense, useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import EventNoteIcon from "@mui/icons-material/EventNote";
// import PeopleIcon from "@mui/icons-material/People";
// import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
// import DescriptionIcon from "@mui/icons-material/Description";
// import PaymentIcon from "@mui/icons-material/Payment";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
// import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Dashboard,
  EventNote,
  People,
  AssignmentInd,
  Description,
  Payment,
  BarChart,
  MedicalServices,
  ArrowRight,
  ManageAccounts,
  EventNoteTwoTone,
  PeopleAltSharp,
} from "@mui/icons-material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { AuthProvider, useAuth } from "./hooks/auth/useAuth";

// Lazy load components
const Overview = React.lazy(() => import("./pages/Overview"));
const Login = React.lazy(() => import("./pages/Login"));
const ManageAccount = React.lazy(() => import("./pages/ManageAccount"));
const ModalAuthorization = React.lazy(() =>
  import("./components/ModalAuthorization")
);

const LazyComponent = ({ Component }) => {
  const [isInView, setIsInView] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setIsInView(true);
    }
  }, [inView]);

  return (
    <Box ref={ref} sx={{ margin: "0 auto" }}>
      {isInView ? (
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // top: "50%",
                // left: "50%",
                height: "100vh", // Full screen height for better centering
                width: "100%",
              }}
            >
              <CircularProgress
                sx={{
                  color: "rgba(21,182,210,0.63)",
                  width: { xs: "40px", sm: "50px", md: "60px" }, // Responsive size
                  height: { xs: "40px", sm: "50px", md: "60px" }, // Make sure both width and height are set
                }}
              />
            </Box>
          }
        >
          <Component />
        </Suspense>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh", // Responsive height when not in view
            color: "#aaa",
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" }, // Responsive font size
          }}
        >
          Kéo xuống để tải thêm...
        </Box>
      )}
    </Box>
  );
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Trạng thái mở hoặc thu gọn sidebar
  const [currentPath, setCurrentPath] = useState("Tổng quan");
  const [fullPath, setFullPath] = useState("Tổng quan"); // lưu full path
  const { isLoggedIn } = useAuth() || {}; // Sử dụng giá trị mặc định nếu useAuth không trả về gì
  const [openModal, setOpenModal] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePathChange = (newPath, isSubMenu = false, parentPath = "") => {
    if (newPath === "Tổng quan") {
      setFullPath("Tổng quan");
      setCurrentPath("Tổng quan");
    } else if (isSubMenu && parentPath) {
      setFullPath(`Tổng quan / ${parentPath} / ${newPath}`);
      setCurrentPath(`Tổng quan / ${parentPath} / ${newPath}`);
    } else {
      // Nếu chọn trang cha, xóa bỏ trang con
      if (!isSubMenu) {
        const parent = menuItems.find((item) => item.text === newPath);
        if (parent) {
          setFullPath(`Tổng quan / ${parent.text}`);
          setCurrentPath(`Tổng quan / ${parent.text}`);
        }
      }
    }
  };

  const isLoginPage = window.location.pathname === "/dashboard/login"; //kiểm tra có phải trang login hay không

  const menuItems = [
    {
      text: "Tổng quan",
      icon: <Dashboard sx={{ color: "rgba(21,182,210)" }} />,
      path: "dashboard/tong-quan",
    },
    {
      text: "Lịch hẹn",
      icon: <EventNoteTwoTone sx={{ color: "rgba(21,182,210)" }} />,
      path: "dashboard/lich-hen",
    },
    {
      text: "Dịch vụ",
      icon: <MedicalServices sx={{ color: "rgba(21,182,210)" }} />,
      path: "dashboard/dich-vu",
      subItems: [
        {
          text: "Dịch vụ tổng quát",
          path: "tong-quat",
          icon: <ArrowRight />,
        },
        {
          text: "Dịch vụ chuyên khoa",
          path: "chuyen-khoa",
          icon: <ArrowRight />,
        },
      ],
    },
    {
      text: "Quản lý bệnh nhân",
      icon: <People sx={{ color: "rgba(21,182,210)" }} />,
      path: "dashboard/quan-ly-benh-nhan",
    },
    {
      text: "Quản lý bác sĩ và nhân viên",
      icon: <AssignmentInd sx={{ color: "rgba(21,182,210)" }} />,
      path: "dashboard/quan-ly-bac-si-nhan-vien",
    },
    {
      text: "Hồ sơ điều trị",
      icon: <Description sx={{ color: "rgba(21,182,210)" }} />,
      path: "dashboard/ho-so-dieu-tri",
    },
    {
      text: "Thanh toán và hóa đơn",
      icon: <Payment sx={{ color: "rgba(21,182,210)" }} />,
      path: "dashboard/thanh-toan-hoa-don",
    },
    {
      text: "Báo cáo",
      icon: <BarChart sx={{ color: "rgba(21,182,210)" }} />,
      path: "dashboard/bao-cao",
    },
    {
      text: "Quản lí tài khoản",
      icon: <ManageAccounts sx={{ color: "rgba(21,182,210)" }} />,
      path: "dashboard/tai-khoan",
    },
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      setOpenModal(true); // Show modal if not logged in
    }
  }, [isLoggedIn]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ display: isLoginPage ? "block" : "flex" }}>
      {/* Sidebar */}

      {isLoggedIn && (
        <Sidebar
          open={sidebarOpen}
          onToggleSidebar={handleToggleSidebar}
          onPathChange={handlePathChange}
          menuItems={menuItems}
        />
      )}

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, padding: 0 }}>
        {/* Header */}

        {isLoggedIn && (
          <Header
            sidebarOpen={sidebarOpen}
            currentPath={fullPath}
            menuItems={menuItems}
            onPathChange={handlePathChange}
          />
        )}
        {/* Truyền currentPath cho Header */}
        {/* Routes */}
        <Box sx={{ mt: !isLoggedIn ? 0 : "5rem" }}>
          {/* Thêm margin-top cho không gian giữa Header và Overview */}
          <Routes>
            {isLoggedIn ? (
              <>
                <Route
                  path="/dashboard/tong-quan"
                  element={
                    <LazyComponent
                      Component={() => <Overview isSidebarOpen={sidebarOpen} />}
                    />
                  }
                />
                <Route
                  path="/dashboard/tai-khoan"
                  element={
                    <LazyComponent
                      Component={() => (
                        <ManageAccount isSidebarOpen={sidebarOpen} />
                      )}
                    />
                  }
                />
              </>
            ) : (
              <Route
                path="/dashboard/*"
                element={
                  <LazyComponent
                    Component={() => (
                      <ModalAuthorization
                        open={openModal}
                        onClose={handleCloseModal}
                      />
                    )}
                  />
                }
              />
            )}
            <Route
              path="/dashboard/login"
              element={<LazyComponent Component={Login} />}
            />
            {/* Thêm các route khác cho các trang khác tại đây */}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

// Đặt AuthProvider bao bọc App
export default () => (
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);
