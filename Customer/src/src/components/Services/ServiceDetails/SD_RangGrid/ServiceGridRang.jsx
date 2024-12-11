import React from 'react';
import { useNavigate } from 'react-router-dom';

const servicesData = [
    { id: "rang-su-tham-my", title: "Răng Sứ Thẩm Mỹ", description: " Sự lựa chọn tuyệt vời cho những ai muốn cải thiện nụ cười của mình.", imgSrc: "https://picsum.photos/200" },
    { id: "tay-trang-rang", title: "Tẩy Trắng Răng", description: "Giải pháp hiệu quả cho những người mất răng, mang lại lợi ích về thẩm mỹ và chức năng. ", imgSrc: "https://picsum.photos/2001" },
    { id: "rang-gia-thao-lap", title: "Răng Giả Tháo Lắp", description: "Giải pháp hiệu quả để cải thiện sự sắp xếp của răng và hàm, mang lại lợi ích về thẩm mỹ và chức năng.", imgSrc: "https://picsum.photos/2003" },
    
    
    // Thêm các dịch vụ khác
];

const ServiceGrid = () => {
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/service/${id}`);
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Cột có chiều rộng tối thiểu 250px
        gap: '20px',
        padding: '30px',
    };

    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
    };

    const imageStyle = {
        width: '100%',
        height: '150px', // Thay đổi chiều cao để phù hợp
        objectFit: 'cover',
        borderRadius: '8px',
    };

    const buttonStyle = {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#ff6b6b',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };


    return (
        <div style={gridStyle}>
            {servicesData.map((service) => (
                <div style={cardStyle} key={service.id}>
                    <img src={service.imgSrc} alt={service.title} style={imageStyle} />
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <button
                        onClick={() => handleNavigate(service.id)}
                        style={buttonStyle}
                    >
                        Xem thêm
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ServiceGrid;
