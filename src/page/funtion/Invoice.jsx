import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../../style/invoice.css";

const Invoice = () => {
  const location = useLocation();
  const orderData = location.state?.orderData || {};
  const { customerInfo, cartItems, totalAmount, paymentMethod, orderDate } = orderData;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="invoice-page">
      <div className="invoice-container">
        <div className="invoice-header">
          <h1>HÓA ĐƠN ĐẶT LỊCH SPA</h1>
          <div className="invoice-meta">
            <p>Mã đơn hàng: #{orderData.orderId || 'N/A'}</p>
          </div>
        </div>

        <div className="invoice-section">
          <h2>Thông tin khách hàng</h2>
          <div className="customer-info">
            <p><strong>Họ tên:</strong> {customerInfo?.fullName || 'N/A'}</p>
            <p><strong>Email:</strong> {customerInfo?.email || 'N/A'}</p>
            <p><strong>Số điện thoại:</strong> {customerInfo?.phone || 'N/A'}</p>
          </div>
        </div>

        <div className="invoice-section">
          <h2>Lịch hẹn sử dụng dịch vụ</h2>
          <p><strong>Ngày:</strong> {new Date(orderDate).toLocaleDateString('vi-VN')}</p>
          <p><strong>Giờ:</strong> {new Date(orderDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>


        <div className="invoice-section">
          <h2>Dịch vụ đã đặt</h2>
          <table className="invoice-items">
            <thead>
              <tr>
                <th>STT</th>
                <th>Dịch vụ</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.ten}</td>
                  <td>{formatCurrency(item.gia)}</td>
                  <td>{item.so_luong}</td>
                  <td>{formatCurrency(item.gia * item.so_luong)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="invoice-totals">
          <div className="totals-row">
            <span>Tạm tính:</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
          <div className="totals-row grand-total">
            <span>Tổng cộng:</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        <div className="invoice-section">
          <h2>Phương thức thanh toán</h2>
          <p>
            {paymentMethod === 'cod' ? 'Thanh toán tại spa (COD)' : ''}
            {paymentMethod === 'vnpay' ? 'Thanh toán qua VNPay' : ''}
          </p>
        </div>

        <div className="invoice-footer">
          <div className="thank-you">
            <p>Cảm ơn quý khách đã đặt lịch tại spa của chúng tôi!</p>
          </div>
        </div>

        <div className="invoice-actions">
          <button onClick={() => window.print()} className="print-button">
            In hóa đơn
          </button>
          <Link to="/thankyou">
            <button className="invoice-thanks">
              Tiếp theo
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Invoice;