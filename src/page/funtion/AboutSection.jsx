import React from 'react';
import '../../style/AboutSection.css';

const About = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Về Chúng Tôi</h2>
            <p className="about-description">
              Với hơn 10 năm kinh nghiệm trong ngành spa và làm đẹp, chúng tôi cam kết 
              mang đến cho quý khách những trải nghiệm thư giãn tuyệt vời nhất. Đội ngũ 
              chuyên viên được đào tạo bài bản, sử dụng các sản phẩm chăm sóc da cao cấp 
              và kỹ thuật massage truyền thống kết hợp hiện đại.
            </p>
            <p className="about-highlight">
              Không gian yên tĩnh, sang trọng cùng dịch vụ tận tâm - nơi bạn có thể 
              tạm quên đi những căng thẳng cuộc sống và tìm lại sự cân bằng cho cơ thể và tâm hồn.
            </p>
            <a href="/" className="about-link">
              Tìm hiểu thêm về chúng tôi
            </a>
          </div>
          
          <div className="about-images">
            <div className="image-grid">
              <div className="main-image">
                <img 
                  src="/photos/n.jpg" 
                  alt="Không gian spa sang trọng"
                  className="spa-image"
                />
                <div className="image-overlay">
                  <span>Không gian thư giãn</span>
                </div>
              </div>
              
              <div className="side-images">
                <div className="small-image">
                  <img 
                    src="/photos/o.jpg" 
                    alt="Nhân viên chuyên nghiệp"
                    className="staff-image"
                  />
                  <div className="image-overlay">
                    <span>Đội ngũ chuyên viên</span>
                  </div>
                </div>
                
                <div className="small-image">
                  <img 
                    src="/photos/p.jpg" 
                    alt="Phòng massage"
                    className="room-image"
                  />
                  <div className="image-overlay">
                    <span>Phòng massage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-stats">
          <div className="stat-item">
            <h3>10+</h3>
            <p>Năm kinh nghiệm</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Khách hàng hài lòng</p>
          </div>
          <div className="stat-item">
            <h3>20+</h3>
            <p>Dịch vụ chăm sóc</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Sản phẩm tự nhiên</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;