import React, { useState } from "react";
import ScheduleOrderManagement from "./Quan_ly_don_dat_lich.jsx";
import ProductManagement from "./ProductManagement.jsx";
import AccountManagement from "./AccountManagement.jsx";
import PaymentManager from "./PaymentManagement.jsx";
import RevenueReport from "./RevenueReport.jsx";
import ReviewManagement from "./ReviewManagement.jsx";
import LienHe from './LienHe';
import YeuThich from './YeuThich.jsx';

import "../css/administator.css";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("schedule");

  const renderContent = () => {
    switch (activeSection) {
      case "schedule":
        return <ScheduleOrderManagement />;
      case "products":
        return <ProductManagement />;
      case "accounts":
        return <AccountManagement />;
      case "payment":
        return <PaymentManager />;
      case "revenue":
        return <RevenueReport />;
      case "reviews":
        return <ReviewManagement />;
      case "contact":
        return <LienHe />;
      case "favorites":
        return <YeuThich />;
      default:
        return <div>Chọn một mục từ menu</div>;
    }
  };


  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h3>📋 Quản trị Admin</h3>
        <ul>
          <li>
            <button
              onClick={() => setActiveSection("schedule")}
              className={activeSection === "schedule" ? "active" : ""}
            >
              📅Quản lý Đơn đặt lịch
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("products")}
              className={activeSection === "products" ? "active" : ""}
            >
              🛍️ Quản lý Dịch Vụ
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("accounts")}
              className={activeSection === "accounts" ? "active" : ""}
            >
              👤 Quản lý Tài khoản
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("payment")}
              className={activeSection === "payment" ? "active" : ""}
            >
              💳 Quản lý Thanh toán
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("revenue")}
              className={activeSection === "revenue" ? "active" : ""}
            >
              📊 Thống kê Doanh thu
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("reviews")}
              className={activeSection === "reviews" ? "active" : ""}
            >
              ⭐ Quản lý Đánh giá
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("contact")}
              className={activeSection === "contact" ? "active" : ""}
            >
              📬 Quản lý Liên hệ
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("favorites")}
              className={activeSection === "favourites" ? "active" : ""}
            >
              ❤️ Quản lý Yêu thích
            </button>
          </li>

        </ul>
      </aside>

      <main className="admin-main">{renderContent()}</main>
    </div>
  );
};

export default Admin;
