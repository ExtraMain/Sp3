import React, { useState, useEffect } from "react";
import "../css/productManagement.css";

const ProductManagement = () => {
    const [products, setProducts] = useState({});
    const [editRow, setEditRow] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("../../src/page/funtion/Dich_vu_spa.json")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const handleInputChange = (category, id, field, value) => {
        setProducts({
            ...products,
            [category]: products[category].map(p =>
                p.id === id ? { ...p, [field]: value } : p
            )
        });
    };

    const removeVietnameseTones = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase();
    };


    const handleEditClick = (id) => {
        setEditRow({ ...editRow, [id]: true });
    };

    const handleSave = (id) => {
        alert(`Đã lưu sản phẩm ${id}`);
        setEditRow({ ...editRow, [id]: false });
    };

    const handleAddProduct = (category) => {
        const newProduct = {
            id: `new_${Date.now()}`,
            ten: "Sản phẩm mới",
            gia: 0,
            so_luong: 0,
            image: ["https://via.placeholder.com/60"]
        };

        setProducts({
            ...products,
            [category]: [newProduct, ...(products[category] || [])]
        });
    };

    const handleDelete = (category, id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa?")) {
            setProducts({
                ...products,
                [category]: products[category].filter(p => p.id !== id)
            });
        }
    };

    const handleSaveAll = () => {
        fetch("http://localhost/BaiTapNhom/backend/back/update_products.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(products),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert("💾 Đã lưu toàn bộ sản phẩm thành công!");
                } else {
                    alert("Lưu thất bại: " + (data.error || "Không rõ lỗi"));
                }
            })
            .catch(() => alert("Có lỗi khi kết nối server."));
    };

    const filteredProducts = (category) => {
        const keyword = removeVietnameseTones(searchTerm);

        return (products[category] || []).filter((p) => {
            const name = removeVietnameseTones(p.ten);
            return name.includes(keyword);
        });
    };

    return (
        <div className="product-management-container">
            <h2>🛍️ Quản lý Sản phẩm</h2>

            <input
                className="search-input"
                type="text"
                placeholder="🔍 Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
                className="save-button save-all"
                onClick={handleSaveAll}
            >
                💾 Lưu tất cả sản phẩm
            </button>

            {Object.keys(products).map((category) => (
                <div key={category} className="product-category">
                    <h3>{category}</h3>
                    <button
                        className="add-button"
                        onClick={() => handleAddProduct(category)}
                    >
                        ➕ Thêm sản phẩm
                    </button>

                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Giá</th>
                                <th>Tồn kho</th>
                                <th>Hình ảnh</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts(category).map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>
                                        {editRow[p.id] ? (
                                            <input
                                                value={p.ten}
                                                onChange={(e) =>
                                                    handleInputChange(category, p.id, "ten", e.target.value)
                                                }
                                            />
                                        ) : (
                                            p.ten
                                        )}
                                    </td>
                                    <td>
                                        {editRow[p.id] ? (
                                            <input
                                                type="number"
                                                value={p.gia}
                                                onChange={(e) =>
                                                    handleInputChange(category, p.id, "gia", parseFloat(e.target.value))
                                                }
                                            />
                                        ) : (
                                            Number(p.gia).toLocaleString("vi-VN") + " ₫"
                                        )}
                                    </td>
                                    <td>
                                        {editRow[p.id] ? (
                                            <input
                                                type="number"
                                                value={p.so_luong}
                                                onChange={(e) =>
                                                    handleInputChange(category, p.id, "so_luong", parseInt(e.target.value))
                                                }
                                            />
                                        ) : (
                                            p.so_luong
                                        )}
                                    </td>
                                    <td>
                                        <img src={p.image[0]} alt={p.ten} />
                                    </td>
                                    <td>
                                        {editRow[p.id] ? (
                                            <button
                                                className="save-button"
                                                onClick={() => handleSave(p.id)}
                                            >
                                                💾 Lưu
                                            </button>
                                        ) : (
                                            <button
                                                className="edit-button"
                                                onClick={() => handleEditClick(p.id)}
                                            >
                                                ✏️ Sửa
                                            </button>
                                        )}
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(category, p.id)}
                                        >
                                            ❌ Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default ProductManagement;
