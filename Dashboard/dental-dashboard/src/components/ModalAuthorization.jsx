import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const ModalAuthorization = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thông báo</DialogTitle>
      <DialogContent>
        <Typography>
          Bạn cần đăng nhập để truy cập trang này. Vui lòng quay về trang đăng
          nhập.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
        <Button component={Link} to="/dashboard/login" color="primary">
          Đăng nhập
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAuthorization;
