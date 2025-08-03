<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require './connect.php';

// Xử lý GET: Lấy danh sách thanh toán
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT 
                id,
                ma_don_hang,
                phuong_thuc_thanh_toan,
                tong_so_tien,
                trang_thai_thanh_toan,
                thoi_gian_thanh_toan,
                ma_giao_dich,
                lich_hen
            FROM thanh_toan
            ORDER BY thoi_gian_thanh_toan DESC";

    $result = mysqli_query($conn, $sql);

    $payments = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $row['tong_so_tien'] = (float)$row['tong_so_tien'];
        $row['thoi_gian_thanh_toan'] = $row['thoi_gian_thanh_toan'] ? date('c', strtotime($row['thoi_gian_thanh_toan'])) : null;
        $row['lich_hen'] = $row['lich_hen'] ? date('c', strtotime($row['lich_hen'])) : null;
        $payments[] = $row;
    }

    echo json_encode($payments, JSON_UNESCAPED_UNICODE);
    exit;
}

// Xử lý POST: Cập nhật trạng thái thanh toán
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['action'])) {
    echo json_encode(["error" => "Thiếu dữ liệu hoặc action"]);
    exit;
}

switch ($data['action']) {
    case 'update_status':
        $id = intval($data['id']);
        $status = $data['status'];

        $sql = "UPDATE thanh_toan SET trang_thai_thanh_toan = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $status, $id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Không cập nhật được trạng thái"]);
        }
        break;

    default:
        echo json_encode(["error" => "Action không hợp lệ"]);
}
?>
