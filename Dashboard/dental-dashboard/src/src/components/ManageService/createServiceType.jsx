import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import useUserStore from "../../hooks/auth/useUserStore";
import "../../css/loadingEffect.css";
import axios from "../../config/axiosConfig";
import { toast } from "react-toastify";

const CreateServiceType = ({ open, onClose, onSuccess }) => {
  const [typeName, setTypeName] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useUserStore();

  const create = async (token) => {
    try {
      setLoading(true);
      const respone = await axios.post(
        "/service-type/create",
        {
          typeName: typeName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (respone.status === 200) {
        setLoading(false);
        toast.success(respone.data.message, {
          autoClose: 3000,
          hideProgressBar: false,
        });
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(error.response?.data.message, {
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  const handleSubmit = () => {
    create(token);
    if (!loading) {
      setTypeName("");
      // Đóng dialog sau khi thêm
      onClose();
    }
  };

  const handleClose = () => {
    setTypeName("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Thêm mới loại dịch vụ</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Tên loại dịch vụ"
          fullWidth
          variant="outlined"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        {!loading && (
          <Button onClick={handleClose} color="error" variant="contained">
            Hủy
          </Button>
        )}
        {!loading && (
          <Button onClick={handleSubmit} color="success" variant="contained">
            Thêm
          </Button>
        )}
        {loading && (
          <Typography
            className="wave-effect"
            sx={{
              mr: "1px",
              width: "100%",
              textAlign: "right",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            {"Đang thêm loại dịch vụ ...".split("").map((char, index) => (
              <span key={index} style={{ animationDelay: `${index * 100}ms` }}>
                {char}{" "}
              </span>
            ))}
          </Typography>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateServiceType;
