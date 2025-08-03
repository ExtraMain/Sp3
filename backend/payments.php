<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
date_default_timezone_set('Asia/Ho_Chi_Minh');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';


// Log errors to a file
$logFile = __DIR__ . '/payment_debug.log';
function logMessage($message) {
    global $logFile;
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - $message\n", FILE_APPEND);
}

// Log all incoming requests
logMessage("Nhận yêu cầu: " . $_SERVER['REQUEST_METHOD'] . " " . $_SERVER['REQUEST_URI']);

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    logMessage("Yêu cầu OPTIONS được nhận");
    exit();
}

// Kiểm tra trùng lịch trong khoảng 2 tiếng
function isTimeSlotAvailable($conn, $userId, $date, $time) {
    $startTime = new DateTime("$date $time");
    $endTime = clone $startTime;
    $endTime->modify('+2 hours');

    $startStr = $startTime->format('Y-m-d H:i:s');
    $endStr = $endTime->format('Y-m-d H:i:s');

    $query = "
        SELECT * FROM don_dat_lich
        WHERE ma_nguoi_dung = '$userId'
        AND CONCAT(DATE(ngay_dat), ' ', gio_dat) BETWEEN '$startStr' AND '$endStr'
           OR CONCAT(DATE(ngay_dat), ' ', gio_dat) + INTERVAL 2 HOUR BETWEEN '$startStr' AND '$endStr'
    ";

    $result = $conn->query($query);
    return ($result && $result->num_rows === 0);
}


// Handle VNPay callback (return URL)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['vnp_TxnRef'])) {
    $vnp_HashSecret = "FC3731AMJQ13YF261SEG5E3F6X2YKRFJ"; // Your VNPay secret
    
    logMessage("--------- Gỡ lỗi Callback VNPay ---------");
    logMessage("Tất cả tham số GET: " . json_encode($_GET));
    
    $vnp_SecureHash = $_GET['vnp_SecureHash'];
    logMessage("vnp_SecureHash nhận được: " . $vnp_SecureHash);
    
    $inputData = array();
    foreach ($_GET as $key => $value) {
        if (substr($key, 0, 4) == "vnp_") {
            $inputData[$key] = $value;
        }
    }
    
    unset($inputData['vnp_SecureHash']);
    ksort($inputData);
    logMessage("inputData sau khi sắp xếp: " . json_encode($inputData));
    
    $hashData = "";
    $i = 0;
    foreach ($inputData as $key => $value) {
        if ($i == 1) {
            $hashData .= '&' . urlencode($key) . "=" . urlencode($value);
        } else {
            $hashData .= urlencode($key) . "=" . urlencode($value);
            $i = 1;
        }
    }
    
    logMessage("Chuỗi hashData: " . $hashData);
    $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);
    logMessage("secureHash được tạo: " . $secureHash);
    logMessage("Khớp hash: " . ($secureHash === $vnp_SecureHash ? "Có" : "Không"));
    
    if ($secureHash !== $vnp_SecureHash) {
        logMessage("Chữ ký VNPay không hợp lệ. Expected: $secureHash, Got: $vnp_SecureHash");
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Chữ ký không hợp lệ']);
        exit;
    }

    $conn = new mysqli("localhost", "root", "", "form");
    if ($conn->connect_error) {
        logMessage("Kết nối cơ sở dữ liệu thất bại: " . $conn->connect_error);
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Lỗi cơ sở dữ liệu']);
        exit;
    }

    $orderId = $conn->real_escape_string($_GET['vnp_TxnRef']);
    $status = $_GET['vnp_ResponseCode'] == '00' ? 'Đã thanh toán' : 'Thất bại';
    $transId = $conn->real_escape_string($_GET['vnp_TransactionNo']);
    
    $sqlPayment = "UPDATE thanh_toan SET 
                   trang_thai_thanh_toan = '$status', 
                   ma_giao_dich = '$transId',
                   thoi_gian_thanh_toan = NOW(),
                   thoi_gian_cap_nhat = NOW()
                   WHERE ma_don_hang = '$orderId'";
                   
    $conn->query($sqlPayment);
    
    logMessage("Trạng thái thanh toán được cập nhật cho đơn hàng $orderId: $status");
    
    if ($_GET['vnp_ResponseCode'] == '00') {
        // Update order status to indicate payment completed
        $sqlUpdateOrder = "UPDATE don_dat_lich SET trang_thai = 'Đã thanh toán' WHERE id = '$orderId'";
        $conn->query($sqlUpdateOrder);
        logMessage("Cập nhật trạng thái đơn hàng $orderId thành 'Đã thanh toán'");
        
        header("Location: http://localhost:5173/thankyou");
        logMessage("Chuyển hướng người dùng đến trang thankyou");
        exit;
    } else {
        header("Location: http://localhost:3000/payment-failed?orderId=$orderId");
        logMessage("Chuyển hướng người dùng đến trang payment-failed");
        exit;
    }
    $conn->close();
    exit;
}

// Database connection
$conn = new mysqli("localhost", "root", "", "form");
if ($conn->connect_error) {
    http_response_code(500);
    $errorMsg = "Kết nối cơ sở dữ liệu thất bại: " . $conn->connect_error;
    logMessage($errorMsg);
    echo json_encode(["status" => "error", "message" => $errorMsg]);
    exit;
}

$conn->set_charset("utf8mb4");
logMessage("Kết nối cơ sở dữ liệu thành công");

// Parse JSON input
$rawInput = file_get_contents("php://input");
logMessage("Dữ liệu thô: $rawInput");
$data = json_decode($rawInput, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    $errorMsg = "JSON không hợp lệ: " . json_last_error_msg();
    logMessage($errorMsg);
    echo json_encode(["status" => "error", "message" => $errorMsg]);
    exit;
}

// Handle order logic
if (!$data || !isset($data['customerInfo']) || !isset($data['cartItems']) || !isset($data['paymentMethod'])) {
    http_response_code(400);
    $errorMsg = "Thiếu các trường bắt buộc: customerInfo, cartItems, hoặc paymentMethod";
    logMessage($errorMsg);
    echo json_encode(["status" => "error", "message" => $errorMsg]);
    exit;
}

$ten_khach_hang = $conn->real_escape_string($data['customerInfo']['fullName']);
$email = $conn->real_escape_string($data['customerInfo']['email']);
$so_dien_thoai = $conn->real_escape_string($data['customerInfo']['phone']);
$gio_dat = isset($data['customerInfo']['orderTime']) ? $conn->real_escape_string($data['customerInfo']['orderTime']) : null;
$ghi_chu = isset($data['customerInfo']['note']) ? $conn->real_escape_string($data['customerInfo']['note']) : ''; // ✅ thêm dòng này

$thong_tin_khach_hang = $data['customerInfo'];
$muc_gio_hang = $data['cartItems'];
$phuong_thuc_thanh_toan = $data['paymentMethod'];
$tong_so_tien = $data['totalAmount'] ?? 0;
$ngay_dat_hang = $data['orderDate'] ?? date('Y-m-d H:i:s');
$userId = isset($data['userId']) && is_numeric($data['userId']) ? $conn->real_escape_string($data['userId']) : null;

// Convert ISO date to MySQL DATETIME format
try {
    $date = new DateTime($ngay_dat_hang);
    $ngay_dat_hang_dinh_dang = $date->format('Y-m-d H:i:s');
    logMessage("Chuyển đổi ngay_dat_hang: $ngay_dat_hang thành $ngay_dat_hang_dinh_dang");
} catch (Exception $e) {
    http_response_code(400);
    $errorMsg = "Định dạng ngày đặt hàng không hợp lệ: " . $e->getMessage();
    logMessage($errorMsg);
    echo json_encode(["status" => "error", "message" => $errorMsg]);
    exit;
}

// Input validation
$requiredCustomerFields = ['fullName', 'email', 'phone'];
foreach ($requiredCustomerFields as $field) {
    if (!isset($thong_tin_khach_hang[$field]) || empty(trim($thong_tin_khach_hang[$field]))) {
        http_response_code(400);
        $errorMsg = "Thiếu hoặc trường khách hàng rỗng: $field";
        logMessage($errorMsg);
        echo json_encode(["status" => "error", "message" => $errorMsg]);
        exit;
    }
}

// Validate email
if (!filter_var($thong_tin_khach_hang['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    $errorMsg = "Định dạng email không hợp lệ: " . $thong_tin_khach_hang['email'];
    logMessage($errorMsg);
    echo json_encode(["status" => "error", "message" => $errorMsg]);
    exit;
}

// Validate phone
if (!preg_match('/^[0-9]{10,11}$/', preg_replace('/[^0-9]/', '', $thong_tin_khach_hang['phone']))) {
    http_response_code(400);
    $errorMsg = "Định dạng số điện thoại không hợp lệ: " . $thong_tin_khach_hang['phone'];
    logMessage($errorMsg);
    echo json_encode(["status" => "error", "message" => $errorMsg]);
    exit;
}

// Validate cart items
if (empty($muc_gio_hang)) {
    http_response_code(400);
    $errorMsg = "Giỏ hàng rỗng";
    logMessage($errorMsg);
    echo json_encode(["status" => "error", "message" => $errorMsg]);
    exit;
}
foreach ($muc_gio_hang as $index => $item) {
    if (!isset($item['ten']) || !isset($item['gia']) || 
        !isset($item['so_luong']) || !is_numeric($item['gia']) || $item['gia'] <= 0) {
        http_response_code(400);
        $errorMsg = "Mục giỏ hàng không hợp lệ tại chỉ số $index: thiếu trường bắt buộc hoặc giá không hợp lệ";
        logMessage($errorMsg);
        echo json_encode(["status" => "error", "message" => $errorMsg]);
        exit;
    }
}

// Validate total amount
if (!is_numeric($tong_so_tien) || $tong_so_tien <= 0) {
    http_response_code(400);
    $errorMsg = "Tổng số tiền không hợp lệ: $tong_so_tien";
    logMessage($errorMsg);
    echo json_encode(["status" => "error", "message" => $errorMsg]);
    exit;
}

// Validate userId
if (is_null($userId)) {
    http_response_code(400);
    $errorMsg = "Thiếu mã người dùng. Vui lòng đăng nhập lại.";
    logMessage($errorMsg);
    echo json_encode(["status" => "error", "message" => $errorMsg]);
    exit;
}

// Verify userId exists in dang_ky table
$userQuery = "SELECT id FROM dang_ky WHERE id = '$userId' LIMIT 1";
$userResult = $conn->query($userQuery);
if (!$userResult || $userResult->num_rows == 0) {
    http_response_code(400);
    $errorMsg = "Mã người dùng không hợp lệ: $userId";
    logMessage($errorMsg);
    echo json_encode(["status" => "error", "message" => $errorMsg]);
    exit;
}

logMessage("Xác thực đầu vào thành công");

// Start transaction
$conn->begin_transaction();
try {
    if (!isTimeSlotAvailable($conn, $userId, $date->format('Y-m-d'), $gio_dat)) {
        http_response_code(409);
        $msg = "Bạn đã đặt lịch trong khoảng thời gian này rồi. Vui lòng chọn khung giờ khác.";
        logMessage($msg);
        echo json_encode(["status" => "error", "message" => $msg]);
        exit;
    }

    // Calculate order total (no shipping cost)
    $note = $conn->real_escape_string($thong_tin_khach_hang['note'] ?? '');
    $phuong_thuc_thanh_toan = $conn->real_escape_string($phuong_thuc_thanh_toan);
    $status = 'Chờ xử lý';
    $tong_so_tien = floatval($tong_so_tien);
    $orderTotal = $tong_so_tien;

    // Insert order into don_dat_lich table (no ma_dia_chi)
    $sql = "INSERT INTO don_dat_lich (
    ma_nguoi_dung,
    ten_khach_hang,
    so_dien_thoai,
    email,
    tong_tien,
    trang_thai,
    ngay_dat,
    gio_dat,
    ghi_chu
) VALUES (
    '$userId',
    '$ten_khach_hang',
    '$so_dien_thoai',
    '$email',
    '$tong_so_tien',
    'Chờ xử lý',
    '$ngay_dat_hang_dinh_dang',
    '$gio_dat',
    '$ghi_chu'
)";
$conn->query($sql);
    
    logMessage("Thực thi truy vấn chèn đơn hàng: $sql");
    if (!$conn->query($sql)) {
    echo json_encode(["success" => false, "message" => "Lỗi chèn đơn hàng: " . $conn->error]);
    exit;
    }
    
    $orderId = $conn->insert_id;
    logMessage("Chèn đơn hàng với ID: $orderId");

    // Aggregate product names for hoa_don
    $productNames = array_map(function($item) {
        return $item['ten'] . ' (x' . $item['so_luong'] . ')';
    }, $muc_gio_hang);
    $ten_dich_vu = $conn->real_escape_string(implode(', ', $productNames));
    $ten_nguoi = $conn->real_escape_string($thong_tin_khach_hang['fullName']);
    
    // Insert into hoa_don table (no dia_chi)
    $invoiceSql = "INSERT INTO hoa_don (ma_don_hang, ten_nguoi, ten_dich_vu, tong_tien, phuong_thuc_thanh_toan)
                   VALUES ('$orderId', '$ten_nguoi', '$ten_dich_vu', '$orderTotal', '$phuong_thuc_thanh_toan')";
    
    logMessage("Thực thi truy vấn chèn hóa đơn: $invoiceSql");
    if (!$conn->query($invoiceSql)) {
        throw new Exception("Lỗi khi chèn vào hoa_don: " . $conn->error);
    }
    
    // Create payment record
    $paymentStatus = 'Chưa thanh toán';
    $paymentSql = "INSERT INTO thanh_toan (ma_don_hang, phuong_thuc_thanh_toan, tong_so_tien, trang_thai_thanh_toan)
                   VALUES ('$orderId', '$phuong_thuc_thanh_toan', '$orderTotal', '$paymentStatus')";
                  
    logMessage("Thực thi truy vấn chèn thanh toán: $paymentSql");
    if (!$conn->query($paymentSql)) {
        throw new Exception("Lỗi khi chèn vào thanh_toan: " . $conn->error);
    }

    // Handle VNPay payment initiation
    if ($phuong_thuc_thanh_toan === 'vnpay') {
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "http://localhost/BaiTapNhom/backend/payments.php";
        $vnp_TmnCode = "LYE5QSH7";
        $vnp_HashSecret = "FC3731AMJQ13YF261SEG5E3F6X2YKRFJ";

        $vnp_TxnRef = $orderId;
        $vnp_OrderInfo = "Thanh toan don hang " . $orderId;
        $vnp_OrderType = "billpayment";
        $vnp_Amount = $orderTotal * 100;
        $vnp_Locale = "vn";
        $vnp_BankCode = "";
        $vnp_IpAddr = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'];
        $vnp_ExpireDate = date('YmdHis', strtotime('+30 minutes'));

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
            "vnp_ExpireDate" => $vnp_ExpireDate
        );

        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata = urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        logMessage("Chuỗi truy vấn VNPay: " . $query);
        logMessage("Dữ liệu băm VNPay: " . $hashdata);

        $vnp_Url = $vnp_Url . "?" . $query;
        $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
        logMessage("Hash VNPay được tạo: " . $vnpSecureHash);
        
        $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;

        $conn->commit();
        logMessage("Khởi tạo thanh toán VNPay cho đơn hàng $orderId: $vnp_Url");
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "message" => "Khởi tạo thanh toán VNPay thành công",
            "orderId" => $orderId,
            "payUrl" => $vnp_Url
        ]);
        exit;
    }

    // For COD, commit transaction and return success
    $conn->commit();
    logMessage("Giao dịch COD được xác nhận thành công");

    sendConfirmationEmail(
        $email,
        $ten_khach_hang,
        $orderId,
        $orderTotal,
        implode(', ', array_map(function($i) {
            return $i['ten'] . ' (x' . $i['so_luong'] . ')';
        }, $muc_gio_hang)),
        $phuong_thuc_thanh_toan
    );

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Xử lý đơn hàng thành công",
        "orderId" => $orderId
    ]);
} catch (Exception $e) {
    $conn->rollback();
    $errorMsg = "Lỗi khi xử lý đơn hàng: " . $e->getMessage();
    logMessage($errorMsg);
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $errorMsg]);
} finally {
    $conn->close();
    logMessage("Đóng kết nối cơ sở dữ liệu");
}

// Helper function to generate transaction ID
function generateTransactionId() {
    return 'TXN' . time() . rand(1000, 9999);
}

function sendConfirmationEmail($toEmail, $toName, $orderId, $orderTotal, $productList, $paymentMethod) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;

        $mail->Username = 'kobikok123@gmail.com';      
        $mail->Password = 'ngcnrigxaaqolqtv';           
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('kobikok123@gmail.com', 'Spa Booking');
        $mail->addAddress($toEmail, $toName);

        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';   

        $mail->Subject = "Xác nhận đơn đặt lịch #$orderId";
        $mail->Body = "
            <html>
            <head><meta charset='UTF-8'></head>
            <body>
                <h3>Xin chào $toName,</h3>
                <p>Bạn đã đặt lịch thành công với các thông tin sau:</p>
                <ul>
                    <li><strong>Mã đơn hàng:</strong> $orderId</li>
                    <li><strong>Sản phẩm:</strong> $productList</li>
                    <li><strong>Phương thức thanh toán:</strong> $paymentMethod</li>
                    <li><strong>Tổng tiền:</strong> " . number_format($orderTotal, 0, ',', '.') . " VND</li>
                </ul>
                <p>Chúng tôi sẽ liên hệ để xác nhận sớm nhất.</p>
                <p>Trân trọng,<br/>Spa Store</p>
            </body>
            </html>
        ";

        $mail->send();
        logMessage("📧 Đã gửi email xác nhận tới $toEmail");
    } catch (Exception $e) {
        logMessage("❌ Lỗi gửi email: {$mail->ErrorInfo}");
    }
}

?>