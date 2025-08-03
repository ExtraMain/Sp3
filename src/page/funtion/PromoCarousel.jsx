import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "../../style/promoCarousel.css"; // điều chỉnh nếu cần

const promoSlides = [
  {
    id: "gd001",
    image: "https://setupspatrongoi.vn/wp-content/uploads/2023/06/hinh-anh-goi-dau-duong-sinh.jpg",
    title: "Gội đầu dưỡng sinh truyền thống",
    category: "Gội đầu dưỡng sinh",
    price: "138.000 VNĐ"
  },
  {
    id: "gd003",
    image: "https://img.freepik.com/premium-photo/gentle-temples-massage_274689-40917.jpg",
    title: "Liệu pháp dưỡng sinh thủ đạo thang",
    category: "Gội đầu dưỡng sinh",
    price: "399.000 VNĐ"
  },
  {
    id: "td001",
    image: "https://toplist.vn/images/800px/victory-spa-bac-ninh-888451.jpg",
    title: "Liệu trình tắm trắng toàn thân cơ bản",
    category: "Trắng da",
    price: "400.000 VNĐ"
  },
  {
    id: "tm001",
    image: "https://medlatec.vn/media/13130/content/20201106_cach-cham-soc-da-mun-5.jpg",
    title: "Trị mụn cơ bản-Làm sạch da",
    category: "Trị mụn",
    price: "400.000 VNĐ"
  },
  {
    id: "tl001",
    image: "https://thammyvientam.com/wp-content/uploads/2020/12/triet-long-nach.jpg",
    title: "Triệt lông nách SHR – sạch sáng tự nhiên",
    category: "Triệt lông",
    price: "350.000 VNĐ"
  },
  {
    id: "tl004",
    image: "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/triet_long_tay_vinh_vien_va_nhung_dieu_can_biet_1_950e929b51.jpg",
    title: "Triệt tay – sáng mịn cả cánh tay",
    category: "Triệt lông",
    price: "500.000 VNĐ"
  }
];

const PromoCarousel = () => {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="promo-carousel-container">
      <div className="promo-content">
        <h2 className="carousel-title">Dịch vụ nổi bật</h2>
        <div className="video-title-line-wrapper">
          <div className="video-title-line"></div>
          <img src="/photos/bathrobe.png" alt="logo" className="video-title-logo" />
          <div className="video-title-line"></div>
        </div>
        <p className="sub-carousel-title">
          Ưu đãi hấp dẫn từ các liệu trình chăm sóc sắc đẹp hàng đầu
        </p>
      </div>

      <div className="custom-slider-container">
        <div ref={prevRef} className="custom-swiper-button-prev">❮</div>
        <div ref={nextRef} className="custom-swiper-button-next">❯</div>

        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={3}
          loop
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 30,
            depth: 3,
            modifier: 2,
            slideShadows: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              coverflowEffect: { depth: 0, modifier: 0 },
            },
            480: {
              slidesPerView: 2,
              coverflowEffect: { depth: 100, modifier: 1.5 },
            },
            768: {
              slidesPerView: 3,
              coverflowEffect: { depth: 150, modifier: 2 },
            },
            1024: {
              slidesPerView: 3,
              coverflowEffect: { depth: 200, modifier: 3 },
            },
          }}
        >
          {promoSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="slider-card" style={{ backgroundImage: `url(${slide.image})` }}>
                <div className="slider-overlay">
                  <p className="slider-title">{slide.title}</p>
                  <p className="slider-brand">{slide.category}</p>
                  <p className="slider-price">{slide.price}</p>
                  <button
                    className="shop-button"
                    onClick={() => navigate(`/dich-vu/${slide.id}`)}
                  >
                    SHOP NOW →
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PromoCarousel;
