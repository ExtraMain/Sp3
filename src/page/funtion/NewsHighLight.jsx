import React from "react";
import "../../style/NewsHighlight.css";
import { Link } from "react-router-dom";

const NewsHighlight = () => {
  return ( 
    <section className="news-highlight">
      <h2 className="news-title">TIN TỨC NỔI BẬT</h2>
      <div className="news-title-line-wrapper">
        <div className="news-title-line"></div>
        <img src="/photos/sign.png" alt="logo" className="news-title-logo" />
        <div className="news-title-line"></div>
      </div>
      <p className="news-subtitle">
        Mời bạn cùng tìm đọc các bài viết hay nhất về cẩm nang làm đẹp và các dịch vụ chuyên môn
      </p>
      <div className="news-container">
        <Link to="/tin-tuc/xoa-not-ruoi" className="news-card">
          <img src="https://hd1.hotdeal.vn/images/uploads/2016/Thang%203/31/245126/245126-tron-goi-tri-mun-body%20%288%29.jpg" alt="Xóa nốt ruồi" />
          <h3>Xóa nốt ruồi – tẩy nốt ruồi bằng laser an toàn tại Beryl Beauty & Spa</h3>
          <p>Lý do bạn nên đến với Beryl Beauty & Spa để xóa nốt ruồi: ✦ Tiềm ẩn nguy cơ hình thành...</p>
        </Link>

        <Link to="/tin-tuc/dieu-tri-mun-blue-light" className="news-card">
          <img src="https://tse4.mm.bing.net/th/id/OIP.30hqpiluhDdefZ8lLTmzcwHaEo?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Blue Light Laser" />
          <h3>Điều trị mụn hiệu quả bằng công nghệ Blue Light và Green Laser</h3>
          <p>Công nghệ điều trị mụn bằng ánh sáng xanh Green Laser là phương pháp điều...</p>
        </Link>

        <Link to="/tin-tuc/lam-trang-da-baby-skin" className="news-card">
          <img src="https://cdn.bestme.vn/images/bestme/bst-50-hinh-anh-spa-cham-soc-da-dep-sang-chat-luong-hd-6.jpg" alt="Baby Skin" />
          <h3>Làm trắng da mặt hoàn hảo bằng công nghệ độc quyền Baby Skin</h3>
          <p>Đối tượng phù hợp là người da lão hóa, chùng, chảy xệ, nhiều nếp nhăn...</p>
        </Link>

        <Link to="/tin-tuc/triet-long" className="news-card">
          <img src="https://hillsbeauty.vn/wp-content/uploads/2020/03/triet-long-mat-vinh-vien-dep.jpg" alt="Triệt lông" />
          <h3>Triệt lông an toàn bằng công nghệ hiện đại tại Beryl Spa</h3>
          <p>Giải pháp triệt lông không đau rát, không tổn thương da, mang lại làn da mịn màng và sáng khỏe...</p>
        </Link>
      </div>

    </section>
  );
};

export default NewsHighlight;
