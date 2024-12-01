import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import {
  Cancel,
  Save,
  RestartAlt,
  Add,
  Delete,
  AddPhotoAlternate,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "../../config/axiosConfig";
import useUserStore from "../../hooks/auth/useUserStore";

const CreatePolicy = ({ open, onClose }) => {
  const [mainHeadings, setMainHeadings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token, userLoggedIn } = useUserStore();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("")

  const getVietnamTimeString = () => {
    const now = new Date();
    return now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
  };

  const handleReset = () => {
    setTitle("");
    setMainHeadings([]);
  };

  const handleClose = () => {
    onClose();
    handleReset();
    setLoading(false);
  };

  const addMainHeading = () => {
    setMainHeadings([...mainHeadings, { title: "", content: "", subheadings: [], image: null, imageURL: "" }]);
  };

  const updateMainHeading = (index, key, value) => {
    const newMainHeadings = [...mainHeadings];
    newMainHeadings[index][key] = value;
    setMainHeadings(newMainHeadings);
  };

  const addSubheading = (mainIndex) => {
    const newMainHeadings = [...mainHeadings];
    newMainHeadings[mainIndex].subheadings.push({ title: "", content: "", image: null, imageURL: "" });
    setMainHeadings(newMainHeadings);
  };

  const updateSubheading = (mainIndex, subIndex, key, value) => {
    const newMainHeadings = [...mainHeadings];
    newMainHeadings[mainIndex].subheadings[subIndex][key] = value;
    setMainHeadings(newMainHeadings);
  };

  const handleImageChange = (event, mainIndex, subIndex) => {
    const file = event.target.files[0];
    if (file) {
      const newMainHeadings = [...mainHeadings];
      if (subIndex !== undefined) {
        // Cập nhật hình ảnh cho tiêu đề cấp 2
        newMainHeadings[mainIndex].subheadings[subIndex].image = file;
        newMainHeadings[mainIndex].subheadings[subIndex].imageURL = URL.createObjectURL(file);
      } else {
        // Cập nhật hình ảnh cho tiêu đề cấp 1
        newMainHeadings[mainIndex].image = file;
        newMainHeadings[mainIndex].imageURL = URL.createObjectURL(file);
      }
      setMainHeadings(newMainHeadings);
    }
  };

  const removeMainHeading = (index) => {
    const newMainHeadings = mainHeadings.filter((_, i) => i !== index);
    setMainHeadings(newMainHeadings);
  };

  const removeSubheading = (mainIndex, subIndex) => {
    const newMainHeadings = [...mainHeadings];
    newMainHeadings[mainIndex].subheadings = newMainHeadings[mainIndex].subheadings.filter((_, i) => i !== subIndex);
    setMainHeadings(newMainHeadings);
  };

  const handleAddPolicy = async () => {
    if (title && summary && mainHeadings.length > 0) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("mainHeadings", JSON.stringify(mainHeadings));
      formData.append("createBy", userLoggedIn?.user.details.employeeName);

      const currentTime = getVietnamTimeString();
      formData.append("createAt", currentTime);

      // Thêm hình ảnh cho các tiêu đề cấp 1
      mainHeadings.forEach((main, index) => {
        if (main.image) {
          formData.append(`mainImage_${index}`, main.image);
        }
        // Thêm hình ảnh cho các tiêu đề cấp 2
        main.subheadings.forEach((sub, subIndex) => {
          if (sub.image) {
            formData.append(`subImage_${index}_${subIndex}`, sub.image);
          }
        });
      });

      try {
        const response = await axios.post("/policy/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 201) {
          toast.success("Chính sách được tạo thành công!", { autoClose: 3000 });
          handleClose();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Đã xảy ra lỗi.", {
          autoClose: 3000,
        });
      }
    } else {
      toast.error("Vui lòng nhập tiêu đề và thêm ít nhất một tiêu đề chính sách.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>Thêm mới chính sách</DialogTitle>
      <DialogContent style={{paddingTop:10}}>
        <Box mb={2}>
          <TextField
            label="Tiêu đề chính sách"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Tóm tắt chính sách"
            fullWidth
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Box>
        {mainHeadings.map((main, mainIndex) => (
          <Box key={mainIndex} mb={2}>
            <TextField
              label="Tiêu đề cấp 1"
              fullWidth
              value={main.title}
              onChange={(e) => updateMainHeading(mainIndex, "title", e.target.value)}
              margin="normal"
            />
            <IconButton color="error" onClick={() => removeMainHeading(mainIndex)}>
              <Delete fontSize="small" />
            </IconButton>
            <Button
              variant="outlined"
              component="label"
              startIcon={<AddPhotoAlternate />}
            >
              Thêm hình ảnh tiêu đề cấp 1
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, mainIndex)}
              />
            </Button>
            {main.image && (
              <Box mt={2}>
                <img src={main.imageURL} alt="title-image" width="100" />
              </Box>
            )}
            <TextField
              label="Mô tả tiêu đề cấp 1"
              fullWidth
              multiline
              rows={3}
              value={main.content}
              onChange={(e) => updateMainHeading(mainIndex, "content", e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              onClick={() => addSubheading(mainIndex)}
              startIcon={<Add />}
            >
              Thêm tiêu đề cấp 2
            </Button>

            {main.subheadings.map((sub, subIndex) => (
              <Box key={subIndex} ml={4} mt={2}>
                <TextField
                  label="Tiêu đề cấp 2"
                  fullWidth
                  value={sub.title}
                  onChange={(e) =>
                    updateSubheading(mainIndex, subIndex, "title", e.target.value)
                  }
                  margin="normal"
                />
                <IconButton
                  color="error"
                  onClick={() => removeSubheading(mainIndex, subIndex)}
                >
                  <Delete fontSize="small" />
                </IconButton>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AddPhotoAlternate />}
                >
                  Thêm hình ảnh tiêu đề cấp 2
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, mainIndex, subIndex)}
                  />
                </Button>
                {sub.image && (
                  <Box mt={2}>
                    <img src={sub.imageURL} alt="subheading-image" width="100" />
                  </Box>
                )}
                <TextField
                  label="Mô tả tiêu đề cấp 2"
                  fullWidth
                  multiline
                  rows={3}
                  value={sub.content}
                  onChange={(e) =>
                    updateSubheading(mainIndex, subIndex, "content", e.target.value)
                  }
                  margin="normal"
                />
              </Box>
            ))}
          </Box>
        ))}
        <Button variant="contained" onClick={addMainHeading} startIcon={<Add />}>
          Thêm tiêu đề cấp 1
        </Button>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          startIcon={<RestartAlt />}
          onClick={handleReset}
          color="primary"
        >
          Reset
        </Button>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleAddPolicy}
          color="success"
        >
          Lưu
        </Button>
        <Button
          variant="outlined"
          startIcon={<Cancel />}
          onClick={handleClose}
          color="error"
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePolicy;
