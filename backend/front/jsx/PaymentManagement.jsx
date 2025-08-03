import React, { useEffect, useState } from "react";
import "../css/paymentManagement.css";

const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterMethod, setFilterMethod] = useState("Tất cả");
    const [searchOrder, setSearchOrder] = useState(""); // Thêm state tìm kiếm

    // Hàm load lại dữ liệu
    const fetchPayments = () => {
        fetch("http://localhost/BaiTapNhom/backend/back/get_payments.php")
            .then(res => res.json())
            .then(data => {
                setPayments(data);
                setLoading(false);
            })
            .catch(() => {
                alert("Không thể tải danh sách thanh toán");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const handleStatusChange = (id, newStatus) => {
        fetch("http://localhost/BaiTapNhom/backend/back/payment_api.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "update_status",
                id,
                status: newStatus
            })
        })
            .then(res => res.json())
            .then(() => fetchPayments());
    };

    // Bộ lọc phương thức và tìm kiếm
    const displayedPayments = payments.filter(payment => {
        const matchMethod = filterMethod === "Tất cả"
            || payment.phuong_thuc_thanh_toan.toLowerCase() === filterMethod.toLowerCase();
        
        const matchSearch = searchOrder === ""
            || payment.ma_don_hang.toLowerCase().includes(searchOrder.toLowerCase());
        
        return matchMethod && matchSearch;
    });

    return (
        <div className="payment-management-container">
            <h2>💳 Quản lý Thanh toán</h2>

            {/* Thanh tìm kiếm và bộ lọc */}
            <div className="search-filter-section">
                <div className="search-box">
                    <label>🔍 Tìm kiếm mã đơn đặt lịch:</label>
                    <input
                        type="text"
                        placeholder="Nhập mã đơn đặt lịch..."
                        value={searchOrder}
                        onChange={(e) => setSearchOrder(e.target.value)}
                        className="search-input"
                    />
                    {searchOrder && (
                        <button
                            className="clear-search-btn"
                            onClick={() => setSearchOrder("")}
                            title="Xóa tìm kiếm"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className="filter-box">
                    <label>Lọc theo phương thức:</label>
                    <select
                        value={filterMethod}
                        onChange={(e) => setFilterMethod(e.target.value)}
                        className="filter-select"
                    >
                        <option value="Tất cả">Tất cả</option>
                        <option value="cod">COD</option>
                        <option value="vnpay">VNPay</option>
                    </select>
                </div>
            </div>

            {/* Hiển thị kết quả tìm kiếm */}
            {searchOrder && (
                <div className="search-results-info">
                    <p>Tìm thấy <strong>{displayedPayments.length}</strong> kết quả cho "<strong>{searchOrder}</strong>"</p>
                </div>
            )}

            {loading ? (
                <p>Đang tải...</p>
            ) : displayedPayments.length === 0 ? (
                <div className="no-results">
                    {searchOrder ? (
                        <p>🔍 Không tìm thấy đơn hàng nào với mã "<strong>{searchOrder}</strong>"</p>
                    ) : (
                        <p>Không có giao dịch phù hợp.</p>
                    )}
                </div>
            ) : (
                <table className="payment-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Mã đơn đặt lịch</th>
                            <th>Phương thức</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Ngày thanh toán</th>
                            <th>Mã giao dịch</th>
                            <th>Lịch hẹn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedPayments.map((payment) => (
                            <tr key={payment.id}>
                                <td>{payment.id}</td>
                                <td>
                                    <span className="order-code">
                                        {payment.ma_don_hang}
                                    </span>
                                </td>
                                <td>{payment.phuong_thuc_thanh_toan}</td>
                                <td>{payment.tong_so_tien.toLocaleString("vi-VN")} ₫</td>
                                <td>{payment.trang_thai_thanh_toan}</td>
                                <td>
                                    {payment.thoi_gian_thanh_toan
                                        ? new Date(payment.thoi_gian_thanh_toan).toLocaleString("vi-VN")
                                        : "Không rõ"}
                                </td>
                                <td>{payment.ma_giao_dich || "Không có"}</td>
                                <td>
                                    {payment.lich_hen
                                        ? new Date(payment.lich_hen).toLocaleString("vi-VN")
                                        : "Không có"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PaymentManagement;