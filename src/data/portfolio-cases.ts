import ecolife from '@/assets/ecolife.webp';
import essenza from '@/assets/essenza.webp';
import luxlight from '@/assets/luxlight.webp';
import manaku from '@/assets/manaku.webp';
import mazzo from '@/assets/mazzo.webp';
import medicare from '@/assets/medicare.webp';
import modulbino from '@/assets/modulbino.webp';
import pitstop from '@/assets/pitstop.webp';
import bekhzod from '@/assets/bekhzod.webp';

export type LangKey = 'ru' | 'en' | 'uz';

export interface PortfolioCase {
  id: string;
  name: string;
  type: Record<LangKey, string>;
  url: string;
  featured: boolean;
  image: string | null;
  /** Short conversion-focused highlight for cards */
  highlight: Record<LangKey, string>;
  metric: Record<LangKey, string>;
}

export const portfolioCases: PortfolioCase[] = [
  {
    id: 'medicare',
    name: 'Medicare Uzbekistan',
    type: { ru: 'E-commerce', en: 'E-commerce', uz: 'E-commerce' },
    url: 'https://medicare.uz',
    featured: true,
    image: medicare,
    highlight: {
      ru: 'Онлайн-продажи медтоваров с быстрым чекаутом',
      en: 'Medical e‑commerce with a frictionless checkout',
      uz: "Tibbiy tovarlar uchun tez checkout bilan e‑commerce",
    },
    metric: { ru: '+65% продаж', en: '+65% sales', uz: "Sotish +65%" },
  },
  {
    id: 'manaku',
    name: 'Manaku Furniture',
    type: { ru: 'E-commerce', en: 'E-commerce', uz: 'E-commerce' },
    url: 'https://manaku.uz',
    featured: true,
    image: manaku,
    highlight: {
      ru: 'Премиальный каталог и рост повторных заказов',
      en: 'Premium catalog experience & repeat purchases',
      uz: "Premium katalog va takroriy buyurtmalar",
    },
    metric: { ru: '+80% заказов', en: '+80% orders', uz: "Buyurtmalar +80%" },
  },
  {
    id: 'modulbino',
    name: 'Modulbino Assembly',
    type: { ru: 'Лендинг', en: 'Landing Page', uz: 'Landing' },
    url: 'https://modulbino.uz',
    featured: false,
    image: modulbino,
    highlight: {
      ru: 'Лидогенерация для B2B‑услуг сборки',
      en: 'B2B lead generation for assembly services',
      uz: "Yig‘ish xizmatlari uchun B2B lidlar",
    },
    metric: { ru: '3.8% CR', en: '3.8% conv. rate', uz: '3.8% CR' },
  },
  {
    id: 'ecolife',
    name: 'EcoLife Etiqod',
    type: { ru: 'Корпоративный сайт', en: 'Corporate Website', uz: 'Korporativ sayt' },
    url: 'https://eco-life-etiqod.com',
    featured: false,
    image: ecolife,
    highlight: {
      ru: 'Доверие бренда и понятная воронка заявок',
      en: 'Brand trust with a clear inquiry funnel',
      uz: "Brend ishonchi va ariza voronkasi",
    },
    metric: { ru: '−42% отказов', en: '−42% bounce', uz: "-42% bounce" },
  },
  {
    id: 'pitstop',
    name: 'PitStop One',
    type: { ru: 'Веб-приложение', en: 'Web App', uz: 'Veb-ilova' },
    url: 'https://pitstop-one.netlify.app',
    featured: false,
    image: pitstop,
    highlight: {
      ru: 'MVP для операционных процессов в сервисе',
      en: 'Operations‑first MVP for service workflows',
      uz: "Servis jarayonlari uchun MVP",
    },
    metric: { ru: '2 недели до MVP', en: 'MVP in 2 weeks', uz: '2 haftada MVP' },
  },
  {
    id: 'mazzo',
    name: 'Mazzo Premium',
    type: { ru: 'E-commerce', en: 'E-commerce', uz: 'E-commerce' },
    url: 'https://mazzo-premium.netlify.app',
    featured: false,
    image: mazzo,
    highlight: {
      ru: 'Витрина премиум‑ассортимента под мобильный трафик',
      en: 'Premium assortment tuned for mobile shoppers',
      uz: "Mobil trafik uchun premium vitrina",
    },
    metric: { ru: '+2.1× AOV', en: '+2.1× AOV', uz: '+2.1× AOV' },
  },
  {
    id: 'luxlight',
    name: 'LuxLight LED',
    type: { ru: 'Лендинг', en: 'Landing Page', uz: 'Landing' },
    url: 'https://luxlight-demo.netlify.app',
    featured: false,
    image: luxlight,
    highlight: {
      ru: 'Продуктовый лендинг с фокусом на конверсию',
      en: 'Product landing focused on conversion',
      uz: "Konversiyaga yo'naltirilgan landing",
    },
    metric: { ru: '4.2% CR', en: '4.2% conv. rate', uz: '4.2% CR' },
  },
  {
    id: 'essenza',
    name: 'Essenza Perfumes',
    type: { ru: 'Лендинг', en: 'Landing Page', uz: 'Landing' },
    url: 'https://perfume-demo.netlify.app',
    featured: false,
    image: essenza,
    highlight: {
      ru: 'Сенсорный сторителлинг и быстрый заказ',
      en: 'Sensory storytelling with fast checkout',
      uz: "Tez buyurtma bilan hikoya",
    },
    metric: { ru: '+38% заявок', en: '+38% leads', uz: "Arizalar +38%" },
  },
  {
    id: 'bekhzod',
    name: 'Kodbekhzod',
    type: { ru: 'Веб-сайт', en: 'Web Site', uz: 'Veb-Sayt' },
    url: 'https://kodbekhzod.netlify.app',
    featured: false,
    image: bekhzod,
    highlight: {
      ru: 'Портфолио разработчика с сильным первым экраном',
      en: 'Developer portfolio with a decisive hero',
      uz: "Kuchli hero bilan portfolio",
    },
    metric: { ru: '<2s LCP', en: '<2s LCP', uz: '<2s LCP' },
  },
];
