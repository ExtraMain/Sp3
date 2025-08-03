<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require './connect.php';

// Nhận tham số tháng/năm từ URL
$month = isset($_GET['month']) ? intval($_GET['month']) : 0;
$year  = isset($_GET['year']) ? intval($_GET['year']) : date('Y');

// Xây dựng điều kiện WHERE
$conditions = [];

if ($year > 0) {
    $conditions[] = "YEAR(ngay) = $year";
}

if ($month > 0) {
    $conditions[] = "MONTH(ngay) = $month";
}

$whereClause = "";
if (count($conditions) > 0) {
    $whereClause = " WHERE " . implode(" AND ", $conditions);
}

// Xây dựng SQL đầy đủ
$sql = "SELECT 
            DATE(ngay) AS ngay, 
            COUNT(*) AS so_luot_danh_gia
        FROM danh_gia
        $whereClause
        GROUP BY DATE(ngay)
        ORDER BY ngay ASC";


// Thực thi SQL
$result = mysqli_query($conn, $sql);

$reviews = [];
while ($row = mysqli_fetch_assoc($result)) {
    $row['so_luot_danh_gia'] = (int)$row['so_luot_danh_gia'];
    $reviews[] = $row;
}

echo json_encode($reviews, JSON_UNESCAPED_UNICODE);
?>
