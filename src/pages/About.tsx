import { useLanguage } from '@/lib/i18n';
import FadeIn from '@/components/FadeIn';
import { Star, Zap, HeartHandshake, User } from 'lucide-react';

import ceoImg from '@/assets/team/ceo.webp';
import cofounderImg from '@/assets/team/cofounder.webp';

const valueIcons = [Star, HeartHandshake, Zap, User];
const teamImages = [ceoImg, cofounderImg];

const About = () => {
  const { t } = useLanguage();

  return (
    <section>
      <div className="container mx-auto px-6">
        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {t.about.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            {t.about.subtitle}
          </p>
          <p className="mt-6 text-lg text-foreground max-w-2xl leading-relaxed">
            {t.about.mission}
          </p>
        </FadeIn>

        {/* Values */}
        <div className="mt-20">
          <FadeIn>
            <h2 className="text-2xl md:text-4xl font-bold">
              {t.about.valuesTitle}
            </h2>
          </FadeIn>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.values.map((val, i) => {
              const Icon = valueIcons[i];
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-7 rounded-2xl border border-border bg-card group hover:border-accent/30 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold">{val.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {val.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mt-24">
          <FadeIn>
            <h2 className="text-2xl md:text-4xl font-bold">
              {t.team.title}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              {t.team.subtitle}
            </p>
            <p className="mt-4 text-foreground max-w-xl">
              {t.team.desc}
            </p>
          </FadeIn>

          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-2xl">
            {t.team.members.map((member, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="p-8 rounded-2xl border border-border bg-card">
                  
                  <img
                    src={teamImages[i]}
                    alt={member.name}
                    className="w-20 h-20 rounded-2xl object-cover mb-5"
                  />

                  <h3 className="text-xl font-semibold">
                    {member.name}
                  </h3>
                  <p className="text-sm text-accent font-medium mt-1">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {member.bio}
                  </p>

                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;