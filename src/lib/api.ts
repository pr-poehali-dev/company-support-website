const SEND_EMAIL_URL = '/send-email.php';
const IS_DEVELOPMENT = import.meta.env.DEV;

interface ContactFormData {
  type: 'contact' | 'service' | 'consultation' | 'quiz' | 'callback';
  name: string;
  email: string;
  phone: string;
  message?: string;
  service?: string;
  company?: string;
  quizResults?: Record<string, string>;
}

export async function sendContactForm(data: ContactFormData): Promise<{ success: boolean; message?: string; error?: string }> {
  if (IS_DEVELOPMENT) {
    console.log('📧 РЕЖИМ РАЗРАБОТКИ: Форма отправлена (эмуляция)', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { 
      success: true, 
      message: 'Форма отправлена! (В режиме разработки письмо не отправляется. Загрузите сайт на хостинг для реальной отправки)' 
    };
  }

  try {
    const response = await fetch(SEND_EMAIL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Server returned non-JSON response:', text.substring(0, 200));
      throw new Error('PHP-файл send-email.php не найден на хостинге. Загрузите файл из папки public/ на сервер.');
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Ошибка отправки');
    }

    return { success: true, message: 'Заявка успешно отправлена!' };
  } catch (error) {
    console.error('Error sending form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Произошла ошибка при отправке',
    };
  }
}