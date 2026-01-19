import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

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
      'Нет, алименты не списываются — это закон, даже при банкротстве',
      'Алименты можно списать, если они старше 3 лет',
      'Зависит от судьи — иногда списывают, иногда нет'
    ],
    correct: 1
  },
  {
    id: 17,
    question: 'Клиент уже прошёл банкротство, но через год снова накопил долги. Может ли он подать на банкротство повторно?',
    type: 'single',
    difficulty: 'advanced',
    options: [
      'Нет, только один раз в жизни',
      'Да, но только через 5 лет после завершения предыдущего банкротства',
      'Да, без ограничений — каждый раз, когда долги накопятся',
      'Да, но только если долг превышает 1 млн рублей'
    ],
    correct: 1
  }
];

export default function TestErje() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | number[]>>({});
  const [finished, setFinished] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState<'all' | 'basic' | 'advanced'>('all');

  const filteredQuestions = questions.filter(q => 
    showDifficulty === 'all' || q.difficulty === showDifficulty
  );

  const handleStart = (difficulty: 'all' | 'basic' | 'advanced') => {
    setShowDifficulty(difficulty);
    setStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setFinished(false);
  };

  const handleAnswer = (value: number | number[]) => {
    setAnswers({ ...answers, [filteredQuestions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    filteredQuestions.forEach(q => {
      const userAnswer = answers[q.id];
      if (q.type === 'single') {
        if (userAnswer === q.correct) correct++;
      } else {
        const correctAnswers = q.correct as number[];
        const userAnswers = userAnswer as number[];
        if (userAnswers && 
            correctAnswers.length === userAnswers.length &&
            correctAnswers.every(a => userAnswers.includes(a))) {
          correct++;
        }
      }
    });
    return { correct, total: filteredQuestions.length };
  };

  const getGrade = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return { text: 'Отлично', color: 'text-green-600', emoji: '🎉' };
    if (percentage >= 75) return { text: 'Хорошо', color: 'text-blue-600', emoji: '✅' };
    if (percentage >= 60) return { text: 'Удовлетворительно', color: 'text-yellow-600', emoji: '📝' };
    return { text: 'Требуется доработка', color: 'text-red-600', emoji: '📚' };
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 shadow-xl">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <Icon name="ClipboardCheck" size={64} className="text-green-600" />
              </div>
              <CardTitle className="text-4xl font-bold text-gray-900">
                Тестирование кандидатов
              </CardTitle>
              <CardDescription className="text-lg">
                Проверка знаний менеджера по работе с клиентами и банкротству
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <Button 
                  onClick={() => handleStart('all')} 
                  size="lg" 
                  className="h-20 text-lg bg-green-600 hover:bg-green-700"
                >
                  <Icon name="Target" className="mr-2" size={24} />
                  Полный тест (18 вопросов)
                </Button>
                
                <Button 
                  onClick={() => handleStart('basic')} 
                  size="lg" 
                  variant="outline"
                  className="h-20 text-lg border-2"
                >
                  <Icon name="User" className="mr-2" size={24} />
                  Базовый уровень (8 вопросов)
                </Button>
                
                <Button 
                  onClick={() => handleStart('advanced')} 
                  size="lg" 
                  variant="outline"
                  className="h-20 text-lg border-2"
                >
                  <Icon name="Award" className="mr-2" size={24} />
                  Продвинутый уровень (10 вопросов)
                </Button>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Icon name="Info" className="mr-2" />
                  О тестировании
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <Icon name="Check" className="mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span><strong>Базовый уровень:</strong> Навыки общения с клиентами, конфликты, документы</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" className="mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span><strong>Продвинутый уровень:</strong> Законодательство о банкротстве, процедуры, юридические нюансы</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" className="mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Некоторые вопросы имеют несколько правильных ответов</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" className="mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Результаты показываются сразу после завершения</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (finished) {
    const { correct, total } = calculateScore();
    const grade = getGrade(correct, total);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 shadow-xl">
            <CardHeader className="text-center space-y-4">
              <div className="text-6xl">{grade.emoji}</div>
              <CardTitle className="text-3xl font-bold">Тестирование завершено!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`text-5xl font-bold mb-2 ${grade.color}`}>
                  {correct} / {total}
                </div>
                <div className={`text-2xl font-semibold ${grade.color}`}>
                  {grade.text}
                </div>
                <div className="text-gray-600 mt-2">
                  {Math.round((correct / total) * 100)}% правильных ответов
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="font-semibold text-lg">Результаты по вопросам:</h3>
                {filteredQuestions.map((q, idx) => {
                  const userAnswer = answers[q.id];
                  let isCorrect = false;
                  
                  if (q.type === 'single') {
                    isCorrect = userAnswer === q.correct;
                  } else {
                    const correctAnswers = q.correct as number[];
                    const userAnswers = userAnswer as number[] || [];
                    isCorrect = correctAnswers.length === userAnswers.length &&
                                correctAnswers.every(a => userAnswers.includes(a));
                  }

                  return (
                    <div key={q.id} className="p-4 bg-white rounded-lg border">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">Вопрос {idx + 1}:</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              q.difficulty === 'basic' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                              {q.difficulty === 'basic' ? 'Базовый' : 'Продвинутый'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{q.question}</p>
                        </div>
                        <div>
                          {isCorrect ? (
                            <Icon name="CheckCircle" className="text-green-600" size={24} />
                          ) : (
                            <Icon name="XCircle" className="text-red-600" size={24} />
                          )}
                        </div>
                      </div>
                      {!isCorrect && (
                        <div className="mt-3 text-sm">
                          <div className="text-red-600 mb-1">
                            <strong>Правильный ответ:</strong>
                          </div>
                          {q.type === 'single' ? (
                            <div className="text-green-700 bg-green-50 p-2 rounded">
                              {q.options[q.correct as number]}
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {(q.correct as number[]).map(idx => (
                                <div key={idx} className="text-green-700 bg-green-50 p-2 rounded">
                                  {q.options[idx]}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4 mt-8">
                <Button onClick={() => setStarted(false)} className="flex-1" variant="outline">
                  <Icon name="Home" className="mr-2" />
                  Начать заново
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = filteredQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm px-3 py-1 rounded-full ${
                question.difficulty === 'basic' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {question.difficulty === 'basic' ? 'Базовый уровень' : 'Продвинутый уровень'}
              </span>
              <span className="text-sm text-gray-600">
                Вопрос {currentQuestion + 1} из {filteredQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="text-xl">{question.question}</CardTitle>
            {question.type === 'multiple' && (
              <CardDescription className="text-amber-600 font-medium">
                Возможно несколько правильных ответов
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {question.type === 'single' ? (
              <RadioGroup
                value={answers[question.id]?.toString()}
                onValueChange={(value) => handleAnswer(parseInt(value))}
              >
                <div className="space-y-3">
                  {question.options.map((option, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-4 rounded-lg border-2 hover:border-green-300 transition-colors">
                      <RadioGroupItem value={idx.toString()} id={`q${question.id}-${idx}`} />
                      <Label htmlFor={`q${question.id}-${idx}`} className="flex-1 cursor-pointer leading-relaxed">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <div className="space-y-3">
                {question.options.map((option, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-4 rounded-lg border-2 hover:border-green-300 transition-colors">
                    <Checkbox
                      id={`q${question.id}-${idx}`}
                      checked={(answers[question.id] as number[] || []).includes(idx)}
                      onCheckedChange={(checked) => {
                        const current = (answers[question.id] as number[]) || [];
                        if (checked) {
                          handleAnswer([...current, idx]);
                        } else {
                          handleAnswer(current.filter(i => i !== idx));
                        }
                      }}
                    />
                    <Label htmlFor={`q${question.id}-${idx}`} className="flex-1 cursor-pointer leading-relaxed">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                variant="outline"
                className="flex-1"
              >
                <Icon name="ChevronLeft" className="mr-2" />
                Назад
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[question.id]}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {currentQuestion === filteredQuestions.length - 1 ? (
                  <>
                    Завершить
                    <Icon name="Check" className="ml-2" />
                  </>
                ) : (
                  <>
                    Далее
                    <Icon name="ChevronRight" className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
