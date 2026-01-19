import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime


def handler(event: dict, context) -> dict:
    """API для отправки заявок с сайта на Email через Mail.ru SMTP"""
    
    method = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    # Читаем данные формы
    body_str = event.get('body', '{}')
    try:
        data = json.loads(body_str)
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON'}),
            'isBase64Encoded': False
        }
    
    # Получаем параметры из секретов
    sender_email = os.environ.get('MAIL_RU_EMAIL')
    sender_password = os.environ.get('MAIL_RU_PASSWORD')
    recipient_email = os.environ.get('EMAIL_RECIPIENT')
    
    if not all([sender_email, sender_password, recipient_email]):
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email configuration missing'}),
            'isBase64Encoded': False
        }
    
    # Формируем письмо
    form_type = data.get('type', 'contact')
    name = data.get('name', 'Не указано')
    email = data.get('email', 'Не указано')
    phone = data.get('phone', 'Не указано')
    message = data.get('message', '')
    service = data.get('service', '')
    company = data.get('company', '')
    quiz_results = data.get('quizResults', {})
    
    # Тема письма
    subjects = {
        'contact': '📧 Новая заявка с сайта',
        'service': '🎯 Заявка на услугу',
        'consultation': '💼 Заявка на консультацию',
        'quiz': '📊 Результаты квиза',
        'callback': '📞 Запрос обратного звонка'
    }
    subject = subjects.get(form_type, '📧 Новая заявка с сайта')
    
    # Формируем HTML тело письма
    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
            <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
                {subject}
            </h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 5px; margin-top: 20px;">
                <p><strong>📅 Дата:</strong> {datetime.now().strftime('%d.%m.%Y %H:%M')}</p>
                <p><strong>👤 Имя:</strong> {name}</p>
                <p><strong>📧 Email:</strong> {email}</p>
                <p><strong>📱 Телефон:</strong> {phone}</p>
                
                {f'<p><strong>🏢 Компания:</strong> {company}</p>' if company else ''}
                {f'<p><strong>🎯 Услуга:</strong> {service}</p>' if service else ''}
                {f'<p><strong>💬 Сообщение:</strong><br>{message}</p>' if message else ''}
                
                {format_quiz_results(quiz_results) if quiz_results else ''}
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e0f2fe; border-left: 4px solid #0284c7; border-radius: 5px;">
                <p style="margin: 0; color: #0369a1;">
                    ℹ️ Это автоматическое письмо с сайта glavbuhvl.ru
                </p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Создаем письмо
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))
    
    # Отправляем через Mail.ru SMTP
    try:
        with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
            server.login(sender_email, sender_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Email sent successfully'}),
            'isBase64Encoded': False
        }
    
    except smtplib.SMTPAuthenticationError:
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'SMTP authentication failed. Check email/password'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Failed to send email: {str(e)}'}),
            'isBase64Encoded': False
        }


def format_quiz_results(results: dict) -> str:
    """Форматирует результаты квиза в HTML"""
    if not results:
        return ''
    
    html = '<div style="margin-top: 15px; padding: 15px; background-color: #f0fdf4; border-radius: 5px;">'
    html += '<h3 style="color: #059669; margin-top: 0;">📊 Результаты квиза:</h3>'
    
    for question, answer in results.items():
        html += f'<p><strong>{question}</strong><br>{answer}</p>'
    
    html += '</div>'
    return html
