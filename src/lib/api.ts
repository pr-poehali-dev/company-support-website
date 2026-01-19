const SEND_EMAIL_URL = 'https://functions.poehali.dev/fcc150d4-9a08-4e6c-8f02-01d97130345d';

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
  try {
    const response = await fetch(SEND_EMAIL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Ошибка отправки');
    }

    return { success: true, message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.' };
  } catch (error) {
    console.error('Error sending form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Произошла ошибка при отправке',
    };
  }
}