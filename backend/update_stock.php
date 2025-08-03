<?php
header('Content-Type: application/json');

$filePath = '../src/page/funtion/Dich_vu_spa.json';

// Chỉ chấp nhận phương thức POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Phương thức không hợp lệ']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['items']) || !is_array($data['items'])) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ']);
    exit;
}

// Đọc dữ liệu JSON
if (!file_exists($filePath)) {
    echo json_encode(['success' => false, 'message' => 'Không tìm thấy file JSON']);
    exit;
}

$services = json_decode(file_get_contents($filePath), true);

if (!is_array($services)) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu JSON không hợp lệ']);
    exit;
}

// Xử lý từng sản phẩm
$errors = [];

foreach ($data['items'] as $item) {
    $id = $item['id_san_pham'] ?? '';
    $soLuongTru = (int)($item['so_luong'] ?? 0);

    if ($id === '' || $soLuongTru <= 0) {
        $errors[] = "Thiếu ID hoặc số lượng không hợp lệ.";
        continue;
    }

    $found = false;

    foreach ($services as &$service) {
        if ($service['id'] === $id) {
            $found = true;
            if (!isset($service['so_luong'])) {
                $errors[] = "Sản phẩm '$id' không có tồn kho.";
                break;
            }

            if ($service['so_luong'] < $soLuongTru) {
                $errors[] = "Sản phẩm '$id' không đủ tồn kho.";
            } else {
                $service['so_luong'] -= $soLuongTru;
            }

            break;
        }
    }

    if (!$found) {
        $errors[] = "Không tìm thấy sản phẩm '$id' trong danh sách.";
    }
}

// Nếu có lỗi -> thông báo
if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode('; ', $errors)]);
    exit;
}

// Lưu lại file JSON
if (file_put_contents($filePath, json_encode($services, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    echo json_encode(['success' => true, 'message' => 'Cập nhật tồn kho thành công.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Không thể ghi file JSON.']);
}
