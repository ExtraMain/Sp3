import React from 'react';
import '../../style/BeautyBlog.css';

const BeautyBlog = () => {
  const blogData = [
    {
      title: '10 Bước Chăm Sóc Da Cơ Bản Mỗi Ngày',
      description: 'Hướng dẫn chi tiết quy trình chăm sóc da hàng ngày từ làm sạch đến dưỡng ẩm, giúp bạn có làn da khỏe mạnh và rạng rỡ.',
      date: 'July 15, 2025',
      category: 'Chăm Sóc Da',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/skincare-routine.jpg',
    },
    {
      title: 'Cách Chăm Sóc Da Sau Khi Làm Facial Tại Spa',
      description: 'Những lưu ý quan trọng sau khi thực hiện liệu trình facial để duy trì hiệu quả và tránh kích ứng da.',
      date: 'July 12, 2025',
      category: 'Sau Spa',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/after-facial.jpg',
    },
    {
      title: 'Bí Quyết Chọn Kem Chống Nắng Phù Hợp Từng Loại Da',
      description: 'Hướng dẫn lựa chọn kem chống nắng phù hợp với da khô, da dầu, da nhạy cảm và cách sử dụng hiệu quả.',
      date: 'July 10, 2025',
      category: 'Phòng Tránh',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/sunscreen.jpg',
    },
    {
      title: 'Massage Mặt Tại Nhà: Kỹ Thuật Chống Lão Hóa',
      description: 'Các kỹ thuật massage mặt đơn giản có thể thực hiện tại nhà để cải thiện tuần hoàn máu và giảm nếp nhăn.',
      date: 'July 8, 2025',
      category: 'Chăm Sóc Da',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/face-massage.jpg',
    },
    {
      title: 'Chăm Sóc Tóc Sau Khi Uốn, Nhuộm Tại Salon',
      description: 'Cách duy trì màu tóc và độ bóng mượt sau khi thực hiện các liệu trình hóa học tại salon.',
      date: 'July 5, 2025',
      category: 'Sau Spa',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/hair-care.jpg',
    },
    {
      title: 'Phòng Tránh Mụn Hiệu Quả: Từ Chế Độ Ăn Đến Skincare',
      description: 'Tổng hợp các phương pháp phòng ngừa mụn từ thói quen sinh hoạt, chế độ ăn uống đến sản phẩm chăm sóc da.',
      date: 'July 3, 2025',
      category: 'Phòng Tránh',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/acne-prevention.jpg',
    },
    {
      title: 'DIY Mặt Nạ Dưỡng Da Từ Nguyên Liệu Tự Nhiên',
      description: 'Công thức làm mặt nạ dưỡng da tại nhà từ các nguyên liệu tự nhiên như mật ong, yến mạch, bơ...',
      date: 'June 30, 2025',
      category: 'Làm Đẹp Tự Nhiên',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/diy-mask.jpg',
    },
    {
      title: 'Chăm Sóc Da Sau Khi Làm Microneedling',
      description: 'Hướng dẫn chăm sóc da đúng cách sau liệu trình microneedling để tối ưu hiệu quả và tránh biến chứng.',
      date: 'June 28, 2025',
      category: 'Sau Spa',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/microneedling.jpg',
    },
    {
      title: 'Tẩy Tế Bào Chết: Bao Lâu Một Lần Là Đủ?',
      description: 'Cách tẩy tế bào chết đúng cách cho từng loại da và tần suất phù hợp để có làn da mịn màng.',
      date: 'June 25, 2025',
      category: 'Chăm Sóc Da',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/exfoliation.jpg',
    },
    {
      title: 'Cách Chọn Serum Vitamin C Phù Hợp Với Da',
      description: 'Hướng dẫn lựa chọn và sử dụng serum vitamin C hiệu quả để chống oxy hóa và làm sáng da.',
      date: 'June 22, 2025',
      category: 'Sản Phẩm',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/vitamin-c.jpg',
    },
    {
      title: 'Chăm Sóc Vùng Mắt: Ngăn Ngừa Quầng Thâm và Nếp Nhăn',
      description: 'Các phương pháp chăm sóc vùng da mỏng manh quanh mắt để giảm quầng thâm và dấu hiệu lão hóa.',
      date: 'June 20, 2025',
      category: 'Chăm Sóc Da',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/eye-care.jpg',
    },
    {
      title: 'Làm Đẹp Da Bằng Collagen: Thực Tế Hay Ảo Tưởng?',
      description: 'Tìm hiểu sự thật về collagen, các loại collagen bổ sung và cách kích thích sản sinh collagen tự nhiên.',
      date: 'June 18, 2025',
      category: 'Dinh Dưỡng',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/collagen.jpg',
    },
    {
      title: 'Chăm Sóc Da Mùa Hè: Đối Phó Với Nắng Nóng',
      description: 'Bí quyết duy trì làn da khỏe mạnh trong thời tiết nóng bức và tia UV cao của mùa hè.',
      date: 'June 15, 2025',
      category: 'Theo Mùa',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/summer-skincare.jpg',
    },
    {
      title: 'Cách Phục Hồi Da Sau Khi Bị Cháy Nắng',
      description: 'Các bước sơ cứu và phục hồi da bị cháy nắng, cùng những sản phẩm và phương pháp hiệu quả.',
      date: 'June 12, 2025',
      category: 'Phòng Tránh',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/sunburn-recovery.jpg',
    },
    {
      title: 'Chăm Sóc Da Nhạy Cảm: Những Điều Cần Biết',
      description: 'Hướng dẫn nhận biết và chăm sóc da nhạy cảm, lựa chọn sản phẩm phù hợp và tránh kích ứng.',
      date: 'June 10, 2025',
      category: 'Da Nhạy Cảm',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/sensitive-skin.jpg',
    },
    {
      title: 'Detox Da Từ Bên Trong: Chế Độ Ăn Cho Da Đẹp',
      description: 'Những thực phẩm tốt cho da và chế độ ăn uống giúp detox cơ thể, mang lại làn da khỏe mạnh từ bên trong.',
      date: 'June 8, 2025',
      category: 'Dinh Dưỡng',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/healthy-diet.jpg',
    },
    {
      title: 'Massage Body Tại Nhà: Thư Giãn và Làm Đẹp',
      description: 'Kỹ thuật massage toàn thân tại nhà để thư giãn, cải thiện tuần hoàn và làm đẹp da.',
      date: 'June 5, 2025',
      category: 'Thư Giãn',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/body-massage.jpg',
    },
    {
      title: 'Chăm Sóc Da Sau Khi Làm Laser: Lưu Ý Quan Trọng',
      description: 'Hướng dẫn chi tiết chăm sóc da sau các liệu trình laser để đạt hiệu quả tối ưu và tránh biến chứng.',
      date: 'June 3, 2025',
      category: 'Sau Spa',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/laser-care.jpg',
    },
    {
      title: 'Yoga Cho Da Đẹp: Tư Thế Giúp Cải Thiện Tuần Hoàn',
      description: 'Các tư thế yoga đơn giản giúp cải thiện tuần hoàn máu, mang lại làn da rạng rỡ tự nhiên.',
      date: 'June 1, 2025',
      category: 'Thư Giãn',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/yoga-beauty.jpg',
    },
    {
      title: 'Chăm Sóc Môi: Từ Tẩy Tế Bào Chết Đến Dưỡng Ẩm',
      description: 'Quy trình chăm sóc môi hoàn chỉnh để có đôi môi mềm mại, hồng hào và khỏe mạnh.',
      date: 'May 30, 2025',
      category: 'Chăm Sóc Da',
      commentLink: '#',
      readMoreLink: '#',
      image: '/photos/lip-care.jpg',
    }
  ];

  return (
    <div className="beauty-blog">
      <div className="blog-header">
        <h1 className="blog-title">Beauty & Spa Blog</h1>
        <p className="blog-subtitle">Cập nhật những bài viết mới nhất về làm đẹp và chăm sóc spa</p>
      </div>
      
      <div className="blog-grid">
        {blogData.map((post, index) => (
          <article className="blog-post" key={index}>
            <div className="blog-image-container">
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-overlay">
                <span className="blog-category-tag">{post.category}</span>
              </div>
            </div>
            <div className="blog-content">
              <h2 className="blog-post-title">{post.title}</h2>
              <p className="blog-description">{post.description}</p>
              <div className="blog-meta">
                <span className="blog-date">{post.date}</span>
                <span className="blog-separator">•</span>
                <a href={post.commentLink} className="blog-comment">Bình luận</a>
              </div>
              <a href={post.readMoreLink} className="read-more">
                Đọc thêm
                <span className="arrow">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BeautyBlog;