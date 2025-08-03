<?php
header('Content-Type: application/json');

$filePath = '../src/page/funtion/Dich_vu_spa.json'; // đường dẫn chính xác

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Phương thức không hợp lệ']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['action']) || $data['action'] !== 'reduce' || !isset($data['items'])) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ']);
    exit;
}

if (!file_exists($filePath)) {
    echo json_encode(['success' => false, 'message' => 'Không tìm thấy file JSON dịch vụ']);
    exit;
}

$jsonContent = file_get_contents($filePath);
$services = json_decode($jsonContent, true);

if (!is_array($services)) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu JSON không hợp lệ']);
    exit;
}

$errors = [];

foreach ($data['items'] as $item) {
    $id = $item['id_san_pham'] ?? '';
    $soLuongTru = (int)($item['so_luong'] ?? 0);

    if ($id === '' || $soLuongTru <= 0) {
        $errors[] = "Thiếu thông tin sản phẩm hoặc số lượng không hợp lệ.";
        continue;
    }

    $found = false;
    foreach ($services as &$service) {
        if ($service['id'] === $id) {
            $found = true;
            if (!isset($service['so_luong'])) {
                $errors[] = "Sản phẩm '$id' không có thuộc tính so_luong.";
                break;
            }

            if ($service['so_luong'] < $soLuongTru) {
                $errors[] = "Sản phẩm '$id' không đủ số lượng (còn {$service['so_luong']}, yêu cầu $soLuongTru).";
            } else {
                $service['so_luong'] -= $soLuongTru;
            }

            break;
        }
    }

    if (!$found) {
        $errors[] = "Không tìm thấy sản phẩm '$id' trong file JSON.";
    }
}

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode('; ', $errors)]);
    exit;
}

// Ghi lại file
file_put_contents($filePath, json_encode($services, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(['success' => true, 'message' => 'Cập nhật tồn kho thành công']);
