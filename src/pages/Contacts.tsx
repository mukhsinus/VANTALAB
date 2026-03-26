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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);

    const res = await fetch(
      "/api/contact",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();

    if (data.status === "success") {
      toast.success("Message sent!");
      setForm({ name: "", email: "", message: "" });
    } else {
      toast.error(data.message || "Failed to send");
      console.error("Server error:", data);
    }
  } catch (err) {
    console.error("Error:", err);
    toast.error("Error sending message");
  }
};

  return (
    <div className="pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
      <div className="container min-w-0">
        <FadeIn>
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6C5CE7] text-center">
            {t.nav.contact}
          </p>
          <h1 className="mt-3 text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white max-w-3xl leading-[1.08] text-center mx-auto">
            {t.contact.title}
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/45 max-w-2xl leading-relaxed text-center mx-auto">
            {t.contact.subtitle}
          </p>
        </FadeIn>

        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 max-w-5xl min-w-0 mx-auto">
          <FadeIn delay={0.08}>
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 min-w-0">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-white/40 mb-2 block">
                  {t.contact.form.name}
                </label>
                <Input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="h-12 rounded-full border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 focus-visible:ring-[#6C5CE7]/40"
                  required
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-white/40 mb-2 block">
                  {t.contact.form.email}
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="h-12 rounded-full border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 focus-visible:ring-[#6C5CE7]/40"
                  required
                  maxLength={255}
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-white/40 mb-2 block">
                  {t.contact.form.message}
                </label>
                <Textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={4}
                  className="rounded-2xl border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 focus-visible:ring-[#6C5CE7]/40 resize-none"
                  required
                  maxLength={1000}
                />
              </div>
              <Button type="submit" variant="vanta" size="lg" className="w-full h-12 rounded-full text-[15px]">
                {t.contact.form.send}
              </Button>
            </form>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="space-y-3 sm:space-y-4 min-w-0">
              <p className="text-sm text-white/35 leading-relaxed lg:pt-2">{t.contact.directLine}</p>
              <a
                href="https://t.me/LLC_VANTALAB"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 rounded-[1.25rem] border border-white/[0.08] bg-white/[0.02] glow-border-hover transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/10 flex items-center justify-center">
                  <Send size={20} className="text-[#B4A9F7]" />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.contact.telegram}</p>
                  <p className="text-sm text-white/40">@LLC_VANTALAB</p>
                </div>
              </a>

              <a
                href="https://wa.me/998903173808"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 rounded-[1.25rem] border border-white/[0.08] bg-white/[0.02] glow-border-hover transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/10 flex items-center justify-center">
                  <MessageCircle size={20} className="text-[#B4A9F7]" />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.contact.whatsapp}</p>
                  <p className="text-sm text-white/40">+998 90 317 38 08</p>
                </div>
              </a>

              <a
                href="mailto:info@vantalab.uz"
                className="flex items-center gap-4 p-6 rounded-[1.25rem] border border-white/[0.08] bg-white/[0.02] glow-border-hover transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/10 flex items-center justify-center">
                  <Mail size={20} className="text-[#B4A9F7]" />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.contact.emailLabel}</p>
                  <p className="text-sm text-white/40">info@vantalab.uz</p>
                </div>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
