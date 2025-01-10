import React, {useEffect, useState} from "react";
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
import {Visibility, Delete, Edit, Add, EditNote} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom';

import Cookies from "js-cookie";
import useGetAllPolicy from "../hooks/policy/useGetAllPolicy";
import {jwtDecode} from "jwt-decode";
import useUserStore from "../hooks/auth/useUserStore";
import PolicyDetail from "../components/ManagePolicy/policyDetail";
import CreatePolicy from "../components/ManagePolicy/createPolicy.jsx";

import axios from "../config/axiosConfig";


const PolicyManagement = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [policyId, setPolicyId] = useState(null);
    // const [searchOption, setSearchOption] = useState("category");
    const [searchPolicy, setSearchPolicy] = useState("");
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
    const {policies, loading, error, getAllPolicy} = useGetAllPolicy();
    const {userLoggedIn, setUserLoggedIn, token} = useUserStore();
    //const [openCreateServiceType, setOpenCreateServiceType] = useState(false);
    const [openCreatePolicy, setOpenCreatePolicy] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchChange = (event) => {
        setSearchPolicy(event.target.value);
        setIsSearching(true)
    }
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleOpenEditPolicy = (policy) => {
        setSelectedPolicy(policy);
        setPolicyId(policy._id);
        setOpenEditModal(true);
    };

    const handleCloseEditPolicy = () => {
        setSelectedPolicy(null);
        setOpenEditModal(false);
    };

    useEffect(() => {
        if (token) {
            setUserLoggedIn(token);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            getAllPolicy();
        }
    }, [token, policies]);

    // Hàm lọc dịch vụ theo tiêu chí tìm kiếm
    const filteredPolicies = isSearching
        ? policies?.filter((policy) =>
            policy.title.toLowerCase().includes(searchPolicy.toLowerCase())
        )
        : policies;

    const displayedData = filteredPolicies?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );


    const handleOpenCreatePolicy = () => setOpenCreatePolicy(true);
    const handleCloseCreatePolicy = () => setOpenCreatePolicy(false);

    const handleRefreshPolicy = () => {
        if (token) {
            getAllPolicy();
        }
    };
    const handleDeletePolicy = async (id) => {
        try {
            await axios.delete(`/policy/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ); // Gọi API xóa chính sách
            handleRefreshPolicy(); // Cập nhật danh sách chính sách
        } catch (error) {
            console.error("Failed to delete policy:", error);
            // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
        }
    };

    return (
        <Box sx={{paddingY: 6, paddingX: 0.5}}>
            <Typography variant="h6" sx={{fontWeight: "bold", mb: 2}}>
                Quản lý chính sách
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
                    <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>
                        Tìm kiếm:
                    </Typography>

                </Box>

                <TextField
                    placeholder={"Tìm kiếm theo tên chính sách"}
                    value={searchPolicy}
                    onChange={handleSearchChange}
                    sx={{width: "90%"}}
                />

            </Box>


            {userLoggedIn?.user.role === "admin" && (
                <Box sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
                    <Box sx={{display: "flex", gap: 1}}>

                    </Box>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<Add/>}
                        onClick={handleOpenCreatePolicy}
                    >
                        Thêm mới chính sách
                    </Button>
                </Box>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: "#f0f0f0"}}>
                            {[
                                "STT",
                                "Tên chính sách",

                                "Người tạo",
                                "Giờ tạo",
                                "Nội dung",
                                "Hành động"

                            ].map((head) => (
                                <TableCell key={head} sx={{fontWeight: "bold"}}>
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedData?.map((policy, index) => (


                            <TableRow
                                key={policy._id}
                                hover
                                sx={{"&:hover": {backgroundColor: "#e0f7fa"}}}
                            >
                                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                <TableCell>{policy.title}</TableCell>
                                <TableCell>{policy.createBy}</TableCell>
                                <TableCell>{policy.createAt}</TableCell>
                                <TableCell>{policy.summary}</TableCell>


                                <TableCell>
                                    {userLoggedIn?.user.role === "admin" && (
                                        <>
                                            <Tooltip title="Xem chi tiết và chỉnh sửa chính sách">
                                                <IconButton sx={{color: "#1976d2"}}
                                                            onClick={() => handleOpenEditPolicy(policy)}
                                                >
                                                    <Visibility/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Xóa chính sách">
                                                <IconButton
                                                    sx={{color: "#f44336"}}
                                                    onClick={() => handleDeletePolicy(policy._id)}
                                                >
                                                    <Delete/>
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
                count={filteredPolicies?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}

            />


            <CreatePolicy
                open={openCreatePolicy}
                onClose={handleCloseCreatePolicy}
                onRefresh={handleRefreshPolicy}
            />

            <PolicyDetail
                open={openEditModal}
                onClose={handleCloseEditPolicy}
                policyId={policyId}
                onSave={(updatedPolicy) => {
                    // Gọi API cập nhật hoặc xử lý lưu thông tin
                    console.log("Policy updated:", updatedPolicy);
                    handleCloseEditPolicy();
                }}
            />
        </Box>
    );
};

export default PolicyManagement;