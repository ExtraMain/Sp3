import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import "../css/ReviewManagement.css";

const ReviewManagement = () => {
    const [reviewsSummary, setReviewsSummary] = useState([]);
    const [reviewsList, setReviewsList] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(0); // 0 = tất cả
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());


    const fetchSummary = () => {
        const query = `?month=${selectedMonth}&year=${selectedYear}`;
        fetch(`http://localhost/BaiTapNhom/backend/back/get_reviews.php${query}`)
            .then(res => res.json())
            .then(data => setReviewsSummary(data))
            .catch(() => alert("Không thể tải biểu đồ đánh giá"));
    };


    const fetchList = () => {
        const query = `?month=${selectedMonth}&year=${selectedYear}`;
        fetch(`http://localhost/BaiTapNhom/backend/back/get_reviews_list.php${query}`)
            .then(res => res.json())
            .then(data => setReviewsList(data))
            .catch(() => alert("Không thể tải danh sách đánh giá"));
    };


    useEffect(() => {
        fetchSummary();
        fetchList();
    }, []);

    return (
        <div>
            <h2>⭐ Quản lý Đánh giá</h2>
            <div className="filter-section">
                <label>Tháng:</label>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                >
                    <option value={0}>Tất cả</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>

                <label>Năm:</label>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                    {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>

                <button onClick={() => { fetchSummary(); fetchList(); }}>
                    Lọc
                </button>

            </div>

            {/* Biểu đồ đường */}
            <div className="review-chart-container">
                <h3>Biểu đồ số lượng đánh giá theo ngày</h3>
                {reviewsSummary.length === 0 ? (
                    <p>Không có dữ liệu biểu đồ.</p>
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={reviewsSummary}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="ngay" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="so_luot_danh_gia"
                                stroke="#FF9800"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>


            {/* Danh sách chi tiết */}
            <h3>Danh sách đánh giá chi tiết</h3>
            <table className="review-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sản phẩm</th>
                        <th>Người dùng</th>
                        <th>Số sao</th>
                        <th>Bình luận</th>
                        <th>Ngày</th>
                    </tr>
                </thead>
                <tbody>
                    {reviewsList.map((r) => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.id_product}</td>
                            <td>{r.ten_nguoi_dung}</td>
                            <td>{r.so_sao} ⭐</td>
                            <td>{r.binh_luan}</td>
                            <td>{new Date(r.ngay).toLocaleDateString("vi-VN")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewManagement;
