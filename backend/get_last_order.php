<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Kết nối database
$host = 'localhost';
$dbname = 'form';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Lỗi kết nối database: ' . $e->getMessage()
    ]);
    exit;
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = $_GET['userId'] ?? null;
    $productId = $_GET['productId'] ?? null;

    if (!$userId || !$productId) {
        echo json_encode([
            'success' => false,
            'message' => 'Thiếu thông tin userId hoặc productId'
        ]);
        exit;
    }

    try {
        // Kiểm tra xem user đã mua sản phẩm này chưa
        $sql = "SELECT o.id as order_id, o.trang_thai 
                FROM orders o 
                JOIN order_details od ON o.id = od.order_id 
                WHERE o.user_id = ? AND od.product_id = ? 
                AND o.trang_thai = 'completed'
                ORDER BY o.created_at DESC 
                LIMIT 1";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId, $productId]);
        $order = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($order) {
            echo json_encode([
                'success' => true,
                'orderId' => $order['order_id'],
                'canReview' => true,
                'message' => 'User đã mua sản phẩm này'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'canReview' => false,
                'message' => 'Bạn cần mua sản phẩm trước khi đánh giá'
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Lỗi database: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
}
?>