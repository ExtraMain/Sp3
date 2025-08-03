
import React, { useEffect, useState } from 'react';
import { Search, Trash2, Mail, Phone, User, MessageSquare, Calendar, Filter, RefreshCw } from 'lucide-react';
import "../css/lien_he.css";



const API_URL = 'http://localhost/BaiTapNhom/backend/back/api_lien_he.php';

const LienHe = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedRows, setSelectedRows] = useState(new Set());

    useEffect(() => {
        setLoading(true);
        fetch(API_URL)
            .then(res => res.json())
            .then(responseData => {
                setData(responseData);
                setFilteredData(responseData);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi tải dữ liệu:", err);
                setLoading(false);
            });
    }, [reload]);

    useEffect(() => {
        let filtered = data.filter(item =>
            item.ten?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.noi_dung?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filtered.sort((a, b) => {
            const dateA = new Date(a.thoi_gian_gui);
            const dateB = new Date(b.thoi_gian_gui);
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });

        setFilteredData(filtered);
    }, [data, searchTerm, sortOrder]);

    const handleDelete = (id) => {
        if (window.confirm(`Bạn có chắc muốn xóa liên hệ ID ${id}?`)) {
            fetch(API_URL, {
                method: 'DELETE',
                body: new URLSearchParams({ id })
            })
                .then(res => res.json())
                .then(res => {
                    alert(res.message || 'Đã xóa thành công');
                    setReload(!reload);
                })
                .catch(err => {
                    console.error("Lỗi xóa:", err);
                    alert('Có lỗi xảy ra khi xóa');
                });
        }
    };

    const handleBulkDelete = () => {
        if (selectedRows.size === 0) {
            alert('Vui lòng chọn ít nhất một liên hệ để xóa');
            return;
        }

        if (window.confirm(`Bạn có chắc muốn xóa ${selectedRows.size} liên hệ đã chọn?`)) {
            Promise.all(
                Array.from(selectedRows).map(id =>
                    fetch(API_URL, {
                        method: 'DELETE',
                        body: new URLSearchParams({ id })
                    })
                )
            ).then(() => {
                alert('Đã xóa các liên hệ đã chọn');
                setSelectedRows(new Set());
                setReload(!reload);
            }).catch(err => {
                console.error("Lỗi xóa hàng loạt:", err);
                alert('Có lỗi xảy ra khi xóa');
            });
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(new Set(filteredData.map(item => item.id)));
        } else {
            setSelectedRows(new Set());
        }
    };

    const handleRowSelect = (id) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const truncateText = (text, maxLength = 100) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="lien-he-container">
            <div className="lien-he-header">
                <div className="header-left">
                    <h2 className="page-title">
                        <Mail className="title-icon" />
                        Quản lý liên hệ
                    </h2>
                    <div className="stats">
                        <span className="stat-item">
                            Tổng: <strong>{data.length}</strong>
                        </span>
                        <span className="stat-item">
                            Hiển thị: <strong>{filteredData.length}</strong>
                        </span>
                        {selectedRows.size > 0 && (
                            <span className="stat-item selected">
                                Đã chọn: <strong>{selectedRows.size}</strong>
                            </span>
                        )}
                    </div>
                </div>

                <div className="header-actions">
                    <button
                        className="btn btn-refresh"
                        onClick={() => setReload(!reload)}
                        disabled={loading}
                    >
                        <RefreshCw className={`icon ${loading ? 'spinning' : ''}`} />
                        Làm mới
                    </button>

                    {selectedRows.size > 0 && (
                        <button
                            className="btn btn-danger"
                            onClick={handleBulkDelete}
                        >
                            <Trash2 className="icon" />
                            Xóa đã chọn ({selectedRows.size})
                        </button>
                    )}
                </div>
            </div>

            <div className="lien-he-filters">
                <div className="search-box">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, email hoặc nội dung..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="sort-controls">
                    <Filter className="filter-icon" />
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="sort-select"
                    >
                        <option value="desc">Mới nhất</option>
                        <option value="asc">Cũ nhất</option>
                    </select>
                </div>
            </div>

            <div className="table-container">
                {loading ? (
                    <div className="loading-state">
                        <RefreshCw className="loading-icon spinning" />
                        <p>Đang tải dữ liệu...</p>
                    </div>
                ) : (
                    <table className="lien-he-table">
                        <thead>
                            <tr>
                                <th className="checkbox-column">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.size === filteredData.length && filteredData.length > 0}
                                        onChange={handleSelectAll}
                                        className="checkbox"
                                    />
                                </th>
                                <th>ID</th>
                                <th>
                                    <User className="header-icon" />
                                    Tên
                                </th>
                                <th>
                                    <Mail className="header-icon" />
                                    Email
                                </th>
                                <th>
                                    <Phone className="header-icon" />
                                    SĐT
                                </th>
                                <th>
                                    <MessageSquare className="header-icon" />
                                    Nội dung
                                </th>
                                <th>
                                    <Calendar className="header-icon" />
                                    Thời gian gửi
                                </th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="empty-state">
                                        {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Không có liên hệ nào'}
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map(row => (
                                    <tr
                                        key={row.id}
                                        className={selectedRows.has(row.id) ? 'selected' : ''}
                                    >
                                        <td className="checkbox-column">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.has(row.id)}
                                                onChange={() => handleRowSelect(row.id)}
                                                className="checkbox"
                                            />
                                        </td>
                                        <td className="id-column">{row.id}</td>
                                        <td className="name-column">
                                            <div className="user-info">
                                                <div className="user-avatar">
                                                    {row.ten?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <span>{row.ten}</span>
                                            </div>
                                        </td>
                                        <td className="email-column">{row.email}</td>
                                        <td className="phone-column">{row.sdt}</td>
                                        <td className="content-column">
                                            <div className="content-text" title={row.noi_dung}>
                                                {truncateText(row.noi_dung)}
                                            </div>
                                        </td>
                                        <td className="date-column">{formatDate(row.thoi_gian_gui)}</td>
                                        <td className="action-column">
                                            <button
                                                onClick={() => handleDelete(row.id)}
                                                className="btn btn-delete"
                                                title="Xóa liên hệ"
                                            >
                                                <Trash2 className="icon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
export default LienHe;