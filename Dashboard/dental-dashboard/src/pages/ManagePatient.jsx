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
import usePatientStore from "../hooks/patient/usePatientStore";
import useUserStore from "../hooks/auth/useUserStore";

const ManagePatient = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openCreatePatient, setOpenCreatePatient] = useState(false);
    const [openPatientDetail, setOpenPatientDetail] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const {patients, loading, error, getAllPatients} = usePatientStore();
    const {userLoggedIn, setUserLoggedIn, token} = useUserStore();
    const [searchType, setSearchType] = useState("name");

    // const token = Cookies.get("token");

    useEffect(() => {
        if (token) {
            setUserLoggedIn(token);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            getAllPatients(token);
        }
    }, [token, patients]);

    // Lọc danh sách bệnh nhân dựa trên các filter
    const filteredPatients = patients.filter((patient) => {

        // Tìm kiếm dựa trên trường searchType được chọn
        const isMatch = patient[searchType]
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return (
            isMatch
        );
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenCreatePatient = () => {
        setOpenCreatePatient(true);
    };

    const handleCloseCreatePatient = () => {
        setOpenCreatePatient(false);
    };

    const handleOpenPatientDetail = (patient) => {
        setSelectedPatient(patient);
        setOpenPatientDetail(true);
    };

    return (
        <Box sx={{paddingY: 6, paddingX: 2}}>
            <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: 2}}>
                Quản lý bệnh nhân
            </Typography>

            {/* Hộp tìm kiếm */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    marginBottom: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        border: "1px solid #ccc",
                        paddingX: 2,
                        paddingBottom: 1,
                        maxWidth: "30rem"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 1,
                            justifyContent: "flex-start",
                            gap: 3
                        }}
                    >
                        <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>
                            Tìm kiếm theo:
                        </Typography>
                        <RadioGroup
                            row
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            <FormControlLabel value="name" control={<Radio/>} label="Tên"/>
                            <FormControlLabel value="phone" control={<Radio/>} label="SĐT"/>
                            <FormControlLabel value="email" control={<Radio/>} label="Email"/>
                        </RadioGroup>
                    </Box>
                    <TextField
                        label="Tìm kiếm"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{bgcolor: "#f5f5f5"}}
                    />
                </Box>
                <Box>
                    {userLoggedIn?.user.role !== "doctor" && (
                        <Button
                            variant="contained"
                            startIcon={<Add/>}
                            sx={{bgcolor: "#4caf50", height: "100%"}}
                            onClick={handleOpenCreatePatient}
                        >
                            Thêm mới bệnh nhân
                        </Button>
                    )}
                </Box>
            </Box>


            {/* Bảng hiển thị bệnh nhân */}
            <TableContainer sx={{boxShadow: 2, borderRadius: 1}}>
                <Table sx={{minWidth: 650}}>
                    <TableHead sx={{backgroundColor: "#f0f0f0"}}>
                        <TableRow>
                            <TableCell sx={{fontWeight: "bold"}}>Số thứ tự</TableCell>
                            <TableCell sx={{fontWeight: "bold"}}>Họ tên</TableCell>
                            <TableCell sx={{fontWeight: "bold"}}>Số điện thoại</TableCell>
                            <TableCell sx={{fontWeight: "bold"}}>Email</TableCell>
                            <TableCell sx={{fontWeight: "bold"}}>Giới tính</TableCell>
                            <TableCell sx={{fontWeight: "bold"}}>Số lần khám</TableCell>
                            <TableCell sx={{fontWeight: "bold"}}>Số lần hủy</TableCell>
                            <TableCell sx={{fontWeight: "bold"}}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPatients
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((patient, index) => (
                                <TableRow
                                    key={`${patient._id}-${index}`}
                                    sx={{
                                        "&:hover": {backgroundColor: "#e0f7fa"},
                                    }}
                                >
                                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell>{patient.phone}</TableCell>
                                    <TableCell>{patient.email}</TableCell>
                                    <TableCell>{patient.gender === "male" ? "Nam" : "Nữ"}</TableCell>
                                    <TableCell sx={{textAlign:'center'}}>{patient.countDone}</TableCell>
                                    <TableCell sx={{textAlign:'center'}}>{patient.countCancelled}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Xem chi tiết">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleOpenCreatePatient(patient)}
                                            >
                                                <Visibility/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filteredPatients.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>

    )
};

export default ManagePatient;
