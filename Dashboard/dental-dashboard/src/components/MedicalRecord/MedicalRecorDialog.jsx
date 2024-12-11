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

const MedicalRecordDialog = ({open, onClose, refresh}) => {
    const customerId = useCustomerIdStore((state) => state.customerId);
    const serviceAppointment = useServiceAppointmentStore((state) => state.serviceName);  // Lấy giá trị serviceAppointment
    const ticketId = useTicketStore((state) => state.ticketId);
    const {token, userLoggedIn} = useUserStore();
    const [medicalRecord, setMedicalRecord] = useState({
        diagnosis: '',
        result: '',
        note: '',
        usedService: [],
    });
    const {services, getAllService} = useGetService();
    const {tooth, jaw, getAllTooth, getAllJaw} = useToothAndJawStore();
    const [loadingRecord, setLoadingRecord] = useState(false);
    const [loadingInvoice, setLoadingInvoice] = useState(false);
    const [selectedServices, setSelectedServices] = useState(new Set());

    useEffect(() => {
        getAllService();
        getAllJaw();
        getAllTooth();

        // Cập nhật giá trị mặc định cho dịch vụ khi mở dialog
        if (serviceAppointment && medicalRecord?.usedService?.length === 0) {
            // Tìm dịch vụ từ tên serviceAppointment
            const defaultService = services.find(service => service.name === serviceAppointment);
            if (defaultService) {
                setMedicalRecord(prevState => ({
                    ...prevState,
                    usedService: [{service: defaultService._id, for: ''}] // Sử dụng _id của dịch vụ
                }));

                const updatedSelectedServices = new Set(selectedServices);

                // Nếu dịch vụ mặc định có unit là tooth hoặc jaw, giữ nguyên dịch vụ trong selectedServices
                if (defaultService.unit !== 'tooth' && defaultService.unit !== 'jaw') {
                    updatedSelectedServices.add(defaultService._id);
                } else {
                    updatedSelectedServices.delete(defaultService._id);
                }
                setSelectedServices(updatedSelectedServices);
            }
        }
    }, [token, serviceAppointment, services]);

    const handleServiceChange = (event, index) => {
        const updatedServices = [...medicalRecord.usedService];
        const previousService = updatedServices[index].service; // Lấy dịch vụ trước đó (nếu có)
        updatedServices[index].service = event.target.value;
        updatedServices[index].for = ''; // Reset trường 'for' khi thay đổi dịch vụ
        setMedicalRecord({...medicalRecord, usedService: updatedServices});

        // Cập nhật Set dịch vụ đã chọn
        const updatedSelectedServices = new Set(selectedServices);
        if (previousService) {
            updatedSelectedServices.delete(previousService); // Xóa dịch vụ trước đó
        }

        // Loại bỏ dịch vụ không phải là tooth hoặc jaw
        const newService = services.find(service => service._id === event.target.value);
        if (newService.unit !== 'tooth' && newService.unit !== 'jaw') {
            updatedSelectedServices.add(event.target.value); // thêm dịch vụ không phải là tooth hoặc jaw vào dịch vụ đã chọn
        } else {
            updatedSelectedServices.delete(event.target.value); // xóa dịch vụ  nếu unit là tooth hoặc jaw khỏi dịch vụ đã chọn
        }

        // // Loại bỏ răng đã chọn nếu dịch vụ trùng với dịch vụ đã chọn trước đó và unit là tooth hoặc jaw
        // if (newService.unit === 'tooth' || newService.unit === 'jaw') {
        //     const selectedServiceWithToothOrJaw = medicalRecord.usedService.find(s =>
        //         (s.service === previousService) && (s.for !== ''));
        //     if (selectedServiceWithToothOrJaw) {
        //         updatedSelectedServices.delete(selectedServiceWithToothOrJaw.for); // loại bỏ răng đã chọn trước đó
        //     }
        // }

        setSelectedServices(updatedSelectedServices);
    };

    const handleAddService = () => {
        setMedicalRecord({
            ...medicalRecord,
            usedService: [...medicalRecord.usedService, {service: '', for: ''}],
        });
    };

    const handleToothOrJawChange = (e, index) => {
        const updatedServices = [...medicalRecord.usedService];
        updatedServices[index].for = e.target.value;  // Cập nhật tên (name) thay vì ID
        setMedicalRecord({...medicalRecord, usedService: updatedServices});
    };


    const handleRemoveService = (index) => {
        const updatedServices = [...medicalRecord.usedService];
        const removedService = updatedServices[index].service; // Lưu lại dịch vụ bị xóa
        updatedServices.splice(index, 1); // Xóa dịch vụ tại index
        setMedicalRecord({...medicalRecord, usedService: updatedServices});

        // Cập nhật Set dịch vụ đã chọn
        const updatedSelectedServices = new Set(selectedServices);
        updatedSelectedServices.delete(removedService);
        setSelectedServices(updatedSelectedServices);
    };


    const createInvoice = async (medicalRecordId, discount) => {
        toast.warning("Đang tạo hóa đơn...");
        setLoadingInvoice(true);
        try {

            const data = {
                medicalRecordId: medicalRecordId,
                createBy: userLoggedIn?.user?.details.employeeName,
            }

            const res = await axios.post('/invoice/create', data, {
                headers: {Authorization: `Bearer ${token}`},
            });

            if (res.status === 201) {
                toast.success("Tạo hóa đơn thành công", {autoClose: 3000});
                onClose();  // Đóng dialog
            }

        } catch (e) {
            toast.error("Không thể tạo hóa đơn", {autoClose: 3000});
            console.error("Error creating invoice:", e);
        } finally {
            setLoadingInvoice(false);
        }
    }

    const isToothOrJawSelected = (forValue) => {
        return medicalRecord.usedService.some(s => s.for === forValue);
    }

    const handleSaveMedicalRecord = async () => {
        setLoadingRecord(true);
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

            // Gửi request tới API
            const response = await axios.post('/medical-record/create', payload, {
                headers: {Authorization: `Bearer ${token}`},
            });

            if (response.status === 201) {
                toast.success("Thêm hồ sơ y tế thành công", {autoClose: 3000});
                await createInvoice(response.data.record._id);  // Tạo hóa đơn sau khi tạo hồ sơ y tế
                refresh();  // Refresh lại trang
            }
        } catch (error) {
            console.error("Error creating medical record:", error);
            toast.error("Không thể thêm hồ sơ y tế", {autoClose: 3000});
        } finally {
            setLoadingRecord(false)
        }
    };


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>Thêm Hồ Sơ Y Tế</DialogTitle>
            <DialogContent>
                <Box sx={{width: '100%', mt: 3}}>
                    <TextField
                        label="Chẩn đoán"
                        fullWidth
                        multiline
                        required
                        rows={4}
                        value={medicalRecord.diagnosis}
                        onChange={(e) => setMedicalRecord({...medicalRecord, diagnosis: e.target.value})}
                    />
                    <Grid container spacing={2} sx={{mt: 1}}>
                        {medicalRecord?.usedService?.map((service, index) => (
                            <Grid item xs={12} key={index} sx={{display: 'flex', alignItems: 'center'}}>
                                <FormControl sx={{width: '40%'}}>
                                    <InputLabel>Dịch vụ</InputLabel>
                                    <Select
                                        value={service.service}
                                        onChange={(e) => handleServiceChange(e, index)}
                                    >
                                        {services
                                            .filter((s) => !selectedServices.has(s._id) || s._id === service.service) // Bao gồm cả dịch vụ đã chọn
                                            .map((s) => (
                                                <MenuItem key={s._id} value={s._id}>
                                                    {s.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>

                                {/* Hiển thị giá tiền và giảm giá của dịch vụ */}
                                {service.service && services.find(s => s._id === service.service) && (
                                    <Box sx={{display: 'inline-block', ml: 2}}>
                                        <Typography
                                            variant="body1">Giá: {services.find(s => s._id === service.service)?.price}</Typography>
                                        <Typography variant="body1">Giảm
                                            giá: {services.find(s => s._id === service.service)?.discount}%</Typography>
                                    </Box>
                                )}

                                {/* Hiển thị ComboBox Tooth nếu unit là 'tooth' */}
                                {service.service && services.find(s => s._id === service.service)?.unit === 'tooth' && (
                                    <FormControl sx={{width: '20%', ml: 2}}>
                                        <InputLabel>Chọn răng</InputLabel>
                                        <Select
                                            value={service.for}
                                            onChange={(e) => handleToothOrJawChange(e, index)}
                                            fullWidth
                                        >
                                            <MenuItem value="">Chọn răng</MenuItem>
                                            {tooth.map(t => (
                                                <MenuItem key={t._id} value={t.name}>{t.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}

                                {service.service && services.find(s => s._id === service.service)?.unit === 'jaw' && (
                                    <FormControl sx={{width: '40%', ml: 2}}>
                                        <InputLabel>Chọn hàm</InputLabel>
                                        <Select
                                            value={service.for}
                                            onChange={(e) => handleToothOrJawChange(e, index)}
                                            fullWidth
                                        >
                                            <MenuItem value="">Chọn hàm</MenuItem>
                                            {jaw.map(t => (
                                                <MenuItem key={t._id} value={t.name}>{t.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}

                                {/* Nút xóa dịch vụ */}
                                <Button onClick={() => handleRemoveService(index)} variant="outlined" color="error"
                                        sx={{ml: 2}}>
                                    Xóa
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    <Button onClick={handleAddService} variant="outlined" sx={{mt: 1}}>Thêm Dịch Vụ</Button>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2}}>
                        <TextField
                            label="Kết quả điều trị"
                            sx={{mt: 1}}
                            fullWidth
                            multiline
                            required
                            rows={4}
                            value={medicalRecord.result}
                            onChange={(e) => setMedicalRecord({...medicalRecord, result: e.target.value})}
                        />
                        <TextField
                            label="Ghi chú"
                            sx={{mt: 1}}
                            fullWidth
                            multiline
                            rows={4}
                            value={medicalRecord.note}
                            onChange={(e) => setMedicalRecord({...medicalRecord, note: e.target.value})}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                {!loadingRecord ? (
                    <>
                        <Button onClick={onClose} color="error">Hủy</Button>
                        <Button onClick={handleSaveMedicalRecord} color="success"
                                variant="contained">Lưu</Button>
                    </>) : (

                    loadingInvoice ? (
                        <Typography>Đang tạo hóa đơn...</Typography>
                    ) : (
                        <Typography>Đang lưu hồ sơ...</Typography>
                    )

                )}
            </DialogActions>
        </Dialog>
    );
};


export default MedicalRecordDialog;