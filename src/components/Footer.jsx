import React from "react";
import { Phone, Mail, Clock, MapPin, ArrowUp, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="site-footer" style={{
      background: '#656d4a',
      color: '#ede0d4',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="footer-top" style={{
        padding: '60px 0 40px',
        position: 'relative'
      }}>
        <div className="footer-container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px'
        }}>
          <div className="footer-column about-column" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div className="footer-logo">
              <div className="footer-logo-container" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <img 
                  src="/photos/herb.png" 
                  alt="SP3 Spa Logo" 
                  className="footer-logo-image"
                  style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1)'
                  }}
                />
                <span className="footer-logo-text" style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#ede0d4',
                  letterSpacing: '1px'
                }}>SP3 Spa</span>
              </div>
            </div>
            <p className="footer-description" style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#ede0d4',
              marginBottom: '20px'
            }}>
              Chúng tôi cam kết mang đến cho bạn những dịch vụ spa chất lượng cao nhất với các liệu pháp thiên nhiên và công nghệ hiện đại. Hãy để chúng tôi giúp bạn thư giãn và tái tạo năng lượng.
            </p>
            <div className="footer-certifications" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <span className="cert-text" style={{
                fontSize: '12px',
                color: '#ede0d4',
                fontWeight: '500'
              }}>Chứng nhận bởi:</span>
              <div className="cert-badges" style={{
                display: 'flex',
                gap: '8px'
              }}>
                <span className="cert-badge" style={{
                  background: '#7f5539',
                  color: '#ede0d4',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>ISO 9001</span>
                <span className="cert-badge" style={{
                  background: '#7f5539',
                  color: '#ede0d4',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Organic</span>
              </div>
            </div>
          </div>

          <div className="footer-column services-column" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <h3 className="column-title" style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ede0d4',
              marginBottom: '20px',
              position: 'relative',
              paddingBottom: '8px'
            }}>
              Dịch vụ spa
              <span style={{
                content: '',
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '30px',
                height: '2px',
                background: '#7f5539',
                borderRadius: '1px',
                display: 'block'
              }}></span>
            </h3>
            <ul className="footer-links" style={{
              listStyle: 'none',
              padding: '0',
              margin: '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <li><a href="/massage" style={{
                color: '#ede0d4',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '12px'
              }}>• Massage trị liệu</a></li>
              <li><a href="/facial" style={{
                color: '#ede0d4',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '12px'
              }}>• Chăm sóc da mặt</a></li>
              <li><a href="/body-treatment" style={{
                color: '#ede0d4',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '12px'
              }}>• Chăm sóc cơ thể</a></li>
              <li><a href="/aromatherapy" style={{
                color: '#ede0d4',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '12px'
              }}>• Liệu pháp hương thơm</a></li>
              <li><a href="/detox" style={{
                color: '#ede0d4',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '12px'
              }}>• Detox thanh lọc</a></li>
              <li><a href="/couples" style={{
                color: '#ede0d4',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '12px'
              }}>• Spa dành cho cặp đôi</a></li>
              <li><a href="/packages" style={{
                color: '#ede0d4',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '12px'
              }}>• Gói dịch vụ</a></li>
            </ul>
          </div>

          <div className="footer-column info-column" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <h3 className="column-title" style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ede0d4',
              marginBottom: '20px',
              position: 'relative',
              paddingBottom: '8px'
            }}>
              Thông tin hữu ích
              <span style={{
                content: '',
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '30px',
                height: '2px',
                background: '#7f5539',
                borderRadius: '1px',
                display: 'block'
              }}></span>
            </h3>
            <ul className="footer-links" style={{
              listStyle: 'none',
              padding: '0',
              margin: '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <li><a href="/booking" style={{
                color: '#ede0d4',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '12px'
              }}>• Đặt lịch hẹn</a></li>
              <li><a href="/membership" style={{
                color: '#ede0d4',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '12px'
              }}>• Thành viên VIP</a></li>
              <li><a href="/gift-cards" style={{
                color: '#ede0d4',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '12px'
              }}>• Thẻ quà tặng</a></li>
              <li><a href="/policy" style={{
                color: '#ede0d4',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '12px'
              }}>• Chính sách & quy định</a></li>
              <li><a href="/faq" style={{
                color: '#ede0d4',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '12px'
              }}>• Câu hỏi thường gặp</a></li>
              <li><a href="/blog" style={{
                color: '#ede0d4',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '12px'
              }}>• Blog làm đẹp</a></li>
              <li><a href="/careers" style={{
                color: '#ede0d4',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '12px'
              }}>• Tuyển dụng</a></li>
            </ul>
          </div>

          <div className="footer-column contact-column" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <h3 className="column-title" style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ede0d4',
              marginBottom: '20px',
              position: 'relative',
              paddingBottom: '8px'
            }}>
              Liên hệ với chúng tôi
              <span style={{
                content: '',
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '30px',
                height: '2px',
                background: '#7f5539',
                borderRadius: '1px',
                display: 'block'
              }}></span>
            </h3>
            <ul className="contact-info" style={{
              listStyle: 'none',
              padding: '0',
              margin: '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <li className="contact-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '14px',
                color: '#ede0d4'
              }}>
                <Phone className="contact-icon" size={18} style={{
                  color: '#7f5539',
                  flexShrink: 0
                }} />
                <span>Hotline: 0123 456 789</span>
              </li>
              <li className="contact-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '14px',
                color: '#ede0d4'
              }}>
                <Mail className="contact-icon" size={18} style={{
                  color: '#7f5539',
                  flexShrink: 0
                }} />
                <span>Email: info@sp3spa.com</span>
              </li>
              <li className="contact-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '14px',
                color: '#ede0d4'
              }}>
                <MapPin className="contact-icon" size={18} style={{
                  color: '#7f5539',
                  flexShrink: 0
                }} />
                <span>123 Phố Spa, Quận 1, TP.HCM</span>
              </li>
              <li className="contact-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '14px',
                color: '#ede0d4'
              }}>
                <Clock className="contact-icon" size={18} style={{
                  color: '#7f5539',
                  flexShrink: 0
                }} />
                <span>Mở cửa: 8:00 - 22:00 (Hàng ngày)</span>
              </li>
            </ul>

            <div className="social-section" style={{
              marginTop: '20px'
            }}>
              <h4 className="social-title" style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#ede0d4',
                marginBottom: '15px'
              }}>Kết nối với chúng tôi</h4>
              <div className="social-links" style={{
                display: 'flex',
                gap: '12px'
              }}>
                <a href="#" className="social-link" aria-label="Facebook" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  background: '#7f5539',
                  color: '#ede0d4',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}>
                  <Facebook size={20} />
                </a>
                <a href="#" className="social-link" aria-label="Instagram" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  background: '#7f5539',
                  color: '#ede0d4',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}>
                  <Instagram size={20} />
                </a>
                <a href="#" className="social-link" aria-label="Twitter" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  background: '#7f5539',
                  color: '#ede0d4',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}>
                  <Twitter size={20} />
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  background: '#7f5539',
                  color: '#ede0d4',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}>
                  <Linkedin size={20} />
                </a>
                <a href="#" className="social-link" aria-label="YouTube" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  background: '#7f5539',
                  color: '#ede0d4',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}>
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{
        background: '#414833',
        padding: '20px 0',
        borderTop: '1px solid #656d4a'
      }}>
        <div className="footer-container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div className="footer-bottom-content" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div className="copyright" style={{
              fontSize: '14px',
              color: '#a68a64'
            }}>
              <p>&copy; 2024 SP3 Spa. Tất cả quyền được bảo lưu.</p>
            </div>
            <div className="footer-bottom-links" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <a href="/terms" style={{
                color: '#a68a64',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease'
              }}>Điều khoản sử dụng</a>
              <span className="separator" style={{
                color: '#656d4a',
                fontSize: '12px'
              }}>•</span>
              <a href="/privacy" style={{
                color: '#a68a64',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease'
              }}>Chính sách bảo mật</a>
              <span className="separator" style={{
                color: '#656d4a',
                fontSize: '12px'
              }}>•</span>
              <a href="/cookies" style={{
                color: '#a68a64',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease'
              }}>Chính sách Cookie</a>
            </div>
          </div>
        </div>
      </div>

      <button
        className="scroll-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '48px',
          height: '48px',
          background: '#7f5539',
          color: '#ede0d4',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(127, 85, 57, 0.3)',
          zIndex: 1000
        }}
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;