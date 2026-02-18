import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import FadeIn from '@/components/FadeIn';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import medicareImg from '@/assets/medicare.webp';
import manakuImg from '@/assets/manaku.webp';
import modulbinoImg from '@/assets/modulbino.webp';
import ecolifeImg from '@/assets/ecolife.webp';
import pitstopImg from '@/assets/pitstop.webp';
import mazzoImg from '@/assets/mazzo.webp';
import luxlightImg from '@/assets/luxlight.webp';
import essenzaImg from '@/assets/essenza.webp';

const caseDetails: Record<string, { 
  name: string;
  goal: Record<string, string>;
  built: Record<string, string>;
  features: Record<string, string[]>;
  stack: string[];
  results: Record<string, string[]>;
  timeline: string;
  teamSize: number;
  image: string;
}> = {

  medicare: {
    name: 'Medicare Uzbekistan',
    image: medicareImg,
    goal: { 
      ru: 'Создать современный интернет-магазин медицинских товаров с удобной навигацией и быстрым оформлением заказа.', 
      en: 'Build a modern e-commerce store for medical products with intuitive navigation and fast checkout.', 
      uz: "Qulay navigatsiya va tez buyurtma berish bilan zamonaviy tibbiy tovarlar onlayn do'konini yaratish." 
    },
    built: { 
      ru: 'Полноценный интернет-магазин с каталогом, фильтрацией, корзиной, интеграцией с платёжной системой и CRM.', 
      en: 'Full-featured e-commerce store with catalog, filters, cart, payment integration, and CRM.', 
      uz: "Katalog, filtrlar, savat, to'lov integratsiyasi va CRM bilan to'liq e-commerce do'kon." 
    },
    features: { 
      ru: ['Каталог 100+ товаров', 'Умная фильтрация', 'Онлайн-оплата', 'Личный кабинет', 'CRM интеграция'], 
      en: ['100+ product catalog', 'Smart filtering', 'Online payment', 'User accounts', 'CRM integration'], 
      uz: ["100+ tovarlar katalogi", "Aqlli filtrlash", "Onlayn to'lov", 'Shaxsiy kabinet', 'CRM integratsiya'] 
    },
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Stripe'],
    results: { 
      ru: ['Рост продаж на 65%', 'Конверсия 4.2%', 'Среднее время на сайте 5 мин', 'ROI 320% за 3 месяца'], 
      en: ['65% sales increase', '4.2% conversion rate', '5 min avg. session', '320% ROI in 3 months'], 
      uz: ["Sotish 65% o'sdi", '4.2% konversiya', "O'rtacha 5 min sessiya", '3 oyda 320% ROI'] 
    },
    timeline: '6 weeks', 
    teamSize: 2,
  },

  manaku: {
    name: 'Manaku Furniture',
    image: manakuImg,
    goal: { 
      ru: 'Разработать премиальный мебельный интернет-магазин с акцентом на визуальную подачу и UX.', 
      en: 'Develop a premium furniture e-commerce store focused on visual presentation and UX.', 
      uz: "Vizual taqdimot va UX ga yo'naltirilgan premium mebel onlayn do'konini ishlab chiqish." 
    },
    built: { 
      ru: 'Стильный e-commerce с анимациями, системой лояльности и Telegram-ботом для уведомлений.', 
      en: 'Stylish e-commerce with animations, product previews, loyalty system, and Telegram bot for notifications.', 
      uz: "Animatsiyalar, mahsulot ko'rinishlari, sodiqlik tizimi va Telegram-bot bilan zamonaviy e-commerce." 
    },
    features: { 
      ru: ['Визуальный каталог', 'Система лояльности', 'Telegram-бот', 'Мобильная адаптация', 'Быстрый заказ'], 
      en: ['Visual catalog', 'Loyalty system', 'Telegram bot', 'Mobile-first', 'Quick order'], 
      uz: ['Vizual katalog', 'Sodiqlik tizimi', 'Telegram-bot', 'Mobil-birinchi', 'Tez buyurtma'] 
    },
    stack: ['React', 'Node.js', 'MongoDB', 'Telegram Bot API'],
    results: { 
      ru: ['Рост заказов на 80%', 'Повторные покупки +45%', '95% положительных отзывов', 'Время загрузки < 2 сек'], 
      en: ['80% order increase', '+45% repeat purchases', '95% positive reviews', 'Load time < 2s'], 
      uz: ["Buyurtmalar 80% o'sdi", "Takroriy xaridlar +45%", '95% ijobiy sharhlar', "Yuklanish < 2 sek"] 
    },
    timeline: '8 weeks', 
    teamSize: 2,
  },

  modulbino: {
    name: 'ModulBino',
    image: modulbinoImg,
    goal: {
      ru: 'Создать продающий лендинг для компании модульного строительства.',
      en: 'Build a conversion-focused landing page for a modular construction company.',
      uz: 'Modul qurilish kompaniyasi uchun sotuvga yo‘naltirilgan landing yaratish.',
    },
    built: {
      ru: 'Современный сайт-визитка с презентацией услуг, преимуществ и быстрым способом связи.',
      en: 'Modern business landing showcasing services and quick contact.',
      uz: 'Xizmatlar va aloqa imkoniyati bilan zamonaviy landing.',
    },
    features: {
      ru: ['Презентация услуг', 'Форма заявки', 'Адаптивный дизайн', 'SEO-структура'],
      en: ['Service showcase', 'Lead form', 'Responsive design', 'SEO structure'],
      uz: ['Xizmatlar', 'Ariza forma', 'Moslashuvchan dizayn', 'SEO tuzilma'],
    },
    stack: ['React', 'TailwindCSS'],
    results: {
      ru: ['Запуск за 24 часа', 'Рост входящих заявок', 'Увеличение доверия'],
      en: ['Delivered in 24h', 'More inbound leads', 'Improved trust'],
      uz: ['24 soatda tayyor', 'So‘rovlar oshdi', 'Ishonch oshdi'],
    },
    timeline: '24 hours',
    teamSize: 2,
  },

  ecolife: {
    name: 'Eco Life Resort',
    image: ecolifeImg,
    goal: {
      ru: 'Создать минималистичный сайт горного курорта с удобной навигацией.',
      en: 'Develop a minimalistic mountain resort website.',
      uz: 'Tog‘ kurorti uchun minimalistik sayt yaratish.',
    },
    built: {
      ru: 'Сайт с описанием номеров, удобств, развлечений и точной локацией.',
      en: 'Website showcasing rooms, amenities and exact location.',
      uz: 'Xonalar va joylashuvni ko‘rsatadigan sayt.',
    },
    features: {
      ru: ['Галерея номеров', 'Интерактивная карта', 'Описание удобств', 'Маршрут до локации'],
      en: ['Room gallery', 'Interactive map', 'Amenities section', 'Route guide'],
      uz: ['Xonalar galereyasi', 'Interaktiv xarita', 'Qulayliklar', 'Yo‘l ko‘rsatma'],
    },
    stack: ['React', 'TailwindCSS'],
    results: {
      ru: ['Запуск за 72 часа', 'Рост бронирований', 'Увеличение онлайн-заявок'],
      en: ['Delivered in 72h', 'More bookings', 'More inquiries'],
      uz: ['72 soatda tayyor', 'Bronlar oshdi', 'So‘rovlar ko‘paydi'],
    },
    timeline: '72 hours',
    teamSize: 2,
  },

  pitstop: {
    name: 'PitStop Service Platform',
    image: pitstopImg,
    goal: {
      ru: 'Разработать веб-приложение для управления автосервисом.',
      en: 'Develop a web platform for auto service management.',
      uz: 'Avtoservis boshqaruv platformasi yaratish.',
    },
    built: {
      ru: 'Система учета клиентов, автомобилей и сервисных операций.',
      en: 'System for managing clients, vehicles and service workflows.',
      uz: 'Mijozlar va servis jarayonlarini boshqarish tizimi.',
    },
    features: {
      ru: ['CRM система', 'Учет автомобилей', 'Расписание мастеров', 'Управление задачами'],
      en: ['CRM system', 'Vehicle tracking', 'Technician scheduling', 'Task management'],
      uz: ['CRM tizimi', 'Avtomobil hisobi', 'Ustalar jadvali', 'Vazifa boshqaruvi'],
    },
    stack: ['React', 'Node.js', 'MongoDB', 'Netlify'],
    results: {
      ru: ['Оптимизация процессов', 'Снижение ошибок учета', 'Рост эффективности'],
      en: ['Process optimization', 'Reduced errors', 'Higher efficiency'],
      uz: ['Jarayon optimizatsiyasi', 'Xatolar kamaydi', 'Samaradorlik oshdi'],
    },
    timeline: '2 months',
    teamSize: 4,
  },

  mazzo: {
    name: 'Mazzo Premium',
    image: mazzoImg,
    goal: {
      ru: 'Создать премиальный интернет-магазин постельного белья.',
      en: 'Build a premium bedding e-commerce store.',
      uz: 'Premium yotoq jihozlari do‘koni yaratish.',
    },
    built: {
      ru: 'Luxury e-commerce с hotel-style эстетикой.',
      en: 'Luxury e-commerce with hotel-style aesthetics.',
      uz: 'Hotel uslubidagi premium e-commerce.',
    },
    features: {
      ru: ['Hero-слайдер', 'Каталог', 'Корзина', 'Мультиязычность'],
      en: ['Hero slider', 'Catalog', 'Cart', 'Multi-language'],
      uz: ['Hero slayder', 'Katalog', 'Savat', 'Ko‘p tilli'],
    },
    stack: ['React', 'TailwindCSS'],
    results: {
      ru: ['Рост онлайн-продаж', 'Увеличение среднего чека', 'Сильный визуальный бренд'],
      en: ['Sales growth', 'Higher AOV', 'Strong brand identity'],
      uz: ['Savdo oshdi', 'O‘rtacha chek oshdi', 'Kuchli brend'],
    },
    timeline: '5 weeks',
    teamSize: 2,
  },

  luxlight: {
    name: 'LuxLight LED',
    image: luxlightImg,
    goal: {
      ru: 'Создать лендинг для компании LED-освещения.',
      en: 'Develop a landing page for LED lighting solutions.',
      uz: 'LED yoritish kompaniyasi uchun landing yaratish.',
    },
    built: {
      ru: 'Презентационный сайт с каталогом продукции и формой заявки.',
      en: 'Presentation site with product showcase and lead form.',
      uz: 'Mahsulot taqdimoti va forma bilan sayt.',
    },
    features: {
      ru: ['Каталог продукции', 'Преимущества', 'Процесс работы', 'Форма заявки'],
      en: ['Product showcase', 'Benefits', 'Process explanation', 'Lead form'],
      uz: ['Mahsulotlar', 'Afzalliklar', 'Jarayon', 'Ariza forma'],
    },
    stack: ['React', 'TailwindCSS'],
    results: {
      ru: ['Рост заявок', 'Повышение доверия', 'Быстрый запуск'],
      en: ['More leads', 'Higher trust', 'Fast launch'],
      uz: ['So‘rovlar oshdi', 'Ishonch oshdi', 'Tez ishga tushdi'],
    },
    timeline: '72 hours',
    teamSize: 2,
  },

  essenza: {
    name: 'Essenza Perfumes',
    image: essenzaImg,
    goal: {
      ru: 'Создать премиальный сайт для бренда Essenza.',
      en: 'Build a premium website for the Essenza brand.',
      uz: 'Essenza brendi uchun premium sayt yaratish.'
    },
    built: {
      ru: 'Сайт с каталогом продукции, историей бренда и формой заказа.',
      en: 'Website with product catalog, brand story, and order form.',
      uz: 'Mahsulot katalogi, brend tarixi va buyurtma formasi bilan sayt.'
    },
    features: {
      ru: ['Каталог продукции', 'История бренда', 'Форма заказа', 'Мультиязычность'],
      en: ['Product catalog', 'Brand story', 'Order form', 'Multi-language'],
      uz: ['Mahsulot katalogi', 'Brend tarixi', 'Buyurtma formasi', 'Ko‘p tilli']
    },
    stack: ['React', 'TailwindCSS'],
    results: {
      ru: ['Рост узнаваемости', 'Увеличение заказов', 'Премиальный имидж'],
      en: ['Brand awareness growth', 'More orders', 'Premium perception'],
      uz: ['Brend mashhurligi oshdi', 'Buyurtmalar ko‘paydi', 'Premium imidj']
    },
    timeline: '2 weeks',
    teamSize: 2,
  },
};



const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, lang } = useLanguage();
  const caseData = id ? caseDetails[id] : null;

  if (!caseData) {
    return (
      <div className="py-32 text-center container mx-auto px-6">
        <h1 className="text-4xl font-bold">Case not found</h1>
        <Button variant="outline" className="mt-8" asChild>
          <Link to="/cases"><ArrowLeft size={16} /> {t.cases.backToList}</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeIn>
          <Link to="/cases" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8">
            <ArrowLeft size={16} /> {t.cases.backToList}
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{caseData.name}</h1>
        </FadeIn>

        <div className="mt-12 space-y-12">
          <FadeIn delay={0.1}>
            <div className="aspect-video rounded-2xl overflow-hidden">
              <img
                src={caseData.image}
                alt={caseData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">{t.cases.goal}</h3>
            <p className="mt-2 text-lg text-muted-foreground">{caseData.goal[lang]}</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">{t.cases.built}</h3>
            <p className="mt-2 text-lg text-muted-foreground">{caseData.built[lang]}</p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">{t.cases.features}</h3>
            <ul className="mt-3 grid md:grid-cols-2 gap-2">
              {caseData.features[lang].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> {f}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">{t.cases.stack}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {caseData.stack.map(s => (
                <span key={s} className="px-3 py-1 rounded-full border border-border text-sm">{s}</span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">{t.cases.results}</h3>
            <div className="mt-3 grid md:grid-cols-2 gap-3">
              {caseData.results[lang].map((r, i) => (
                <div key={i} className="p-4 rounded-xl bg-accent/5 border border-accent/10 text-foreground font-medium">{r}</div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <div><span className="font-semibold text-foreground">{t.cases.timeline}:</span> {caseData.timeline}</div>
              <div><span className="font-semibold text-foreground">{t.cases.teamSize}:</span> {caseData.teamSize}</div>
            </div>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="rounded-2xl hero-gradient p-10 text-center">
              <h3 className="text-2xl font-bold text-primary-foreground">{t.cases.ctaTitle}</h3>
              <Button variant="hero" size="xl" className="mt-6" asChild>
                <a href="https://t.me/LLC_VANTALAB" target="_blank" rel="noopener noreferrer">
                  <Send size={18} /> {t.cta.button}
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CaseDetail;
