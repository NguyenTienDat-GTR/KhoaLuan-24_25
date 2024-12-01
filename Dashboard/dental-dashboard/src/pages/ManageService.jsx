import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  TextField,
  Box,
  Typography,
  TablePagination,
} from "@mui/material";
import { Visibility, Delete, Edit, Add, EditNote } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

import Cookies from "js-cookie";
import useGetAllService from "../hooks/service/useGetAllServiceType";
import { jwtDecode } from "jwt-decode";
import useUserStore from "../hooks/auth/useUserStore";
import CreateServiceType from "../components/ManageService/createServiceType";
import CreateService from "../components/ManageService/createService";
import ServiceDetailModal from "../components/ManageService/ServiceDetail";
import axios from "../config/axiosConfig";
import EditService from "../components/ManageService/editService";
import EditArticleService from "../components/ManageService/editArticleService";
const units = {
  tooth: "Răng",
  jaw: "Hàm",
  treatment: "Liệu trình",
  set: "Bộ",
  session: "Lần",
};

const ServiceManagement = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openEditService, setOpenEditService] = useState(false); 
  const [openEditArticle, setOpenEditArticle] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const [searchOption, setSearchOption] = useState("category");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const { services, loading, error, getAllService } = useGetAllService();
  const { userLoggedIn, setUserLoggedIn, token } = useUserStore();
  const [openCreateServiceType, setOpenCreateServiceType] = useState(false);
  const [openCreateService, setOpenCreateService] = useState(false);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleChangePage = (event, newPage) => setPage(newPage);

  useEffect(() => {
    if (token) {
      setUserLoggedIn(token);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getAllService();
    }
  }, [token, services]);

  // Hàm lọc dịch vụ theo tiêu chí tìm kiếm
  const filteredServices = services?.filter((category) => {
    const matchesCategory =
      searchOption === "category"
        ? category.typeName.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

    const matchesService = category.serviceList.some((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Nếu tìm kiếm theo dịch vụ, chỉ giữ lại loại dịch vụ có dịch vụ
    if (searchOption === "service") {
      return matchesService && category.serviceList.length > 0;
    }

    // Trả về tất cả loại dịch vụ nếu tìm kiếm theo loại
    return matchesCategory;
  });

  const displayedData = filteredServices?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenCreateServiceType = () => setOpenCreateServiceType(true);
  const handleCloseCreateServiceType = () => setOpenCreateServiceType(false);

  const handleOpenCreateService = () => setOpenCreateService(true);
  const handleCloseCreateService = () => setOpenCreateService(false);

  const handleRefreshServices = () => {
    if (token) {
      getAllService();
    }
  };
  const handleDeleteService = async (serviceId, typeId) => {
    if (!serviceId || !typeId) {
      console.error("Thiếu Id dịch vụ hoặc Id loại dịch vụ");
      return;

    }
    try {
      // Gọi API xóa loại dịch vụ, ví dụ như:
      const response = await axios.delete(`/service/delete/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Xóa loại dịch vụ thành công:", response.data.message);
      // Thực hiện cập nhật lại UI hoặc dữ liệu sau khi xóa thành công
      handleRefreshServices();
    } catch (error) {
      console.error("Lỗi khi xóa loại dịch vụ:", error.response?.data?.message || error.message);
    }

  };

  // Mở modal khi bấm vào icon "Xem chi tiết"
  const handleOpenModal = (id) => {
    console.log("id hiện tại là:", id);

    setServiceId(id);  // Lưu ID của dịch vụ
    setOpenModal(true);  // Mở modal
  };
  
  // Đóng modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenEditService = (id) => {
    setServiceId(id);
    setOpenEditService(true);  // Mở modal chỉnh sửa dịch vụ
  };

  const handleOpenEditArticle = (id) => {
    setServiceId(id);
    setOpenEditArticle(true);  // Mở modal chỉnh sửa bài viết dịch vụ
  };
  const handleCloseEditService = () => {
    setOpenEditService(false);  // Đóng modal chỉnh sửa dịch vụ
  };

  const handleCloseEditArticle = () => {
    setOpenEditArticle(false);  // Đóng modal chỉnh sửa bài viết
  };
  return (
    <Box sx={{ paddingY: 6, paddingX: 0.5 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Quản lý dịch vụ
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          border: "1px solid #ccc",
          paddingX: 2,
          padding: 1,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "40%",
            gap: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Tìm kiếm theo:
          </Typography>
          <FormControl>
            <RadioGroup
              row
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
            >
              <FormControlLabel
                value="service"
                control={<Radio />}
                label="Dịch vụ"
              />
              <FormControlLabel
                value="category"
                control={<Radio />}
                label="Loại dịch vụ"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <TextField
          placeholder={
            searchOption === "service"
              ? "Tìm kiếm dịch vụ"
              : "Tìm kiếm loại dịch vụ"
          }
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "60%" }}
        />
      </Box>

      {userLoggedIn?.user.role === "admin" && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<Add />}
              onClick={handleOpenCreateServiceType}
            >
              Thêm mới loại dịch vụ
            </Button>

            <Button variant="contained" color="primary" startIcon={<Edit />}
              onClick={() => navigate("/dashboard/quan-ly-loai-dich-vu")}>
              Chỉnh sửa loại dịch vụ
            </Button>

          </Box>
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            onClick={handleOpenCreateService}
          >
            Thêm mới dịch vụ
          </Button>
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              {[
                "STT",
                "Loại dịch vụ",
                "Dịch vụ",
                "Hình ảnh",
                "Mô tả",
                "Khoảng giá",
                "Giá",
                "Đơn vị tính",
                "Giảm giá (%)",
                "Hành động",
              ].map((head) => (
                <TableCell key={head} sx={{ fontWeight: "bold" }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData?.map((category, categoryIndex) => {
              if (category.serviceList.length === 0) {
                return (
                  <TableRow key={category._id}>
                    <TableCell>
                      {categoryIndex + 1 + page * rowsPerPage}
                    </TableCell>
                    <TableCell>{category.typeName}</TableCell>
                    <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                      Không có dịch vụ
                    </TableCell>
                  </TableRow>
                );
              }

              return (
                <React.Fragment key={category._id}>
                  {category.serviceList.map((service, serviceIndex) => (
                    <TableRow
                      key={service._id}
                      hover
                      sx={{ "&:hover": { backgroundColor: "#e0f7fa" } }}
                    >
                      {serviceIndex === 0 && (
                        <>
                          <TableCell rowSpan={category.serviceList.length}>
                            {categoryIndex + 1 + page * rowsPerPage}
                          </TableCell>
                          <TableCell rowSpan={category.serviceList.length}>
                            {category.typeName}
                          </TableCell>
                        </>
                      )}
                      <TableCell>{service.name}</TableCell>
                      <TableCell>
                        {service.imageUrls?.length > 0 && (
                          <img
                            src={service.imageUrls[0]}
                            alt={service.name}
                            style={{ width: "50px", height: "50px" }}
                          />
                        )}
                      </TableCell>
                      <TableCell sx={{ maxWidth: "200px", overflow: "auto" }}>
                        {service.description}
                      </TableCell>
                      <TableCell>{service.priceRange} VND</TableCell>
                      <TableCell>
                        {service.price.toLocaleString("vi-VN")} VND
                      </TableCell>
                      <TableCell sx={{ maxWidth: "50px" }}>
                        {units[service.unit] || service.unit}
                      </TableCell>
                      <TableCell sx={{ maxWidth: "50px" }}>
                        {service.discount}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Xem chi tiết">
                          <IconButton sx={{ color: "#1976d2" }}
                            onClick={() => handleOpenModal(service._id)}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>

                        {userLoggedIn?.user.role === "admin" && (
                          <>
                            <Tooltip title="Chỉnh sửa dịch vụ">
                              <IconButton sx={{ color: "#4caf50" }}
                              onClick={() => handleOpenEditService(service._id)}>
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa dịch vụ">
                              <IconButton
                                sx={{ color: "#f44336" }}
                                onClick={() => handleDeleteService(service._id, category._id)}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Chỉnh sửa bài viết dịch vụ">
                              <IconButton sx={{ color: "#ff9800" }} 
                              onClick={() => handleOpenEditArticle(service._id)}>
                                <EditNote />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={filteredServices?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />

      <CreateServiceType
        open={openCreateServiceType}
        onClose={handleCloseCreateServiceType}
        onRefresh={handleRefreshServices}
      />
      <CreateService
        open={openCreateService}
        onClose={handleCloseCreateService}
        onRefresh={handleRefreshServices}
      />
      <ServiceDetailModal
        serviceId={serviceId}  // Truyền ID dịch vụ vào modal
        open={openModal}  // Điều khiển trạng thái mở của modal
        closeModal={handleCloseModal}  // Hàm đóng modal


      />
       {/* Modal chỉnh sửa dịch vụ */}
       <EditService
       serviceId={serviceId}
        open={openEditService}
        onClose={handleCloseEditService}
      />

      {/* Modal chỉnh sửa bài viết dịch vụ */}
      <EditArticleService
      serviceId={serviceId}
        open={openEditArticle}
        onClose={handleCloseEditArticle}
      />
      
    </Box>
  );
};

export default ServiceManagement;