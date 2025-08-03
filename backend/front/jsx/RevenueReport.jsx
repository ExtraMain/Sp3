import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import "../css/RevenueReport.css";


const RevenueReport = () => {
  const [revenues, setRevenues] = useState([]);
  const [overallRevenue, setOverallRevenue] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [successMessage, setSuccessMessage] = useState("");


  const fetchRevenue = () => {
    fetch(`http://localhost/BaiTapNhom/backend/back/get_revenue.php?month=${selectedMonth}&year=${selectedYear}`)
      .then(res => res.json())
      .then(data => setRevenues(data))
      .catch(() => alert("Không thể tải doanh thu tháng"));
  };

  const fetchOverallRevenue = () => {
    fetch("http://localhost/BaiTapNhom/backend/back/get_revenue_overall.php")
      .then(res => res.json())
      .then(data => setOverallRevenue(data))
      .catch(() => alert("Không thể tải tổng doanh thu toàn hệ thống"));
  };
  

  useEffect(() => {
    fetchRevenue();
    fetchOverallRevenue();
  }, [selectedMonth, selectedYear]);

  const totalRevenue = revenues.reduce(
    (sum, item) => sum + item.tong_doanh_thu,
    0
  );

  return (
    <div className="revenue-report">
      <h2>📊 Thống kê Doanh thu</h2>

      <div className="filter-section">
        <label>Tháng:</label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>

        <label>Năm:</label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <button onClick={fetchRevenue}>Xem</button>
      </div>

      {/* Biểu đồ cột doanh thu từng ngày trong tháng */}
      <div style={{ width: "100%", height: 400, marginBottom: 30, paddingLeft: 20 }}>
        <h3>📆 Doanh thu từng ngày trong tháng {selectedMonth}/{selectedYear}</h3>
        {revenues.length === 0 ? (
          <p>Không có dữ liệu biểu đồ.</p>
        ) : (
          <ResponsiveContainer width="100%" height="90%">
            <BarChart 
              data={revenues}
              margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ngay" />
              <YAxis 
                width={80}
                tickFormatter={(value) => 
                  new Intl.NumberFormat('vi-VN', {
                    notation: 'compact',
                    compactDisplay: 'short'
                  }).format(value)
                }
              />
              <Tooltip 
                formatter={(value) => [
                  new Intl.NumberFormat('vi-VN').format(value) + ' ₫',
                  'Doanh thu'
                ]}
              />
              <Bar dataKey="tong_doanh_thu" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <h3>Tổng doanh thu tháng {selectedMonth}/{selectedYear}: {totalRevenue.toLocaleString("vi-VN")} ₫</h3>

      {/* Bảng chi tiết */}
      <table className="payment-table">
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Doanh thu trong ngày</th>
          </tr>
        </thead>
        <tbody>
          {revenues.map((item, index) => (
            <tr key={index}>
              <td>{item.ngay}</td>
              <td>{item.tong_doanh_thu.toLocaleString("vi-VN")} ₫</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Biểu đồ đường tổng doanh thu từng tháng toàn hệ thống */}
      <div style={{ width: "100%", height: 400, marginTop: 50, paddingLeft: 20 }}>
        <h3>📊 Tổng doanh thu từng tháng của toàn hệ thống</h3>
        {overallRevenue.length === 0 ? (
          <p>Không có dữ liệu tổng doanh thu.</p>
        ) : (
          <ResponsiveContainer width="100%" height="90%">
            <LineChart 
              data={overallRevenue}
              margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="thang" />
              <YAxis 
                width={80}
                tickFormatter={(value) => 
                  new Intl.NumberFormat('vi-VN', {
                    notation: 'compact',
                    compactDisplay: 'short'
                  }).format(value)
                }
              />
              <Tooltip 
                formatter={(value) => [
                  new Intl.NumberFormat('vi-VN').format(value) + ' ₫',
                  'Doanh thu'
                ]}
              />
              <Line
                type="monotone"
                dataKey="tong_doanh_thu"
                stroke="#1976D2"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RevenueReport;