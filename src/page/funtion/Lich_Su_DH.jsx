import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../funtion/AuthContext";
import "../../style/lich_su.css";
import { toast } from "react-toastify";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      const user_id = JSON.parse(localStorage.getItem("user"));

      try {
        setLoading(true);
        if (!user_id) {
          toast.error("Bạn chưa đăng nhập");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost/BaiTapNhom/backend/lich_su_dh.php?user_id=${user_id.id}`
        );
        console.log("Dữ liệu đơn hàng trả về:", response.data.data);
        setOrders(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi tải lịch sử đặt dịch vụ.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Hoàn thành":
        return "green";
      case "Đang thực hiện":
        return "blue";
      case "Đã hủy":
        return "red";
      case "Chờ xử lý":
        return "orange";
      default:
        return "gray";
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc muốn hủy đơn này không?")) return;

    try {
      const response = await axios.post(
        `http://localhost/BaiTapNhom/backend/huy_don.php?order_id=${orderId}`
      );

      if (response.data.success) {
        toast.success("Đã hủy đơn thành công");
        setOrders(orders.map(order =>
          order.ma_don_hang === orderId
            ? { ...order, trang_thai: "Đã hủy" }
            : order
        ));
      } else {
        toast.error(response.data.message || "Hủy đơn thất bại.");
      }
    } catch (error) {
      toast.error("Lỗi khi hủy đơn.");
    }
  };

  const shouldShowCancelButton = (order) => {
    const status = (order.trang_thai || "").toLowerCase().trim();
    return status === "chờ xử lý" || status === "chưa thanh toán";
  };



  return (
    <div className="order-history-container">
      <h1>Lịch sử đặt dịch vụ</h1>

      {loading ? (
        <div className="loading">Đang tải...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <p>Bạn chưa đặt dịch vụ nào.</p>
          <Link to="/AllDichvu" className="shop-now-btn">
            Đặt lịch ngay
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-item" key={order.ma_don_hang}>
              <div
                className="order-header"
                onClick={() => toggleOrderDetails(order.ma_don_hang)}
              >
                <div className="order-basic-info">
                  <div className="order-id">
                    Mã đơn #{order.ma_don_hang}
                  </div>
                  <div className="order-date">
                    {formatDate(order.ngay_dat)}
                  </div>
                </div>

                <div className="order-summary">
                  <div className="order-total-price">
                    {formatPrice(order.tong_tien)}
                  </div>
                  <div
                    className="order-status"
                    style={{ color: getStatusColor(order.trang_thai) }}
                  >
                    {order.trang_thai}
                  </div>
                  <div className="toggle-icon">
                    {expandedOrder === order.ma_don_hang ? "▲" : "▼"}
                  </div>
                </div>
              </div>

              {expandedOrder === order.ma_don_hang && (
                <div className="order-details">
                  <div className="order-sections">
                    <div className="order-section">
                      <h3>Thông tin khách hàng</h3>
                      <p><strong>Họ tên:</strong> {order.ten_khach_hang}</p>
                      <p><strong>SĐT:</strong> {order.so_dien_thoai}</p>
                      <p><strong>Email:</strong> {order.email}</p>
                      <p><strong>Thời gian đặt:</strong> {order.gio_dat}</p>
                    </div>

                    {order.ghi_chu && (
                      <div className="order-note">
                        <h3>Ghi chú</h3>
                        <p>{order.ghi_chu}</p>
                      </div>
                    )}

                    <div className="product-list">
                      <h3>Dịch vụ đã đặt</h3>
                      <table className="product-table">
                        <thead>
                          <tr>
                            <th>Tên dịch vụ</th>
                            <th>Số lượng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(order.san_pham) &&
                            order.san_pham.length > 0 ? (
                            order.san_pham.map((service, index) => (
                              <tr key={index}>
                                <td>{service.ten_san_pham}</td>
                                <td>{service.so_luong}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2">
                                Không có dịch vụ trong đơn này.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="order-total">
                      <p>
                        <strong>Tổng thanh toán:</strong>{" "}
                        {formatPrice(order.tong_tien)}
                      </p>
                    </div>
                  </div>

                  <div className="order-actions">
                    {shouldShowCancelButton(order) && (
                      <button
                        className="cancel-order-btn"
                        onClick={() => handleCancelOrder(order.ma_don_hang)}
                      >
                        Hủy đặt lịch
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
