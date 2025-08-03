import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGift } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import "../../style/ServiceHighlights.css";

const Hanghoa = [
  {
    id: "gd001",
    ten: "Thư giãn với tinh dầu dưỡng sinh",
    gia: 150000,
    images: ["https://i.pinimg.com/736x/ca/65/58/ca6558a6ca53075abb34bbaf1f77a9a7.jpg"],
    thoi_luong: "30 - 45 phút",
  },
  {
    id: "gd002",
    ten: "Gội đầu thảo dược thư giãn",
    gia: 150000,
    images: ["https://i.pinimg.com/736x/38/b0/71/38b0718ab8877cb2479b2535c0878957.jpg"],
    thoi_luong: "45 phút",
  },
  {
    id: "gd003",
    ten: "Liệu pháp dưỡng tóc thiên nhiên",
    gia: 150000,
    images: ["https://i.pinimg.com/736x/7c/3b/bb/7c3bbb6f71f7bd2fe698078a07abacb7.jpg"],
    thoi_luong: "90 phút",
  },
  {
    id: "tm001",
    ten: "Trị mụn cơ bản-Làm sạch da",
    gia: 400000,
    images: ["https://i.pinimg.com/736x/77/90/a4/7790a4cfed82352de2ceebd8805cb4cf.jpg"],
    thoi_luong: "50 phút",
  },
  {
    id: "tl004",
    ten: "Triệt lông tay – sáng mịn cả cánh tay",
    gia: 500000,
    images: ["https://i.pinimg.com/736x/31/07/f4/3107f42ef503c513f0a97dececfaf9a0.jpg"],
    thoi_luong: "35 phút",
  },
  {
    id: "td003",
    ten: "Liệu trình tắm trắng collagen – ngọc trai – sữa non",
    gia: 600000,
    images: ["https://i.pinimg.com/736x/9c/16/2d/9c162d4ebd49967af00075fbf1d389ad.jpg"],
    thoi_luong: "75 phút",
  },
  {
    id: "gd004",
    ten: "Gội đầu dưỡng sinh",
    gia: 2980000,
    images: ["https://hispa.vn/wp-content/uploads/2022/09/goi-dau-duong-sinh-4.jpg"],
    thoi_luong: "30 - 60 phút",
  },
  {
    id: "gd005",
    ten: "Gội đầu kết hợp xông hơi thảo dược",
    gia: 220000,
    images: ["https://tse4.mm.bing.net/th/id/OIP.vPLEjgbBqVikApfuFpCL9gHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"],
    thoi_luong: "45 phút",
  }
];


const ServiceHighlights = () => {
  const navigate = useNavigate();

  return (
    <div className="section destinations-section" id="linhkien">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <div className="section-header">
        <div className="section-title-part">
          <h2 className="section-title" id="diem-den">
            HOT SERVICES
          </h2>
          <p className="section-subtitle">
            NHỮNG DỊCH VỤ NỔI BẬT ĐƯỢC YÊU THÍCH NĂM 2025
          </p>

        </div>
        <button
          className="view-all-button"
          onClick={() => navigate("/AllDichvu")}
        >
          Xem tất cả <ArrowRight className="button-icon-small" />
        </button>
      </div>

      <div className="destination-grid">
        {Hanghoa.map((lk, idx) => (
          <div key={idx} className="products-card">
            <div className="products-image-container">
              <img
                src={lk.images[0] || "https://example.com/placeholder.jpg"}
                alt={lk.ten}
                className="products-image"
              />
            </div>
            <div className="products-details">
              <h3 className="products-name">{lk.ten}</h3>
              <p className="products-price">{lk.gia.toLocaleString("vi-VN")} VNĐ</p>
              <p className="products-duration">{lk.thoi_luong}</p>
              {lk.khuyen_mai && (
                <p className="products-sale">
                  <FaGift style={{ marginRight: "6px" }} />
                  {lk.khuyen_mai}
                </p>
              )}
              <button
                className="shop-now-btn"
                onClick={() => navigate(`/dich-vu/${lk.id}`)}
              >
                Visit Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHighlights;
