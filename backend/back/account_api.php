<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require './connect.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sql = "SELECT id, `user`, email, phone, role,
            CASE WHEN is_active = 1 THEN 'active' ELSE 'disabled' END AS status
            FROM dang_ky";

    $result = mysqli_query($conn, $sql);

    $accounts = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $accounts[] = $row;
    }

    echo json_encode($accounts, JSON_UNESCAPED_UNICODE);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['action'])) {
    echo json_encode(["error" => "Thiếu dữ liệu hoặc action"]);
    exit;
}

$action = $data['action'];

switch ($action) {
    case 'add':
        $user = $data['user'] ?? '';
        $email = $data['email'] ?? '';
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
        $phone = $data['phone'] ?? '';
        $role = $data['role'] ?? 'user';

        // Kiểm tra thiếu thông tin
        if (!$user || !$email || !$data['password']) {
            echo json_encode(["error" => "Thiếu tên, email hoặc mật khẩu."]);
            exit;
        }

        // Kiểm tra email đã tồn tại chưa
        $checkEmailSql = "SELECT id FROM dang_ky WHERE email = ?";
        $checkEmailStmt = $conn->prepare($checkEmailSql);
        $checkEmailStmt->bind_param("s", $email);
        $checkEmailStmt->execute();
        $checkEmailStmt->store_result();

        if ($checkEmailStmt->num_rows > 0) {
            echo json_encode(["error" => "Email đã tồn tại."]);
            exit;
        }

        // Kiểm tra số điện thoại đã tồn tại chưa
        $checkPhoneSql = "SELECT id FROM dang_ky WHERE phone = ?";
        $checkPhoneStmt = $conn->prepare($checkPhoneSql);
        $checkPhoneStmt->bind_param("s", $phone);
        $checkPhoneStmt->execute();
        $checkPhoneStmt->store_result();

        if ($checkPhoneStmt->num_rows > 0) {
            echo json_encode(["error" => "Số điện thoại đã tồn tại."]);
            exit;
        }

        // Thực hiện thêm tài khoản
        $sql = "INSERT INTO dang_ky (`user`, email, `pass`, phone, role, is_active)
                VALUES (?, ?, ?, ?, ?, 1)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", $user, $email, $password, $phone, $role);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Lỗi khi thêm tài khoản: " . $stmt->error]);
        }
        break;

    case 'update_status':
        $id = intval($data['id']);
        $is_active = ($data['status'] === 'disabled') ? 0 : 1;
        $sql = "UPDATE dang_ky SET is_active = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $is_active, $id);

        echo json_encode($stmt->execute() ? ["success" => true] : ["error" => $stmt->error]);
        break;

    case 'update':
        $id = intval($data['id']);
        $role = $data['role'] ?? 'user';
        $sql = "UPDATE dang_ky SET role = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $role, $id);

        echo json_encode($stmt->execute() ? ["success" => true] : ["error" => $stmt->error]);
        break;

    case 'delete':
        $id = intval($data['id']);
        $sql = "DELETE FROM dang_ky WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);

        echo json_encode($stmt->execute() ? ["success" => true] : ["error" => $stmt->error]);
        break;

    default:
        echo json_encode(["error" => "Action không hợp lệ"]);
}
?>
