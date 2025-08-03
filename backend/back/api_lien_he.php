<?php
// Cấu hình CSDL
$host = "localhost";
$user = "root";
$pass = "";
$db = "form";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Kết nối thất bại"]);
    exit();
}

// Set header cho API
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Nếu là DELETE request (xóa liên hệ)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $deleteVars);
    $id = intval($deleteVars['id'] ?? 0);
    if ($id > 0) {
        $conn->query("DELETE FROM lien_he WHERE id = $id");
        echo json_encode(["message" => "Đã xóa liên hệ ID $id"]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "ID không hợp lệ"]);
    }
    exit();
}

// Mặc định: GET - lấy danh sách liên hệ
$sql = "SELECT * FROM lien_he ORDER BY thoi_gian_gui DESC";
$result = $conn->query($sql);
$data = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>
