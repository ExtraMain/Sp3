<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

date_default_timezone_set("Asia/Ho_Chi_Minh");

// Kết nối CSDL
$conn = new mysqli("localhost", "root", "", "form");
if ($conn->connect_error) {
    echo json_encode([
        "status" => "error",
        "message" => "Lỗi kết nối CSDL: " . $conn->connect_error
    ]);
    exit;
}
$conn->set_charset("utf8mb4");

// Đọc dữ liệu JSON
$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

// Ghi log JSON vào file tạm
file_put_contents("debug_log.txt", "Raw Input:\n" . $rawInput . "\n\nParsed:\n" . print_r($data, true));

// Kiểm tra lỗi JSON
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode([
        "status" => "error",
        "message" => "JSON không hợp lệ: " . json_last_error_msg(),
        "raw" => $rawInput
    ]);
    exit;
}

// In dữ liệu nhận được
echo json_encode([
    "status" => "success",
    "message" => "Đã nhận JSON và kết nối CSDL thành công",
    "data" => $data
]);
?>
