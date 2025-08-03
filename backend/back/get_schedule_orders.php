<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require './connect.php';

$sql = "SELECT * FROM don_dat_lich ORDER BY ngay_dat DESC";
$result = mysqli_query($conn, $sql); 

if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Lỗi truy vấn: " . mysqli_error($conn)]);
    exit;
}

while ($row = mysqli_fetch_assoc($result)) {
    $row['khach_hang'] = $row['khach_hang'] ?? 'Không rõ';
    $row['dien_thoai'] = $row['dien_thoai'] ?? 'Không rõ';
    $row['ngay_dat'] = $row['ngay_dat'] ? date('Y-m-d H:i:s', strtotime($row['ngay_dat'])) : 'Không rõ';
    $row['tong_tien'] = isset($row['tong_tien']) ? (float)$row['tong_tien'] : 0;

   $row['trang_thai'] = $row['trang_thai'] ?? 'Chưa thanh toán';

    $orders[] = $row;
}



echo json_encode($orders);
?>
