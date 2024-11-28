import React, {useState, useEffect} from 'react';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from '@mui/material';
import axios from "../../config/axiosConfig";
import useUserStore from "../../hooks/auth/useUserStore";
import {toast} from "react-toastify";
import useCustomerIdStore from '../../hooks/patient/useCustomerIdStore';
import useGetService from "../../hooks/service/useGetAllService";
import useToothAndJawStore from "../../hooks/ToothandJaw/useToothJawStore";
import useServiceAppointmentStore from "../../hooks/appointmentTicket/useServiceAppointmentStore";
import useTicketStore from "../../hooks/appointmentTicket/useTicketStore";

const MedicalRecordDialog = ({ open, onClose }) => {
    const customerId = useCustomerIdStore((state) => state.customerId);
    const serviceAppointment = useServiceAppointmentStore((state) => state.serviceName);  // Lấy giá trị serviceAppointment
   const ticketId = useTicketStore((state) => state.ticketId);
    const { token, userLoggedIn } = useUserStore();
    const [medicalRecord, setMedicalRecord] = useState({
        diagnosis: '',
        result: '',
        note: '',
        usedService: [],
    });
    const { services, getAllService } = useGetService();
    const { tooth, jaw, getAllTooth, getAllJaw } = useToothAndJawStore();

    useEffect(() => {
        getAllService();
        getAllJaw();
        getAllTooth();

        // Cập nhật giá trị mặc định cho dịch vụ khi mở dialog
        if (serviceAppointment && medicalRecord.usedService.length === 0) {
            // Tìm dịch vụ từ tên serviceAppointment
            const defaultService = services.find(service => service.name === serviceAppointment);
            if (defaultService) {
                setMedicalRecord(prevState => ({
                    ...prevState,
                    usedService: [{ service: defaultService._id, for: '' }] // Sử dụng _id của dịch vụ
                }));
            }
        }
    }, [token, serviceAppointment, services]);  // Thêm serviceAppointment vào dependencies để theo dõi thay đổi

    const handleServiceChange = (event, index) => {
        const updatedServices = [...medicalRecord.usedService];
        updatedServices[index].service = event.target.value;
        updatedServices[index].for = ''; // Reset trường 'for' khi thay đổi dịch vụ
        setMedicalRecord({ ...medicalRecord, usedService: updatedServices });
    };


    const handleAddService = () => {
        setMedicalRecord({
            ...medicalRecord,
            usedService: [...medicalRecord.usedService, { service: '', for: '' }],
        });
    };

    const handleToothOrJawChange = (e, index) => {
        const updatedServices = [...medicalRecord.usedService];
        updatedServices[index].for = e.target.value;  // Cập nhật tên (name) thay vì ID
        setMedicalRecord({ ...medicalRecord, usedService: updatedServices });
    };


    const handleRemoveService = (index) => {
        const updatedServices = [...medicalRecord.usedService];
        updatedServices.splice(index, 1); // Remove the service at the specified index
        setMedicalRecord({ ...medicalRecord, usedService: updatedServices });
    };

    const handleSaveMedicalRecord = async () => {
        try {
            // Payload gửi đến API
            const payload = {
                customerID: customerId,
                doctorID: userLoggedIn?.user?.details.employeeID,
                doctorName: userLoggedIn?.user?.details.employeeName,
                usedService: medicalRecord.usedService,  // Gửi giá trị `for` là tên, không phải ID
                diagnosis: medicalRecord.diagnosis,
                result: medicalRecord.result,
                note: medicalRecord.note,
                appointmentID: ticketId,
            };

            console.log(payload);
            // Gửi request tới API
            const response = await axios.post('/medical-record/create', payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 201) {
                toast.success("Thêm hồ sơ y tế thành công");
                onClose();  // Đóng dialog
            }
        } catch (error) {
            console.error("Error creating medical record:", error);
            toast.error("Không thể thêm hồ sơ y tế");
        }
    };



    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>Thêm Hồ Sơ Y Tế</DialogTitle>
            <DialogContent>
                <Box sx={{ width: '100%', mt: 3 }}>
                    <TextField
                        label="Chẩn đoán"
                        fullWidth
                        multiline
                        required
                        rows={4}
                        value={medicalRecord.diagnosis}
                        onChange={(e) => setMedicalRecord({ ...medicalRecord, diagnosis: e.target.value })}
                    />
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {medicalRecord.usedService.map((service, index) => (
                            <Grid item xs={12} key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControl sx={{ width: '40%' }}>
                                    <InputLabel>Dịch vụ</InputLabel>
                                    <Select
                                        value={service.service}
                                        onChange={(e) => handleServiceChange(e, index)}
                                    >
                                        {services.map(s => (
                                            <MenuItem key={s._id} value={s._id}>
                                                {s.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Hiển thị giá tiền và giảm giá của dịch vụ */}
                                {service.service && services.find(s => s._id === service.service) && (
                                    <Box sx={{ display: 'inline-block', ml: 2 }}>
                                        <Typography variant="body1">Giá: {services.find(s => s._id === service.service)?.price}</Typography>
                                        <Typography variant="body1">Giảm giá: {services.find(s => s._id === service.service)?.discount}%</Typography>
                                    </Box>
                                )}

                                {/* Hiển thị ComboBox Tooth nếu unit là 'tooth' */}
                                {service.service && services.find(s => s._id === service.service)?.unit === 'tooth' && (
                                    <FormControl sx={{ width: '20%', ml: 2 }}>
                                        <InputLabel>Chọn răng</InputLabel>
                                        <Select
                                            value={service.for || ''}
                                            onChange={(e) => handleToothOrJawChange(e, index)}
                                        >
                                            {tooth?.map(t => (
                                                <MenuItem key={t._id} value={t.name}>
                                                    {t.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}

                                {/* Hiển thị ComboBox Jaw nếu unit là 'jaw' */}
                                {service.service && services.find(s => s._id === service.service)?.unit === 'jaw' && (
                                    <FormControl sx={{ width: '40%', ml: 2 }}>
                                        <InputLabel>Chọn hàm</InputLabel>
                                        <Select
                                            value={service.for || ''}
                                            onChange={(e) => handleToothOrJawChange(e, index)}
                                        >
                                            {jaw?.map(j => (
                                                <MenuItem key={j._id} value={j._name}>
                                                    {j.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}

                                {/* Nút xóa dịch vụ */}
                                <Button onClick={() => handleRemoveService(index)} variant="outlined" color="error" sx={{ ml: 2 }}>
                                    Xóa
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    <Button onClick={handleAddService} variant="outlined" sx={{ mt: 1 }}>Thêm Dịch Vụ</Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                        <TextField
                            label="Kết quả điều trị"
                            sx={{ mt: 1 }}
                            fullWidth
                            multiline
                            required
                            rows={4}
                            value={medicalRecord.result}
                            onChange={(e) => setMedicalRecord({ ...medicalRecord, result: e.target.value })}
                        />
                        <TextField
                            label="Ghi chú"
                            sx={{ mt: 1 }}
                            fullWidth
                            multiline
                            rows={4}
                            value={medicalRecord.note}
                            onChange={(e) => setMedicalRecord({ ...medicalRecord, note: e.target.value })}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">Hủy</Button>
                <Button onClick={handleSaveMedicalRecord} color="success" variant="contained">Lưu</Button>
            </DialogActions>
        </Dialog>
    );
};



export default MedicalRecordDialog;
