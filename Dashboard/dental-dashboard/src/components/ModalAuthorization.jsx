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
      <DialogContent sx={{ width: "auto" }}>
        <Typography>Bạn cần đăng nhập để truy cập trang này.</Typography>
        <Typography>Vui lòng quay về trang đăng nhập.</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          component={Link}
          to="/dashboard/login"
          color="primary"
          variant="contained"
        >
          Đăng nhập
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAuthorization;
