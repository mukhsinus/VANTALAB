import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import FadeIn from '@/components/FadeIn';
import { ArrowRight, ExternalLink } from 'lucide-react';

import ecolife from '@/assets/ecolife.webp';
import essenza from '@/assets/essenza.webp';
import luxlight from '@/assets/luxlight.webp';
import manaku from '@/assets/manaku.webp';
import mazzo from '@/assets/mazzo.webp';
import medicare from '@/assets/medicare.webp';
import modulbino from '@/assets/modulbino.webp';
import pitstop from '@/assets/pitstop.webp';

const casesData = [
  {
    id: 'medicare',
    name: 'Medicare Uzbekistan',
    type: { ru: 'E-commerce', en: 'E-commerce', uz: 'E-commerce' },
    url: 'https://medicare.uz',
    featured: true,
    image: medicare,
  },
  {
    id: 'manaku',
    name: 'Manaku Furniture',
    type: { ru: 'E-commerce', en: 'E-commerce', uz: 'E-commerce' },
    url: 'https://manaku.uz',
    featured: true,
    image: manaku,
  },
  {
    id: 'modulbino',
    name: 'Modulbino Assembly',
    type: { ru: 'Лендинг', en: 'Landing Page', uz: 'Landing' },
    url: 'https://modulbino.uz',
    featured: false,
    image: modulbino,
  },
  {
    id: 'ecolife',
    name: 'EcoLife Etiqod',
    type: { ru: 'Корпоративный сайт', en: 'Corporate Website', uz: 'Korporativ sayt' },
    url: 'https://eco-life-etiqod.com',
    featured: false,
    image: ecolife,
  },
  {
    id: 'pitstop',
    name: 'PitStop One',
    type: { ru: 'Веб-приложение', en: 'Web App', uz: 'Veb-ilova' },
    url: 'https://pitstop-one.netlify.app',
    featured: false,
    image: pitstop,
  },
  {
    id: 'mazzo',
    name: 'Mazzo Premium',
    type: { ru: 'E-commerce', en: 'E-commerce', uz: 'E-commerce' },
    url: 'https://mazzo-premium.netlify.app',
    featured: false,
    image: mazzo,
  },
  {
    id: 'luxlight',
    name: 'LuxLight LED',
    type: { ru: 'Лендинг', en: 'Landing Page', uz: 'Landing' },
    url: 'https://luxlight-demo.netlify.app',
    featured: false,
    image: luxlight,
  },
  {
    id: 'essenza',
    name: 'Essenza Perfumes',
    type: { ru: 'Лендинг', en: 'Landing Page', uz: 'Landing' },
    url: 'https://perfume-demo.netlify.app',
    featured: false,
    image: essenza,
  },
  {
    id: '9',
    name: 'Coming Soon',
    type: { ru: 'Веб-приложение', en: 'Web App', uz: 'Veb-ilova' },
    url: '',
    featured: false,
    image: null,
  },
  {
    id: '10',
    name: 'Coming Soon',
    type: { ru: 'E-commerce', en: 'E-commerce', uz: 'E-commerce' },
    url: '',
    featured: false,
    image: null,
  },
];

const Cases = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-0 md:py-2">
      <div className="container mx-auto px-6">

        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {t.cases.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            {t.cases.subtitle}
          </p>
        </FadeIn>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {casesData.map((c, i) => (
            <FadeIn key={c.id} delay={i * 0.05}>
              <div
                onClick={() => navigate(`/cases/${c.id}`)}
                className={`group cursor-pointer rounded-2xl border border-border bg-card hover:border-accent/30 transition-all hover:shadow-lg overflow-hidden ${
                  c.featured ? 'md:col-span-1' : ''
                }`}
              >
                {/* Preview */}
                <div className="aspect-video relative overflow-hidden">

                  {c.image ? (
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="text-xl text-muted-foreground">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-4 right-4 flex items-center gap-1 bg-black/70 backdrop-blur px-3 py-1.5 rounded-xl text-sm text-white hover:bg-black transition"
                    >
                      Live <ExternalLink size={14} />
                    </a>
                  )}

                </div>

                {/* Info */}
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {c.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {c.type[lang]}
                    </p>
                  </div>

                  <ArrowRight
                    size={20}
                    className="text-muted-foreground group-hover:text-accent transition-colors"
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Cases;