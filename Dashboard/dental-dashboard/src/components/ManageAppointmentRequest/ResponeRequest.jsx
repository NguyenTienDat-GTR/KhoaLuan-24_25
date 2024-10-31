import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ResponeRequest = ({ open, onClose, onSuccess, selectedRequest }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(
    selectedRequest?.appointmentDate || ""
  );
  const [appointmentTime, setAppointmentTime] = useState(
    selectedRequest?.appointmentTime || ""
  );
  const [doctorGender, setDoctorGender] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [service, setService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [note, setNote] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSuccess();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleAccept = () => {};

  const handleReject = () => {};

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Phản hồi yêu cầu đặt lịch</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Tên khách hàng"
              value={selectedRequest?.customerName}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Số điện thoại"
              value={selectedRequest?.customerPhone}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Email"
              value={selectedRequest?.customerEmail || ""}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={{ mt: 2 }}
            />
            <Typography sx={{ mt: 2 }}>Giới tính bác sĩ</Typography>
            <RadioGroup
              row
              value={doctorGender}
              onChange={(e) => setDoctorGender(e.target.value)}
              sx={{ mt: 1 }}
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Nam"
                disabled={!isEditing}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Nữ"
                disabled={!isEditing}
              />
            </RadioGroup>
            <Select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              displayEmpty
              fullWidth
              disabled={!isEditing}
              sx={{ mt: 2 }}
            >
              <MenuItem value="">Chọn loại dịch vụ</MenuItem>
              {/* Render danh sách loại dịch vụ */}
            </Select>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              label="Ngày yêu cầu"
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              fullWidth
              InputProps={{ readOnly: !isEditing }}
              sx={{ mt: 2 }}
            />
            <Select
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              displayEmpty
              fullWidth
              disabled={!isEditing}
              sx={{ mt: 2 }}
            >
              {[...Array(9).keys()]
                .map((i) => `${i + 8}:00`)
                .filter((time) => time !== "12:00")
                .map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
            </Select>
            <Select
              value={service}
              onChange={(e) => setService(e.target.value)}
              displayEmpty
              fullWidth
              disabled={!isEditing}
              sx={{ mt: 2 }}
            >
              <MenuItem value="">Chọn dịch vụ</MenuItem>
              {/* Render danh sách dịch vụ dựa trên loại dịch vụ đã chọn */}
            </Select>
            <TextField
              label="Bác sĩ"
              value={selectedDoctor}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Ghi chú"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              multiline
              rows={3}
              fullWidth
              InputProps={{ readOnly: !isEditing }}
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã</TableCell>
                <TableCell>Họ tên</TableCell>
                <TableCell>Giới tính</TableCell>
                <TableCell>Thời gian rảnh</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{/* Render danh sách bác sĩ */}</TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        {isEditing ? (
          <>
            <Button onClick={handleSave} color="primary">
              Lưu
            </Button>
            <Button onClick={handleCancelEdit} color="secondary">
              Hủy chỉnh sửa
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleEdit} color="primary">
              Chỉnh sửa
            </Button>
            <Button onClick={handleAccept} color="success">
              Chấp nhận
            </Button>
            <Button onClick={handleReject} color="error">
              Từ chối
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ResponeRequest;
