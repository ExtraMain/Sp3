<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
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
    echo json_encode(["success" => false, "message" => "Connection failed: " . $e->getMessage()]);
    exit;
}

$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

// Lấy tất cả đơn hàng
function getOrderHistory($conn, $user_id) {
    $query = "SELECT 
                id as ma_don_hang, 
                ten_khach_hang,
                so_dien_thoai,
                email,
                tong_tien, 
                trang_thai, 
                ngay_dat, 
                gio_dat,
                ghi_chu
              FROM don_dat_lich
              WHERE ma_nguoi_dung = ?
              ORDER BY ngay_dat DESC";

    $stmt = $conn->prepare($query);
    $stmt->execute([$user_id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Lấy chi tiết một đơn hàng
function getOrderDetail($conn, $user_id, $order_id) {
    $query = "SELECT 
                id as ma_don_hang, 
                ten_khach_hang,
                so_dien_thoai,
                email,
                tong_tien, 
                trang_thai, 
                ngay_dat, 
                gio_dat,
                ghi_chu
              FROM don_dat_lich
              WHERE id = ? AND ma_nguoi_dung = ?";

    $stmt = $conn->prepare($query);
    $stmt->execute([$order_id, $user_id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// Xử lý yêu cầu
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['order_id'])) {
            $order_id = intval($_GET['order_id']);
            $order = getOrderDetail($conn, $user_id, $order_id);
            if ($order) {
                http_response_code(200);
                echo json_encode(["data" => $order]);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Không tìm thấy đơn hàng"]);
            }
        } else {
            $orders = getOrderHistory($conn, $user_id);
            http_response_code(200);
            echo json_encode(["data" => $orders]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Phương thức không được hỗ trợ"]);
        break;
}

$conn = null;
?>
