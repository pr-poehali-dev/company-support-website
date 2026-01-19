<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// НАСТРОЙКИ - ИЗМЕНИТЕ ЭТИ ЗНАЧЕНИЯ
define('EMAIL_FROM', 'info@glavbuhvl.ru'); // От кого письмо
define('EMAIL_TO', 'lore07061994@gmail.com'); // Кому отправлять заявки

// Получаем данные
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$type = $data['type'] ?? 'contact';
$name = $data['name'] ?? 'Не указано';
$email = $data['email'] ?? 'Не указан';
$phone = $data['phone'] ?? 'Не указан';
$message = $data['message'] ?? '';
$service = $data['service'] ?? '';
$company = $data['company'] ?? '';
$quizResults = $data['quizResults'] ?? [];

// Формируем тему письма
$subject = getEmailSubject($type, $service);

// Создаём HTML письмо
$htmlBody = createEmailHTML($type, $name, $email, $phone, $message, $service, $company, $quizResults);

// Отправляем email через встроенную функцию mail()
try {
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: ГЛАВБУХВЛ <" . EMAIL_FROM . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    
    $result = mail(EMAIL_TO, $subject, $htmlBody, $headers);
    
    if ($result) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send email. Check server mail configuration.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function getEmailSubject($type, $service = '') {
    $subjects = [
        'contact' => '📧 Новая заявка с сайта ГЛАВБУХВЛ',
        'service' => '🎯 Заявка на услугу: ' . ($service ?: 'Не указана'),
        'consultation' => '💼 Запрос на консультацию',
        'quiz' => '📋 Результаты квиза с сайта',
        'callback' => '📞 Запрос обратного звонка'
    ];
    
    return $subjects[$type] ?? '📩 Новая заявка с сайта';
}

function createEmailHTML($type, $name, $email, $phone, $message, $service, $company, $quizResults) {
    $now = date('d.m.Y H:i');
    $formTypeLabel = getFormTypeLabel($type);
    
    $html = '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .header p {
            margin: 8px 0 0 0;
            opacity: 0.9;
            font-size: 14px;
        }
        .content {
            padding: 30px;
        }
        .field {
            margin-bottom: 20px;
            padding: 16px;
            background: #f9fafb;
            border-radius: 8px;
            border-left: 4px solid #10b981;
        }
        .field-label {
            font-size: 12px;
            text-transform: uppercase;
            color: #6b7280;
            font-weight: 600;
            margin-bottom: 4px;
            letter-spacing: 0.5px;
        }
        .field-value {
            font-size: 16px;
            color: #111827;
            font-weight: 500;
        }
        .message-box {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            margin: 20px 0;
        }
        .quiz-results {
            background: #fef3c7;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #f59e0b;
            margin: 20px 0;
        }
        .quiz-item {
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #fde68a;
        }
        .quiz-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            border-top: 1px solid #e5e7eb;
        }
        .badge {
            display: inline-block;
            padding: 6px 12px;
            background: #10b981;
            color: white;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 Новая заявка с сайта</h1>
            <p>ГЛАВБУХВЛ - Бухгалтерские услуги</p>
        </div>
        
        <div class="content">
            <p style="text-align: center; margin-bottom: 24px;">
                <span class="badge">' . htmlspecialchars($formTypeLabel) . '</span>
            </p>
            
            <div class="field">
                <div class="field-label">👤 Имя клиента</div>
                <div class="field-value">' . htmlspecialchars($name) . '</div>
            </div>
            
            <div class="field">
                <div class="field-label">📧 Email</div>
                <div class="field-value"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #10b981; text-decoration: none;">' . htmlspecialchars($email) . '</a></div>
            </div>
            
            <div class="field">
                <div class="field-label">📱 Телефон</div>
                <div class="field-value"><a href="tel:' . htmlspecialchars($phone) . '" style="color: #10b981; text-decoration: none;">' . htmlspecialchars($phone) . '</a></div>
            </div>';
    
    if ($company) {
        $html .= '
            <div class="field">
                <div class="field-label">🏢 Компания</div>
                <div class="field-value">' . htmlspecialchars($company) . '</div>
            </div>';
    }
    
    if ($service) {
        $html .= '
            <div class="field">
                <div class="field-label">🎯 Интересующая услуга</div>
                <div class="field-value">' . htmlspecialchars($service) . '</div>
            </div>';
    }
    
    if ($message) {
        $html .= '
            <div class="message-box">
                <div class="field-label" style="margin-bottom: 8px;">💬 Сообщение</div>
                <div style="white-space: pre-wrap; color: #374151;">' . nl2br(htmlspecialchars($message)) . '</div>
            </div>';
    }
    
    if (!empty($quizResults)) {
        $html .= '
            <div class="quiz-results">
                <div class="field-label" style="margin-bottom: 12px; color: #92400e;">📋 Результаты квиза</div>';
        
        foreach ($quizResults as $question => $answer) {
            $html .= '
                <div class="quiz-item">
                    <div style="font-weight: 600; color: #78350f; margin-bottom: 4px;">' . htmlspecialchars($question) . '</div>
                    <div style="color: #92400e;">' . htmlspecialchars($answer) . '</div>
                </div>';
        }
        
        $html .= '
            </div>';
    }
    
    $html .= '
        </div>
        
        <div class="footer">
            <p style="margin: 0 0 8px 0;">Заявка получена: ' . $now . '</p>
            <p style="margin: 0;">Автоматическое уведомление с сайта ГЛАВБУХВЛ</p>
        </div>
    </div>
</body>
</html>';
    
    return $html;
}

function getFormTypeLabel($type) {
    $labels = [
        'contact' => 'Контактная форма',
        'service' => 'Заявка на услугу',
        'consultation' => 'Консультация',
        'quiz' => 'Квиз',
        'callback' => 'Обратный звонок'
    ];
    
    return $labels[$type] ?? 'Заявка';
}
