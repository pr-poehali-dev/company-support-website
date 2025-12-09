import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const services = [
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

  const achievements = [
    { image: 'https://cdn.poehali.dev/files/image.png', alt: 'Сертификат 1' },
    { image: 'https://cdn.poehali.dev/files/image.png', alt: 'Сертификат 2' },
    { image: 'https://cdn.poehali.dev/files/image.png', alt: 'Сертификат 3' }
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

  const team = [
    {
      name: 'Анна Иванова',
      position: 'Главный бухгалтер',
      experience: '15 лет опыта',
      description: 'Аттестованный аудитор, эксперт по МСФО',
      image: '/placeholder.svg'
    },
    {
      name: 'Сергей Морозов',
      position: 'Ведущий юрист',
      experience: '12 лет опыта',
      description: 'Специализация: корпоративное право, арбитраж',
      image: '/placeholder.svg'
    },
    {
      name: 'Ольга Петрова',
      position: 'Налоговый консультант',
      experience: '10 лет опыта',
      description: 'Бывший специалист ИФНС, эксперт по налогам',
      image: '/placeholder.svg'
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
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Leaf" size={32} className="text-primary" />
            <div>
              <h1 className="text-2xl font-heading font-bold text-secondary">ГЛАВБУХВЛ</h1>
              <p className="text-xs text-muted-foreground">Бухгалтерия & Юриспруденция</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О нас</a>
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Услуги</a>
            <a href="#achievements" className="text-sm font-medium hover:text-primary transition-colors">Достижения</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Отзывы</a>
            <a href="#team" className="text-sm font-medium hover:text-primary transition-colors">Команда</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button className="hidden md:inline-flex bg-primary hover:bg-primary/90">Консультация</Button>
        </div>
      </header>

      <section className="bg-gradient-to-br from-secondary via-emerald-700 to-primary text-white py-24 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-heading font-bold mb-6">
              Комплексное сопровождение вашего бизнеса
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Профессиональные решения по бухгалтерскому учету и юридическим вопросам во Владивостоке. 
              Работаем с 2010 года. Более 200 компаний доверяют нам свой бизнес.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" className="text-lg">
                <Icon name="Phone" size={20} className="mr-2" />
                Получить консультацию
              </Button>
              <Button size="lg" variant="outline" className="text-lg bg-white/10 text-white border-white hover:bg-white hover:text-secondary">
                <Icon name="FileText" size={20} className="mr-2" />
                Наши услуги
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon name="Award" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm text-white/80">лет на рынке</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon name="Users" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">200+</div>
                  <div className="text-sm text-white/80">довольных клиентов</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-white/80">без штрафов от налоговой</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-secondary mb-4">О нас</h2>
              <p className="text-lg text-muted-foreground">
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

      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">ЧТО МЫ ПРЕДЛАГАЕМ</p>
            <h2 className="text-4xl font-heading font-bold text-secondary mb-4">Ваши цели — наш приоритет</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Сосредоточьтесь на развитии бизнеса, а бухгалтерию доверьте ГЛАВБУХВЛ. 
              Мы предлагаем комплексные бухгалтерские услуги, своевременную сдачу отчетов 
              и защиту от штрафов, чтобы вы могли экономить время и деньги.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
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
        </div>
      </section>

      <section id="achievements" className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-secondary mb-4">Наши достижения</h2>
            <p className="text-lg text-muted-foreground">
              Сертификаты и награды, подтверждающие нашу экспертность
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-emerald-100 flex items-center justify-center">
                  <img 
                    src={achievement.image} 
                    alt={achievement.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <p className="text-white font-semibold">{achievement.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-secondary mb-4">Отзывы клиентов</h2>
            <p className="text-lg text-muted-foreground">
              Что говорят о нас наши партнеры
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
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

      <section id="team" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-secondary mb-4">Наша команда</h2>
            <p className="text-lg text-muted-foreground">
              Профессионалы с многолетним опытом
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-emerald-200 flex items-center justify-center overflow-hidden">
                    <Icon name="User" size={64} className="text-primary/60" />
                  </div>
                  <CardTitle className="text-xl font-heading">{member.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-primary">
                    {member.position}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{member.experience}</p>
                  <p className="text-foreground/80">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-secondary mb-4">Частые вопросы</h2>
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

      <section id="contact" className="py-20 bg-gradient-to-br from-secondary to-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-xl text-white/90">
                Оставьте заявку, и мы свяжемся с вами в течение часа
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white font-heading">Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={20} className="text-white mt-1" />
                    <div>
                      <div className="font-medium text-white">Телефон</div>
                      <div className="text-white/80">+7 (495) 123-45-67</div>
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

      <footer className="bg-secondary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Leaf" size={24} />
              <span className="font-heading font-bold">ГЛАВБУХВЛ</span>
            </div>
            <div className="text-sm text-white/70">
              © 2024 ГЛАВБУХВЛ. Все права защищены.
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Linkedin" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Mail" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
