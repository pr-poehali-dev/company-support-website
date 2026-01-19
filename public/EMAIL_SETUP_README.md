# 📧 Настройка отправки Email с сайта

## 🎯 Что выбрать?

У вас есть 2 варианта:

### ✅ Вариант 1: Простой (рекомендуется для начала)
**Файл:** `send-email-simple.php`
- ✅ Не требует установки библиотек
- ✅ Работает на любом хостинге с PHP
- ⚠️ Может попадать в спам
- ⚠️ Зависит от настроек хостинга

### 🔥 Вариант 2: Профессиональный
**Файл:** `send-email.php`
- ✅ Надёжная доставка писем
- ✅ Не попадает в спам
- ✅ Работает через SMTP (Яндекс, Gmail, Mail.ru)
- ⚠️ Требует установку PHPMailer

---

## 🚀 Быстрый старт (Вариант 1 - Простой)

### Шаг 1: Переименуйте файл
```bash
mv send-email-simple.php send-email.php
```

### Шаг 2: Откройте `send-email.php` и измените:
```php
define('EMAIL_FROM', 'info@glavbuhvl.ru'); // Ваш email
define('EMAIL_TO', 'lore07061994@gmail.com'); // Куда приходят заявки
```

### Шаг 3: Готово!
Формы на сайте уже настроены. Просто загрузите файл на хостинг.

---

## 💪 Профессиональная настройка (Вариант 2 - SMTP)

### Шаг 1: Скачайте PHPMailer

**Способ A - Вручную:**
1. Перейдите: https://github.com/PHPMailer/PHPMailer/releases
2. Скачайте последнюю версию (например: PHPMailer-6.9.1.zip)
3. Распакуйте и скопируйте файлы в структуру:
```
public/
├── PHPMailer/
│   ├── PHPMailer.php
│   ├── SMTP.php
│   └── Exception.php
├── send-email.php
```

**Способ B - Через Composer (если доступен):**
```bash
cd public
composer require phpmailer/phpmailer
```

Затем в `send-email.php` замените подключение:
```php
require_once 'vendor/autoload.php';
```

### Шаг 2: Настройте send-email.php

Откройте файл и измените параметры:

#### Для Яндекс Почты (рекомендуется):
```php
define('EMAIL_HOST', 'smtp.yandex.ru');
define('EMAIL_PORT', 465);
define('EMAIL_USER', 'info@glavbuhvl.ru'); // Ваш Яндекс email
define('EMAIL_PASSWORD', 'abc123xyz456'); // Пароль приложения
define('EMAIL_TO', 'lore07061994@gmail.com'); // Куда приходят заявки
```

**Как получить пароль приложения Яндекс:**
1. Перейдите: https://id.yandex.ru/security/app-passwords
2. Нажмите "Создать пароль"
3. Выберите "Почта"
4. Скопируйте пароль → вставьте в EMAIL_PASSWORD

#### Для Gmail:
```php
define('EMAIL_HOST', 'smtp.gmail.com');
define('EMAIL_PORT', 587);
define('EMAIL_USER', 'your-email@gmail.com');
define('EMAIL_PASSWORD', 'your-app-password');
define('EMAIL_TO', 'lore07061994@gmail.com');
```

**Как получить пароль приложения Gmail:**
1. Перейдите: https://myaccount.google.com/apppasswords
2. Создайте пароль для "Почта"
3. Скопируйте → вставьте в EMAIL_PASSWORD

#### Для Mail.ru:
```php
define('EMAIL_HOST', 'smtp.mail.ru');
define('EMAIL_PORT', 465);
define('EMAIL_USER', 'your-email@mail.ru');
define('EMAIL_PASSWORD', 'your-app-password');
define('EMAIL_TO', 'lore07061994@gmail.com');
```

---

## 🧪 Проверка работы

### Через браузер:
Просто заполните форму на сайте и отправьте заявку.

### Через curl:
```bash
curl -X POST https://glavbuhvl.ru/send-email.php \
  -H "Content-Type: application/json" \
  -d '{
    "type": "contact",
    "name": "Тестовая заявка",
    "email": "test@example.com",
    "phone": "+7 999 123-45-67",
    "message": "Проверка отправки"
  }'
```

**Успешный ответ:**
```json
{"success": true, "message": "Email sent successfully"}
```

---

## ❌ Решение проблем

### Письма не приходят (Вариант 1 - простой):
1. Проверьте папку "Спам"
2. Убедитесь, что на хостинге работает функция `mail()`
3. Свяжитесь с хостером для настройки отправки писем
4. Перейдите на Вариант 2 (SMTP)

### Ошибка "Failed to authenticate" (Вариант 2):
- ✅ Проверьте правильность EMAIL_USER и EMAIL_PASSWORD
- ✅ Убедитесь, что используете пароль приложения (не обычный пароль)
- ✅ Проверьте EMAIL_HOST и EMAIL_PORT

### Ошибка "Could not connect to SMTP host":
- ✅ Проверьте, что хостинг разрешает исходящие SMTP-подключения
- ✅ Попробуйте изменить порт (465 ↔ 587)
- ✅ Убедитесь, что PHPMailer установлен правильно

### Письма попадают в спам:
- ✅ Используйте Вариант 2 (SMTP) вместо Варианта 1
- ✅ Настройте SPF и DKIM записи для вашего домена
- ✅ Используйте email с вашего домена (@glavbuhvl.ru)

---

## 📁 Структура файлов на хостинге

```
/public_html/  (или /www/ или /httpdocs/)
├── index.html
├── send-email.php  ← Основной файл отправки
├── PHPMailer/  ← Только для Варианта 2
│   ├── PHPMailer.php
│   ├── SMTP.php
│   └── Exception.php
└── assets/
    └── ...
```

---

## 🎨 Как выглядит письмо?

Письмо приходит в красивом HTML-формате:
- ✅ Зелёный фирменный дизайн
- ✅ Все данные в карточках
- ✅ Кликабельные email и телефон
- ✅ Для квизов — все вопросы и ответы
- ✅ Время получения заявки

---

## 🔐 Безопасность

⚠️ **ВАЖНО:**
- Никогда не публикуйте `send-email.php` в публичном репозитории с паролями
- Используйте пароли приложений, а не основные пароли
- Регулярно обновляйте PHPMailer (если используете Вариант 2)

---

## 📞 Нужна помощь?

Если что-то не работает:
1. Проверьте логи ошибок PHP на хостинге
2. Убедитесь, что файл `send-email.php` имеет права 644
3. Попробуйте тестовый запрос через curl (см. выше)
4. Напишите в поддержку вашего хостинга

---

✅ После настройки все формы на сайте (консультация, квизы) будут автоматически отправлять красивые письма на указанный email!
