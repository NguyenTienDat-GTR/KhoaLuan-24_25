import treEm from "..//Services/img/benh/chinh_nha_tre_em.jpg";
import nhaChu from "..//Services/img/benh/nha-chu.jpg";
import nuou from "..//Services/img/benh/nuou.jpg";
import tuy from "..//Services/img/benh/tuy.jpg";
import sauRang from "..//Services/img/benh/sau-rang.jpg";
import caoVoi from "..//images/pricelist/cao-voi-rang.png";
import suMy from "..//images/pricelist/su-my.jpg";
import tayRang from "..//images/pricelist/tay-trang-rang.jpg";
import trongSuot from "..//images/pricelist/trong-suot.jpg";
import danSu from "..//Services/img/dan-su/dan-su-venner.jpg";
import tramRang from "..//Services/img/tram_rang/tram-rang.jpg";
import rangThaoLap from "..//Services/img/phuc-hinh/rang-gia-thao-lap.jpg";
import thaoLap from "..//Services/img/nieng-rang/thao-lap.jpg";
import rangMacCai from "..//Services/img/nieng-rang/nieng-rang-mac-cai.jpg";
import Implant from "..//images/intro/TRIP.jpg";

const servicesDataThamMy = [
    {
        id: "Điều trị bệnh lý nha khoa",
        title: "Nha khoa trẻ em",
        imgSrc: treEm,
        link: "/nha-khoa-tre-em",
        price: "500.000 - 1.000.000 VNĐ/răng",
    },
    {
        id: "Điều trị bệnh lý nha khoa",
        title: "Điều trị nha chu",
        imgSrc: nhaChu,
        link: "/dieu-tri-nha-chu",
        price: "500.000 - 1.000.000 VNĐ/răng",
    },
    {
        id: "Điều trị bệnh lý nha khoa",
        title: "Điều trị nướu",
        imgSrc: nuou,
        link: "/dieu-tri-nuou",
        price: "500.000 - 1.000.000 VNĐ/răng",
    },
    {
        id: "Điều trị bệnh lý nha khoa",
        title: "Điều trị tủy",
        imgSrc: tuy,
        link: "/dieu-tri-tuy",
        price: "500.000 - 1.000.000 VNĐ/răng",
    },
    {
        id: "Điều trị bệnh lý nha khoa",
        title: "Điều trị sâu răng",
        imgSrc: sauRang,
        link: "/dieu-tri-sau-rang",
        price: "500.000 - 1.000.000 VNĐ/răng",
    },

    {
        id: "Niềng răng - Cải thiện khớp cắn",
        title: "Niềng răng mắc cài",
        imgSrc: rangMacCai, // Thay thế bằng đường dẫn ảnh thực tế
        link: "/nieng-rang-mac-cai", // Đường dẫn trang chi tiết
        price: "30.000.000 - 50.000.000 VNĐ/liệu trình (tùy vào tình trạng răng)",
    },
    {
        id: "Niềng răng - Cải thiện khớp cắn",
        title: "Niềng răng tháo lắp",
        imgSrc: thaoLap,
        link: "/nieng-rang-thao-lap",
        price: "5.000.000 - 8.000.000 VNĐ/hàm (tùy vào tình trạng răng)",
    },
    {
        id: "Niềng răng - Cải thiện khớp cắn",
        title: "Niềng răng trong suốt",
        imgSrc: trongSuot,
        price: "32.000.000 - 70.000.000 VNĐ/hàm (tùy vào tình trạng răng)",
        link: "/nieng-rang-trong-suot",
    },
    {
        id: "Phục hình răng đã mất",
        title: "Hàm giả tháo lắp",
        imgSrc: rangThaoLap, // Thay thế bằng đường dẫn ảnh thực tế
        link: "/ham-gia-thao-lap", // Đường dẫn trang chi tiết
        price: "800.000 - 1.000.000 VNĐ/răng (tùy vào tình trạng răng)",
    },
    {
        id: "Phục hình răng đã mất",
        title: "Cấy ghép Implant",
        imgSrc: Implant,
        link: "/cay-ghep-implant",
        price: "3.000.000 - 13.000.000 VNĐ/răng (tùy vào tình trạng răng)",
    },
    {
        id: "Phục hình răng đã mất",
        title: "Răng sứ thẩm mỹ",
        imgSrc: suMy,
        link: "/rang-su-tham-my",
        price: "800.000 - 12.000.000 VNĐ/răng (tùy vào loại sứ)",
    },
    {
        id: "Nha khoa thẩm mỹ",
        title: "Tẩy trắng răng",
        imgSrc: tayRang, // Thay thế bằng đường dẫn ảnh thực tế
        link: "/tay-trang-rang", // Đường dẫn trang chi tiết
        price: "99.000 VNĐ/hàm",
    },
    {
        id: "Nha khoa thẩm mỹ",
        title: "Dán sứ Veneer",
        imgSrc: danSu,
        link: "/dan-su-veneer",
        price: "6.000.000 VNĐ/răng",
    },
    {
        id: "Nha khoa thẩm mỹ",
        title: "Trám răng",
        imgSrc: tramRang,
        link: "/tram-rang",
        price: "99.000 VNĐ/răng",
    },
    {
        id: "Nha khoa thẩm mỹ",
        title: "Cạo vôi răng",
        imgSrc: caoVoi,
        link: "/cao-voi-rang",
        price: "99.000 VNĐ/răng",
    },
];