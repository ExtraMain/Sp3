<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require './connect.php';

$sql = "SELECT 
            DATE_FORMAT(thoi_gian_thanh_toan, '%Y-%m') AS thang,
            SUM(tong_so_tien) AS tong_doanh_thu
        FROM thanh_toan
        WHERE trang_thai_thanh_toan = 'Đã thanh toán'
        GROUP BY thang
        ORDER BY thang ASC";

$result = mysqli_query($conn, $sql);

$revenues = [];
while ($row = mysqli_fetch_assoc($result)) {
    $row['tong_doanh_thu'] = (float)$row['tong_doanh_thu'];
    $revenues[] = $row;
}

echo json_encode($revenues, JSON_UNESCAPED_UNICODE);
?>
