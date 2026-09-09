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
    <div className="pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-28">
      <div className="container min-w-0">
        <FadeIn>
          <p className="text-xs sm:text-sm font-medium text-[#8B8F98]">
            {t.nav.contact}
          </p>
          <h1 className="mt-2 font-heading font-bold text-3xl xs:text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#F4F5F7] max-w-3xl leading-[1.05]">
            {t.contact.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#8B8F98] max-w-2xl leading-relaxed">
            {t.contact.subtitle}
          </p>
        </FadeIn>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 max-w-5xl min-w-0">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-5 min-w-0">
              <div>
                <label className="text-xs font-medium text-[#8B8F98] mb-2 block">
                  {t.contact.form.name}
                </label>
                <Input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="h-12 rounded-xl border-white/[0.08] bg-[#0D0F13] text-[#F4F5F7] placeholder:text-[#8B8F98]/40 focus-visible:ring-2 focus-visible:ring-white/40"
                  required
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#8B8F98] mb-2 block">
                  {t.contact.form.email}
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="h-12 rounded-xl border-white/[0.08] bg-[#0D0F13] text-[#F4F5F7] placeholder:text-[#8B8F98]/40 focus-visible:ring-2 focus-visible:ring-white/40"
                  required
                  maxLength={255}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#8B8F98] mb-2 block">
                  {t.contact.form.message}
                </label>
                <Textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={4}
                  className="rounded-xl border-white/[0.08] bg-[#0D0F13] text-[#F4F5F7] placeholder:text-[#8B8F98]/40 focus-visible:ring-2 focus-visible:ring-white/40 resize-none"
                  required
                  maxLength={1000}
                />
              </div>
              <Button type="submit" variant="vanta" size="lg" className="w-full h-12 rounded-full text-xs font-semibold">
                {t.contact.form.send}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-4 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-[#8B8F98]">{t.contact.directLine}</p>
            
            <a
              href="https://t.me/LLC_VANTALAB"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl border border-white/[0.08] bg-[#0D0F13] transition-all duration-200 hover:border-white/[0.18] group"
            >
              <div className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center shrink-0">
                <Send size={18} className="text-[#F4F5F7]" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-[#F4F5F7]">{t.contact.telegram}</p>
                <p className="text-xs text-[#8B8F98]">@LLC_VANTALAB</p>
              </div>
            </a>

            <a
              href="https://wa.me/998903173808"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl border border-white/[0.08] bg-[#0D0F13] transition-all duration-200 hover:border-white/[0.18] group"
            >
              <div className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center shrink-0">
                <MessageCircle size={18} className="text-[#F4F5F7]" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-[#F4F5F7]">{t.contact.whatsapp}</p>
                <p className="text-xs text-[#8B8F98]">+998 90 317 38 08</p>
              </div>
            </a>

            <a
              href="mailto:info@vantalab.uz"
              className="flex items-center gap-4 p-5 rounded-2xl border border-white/[0.08] bg-[#0D0F13] transition-all duration-200 hover:border-white/[0.18] group"
            >
              <div className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center shrink-0">
                <Mail size={18} className="text-[#F4F5F7]" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-[#F4F5F7]">{t.contact.emailLabel}</p>
                <p className="text-xs text-[#8B8F98]">info@vantalab.uz</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
