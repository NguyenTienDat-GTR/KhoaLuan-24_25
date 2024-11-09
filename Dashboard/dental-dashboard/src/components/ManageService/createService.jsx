import { useEffect, useState } from "react";
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
  Add,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import useGetAllService from "../../hooks/service/useGetAllServiceType";
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

const units = {
  tooth: "Răng",
  jaw: "Hàm",
  treatment: "Liệu trình",
  set: "Bộ",
  session: "Lần",
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
  const { token, userLoggedIn } = useUserStore();
  const [minPrice, setMinPrice] = useState(""); // Giá thấp nhất
  const [maxPrice, setMaxPrice] = useState(""); // Giá cao nhất
  const [unit, setUnit] = useState("");
  const [title, setTitle] = useState("");
  const [mainHeadings, setMainHeadings] = useState([]);
  const [addArticle, setAddArticle] = useState(false);
  const [articleId, setArticleId] = useState("");

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
    setUnit("");
    setMinPrice("");
    setMaxPrice("");
    setTitle("");
    setMainHeadings([]);
    setArticleId("");
  };
  const handleClose = () => {
    onClose();
    handleReset();
    setLoading(false);
  };

  const handleImageChange = (
    event,
    mainIndex,
    subIndex = null,
    subSubIndex = null
  ) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    const updatedHeadings = [...mainHeadings];

    if (subSubIndex !== null) {
      updatedHeadings[mainIndex].subheadings[subIndex].subSubheadings[
        subSubIndex
      ] = {
        ...updatedHeadings[mainIndex].subheadings[subIndex].subSubheadings[
          subSubIndex
        ],
        image: file,
        imageURL: fileURL,
      };
    } else if (subIndex !== null) {
      updatedHeadings[mainIndex].subheadings[subIndex] = {
        ...updatedHeadings[mainIndex].subheadings[subIndex],
        image: file,
        imageURL: fileURL,
      };
    } else {
      updatedHeadings[mainIndex] = {
        ...updatedHeadings[mainIndex],
        image: file,
        imageURL: fileURL,
      };
    }

    setMainHeadings(updatedHeadings); // Cập nhật lại state
  };

  // Hàm thêm heading cấp một
  const addMainHeading = () => {
    setMainHeadings([
      ...mainHeadings,
      { title: "", content: "", image: "", subheadings: [] },
    ]);
  };

  // Hàm cập nhật nội dung heading cấp một
  const updateMainHeading = (index, key, value) => {
    const newMainHeadings = [...mainHeadings];
    newMainHeadings[index][key] = value;
    setMainHeadings(newMainHeadings);
  };

  // Hàm thêm heading cấp hai
  const addSubheading = (mainIndex) => {
    const newMainHeadings = [...mainHeadings];
    newMainHeadings[mainIndex].subheadings.push({
      title: "",
      content: "",
      image: "",
      subSubheadings: [],
    });
    setMainHeadings(newMainHeadings);
  };

  // Hàm thêm heading cấp ba
  const addSubSubheading = (mainIndex, subIndex) => {
    const newMainHeadings = [...mainHeadings];
    newMainHeadings[mainIndex].subheadings[subIndex].subSubheadings.push({
      title: "",
      content: "",
    });
    setMainHeadings(newMainHeadings);
  };

  // Hàm cập nhật nội dung heading cấp hai hoặc ba
  const updateSubheadingContent = (
    mainIndex,
    subIndex,
    key,
    value,
    isSubSub = false,
    subSubIndex = null
  ) => {
    const newMainHeadings = [...mainHeadings];
    if (isSubSub) {
      newMainHeadings[mainIndex].subheadings[subIndex].subSubheadings[
        subSubIndex
      ][key] = value;
    } else {
      newMainHeadings[mainIndex].subheadings[subIndex][key] = value;
    }
    setMainHeadings(newMainHeadings);
  };

  // Hàm xóa heading cấp một
  const removeMainHeading = (mainIndex) => {
    setMainHeadings(mainHeadings.filter((_, index) => index !== mainIndex));
  };

  // Hàm xóa heading cấp hai
  const removeSubheading = (mainIndex, subIndex) => {
    const newMainHeadings = [...mainHeadings];
    newMainHeadings[mainIndex].subheadings = newMainHeadings[
      mainIndex
    ].subheadings.filter((_, index) => index !== subIndex);
    setMainHeadings(newMainHeadings);
  };

  // Hàm xóa heading cấp ba
  const removeSubSubheading = (mainIndex, subIndex, subSubIndex) => {
    const newMainHeadings = [...mainHeadings];
    newMainHeadings[mainIndex].subheadings[subIndex].subSubheadings =
      newMainHeadings[mainIndex].subheadings[subIndex].subSubheadings.filter(
        (_, index) => index !== subSubIndex
      );
    setMainHeadings(newMainHeadings);
  };

  const handleAddArticle = async () => {
    console.log("Add article");
    if (title && mainHeadings.length > 0) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("mainHeadings", JSON.stringify(mainHeadings));
      formData.append("createBy", userLoggedIn?.user.details.employeeName);

      mainHeadings.forEach((main) => {
        if (main.image) {
          formData.append("articleImage", main.image); // Thêm ảnh chính
        }
        main.subheadings.forEach((sub) => {
          if (sub.image) {
            formData.append("articleImage", sub.image); // Thêm ảnh phụ
          }
          sub.subSubheadings.forEach((subSub) => {
            if (subSub.image) {
              formData.append("articleImage", subSub.image); // Thêm ảnh phụ chi tiết
            }
          });
        });
      });

      try {
        const response = await axios.post("/article/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 201) {
          const articleId = response.data.article._id;
          setArticleId(articleId);
          setAddArticle(true);
          toast.success("Bài viết được tạo thành công!", { autoClose: 3000 });
          return articleId; // Trả về articleId ngay khi bài viết được tạo thành công
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Đã xảy ra lỗi.", {
          autoClose: 3000,
        });
        setAddArticle(false);
        setLoading(false);
      }
    }
    return null;
  };

  const handleAddService = async (articleId) => {
    console.log("Add service");
    // Chuyển đổi giá trị từ string sang number để so sánh
    const minPriceNum = parseInt(minPrice);
    const maxPriceNum = parseInt(maxPrice);
    if (
      serviceType &&
      serviceName &&
      price > 0 &&
      description &&
      images.length > 0 &&
      minPrice &&
      maxPrice &&
      minPriceNum <= maxPriceNum &&
      unit
    ) {
      const formData = new FormData();
      formData.append("name", serviceName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("priceRange", `${minPrice} - ${maxPrice}`);
      formData.append("serviceTypeName", serviceType);
      formData.append("discount", discount);
      formData.append("duration", Number.parseInt(duration));
      formData.append("unit", unit);
      formData.append("blogId", articleId);

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
          setLoading(false);
          setAddArticle(false);
        }
      } catch (error) {
        toast.error(error.response?.data?.message, {
          autoClose: 3000,
          hideProgressBar: false,
        });
        setLoading(false);
      }
    } else {
      if (minPriceNum > maxPriceNum) {
        toast.error("Giá thấp nhất phải nhỏ hơn hoặc bằng giá cao nhất.");
      } else if (mainHeadings.length <= 0 || !title) {
        toast.error("Vui lòng điền đầy đủ tiêu đề và nội dung bài viết");
      } else {
        toast.error("Vui lòng điền đầy đủ thông tin dịch vụ.");
      }
      setLoading(false);
    }
  };

  const addServiceAndArticle = async () => {
    setLoading(true);
    const articleId = await handleAddArticle();
    if (articleId) {
      await handleAddService(articleId); // Truyền articleId vào hàm handleAddService
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>Thêm mới dịch vụ</DialogTitle>
      <DialogContent>
        <Box display="flex" gap={2}>
          <Box
            flex={1}
            p={2}
            border={1}
            borderColor="grey.300"
            borderRadius={2}
          >
            <Typography variant="h6">Thông tin dịch vụ</Typography>
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
            <Box display="flex" gap={2} mt={2}>
              <TextField
                label="Giá thấp nhất (VND)"
                type="number"
                fullWidth
                required
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <TextField
                label="Giá cao nhất (VND)"
                type="number"
                fullWidth
                required
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Box>
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
            <FormControl fullWidth required margin="normal">
              {/* <InputLabel shrink={Boolean(unit)}>Đơn vị tính</InputLabel> */}
              <Select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">Chọn đơn vị tính *</MenuItem>
                {Object.entries(units).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              <InputLabel shrink={Boolean(duration)}>
                Thời gian (phút)
              </InputLabel>
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
          </Box>
          {/* Cột 2: Tạo bài viết */}
          <Box
            flex={1}
            p={2}
            border={1}
            borderColor="grey.300"
            borderRadius={2}
          >
            <Typography variant="h6">Tạo bài viết</Typography>
            <TextField
              label="Tiêu đề bài viết"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Main Headings */}
            {mainHeadings.map((main, mainIndex) => (
              <Box key={mainIndex} mb={2}>
                <TextField
                  label="Tiêu đề cấp 1"
                  fullWidth
                  value={main.title}
                  onChange={(e) =>
                    updateMainHeading(mainIndex, "title", e.target.value)
                  }
                  margin="normal"
                />
                <IconButton
                  color="error"
                  onClick={() => removeMainHeading(mainIndex)}
                >
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
                  onChange={(e) =>
                    updateMainHeading(mainIndex, "content", e.target.value)
                  }
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
                        updateSubheadingContent(
                          mainIndex,
                          subIndex,
                          "title",
                          e.target.value
                        )
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
                        onChange={(e) =>
                          handleImageChange(e, mainIndex, subIndex)
                        }
                      />
                    </Button>
                    {sub.image && (
                      <Box mt={2}>
                        <img
                          src={sub.imageURL}
                          alt="subheading-image"
                          width="100"
                        />
                      </Box>
                    )}
                    <TextField
                      label="Mô tả tiêu đề cấp 2"
                      fullWidth
                      multiline
                      rows={3}
                      value={sub.content}
                      onChange={(e) =>
                        updateSubheadingContent(
                          mainIndex,
                          subIndex,
                          "content",
                          e.target.value
                        )
                      }
                      margin="normal"
                    />

                    <Button
                      variant="contained"
                      onClick={() => addSubSubheading(mainIndex, subIndex)}
                      startIcon={<Add />}
                    >
                      Thêm tiêu đề cấp 3
                    </Button>

                    {sub.subSubheadings.map((subSub, subSubIndex) => (
                      <Box key={subSubIndex} ml={4} mt={2}>
                        <TextField
                          label="Tiêu đề cấp 3"
                          fullWidth
                          value={subSub.title}
                          onChange={(e) =>
                            updateSubheadingContent(
                              mainIndex,
                              subIndex,
                              "subSubheadings",
                              e.target.value,
                              subSubIndex
                            )
                          }
                          margin="normal"
                        />
                        <IconButton
                          color="error"
                          onClick={() =>
                            removeSubSubheading(
                              mainIndex,
                              subIndex,
                              subSubIndex
                            )
                          }
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<AddPhotoAlternate />}
                        >
                          Thêm hình ảnh tiêu đề cấp 3
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) =>
                              handleImageChange(
                                e,
                                mainIndex,
                                subIndex,
                                subSubIndex
                              )
                            }
                          />
                        </Button>
                        {subSub.image && (
                          <Box mt={2}>
                            <img
                              src={subSub.imageURL}
                              alt="subsubheading-image"
                              width="100"
                            />
                          </Box>
                        )}
                        <TextField
                          label="Mô tả tiêu đề cấp 3"
                          fullWidth
                          multiline
                          rows={3}
                          value={subSub.content}
                          onChange={(e) =>
                            updateSubheadingContent(
                              mainIndex,
                              subIndex,
                              "subSubheadings",
                              e.target.value,
                              subSubIndex
                            )
                          }
                          margin="normal"
                        />
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            ))}
            <Button onClick={addMainHeading} startIcon={<Add />}>
              Thêm tiểu mục cấp 1
            </Button>
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
            onClick={addServiceAndArticle}
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
