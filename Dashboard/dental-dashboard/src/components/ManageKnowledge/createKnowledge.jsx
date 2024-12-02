import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
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

const CreateKnowledge = ({ open, onClose }) => {
  const [mainHeadings, setMainHeadings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token, userLoggedIn } = useUserStore();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [knowledgeImages, setKnowledgeImages] = useState([]);

  const getVietnamTimeString = () => {
    const now = new Date();
    return now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
  };
const handleKnowledgeImageChange = (event) => {
    const files = Array.from(event.target.files);
    setKnowledgeImages((prevImages) => [...prevImages, ...files]);
};

  const handleReset = () => {
    setTitle("");
    setSummary("");
    setMainHeadings([]);
  };

  const handleClose = () => {
    onClose();
    handleReset();
    setLoading(false);
  };

  const addMainHeading = () => {
    setMainHeadings([...mainHeadings, { title: "", content: "", subheadings: [], imageUrls: [] }]);
  };

  const updateMainHeading = (index, key, value) => {
    const newMainHeadings = [...mainHeadings];
    newMainHeadings[index][key] = value;
    setMainHeadings(newMainHeadings);
  };

  const addSubheading = (mainIndex) => {
    const newMainHeadings = [...mainHeadings];
    newMainHeadings[mainIndex].subheadings.push({ title: "", content: "", imageUrls: [] });
    setMainHeadings(newMainHeadings);
  };

  const updateSubheading = (mainIndex, subIndex, key, value) => {
    const newMainHeadings = [...mainHeadings];
    newMainHeadings[mainIndex].subheadings[subIndex][key] = value;
    setMainHeadings(newMainHeadings);
  };

  const handleImageChange = (event, mainIndex, subIndex) => {
    const files = Array.from(event.target.files);
    if (files) {
        const updatedHeadings = [...mainHeadings];
        const target = subIndex !== undefined
            ? updatedHeadings[mainIndex].subheadings[subIndex].imageUrls
            : updatedHeadings[mainIndex].imageUrls;

        target.push(...files);
        setMainHeadings(updatedHeadings);
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

  const handleAddKnowledge = async () => {
    if (title && summary && mainHeadings.length > 0) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("summary", summary);
        formData.append("mainHeadings", JSON.stringify(mainHeadings));
        formData.append("createBy", userLoggedIn?.user.details.employeeName);
        
        const currentTime = getVietnamTimeString();
        formData.append("createAt", currentTime);

        // Thêm hình ảnh dành cho kiến thức
        knowledgeImages.forEach((image) => {
            formData.append("knowledgeImages", image);
        });

        // Thêm hình ảnh cho các tiêu đề lớn
        mainHeadings.forEach((main, mainIndex) => {
            main.imageUrls.forEach((image) => {
                formData.append(`mainImage_${mainIndex}`, image);
            });
            // Thêm hình ảnh cho các tiêu đề nhỏ
            main.subheadings.forEach((sub, subIndex) => {
                sub.imageUrls.forEach((image) => {
                    formData.append(`subImage_${mainIndex}_${subIndex}`, image);
                });
            });
        });

        try {
            const response = await axios.post("/knowledge/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 201) {
                toast.success("Kiến thức được tạo thành công!", { autoClose: 3000 });
                handleClose();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Đã xảy ra lỗi.", {
                autoClose: 3000,
            });
        }
    } else {
        toast.error("Vui lòng nhập tiêu đề và thêm ít nhất một tiêu đề kiến thức.");
    }
};


  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>Thêm mới kiến thức</DialogTitle>
      <DialogContent style={{paddingTop:10}}>
        <Box mb={2}>
          <TextField
            label="Tiêu đề kiến thức"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Tóm tắt kiến thức"
            fullWidth
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Box>
        <Box mb={2}>
                <Button variant="outlined" component="label" startIcon={<AddPhotoAlternate />}>
                    Thêm hình ảnh kiến thức
                    <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={handleKnowledgeImageChange}
                    />
                </Button>
                {knowledgeImages.map((img, index) => (
                    <Box mt={2} key={index}>
                        <img src={URL.createObjectURL(img)} alt="knowledge" width="100" />
                    </Box>
                ))}
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
            {main.imageUrls.map((img, index) => (
              <Box mt={2} key={index}>
                <img src={URL.createObjectURL(img)} alt="title-image" width="100" />
              </Box>
            ))}
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
                {sub.imageUrls.map((img, index) => (
                  <Box mt={2} key={index}>
                    <img src={URL.createObjectURL(img)} alt="subheading-image" width="100" />
                  </Box>
                ))}
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
          color="error"
          onClick={handleClose}
          startIcon={<Cancel />}
        >
          Huỷ
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddKnowledge}
          startIcon={<Save />}
          disabled={loading}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateKnowledge;
