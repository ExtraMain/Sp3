import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./useCart";
import { AuthContext } from "./AuthContext";
import "../../style/checkout.css";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";

const Checkout = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext) || {};

  const directProduct = location.state?.product;
  const cartItemsFromRoute = location.state?.products;

  const [finalCartItems, setFinalCartItems] = useState([]);
  const [finalTotalAmount, setFinalTotalAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const [customerInfo, setCustomerInfo] = useState({
    fullName: user?.username || "",
    email: user?.email || user?.identifier || "", // 👈 thêm dòng này
    phone: user?.phone || "",
    note: "",
    orderDate: "",
    orderTime: "",
  });


  const now = new Date();
  const selectedTime = customerInfo.orderTime || "00:00";
  const [hours, minutes] = selectedTime.split(":");
  now.setHours(hours, minutes);


  const [formErrors, setFormErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Form reference for submitting from outside
  const formRef = useRef(null);


  useEffect(() => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để thanh toán");
      navigate("/register");
    }
  }, [isAuthenticated, navigate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  useEffect(() => {
    let calculatedCartItems = [];
    let calculatedTotal = 0;

    if (directProduct) {
      const item = {
        id_product: directProduct.id || "unknown",
        ten: directProduct.ten || "Sản phẩm không xác định",
        gia: Number(directProduct.gia) || 0,
        so_luong: location.state?.quantity || 1,
        danh_muc: directProduct.danh_muc || "Dịch vụ",
        images: directProduct.image?.[0] || "/placeholder.jpg",
      };
      calculatedCartItems.push(item);
      calculatedTotal = item.gia * item.so_luong;
    } else if (cartItemsFromRoute && cartItemsFromRoute.length > 0) {
      calculatedCartItems = cartItemsFromRoute.map((item) => ({
        id_product: item.id_product || "unknown",
        ten: item.ten || "Sản phẩm không xác định",
        gia: Number(item.gia) || 0,
        so_luong: item.quantity || item.so_luong || 1,
        danh_muc: item.danh_muc || "Dịch vụ",
        images: item.image || "/placeholder.jpg",
      }));
      calculatedTotal = calculatedCartItems.reduce(
        (total, item) => total + item.gia * item.so_luong,
        0
      );
    } else if (cartItems && cartItems.length > 0) {
      calculatedCartItems = cartItems.map((item) => ({
        id_product: item.id_product,
        ten: item.ten || "Sản phẩm không xác định",
        gia: Number(item.gia) || 0,
        so_luong: item.quantity || item.so_luong || 1,
        danh_muc: item.danh_muc || "Dịch vụ",
        images: item.image,
      }));
      calculatedTotal = totalAmount;
    }
    const maxTotalAllowed = 99999999.99;
    if (calculatedTotal > maxTotalAllowed) {
      toast.error(
        "Số tiền quá lớn! Vui lòng giảm số lượng hoặc chọn sản phẩm khác."
      );
      setFinalCartItems(calculatedCartItems);
      setFinalTotalAmount(calculatedTotal);
      return;
    }
    setFinalCartItems(calculatedCartItems);
    setFinalTotalAmount(calculatedTotal);
  }, [directProduct, cartItems, cartItemsFromRoute, totalAmount]);

  const validateForm = () => {
    const errors = {};

    if (!customerInfo.orderDate) {
      errors.orderDate = "Vui lòng chọn ngày đặt lịch";
    }

    if (!customerInfo.orderTime) {
      errors.orderTime = "Vui lòng chọn giờ đặt lịch";
    } else if (!isTimeWithinAllowedRange(customerInfo.orderTime)) {
      errors.orderTime = "Chỉ nhận lịch từ 07:00 đến 22:59";
    }


    if (!customerInfo.fullName.trim()) {
      errors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!customerInfo.email.trim()) {
      errors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!customerInfo.phone.trim()) {
      errors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^\d{10,11}$/.test(customerInfo.phone.replace(/[^0-9]/g, ""))) {
      errors.phone = "Số điện thoại không hợp lệ";
    }



    finalCartItems.forEach((item, index) => {
      if (!item.id_product || item.id_product === "unknown") {
        errors[`id_product_${index}`] = `Sản phẩm tại vị trí ${index + 1
          } thiếu ID`;
      }
      if (!item.ten || item.ten === "Sản phẩm không xác định") {
        errors[`ten_${index}`] = `Sản phẩm tại vị trí ${index + 1} thiếu tên`;
      }
      if (!item.danh_muc) {
        errors[`danh_muc_${index}`] = `Sản phẩm tại vị trí ${index + 1
          } thiếu danh mục`;
      }
      if (!Number.isFinite(item.gia) || item.gia <= 0) {
        errors[`gia_${index}`] = `Sản phẩm tại vị trí ${index + 1
          } có giá không hợp lệ`;
      }
      if (!item.so_luong || item.so_luong < 1) {
        errors[`so_luong_${index}`] = `Sản phẩm tại vị trí ${index + 1
          } có số lượng không hợp lệ`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateProductStock = async (products) => {
    try {
      const items = products.map(item => ({
        id_san_pham: item.id_product,
        so_luong: item.so_luong
      }));

      const response = await fetch("http://localhost/BaiTapNhom/backend/update_stock.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items })
      });

      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Lỗi update tồn kho:", err);
      return { success: false, message: err.message };
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit triggered, paymentMethod:", paymentMethod);


    if (!validateForm()) {
      console.log("Form validation failed:", formErrors);
      return;
    }

    setIsProcessing(true);
    setError("");

    const selectedDateTime = new Date(`${customerInfo.orderDate}T${customerInfo.orderTime}`);

    try {
      const orderData = {
        userId: user?.id || null,
        cartItems: finalCartItems.map((item) => ({
          id_product: item.id_product,
          ten: item.ten,
          gia: item.gia,
          so_luong: item.so_luong,
          danh_muc: item.danh_muc,
        })),
        customerInfo,
        paymentMethod,
        totalAmount: finalTotalAmount,
        orderDate: new Date(selectedDateTime.getTime() - selectedDateTime.getTimezoneOffset() * 60000).toISOString()
      };

      console.log("Sending orderData to backend:", orderData);

      const response = await fetch(
        "http://localhost/BaiTapNhom/backend/payments.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (response.status === 409) {
        const result = await response.json();
        setError(result.message);
        toast.error(result.message);
        setIsProcessing(false);
        return;
      }

      if (!response.ok) {
        const errorText = await response.text().catch(() => "No response body");
        console.error("Fetch error details:", {
          status: response.status,
          statusText: response.statusText,
          errorText,
        });
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Backend response:", result);

      if (result.status === "success") {
        const stockUpdateResult = await updateProductStock(finalCartItems);
        console.log("Stock update result:", stockUpdateResult);

        if (!stockUpdateResult.success) {
          toast.warning(
            "Đơn đã được xử lý, nhưng có lỗi khi cập nhật tồn kho: " +
            (stockUpdateResult.message || "Lỗi không xác định")
          );
        }

        if (paymentMethod === "vnpay" && result.payUrl) {
          console.log("Redirecting to VNPay URL:", result.payUrl);
          window.location.href = result.payUrl;
          // Only clear cart after successful redirection
          setTimeout(() => clearCart(), 0); // Delay to ensure redirection starts
        } else if (paymentMethod === "vnpay" && !result.payUrl) {
          console.error("VNPay selected but no payUrl provided in response");
          toast.error("Lỗi: Không nhận được URL thanh toán VNPay từ server");
          setError("Không thể xử lý thanh toán VNPay. Vui lòng thử lại.");
        } else {
          console.log("Processing COD order, navigating to invoice");
          clearCart();
          // Lưu orderId để dùng cho đánh giá
          if (finalCartItems.length === 1) {
            const singleProductId = finalCartItems[0].id_product;
            localStorage.setItem(`review_order_${singleProductId}_user_${user?.id}`, result.orderId);
          }

          navigate("/invoice", {
            state: {
              orderData: {
                customerInfo,
                cartItems: finalCartItems,
                totalAmount: finalTotalAmount,
                paymentMethod,
                orderDate: selectedDateTime.toISOString(),
                orderId: result.orderId,
              },
            },
          });
        }
      } else {
        console.error("Backend returned non-success status:", result);
        setError(result.message || "Có lỗi xảy ra trong quá trình xử lý");
        toast.error(result.message || "Lỗi xử lý đơn");
      }
    } catch (err) {
      console.error("Checkout error details:", {
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
      setError("Có lỗi xảy ra: " + err.message);
      toast.error("Lỗi: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetForm = () => {
    setCustomerInfo({
      fullName: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      note: "",
      orderDate: "",
      orderTime: "",
    });
    setPaymentMethod("cod");
    setFormErrors({});
    setError("");
  };



  const orderTotal = finalTotalAmount;


  const isTimeWithinAllowedRange = (timeString) => {
    const [hour, minute] = timeString.split(":").map(Number);
    const totalMinutes = hour * 60 + minute;

    const startMinutes = 7 * 60;     // 07:00
    const endMinutes = 23 * 60;      // 23:00 (11:00 PM)

    return totalMinutes >= startMinutes && totalMinutes < endMinutes;
  };

  return (
    <div className="checkout-page">
      {error && <div className="error-message">{error}</div>}
      <div className="checkout-container">
        <div className="checkout-form-container">
          <form ref={formRef} onSubmit={handleSubmit} className="checkout-form">
            <h3>Thông tin đơn đặt lịch</h3>
            <div className={`form-group ${formErrors.fullName ? "error" : ""}`}>
              <label htmlFor="fullName">Họ và tên</label>
              <input
                id="fullName"
                type="text"
                placeholder="Nhập họ và tên"
                value={customerInfo.fullName}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, fullName: e.target.value })
                }
                required
              />
              {formErrors.fullName && (
                <div className="error-text">{formErrors.fullName}</div>
              )}
            </div>
            <div className={`form-group ${formErrors.email ? "error" : ""}`}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Nhập địa chỉ email"
                value={customerInfo.email}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, email: e.target.value })
                }
                required
              />
              {formErrors.email && (
                <div className="error-text">{formErrors.email}</div>
              )}
            </div>
            <div className={`form-group ${formErrors.phone ? "error" : ""}`}>
              <label htmlFor="phone">Số điện thoại</label>
              <input
                id="phone"
                type="tel"
                placeholder="Nhập số điện thoại"
                value={customerInfo.phone}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, phone: e.target.value })
                }
                required
              />
              {formErrors.phone && (
                <div className="error-text">{formErrors.phone}</div>
              )}
            </div>
            <div className="form-group">
              <label>Lịch hẹn</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div>
                  <label htmlFor="orderDate">Ngày</label>
                  <input
                    type="date"
                    id="orderDate"
                    min={new Date().toISOString().split("T")[0]}
                    value={customerInfo.orderDate}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, orderDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor="orderTime">Giờ</label>
                  <input
                    type="time"
                    id="orderTime"
                    min="07:00"
                    max="22:59"
                    value={customerInfo.orderTime}
                    onChange={(e) => {
                      const time = e.target.value;
                      setCustomerInfo({ ...customerInfo, orderTime: time });

                      if (!isTimeWithinAllowedRange(time)) {
                        setFormErrors((prev) => ({
                          ...prev,
                          orderTime: "Chỉ nhận lịch từ 07:00 đến 22:59",
                        }));
                      } else {
                        setFormErrors((prev) => {
                          const { orderTime, ...rest } = prev;
                          return rest;
                        });
                      }
                    }}
                    required
                  />
                  {formErrors.orderTime && (
                    <div className="error-text">{formErrors.orderTime}</div>
                  )}


                </div>
              </div>
            </div>


            <div className="form-group">
              <label htmlFor="note">Ghi chú đơn</label>
              <textarea
                id="note"
                placeholder="Nhập ghi chú nếu có..."
                value={customerInfo.note}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, note: e.target.value })
                }
              />
            </div>
          </form>
        </div>
        <div className="checkout-summary">
          <h3>Đơn đặt lịch của bạn</h3>
          <div className="cart-items">
            {finalCartItems.length > 0 ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Giá</th>
                      <th>SL</th>
                      <th>Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalCartItems.map((item, index) => (
                      <motion.tr
                        key={`${item.id_product}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <td className="item-image-name">
                          {item.images && (
                            <img
                              src={item.images}
                              alt={item.ten}
                              className="item-thumbnail"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/placeholder.jpg";
                              }}
                            />
                          )}
                          <span>{item.ten}</span>
                        </td>
                        <td>{formatCurrency(item.gia)}</td>
                        <td>{item.so_luong}</td>
                        <td>{formatCurrency(item.gia * item.so_luong)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
                <ToastContainer />
                <div className="cart-totals">
                  <div className="totals-row">
                    <span>Tạm tính:</span>
                    <span>{formatCurrency(finalTotalAmount)}</span>
                  </div>


                  <div className="totals-row grand-total">
                    <span>Tổng thanh toán:</span>
                    <span>{formatCurrency(orderTotal)}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="empty-cart-message">
                Không có sản phẩm nào trong giỏ hàng
              </p>
            )}
          </div>

          <h3>Phương thức thanh toán</h3>
          <div className="payment-methods">
            <div className="payment-option">
              <input
                type="radio"
                id="cod"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <label htmlFor="cod">
                <span className="payment-icon">💵</span>
                <span>Thanh toán trực tiếp</span>
              </label>
            </div>
            <div className="payment-option">
              <input
                type="radio"
                id="vnpay"
                name="payment"
                value="vnpay"
                checked={paymentMethod === "vnpay"}
                onChange={() => setPaymentMethod("vnpay")}
              />
              <label htmlFor="vnpay">
                <span className="payment-icon">💳</span>
                <span>VNPay (Thẻ ATM/Visa/Master/JCB)</span>
              </label>
            </div>
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="checkout-button"
              onClick={() => formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
              disabled={isProcessing || finalCartItems.length === 0 || !!error}
              title={finalCartItems.length === 0 ? "Giỏ hàng trống" : ""}
            >
              {isProcessing ? (
                <>
                  <span className="spinner"></span> Đang xử lý...
                </>
              ) : (
                "Đặt lịch"
              )}
            </button>
            <button
              type="button"
              className="reset-button"
              onClick={handleResetForm}
              disabled={isProcessing}
              title="Xóa toàn bộ thông tin đã nhập"
            >
              Nhập lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
