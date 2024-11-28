import React, { useState, useEffect } from "react";
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
import { Add, Visibility } from "@mui/icons-material";
// import CreateMedicalRecord from "../../components/ManageMedicalRecord/CreateMedicalRecord";
// import MedicalRecordDetail from "../../components/ManageMedicalRecord/MedicalRecordDetail";
import useMedicalRecordStore from "../hooks/medicalRecord/MedicalRecordStore"; // Hook lấy dữ liệu hồ sơ
import useUserStore from "../hooks/auth/useUserStore"; // Hook lấy dữ liệu người dùng

const ManageMedicalRecord = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openCreateMedicalRecord, setOpenCreateMedicalRecord] = useState(false);
    const [openMedicalRecordDetail, setOpenMedicalRecordDetail] = useState(false);
    const [selectedMedicalRecord, setSelectedMedicalRecord] = useState(null);
    const { records, loading, error, getAllMedicalRecords } = useMedicalRecordStore();
    const { userLoggedIn, setUserLoggedIn, token } = useUserStore();

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
        const isMatch = record.customerID?.name.toLowerCase().includes(searchTerm.toLowerCase());
        return isMatch ;
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenCreateMedicalRecord = () => {
        setOpenCreateMedicalRecord(true);
    };

    const handleCloseCreateMedicalRecord = () => {
        setOpenCreateMedicalRecord(false);
    };

    const handleOpenMedicalRecordDetail = (record) => {
        setSelectedMedicalRecord(record);
        setOpenMedicalRecordDetail(true);
    };

    return (
        <Box sx={{ paddingY: 6, paddingX: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                Quản lý hồ sơ điều trị
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2, gap: 4 }}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "45%", border: "1px solid #ccc", paddingX: 2, paddingBottom: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                        Tìm kiếm:
                    </Typography>
                    <TextField
                        label="Tên bệnh nhân"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ bgcolor: "#f5f5f5" }}
                    />
                </Box>

            </Box>

            <Box sx={{ marginBottom: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "50%", alignItems: "center" }}>

                </Box>

                {/*<Box sx={{ display: "flex", justifyContent: "flex-end" }}>*/}
                {/*    /!* Chỉ hiển thị nút "Thêm mới hồ sơ điều trị" nếu người dùng là admin *!/*/}
                {/*    {userLoggedIn?.user.role === "admin" && (*/}
                {/*        <Button*/}
                {/*            variant="contained"*/}
                {/*            startIcon={<Add />}*/}
                {/*            sx={{ bgcolor: "#4caf50" }}*/}
                {/*            onClick={handleOpenCreateMedicalRecord}*/}
                {/*        >*/}
                {/*            Thêm mới hồ sơ điều trị*/}
                {/*        </Button>*/}
                {/*    )}*/}
                {/*</Box>*/}
            </Box>

            <TableContainer sx={{ boxShadow: 2, borderRadius: 1 }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Số thứ tự</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Tên bệnh nhân</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Ngày điều trị</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Bác sĩ điều trị</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredMedicalRecords
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((record, index) => (
                                <TableRow key={`${record.id}-${index}`} sx={{ "&:hover": { backgroundColor: "#e0f7fa" } }}>
                                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                    <TableCell>{record.customerID.name}</TableCell>
                                    <TableCell>{record.date}</TableCell>
                                    <TableCell>{record.doctorName}</TableCell>
                                    <TableCell>
                                        {userLoggedIn?.user.role === "admin" && (
                                            <Tooltip title="Chi tiết">
                                                <IconButton color="primary" onClick={() => handleOpenMedicalRecordDetail(record)}>
                                                    <Visibility />
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

            {/*<CreateMedicalRecord open={openCreateMedicalRecord} onClose={handleCloseCreateMedicalRecord} />*/}
            {/*<MedicalRecordDetail*/}
            {/*    open={openMedicalRecordDetail}*/}
            {/*    onClose={() => setOpenMedicalRecordDetail(false)}*/}
            {/*    medicalRecord={selectedMedicalRecord}*/}
            {/*    onSuccess={refreshData}*/}
            {/*/>*/}
        </Box>
    );
};

export default ManageMedicalRecord;
