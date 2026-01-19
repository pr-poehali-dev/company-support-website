# Инструкция по установке PHPMailer

## Вариант 1: Скачать вручную (рекомендуется)

1. Перейдите на https://github.com/PHPMailer/PHPMailer/releases
2. Скачайте последнюю версию (например: PHPMailer-6.9.1.zip)
3. Распакуйте архив
4. Скопируйте папку `src` в `public/PHPMailer/`

Структура должна быть:
```
public/
├── PHPMailer/
│   ├── PHPMailer.php
│   ├── SMTP.php
│   └── Exception.php
├── send-email.php
└── ...
```

## Вариант 2: Через Composer (если доступен на хостинге)

В папке `public/` выполните:
```bash
composer require phpmailer/phpmailer
```

Затем измените в `send-email.php` строки подключения:
```php
require_once 'vendor/autoload.php';
```

## Вариант 3: Использовать mail() вместо SMTP

Если PHPMailer недоступен, можно использовать встроенную функцию `mail()`.
Замените функцию `sendEmail` в `send-email.php`:

```php
function sendEmail($subject, $htmlBody, $to, $from, $host, $port, $username, $password) {
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: ГЛАВБУХВЛ <" . $from . ">\r\n";
    $headers .= "Reply-To: " . $from . "\r\n";
    
    return mail($to, $subject, $htmlBody, $headers);
}
```

⚠️ Примечание: `mail()` менее надёжна и письма могут попадать в спам.

## Настройка send-email.php

Откройте `send-email.php` и замените параметры:

```php
define('EMAIL_HOST', 'smtp.yandex.ru'); // Ваш SMTP сервер
define('EMAIL_PORT', 465); // Порт
define('EMAIL_USER', 'info@glavbuhvl.ru'); // Ваш email для отправки
define('EMAIL_PASSWORD', 'your_app_password'); // Пароль приложения
define('EMAIL_TO', 'lore07061994@gmail.com'); // Кому отправлять заявки
```

### Как получить пароль приложения:

**Яндекс:**
1. https://id.yandex.ru/security/app-passwords
2. Создайте пароль для "Почта"
3. Скопируйте в EMAIL_PASSWORD

**Gmail:**
1. https://myaccount.google.com/apppasswords
2. Создайте пароль для приложения
3. Используйте `smtp.gmail.com`, порт `587`

**Mail.ru:**
1. Настройки → Пароль и безопасность → Пароли для внешних приложений
2. Используйте `smtp.mail.ru`, порт `465`

## Проверка работы

После настройки проверьте через форму на сайте или curl:

```bash
curl -X POST https://ваш-сайт.ru/send-email.php \
  -H "Content-Type: application/json" \
  -d '{
    "type": "contact",
    "name": "Тест",
    "email": "test@example.com",
    "phone": "+7 999 123-45-67",
    "message": "Тестовое сообщение"
  }'
```
