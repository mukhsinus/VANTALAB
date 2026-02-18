import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import FadeIn from '@/components/FadeIn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, MessageCircle, Mail } from 'lucide-react';
import { toast } from 'sonner';

const Contacts = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    toast.success('Message sent!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section>
      <div className="container mx-auto px-6">
        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{t.contact.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">{t.contact.subtitle}</p>
        </FadeIn>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 max-w-5xl">
          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium mb-2 block">{t.contact.form.name}</label>
                <Input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="h-12"
                  required
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{t.contact.form.email}</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="h-12"
                  required
                  maxLength={255}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{t.contact.form.message}</label>
                <Textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={5}
                  required
                  maxLength={1000}
                />
              </div>
              <Button type="submit" size="xl" className="w-full">
                {t.contact.form.send}
              </Button>
            </form>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <a
                href="https://t.me/LLC_VANTALAB"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-accent/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Send size={20} className="text-accent" />
                </div>
                <div>
                  <p className="font-semibold">{t.contact.telegram}</p>
                  <p className="text-sm text-muted-foreground">@LLC_VANTALAB</p>
                </div>
              </a>

              <a
                href="https://wa.me/998903173808"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-accent/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <MessageCircle size={20} className="text-accent" />
                </div>
                <div>
                  <p className="font-semibold">{t.contact.whatsapp}</p>
                  <p className="text-sm text-muted-foreground">+998 90 317 38 08</p>
                </div>
              </a>

              <a
                href="mailto:info@vantalab.uz"
                className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-accent/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail size={20} className="text-accent" />
                </div>
                <div>
                  <p className="font-semibold">{t.contact.emailLabel}</p>
                  <p className="text-sm text-muted-foreground">info@vantalab.uz</p>
                </div>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
