import React, {useState, useEffect} from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Tooltip,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import {Add, Visibility} from "@mui/icons-material";
import useMedicalRecordStore from "../hooks/medicalRecord/MedicalRecordStore"; // Hook lấy dữ liệu hồ sơ
import useUserStore from "../hooks/auth/useUserStore"; // Hook lấy dữ liệu người dùng
import Page403 from "./page403"; // Trang 403
import MedicalRecordDetail from "../components/MedicalRecord/MedicalRecordDetail.jsx";

const ManageMedicalRecord = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openMedicalRecordDetail, setOpenMedicalRecordDetail] = useState(false);
    const [selectedMedicalRecord, setSelectedMedicalRecord] = useState(null);
    const {records, loading, error, getAllMedicalRecords} = useMedicalRecordStore();
    const {userLoggedIn, setUserLoggedIn, token} = useUserStore();

    useEffect(() => {
        if (token) {
            setUserLoggedIn(token);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            getAllMedicalRecords(token);
        }
    }, [token, records]);

    const refreshData = () => {
        getAllMedicalRecords(token);
    };

    const filteredMedicalRecords = records.filter((record) => {
        const search = searchTerm.toLowerCase();
        const nameMatch = record.customerID?.name.toLowerCase().includes(search);
        const phoneMatch = record.customerID?.phone.includes(search);
        return nameMatch || phoneMatch;
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenMedicalRecordDetail = (record) => {
        setSelectedMedicalRecord(record);
        setOpenMedicalRecordDetail(true);
    };

    return (
        <Box sx={{paddingY: 6, paddingX: 2}}>
            {userLoggedIn.user.role === "admin" ?
                <>
                    <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: 2}}>
                        Quản lý hồ sơ điều trị
                    </Typography>

                    <Box sx={{display: "flex", alignItems: "center", marginBottom: 2, gap: 4}}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "45%",
                            border: "1px solid #ccc",
                            paddingX: 2,
                            paddingBottom: 1
                        }}>
                            <Typography variant="subtitle1" sx={{fontWeight: "bold", marginBottom: 1}}>
                                Tìm kiếm:
                            </Typography>
                            <TextField
                                label="Tìm theo tên hoặc số điện thoại"
                                variant="outlined"
                                size="small"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                sx={{bgcolor: "#f5f5f5"}}
                            />

                        </Box>

                    </Box>

                    <Box sx={{marginBottom: 2, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Box sx={{display: "flex", justifyContent: "space-evenly", width: "50%", alignItems: "center"}}>

                        </Box>
                    </Box>

                    <TableContainer sx={{boxShadow: 2, borderRadius: 1}}>
                        <Table sx={{minWidth: 650}}>
                            <TableHead sx={{backgroundColor: "#f0f0f0"}}>
                                <TableRow>
                                    <TableCell sx={{fontWeight: "bold"}}>Số thứ tự</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Tên bệnh nhân</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Số điện thoại</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Ngày điều trị</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Bác sĩ điều trị</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredMedicalRecords
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((record, index) => (
                                        <TableRow key={`${record.id}-${index}`}
                                                  sx={{"&:hover": {backgroundColor: "#e0f7fa"}}}>
                                            <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                            <TableCell>{record.customerID.name}</TableCell>
                                            <TableCell>{record.customerID.phone}</TableCell>
                                            <TableCell>{record.date}</TableCell>
                                            <TableCell>{record.doctorName}</TableCell>
                                            <TableCell>
                                                {userLoggedIn?.user.role === "admin" && (
                                                    <Tooltip title="Chi tiết">
                                                        <IconButton color="primary"
                                                                    onClick={() => handleOpenMedicalRecordDetail(record)}>
                                                            <Visibility/>
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={filteredMedicalRecords.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                    <MedicalRecordDetail
                        open={openMedicalRecordDetail}
                        onClose={() => setOpenMedicalRecordDetail(false)}
                        medicalRecord={selectedMedicalRecord}
                    />
                </> : <Page403/>}
        </Box>
    );
};

export default ManageMedicalRecord;
