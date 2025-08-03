-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th7 10, 2025 lúc 07:34 AM
-- Phiên bản máy phục vụ: 8.4.3
-- Phiên bản PHP: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `form`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dang_ky`
--

CREATE TABLE `dang_ky` (
  `id` int NOT NULL,
  `user` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `is_active` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `dang_ky`
--

INSERT INTO `dang_ky` (`id`, `user`, `phone`, `email`, `pass`, `role`, `is_active`) VALUES
(1, 'ubuntu', '0987654333', 'ubuntu@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'user', 1),
(2, 'Admin', '1234567890', 'admin@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'admin', 1),
(3, 'test', '0123456789', 'test@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'user', 1),
(6, 'test12345', '1111111114', 'test12434@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'user', 0),
(7, '12', '1111111115', 'q@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'user', 0),
(8, 'testuser', '123456789', 'test@example.com', 'e10adc3949ba59abbe56e057f20f883e', 'user', 1),
(9, 'unkown', '1111111119', 'unkown123@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'user', 1),
(10, '<script>alert(\"XSS\")</script>', '0123454321', 'tes1t@example.com', 'e10adc3949ba59abbe56e057f20f883e', 'user', 1),
(11, '<img src=x onerror=alert(\"XSS\")>', '0987654328', 'test9@example.com', 'e10adc3949ba59abbe56e057f20f883e', 'user', 1),
(12, '<script src=\"http://evil.com/x.js\"></script>', '1112111111', 'qq@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'user', 1),
(13, 'unkown', '1111111116', 'unkown112@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'user', 1),
(14, 'unkown117', '1111111117', 'unkown117@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'user', 1),
(15, 'T', '0000000001', 'tung@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'user', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danh_gia`
--

CREATE TABLE `danh_gia` (
  `id` int NOT NULL,
  `id_product` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ten_nguoi_dung` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `so_sao` int NOT NULL,
  `binh_luan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ngay` datetime NOT NULL,
  `ma_don_hang` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `danh_gia`
--

INSERT INTO `danh_gia` (`id`, `id_product`, `ten_nguoi_dung`, `so_sao`, `binh_luan`, `ngay`, `ma_don_hang`) VALUES
(1, 'cpu002', 'admin', 5, 'd', '2025-04-26 00:00:00', 1),
(2, 'cpu002', 'admin', 5, 'g', '2025-04-26 00:00:00', NULL),
(3, 'cpu002', 'admin', 5, 'hello', '2025-04-26 00:00:00', NULL),
(4, 'cpu003', 'admin', 5, 'hello there\\n', '2025-04-28 00:00:00', NULL),
(5, 'cpu003', 'admin', 5, 'ok guy', '2025-05-06 00:00:00', NULL),
(6, 'cpu007', 'admin', 5, 'ok', '2025-05-06 00:00:00', NULL),
(7, 'cpu001', 'admin', 5, 'ok', '2025-05-06 00:00:00', NULL),
(8, 'gpu001', 'Admin', 5, 'woo\\n', '2025-05-16 00:00:00', NULL),
(9, 'peripheral009', 'Admin', 5, 'yo', '2025-05-16 00:00:00', NULL),
(10, 'gpu001', 'Admin', 1, 'hàng lỗi', '2025-05-23 00:00:00', NULL),
(11, 'case009', 'Admin', 5, 'hello there', '2025-05-25 22:56:54', NULL),
(12, 'case009', 'Admin', 3, 'ok', '2025-05-25 22:57:10', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `don_dat_lich`
--

CREATE TABLE `don_dat_lich` (
  `id` int NOT NULL,
  `ma_nguoi_dung` int NOT NULL,
  `ten_khach_hang` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `so_dien_thoai` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tong_tien` int NOT NULL,
  `trang_thai` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'Chờ xử lý',
  `ngay_dat` datetime DEFAULT CURRENT_TIMESTAMP,
  `gio_dat` time DEFAULT NULL,
  `ghi_chu` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `don_dat_lich`
--

INSERT INTO `don_dat_lich` (`id`, `ma_nguoi_dung`, `ten_khach_hang`, `so_dien_thoai`, `email`, `tong_tien`, `trang_thai`, `ngay_dat`, `gio_dat`, `ghi_chu`) VALUES
(18, 2, NULL, NULL, NULL, 17780000, 'Đã thanh toán', '2025-04-29 06:52:29', NULL, ''),
(19, 2, NULL, NULL, NULL, 4030000, 'Đã thanh toán', '2025-04-29 06:54:06', NULL, ''),
(21, 2, NULL, NULL, NULL, 3430000, 'Đã thanh toán', '2025-04-29 07:23:46', NULL, ''),
(22, 2, NULL, NULL, NULL, 60030000, 'Đã thanh toán', '2025-04-29 07:40:19', NULL, 'test'),
(24, 2, NULL, NULL, NULL, 6500000, 'Chờ xử lý', '2025-04-29 08:46:42', NULL, 'test2'),
(25, 2, NULL, NULL, NULL, 26000000, 'Chờ xử lý', '2025-04-29 09:54:08', NULL, 'ok'),
(26, 2, NULL, NULL, NULL, 80000000, 'Đã thanh toán', '2025-04-17 09:55:05', NULL, ''),
(27, 2, NULL, NULL, NULL, 16530000, 'Chờ xử lý', '2025-05-06 11:57:33', NULL, ''),
(28, 2, NULL, NULL, NULL, 4530000, 'Đã thanh toán', '2025-05-04 12:01:26', NULL, ''),
(29, 2, NULL, NULL, NULL, 66930000, 'Đã thanh toán', '2025-05-06 12:43:00', NULL, ''),
(30, 2, NULL, NULL, NULL, 165030000, 'Đã thanh toán', '2025-05-05 14:01:57', NULL, ''),
(31, 2, NULL, NULL, NULL, 7030000, 'Chưa thanh toán', '2025-05-06 15:10:47', NULL, ''),
(32, 2, NULL, NULL, NULL, 42030000, 'Chờ xử lý', '2025-05-06 15:52:17', NULL, ''),
(33, 2, NULL, NULL, NULL, 42030000, 'Đã thanh toán', '2025-05-08 08:02:56', NULL, ''),
(34, 2, NULL, NULL, NULL, 42000000, 'Đã thanh toán', '2025-05-08 08:10:18', NULL, ''),
(51, 2, NULL, NULL, NULL, 66930000, 'Đã thanh toán', '2025-05-10 13:03:53', NULL, 'hello'),
(52, 2, NULL, NULL, NULL, 37030000, 'Chờ xử lý', '2025-05-15 06:25:49', NULL, ''),
(53, 2, NULL, NULL, NULL, 17290000, 'Chờ xử lý', '2025-05-16 06:47:23', NULL, ''),
(54, 3, NULL, NULL, NULL, 14030000, 'Đã thanh toán', '2025-05-16 09:06:23', NULL, ''),
(55, 1, NULL, NULL, NULL, 16530000, 'Chờ xử lý', '2025-05-22 09:40:41', NULL, ''),
(56, 1, NULL, NULL, NULL, 28030000, 'Chờ xử lý', '2025-05-22 09:42:30', NULL, ''),
(57, 2, NULL, NULL, NULL, 14000000, 'Chờ xử lý', '2025-05-23 02:08:53', NULL, 'nope'),
(58, 2, NULL, NULL, NULL, 14990000, 'Đã thanh toán', '2025-05-23 02:10:18', NULL, 'npe'),
(59, 2, NULL, NULL, NULL, 6500000, 'Chưa thanh toán', '2025-05-23 02:18:49', NULL, 'nopeeee'),
(60, 2, NULL, NULL, NULL, 20380000, 'Chờ xử lý', '2025-05-29 17:20:34', NULL, ''),
(61, 2, NULL, NULL, NULL, 4920000, 'Chờ xử lý', '2025-05-29 17:22:02', NULL, ''),
(62, 2, NULL, NULL, NULL, 4890000, 'Đã thanh toán', '2025-05-29 17:22:41', NULL, ''),
(64, 2, NULL, NULL, NULL, 40000000, 'Đã thanh toán', '2025-05-30 04:23:00', NULL, ''),
(65, 2, NULL, NULL, NULL, 10690000, 'Chờ xử lý', '2025-05-30 04:24:15', NULL, ''),
(66, 2, NULL, NULL, NULL, 18530000, 'Đã thanh toán', '2025-05-30 05:52:45', NULL, ''),
(67, 2, NULL, NULL, NULL, 10690000, 'Chờ xử lý', '2025-05-30 06:01:42', NULL, ''),
(68, 2, NULL, NULL, NULL, 17290000, 'Chờ xử lý', '2025-05-30 06:06:39', NULL, ''),
(69, 2, NULL, NULL, NULL, 21900000, 'Đã thanh toán', '2025-05-30 07:25:43', NULL, ''),
(70, 2, NULL, NULL, NULL, 40940000, 'Đã thanh toán', '2025-06-02 16:05:17', NULL, ''),
(71, 2, NULL, NULL, NULL, 14000000, 'Chờ xử lý', '2025-06-03 08:00:12', NULL, ''),
(72, 3, 'test', '0394021004', 'tung123@gmail.com', 150000, 'Chờ xử lý', '2025-07-02 00:00:00', '14:46:27', ''),
(73, 3, 'test', '0394021004', 'tung123@gmail.com', 150000, 'Chờ xử lý', '2025-07-02 00:00:00', '05:04:54', ''),
(74, 3, 'test', '0394021004', 'tung123@gmail.com', 150000, 'Chờ xử lý', '2025-07-01 00:00:00', '17:08:39', ''),
(75, 2, 'Admin', '0394021004', 'tung123@gmail.com', 150000, 'Chờ xử lý', '2025-07-03 00:00:00', '04:20:00', ''),
(76, 2, 'Admin', '0394021004', 'tung123@gmail.com', 500000, 'Chờ xử lý', '2025-07-02 00:00:00', '21:25:00', ''),
(77, 2, 'Admin', '0394021004', 'tung123@gmail.com', 500000, 'Chờ xử lý', '2025-07-03 00:00:00', '15:37:00', ''),
(78, 2, 'Admin', '0394021004', 'tung123@gmail.com', 500000, 'Chưa thanh toán', '2025-07-04 00:00:00', '17:39:00', ''),
(79, 2, 'Admin', '0394021004', 'kobikok123@gmail.com', 500000, 'Chưa thanh toán', '2025-07-05 00:00:00', '10:42:00', ''),
(80, 2, 'Admin', '0904242518', 'admin@gmail.com', 500000, 'Chờ xử lý', '2025-07-05 00:00:00', '06:45:00', ''),
(81, 2, 'Admin', '0394021004', 'tung123@gmail.com', 150000, 'Chờ xử lý', '2025-07-03 00:00:00', '04:50:00', ''),
(82, 2, 'Admin', '0394021004', 'tung123@gmail.com', 150000, 'Chờ xử lý', '2025-07-02 00:00:00', '17:53:00', ''),
(83, 2, 'Admin', '0394021004', 'tung123@gmail.com', 150000, 'Chờ xử lý', '2025-07-04 00:00:00', '03:25:00', ''),
(84, 2, 'Admin', '0394021004', 'tung123@gmail.com', 150000, 'Chờ xử lý', '2025-07-10 00:00:00', '04:37:00', ''),
(85, 2, 'Admin', '0394021004', 'tung123@gmail.com', 150000, 'Chưa thanh toán', '2025-07-10 00:00:00', '01:12:00', ''),
(92, 2, 'Admin', '0394021004', 'kobikok123@gmail.com', 150000, 'Đã thanh toán', '2025-07-12 00:00:00', '03:39:00', ''),
(93, 2, 'Admin', '0394021004', 'kobikok123@gmail.com', 300000, 'Đã thanh toán', '2025-07-15 00:00:00', '17:36:00', ''),
(94, 2, 'Admin', '0394021004', 'kobikok123@gmail.com', 300000, 'Đã thanh toán', '2025-07-23 00:00:00', '09:36:00', ''),
(95, 2, 'Admin', '0394021004', 'kobikok123@gmail.com', 1000000, 'Đã thanh toán', '2025-07-17 00:00:00', '01:45:00', ''),
(96, 2, 'Admin', '0394021004', 'kobikok123@gmail.com', 150000, 'Chờ xử lý', '2025-07-12 00:00:00', '13:29:00', ''),
(97, 15, 'T', '0000000001', 'tung@gmail.com', 1000000, 'Chưa thanh toán', '2025-07-11 00:00:00', '00:09:00', ''),
(98, 15, 'T', '0000000001', 'tung@gmail.com', 500000, 'Chưa thanh toán', '2025-07-12 00:00:00', '00:16:00', ''),
(99, 2, 'Admin', '0123456789', 'sinle9105@gmail.com', 150000, 'Chờ xử lý', '2025-07-23 00:00:00', '14:13:00', ''),
(100, 2, 'Admin', '0123456789', 'sinle9105@gmail.com', 400000, 'Chờ xử lý', '2025-07-17 00:00:00', '10:26:00', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `footer`
--

CREATE TABLE `footer` (
  `id` int NOT NULL,
  `noi_dung` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `tac_gia` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ban_quyen` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dia_diem` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ten_lop` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ten_truong` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trang_thai` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `footer`
--

INSERT INTO `footer` (`id`, `noi_dung`, `tac_gia`, `ban_quyen`, `dia_diem`, `ten_lop`, `ten_truong`, `trang_thai`, `created_at`) VALUES
(1, 'Nhóm 11: Đề tài xây dựng web bán linh kiện máy tính', 'Nhóm 11', '© 2025 Nhóm 11', 'Thủ đô Hà Nội, Việt Nam', 'DHMT16A2HN', 'Đại học Kinh tế Kỹ thuật Công nghiệp - UNETI', 1, '2025-06-02 15:47:40');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoa_don`
--

CREATE TABLE `hoa_don` (
  `id` int NOT NULL,
  `ma_don_hang` int NOT NULL,
  `ten_nguoi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ten_san_pham` text COLLATE utf8mb4_unicode_ci,
  `tong_tien` int NOT NULL,
  `dia_chi` text COLLATE utf8mb4_unicode_ci,
  `phuong_thuc_thanh_toan` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ngay_tao` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `hoa_don`
--

INSERT INTO `hoa_don` (`id`, `ma_don_hang`, `ten_nguoi`, `ten_san_pham`, `tong_tien`, `dia_chi`, `phuong_thuc_thanh_toan`, `ngay_tao`) VALUES
(1, 57, 'Admin', 'Intel Core i9-13900K (x1)', 14000000, 'HCM, Phường 2, Quận 1, TP HCM', 'cod', '2025-05-23 09:08:53'),
(2, 58, 'Admin', 'Intel Core i9-14900K (x1)', 14990000, 'HCM, Phường 5, Quận 2, TP HCM', 'vnpay', '2025-05-23 09:10:18'),
(3, 59, 'Admin', 'MSI MPG B650 Tomahawk WiFi (x1)', 6500000, 'HCM, Phường 2, Quận 4, TP HCM', 'cod', '2025-05-23 09:18:49'),
(4, 60, 'Admin', 'AMD Ryzen 7 5700X (x1), AMD Ryzen 7 9800X3D (x1)', 20380000, 'HCM, Phường 5, Quận 2, TP HCM', 'cod', '2025-05-30 00:20:34'),
(5, 61, 'Admin', 'Gigabyte B760M Gaming Plus Wifi D4 (x1)', 4920000, 'Lấy tại cửa hàng', 'vnpay', '2025-05-30 00:22:02'),
(6, 62, 'Admin', 'Gigabyte B760M Gaming Plus Wifi D4 (x1)', 4890000, 'HCM, Phường 2, Quận 2, TP HCM', 'vnpay', '2025-05-30 00:22:41'),
(8, 64, 'Admin', 'NVIDIA GeForce RTX 4090 (x1)', 40000000, 'nhà số 1, Phường Phúc Đồng, Quận Long Biên, Thành phố Hà Nội', 'vnpay', '2025-05-30 11:23:00'),
(9, 65, 'Admin', 'CPU Intel Core i7 14700K (x1)', 10690000, 'HCM, Xã Quảng Lâm, Huyện Mường Nhé, Tỉnh Điện Biên', 'cod', '2025-05-30 11:24:15'),
(10, 66, 'Admin', 'AMD Ryzen 9 9950X (x1)', 18530000, 'Lấy tại cửa hàng', 'vnpay', '2025-05-30 12:52:45'),
(11, 67, 'Admin', 'CPU Intel Core i7 14700K (x1)', 10690000, 'HCM, Xã Đào Xá, Huyện Thanh Thuỷ, Tỉnh Phú Thọ', 'cod', '2025-05-30 13:01:42'),
(12, 68, 'Admin', 'CPU Intel Core Ultra 9 285K (x1)', 17290000, 'HCM, Xã Bắc Hồng, Huyện Đông Anh, Thành phố Hà Nội', 'cod', '2025-05-30 13:06:39'),
(13, 69, 'Admin', 'Gigabyte RTX 4070 GAMING OC 12GB GDDR6X (x1)', 21900000, 'HCM, Phường Kim Mã, Quận Ba Đình, Thành phố Hà Nội', 'vnpay', '2025-05-30 14:25:44'),
(14, 70, 'Admin', 'Intel Core i9-14900K (x1), MSI PRO Z790-S WIFI DDR5 (x5)', 40940000, 'HCM, Xã Hương Lâm, Huyện Hiệp Hòa, Tỉnh Bắc Giang', 'cod', '2025-06-02 23:05:17'),
(15, 71, 'Admin', 'Intel Core i9-13900K (x1)', 14000000, '1, Phường Lĩnh Nam, Quận Hoàng Mai, Thành phố Hà Nội', 'cod', '2025-06-03 15:00:12'),
(16, 72, 'test', 'Gội đầu dưỡng sinh #3 (x1)', 150000, NULL, 'cod', '2025-07-02 21:46:27'),
(17, 73, 'test', 'Gội đầu dưỡng sinh #4 (x1)', 150000, NULL, 'cod', '2025-07-02 22:02:55'),
(18, 74, 'test', 'Gội đầu dưỡng sinh #2 (x1)', 150000, NULL, 'cod', '2025-07-02 22:08:42'),
(19, 75, 'Admin', 'Gội đầu dưỡng sinh #4 (x1)', 150000, NULL, 'cod', '2025-07-02 22:18:40'),
(20, 76, 'Admin', 'Liệu trình trắng da #1 (x1)', 500000, NULL, 'cod', '2025-07-02 22:27:11'),
(21, 77, 'Admin', 'Liệu trình trắng da #1 (x1)', 500000, NULL, 'cod', '2025-07-02 22:36:03'),
(22, 78, 'Admin', 'Liệu trình trắng da #1 (x1)', 500000, NULL, 'cod', '2025-07-02 22:37:26'),
(23, 79, 'Admin', 'Liệu trình trắng da #1 (x1)', 500000, NULL, 'cod', '2025-07-02 22:38:22'),
(24, 80, 'Admin', 'Liệu trình trắng da #1 (x1)', 500000, NULL, 'cod', '2025-07-02 22:45:25'),
(25, 81, 'Admin', 'Gội đầu dưỡng sinh #4 (x1)', 150000, NULL, 'cod', '2025-07-02 22:50:00'),
(26, 82, 'Admin', 'Gội đầu dưỡng sinh #4 (x1)', 150000, NULL, 'cod', '2025-07-02 22:53:05'),
(27, 83, 'Admin', 'Gội đầu dưỡng sinh #3 (x1)', 150000, NULL, 'cod', '2025-07-02 23:26:03'),
(28, 84, 'Admin', 'Gội đầu dưỡng sinh #4 (x1)', 150000, NULL, 'vnpay', '2025-07-02 23:34:05'),
(29, 85, 'Admin', 'Gội đầu dưỡng sinh #2 (x1)', 150000, NULL, 'cod', '2025-07-03 08:10:43'),
(36, 92, 'Admin', 'Gội đầu dưỡng sinh #4 (x1)', 150000, NULL, 'cod', '2025-07-03 10:34:22'),
(37, 93, 'Admin', 'Gội đầu dưỡng sinh #3 (x2)', 300000, NULL, 'cod', '2025-07-03 10:36:04'),
(38, 94, 'Admin', 'Gội đầu dưỡng sinh #3 (x2)', 300000, NULL, 'cod', '2025-07-03 10:36:26'),
(39, 95, 'Admin', 'Liệu trình trắng da #1 (x2)', 1000000, NULL, 'cod', '2025-07-03 10:44:23'),
(40, 96, 'Admin', 'Gội đầu dưỡng sinh #3 (x1)', 150000, NULL, 'cod', '2025-07-03 11:25:50'),
(41, 97, 'T', 'Liệu trình trắng da #5 (x2)', 1000000, NULL, 'cod', '2025-07-03 12:08:29'),
(42, 98, 'T', 'Liệu trình trắng da #2 (x1)', 500000, NULL, 'cod', '2025-07-03 12:15:48'),
(43, 99, 'Admin', 'Gội đầu dưỡng sinh #2 (x1)', 150000, NULL, 'cod', '2025-07-06 02:10:20'),
(44, 100, 'Admin', 'Liệu trình trị mụn #1 (x1)', 400000, NULL, 'cod', '2025-07-06 10:23:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lien_he`
--

CREATE TABLE `lien_he` (
  `id` int NOT NULL,
  `ten` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sdt` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `noi_dung` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `thoi_gian_gui` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `lien_he`
--

INSERT INTO `lien_he` (`id`, `ten`, `email`, `sdt`, `noi_dung`, `thoi_gian_gui`) VALUES
(1, 'sinh', 'unkown@gmail.com', '7878987909', 'hello', '2025-05-22 15:16:36'),
(2, 'sinh', 'unkown@gmail.com', '7878987909', 'hello', '2025-05-22 15:18:05');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phan_hoi_review`
--

CREATE TABLE `phan_hoi_review` (
  `id` int NOT NULL,
  `id_danh_gia` int NOT NULL,
  `noi_dung_phan_hoi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ngay` date NOT NULL,
  `ten_nguoi_tra_loi` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `phan_hoi_review`
--

INSERT INTO `phan_hoi_review` (`id`, `id_danh_gia`, `noi_dung_phan_hoi`, `ngay`, `ten_nguoi_tra_loi`) VALUES
(8, 1, '?', '2025-04-26', 'admin'),
(10, 3, 'hi there', '2025-04-26', 'admin'),
(11, 2, 'dô', '2025-04-27', 'test12345'),
(12, 4, 'hi there', '2025-04-28', 'admin'),
(13, 4, 'ok hi', '2025-04-28', 'admin'),
(14, 5, 'seo', '2025-05-06', 'admin'),
(15, 7, 'ok too\\n', '2025-05-16', 'Admin'),
(16, 8, 'wooo', '2025-05-16', 'Admin'),
(17, 9, 'what', '2025-05-16', 'Admin'),
(18, 9, 'amzing good job', '2025-05-23', 'unkown'),
(19, 4, 'ok thanks', '2025-05-29', 'Admin'),
(20, 10, 'seo', '2025-05-30', 'Admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thanh_toan`
--

CREATE TABLE `thanh_toan` (
  `id` int NOT NULL,
  `ma_don_hang` int NOT NULL,
  `phuong_thuc_thanh_toan` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tong_so_tien` int DEFAULT NULL,
  `trang_thai_thanh_toan` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'Chưa thanh toán',
  `thoi_gian_thanh_toan` datetime DEFAULT NULL,
  `thoi_gian_cap_nhat` datetime DEFAULT NULL,
  `ma_giao_dich` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lich_hen` datetime DEFAULT NULL COMMENT 'Thời gian lịch hẹn'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `thanh_toan`
--

INSERT INTO `thanh_toan` (`id`, `ma_don_hang`, `phuong_thuc_thanh_toan`, `tong_so_tien`, `trang_thai_thanh_toan`, `thoi_gian_thanh_toan`, `thoi_gian_cap_nhat`, `ma_giao_dich`, `lich_hen`) VALUES
(19, 19, 'cod', 4030000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(21, 21, 'vnpay', 3430000, 'Đã thanh toán', '2025-04-15 14:25:10', '2025-04-15 14:25:10', '14932189', NULL),
(22, 22, 'vnpay', 60030000, 'Đã thanh toán', '2025-04-29 14:40:47', '2025-04-29 14:40:47', '14932220', NULL),
(24, 24, 'cod', 6500000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(25, 25, 'cod', 26000000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(26, 26, 'vnpay', 80000000, 'Đã thanh toán', '2025-04-30 16:55:44', '2025-04-30 16:55:44', '14932519', NULL),
(27, 27, 'vnpay', 16530000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(28, 28, 'cod', 4530000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(29, 29, 'cod', 66930000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(30, 30, 'vnpay', 165030000, 'Đã thanh toán', '2025-05-06 21:03:15', '2025-05-06 21:03:15', '14942214', NULL),
(31, 31, 'cod', 7030000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(32, 32, 'cod', 42030000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(33, 33, 'cod', 42030000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(34, 34, 'cod', 42000000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(51, 51, 'vnpay', 66930000, 'Đã thanh toán', '2025-05-10 20:04:39', '2025-05-10 20:04:39', '14949411', NULL),
(52, 52, 'cod', 37030000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(53, 53, 'vnpay', 17290000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(54, 54, 'cod', 14030000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(55, 55, 'cod', 16530000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(56, 56, 'cod', 28030000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(57, 57, 'cod', 14000000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(58, 58, 'vnpay', 14990000, 'Đã thanh toán', '2025-05-23 09:10:44', '2025-05-23 09:10:44', '14974486', NULL),
(59, 59, 'cod', 6500000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(60, 60, 'cod', 20380000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(61, 61, 'vnpay', 4920000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(62, 62, 'vnpay', 4890000, 'Đã thanh toán', '2025-05-30 00:24:07', '2025-05-30 00:24:07', '14988853', NULL),
(64, 64, 'vnpay', 40000000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(66, 66, 'vnpay', 18530000, 'Đã thanh toán', '2025-05-30 12:53:31', '2025-05-30 12:53:31', '14989557', NULL),
(67, 67, 'cod', 10690000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(68, 68, 'cod', 17290000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(69, 69, 'vnpay', 21900000, 'Đã thanh toán', '2025-05-30 14:26:07', '2025-05-30 14:26:07', '14989745', NULL),
(70, 70, 'cod', 40940000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(71, 71, 'cod', 14000000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(72, 72, 'cod', 150000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(73, 73, 'cod', 150000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(74, 74, 'cod', 150000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(75, 75, 'cod', 150000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(76, 76, 'cod', 500000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(77, 77, 'cod', 500000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(78, 78, 'cod', 500000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(79, 79, 'cod', 500000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(80, 80, 'cod', 500000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(81, 81, 'cod', 150000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(82, 82, 'cod', 150000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(83, 83, 'cod', 150000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(84, 84, 'vnpay', 150000, 'Chưa thanh toán', NULL, NULL, NULL, NULL),
(86, 92, 'cod', 150000, 'Chưa thanh toán', '2025-07-03 10:34:22', '2025-07-03 10:34:22', '', '2025-07-12 03:39:00'),
(87, 93, 'cod', 300000, 'Chưa thanh toán', '2025-07-03 10:36:04', '2025-07-03 10:36:04', '', '2025-07-15 17:36:00'),
(88, 94, 'cod', 300000, 'Chưa thanh toán', '2025-07-03 10:36:26', '2025-07-03 10:36:26', '', '2025-07-23 09:36:00'),
(89, 95, 'cod', 1000000, 'Chưa thanh toán', '2025-07-03 10:44:23', '2025-07-03 10:44:23', '', '2025-07-17 01:45:00'),
(90, 96, 'cod', 150000, 'Đã thanh toán', '2025-07-03 11:25:50', '2025-07-03 11:25:50', '', '2025-07-12 13:29:00'),
(91, 97, 'cod', 1000000, 'Đã thanh toán', '2025-07-03 12:08:29', '2025-07-03 12:08:29', '', '2025-07-11 00:09:00'),
(92, 98, 'cod', 500000, 'Đã thanh toán', '2025-07-03 12:15:48', '2025-07-03 12:15:48', '', '2025-07-12 00:16:00'),
(93, 99, 'cod', 150000, 'Chưa thanh toán', '2025-07-06 02:10:20', '2025-07-06 02:10:20', '', '2025-07-23 14:13:00'),
(94, 100, 'cod', 400000, 'Chưa thanh toán', '2025-07-06 10:23:24', '2025-07-06 10:23:24', '', '2025-07-17 10:26:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `top_menu`
--

CREATE TABLE `top_menu` (
  `id` int NOT NULL,
  `ten` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thu_tu` int DEFAULT '0',
  `trang_thai` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `top_menu`
--

INSERT INTO `top_menu` (`id`, `ten`, `url`, `thu_tu`, `trang_thai`, `created_at`) VALUES
(1, 'Liên hệ', '/contact', 1, 1, '2025-06-02 15:18:12'),
(2, 'Nhà phát triển', '/developer', 2, 1, '2025-06-02 15:18:12'),
(3, 'Tư vấn', '/consult', 3, 1, '2025-06-02 15:18:12'),
(4, 'Tin tức', '/blog', 4, 1, '2025-06-02 15:18:12'),
(5, 'Dịch vụ', '/AllDichvu', 5, 1, '2025-06-02 15:36:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `yeu_thich`
--

CREATE TABLE `yeu_thich` (
  `id` int NOT NULL,
  `ma_nguoi_dung` int NOT NULL,
  `id_product` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ngay_them` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `dang_ky`
--
ALTER TABLE `dang_ky`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `danh_gia`
--
ALTER TABLE `danh_gia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_danh_gia_hoa_don` (`ma_don_hang`);

--
-- Chỉ mục cho bảng `don_dat_lich`
--
ALTER TABLE `don_dat_lich`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ma_nguoi_dung` (`ma_nguoi_dung`);

--
-- Chỉ mục cho bảng `footer`
--
ALTER TABLE `footer`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ma_don_hang` (`ma_don_hang`);

--
-- Chỉ mục cho bảng `lien_he`
--
ALTER TABLE `lien_he`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `phan_hoi_review`
--
ALTER TABLE `phan_hoi_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `phan_hoi_review_ibfk_1` (`id_danh_gia`);

--
-- Chỉ mục cho bảng `thanh_toan`
--
ALTER TABLE `thanh_toan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ma_don_hang` (`ma_don_hang`);

--
-- Chỉ mục cho bảng `top_menu`
--
ALTER TABLE `top_menu`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `yeu_thich`
--
ALTER TABLE `yeu_thich`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ma_nguoi_dung` (`ma_nguoi_dung`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `dang_ky`
--
ALTER TABLE `dang_ky`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `danh_gia`
--
ALTER TABLE `danh_gia`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `don_dat_lich`
--
ALTER TABLE `don_dat_lich`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT cho bảng `footer`
--
ALTER TABLE `footer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `hoa_don`
--
ALTER TABLE `hoa_don`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT cho bảng `lien_he`
--
ALTER TABLE `lien_he`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `phan_hoi_review`
--
ALTER TABLE `phan_hoi_review`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `thanh_toan`
--
ALTER TABLE `thanh_toan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT cho bảng `top_menu`
--
ALTER TABLE `top_menu`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `yeu_thich`
--
ALTER TABLE `yeu_thich`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ràng buộc đối với các bảng kết xuất
--

--
-- Ràng buộc cho bảng `danh_gia`
--
ALTER TABLE `danh_gia`
  ADD CONSTRAINT `fk_danh_gia_hoa_don` FOREIGN KEY (`ma_don_hang`) REFERENCES `hoa_don` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `don_dat_lich`
--
ALTER TABLE `don_dat_lich`
  ADD CONSTRAINT `don_dat_lich_ibfk_1` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `dang_ky` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD CONSTRAINT `hoa_don_ibfk_1` FOREIGN KEY (`ma_don_hang`) REFERENCES `don_dat_lich` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `phan_hoi_review`
--
ALTER TABLE `phan_hoi_review`
  ADD CONSTRAINT `phan_hoi_review_ibfk_1` FOREIGN KEY (`id_danh_gia`) REFERENCES `danh_gia` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `thanh_toan`
--
ALTER TABLE `thanh_toan`
  ADD CONSTRAINT `thanh_toan_ibfk_1` FOREIGN KEY (`ma_don_hang`) REFERENCES `don_dat_lich` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `yeu_thich`
--
ALTER TABLE `yeu_thich`
  ADD CONSTRAINT `yeu_thich_ibfk_1` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `dang_ky` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
