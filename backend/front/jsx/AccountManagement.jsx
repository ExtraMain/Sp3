import React, { useState, useEffect } from "react";
import "../css/accountManagement.css";

const API_URL = "http://localhost/BaiTapNhom/backend/back/account_api.php";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [newlyAddedId, setNewlyAddedId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [newUser, setNewUser] = useState({
    user: "",
    email: "",
    password: "",
    phone: ""
  });

  const fetchAccounts = () => {
    fetch(API_URL + "?t=" + Date.now())
      .then(res => res.json())
      .then(data => setAccounts(data))
      .catch(() => setErrorMessage("Không thể tải danh sách tài khoản"));
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAddUser = () => {
    if (!newUser.user || !newUser.email || !newUser.password) {
      setErrorMessage("Vui lòng nhập đầy đủ tên, email và mật khẩu.");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "add",
        user: newUser.user,
        email: newUser.email,
        password: newUser.password,
        phone: newUser.phone,
        role: "user"
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setErrorMessage(data.error);
          setSuccessMessage("");
        } else {
          setNewUser({ user: "", email: "", password: "", phone: "" });
          setSuccessMessage("Thêm tài khoản thành công!");
          setErrorMessage("");
          
          // Nếu API trả về id, highlight row mới
          if (data.id) {
            setNewlyAddedId(data.id);
            setTimeout(() => setNewlyAddedId(null), 2000);
          }
          
          fetchAccounts();
          
          // Clear success message sau 3 giây
          setTimeout(() => setSuccessMessage(""), 3000);
        }
      })
      .catch(() => {
        setErrorMessage("Lỗi kết nối đến máy chủ.");
        setSuccessMessage("");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id })
      })
      .then(() => {
        fetchAccounts();
        setSuccessMessage("Xóa tài khoản thành công!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(() => setErrorMessage("Lỗi khi xóa tài khoản"));
    }
  };

  const handleRoleChange = (id, newRole) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update", id, role: newRole })
    })
    .then(() => {
      fetchAccounts();
      setSuccessMessage("Cập nhật vai trò thành công!");
      setTimeout(() => setSuccessMessage(""), 3000);
    })
    .catch(() => setErrorMessage("Lỗi khi cập nhật vai trò"));
  };

  const handleStatusToggle = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "disabled" : "active";
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update_status", id, status: newStatus })
    })
    .then(() => {
      fetchAccounts();
      setSuccessMessage(`${newStatus === "active" ? "Kích hoạt" : "Vô hiệu hóa"} tài khoản thành công!`);
      setTimeout(() => setSuccessMessage(""), 3000);
    })
    .catch(() => setErrorMessage("Lỗi khi cập nhật trạng thái"));
  };

  return (
    <div className="account-management-container">
      <h2>👤 Quản lý Tài khoản</h2>

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}

      <div className="add-user-form">
        <input 
          type="text" 
          placeholder="Tên người dùng"
          value={newUser.user}
          onChange={(e) => setNewUser({ ...newUser, user: e.target.value })}
        />
        <input 
          type="email" 
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input 
          type="password" 
          placeholder="Mật khẩu"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Số điện thoại"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <button onClick={handleAddUser}>➕ Thêm tài khoản</button>
      </div>

      <div className="account-table-wrapper">
        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-state">
                  Không có tài khoản nào
                </td>
              </tr>
            ) : (
              accounts.map((acc) => (
                <tr 
                  key={acc.id} 
                  className={newlyAddedId === acc.id ? "new-row" : ""}
                >
                  <td>{acc.id}</td>
                  <td>{acc.user}</td>
                  <td>{acc.email}</td>
                  <td>{acc.phone || "Chưa có"}</td>
                  <td>
                    <select 
                      value={acc.role} 
                      onChange={(e) => handleRoleChange(acc.id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className={acc.status === "active" ? "active-button" : "disabled-button"}
                      onClick={() => handleStatusToggle(acc.id, acc.status)}
                      title={acc.status === "active" ? "Click để vô hiệu hóa" : "Click để kích hoạt"}
                    >
                      {acc.status === "active" ? "Hoạt động" : "Vô hiệu hóa"}
                    </button>
                  </td>
                  <td>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDelete(acc.id)}
                      title="Xóa tài khoản"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountManagement;