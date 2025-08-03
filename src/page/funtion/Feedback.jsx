import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import '../../style/feedback.css';

const FeedbackSection = () => {
  const feedbacks = [
    {
      name: "Mỹ Linh",
      text: "Tôi thật sự ấn tượng với chất lượng dịch vụ và sản phẩm tại đây. Lần đầu mua hàng tôi khá lo lắng vì chưa từng trải nghiệm, nhưng khi nhận được sản phẩm thì mọi thứ vượt ngoài mong đợi. Không chỉ đóng gói cẩn thận, sản phẩm còn rất chất lượng và hoạt động tốt. Nhân viên hỗ trợ rất nhanh chóng và lịch sự, luôn chủ động liên hệ để xác nhận đơn hàng và tư vấn thêm nếu cần. Một trải nghiệm mua sắm cực kỳ hài lòng, và chắc chắn tôi sẽ còn quay lại nhiều lần nữa.",
      avatar: "/photos/amd.jpg",
      rating: 5,
    },
    {
      name: "Hoàng Hải",
      text: "Chúng tôi đã đặt một đơn hàng số lượng lớn cho công ty và hoàn toàn bất ngờ với cách xử lý chuyên nghiệp của đội ngũ tại đây. Từ lúc trao đổi, báo giá đến lúc giao hàng đều rất rõ ràng, minh bạch và nhanh chóng. Sản phẩm được kiểm tra kỹ trước khi gửi đi, không có lỗi kỹ thuật, và đóng gói vô cùng kỹ càng. Đặc biệt, chế độ hậu mãi và chăm sóc khách hàng sau khi mua hàng cũng rất chu đáo. Tôi đánh giá cao sự chuyên nghiệp và tận tâm của đội ngũ, và sẽ tiếp tục hợp tác lâu dài.",
      avatar: "/photos/asrock.jpg",
      rating: 5,
    },
    {
      name: "Lan Anh",
      text: "Dịch vụ tại đây thật sự khiến tôi bất ngờ. Từ khâu đặt hàng cho đến lúc sử dụng sản phẩm, tôi đều cảm nhận được sự chu đáo và chuyên nghiệp. Tôi đã được nhân viên tư vấn rất kỹ lưỡng, giải thích từng sản phẩm phù hợp với nhu cầu cá nhân của mình. Khi nhận hàng, tôi thấy sản phẩm được gói gọn đẹp mắt, đầy đủ phụ kiện và hướng dẫn. Sau vài tuần sử dụng, sản phẩm phát huy hiệu quả rõ rệt, đúng như những gì được cam kết. Thật hiếm khi tìm được nơi nào đáng tin cậy như vậy, cảm ơn rất nhiều!",
      avatar: "/photos/asus.jpg",
      rating: 4.5,
    },
    {
      name: "Minh Tú",
      text: "Tôi đã quay lại mua hàng lần thứ ba và mỗi lần đều cảm thấy hài lòng tuyệt đối. Điều tôi đánh giá cao nhất chính là sự ổn định về chất lượng dịch vụ theo thời gian. Không có chuyện lơ là khách cũ, mà ngược lại, tôi còn được chăm sóc chu đáo hơn ở những lần sau. Ngoài ra, giao diện website dễ sử dụng, cập nhật đầy đủ thông tin, giúp tôi tìm đúng sản phẩm mình cần một cách nhanh chóng. Giao hàng đúng hẹn, đóng gói chắc chắn, sản phẩm dùng bền và hoạt động trơn tru. Rất đáng tin cậy!",
      avatar: "/photos/stream.jpg",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} color="#facc15" size={18} />);
      } else {
        stars.push(<FaRegStar key={i} color="#d1d5db" size={18} />);
      }
    }
    return <div className="feedback-stars">{stars}</div>;
  };



  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="feedback-section">
      <div className="feedback-overlay">
        <h2>Phản hồi của khách hàng sau khi sử dụng</h2>
        <div className="video-title-line-wrapper">
          <div className="feedback-title-line"></div>
          <img src="/photos/spa(2).png" alt="logo" className="feedback-logo" />
          <div className="feedback-title-line"></div>
        </div>
        <p>
          Chúng tôi luôn trân trọng những ý kiến phản hồi của khách hàng như động lực để phát triển.
        </p>

        <Slider {...settings} className="feedback-slider">
          {feedbacks.map((fb, index) => (
            <div className="feedback-box" key={index}>
              <img src={fb.avatar} alt={fb.name} className="feedback-avatar" />
              {renderStars(fb.rating)}
              <p className="feedback-text">“{fb.text}”</p>
              <p className="feedback-name">Khách hàng: {fb.name}</p>
            </div>
          ))}
        </Slider>


      </div>
    </section>
  );
};

export default FeedbackSection;
