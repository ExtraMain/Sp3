<?php
// Cấu hình CSDL
$host = "localhost";
$user = "root";
$pass = "";
$db = "form";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Kết nối CSDL thất bại"]);
    exit();
}

// Set header JSON
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// DELETE yêu thích theo ID
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $deleteVars);
    $id = intval($deleteVars['id'] ?? 0);
    if ($id > 0) {
        $conn->query("DELETE FROM yeu_thich WHERE id = $id");
        echo json_encode(["message" => "Đã xóa yêu thích ID $id"]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "ID không hợp lệ"]);
    }
    exit();
}

// GET danh sách yêu thích
$sql = "SELECT * FROM yeu_thich ORDER BY ngay_them DESC";
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
