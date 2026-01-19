import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { sendContactForm } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  type: 'single' | 'multiple';
  options: string[];
  correct: number | number[];
  difficulty: 'basic' | 'advanced';
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Клиент в чате пишет: «Я не понимаю, за что платить. У вас нет инструкции — только договор». Что вы делаете?',
    type: 'single',
    difficulty: 'basic',
    options: [
      'Отвечаете: «Договор — это и есть инструкция. Читайте внимательнее»',
      'Присылаете ссылку на шаблон договора и пишете: «Всё там написано»',
      'Пишете: «Спасибо, что обратили внимание — я подготовлю для вас краткую пошаговую памятку, как работает наш процесс, и отправлю за 15 минут»',
      'Молчите — клиент сам разберётся, когда прочитает весь договор'
    ],
    correct: 2
  },
  {
    id: 2,
    question: 'Клиент жалуется, что его предыдущий менеджер не отвечал неделю. Что вы делаете?',
    type: 'single',
    difficulty: 'basic',
    options: [
      'Извиняетесь и говорите: «Я не несу ответственность за прошлое — сейчас я помогу»',
      'Говорите: «Это неприемлемо. Я сразу же возьму ваше дело в работу»',
      'Просите клиента написать официальную жалобу — чтобы зафиксировать проблему',
      'Молчите, но начинаете работать над вопросом — не акцентируя внимание на прошлом'
    ],
    correct: 1
  },
  {
    id: 3,
    question: 'Что НЕЛЬЗЯ делать при общении с клиентом?',
    type: 'multiple',
    difficulty: 'basic',
    options: [
      'Использовать фразу «Как я понимаю, вы хотите…» для подтверждения понимания',
      'Говорить: «У нас так делают со всеми» — чтобы убедить в правильности решения',
      'Отвечать на сообщение с задержкой, если клиент не указал срочность',
      'Задавать открытые вопросы, чтобы выявить скрытые потребности'
    ],
    correct: [1, 2]
  },
  {
    id: 4,
    question: 'Клиент прислал документы с ошибками. Как вы реагируете?',
    type: 'single',
    difficulty: 'basic',
    options: [
      'Отправляете шаблон: «Документы не приняты — отправьте заново»',
      'Пишете: «Здесь есть неточности — исправьте и пришлите снова»',
      'Отправляете исправленную версию с комментарием: «Вот как выглядит корректный вариант — вы можете использовать его как шаблон»',
      'Ничего не пишете — ждёте, пока клиент сам заметит ошибки'
    ],
    correct: 2
  },
  {
    id: 5,
    question: 'Какой стиль общения с клиентом наиболее эффективен?',
    type: 'single',
    difficulty: 'basic',
    options: [
      'Эмоционально вовлечённый — «Я тоже переживаю за вашу ситуацию»',
      'Профессионально нейтральный — «Ваш запрос зарегистрирован, ответ пришлю в течение 3 дней»',
      'Эмпатичный, но чёткий — «Я понимаю, что это важно для вас. Вот что мы можем сделать и когда»',
      'Дружеский — «Привет, как дела? Давайте решим ваш вопрос»'
    ],
    correct: 2
  },
  {
    id: 6,
    question: 'Что важно проверить перед началом работы с новым клиентом?',
    type: 'multiple',
    difficulty: 'basic',
    options: [
      'Наличие паспорта или идентификатора',
      'Согласие на обработку персональных данных',
      'Уровень дохода клиента',
      'Чёткое понимание, что он хочет получить',
      'Наличие у клиента аккаунта в вашей системе'
    ],
    correct: [0, 1, 3]
  },
  {
    id: 7,
    question: 'Клиент ведёт себя агрессивно, кричит, угрожает отзывом. Что вы делаете?',
    type: 'single',
    difficulty: 'basic',
    options: [
      'Отвечаете: «Я понимаю ваше раздражение — давайте разберёмся»',
      'Молчите, пока он не закончит — потом говорите: «Спасибо за обратную связь — я передам это команде»',
      'Говорите: «Если вы так разговариваете, я не могу вам помогать»',
      'Переводите звонок на руководителя и пишете: «Клиент неадекватен — передаю на усмотрение»'
    ],
    correct: 1
  },
  {
    id: 8,
    question: 'Клиент просит сделать исключение — нарушить внутренний процесс компании. Что вы делаете?',
    type: 'single',
    difficulty: 'basic',
    options: [
      'Отказываете: «Так нельзя — это правила»',
      'Говорите: «Я не могу, но могу предложить альтернативу — вот что мы можем сделать»',
      'Говорите: «Я не могу, потому что это против правил»',
      'Молчите — и ничего не делаете'
    ],
    correct: 1
  },
  {
    id: 9,
    question: 'Какие основные условия должны выполняться, чтобы физическое лицо могло подать заявление о банкротстве в России?',
    type: 'single',
    difficulty: 'advanced',
    options: [
      'Должен быть долг более 100 000 рублей и просрочка более 3 месяцев',
      'Должен быть долг более 500 000 рублей и просрочка более 3 месяцев',
      'Должен быть долг более 1 000 000 рублей',
      'Должен быть долг более 500 000 рублей и отсутствие возможности его погасить'
    ],
    correct: 3
  },
  {
    id: 10,
    question: 'Какие документы клиент должен предоставить на начальном этапе?',
    type: 'multiple',
    difficulty: 'advanced',
    options: [
      'Паспорт',
      'СНИЛС',
      'Выписка из ЕГРИП',
      'Список кредиторов с долгами (по всем займам)',
      'Справка о доходах за последние 3 месяца',
      'Договоры с банками и МФО',
      'Выписка из Росреестра (о недвижимости)'
    ],
    correct: [0, 1, 3, 5, 6]
  },
  {
    id: 11,
    question: 'Что НЕЛЬЗЯ делать менеджеру при общении с клиентом на этапе сбора документов?',
    type: 'multiple',
    difficulty: 'advanced',
    options: [
      'Обещать, что банкротство отменит все долги',
      'Рекомендовать клиенту не платить кредиты до подачи заявления',
      'Объяснять, что арест имущества возможен',
      'Говорить, что суд автоматически отменит штрафы и пени',
      'Предлагать клиенту подписать договор только после проверки всех документов'
    ],
    correct: [0, 1, 3]
  },
  {
    id: 12,
    question: 'Клиент спрашивает: «А если я подам на банкротство — меня лишат зарплаты?»',
    type: 'single',
    difficulty: 'advanced',
    options: [
      'Да, все доходы будут арестованы — это закон',
      'Нет, зарплата не арестовывается — только если она не превышает МРОТ в месяц',
      'Нет, зарплата защищена — даже если она выше МРОТ, её не трогают, если это основной источник дохода',
      'Зависит от судьи — иногда да, иногда нет'
    ],
    correct: 2
  },
  {
    id: 13,
    question: 'Клиент хочет подать заявление, но у него есть квартира в ипотеке. Что вы говорите?',
    type: 'single',
    difficulty: 'advanced',
    options: [
      'Ипотека — это не проблема, банкротство всё отменит',
      'Ипотека не списывается — вам нужно сначала договориться с банком',
      'Ипотека может быть списана, если квартира — единственное жильё и вы не платите уже 3 месяца',
      'Ипотека — это залог, и банк может потребовать продажи квартиры, но суд может защитить её, если она единственное жильё'
    ],
    correct: 3
  },
  {
    id: 14,
    question: 'Клиент не знает, кто его кредиторы. Что вы предлагаете?',
    type: 'multiple',
    difficulty: 'advanced',
    options: [
      'Самостоятельно звоните всем банкам — мы не можем за вас',
      'Запросите выписку по кредитной истории через ЦБ РФ',
      'Соберите все письма и смс — и мы сами разберёмся',
      'Подайте заявление без списка — суд сам запросит'
    ],
    correct: [1, 2]
  },
  {
    id: 15,
    question: 'Клиент спрашивает: «А если я банкрот — мне запретят выезжать за границу?»',
    type: 'single',
    difficulty: 'advanced',
    options: [
      'Да, сразу после подачи заявления',
      'Нет, запрета нет — только если есть задолженность по алиментам или штрафам',
      'Да, если долг больше 30 000 рублей',
      'Запрет может наложить суд — но только на стадии исполнительного производства, а не банкротства'
    ],
    correct: 1
  },
  {
    id: 16,
    question: 'Клиент пришёл с долгами по кредитам и алиментам. Он хочет, чтобы банкротство «списало и то, и другое». Что вы отвечаете?',
    type: 'single',
    difficulty: 'advanced',
    options: [
      'Да, всё списывается — алименты тоже',
      'Нет, алименты нельзя списать — только кредиты',
      'Алименты списываются, только если суд признает их незаконными',
      'Алименты не списываются, но суд может их снизить'
    ],
    correct: 1
  },
  {
    id: 17,
    question: 'Клиент требует: «Я хочу подать на банкротство завтра». Что вы отвечаете?',
    type: 'single',
    difficulty: 'advanced',
    options: [
      'Хорошо, мы всё подготовим — давайте назначим завтра',
      'Мы не можем так быстро — нужно собрать все документы и подготовить заявление',
      'Подача — это долгий процесс. Обычно это занимает 1-3 недели, потому что нужно проверить все документы, списки кредиторов и составить юридически правильное заявление',
      'Мы подадим завтра, но это будет стоить дороже — срочность — это допуслуга'
    ],
    correct: 2
  },
  {
    id: 18,
    question: 'Клиент говорит: «Мне сказали, что после банкротства я не смогу брать кредиты 5 лет — это правда?»',
    type: 'single',
    difficulty: 'advanced',
    options: [
      'Да, это правда — суд запретит вам кредиты',
      'Нет, это неправда — вы можете брать кредиты сразу',
      'Да, но только на сумму до 100 000 рублей',
      'Да, это так — но запрет действует только на кредиты свыше 100 000 рублей, и вы обязаны сообщать банку о банкротстве'
    ],
    correct: 3
  },
  {
    id: 19,
    question: 'Клиент спрашивает: «А если у меня долг перед ФНС — его тоже можно списать?»',
    type: 'single',
    difficulty: 'advanced',
    options: [
      'Да, все долги списываются — в том числе налоги',
      'Нет, долги перед ФНС не списываются',
      'Долги перед ФНС не списываются — но суд может их реструктуризировать',
      'Долги перед ФНС можно списать только если у вас нет имущества'
    ],
    correct: 1
  },
  {
    id: 20,
    question: 'Клиент хочет скрыть доход от финансового управляющего. Что вы говорите?',
    type: 'single',
    difficulty: 'advanced',
    options: [
      'Говорите: «Это ваше право — я ничего не скажу»',
      'Предупреждаете: «Это уголовное преступление — я не могу участвовать в этом, и я должен сообщить об этом»',
      'Говорите: «Я не знаю — спросите у юриста»',
      'Молчите и делаете вид, что не слышали'
    ],
    correct: 1
  }
];

export default function TestErje() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | number[]>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [userName, setUserName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSingleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleMultipleAnswer = (questionId: number, optionIndex: number, checked: boolean) => {
    const current = (answers[questionId] as number[]) || [];
    if (checked) {
      setAnswers({ ...answers, [questionId]: [...current, optionIndex] });
    } else {
      setAnswers({ ...answers, [questionId]: current.filter((i) => i !== optionIndex) });
    }
  };

  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    let correctCount = 0;
    const detailedResults: Record<string, string> = {};

    questions.forEach((q) => {
      const userAnswer = answers[q.id];
      const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(q.correct);
      
      if (isCorrect) correctCount++;

      const userAnswerText = q.type === 'single' 
        ? q.options[userAnswer as number] || 'Не ответил'
        : (userAnswer as number[])?.map(i => q.options[i]).join(', ') || 'Не ответил';

      detailedResults[`Вопрос ${q.id}: ${q.question}`] = userAnswerText;
    });

    return { correctCount, detailedResults };
  };

  const handleSubmit = async () => {
    if (!userName.trim()) {
      toast({
        title: 'Введите имя',
        description: 'Пожалуйста, укажите ваше имя перед отправкой',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);
    const { correctCount, detailedResults } = calculateResults();

    const result = await sendContactForm({
      type: 'quiz',
      name: userName,
      email: 'test@glavbuhvl.ru',
      phone: '-',
      message: `Результат теста: ${correctCount} из ${questions.length} правильных ответов (${Math.round((correctCount / questions.length) * 100)}%)`,
      quizResults: detailedResults
    });

    setIsSending(false);

    if (result.success) {
      toast({
        title: 'Тест отправлен!',
        description: 'Ваши результаты успешно отправлены. Спасибо за прохождение теста!',
      });
    } else {
      toast({
        title: 'Ошибка',
        description: result.error || 'Не удалось отправить результаты',
        variant: 'destructive',
      });
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ?.id];

  if (isFinished) {
    const { correctCount } = calculateResults();
    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Icon name="CheckCircle2" size={40} className="text-emerald-600" />
              </div>
              <CardTitle className="text-3xl">Тест завершён!</CardTitle>
              <CardDescription>Введите ваше имя и отправьте результаты</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-emerald-50 p-6 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-2">Ваш результат:</p>
                <p className="text-5xl font-bold text-emerald-600">{percentage}%</p>
                <p className="text-gray-600 mt-2">{correctCount} из {questions.length} правильных ответов</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userName">Ваше имя</Label>
                <Input
                  id="userName"
                  placeholder="Введите ваше имя"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleSubmit} 
                  className="flex-1"
                  disabled={isSending}
                >
                  {isSending ? 'Отправка...' : 'Отправить результаты'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsFinished(false);
                    setCurrentQuestion(0);
                    setAnswers({});
                    setUserName('');
                  }}
                >
                  Пройти заново
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Тест для менеджеров</h1>
            <span className="text-sm text-gray-600">
              Вопрос {currentQuestion + 1} из {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-bold">{currentQuestion + 1}</span>
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{currentQ.question}</CardTitle>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    currentQ.difficulty === 'basic' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {currentQ.difficulty === 'basic' ? 'Базовый' : 'Продвинутый'}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                    {currentQ.type === 'single' ? 'Один ответ' : 'Несколько ответов'}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentQ.type === 'single' ? (
              <RadioGroup
                value={currentAnswer?.toString() || ''}
                onValueChange={(value) => handleSingleAnswer(currentQ.id, parseInt(value))}
              >
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        currentAnswer === index
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                      }`}
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-0.5" />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer leading-relaxed">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      (currentAnswer as number[])?.includes(index)
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    <Checkbox
                      id={`option-${index}`}
                      checked={(currentAnswer as number[])?.includes(index) || false}
                      onCheckedChange={(checked) =>
                        handleMultipleAnswer(currentQ.id, index, checked as boolean)
                      }
                      className="mt-0.5"
                    />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer leading-relaxed">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={goToPrevious}
                disabled={currentQuestion === 0}
              >
                <Icon name="ChevronLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <Button
                onClick={goToNext}
                disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
              >
                {currentQuestion === questions.length - 1 ? 'Завершить' : 'Далее'}
                <Icon name="ChevronRight" size={16} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
