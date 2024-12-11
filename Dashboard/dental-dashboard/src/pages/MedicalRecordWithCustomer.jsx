import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import axios from "../config/axiosConfig";
import useUserStore from "../hooks/auth/useUserStore";
import { toast } from "react-toastify";
import useCustomerIdStore from '../hooks/patient/useCustomerIdStore';
import MedicalRecordDialog from '../components/MedicalRecord/MedicalRecorDialog';
import { useNavigate } from "react-router-dom";
import Page403 from "./page403.jsx";

const MedicalRecordWithCustomer = () => {
    const customerId = useCustomerIdStore((state) => state.customerId);
    const setCustomerId = useCustomerIdStore((state) => state.setCustomerId);
    const { token, userLoggedIn } = useUserStore();
    const [customer, setCustomer] = useState(null);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    const fetchMedicalRecords = async (page = 1) => {
        try {
            const response = await axios.get(`/medical-record/getByCustomerID/${customerId}?page=${page}&limit=1`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                setMedicalRecords(response.data.records); // Đảo ngược để hiển thị đúng thứ tự
                setCurrentPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.error("Error fetching medical records:", error);
            toast.error("Lỗi khi tải hồ sơ bệnh án.");
        }
    };


    const fetchCustomer = async () => {
        try {
            const response = await axios.get(`/customer/getById/${customerId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                setCustomer(response.data);
            }
        } catch (error) {
            console.error("Error fetching customer data:", error);
            toast.error("Lỗi khi tải thông tin khách hàng");
        }
    };

    useEffect(() => {
        if (customerId) {
            fetchCustomer();
            fetchMedicalRecords();
        }
    }, [customerId, token]);

    const handleBack = () => {
        setCustomerId(null);
        navigate("/dashboard/quan-li-lich-hen/lich-hen");
    };

    return (
        <Box sx={{ paddingY: 6, paddingX: 2 }}>
            {userLoggedIn.user.role !== "employee" ? (
                <>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        Hồ sơ điều trị của bệnh nhân
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                            variant="body1"
                            onClick={handleBack}
                            sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
                        >
                            Quay lại
                        </Typography>
                        <Button variant="contained" color="success" onClick={() => setOpenDialog(true)}>
                            Tạo hồ sơ mới
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: "center", gap: 3, mt: 2 }}>
                        <Typography><b>Tên bệnh nhân:</b> {customer?.name}</Typography>
                        <Typography><b>Điện thoại:</b> {customer?.phone}</Typography>
                        <Typography><b>Email:</b> {customer?.email || 'Không có'}</Typography>
                        <Typography><b>Giới tính:</b> {customer?.gender === "male" ? "Nam" : customer?.gender === "female" ? "Nữ" : ""}</Typography>
                    </Box>

                    {medicalRecords.length > 0 ? (
                        <Grid container spacing={2}>
                            {medicalRecords.map((record, index) => (
                                <Grid item xs={12} key={index}>
                                    <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 1, backgroundColor: '#f9f9f9', mt: 3 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Ngày khám: {record.date}</Typography>
                                        <Typography variant="body1"><b>Bác sĩ điều trị:</b> {record.doctorName || 'N/A'}</Typography>
                                        <Typography variant="body1"><b>Chẩn đoán:</b> {record.diagnosis}</Typography>
                                        <Typography variant="body1"><b>Kết quả:</b> {record.result}</Typography>
                                        <Typography variant="body1"><b>Ghi chú:</b> {record.note || 'Không có'}</Typography>

                                        <Typography variant="body1" sx={{ mt: 2 }}><b>Dịch vụ đã dùng:</b></Typography>
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell><b>STT</b></TableCell>
                                                        <TableCell><b>Tên dịch vụ</b></TableCell>
                                                        <TableCell><b>Dùng cho</b></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {record.usedService.map((service, idx) => (
                                                        <TableRow key={idx}>
                                                            <TableCell>{idx + 1}</TableCell>
                                                            <TableCell>{service.service?.name}</TableCell>
                                                            <TableCell>{service.for || 'Không có'}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <Typography>Không có hồ sơ bệnh án nào.</Typography>
                        </Box>
                    )}

                    {/* Pagination */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Button
                            variant="outlined"
                            disabled={currentPage <= 1}
                            onClick={() => currentPage > 1 && fetchMedicalRecords(currentPage - 1)}
                        >
                            Trang trước
                        </Button>
                        <Typography sx={{ marginX: 2, alignSelf: 'center' }}>
                            Trang {currentPage} / {totalPages}
                        </Typography>
                        <Button
                            variant="outlined"
                            disabled={currentPage >= totalPages}
                            onClick={() => currentPage < totalPages && fetchMedicalRecords(currentPage + 1)}
                        >
                            Trang sau
                        </Button>
                    </Box>


                    <MedicalRecordDialog open={openDialog} onClose={() => setOpenDialog(false)} refresh={fetchMedicalRecords} />
                </>
            ) : <Page403 />}
        </Box>
    );
};

export default MedicalRecordWithCustomer;
