<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "form";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Kết nối thất bại"]);
    exit;
}

$order_id = isset($_GET['order_id']) ? intval($_GET['order_id']) : 0;

if ($order_id <= 0) {
    echo json_encode(["success" => false, "message" => "Thiếu mã đơn hàng"]);
    exit;
}

// Kiểm tra trạng thái đơn và thanh toán
$check_sql = "SELECT ddl.trang_thai, COALESCE(tt.trang_thai_thanh_toan, 'Chưa thanh toán') as trang_thai_thanh_toan
              FROM don_dat_lich ddl
              LEFT JOIN thanh_toan tt ON ddl.id = tt.ma_don_hang
              WHERE ddl.id = ? LIMIT 1";

$stmt = $conn->prepare($check_sql);
$stmt->execute([$order_id]);
$order = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$order) {
    echo json_encode(["success" => false, "message" => "Không tìm thấy đơn hàng"]);
    exit;
}

// Chuẩn hóa trạng thái
$order_status = strtolower(trim($order['trang_thai']));
$payment_status = strtolower(trim($order['trang_thai_thanh_toan']));

// Log trạng thái thực tế (nếu muốn kiểm tra dữ liệu thực tế)
// file_put_contents('log_huy_don.txt', "ID: $order_id | Status: $order_status | Payment: $payment_status\n", FILE_APPEND);

// Kiểm tra điều kiện hủy
if ($order_status !== 'chờ xử lý' || $payment_status === 'đã thanh toán') {
    echo json_encode(["success" => false, "message" => "Đơn không thể hủy"]);
    exit;
}

// Tiến hành hủy đơn (cập nhật trạng thái thành 'Đã hủy')
$update_sql = "UPDATE don_dat_lich SET trang_thai = 'Đã hủy' WHERE id = ?";
$stmt = $conn->prepare($update_sql);

if ($stmt->execute([$order_id])) {
    echo json_encode(["success" => true, "message" => "Đã hủy đơn thành công"]);
} else {
    echo json_encode(["success" => false, "message" => "Hủy đơn thất bại"]);
}

$conn = null;
?>
