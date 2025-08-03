import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";
import FeedbackSection from "./funtion/Feedback";
import VideoExperience from "./funtion/VideoExperiment";
import NewsHighLight from "./funtion/NewsHighLight";
import ServiceHighlights from "./funtion/ServiceHighlights";
import PromoCarousel from "./funtion/PromoCarousel";
import AboutSection from "./funtion/AboutSection";

import "swiper/css";
import "swiper/css/navigation";
import {
  ArrowRight,
  Star,
  MapPin,
  Calendar,
  TrendingUp,
  ChevronDown,
  Fan,
  Mouse,
  Keyboard,
} from "lucide-react";
import "../style/home.css";
import "../style/all_dich_vu.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaGift } from "react-icons/fa";
import { Variants } from "./funtion/Menu";
import 'swiper/css/effect-coverflow';

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [openedIndex, setOpenedIndex] = useState(null);
  const [showUrl, setShowUrl] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [marqueeText, setMarqueeText] = useState(0);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "http://localhost/BaiTapNhom/backend/tt_home.php?path=chu_chay"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        if (data.success) {
          const activeMessages = data.data
            .filter((msg) => msg.trang_thai === "1" || msg.trang_thai === 1)
            .map((msg) => ({
              ...msg,
              toc_do: parseFloat(msg.toc_do) || 15, // Ensure toc_do is a number
            }));
          setMessages(activeMessages);
          console.log("Fetched messages:", activeMessages);
        } else {
          throw new Error(data.error || "API error");
        }
      } catch (err) {
        setError(err.message);
        setMessages([
          {
            noi_dung:
              "🔥 Flash Sale: Giảm đến 30% cho tất cả linh kiện PC! Nhanh tay đặt hàng ngay hôm nay! 🔥",
            toc_do: 15,
            trang_thai: 1,
          },
          {
            noi_dung: "🎁 Mua combo linh kiện, nhận quà tặng đặc biệt!",
            toc_do: 15,
            trang_thai: 1,
          },
          {
            noi_dung: "🚚 Miễn phí vận chuyển cho đơn hàng trên 5 triệu!",
            toc_do: 15,
            trang_thai: 1,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Cycle through messages based on toc_do
  useEffect(() => {
    if (messages.length === 0 || loading || error) return;

    const interval = setInterval(() => {
      setMarqueeText((prev) => (prev + 1) % messages.length);
    }, (messages[marqueeText]?.toc_do * 1000 || 15000) - 900); // Reduce delay by 500ms

    return () => clearInterval(interval);
  }, [messages, marqueeText, loading, error]);

  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const { days, hours, minutes, seconds } = prev;
        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        if (minutes > 0) return { ...prev, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { ...prev, hours: hours - 1, minutes: 59, seconds: 59 };
        if (days > 0) return { days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      id: "gd001",
      image: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474086idL/hinh-anh-mau-spa-dep_083552492.jpg",
      title: "Gội đầu dưỡng sinh truyền thống",
      description: "Thư giãn và làm sạch da đầu bằng thảo dược thiên nhiên, kết hợp massage đầu – vai – gáy."
    },
    {
      id: "td001",
      image: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474086Afg/anh-mau-spa-xinh-dep_083837070.jpg",
      title: "Liệu trình tắm trắng toàn thân cơ bản",
      description: "Làm sáng đều màu da với sữa non, cám gạo và vitamin C, dịu nhẹ cho mọi loại da."
    },
    {
      id: "tm001",
      image: "https://webrt.vn/wp-content/uploads/2024/08/Nhung-loi-gioi-thieu-ve-spa-hay-nhat-3.jpg",
      title: "Trị mụn cơ bản-Làm sạch da",
      description: "Làm sạch sâu lỗ chân lông, giảm mụn hiệu quả bằng công nghệ sinh học hiện đại."
    }
  ];

  const items = [
    {
      title: "Không gian sang trọng",
      desc: "Sang trọng và đẳng cấp là 2 từ để miêu tả không gian của chúng tôi. Bạn hoàn toàn thư giãn và an tâm nhất tại đây.",
      image: "/photos/f.jpg", // Đổi thành đúng path ảnh
    },
    {
      title: "Công nghệ hiện đại",
      desc: "100% máy móc thiết bị hiện đại được nhập khẩu từ Châu Âu như Đức, Pháp, Anh. Bạn sẽ được tận hưởng cảm giác tốt nhất.",
      image: "/photos/h.jpg", // Đổi thành đúng path ảnh
    },
    {
      title: "Sản phẩm an toàn",
      desc: "Sản phẩm nhập khẩu trực tiếp, chiết xuất từ các thành phần thiên nhiên và được kiểm chứng có tác dụng phù hợp, đảm bảo an toàn tuyệt đối.",
      image: "/photos/g.jpg", // Đổi thành đúng path ảnh
    },
    {
      title: "Kỹ thuật viên tay nghề cao",
      desc: "Kỹ thuật viên chuyên nghiệp với tay nghề cao sẽ đáp ứng mọi nhu cầu của quý khách, giúp quý khách có những trải nghiệm tốt nhất.",
      image: "/photos/e.jpg", // Đổi thành đúng path ảnh
    },
  ];

  const hotItems = [
    {
      "id": "gd001",
      "ten": "Gội đầu dưỡng sinh truyền thống",
      "gia": 138000,
      "gia_uu_dai": 125580,
      "uu_dai": "Giảm 9%",
      "trend": "+15%",
      "trendColor": "text-green-500"
    },
    {
      "id": "gd002",
      "ten": "Liệu trình chăm sóc tóc và da đầu bằng bưởi",
      "gia": 249000,
      "gia_uu_dai": 226590,
      "uu_dai": "Giảm 9%",
      "trend": "+23%",
      "trendColor": "text-red-500"
    },
    {
      "id": "gd005",
      "ten": "Gội đầu kết hợp xông hơi thảo dược",
      "gia": 220000,
      "gia_uu_dai": 200200,
      "uu_dai": "Giảm 9%",
      "trend": "+18%",
      "trendColor": "text-red-500"
    }
  ];


  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="home-container">
      <div className="hero-slider" id="hero-slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[activeSlide].id}
            className="slide-background"
            style={{ backgroundImage: `url('${slides[activeSlide].image}')` }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="slide-background"
              style={{ backgroundImage: `url('${slides[activeSlide].image}')` }}
            >
              <div className="slide-overlay"></div>
              <div className="slide-content">
                <div className="slide-text">
                  <h1 className="slide-title">{slides[activeSlide].title}</h1>
                  <p className="slide-description">{slides[activeSlide].description}</p>
                  <div className="slide-buttons">
                    <button
                      className="primary-button"
                      onClick={() => navigate(`/dich-vu/${slides[activeSlide].id}`)}
                    >
                      Đặt hàng ngay <ArrowRight className="button-icon" />
                    </button>
                    <button
                      className="secondary-button"
                      onClick={() => navigate(`/dich-vu/${slides[activeSlide].id}`)}
                    >
                      Tìm hiểu thêm
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="slide-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`slide-indicator${index === activeSlide ? " active-indicator" : ""}`}
                  aria-label={`Slide ${index + 1}`}
                  aria-current={index === activeSlide ? "true" : undefined}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="serviceHighlights">
        <div className="highlightBox">
          <img src="/photos/tea.png" alt="Hỗ trợ" className="highlightIcon" />
          <div>
            <h4 className="highlightTitle">Chính sách hỗ trợ</h4>
            <p className="highlightText">
              Nhân viên hỗ trợ nhiệt tình, chu đáo và chuyên nghiệp nhất.
            </p>
          </div>
        </div>

        <div className="highlightBox">
          <img src="/photos/towel.png" alt="Bảo hành" className="highlightIcon" />
          <div>
            <h4 className="highlightTitle">Chế độ bảo hành</h4>
            <p className="highlightText">
              Toàn bộ dịch vụ và sản phẩm của chúng tôi đều được bảo hành lâu dài
            </p>
          </div>
        </div>

        <div className="highlightBox">
          <img src="/photos/flower.png" alt="Hotline" className="highlightIcon" />
          <div>
            <h4 className="highlightTitle">
              Hotline: <span className="hotlineNumber">01324.568.789</span>
            </h4>
            <p className="highlightText">
              Hotline tư vấn chuyên nghiệp 24.7 sẽ giải đáp mọi thắc mắc của bạn
            </p>
          </div>
        </div>
      </div>

      <AboutSection />

      <ServiceHighlights />

      <section className="promotion-section">
        <div className="promotion-container">
          <div className="promotion-left">
            <h2>Ưu đãi dịch vụ spa tháng này</h2>
            <p>
              Giảm ngay <strong>9%</strong> cho các dịch vụ chăm sóc tóc và cơ thể. Đặt lịch ngay hôm nay để được thư giãn và làm đẹp!
            </p>
          </div>
          <div className="promotion-right">
            <div className="promotion-header">
              <Calendar className="icon" />
              <h3>Dịch vụ hot trong tháng</h3>
            </div>
            <ul className="promotion-list">
              {hotItems.map((item, idx) => (
                <li
                  key={idx}
                  className="promotion-item"
                  onClick={() => navigate(`/dich-vu/${item.id}`)}
                >
                  <div className="item-left">
                    <span className="item-name">{item.ten}</span>
                  </div>
                  <div className="item-right">
                    <div className="item-price">
                      {item.gia.toLocaleString("vi-VN")}đ
                    </div>
                    <div className="item-discount">
                      {item.uu_dai}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="why-us-section">
        <h2 className="why-title">VÌ SAO NÊN CHỌN CHÚNG TÔI</h2>
        <div className="why-title-line-wrapper">
          <div className="why-title-line"></div>
          <img src="/photos/spa_flower_logo.png"
            alt="logo" className="why-title-logo" />
          <div className="why-title-line"></div>
        </div>
        <p className="why-subtitle">
          Chúng tôi tự hào là một trong những viện thẩm mỹ uy tín và hoạt động lâu đời.<br />
          Bởi thế, chúng tôi có nhiều điều khiến quý khách hàng tin tưởng và lựa chọn trong suốt những năm vừa qua
        </p>
        <div className="why-grid">
          {items.map((item, index) => (
            <div className="why-box" key={index}>
              <div className="why-image">
                <img src={item.image} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      <VideoExperience />

      <FeedbackSection />

      <PromoCarousel />

      <NewsHighLight />

      <div className="newsletter-section" id="dang-ki">
        <div className="newsletter-wrapper">
          <div className="newsletter-content">
            <h2 className="newsletter-title">
              Khám phá không gian thư giãn lý tưởng và các liệu trình spa chuyên nghiệp giúp bạn cân bằng cơ thể, làm đẹp tự nhiên và tái tạo năng lượng sống
            </h2>

            <p className="newsletter-description">
              Chăm sóc sắc đẹp mỗi ngày cùng <span className="highlight">SP3</span>
            </p>
            <div className="newsletter-form">
              <Link to="/contact">
                <button className="newsletter-button">Đặt lịch ngay</button>
              </Link>
            </div>
          </div>
          <div className="newsletter-image">
            <img src="/photos/m.jpg" alt="Spa thư giãn" />
          </div>
        </div>

      </div>
    </div>

  );
};

export default Home;
