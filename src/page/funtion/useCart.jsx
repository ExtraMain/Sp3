import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import Dichvu from "../funtion/Dich_vu_spa.json"; // Assuming this is the correct path to your JSON file

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [animationTrigger, setAnimationTrigger] = useState(null);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingIndex = currentCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingIndex !== -1) {
      currentCart[existingIndex].quantity += product.quantity;
    } else {
      currentCart.push({
        ...product,
        id_product: product.id, // 👈 THÊM DÒNG NÀY để hỗ trợ Checkout
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(currentCart));
    setCartItems(currentCart);
    toast.success("Đã thêm vào giỏ hàng!");
  };


  // Remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId && item.id_product !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  // Update item quantity
  const updateQuantityLocal = (productId, quantity) => {
    if (quantity < 1) {
      toast.error("Số lượng phải lớn hơn 0");
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.id === productId || item.id_product === productId
        ? { ...item, quantity }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    toast.success("Đã cập nhật số lượng");
  };

  // Clear all items in cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    toast.success("Đã xóa toàn bộ giỏ hàng");
  };

  // Calculate cart summary
  const calculateCartSummary = useMemo(() => {
    const Products = Object.values(Dichvu).flat();
    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    const totalAmount = cartItems.reduce((sum, item) => {
      const product = Products.find(
        (p) => p.id === item.id || p.id === item.id_product
      );
      const price = product?.gia || 0;
      return sum + price * (item.quantity || 1);
    }, 0);
    return { totalQuantity, totalAmount };
  }, [cartItems]);

  const value = {
    cartItems,
    totalQuantity: calculateCartSummary.totalQuantity,
    totalAmount: calculateCartSummary.totalAmount,
    addToCart,
    removeFromCart,
    updateQuantityLocal,
    clearCart,
    animationTrigger,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
