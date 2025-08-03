<?php
require './connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;
$trang_thai = $data['trang_thai'] ?? null;

if (!$id || !$trang_thai) {
    echo json_encode(["error" => "Thiếu dữ liệu"]);
    exit;
}

$trangThaiHopLe = ["Chờ xử lý", "Đã thanh toán", "Chưa thanh toán"];

if (!in_array($trang_thai, $trangThaiHopLe)) {
    echo json_encode(["error" => "Giá trị trạng thái không hợp lệ"]);
    exit;
}

$conn->begin_transaction();

try {
    // Cập nhật bảng don_dat_lich
    $sql1 = "UPDATE don_dat_lich SET trang_thai = ? WHERE id = ?";
    $stmt1 = $conn->prepare($sql1);
    $stmt1->bind_param("si", $trang_thai, $id);
    $stmt1->execute();

    // Cập nhật bảng thanh_toan (theo ma_don_hang)
    $sql2 = "UPDATE thanh_toan SET trang_thai = ? WHERE ma_don_hang = ?";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("si", $trang_thai, $id);
    $stmt2->execute();

    $conn->commit();
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["error" => $e->getMessage()]);
}
?>
