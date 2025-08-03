import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/quan_ly_dat_lich.css";

const ScheduleOrderManagement = () => {
  const [scheduleOrders, setScheduleOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    axios.get("http://localhost/BaiTapNhom/backend/back/get_schedule_orders.php")
      .then(res => {
        console.log("Dữ liệu đơn hàng:", res.data);
        setScheduleOrders(res.data);
        setFilteredOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi lấy đơn đặt lịch:", err);
        setLoading(false);
      });
  }, []);

  const statusOptions = [
    { value: "Đã thanh toán", label: "✅ Đã thanh toán" },
    { value: "Chưa thanh toán", label: "⏳ Chưa thanh toán" },
    { value: "Chờ xử lý", label: "🕒 Chờ xử lý" }
  ];

  const handleSearch = () => {
    if (searchId.trim() === "") {
      setFilteredOrders(scheduleOrders);
    } else {
      const filtered = scheduleOrders.filter(order => 
        order.id.toString().includes(searchId.trim())
      );
      setFilteredOrders(filtered);
    }
  };

  const handleClearSearch = () => {
    setSearchId("");
    setFilteredOrders(scheduleOrders);
  };

  const handlePaymentChange = (orderId, newPaymentStatus) => {
    // Cập nhật giao diện trước
    setScheduleOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, trang_thai: newPaymentStatus } : order
      )
    );
    
    // Cập nhật filteredOrders
    setFilteredOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, trang_thai: newPaymentStatus } : order
      )
    );

    // Cập nhật bảng don_dat_lich
    axios.post("http://localhost/BaiTapNhom/backend/back/update_payment.php", {
      id: orderId,
      trang_thai: newPaymentStatus,
    })
      .then(res => {
        console.log("Cập nhật don_dat_lich thành công:", res.data);
      })
      .catch(err => {
        console.error("Lỗi cập nhật don_dat_lich:", err);
      });

    // Cập nhật bảng thanh_toan
    fetch("http://localhost/BaiTapNhom/backend/back/payment_api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update_status_by_order",
        ma_don_hang: orderId,           // id trong don_dat_lich = ma_don_hang trong thanh_toan
        status: newPaymentStatus
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Cập nhật thanh_toan thành công:", data);
      })
      .catch(err => {
        console.error("Lỗi cập nhật thanh_toan:", err);
      });
  };

  return (
    <div className="admin-order-container">
      <h2>Quản lý đơn đặt lịch</h2>
      
      {/* Thanh tìm kiếm */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm kiếm theo ID đơn hàng..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          className="search-btn"
        >
          🔍 Tìm kiếm
        </button>
        <button 
          onClick={handleClearSearch}
          className="clear-btn"
        >
          ✖ Xóa tìm kiếm
        </button>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : filteredOrders.length === 0 ? (
        <p>{searchId ? `Không tìm thấy đơn hàng với ID: ${searchId}` : "Không có đơn đặt lịch nào."}</p>
      ) : (
        <div>
          {searchId && (
            <p className="search-result-info">
              Tìm thấy {filteredOrders.length} kết quả cho ID: "{searchId}"
            </p>
          )}
          <table className="order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>Điện thoại</th>
                <th>Ngày đặt</th>
                <th>Thanh toán</th>
                <th>Tổng tiền</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.ten_khach_hang || "Không rõ"}</td>
                  <td>{order.email || "Không rõ"}</td>
                  <td>{order.so_dien_thoai || "Không rõ"}</td>
                  <td>
                    {order.ngay_dat && !isNaN(new Date(order.ngay_dat))
                      ? new Date(order.ngay_dat).toLocaleString("vi-VN")
                      : "Không rõ"}
                  </td>
                  <td>
                    <select
                      value={order.trang_thai}
                      onChange={(e) => handlePaymentChange(order.id, e.target.value)}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {isNaN(order.tong_tien)
                      ? "Không rõ"
                      : Number(order.tong_tien).toLocaleString("vi-VN") + "₫"}
                  </td>
                  <td>{order.ghi_chu || "Không có"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ScheduleOrderManagement;