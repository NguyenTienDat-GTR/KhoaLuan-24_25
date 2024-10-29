import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import {
  Delete,
  AddPhotoAlternate,
  Cancel,
  Save,
  RestartAlt,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import useGetAllService from "../../hooks/service/useGetAllService";
import axios from "../../config/axiosConfig";
import "../../css/loadingEffect.css";
import useUserStore from "../../hooks/auth/useUserStore";

// Hàm chuyển số thành chữ tiếng Việt
const convertNumberToText = (num) => {
  const units = ["", "nghìn", "triệu", "tỷ"];
  const numbersInWords = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];

  if (num === 0) return "Không đồng";
  let text = "";
  let unitIndex = 0;

  while (num > 0) {
    const currentSection = num % 1000;
    let sectionText = "";

    if (currentSection > 0) {
      const hundreds = Math.floor(currentSection / 100);
      const tens = Math.floor((currentSection % 100) / 10);
      const ones = currentSection % 10;

      if (hundreds > 0) sectionText += `${numbersInWords[hundreds]} trăm `;
      if (tens > 1) sectionText += `${numbersInWords[tens]} mươi `;
      else if (tens === 1) sectionText += "mười ";

      if (ones > 0) sectionText += numbersInWords[ones];
      if (unitIndex > 0) sectionText += ` ${units[unitIndex]} `;

      text = sectionText + text;
    }

    num = Math.floor(num / 1000);
    unitIndex++;
  }

  return text.trim() + " đồng";
};

const CreateService = ({ open, onClose, onSuccess }) => {
  const [serviceType, setServiceType] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [priceText, setPriceText] = useState("Không đồng");
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [images, setImages] = useState([]);
  const { services } = useGetAllService();
  const [loading, setLoading] = useState(false);
  const { token } = useUserStore();

  // Cập nhật giá trị priceText và hiển thị giá bằng chữ khi nhập giá
  const handlePriceChange = (event) => {
    const value = parseInt(event.target.value) || "";
    setPrice(value);
    setPriceText(value ? convertNumberToText(value) : "Không đồng");
  };

  const handleAddImages = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (images.length + selectedFiles.length <= 5) {
      setImages((prev) => [...prev, ...selectedFiles]);
    } else {
      toast.error("Chỉ được chọn tối đa 5 hình ảnh cho mỗi dịch vụ.");
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setServiceType("");
    setServiceName("");
    setPrice("");
    setPriceText("Không đồng");
    setDiscount(0);
    setDescription("");
    setDuration("");
    setImages([]);
  };
  const handleClose = () => {
    onClose();
    handleReset();
  };

  const handleAddService = async () => {
    setLoading(true);
    if (
      serviceType &&
      serviceName &&
      price > 0 &&
      description &&
      images.length > 0
    ) {
      const formData = new FormData();
      formData.append("name", serviceName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("serviceTypeName", serviceType);
      formData.append("discount", discount);
      formData.append("duration", Number.parseInt(duration));

      images.forEach((image) => formData.append("serviceImage", image));

      try {
        const response = await axios.post("/service/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setLoading(false);
          toast.success("Dịch vụ đã được thêm thành công!", {
            autoClose: 3000,
            hideProgressBar: false,
          });
          handleReset();
          onSuccess();
          onClose();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Đã xảy ra lỗi.", {
          autoClose: 3000,
          hideProgressBar: false,
        });
        setLoading(false);
      }
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin dịch vụ.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Thêm mới dịch vụ</DialogTitle>
      <DialogContent>
        <FormControl fullWidth required margin="normal" variant="outlined">
          {/* <InputLabel shrink={Boolean(serviceType)}>Loại dịch vụ</InputLabel> */}
          <Select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">Chọn loại dịch vụ *</MenuItem>
            {services.map((type) => (
              <MenuItem key={type._id} value={type.typeName}>
                {type.typeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Tên dịch vụ"
          fullWidth
          required
          margin="normal"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />

        <TextField
          label="Giá (VND)"
          type="number"
          fullWidth
          required
          margin="normal"
          value={price}
          onChange={handlePriceChange}
          InputProps={{ inputProps: { min: 0 } }}
        />
        <Typography variant="caption" display="block">
          Giá trị bằng chữ: {priceText}
        </Typography>

        <TextField
          label="Giảm giá (%)"
          type="number"
          fullWidth
          margin="normal"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <TextField
          label="Mô tả"
          fullWidth
          required
          multiline
          rows={3}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FormControl fullWidth required margin="normal">
          <InputLabel shrink={Boolean(duration)}>Thời gian (phút)</InputLabel>
          <Select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <MenuItem value="">Chọn thời gian</MenuItem>
            {[30, 60, 90, 120].map((time) => (
              <MenuItem key={time} value={time}>
                {time} phút
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box mt={2}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<AddPhotoAlternate />}
          >
            Thêm hình ảnh
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleAddImages}
            />
          </Button>
          <Box display="flex" mt={2} gap={1} flexWrap="wrap">
            {images.map((image, index) => (
              <Box key={index} position="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`service-image-${index}`}
                  width="80"
                  height="80"
                  style={{ borderRadius: "4px" }}
                />
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "white",
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        {!loading && (
          <Button
            variant="outlined"
            startIcon={<RestartAlt />}
            onClick={handleReset}
            color="primary"
          >
            Reset
          </Button>
        )}
        {!loading && (
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleAddService}
            color="success"
          >
            Thêm
          </Button>
        )}
        {!loading && (
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={onClose}
            color="error"
          >
            Đóng
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
            {"Đang thêm dịch vụ ...".split("").map((char, index) => (
              <span key={index} style={{ animationDelay: `${index * 100}ms` }}>
                {char}
              </span>
            ))}
          </Typography>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateService;
