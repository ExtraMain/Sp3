<?php
$host = 'localhost';         // hoặc 127.0.0.1
$dbname = 'form'; 
$username = 'root';          // mặc định XAMPP dùng root
$password = '';              // mật khẩu rỗng nếu chưa đổi

$conn = new mysqli($host, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Đặt charset UTF-8 để tránh lỗi tiếng Việt
$conn->set_charset("utf8");
?>
