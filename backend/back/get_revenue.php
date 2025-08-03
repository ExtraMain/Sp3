<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require './connect.php';

$month = isset($_GET['month']) ? intval($_GET['month']) : date('m');
$year = isset($_GET['year']) ? intval($_GET['year']) : date('Y');

$sql = "SELECT 
            DATE(thoi_gian_thanh_toan) AS ngay, 
            SUM(tong_so_tien) AS tong_doanh_thu
        FROM thanh_toan
        WHERE trang_thai_thanh_toan = 'Đã thanh toán'
          AND MONTH(thoi_gian_thanh_toan) = ?
          AND YEAR(thoi_gian_thanh_toan) = ?
        GROUP BY ngay
        ORDER BY ngay DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $month, $year);
$stmt->execute();
$result = $stmt->get_result();

$revenues = [];
while ($row = $result->fetch_assoc()) {
    $row['tong_doanh_thu'] = (float)$row['tong_doanh_thu'];
    $revenues[] = $row;
}

echo json_encode($revenues, JSON_UNESCAPED_UNICODE);
?>
