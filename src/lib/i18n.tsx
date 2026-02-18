// i18n.tsx

import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'ru' | 'en' | 'uz';

const translations = {
  ru: {
    nav: { home: 'Главная', cases: 'Кейсы', about: 'О нас', contacts: 'Контакты', quote: 'Получить оценку' },
    hero: {
      title: 'Создаём сайты,\nкоторые продают',
      subtitle: 'Если вы думаете, что вам не нужен сайт — вы уже теряете деньги.',
      cta1: 'Написать в Telegram',
      cta2: 'Получить оценку',
    },
    stats: { projects: 'Проектов', clients: 'Довольных клиентов', years: 'Года опыта', conversion: 'Рост конверсии' },
    why: {
      title: 'Зачем бизнесу сайт?',
      subtitle: 'Сайт — не расход. Это инвестиция, которая работает 24/7.',
      points: [
        { title: 'Клиенты ищут вас онлайн', desc: '87% покупателей начинают поиск в интернете. Нет сайта — нет клиентов.' },
        { title: 'Доверие и статус', desc: 'Профессиональный сайт — ваша визитная карточка в цифровую эпоху.' },
        { title: 'Продажи без сна', desc: 'Сайт принимает заявки 24/7. Автоматизация продаж, пока вы спите.' },
        { title: 'Конкуренция', desc: 'У ваших конкурентов уже есть сайт. Готовы отдать им своих клиентов?' },
      ],
    },
    services: {
      title: 'Услуги',
      subtitle: 'Полный цикл: от идеи до запуска и поддержки',
      items: [
        { name: 'Лендинги', desc: 'Продающие страницы с высокой конверсией', icon: 'layout' },
        { name: 'Корпоративные сайты', desc: 'Представительство вашего бизнеса в сети', icon: 'building' },
        { name: 'Интернет-магазины', desc: 'E-commerce решения любой сложности', icon: 'shopping-cart' },
        { name: 'Веб-приложения / MVP', desc: 'SaaS продукты и масштабируемые решения', icon: 'code' },
        { name: 'Telegram-боты', desc: 'Автоматизация продаж и поддержки', icon: 'bot' },
      ],
    },
    process: {
      title: 'Как мы работаем',
      steps: [
        { name: 'Брифинг', desc: 'Изучаем ваш бизнес, цели и аудиторию' },
        { name: 'Дизайн', desc: 'Создаём уникальный дизайн под ваш бренд' },
        { name: 'Разработка', desc: 'Пишем чистый, быстрый и надёжный код' },
        { name: 'Запуск', desc: 'Тестируем и запускаем проект' },
        { name: 'Поддержка', desc: 'Обеспечиваем стабильную работу' },
      ],
    },
    pricing: {
      title: 'Прозрачные цены',
      subtitle: 'Честно. Без скрытых платежей.',
      items: [
        { name: 'Лендинг', price: 'от $120', features: ['Уникальный дизайн', 'Адаптивная верстка', 'SEO-основа', 'Запуск за 5–7 дней'] },
        { name: 'Корпоративный сайт', price: 'от $400', features: ['До 10 страниц', 'CMS панель', 'SEO-оптимизация', 'Адаптивный дизайн'] },
        { name: 'Интернет-магазин', price: 'от $1000', features: ['Каталог товаров', 'Корзина и оплата', 'Личный кабинет', 'Интеграции'], popular: true },
        { name: 'Telegram-бот', price: 'от $100', features: ['Автоответы', 'Интеграция с CRM', 'Аналитика', 'Быстрый запуск'] },
        { name: 'Веб-приложение', price: 'от $1500', features: ['MVP за 2–4 недели', 'Масштабируемость', 'API интеграции', 'Админ-панель'] },
      ],
    },
    team: {
      title: 'Команда',
      subtitle: 'Маленькая студия. Большие результаты.',
      desc: 'Мы — компактная команда из двух сильных разработчиков. Каждый проект получает 100% нашего внимания.',
      members: [
        { name: 'Ген директор', role: 'Front-end Разработчик', bio: 'Главный визионер и архитектор решений. Отвечает за качество и видение каждого проекта.' },
        { name: 'Соучредитель', role: 'Full-stack Разработчик', bio: 'Специалист по разработке и сложным интеграциям. Превращает дизайн в идеальный код.' },
      ],
    },
    cta: {
      title: 'Готовы начать?',
      subtitle: 'Обсудим ваш проект — бесплатно и без обязательств.',
      button: 'Написать в Telegram',
    },
    cases: {
      title: 'Кейсы',
      subtitle: 'Реальные результаты для реального бизнеса',
      viewCase: 'Подробнее',
      allCases: 'Все кейсы',
      backToList: 'Все кейсы',
      goal: 'Цель клиента',
      built: 'Что было сделано',
      features: 'Ключевые функции',
      stack: 'Стек технологий',
      results: 'Результаты',
      timeline: 'Сроки',
      teamSize: 'Размер команды',
      ctaTitle: 'Хотите такой же результат?',
    },
    about: {
      title: 'О студии',
      subtitle: 'VANTA LAB — небольшая, но мощная студия софтверной разработки из Узбекистана.',
      mission: 'Наша миссия — создавать цифровые продукты премиум-качества по честным ценам. Мы верим, что каждый бизнес заслуживает сильного онлайн-присутствия.',
      valuesTitle: 'Наши ценности',
      values: [
        { title: 'Качество', desc: 'Каждый проект мы разрабатываем с максимальной тщательностью.' },
        { title: 'Честность', desc: 'Прозрачные цены, реальные сроки, никаких сюрпризов.' },
        { title: 'Скорость', desc: 'Быстрые сроки без потери качества.' },
        { title: 'Поддержка', desc: 'Мы не бросаем клиентов после запуска.' },
      ],
    },
    contact: {
      title: 'Свяжитесь с нами',
      subtitle: 'Расскажите о вашем проекте — мы ответим в течение часа.',
      form: { name: 'Ваше имя', email: 'Email', message: 'Расскажите о проекте', send: 'Отправить' },
      telegram: 'Написать в Telegram',
      whatsapp: 'WhatsApp',
      emailLabel: 'Email',
    },
    footer: {
      rights: '© 2026 VANTA LAB LLC. Все права защищены.',
      tagline: 'Премиум софтверная разработка из Узбекистана',
    },
  },



  en: {
    nav: { home: 'Home', cases: 'Cases', about: 'About', contacts: 'Contacts', quote: 'Get a Quote' },
    hero: {
      title: 'We build websites\nthat sell',
      subtitle: "If you think you don't need a website — you're already losing money.",
      cta1: 'Message on Telegram',
      cta2: 'Get a Quote',
    },
    stats: { projects: 'Projects', clients: 'Happy Clients', years: 'Years Experience', conversion: 'Conversion Growth' },
    why: {
      title: 'Why does your business need a website?',
      subtitle: "A website isn't an expense. It's an investment that works 24/7.",
      points: [
        { title: 'Clients search for you online', desc: '87% of buyers start their search online. No website — no clients.' },
        { title: 'Trust and credibility', desc: 'A professional website is your digital business card.' },
        { title: 'Sales while you sleep', desc: 'Your website takes orders 24/7. Sales automation on autopilot.' },
        { title: 'Competition', desc: 'Your competitors already have a website. Ready to hand them your clients?' },
      ],
    },
    services: {
      title: 'Services',
      subtitle: 'Full cycle: from idea to launch and support',
      items: [
        { name: 'Landing Pages', desc: 'High-converting sales pages', icon: 'layout' },
        { name: 'Corporate Websites', desc: 'Your business representation online', icon: 'building' },
        { name: 'E-commerce', desc: 'Online store solutions of any complexity', icon: 'shopping-cart' },
        { name: 'Web Apps / MVP', desc: 'SaaS products and scalable solutions', icon: 'code' },
        { name: 'Telegram Bots', desc: 'Sales and support automation', icon: 'bot' },
      ],
    },
    process: {
      title: 'How We Work',
      steps: [
        { name: 'Discovery', desc: 'We study your business, goals, and audience' },
        { name: 'Design', desc: 'We create a unique design for your brand' },
        { name: 'Development', desc: 'We write clean, fast, and reliable code' },
        { name: 'Launch', desc: 'We test and launch the project' },
        { name: 'Support', desc: 'We ensure stable operation post-launch' },
      ],
    },
    pricing: {
      title: 'Transparent Pricing',
      subtitle: 'Honest. No hidden fees.',
      items: [
        { name: 'Landing Page', price: 'from $150', features: ['Unique design', 'Responsive layout', 'SEO basics', 'Launch in 5–7 days'] },
        { name: 'Corporate Website', price: 'from $450', features: ['Up to 10 pages', 'CMS panel', 'SEO optimization', 'Responsive design'] },
        { name: 'E-commerce', price: 'from $1000', features: ['Product catalog', 'Cart & payment', 'User accounts', 'Integrations'], popular: true },
        { name: 'Telegram Bot', price: 'from $100', features: ['Auto-replies', 'CRM integration', 'Analytics', 'Fast launch'] },
        { name: 'Web Application', price: 'from $500', features: ['MVP in 2–4 weeks', 'Scalability', 'API integrations', 'Admin panel'] },
      ],
    },
    team: {
      title: 'Team',
      subtitle: 'Small studio. Big results.',
      desc: "We're a compact team of two strong developers. Every project gets 100% of our attention.",
      members: [
        { name: 'Founder', role: 'Front-end Developer', bio: 'Major visionary and solutions architect. Responsible for the quality and vision of each project.' },
        { name: 'Co-Founder', role: 'Full-stack Developer', bio: 'Specialist in development and complex integrations. Turns design into perfect code.' },
      ],
    },
    cta: {
      title: 'Ready to start?',
      subtitle: "Let's discuss your project — free, no strings attached.",
      button: 'Message on Telegram',
    },
    cases: {
      title: 'Cases',
      subtitle: 'Real results for real business',
      viewCase: 'View Case',
      allCases: 'All Cases',
      backToList: 'All Cases',
      goal: 'Client Goal',
      built: 'What Was Built',
      features: 'Key Features',
      stack: 'Tech Stack',
      results: 'Results',
      timeline: 'Timeline',
      teamSize: 'Team Size',
      ctaTitle: 'Want results like these?',
    },
    about: {
      title: 'About',
      subtitle: 'VANTA LAB is a small but powerful software development studio from Uzbekistan.',
      mission: 'Our mission is to create premium digital products at honest prices. We believe every business deserves a strong online presence.',
      valuesTitle: 'Our Values',
      values: [
        { title: 'Quality', desc: 'Every project is a portfolio piece. We never ship mediocre work.' },
        { title: 'Honesty', desc: 'Transparent pricing, real timelines, no surprises.' },
        { title: 'Speed', desc: 'Fast delivery without compromising quality.' },
        { title: 'Support', desc: "We don't abandon clients after launch." },
      ],
    },
    contact: {
      title: 'Get in Touch',
      subtitle: "Tell us about your project — we'll respond within an hour.",
      form: { name: 'Your Name', email: 'Email', message: 'Tell us about your project', send: 'Send' },
      telegram: 'Message on Telegram',
      whatsapp: 'WhatsApp',
      emailLabel: 'Email',
    },
    footer: {
      rights: '© 2026 VANTA LAB LLC. All rights reserved.',
      tagline: 'Premium software development from Uzbekistan',
    },
  },
  uz: {
    nav: { home: 'Bosh sahifa', cases: 'Loyihalar', about: 'Biz haqimizda', contacts: 'Aloqa', quote: 'Narx olish' },
    hero: {
      title: 'Sotadigan saytlar\nyaratamiz',
      subtitle: "Agar sayt kerak emas deb o'ylasangiz — siz allaqachon pul yo'qotyapsiz.",
      cta1: 'Telegramda yozish',
      cta2: 'Narx olish',
    },
    stats: { projects: 'Loyihalar', clients: 'Mamnun mijozlar', years: 'Yillik tajriba', conversion: "Konversiya o'sishi" },
    why: {
      title: 'Biznesingizga sayt nima uchun kerak?',
      subtitle: "Sayt — xarajat emas. Bu 24/7 ishlaydigan investitsiya.",
      points: [
        { title: 'Mijozlar sizni onlayn qidiradi', desc: "Xaridorlarning 87% qidiruvni internetdan boshlaydi. Sayt yo'q — mijoz yo'q." },
        { title: 'Ishonch va maqom', desc: "Professional sayt — raqamli davrda sizning tashrif qog'ozingiz." },
        { title: "Uxlayotganda sotish", desc: "Sayt 24/7 buyurtmalar qabul qiladi. Avtomatlashtirilgan sotish." },
        { title: 'Raqobat', desc: "Raqobatchilaringizning allaqachon sayti bor. Mijozlaringizni ularga berishga tayyormisiz?" },
      ],
    },
    services: {
      title: 'Xizmatlar',
      subtitle: "To'liq tsikl: g'oyadan ishga tushirish va qo'llab-quvvatlashgacha",
      items: [
        { name: 'Landing sahifalar', desc: 'Yuqori konversiyali sotish sahifalari', icon: 'layout' },
        { name: 'Korporativ saytlar', desc: 'Biznesingizning onlayn vakolatxonasi', icon: 'building' },
        { name: "Onlayn do'konlar", desc: "Har qanday murakkablikdagi e-commerce yechimlar", icon: 'shopping-cart' },
        { name: 'Veb-ilovalar / MVP', desc: "SaaS mahsulotlar va kengaytiriladigan yechimlar", icon: 'code' },
        { name: 'Telegram-botlar', desc: "Sotish va qo'llab-quvvatlash avtomatizatsiyasi", icon: 'bot' },
      ],
    },
    process: {
      title: 'Qanday ishlaymiz',
      steps: [
        { name: 'Brif', desc: "Biznesingiz, maqsadlaringiz va auditoriyangizni o'rganamiz" },
        { name: 'Dizayn', desc: 'Brendingiz uchun noyob dizayn yaratamiz' },
        { name: 'Ishlab chiqish', desc: 'Toza, tez va ishonchli kod yozamiz' },
        { name: 'Ishga tushirish', desc: "Loyihani sinab ko'ramiz va ishga tushiramiz" },
        { name: "Qo'llab-quvvatlash", desc: "Ishga tushirilgandan keyin barqaror ishlashni ta'minlaymiz" },
      ],
    },
    pricing: {
      title: 'Shaffof narxlar',
      subtitle: "Halol. Yashirin to'lovlarsiz.",
      items: [
        { name: 'Landing', price: '$150 dan', features: ['Noyob dizayn', 'Adaptiv', 'SEO asos', '5–7 kunda tayyor'] },
        { name: 'Korporativ sayt', price: '$450 dan', features: ['10 tagacha sahifa', 'CMS panel', 'SEO optimallashtirish', 'Adaptiv dizayn'] },
        { name: "Onlayn do'kon", price: '$1000 dan', features: ['Tovarlar katalogi', "Savat va to'lov", 'Shaxsiy kabinet', 'Integratsiyalar'], popular: true },
        { name: 'Telegram-bot', price: '$100 dan', features: ['Avtojavoblar', 'CRM integratsiya', 'Analitika', 'Tez ishga tushirish'] },
        { name: 'Veb-ilova', price: '$500 dan', features: ['2–4 haftada MVP', 'Kengaytiruvchanlik', 'API integratsiyalar', 'Admin panel'] },
      ],
    },
    team: {
      title: 'Jamoa',
      subtitle: 'Kichik studiya. Katta natijalar.',
      desc: "Biz ikki kuchli dasturchidan iborat ixcham jamoamiz. Har bir loyiha 100% e'tiborimizni oladi.",
      members: [
        { name: 'Asoschi', role: 'Front-end Developer', bio: 'Bosh Vizyoner va Yechim Arxitektori. Har bir loyihaning sifati va qarashlari uchun javobgar.' },
        { name: 'Hammuassis', role: 'Full-stack Developer', bio: "Rivojlanish va murakkab integratsiya bo'yicha mutaxassis. Dizaynni mukammal kodga aylantirish." },
      ],
    },
    cta: {
      title: 'Boshlashga tayyormisiz?',
      subtitle: "Loyihangizni muhokama qilamiz — bepul va majburiyatsiz.",
      button: 'Telegramda yozish',
    },
    cases: {
      title: 'Loyihalar',
      subtitle: 'Haqiqiy biznes uchun haqiqiy natijalar',
      viewCase: 'Batafsil',
      allCases: 'Barcha loyihalar',
      backToList: 'Barcha loyihalar',
      goal: 'Mijoz maqsadi',
      built: 'Nima qilindi',
      features: 'Asosiy funksiyalar',
      stack: 'Texnologiyalar',
      results: 'Natijalar',
      timeline: 'Muddatlar',
      teamSize: 'Jamoa hajmi',
      ctaTitle: 'Shunday natija xohlaysizmi?',
    },
    about: {
      title: 'Biz haqimizda',
      subtitle: "VANTA LAB — O'zbekistondan kichik, ammo kuchli dasturiy ta'minot ishlab chiqish studiyasi.",
      mission: "Bizning vazifamiz — halol narxlarda premium raqamli mahsulotlar yaratish. Har bir biznes kuchli onlayn mavjudlikka loyiqdir.",
      valuesTitle: 'Qadriyatlarimiz',
      values: [
        { title: 'Sifat', desc: "Har bir loyiha — portfolio asari. Biz o'rtacha mahsulot chiqarmaymiz." },
        { title: 'Halollik', desc: "Shaffof narxlar, real muddatlar, kutilmagan xarajatlarsiz." },
        { title: 'Tezlik', desc: "Sifatni yo'qotmasdan tez yetkazib berish." },
        { title: "Qo'llab-quvvatlash", desc: "Ishga tushirilgandan keyin mijozlarni tashlab ketmaymiz." },
      ],
    },
    contact: {
      title: "Biz bilan bog'laning",
      subtitle: "Loyihangiz haqida ayting — 1 soat ichida javob beramiz.",
      form: { name: 'Ismingiz', email: 'Email', message: 'Loyihangiz haqida ayting', send: 'Yuborish' },
      telegram: 'Telegramda yozish',
      whatsapp: 'WhatsApp',
      emailLabel: 'Email',
    },
    footer: {
      rights: '© 2026 VANTA LAB LLC. Barcha huquqlar himoyalangan.',
      tagline: "O'zbekistondan premium dasturiy ta'minot ishlab chiqish",
    },
  },
} as const;

type Translations = typeof translations.ru;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('ru');
  const t = translations[lang] as Translations;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useLanguage must be used within I18nProvider');
  return ctx;
};
