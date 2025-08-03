<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require './connect.php';

// Nhận tham số tháng/năm từ URL
$month = isset($_GET['month']) ? intval($_GET['month']) : 0;
$year = isset($_GET['year']) ? intval($_GET['year']) : 0;

$sql = "SELECT 
            id,
            id_product,
            ten_nguoi_dung,
            so_sao,
            binh_luan,
            ngay,
            ma_don_hang
        FROM danh_gia";

$conditions = [];
if ($month > 0) {
    $conditions[] = "MONTH(ngay) = $month";
}
if ($year > 0) {
    $conditions[] = "YEAR(ngay) = $year";
}

if (count($conditions) > 0) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}

$sql .= " ORDER BY ngay DESC";

$result = mysqli_query($conn, $sql);

$reviews = [];
while ($row = mysqli_fetch_assoc($result)) {
    $row['so_sao'] = (int)$row['so_sao'];
    $row['ngay'] = $row['ngay'] ? date('c', strtotime($row['ngay'])) : null;
    $reviews[] = $row;
}

echo json_encode($reviews, JSON_UNESCAPED_UNICODE);
?>
