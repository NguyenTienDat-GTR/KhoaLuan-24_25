import React, { Suspense, useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
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
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toast
import { ToastContainer } from "react-toastify";

// Lazy load components
const Overview = React.lazy(() => import("./pages/Overview"));
const Login = React.lazy(() => import("./pages/Login"));
const ManageAccount = React.lazy(() => import("./pages/ManageAccount"));
const ModalAuthorization = React.lazy(() =>
  import("./components/ModalAuthorization")
);
const ManageDoctor = React.lazy(() =>
  import("./pages/ManageHuman/ManageDoctor")
);
const ManageEmployee = React.lazy(() =>
  import("./pages/ManageHuman/ManageEmployee")
);
const MangeService = React.lazy(() => import("./pages/ManageService"));
const ManageAppointment = React.lazy(() =>
  import("./pages/ManageAppointment/ManageAppointment")
);
const AppointmentRequest = React.lazy(() =>
  import("./pages/ManageAppointment/AppointmentRequest")
);

const ManagePatient = React.lazy(() => import("./pages/ManagePatient"));

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
          Đang tải....
        </Box>
      )}
    </Box>
  );
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Trạng thái mở hoặc thu gọn sidebar
  const [currentPath, setCurrentPath] = useState("Tổng quan");
  const [fullPath, setFullPath] = useState("Tổng quan"); // lưu full path
  const { isLoggedIn } = useAuth() || {}; // Sử dụng giá trị mặc định nếu useAuth không trả về gì
  const [openModal, setOpenModal] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePathChange = (newPath, isSubMenu = false) => {
    setCurrentPath(newPath);

    if (newPath === "Tổng quan") {
      // Reset fullPath về chỉ "Tổng quan"
      setFullPath("Tổng quan");
    } else if (isSubMenu) {
      // Nếu là menu con, thêm vào fullPath
      setFullPath((prevFullPath) => `${prevFullPath} / ${newPath}`);
    } else {
      // Nếu chọn trang cha, cập nhật fullPath chỉ với trang cha
      const parent = menuItems.find((item) => item.text === newPath);
      if (parent) {
        setFullPath(`${parent.text}`);
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
      text: "Quản lí lịch hẹn",
      icon: <EventNoteTwoTone sx={{ color: "rgba(21,182,210)" }} />,
      path: "dashboard/quan-li-lich-hen",
      subItems: [
        {
          text: "Yêu cầu đặt lịch",
          path: "yeu-cau",
        },
        {
          text: "Lịch hẹn",
          path: "lich-hen",
        },
      ],
    },
    {
      text: "Quản lý dịch vụ",
      icon: <MedicalServices sx={{ color: "rgba(21,182,210)" }} />,
      path: "dashboard/quan-ly-dich-vu",
      // subItems: [
      //   {
      //     text: "Loại dịch vụ",
      //     path: "loai-dich-vu",
      //   },
      //   {
      //     text: "Dịch vụ cung cấp",
      //     path: "dich-vu-cung-cap",
      //   },
      // ],
    },
    {
      text: "Quản lý bệnh nhân",
      icon: <People sx={{ color: "rgba(21,182,210)" }} />,
      path: "dashboard/quan-ly-benh-nhan",
    },
    {
      text: "Quản lý nhân sự",
      icon: <AssignmentInd sx={{ color: "rgba(21,182,210)" }} />,
      path: "dashboard/quan-ly-nhan-su",
      subItems: [
        {
          text: "Quản lí nhân viên",
          path: "nhan-vien",
        },
        {
          text: "Quản lí bác sĩ",
          path: "bac-si",
        },
      ],
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
      text: "Quản lý tài khoản",
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
    <Box sx={{ display: !isLoggedIn ? "block" : "flex" }}>
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
        <Box sx={{ mt: !isLoggedIn ? 0 : "1rem" }}>
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
                <Route
                  path="/dashboard/quan-ly-nhan-su/bac-si"
                  element={
                    <LazyComponent
                      Component={() => (
                        <ManageDoctor isSidebarOpen={sidebarOpen} />
                      )}
                    />
                  }
                />
                <Route
                  path="/dashboard/quan-ly-nhan-su/nhan-vien"
                  element={
                    <LazyComponent
                      Component={() => (
                        <ManageEmployee isSidebarOpen={sidebarOpen} />
                      )}
                    />
                  }
                />
                <Route
                  path="/dashboard/quan-ly-dich-vu"
                  element={
                    <LazyComponent
                      Component={() => (
                        <MangeService isSidebarOpen={sidebarOpen} />
                      )}
                    />
                  }
                />
                <Route
                  path="/dashboard/quan-li-lich-hen/yeu-cau"
                  element={
                    <LazyComponent
                      Component={() => (
                        <AppointmentRequest isSidebarOpen={sidebarOpen} />
                      )}
                    />
                  }
                />
                <Route
                  path="dashboard/quan-li-lich-hen/lich-hen"
                  element={
                    <LazyComponent
                      Component={() => (
                        <ManageAppointment isSidebarOpen={sidebarOpen} />
                      )}
                    />
                  }
                />
                <Route
                  path="/dashboard/quan-ly-benh-nhan"
                  element={
                    <LazyComponent
                      Component={() => (
                        <ManagePatient isSidebarOpen={sidebarOpen} />
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
      <ToastContainer
        position="top-center"
        autoClose={3000} // Thời gian tự động đóng toast (3000ms = 3 giây)
        hideProgressBar={true} // Hiện thanh tiến trình
        newestOnTop={true} // Hiện toast mới nhất ở trên cùng
        draggable
        pauseOnFocusLoss
      />
    </Router>
  </AuthProvider>
);
