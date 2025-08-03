import React, { useEffect, useState } from 'react';
import '../css/YeuThich.css'; // Import CSS file

const API = 'http://localhost/BaiTapNhom/backend/back/api_yeu_thich.php';

const YeuThich = () => {
  const [items, setItems] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi tải yêu thích:", err);
        setLoading(false);
      });
  }, [reload]);

  const handleDelete = (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa yêu thích ID ${id}?`)) {
      fetch(API, {
        method: 'DELETE',
        body: new URLSearchParams({ id })
      })
        .then(res => res.json())
        .then(() => setReload(!reload))
        .catch(err => console.error("Lỗi khi xóa:", err));
    }
  };

  return (
    <div className="yeu-thich-container">
      <h2>Quản lý Yêu thích</h2>
      
      {loading ? (
        <div className="loading">Đang tải dữ liệu</div>
      ) : (
        <table className="yeu-thich-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã người dùng</th>
              <th>Mã sản phẩm</th>
              <th>Ngày thêm</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  Không có dữ liệu yêu thích
                </td>
              </tr>
            ) : (
              items.map(row => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.ma_nguoi_dung}</td>
                  <td>{row.id_product}</td>
                  <td>{row.ngay_them}</td>
                  <td>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(row.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default YeuThich;