import React, {useEffect, useState} from 'react';
import {Box, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl, Grid} from "@mui/material";
import axios from "../config/axiosConfig";
import useUserStore from "../hooks/auth/useUserStore";
import {toast} from "react-toastify";
import useCustomerIdStore from '../hooks/patient/useCustomerIdStore';
import MedicalRecordDialog from '../components/MedicalRecord/MedicalRecorDialog';
import {useNavigate} from "react-router-dom";
import useServiceAppointmentStore from "../hooks/appointmentTicket/useServiceAppointmentStore.jsx";
import useTicketStore from "../hooks/appointmentTicket/useTicketStore.jsx";
import Page403 from "./page403.jsx"

const MedicalRecordWithCustomer = () => {
    const customerId = useCustomerIdStore((state) => state.customerId);
    const setCustomerId = useCustomerIdStore((state) => state.setCustomerId);
    const setServiceAppointment = useServiceAppointmentStore((state) => state.setServiceName);
    const setTicketId = useTicketStore((state) => state.setTicketId);
    const {token, userLoggedIn} = useUserStore();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [medicalRecord, setMedicalRecord] = useState({
        diagnosis: '',
        result: '',
        note: '',
        usedService: []
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchMedicalRecords = async (page = 1) => {
        try {
            const response = await axios.get(`/medical-record/getByCustomerID/${customerId}?page=${page}&limit=5`, {
                headers: {Authorization: `Bearer ${token}`}
            });

            if (response.status === 200) {
                const reversedRecords = response.data.records.reverse(); // Đảo ngược mảng records
                setMedicalRecords(reversedRecords);
                setCurrentPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.error("Error fetching medical records:", error);
            toast.error("Lỗi khi tải hồ sơ bệnh án.");
        }
    };

    useEffect(() => {
        if (customerId) fetchMedicalRecords();
    }, [customerId, currentPage]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Gọi API lấy thông tin customer
    const fetchCustomer = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`/customer/getById/${customerId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            if (response.status === 200) {
                setLoading(false)
                setCustomer(response.data);
            }

        } catch (error) {
            console.error("Error fetching customer data:", error);
            setLoading(false)
            toast.error("Lỗi khi tải thông tin khách hàng");
        }
    };

    // Gọi API lấy danh sách dịch vụ
    const fetchServices = async () => {
        try {
            const response = await axios.get('/service/getAll', {
                headers: {Authorization: `Bearer ${token}`}
            });
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };


    useEffect(() => {
        if (customerId) {
            fetchCustomer();
        }
        fetchServices();
    }, [customerId, token]);


    const handleBack = () => {
        setCustomerId(null);
        setTicketId(null);
        setServiceAppointment(null);
        navigate("/dashboard/quan-li-lich-hen/lich-hen")
    }

    return (
        <Box sx={{paddingY: 6, paddingX: 2}}>
            {userLoggedIn.user.role !== "employee" ?
                <>
                    <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: 2}}>
                        Hồ sơ đều trị của bệnh nhân
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body1" onClick={handleBack}
                                    sx={{cursor: 'pointer', textDecoration: 'underline', color: 'blue'}}>Quay
                            lại</Typography>
                        <Button variant="contained" color="success" onClick={handleOpenDialog}>Tạo hồ sơ mới</Button>

                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: "center", gap: 3, mt: 2}}>
                        <Typography><b>Tên bệnh nhân:</b> {customer?.name}</Typography>
                        <Typography><b>Điện thoại:</b> {customer?.phone}</Typography>
                        <Typography><b>Email:</b> {customer?.email || 'Không có'}</Typography>
                        <Typography><b>Giới
                            tính:</b> {customer?.gender === "male" ? "Nam" : customer?.gender === "female" ? "Nữ" : ""}
                        </Typography>
                    </Box>


                    {medicalRecords?.length > 0 ? (
                        <Grid container spacing={2}>
                            {medicalRecords?.map((record, index) => (
                                <Grid item xs={12} key={index}>
                                    <Box sx={{
                                        border: '1px solid #ccc',
                                        padding: 2,
                                        borderRadius: 1,
                                        backgroundColor: '#f9f9f9',
                                        mt: 3
                                    }}>
                                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>Ngày
                                            khám: {record.date}</Typography>
                                        <Typography variant="body1"><b>Bác sĩ điều trị:</b> {record.doctorName || 'N/A'}
                                        </Typography>
                                        <Typography variant="body1"><b>Chẩn đoán:</b> {record.diagnosis}</Typography>
                                        <Typography variant="body1"><b>Kết quả:</b> {record.result}</Typography>
                                        <Typography variant="body1"><b>Dịch vụ đã dùng:</b>
                                            {record?.usedService.map((service, idx) => (
                                                <span key={idx}>
                        {service.service?.name}
                                                    {service.for && ` (Dùng cho: ${service.for})`}
                                                    {idx < record.usedService.length - 1 && ', '}
                    </span>
                                            ))}
                                        </Typography>
                                        <Typography variant="body1"><b>Ghi chú:</b> {record.note || 'Không có'}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}

                        </Grid>
                    ) : (
                        <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <Typography>Không có hồ sơ bệnh án nào.</Typography>
                        </Box>
                    )}

                    {/* Pagination */
                    }
                    <Box sx={{display: 'flex', justifyContent: 'center', marginTop: 2}}>
                        <Button
                            variant="outlined"
                            disabled={currentPage <= 1}
                            onClick={() => fetchMedicalRecords(currentPage - 1)}
                        >
                            Trang trước
                        </Button>
                        <Typography sx={{marginX: 2, alignSelf: 'center'}}>
                            Trang {currentPage} / {totalPages}
                        </Typography>
                        <Button
                            variant="outlined"
                            disabled={currentPage >= totalPages}
                            onClick={() => fetchMedicalRecords(currentPage + 1)}
                        >
                            Trang sau
                        </Button>
                    </Box>
                    {/* MedicalRecord Dialog */
                    }
                    <MedicalRecordDialog open={openDialog} onClose={handleCloseDialog}/>
                </> : <Page403/>}
        </Box>


    )
        ;
}

export default MedicalRecordWithCustomer;
