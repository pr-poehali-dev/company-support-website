import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime


def handler(event: dict, context) -> dict:
    '''API для отправки заявок с сайта на email с красивым оформлением'''
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        data = json.loads(event.get('body', '{}'))
        
        form_type = data.get('type', 'contact')
        name = data.get('name', 'Не указано')
        email = data.get('email', 'Не указан')
        phone = data.get('phone', 'Не указан')
        message = data.get('message', '')
        service = data.get('service', '')
        company = data.get('company', '')
        quiz_results = data.get('quizResults', {})
        
        email_config = {
            'host': os.environ.get('EMAIL_HOST'),
            'port': int(os.environ.get('EMAIL_PORT', 465)),
            'user': os.environ.get('EMAIL_USER'),
            'password': os.environ.get('EMAIL_PASSWORD'),
            'to': os.environ.get('EMAIL_TO')
        }
        
        missing = [k for k, v in email_config.items() if not v]
        if missing:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': f'Missing email configuration: {", ".join(missing)}'
                })
            }
        
        html_body = create_email_html(
            form_type=form_type,
            name=name,
            email=email,
            phone=phone,
            message=message,
            service=service,
            company=company,
            quiz_results=quiz_results
        )
        
        subject = get_email_subject(form_type, service)
        
        send_email(
            subject=subject,
            html_body=html_body,
            config=email_config
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Email sent successfully'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': str(e)
            })
        }


def get_email_subject(form_type: str, service: str = '') -> str:
    '''Генерация темы письма в зависимости от типа формы'''
    
    subjects = {
        'contact': '📧 Новая заявка с сайта ГЛАВБУХВЛ',
        'service': f'🎯 Заявка на услугу: {service or "Не указана"}',
        'consultation': '💼 Запрос на консультацию',
        'quiz': '📋 Результаты квиза с сайта',
        'callback': '📞 Запрос обратного звонка'
    }
    
    return subjects.get(form_type, '📩 Новая заявка с сайта')


def create_email_html(
    form_type: str,
    name: str,
    email: str,
    phone: str,
    message: str = '',
    service: str = '',
    company: str = '',
    quiz_results: dict = None
) -> str:
    '''Создание красиво оформленного HTML письма'''
    
    now = datetime.now().strftime('%d.%m.%Y %H:%M')
    
    html = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }}
            .container {{
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }}
            .header {{
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }}
            .header h1 {{
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }}
            .header p {{
                margin: 8px 0 0 0;
                opacity: 0.9;
                font-size: 14px;
            }}
            .content {{
                padding: 30px;
            }}
            .field {{
                margin-bottom: 20px;
                padding: 16px;
                background: #f9fafb;
                border-radius: 8px;
                border-left: 4px solid #10b981;
            }}
            .field-label {{
                font-size: 12px;
                text-transform: uppercase;
                color: #6b7280;
                font-weight: 600;
                margin-bottom: 4px;
                letter-spacing: 0.5px;
            }}
            .field-value {{
                font-size: 16px;
                color: #111827;
                font-weight: 500;
            }}
            .message-box {{
                background: #f9fafb;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
                margin: 20px 0;
            }}
            .quiz-results {{
                background: #fef3c7;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #f59e0b;
                margin: 20px 0;
            }}
            .quiz-item {{
                margin-bottom: 12px;
                padding-bottom: 12px;
                border-bottom: 1px solid #fde68a;
            }}
            .quiz-item:last-child {{
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }}
            .footer {{
                background: #f9fafb;
                padding: 20px;
                text-align: center;
                color: #6b7280;
                font-size: 12px;
                border-top: 1px solid #e5e7eb;
            }}
            .badge {{
                display: inline-block;
                padding: 6px 12px;
                background: #10b981;
                color: white;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }}
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
                    <span class="badge">{get_form_type_label(form_type)}</span>
                </p>
                
                <div class="field">
                    <div class="field-label">👤 Имя клиента</div>
                    <div class="field-value">{name}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">📧 Email</div>
                    <div class="field-value"><a href="mailto:{email}" style="color: #10b981; text-decoration: none;">{email}</a></div>
                </div>
                
                <div class="field">
                    <div class="field-label">📱 Телефон</div>
                    <div class="field-value"><a href="tel:{phone}" style="color: #10b981; text-decoration: none;">{phone}</a></div>
                </div>
    '''
    
    if company:
        html += f'''
                <div class="field">
                    <div class="field-label">🏢 Компания</div>
                    <div class="field-value">{company}</div>
                </div>
        '''
    
    if service:
        html += f'''
                <div class="field">
                    <div class="field-label">🎯 Интересующая услуга</div>
                    <div class="field-value">{service}</div>
                </div>
        '''
    
    if message:
        html += f'''
                <div class="message-box">
                    <div class="field-label" style="margin-bottom: 8px;">💬 Сообщение</div>
                    <div style="white-space: pre-wrap; color: #374151;">{message}</div>
                </div>
        '''
    
    if quiz_results:
        html += '''
                <div class="quiz-results">
                    <div class="field-label" style="margin-bottom: 12px; color: #92400e;">📋 Результаты квиза</div>
        '''
        for question, answer in quiz_results.items():
            html += f'''
                    <div class="quiz-item">
                        <div style="font-weight: 600; color: #78350f; margin-bottom: 4px;">{question}</div>
                        <div style="color: #92400e;">{answer}</div>
                    </div>
            '''
        html += '''
                </div>
        '''
    
    html += f'''
            </div>
            
            <div class="footer">
                <p style="margin: 0 0 8px 0;">Заявка получена: {now}</p>
                <p style="margin: 0;">Автоматическое уведомление с сайта ГЛАВБУХВЛ</p>
            </div>
        </div>
    </body>
    </html>
    '''
    
    return html


def get_form_type_label(form_type: str) -> str:
    '''Получение красивого названия типа формы'''
    
    labels = {
        'contact': 'Контактная форма',
        'service': 'Заявка на услугу',
        'consultation': 'Консультация',
        'quiz': 'Квиз',
        'callback': 'Обратный звонок'
    }
    
    return labels.get(form_type, 'Заявка')


def send_email(subject: str, html_body: str, config: dict):
    '''Отправка email через SMTP'''
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = config['user']
    msg['To'] = config['to']
    
    html_part = MIMEText(html_body, 'html', 'utf-8')
    msg.attach(html_part)
    
    if config['port'] == 465:
        server = smtplib.SMTP_SSL(config['host'], config['port'])
    else:
        server = smtplib.SMTP(config['host'], config['port'])
        server.starttls()
    
    server.login(config['user'], config['password'])
    server.send_message(msg)
    server.quit()
