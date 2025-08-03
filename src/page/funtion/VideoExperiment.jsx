import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../style/VideoExperience.css";

const VideoExperience = () => {
  const videos = [
    {
      title: "99+ Mẫu Thiết Kế Spa Gội Đầu Dưỡng Sinh Độc Lạ, Hot Nhất 2024",
      thumbnail: "/photos/goi_dau.png", // ảnh đại diện
      videoUrl: "https://www.youtube.com/watch?v=XvH-eWIw3zQ",
    },
    {
      title: "Chăm Sóc Da Mặt Chuyên Sâu tại Spa",
      thumbnail: "/photos/trang_da.png",
      videoUrl: "https://www.youtube.com/watch?v=AvcBu_iNux4",
    },
    {
      title: "Liệu trình trị mụn 22 Bước với Máy hút mụn Tận gốc",
      thumbnail: "/photos/tri_mun.png",
      videoUrl: "https://www.youtube.com/watch?v=RrjdHTXPgP0",
    },
  ];

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="video-experience-section">
      <div className="video-container">
        <h2 className="video-title">VIDEO TRẢI NGHIỆM DỊCH VỤ</h2>
        <div className="video-title-line-wrapper">
          <div className="video-title-line"></div>
          <img src="/photos/spa (1).png" alt="logo" className="video-title-logo" />
          <div className="video-title-line"></div>
        </div>
        <p className="video-subtitle">Khám phá những dịch vụ chăm sóc sức khỏe và làm đẹp tại spa của chúng tôi</p>
        <Slider {...settings} className="video-slider">
          {videos.map((item, index) => (
            <div key={index} className="video-card">
              <div
                className="video-thumbnail"
                style={{ backgroundImage: `url(${item.thumbnail})` }}
                onClick={() => window.open(item.videoUrl, "_blank")}
              >
                <div className="video-play-button">&#9658;</div>
              </div>
              <div className="video-caption">{item.title}</div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default VideoExperience;
