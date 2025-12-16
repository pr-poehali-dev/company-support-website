import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import Quiz from '@/components/Quiz';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0');
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const mainServices = [
    {
      icon: 'Calculator',
      title: 'Комплексный бухгалтерский учет',
      description: 'Полное ведение бухгалтерии с нуля до сдачи отчетности',
      gradient: 'from-emerald-50 to-green-50'
    },
    {
      icon: 'Users',
      title: 'Аутсорсинг бухгалтерии',
      description: 'Передайте бухгалтерию профессионалам и экономьте время',
      gradient: 'from-green-50 to-teal-50'
    },
    {
      icon: 'Scale',
      title: 'Юридические услуги',
      description: 'Правовая поддержка и защита интересов вашего бизнеса',
      gradient: 'from-teal-50 to-cyan-50'
    },
    {
      icon: 'Sparkles',
      title: 'Внедрение Bitrix24',
      description: 'Автоматизация бизнес-процессов и CRM',
      gradient: 'from-cyan-50 to-emerald-50'
    }
  ];

  const additionalServices = [
    {
      icon: 'CreditCard',
      title: 'Покупка онлайн-кассы',
      description: 'Купить и зарегистрировать онлайн-кассу, вы также можете сделать это в нашей компании'
    },
    {
      icon: 'FileSignature',
      title: 'Изготовление ЭЦП за 1 день',
      description: 'Электронную подпись для документооборота (ЭДО), участия в торгах, ЕГАИС и другие'
    },
    {
      icon: 'Building2',
      title: 'Открытие расчётного счёта',
      description: 'Всем нашим клиентам оказываем бесплатную помощь в открытие расчетного счета в банке'
    },
    {
      icon: 'Rocket',
      title: 'Регистрация бизнеса под ключ',
      description: 'Помощь в выборе формы собственности, подбор системы налогообложения, сдача отчетности в ФНС'
    },
    {
      icon: 'FileEdit',
      title: 'Внесение изменений в ЕГРЮЛ',
      description: 'Смена юридического адреса, наименования, директора, кодов ОКВЭД и др.'
    },
    {
      icon: 'Trash2',
      title: 'Ликвидация ООО',
      description: 'Ликвидируем ваше ООО электронно. Все заботы мы возьмем на себя'
    }
  ];

  const achievements = [
    { 
      image: 'https://cdn-ru.bitrix24.ru/b26317548/landing/731/731b9ef6769d21c803b7102ce2ebed68/assotsiatsiya_1x.jpg', 
      alt: 'Членство в ассоциации'
    },
    { 
      image: 'https://cdn-ru.bitrix24.ru/b26317548/landing/07c/07c40fafa17c3f0a7579b8fa2ba3da9c/izm_21g_1x.jpg', 
      alt: 'Сертификат 2021'
    },
    { 
      image: 'https://cdn-ru.bitrix24.ru/b26317548/landing/fb6/fb624d4205bc1328fd740476cc85da83/izm_v_zakonod_2x.jpg', 
      alt: 'Изменения в законодательстве'
    }
  ];

  const guarantees = [
    {
      icon: 'FileText',
      title: 'Подготовку документации во все контролирующие органы',
      description: 'Подготавливаем отчетность в ФНС, рассчитываем взносы в ФСС, формируем отчеты для Росстата, составляем бухгалтерский баланс и отчет о финансовых результатах.'
    },
    {
      icon: 'FileCheck',
      title: 'Подготовку первичной документации',
      description: 'Сформируем и отправим все необходимые документы: от платежного поручения до счет-фактуры.'
    },
    {
      icon: 'TrendingDown',
      title: 'Помощь в снижении налоговой нагрузки',
      description: 'Ищем доступные способы снижения налоговой нагрузки — через получение налоговых льгот, субсидий, преференций, грантов. Тем, кто только регистрирует свой бизнес, подскажем, какую стратегию ведения дел лучше выбрать.'
    },
    {
      icon: 'MessageCircle',
      title: 'Консультации специалистов',
      description: 'Мы ответим на любые вопросы, связанные с бухучетом и налогообложением.'
    },
    {
      icon: 'Users',
      title: 'Кадровый учет',
      description: 'Берем на себя обязанности кадровой службы: от приема сотрудников на работу до их увольнения, включая ведение всей документации отдела по работе с персоналом.'
    },
    {
      icon: 'DollarSign',
      title: 'Расчет зарплаты',
      description: 'Мы не только начислим зарплату, но и рассчитаем обязательные отчисления в госфонды.'
    }
  ];

  const testimonials = [
    {
      name: 'Михаил Петров',
      company: 'ООО "Альфа Трейдинг"',
      text: 'Работаем с компанией уже 3 года. Профессиональный подход, оперативность и внимание к деталям. Все отчеты сдаются вовремя, никаких проблем с налоговой.',
      rating: 5
    },
    {
      name: 'Елена Соколова',
      company: 'ИП Соколова Е.А.',
      text: 'Отличная команда специалистов! Помогли оптимизировать налоги и настроить учет с нуля. Очень довольна сотрудничеством, рекомендую.',
      rating: 5
    },
    {
      name: 'Дмитрий Волков',
      company: 'ООО "СтройИнвест"',
      text: 'Юристы компании помогли выиграть сложный арбитражный спор. Бухгалтеры грамотно ведут учет. Профессионалы своего дела!',
      rating: 5
    }
  ];

  const teamInfo = {
    image: 'https://cdn-ru.bitrix24.ru/b26317548/landing/f73/f73d75883000aca79b7f224dc4a0e588/komanda_2x.jpg',
    title: 'Наша команда',
    description: 'Команда ГЛАВБУХВЛ — это опытные профессионалы с многолетним опытом в сфере бухгалтерии и юриспруденции. Мы гордимся нашими специалистами, которые постоянно совершенствуют свои знания и следят за всеми изменениями в законодательстве.',
    features: [
      {
        icon: 'GraduationCap',
        title: 'Высокая квалификация',
        text: 'Аттестованные бухгалтеры и юристы с профессиональными сертификатами'
      },
      {
        icon: 'BookOpen',
        title: 'Постоянное обучение',
        text: 'Регулярное повышение квалификации и участие в профессиональных семинарах'
      },
      {
        icon: 'Target',
        title: 'Индивидуальный подход',
        text: 'Каждый клиент получает персонального менеджера и команду специалистов'
      },
      {
        icon: 'Shield',
        title: 'Ответственность',
        text: 'Полная материальная ответственность за качество оказываемых услуг'
      },
      {
        icon: 'Clock',
        title: 'Оперативность',
        text: 'Быстрое реагирование на запросы и оперативное решение задач'
      },
      {
        icon: 'Heart',
        title: 'Любовь к делу',
        text: 'Мы любим свою работу и дорожим доверием каждого клиента'
      }
    ]
  };

  const leadMagnets = [
    {
      icon: 'FileText',
      title: 'Чек-лист по налогам',
      description: 'Полный список всех налогов и сроков уплаты для ИП и ООО',
      gradient: 'from-blue-50 to-indigo-50',
      downloadUrl: '#'
    },
    {
      icon: 'Calculator',
      title: 'Калькулятор налогов',
      description: 'Рассчитайте налоговую нагрузку для разных режимов налогообложения',
      gradient: 'from-purple-50 to-pink-50',
      downloadUrl: '#'
    },
    {
      icon: 'BookOpen',
      title: 'Гайд по отчётности',
      description: 'Какие отчёты и когда нужно сдавать в 2024 году',
      gradient: 'from-green-50 to-emerald-50',
      downloadUrl: '#'
    },
    {
      icon: 'Shield',
      title: 'Как избежать штрафов',
      description: 'Топ-10 ошибок, которые приводят к штрафам от налоговой',
      gradient: 'from-orange-50 to-red-50',
      downloadUrl: '#'
    }
  ];

  const quizzes = [
    {
      title: 'Какой режим налогообложения выбрать?',
      description: 'Узнайте оптимальную систему налогов для вашего бизнеса',
      icon: 'Calculator',
      gradient: 'from-purple-50 to-pink-50',
      questions: [
        {
          question: 'Какая у вас организационная форма?',
          options: ['ИП', 'ООО', 'Ещё не зарегистрировал', 'Самозанятый']
        },
        {
          question: 'Какой планируемый годовой доход?',
          options: ['До 2,4 млн руб', '2,4-60 млн руб', '60-150 млн руб', 'Более 150 млн руб']
        },
        {
          question: 'Сколько планируете сотрудников?',
          options: ['Работаю один', 'До 5 человек', '5-100 человек', 'Более 100 человек']
        }
      ],
      onComplete: (answers: number[]) => {
        if (answers[0] === 3) {
          return 'Режим самозанятости (НПД)\n\nОтличный вариант для старта! 4-6% налог, никакой отчётности, всё через приложение. Подходит, если работаете один и доход до 2,4 млн руб/год.';
        }
        if (answers[1] === 0) {
          return 'УСН Доходы 6%\n\nСамый простой режим! Платите 6% с дохода, минимум отчётности. Идеально для малого бизнеса с небольшими расходами.';
        }
        if (answers[1] === 1 && answers[2] <= 1) {
          return 'УСН Доходы минус расходы 15%\n\nВыгодно, если расходы составляют более 60% от доходов. Можно снизить налоги, но нужно подтверждать все расходы документами.';
        }
        return 'ОСНО (общая система)\n\nПодходит для крупного бизнеса. НДС 20%, налог на прибыль 20%. Больше отчётности, но возможность работать с крупными компаниями-плательщиками НДС.';
      }
    }
  ];

  const faqItems = [
    {
      question: 'Какие документы нужны для начала работы?',
      answer: 'Для начала сотрудничества потребуются: свидетельство о регистрации компании/ИП, устав, приказ о назначении директора, данные о банковских счетах и текущие бухгалтерские документы (если велся учет ранее).'
    },
    {
      question: 'Какова стоимость ваших услуг?',
      answer: 'Стоимость зависит от объема операций, режима налогообложения и состава услуг. Для ИП на УСН без сотрудников - от 5 000 руб/мес. Для ООО - от 15 000 руб/мес. Точный расчет делаем после анализа вашего бизнеса.'
    },
    {
      question: 'Как быстро можно начать сотрудничество?',
      answer: 'После подписания договора мы начинаем работу в течение 1-2 рабочих дней. Передачу дел от предыдущего бухгалтера организуем за 3-5 дней.'
    },
    {
      question: 'Какие гарантии вы предоставляете?',
      answer: 'Мы несем полную материальную ответственность за свою работу, что закреплено в договоре. Имеем страхование профессиональной ответственности на сумму до 5 млн рублей.'
    },
    {
      question: 'Как происходит обмен документами?',
      answer: 'Работаем в удобном для вас формате: электронный документооборот через защищенные каналы связи, курьерская доставка или личные встречи в офисе. Используем современные системы ЭДО.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    setConsultationOpen(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="https://cdn.poehali.dev/projects/9640ad64-a924-4999-b70e-fff331ba6330/files/35aa1de6-567d-4412-ab88-2ea062fb35de.jpg" alt="ГЛАВБУХВЛ" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            <div>
              <h1 className="text-xl md:text-2xl font-heading font-bold text-secondary">ГЛАВБУХВЛ</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Бухгалтерия & Юриспруденция</p>
            </div>
          </div>
          <nav className="hidden lg:flex gap-6">
            <a href="#about" onClick={(e) => smoothScroll(e, 'about')} className="text-sm font-medium hover:text-primary transition-colors">О нас</a>
            <a href="#services" onClick={(e) => smoothScroll(e, 'services')} className="text-sm font-medium hover:text-primary transition-colors">Услуги</a>
            <a href="#achievements" onClick={(e) => smoothScroll(e, 'achievements')} className="text-sm font-medium hover:text-primary transition-colors">Достижения</a>
            <a href="#guarantees" onClick={(e) => smoothScroll(e, 'guarantees')} className="text-sm font-medium hover:text-primary transition-colors">Гарантии</a>
            <a href="#testimonials" onClick={(e) => smoothScroll(e, 'testimonials')} className="text-sm font-medium hover:text-primary transition-colors">Отзывы</a>
            <a href="#team" onClick={(e) => smoothScroll(e, 'team')} className="text-sm font-medium hover:text-primary transition-colors">Команда</a>
            <a href="#resources" onClick={(e) => smoothScroll(e, 'resources')} className="text-sm font-medium hover:text-primary transition-colors">Материалы</a>
            <a href="#quizzes" onClick={(e) => smoothScroll(e, 'quizzes')} className="text-sm font-medium hover:text-primary transition-colors">Тесты</a>
            <a href="#faq" onClick={(e) => smoothScroll(e, 'faq')} className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
            <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button className="hidden md:inline-flex bg-primary hover:bg-primary/90" onClick={() => setConsultationOpen(true)}>Консультация</Button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <nav className="flex flex-col gap-3 mt-8 max-h-[calc(100vh-120px)] overflow-y-auto">
                  <a href="#about" onClick={(e) => { smoothScroll(e, 'about'); setMobileMenuOpen(false); }} className="text-base font-medium hover:text-primary transition-colors py-2">О нас</a>
                  <a href="#services" onClick={(e) => { smoothScroll(e, 'services'); setMobileMenuOpen(false); }} className="text-base font-medium hover:text-primary transition-colors py-2">Услуги</a>
                  <a href="#achievements" onClick={(e) => { smoothScroll(e, 'achievements'); setMobileMenuOpen(false); }} className="text-base font-medium hover:text-primary transition-colors py-2">Достижения</a>
                  <a href="#guarantees" onClick={(e) => { smoothScroll(e, 'guarantees'); setMobileMenuOpen(false); }} className="text-base font-medium hover:text-primary transition-colors py-2">Гарантии</a>
                  <a href="#testimonials" onClick={(e) => { smoothScroll(e, 'testimonials'); setMobileMenuOpen(false); }} className="text-base font-medium hover:text-primary transition-colors py-2">Отзывы</a>
                  <a href="#team" onClick={(e) => { smoothScroll(e, 'team'); setMobileMenuOpen(false); }} className="text-base font-medium hover:text-primary transition-colors py-2">Команда</a>
                  <a href="#resources" onClick={(e) => { smoothScroll(e, 'resources'); setMobileMenuOpen(false); }} className="text-base font-medium hover:text-primary transition-colors py-2">Материалы</a>
                  <a href="#quizzes" onClick={(e) => { smoothScroll(e, 'quizzes'); setMobileMenuOpen(false); }} className="text-base font-medium hover:text-primary transition-colors py-2">Тесты</a>
                  <a href="#faq" onClick={(e) => { smoothScroll(e, 'faq'); setMobileMenuOpen(false); }} className="text-base font-medium hover:text-primary transition-colors py-2">FAQ</a>
                  <a href="#contact" onClick={(e) => { smoothScroll(e, 'contact'); setMobileMenuOpen(false); }} className="text-base font-medium hover:text-primary transition-colors py-2">Контакты</a>
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90" onClick={() => { setMobileMenuOpen(false); setConsultationOpen(true); }}>Консультация</Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-secondary via-emerald-700 to-primary text-white py-8 md:py-24 animate-fade-in overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6">
                Комплексное сопровождение вашего бизнеса
              </h2>
              <p className="text-base md:text-xl mb-6 md:mb-8 text-white/90">
                Профессиональные решения по бухгалтерскому учету и юридическим вопросам во Владивостоке. 
                Работаем с 2010 года. Более 200 компаний доверяют нам свой бизнес.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                <Button size="lg" variant="secondary" className="text-base md:text-lg w-full sm:w-auto" onClick={() => setConsultationOpen(true)}>
                  <Icon name="Phone" size={20} className="mr-2" />
                  Получить консультацию
                </Button>
                <Button size="lg" variant="outline" className="text-base md:text-lg bg-white/10 text-white border-white hover:bg-white hover:text-secondary w-full sm:w-auto" onClick={() => setServicesOpen(true)}>
                  <Icon name="FileText" size={20} className="mr-2" />
                  Наши услуги
                </Button>
              </div>
              <div className="mt-6 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-8">
                <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform duration-300">
                    <Icon name="Award" size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold">15+</div>
                    <div className="text-xs md:text-sm text-white/80">лет на рынке</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform duration-300">
                    <Icon name="Users" size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold">200+</div>
                    <div className="text-xs md:text-sm text-white/80">довольных клиентов</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform duration-300">
                    <Icon name="CheckCircle" size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold">100%</div>
                    <div className="text-xs md:text-sm text-white/80">без штрафов от налоговой</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://cdn-ru.bitrix24.ru/b26317548/landing/48e/48effbe688797568a4a685e290e67cdf/photo_75_2x.jpg" 
                  alt="Офис ГЛАВБУХВЛ"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-8 md:py-20 bg-gradient-to-br from-green-50 to-emerald-50 scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-3 md:mb-4">О нас</h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Мы предоставляем полный спектр бухгалтерских услуг
              </p>
            </div>
            <Card className="shadow-lg border-none">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-foreground/90">
                    <strong className="text-primary">Оказание бухгалтерских услуг предполагает:</strong>
                  </p>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {[
                      'Полный или частичный аутсорсинг',
                      'Ведение кадрового, налогового и упр. учета',
                      'Составление отчетности, в том числе для компаний, временно приостановивших работу',
                      'Оказание бухгалтерских услуг в период проверок',
                      'Налоговый консалтинг',
                      'Проведение аудиторских проверок и многое другое'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                        <Icon name="CheckCircle" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                    <p className="text-foreground/90 leading-relaxed mb-4">
                      Наши специалисты организуют восстановление учета, устранят системные ошибки, 
                      а также обеспечат внутренний контроль движения ценностей.
                    </p>
                    <p className="text-foreground/90 leading-relaxed mb-4">
                      Услуги бухгалтера во Владивостоке предоставляются не только в офисе компании, 
                      но так же работаем и удаленно.
                    </p>
                    <p className="text-primary font-semibold">
                      Современный подход существенно повышает уровень конфиденциальности.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-10 md:py-20 bg-white scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16 animate-slide-up">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">ЧТО МЫ ПРЕДЛАГАЕМ</p>
            <h2 className="text-4xl font-heading font-bold text-secondary mb-4">Ваши цели — наш приоритет</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Сосредоточьтесь на развитии бизнеса, а бухгалтерию доверьте ГЛАВБУХВЛ. 
              Мы предлагаем комплексные бухгалтерские услуги, своевременную сдачу отчетов 
              и защиту от штрафов, чтобы вы могли экономить время и деньги.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {mainServices.map((service, index) => (
              <Card 
                key={index} 
                className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none bg-gradient-to-br ${service.gradient} overflow-hidden relative group`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardHeader className="relative">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={service.icon as any} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl font-heading">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          <div className="mt-16">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-3 md:mb-4">Виды услуг</h3>
              <p className="text-lg text-muted-foreground">
                Мы предоставляем широкий спектр услуг для наших клиентов
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              {additionalServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={service.icon as any} size={24} className="text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-heading mb-2">{service.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="max-w-4xl mx-auto mt-8 md:mt-16">
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 shadow-xl">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                      <Icon name="Sparkles" size={32} className="text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-4">
                      Не нашли нужную услугу?
                    </h3>
                    <p className="text-lg text-muted-foreground mb-8">
                      Оставьте заявку, и мы подберём индивидуальное решение для вашего бизнеса
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg" onClick={() => setConsultationOpen(true)}>
                        <Icon name="MessageCircle" size={20} className="mr-2" />
                        Оставить заявку
                      </Button>
                      <Button size="lg" variant="outline" className="text-lg border-2" onClick={() => setQuizOpen(true)}>
                        <Icon name="HelpCircle" size={20} className="mr-2" />
                        Пройти тест
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="py-10 md:py-20 bg-gradient-to-br from-emerald-50 to-green-50 scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-secondary mb-3 md:mb-4">Наши достижения</h2>
            <p className="text-lg text-muted-foreground">
              Сертификаты и награды, подтверждающие нашу экспертность
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 items-start">
              <div className="group relative rounded-lg shadow-md hover:shadow-lg transition-all duration-500 hover:scale-[1.02] bg-white p-3 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={achievements[0].image} 
                    alt={achievements[0].alt}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                    style={{ maxHeight: '336px' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                    <p className="text-white font-semibold text-xs text-center px-2">{achievements[0].alt}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="group relative rounded-lg shadow-md hover:shadow-lg transition-all duration-500 hover:scale-[1.02] bg-white p-3 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img 
                      src={achievements[1].image} 
                      alt={achievements[1].alt}
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                      style={{ maxHeight: '162px' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                      <p className="text-white font-semibold text-xs text-center px-2">{achievements[1].alt}</p>
                    </div>
                  </div>
                </div>
                <div className="group relative rounded-lg shadow-md hover:shadow-lg transition-all duration-500 hover:scale-[1.02] bg-white p-3 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img 
                      src={achievements[2].image} 
                      alt={achievements[2].alt}
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                      style={{ maxHeight: '162px' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                      <p className="text-white font-semibold text-xs text-center px-2">{achievements[2].alt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="guarantees" className="py-10 md:py-20 bg-white scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-xl md:text-4xl font-heading font-bold text-secondary mb-4 md:mb-6 leading-tight">
              ПРИ РАБОТЕ С ГЛАВБУХВЛ ВЫ ГАРАНТИРОВАННО ПОЛУЧАЕТЕ:
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Полный спектр услуг для успешного ведения вашего бизнеса. 
              Мы берем на себя все заботы о бухгалтерии, чтобы вы могли сосредоточиться на развитии.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto mb-6 md:mb-12">
            {guarantees.map((guarantee, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-none bg-gradient-to-br from-green-50 to-emerald-50"
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={guarantee.icon as any} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl font-heading mb-3">{guarantee.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed text-foreground/70">
                    {guarantee.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-lg px-12" onClick={() => setQuizOpen(true)}>
              <Icon name="ClipboardCheck" size={20} className="mr-2" />
              Пройти тест
            </Button>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-10 md:py-20 scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-secondary mb-3 md:mb-4">Отзывы клиентов</h2>
            <p className="text-lg text-muted-foreground">
              Что говорят о нас наши партнеры
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-t-4 border-t-primary">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={18} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-xl font-heading">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 leading-relaxed">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-10 md:py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-secondary mb-3 md:mb-4">{teamInfo.title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {teamInfo.description}
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 md:mb-16">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
                <img 
                  src={teamInfo.image} 
                  alt="Команда ГЛАВБУХВЛ"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                  <h3 className="text-3xl md:text-4xl font-heading font-bold mb-3">Команда профессионалов</h3>
                  <p className="text-lg md:text-xl text-white/95">Более 15 лет опыта в сфере бухгалтерии и юриспруденции</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {teamInfo.features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2 text-secondary">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="resources" className="py-8 md:py-20 bg-gradient-to-br from-green-50 to-emerald-50 scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Icon name="Gift" size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-secondary mb-3 md:mb-4">Полезная информация</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Бесплатные материалы для скачивания
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            {leadMagnets.map((magnet, index) => (
              <Card key={index} className={`bg-gradient-to-br ${magnet.gradient} border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-white/90 flex items-center justify-center mb-3 shadow-md">
                    <Icon name={magnet.icon as any} size={28} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg font-heading text-secondary">{magnet.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{magnet.description}</p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={magnet.downloadUrl} download>
                      <Icon name="Download" size={18} className="mr-2" />
                      Скачать
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="quizzes" className="py-8 md:py-20 bg-white scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Icon name="ClipboardCheck" size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-secondary mb-3 md:mb-4">Интерактивные тесты</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Пройдите тест и получите персональные рекомендации
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Briefcase" size={24} className="text-primary" />
                </div>
                <CardTitle className="text-lg font-heading">Подходит ли вам аутсорсинг?</CardTitle>
                <CardDescription>Узнайте, выгодно ли передать бухгалтерию профессионалам</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setQuizOpen(true)}>
                  <Icon name="Play" size={18} className="mr-2" />
                  Начать тест
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="TrendingUp" size={24} className="text-primary" />
                </div>
                <CardTitle className="text-lg font-heading">Оцените риски бизнеса</CardTitle>
                <CardDescription>Проверьте, насколько защищен ваш бизнес от штрафов</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => { setActiveQuiz(1); setQuizOpen(true); }}>
                  <Icon name="Play" size={18} className="mr-2" />
                  Начать тест
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Target" size={24} className="text-primary" />
                </div>
                <CardTitle className="text-lg font-heading">Готовы ли вы к проверке?</CardTitle>
                <CardDescription>Узнайте, насколько готова ваша компания к налоговой проверке</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => { setActiveQuiz(2); setQuizOpen(true); }}>
                  <Icon name="Play" size={18} className="mr-2" />
                  Начать тест
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Calculator" size={24} className="text-primary" />
                </div>
                <CardTitle className="text-lg font-heading">Какой режим налогообложения выбрать?</CardTitle>
                <CardDescription>Узнайте оптимальную систему налогов для вашего бизнеса</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => { setActiveQuiz(3); setQuizOpen(true); }}>
                  <Icon name="Play" size={18} className="mr-2" />
                  Начать тест
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-10 md:py-20 bg-gradient-to-br from-green-50 to-emerald-50 scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-secondary mb-3 md:mb-4">Частые вопросы</h2>
            <p className="text-lg text-muted-foreground">
              Ответы на самые популярные вопросы наших клиентов
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 bg-white shadow-sm">
                  <AccordionTrigger className="text-left font-heading hover:no-underline py-4 hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact" className="py-10 md:py-20 bg-gradient-to-br from-secondary to-primary text-white scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-3 md:mb-4">Свяжитесь с нами</h2>
              <p className="text-xl text-white/90">
                Оставьте заявку, и мы свяжемся с вами в течение часа
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white font-heading">Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={20} className="text-white mt-1" />
                    <div>
                      <div className="font-medium text-white">Телефон</div>
                      <div className="text-white/80">+7 914 662 34 89</div>
                      <div className="text-white/80">+7 (800) 555-00-99</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={20} className="text-white mt-1" />
                    <div>
                      <div className="font-medium text-white">Email</div>
                      <div className="text-white/80">info@glavbuhvl.ru</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={20} className="text-white mt-1" />
                    <div>
                      <div className="font-medium text-white">Адрес</div>
                      <div className="text-white/80">Владивосток, ул. Примерная, д. 10, офис 205</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={20} className="text-white mt-1" />
                    <div>
                      <div className="font-medium text-white">Режим работы</div>
                      <div className="text-white/80">Пн-Пт: 9:00 - 18:00</div>
                      <div className="text-white/80">Сб-Вс: выходной</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Форма обратной связи</CardTitle>
                  <CardDescription>Заполните форму, и мы свяжемся с вами</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        placeholder="Телефон"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Ваш вопрос или комментарий"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                      <Icon name="Send" size={18} className="mr-2" />
                      Отправить заявку
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="https://cdn.poehali.dev/projects/9640ad64-a924-4999-b70e-fff331ba6330/files/35aa1de6-567d-4412-ab88-2ea062fb35de.jpg" alt="ГЛАВБУХВЛ" className="w-10 h-10 object-contain" />
                <span className="font-heading font-bold text-xl">ГЛАВБУХВЛ</span>
              </div>
              <p className="text-white/70 text-sm">
                Профессиональные бухгалтерские и юридические услуги во Владивостоке с 2010 года
              </p>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-4">Контакты</h3>
              <div className="space-y-2 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@glavbuhvl.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>Владивосток, ул. Примерная, 10</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-4">Мы в соцсетях</h3>
              <div className="flex gap-3">
                <a href="https://t.me/glavbuhvl" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Icon name="Send" size={20} />
                </a>
                <a href="https://wa.me/79999999999" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Icon name="MessageCircle" size={20} />
                </a>
                <a href="mailto:info@glavbuhvl.ru" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Icon name="Mail" size={20} />
                </a>
                <a href="tel:+74951234567" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Icon name="Phone" size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-white/70">
            © 2024 ГЛАВБУХВЛ. Все права защищены.
          </div>
        </div>
      </footer>

      <Dialog open={consultationOpen} onOpenChange={setConsultationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-secondary">Получить консультацию</DialogTitle>
            <DialogDescription>
              Оставьте свои контакты, и мы свяжемся с вами в течение часа
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Input
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Телефон"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Ваш вопрос или комментарий"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
              <Icon name="Send" size={18} className="mr-2" />
              Отправить заявку
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={servicesOpen} onOpenChange={setServicesOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-secondary">Наши услуги</DialogTitle>
            <DialogDescription>
              Полный спектр бухгалтерских и юридических услуг для вашего бизнеса
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4 text-secondary">Основные услуги</h3>
              <div className="grid gap-4">
                {mainServices.map((service, index) => (
                  <div key={index} className={`p-4 rounded-lg bg-gradient-to-br ${service.gradient} border border-primary/20`}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={service.icon as any} size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary mb-1">{service.title}</h4>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4 text-secondary">Дополнительные услуги</h3>
              <div className="grid gap-3">
                {additionalServices.map((service, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white border border-gray-200 hover:border-primary/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={service.icon as any} size={16} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-secondary mb-1">{service.title}</h4>
                        <p className="text-xs text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90" size="lg" onClick={() => { setServicesOpen(false); setConsultationOpen(true); }}>
              <Icon name="Phone" size={18} className="mr-2" />
              Получить консультацию
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={quizOpen} onOpenChange={(open) => {
        setQuizOpen(open);
        if (!open) {
          setActiveQuiz(null);
          setCurrentQuestion(0);
          setQuizAnswers([]);
          setQuizResult(null);
        }
      }}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          {activeQuiz === null ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl text-secondary">Выберите тест</DialogTitle>
                <DialogDescription>
                  Пройдите тест и получите персональные рекомендации для вашего бизнеса
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-primary/20 hover:border-primary/40 transition-colors cursor-pointer" onClick={() => setActiveQuiz(0)}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Briefcase" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-secondary mb-1">Подходит ли вам аутсорсинг?</h3>
                      <p className="text-sm text-muted-foreground">Узнайте, выгодно ли передать бухгалтерию профессионалам</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-primary/20 hover:border-primary/40 transition-colors cursor-pointer" onClick={() => setActiveQuiz(1)}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="TrendingUp" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-secondary mb-1">Оцените риски вашего бизнеса</h3>
                      <p className="text-sm text-muted-foreground">Проверьте, насколько защищен ваш бизнес от штрафов и проблем</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-primary/20 hover:border-primary/40 transition-colors cursor-pointer" onClick={() => setActiveQuiz(2)}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Target" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-secondary mb-1">Готовы ли вы к проверке?</h3>
                      <p className="text-sm text-muted-foreground">Узнайте, насколько ваша компания готова к налоговой проверке</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : quizResult === null ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl text-secondary">
                  {activeQuiz === 0 && 'Подходит ли вам аутсорсинг?'}
                  {activeQuiz === 1 && 'Оцените риски вашего бизнеса'}
                  {activeQuiz === 2 && 'Готовы ли вы к проверке?'}
                  {activeQuiz === 3 && 'Какой режим налогообложения выбрать?'}
                </DialogTitle>
                <DialogDescription>
                  Вопрос {currentQuestion + 1} из {activeQuiz === 3 ? 3 : 4}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6">
                {activeQuiz === 0 && (
                  <>
                    {currentQuestion === 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Сколько времени вы тратите на бухгалтерию в месяц?</h3>
                        {['Менее 5 часов', '5-20 часов', '20-40 часов', 'Более 40 часов'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setQuizAnswers([...quizAnswers, idx]);
                              setCurrentQuestion(currentQuestion + 1);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {currentQuestion === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Сколько у вас сотрудников?</h3>
                        {['Только я (ИП)', 'До 10 человек', '10-50 человек', 'Более 50 человек'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setQuizAnswers([...quizAnswers, idx]);
                              setCurrentQuestion(currentQuestion + 1);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {currentQuestion === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Были ли у вас штрафы от налоговой?</h3>
                        {['Нет, никогда', 'Да, небольшие (до 10 000 руб)', 'Да, значительные (более 10 000 руб)', 'Да, регулярно'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setQuizAnswers([...quizAnswers, idx]);
                              setCurrentQuestion(currentQuestion + 1);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {currentQuestion === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Есть ли у вас штатный бухгалтер?</h3>
                        {['Нет', 'Да, но часто отсутствует', 'Да, но не справляется', 'Да, всё хорошо'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              const newAnswers = [...quizAnswers, idx];
                              setQuizAnswers(newAnswers);
                              const score = newAnswers.reduce((sum, val) => sum + val, 0);
                              let result = '';
                              if (score <= 3) {
                                result = '🎯 Аутсорсинг отлично подойдёт!\n\nВы тратите мало времени на бухгалтерию, но это отвлекает от развития бизнеса. Профессиональный аутсорсинг позволит вам сосредоточиться на главном.\n\n💰 Стоимость: от 5 000 руб/мес';
                              } else if (score <= 6) {
                                result = '✅ Аутсорсинг будет выгодным решением!\n\nВы тратите значительное время на бухгалтерию. Передача этих задач профессионалам сэкономит ваше время и снизит риск ошибок.\n\n💰 Стоимость: от 15 000 руб/мес';
                              } else if (score <= 9) {
                                result = '⚠️ Аутсорсинг необходим срочно!\n\nВы тратите слишком много времени на бухгалтерию и уже получали штрафы. Профессиональная команда поможет избежать проблем и освободит ваше время.\n\n💰 Стоимость: от 20 000 руб/мес';
                              } else {
                                result = '🚨 Критическая ситуация!\n\nВы перегружены бухгалтерией и регулярно получаете штрафы. Срочно нужен профессиональный аутсорсинг для защиты бизнеса.\n\n💰 Стоимость: от 25 000 руб/мес';
                              }
                              setQuizResult(result);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
                {activeQuiz === 1 && (
                  <>
                    {currentQuestion === 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Как часто вы проверяете бухгалтерскую отчётность?</h3>
                        {['Каждый месяц', 'Раз в квартал', 'Раз в год', 'Не проверяю'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setQuizAnswers([...quizAnswers, idx]);
                              setCurrentQuestion(currentQuestion + 1);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {currentQuestion === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Ведёте ли вы учёт первичных документов?</h3>
                        {['Да, всегда', 'Иногда забываем', 'Редко', 'Нет, не ведём'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setQuizAnswers([...quizAnswers, idx]);
                              setCurrentQuestion(currentQuestion + 1);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {currentQuestion === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Есть ли у вас просроченная задолженность перед бюджетом?</h3>
                        {['Нет', 'Незначительная', 'Есть, работаем над погашением', 'Да, большая'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setQuizAnswers([...quizAnswers, idx]);
                              setCurrentQuestion(currentQuestion + 1);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {currentQuestion === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Знаете ли вы все изменения в налоговом законодательстве?</h3>
                        {['Да, постоянно отслеживаю', 'Иногда узнаю', 'Редко слежу', 'Нет, не знаю'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              const newAnswers = [...quizAnswers, idx];
                              setQuizAnswers(newAnswers);
                              const score = newAnswers.reduce((sum, val) => sum + val, 0);
                              let result = '';
                              if (score <= 2) {
                                result = '✅ Низкий уровень риска\n\nВаш бизнес хорошо защищён! Вы следите за отчётностью и документами. Продолжайте в том же духе и рассмотрите профессиональную поддержку для оптимизации.\n\n💡 Рекомендация: Консультации по сложным вопросам';
                              } else if (score <= 5) {
                                result = '⚠️ Средний уровень риска\n\nЕсть области для улучшения. Нерегулярный контроль может привести к ошибкам и штрафам. Рекомендуем усилить контроль над бухгалтерией.\n\n💡 Рекомендация: Частичный аутсорсинг или аудит';
                              } else if (score <= 8) {
                                result = '🚨 Высокий уровень риска\n\nВаш бизнес в зоне риска! Отсутствие контроля и задолженности могут привести к серьёзным штрафам и проблемам с налоговой.\n\n💡 Рекомендация: Срочно нужен профессиональный бухгалтер';
                              } else {
                                result = '❌ Критический уровень риска\n\nОпасная ситуация! Без срочных мер возможны блокировки счетов, крупные штрафы и проблемы с контролирующими органами.\n\n💡 Рекомендация: Немедленно обратитесь к профессионалам';
                              }
                              setQuizResult(result);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
                {activeQuiz === 2 && (
                  <>
                    {currentQuestion === 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Все ли первичные документы у вас в порядке?</h3>
                        {['Да, всё систематизировано', 'В основном да', 'Есть пробелы', 'Нет, большой беспорядок'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setQuizAnswers([...quizAnswers, idx]);
                              setCurrentQuestion(currentQuestion + 1);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {currentQuestion === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Проводили ли вы внутренний аудит в этом году?</h3>
                        {['Да, регулярно', 'Да, один раз', 'Нет, планируем', 'Нет, не проводили'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setQuizAnswers([...quizAnswers, idx]);
                              setCurrentQuestion(currentQuestion + 1);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {currentQuestion === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Соответствует ли ваша зарплатная ведомость реальности?</h3>
                        {['Да, полностью', 'В основном да', 'Есть расхождения', 'Нет, большие расхождения'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setQuizAnswers([...quizAnswers, idx]);
                              setCurrentQuestion(currentQuestion + 1);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {currentQuestion === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Все ли налоги уплачены вовремя за последний год?</h3>
                        {['Да, все и вовремя', 'Были небольшие задержки', 'Есть просроченные платежи', 'Нет, много долгов'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              const newAnswers = [...quizAnswers, idx];
                              setQuizAnswers(newAnswers);
                              const score = newAnswers.reduce((sum, val) => sum + val, 0);
                              let result = '';
                              if (score <= 2) {
                                result = '✅ Отлично готовы!\n\nВаша компания в полном порядке! Документы систематизированы, налоги уплачены вовремя. Вы готовы к любой проверке.\n\n💡 Рекомендация: Поддерживайте текущий уровень';
                              } else if (score <= 5) {
                                result = '⚠️ Требуется подготовка\n\nЕсть области для улучшения перед проверкой. Рекомендуем провести внутренний аудит и систематизировать документы.\n\n💡 Рекомендация: Подготовка к проверке (2-4 недели)';
                              } else if (score <= 8) {
                                result = '🚨 Не готовы к проверке\n\nСерьёзные пробелы в документах и задолженности. При проверке высока вероятность штрафов и санкций.\n\n💡 Рекомендация: Срочная подготовка с профессионалами';
                              } else {
                                result = '❌ Критическое состояние\n\nКомпания совершенно не готова к проверке! Множество нарушений, которые приведут к крупным штрафам и возможным блокировкам.\n\n💡 Рекомендация: Немедленно обратитесь к специалистам!';
                              }
                              setQuizResult(result);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
                {activeQuiz === 3 && (
                  <>
                    {currentQuestion === 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Какая у вас организационная форма?</h3>
                        {['ИП', 'ООО', 'Ещё не зарегистрировал', 'Самозанятый'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setQuizAnswers([...quizAnswers, idx]);
                              setCurrentQuestion(currentQuestion + 1);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {currentQuestion === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Какой планируемый годовой доход?</h3>
                        {['До 2,4 млн руб', '2,4-60 млн руб', '60-150 млн руб', 'Более 150 млн руб'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setQuizAnswers([...quizAnswers, idx]);
                              setCurrentQuestion(currentQuestion + 1);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {currentQuestion === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Сколько планируете сотрудников?</h3>
                        {['Работаю один', 'До 5 человек', '5-100 человек', 'Более 100 человек'].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              const newAnswers = [...quizAnswers, idx];
                              setQuizAnswers(newAnswers);
                              let result = '';
                              if (newAnswers[0] === 3) {
                                result = '📱 Режим самозанятости (НПД)\n\nОтличный вариант для старта! 4-6% налог, никакой отчётности, всё через приложение. Подходит, если работаете один и доход до 2,4 млн руб/год.\n\n💡 Рекомендация: Регистрация в приложении «Мой налог»';
                              } else if (newAnswers[1] === 0) {
                                result = '✅ УСН Доходы 6%\n\nСамый простой режим! Платите 6% с дохода, минимум отчётности. Идеально для малого бизнеса с небольшими расходами.\n\n💡 Рекомендация: Подходит для услуг и торговли';
                              } else if (newAnswers[1] === 1 && newAnswers[2] <= 1) {
                                result = '💼 УСН Доходы минус расходы 15%\n\nВыгодно, если расходы составляют более 60% от доходов. Можно снизить налоги, но нужно подтверждать все расходы документами.\n\n💡 Рекомендация: Подходит для производства';
                              } else {
                                result = '🏢 ОСНО (общая система)\n\nПодходит для крупного бизнеса. НДС 20%, налог на прибыль 20%. Больше отчётности, но возможность работать с крупными компаниями-плательщиками НДС.\n\n💡 Рекомендация: Необходима для работы с крупными компаниями';
                              }
                              setQuizResult(result);
                            }}
                            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
              {currentQuestion > 0 && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setCurrentQuestion(currentQuestion - 1);
                    setQuizAnswers(quizAnswers.slice(0, -1));
                  }}
                >
                  <Icon name="ArrowLeft" size={18} className="mr-2" />
                  Назад
                </Button>
              )}
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl text-secondary">Результаты теста</DialogTitle>
              </DialogHeader>
              <div className="mt-4 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-primary/20">
                <pre className="whitespace-pre-wrap text-foreground/90 font-sans leading-relaxed">{quizResult}</pre>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90" 
                  onClick={() => {
                    setQuizOpen(false);
                    setConsultationOpen(true);
                    setActiveQuiz(null);
                    setCurrentQuestion(0);
                    setQuizAnswers([]);
                    setQuizResult(null);
                  }}
                >
                  <Icon name="Phone" size={18} className="mr-2" />
                  Получить консультацию
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setActiveQuiz(null);
                    setCurrentQuestion(0);
                    setQuizAnswers([]);
                    setQuizResult(null);
                  }}
                >
                  <Icon name="RotateCcw" size={18} className="mr-2" />
                  Пройти другой тест
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}