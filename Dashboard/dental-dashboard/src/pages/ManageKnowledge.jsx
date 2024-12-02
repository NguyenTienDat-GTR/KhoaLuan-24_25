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
import useGetAllKnowledge from "../hooks/knowledge/useGetAllKnowledge";
import { jwtDecode } from "jwt-decode";
import useUserStore from "../hooks/auth/useUserStore";
import KnowledgeDetail from "../components/ManageKnowledge/knowledgeDetail";
import CreateKnowledge from "../components/ManageKnowledge/createKnowledge";

import axios from "../config/axiosConfig";



const KnowledgeManage = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [selectedKnowledge, setSelectedKnowledge] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [KnowledgeId, setKnowledgeId] = useState(null);
    // const [searchOption, setSearchOption] = useState("category");
    const [searchKnowledge, setSearchKnowledge] = useState("");
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
    const { knowledges, loading, error, getAllKnowledge } = useGetAllKnowledge();
    const { userLoggedIn, setUserLoggedIn, token } = useUserStore();
    //const [openCreateServiceType, setOpenCreateServiceType] = useState(false);
    const [openCreateKnowledge, setOpenCreateKnowledge] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchChange = (event) => { setSearchKnowledge(event.target.value); setIsSearching(true) }
    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleOpenEditKnowledge = (knowledge) => {
        console.log("Knowledge ID:", knowledge._id);
        setSelectedKnowledge(knowledge);
        setKnowledgeId(knowledge._id);
        setOpenEditModal(true);
    };

    const handleCloseEditKnowledge = () => {
        setSelectedKnowledge(null);
        setOpenEditModal(false);
    };

    useEffect(() => {
        if (token) {
            setUserLoggedIn(token);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
           
            getAllKnowledge();
        }
    }, [token, knowledges]);
   

 

    // Hàm lọc dịch vụ theo tiêu chí tìm kiếm
    const filteredKnowledges = isSearching
        ? knowledges?.filter((Knowledge) =>
            Knowledge.title.toLowerCase().includes(searchKnowledge.toLowerCase())
        )
        : knowledges;

    const displayedData = filteredKnowledges?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    


    const handleOpenCreateKnowledge = () => setOpenCreateKnowledge(true);
    const handleCloseCreateKnowledge = () => setOpenCreateKnowledge(false);

    const handleRefreshKnowledge = () => {
        if (token) {
            getAllKnowledge();
        }
    };
    const handleDeleteKnowledge = async (id) => {
        try {
            await axios.delete(`/knowledge/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ); // Gọi API xóa chính sách
            handleRefreshKnowledge(); // Cập nhật danh sách chính sách
        } catch (error) {
            console.error("Failed to delete Knowledge:", error);
            // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
        }
    };

    return (
        <Box sx={{ paddingY: 6, paddingX: 0.5 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Quản lý kiến thức
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "98%",
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
                        width: "10%",
                        gap: 2,
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        Tìm kiếm:
                    </Typography>

                </Box>

                <TextField
                    placeholder={"Tìm kiếm theo tên kiến thức"}
                    value={searchKnowledge}
                    onChange={handleSearchChange}
                    sx={{ width: "90%" }}
                />

            </Box>


            {userLoggedIn?.user.role === "admin" && (
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>

                    </Box>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<Add />}
                        onClick={handleOpenCreateKnowledge}
                    >
                        Thêm mới chính sách
                    </Button>
                </Box>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                            {[
                                "STT",
                                "Tên chính sách",
                                "Hình ảnh",
                                "Người tạo",
                                "Giờ tạo",
                                "Nội dung",
                                "Hành động"

                            ].map((head) => (
                                <TableCell key={head} sx={{ fontWeight: "bold" }}>
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedData?.map((knowledge, index) => (


                            <TableRow
                                key={knowledge._id}
                                hover
                                sx={{ "&:hover": { backgroundColor: "#e0f7fa" } }}
                            >
                                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                <TableCell>{knowledge.title}</TableCell>
                                <TableCell>
                                    {knowledge.imageUrls?.length > 0 && (
                                        <img
                                            src={knowledge.imageUrls[0]}
                                            alt={knowledge.title}
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell>{knowledge.createBy}</TableCell>
                                <TableCell>{knowledge.createAt}</TableCell>
                                <TableCell>{knowledge.summary}</TableCell>


                                <TableCell>
                                    {userLoggedIn?.user.role === "admin" && (
                                        <>
                                            <Tooltip title="Xem chi tiết và chỉnh sửa chính sách">
                                                <IconButton sx={{ color: "#1976d2" }}
                                                    onClick={() => handleOpenEditKnowledge(knowledge)}
                                                >
                                                    <Visibility />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Xóa chính sách">
                                                <IconButton
                                                    sx={{ color: "#f44336" }}
                                                    onClick={() => handleDeleteKnowledge(knowledge._id)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={filteredKnowledges?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}

            />


            <CreateKnowledge
                open={openCreateKnowledge}
                onClose={handleCloseCreateKnowledge}
                onRefresh={handleRefreshKnowledge}
            />

            <KnowledgeDetail
                open={openEditModal}
                onClose={handleCloseEditKnowledge}
                knowledgeId={KnowledgeId}
                onSave={(updatedKnowledge) => {
                    // Gọi API cập nhật hoặc xử lý lưu thông tin
                    console.log("Knowledge updated:", updatedKnowledge);
                    handleCloseEditKnowledge();
                }}
            />
        </Box>
    );
};

export default KnowledgeManage;