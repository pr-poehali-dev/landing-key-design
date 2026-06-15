import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Обо мне", href: "#about" },
  { label: "Отзывы", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contact" },
];

const CATEGORIES = ["Все", "Брендинг", "Веб-дизайн", "Упаковка", "Типографика"];
const STYLES = ["Все стили", "Минимализм", "Модерн", "Классика"];

const PORTFOLIO = [
  {
    id: 1,
    title: "Brand Identity — «Форма»",
    category: "Брендинг",
    style: "Минимализм",
    year: "2024",
    img: "https://cdn.poehali.dev/projects/9d6c6b6b-3cae-453b-a4fd-77ccbfcc30e3/files/079b8b01-6256-4f47-8c94-3ef431a2dc88.jpg",
  },
  {
    id: 2,
    title: "UI/UX — «Архив»",
    category: "Веб-дизайн",
    style: "Модерн",
    year: "2024",
    img: "https://cdn.poehali.dev/projects/9d6c6b6b-3cae-453b-a4fd-77ccbfcc30e3/files/7c463784-b309-4429-a754-d38809d6ac24.jpg",
  },
  {
    id: 3,
    title: "Packaging — «Белый шум»",
    category: "Упаковка",
    style: "Минимализм",
    year: "2023",
    img: "https://cdn.poehali.dev/projects/9d6c6b6b-3cae-453b-a4fd-77ccbfcc30e3/files/460933b1-5ecd-4c31-9613-5fefb5a270e8.jpg",
  },
  {
    id: 4,
    title: "Logo System — «Север»",
    category: "Брендинг",
    style: "Классика",
    year: "2023",
    img: "https://cdn.poehali.dev/projects/9d6c6b6b-3cae-453b-a4fd-77ccbfcc30e3/files/079b8b01-6256-4f47-8c94-3ef431a2dc88.jpg",
  },
  {
    id: 5,
    title: "Web — «Студия»",
    category: "Веб-дизайн",
    style: "Минимализм",
    year: "2024",
    img: "https://cdn.poehali.dev/projects/9d6c6b6b-3cae-453b-a4fd-77ccbfcc30e3/files/7c463784-b309-4429-a754-d38809d6ac24.jpg",
  },
  {
    id: 6,
    title: "Type Poster — «Голос»",
    category: "Типографика",
    style: "Модерн",
    year: "2023",
    img: "https://cdn.poehali.dev/projects/9d6c6b6b-3cae-453b-a4fd-77ccbfcc30e3/files/460933b1-5ecd-4c31-9613-5fefb5a270e8.jpg",
  },
];

const SERVICES = [
  { icon: "Layers", title: "Брендинг", desc: "Логотип, фирменный стиль, гайдлайн — всё для узнаваемости вашего бизнеса" },
  { icon: "Monitor", title: "Веб-дизайн", desc: "Сайты и интерфейсы, которые конвертируют посетителей в клиентов" },
  { icon: "Package", title: "Упаковка", desc: "Дизайн упаковки, который выделяет продукт на полке" },
  { icon: "Type", title: "Типографика", desc: "Постеры, книги, журналы — работы с характером и смыслом" },
];

const REVIEWS = [
  { name: "Алексей М.", role: "Основатель стартапа", text: "Работает точно и чисто. Результат превзошёл ожидания — фирменный стиль получился именно таким, каким я его представлял." },
  { name: "Мария К.", role: "Директор по маркетингу", text: "Невероятное внимание к деталям. Упаковка, которую мы получили, стала настоящим конкурентным преимуществом." },
  { name: "Дмитрий В.", role: "Ресторатор", text: "Сайт и брендинг ресторана сделаны с душой. Гости часто спрашивают, кто делал — это говорит само за себя." },
];

const FAQS = [
  { q: "Сколько стоят услуги?", a: "Стоимость зависит от сложности проекта. Брендинг от 50 000 ₽, веб-дизайн от 80 000 ₽. Для точного расчёта — свяжитесь со мной." },
  { q: "Как долго длится проект?", a: "Логотип — 2 недели, полный брендинг — от 4 до 8 недель, сайт — от 3 недель. Сроки обговариваем индивидуально." },
  { q: "Работаете ли вы удалённо?", a: "Да, работаю с клиентами по всему миру. Все встречи проводим онлайн, документооборот — электронный." },
  { q: "Что входит в стоимость?", a: "Все концепции, правки в рамках брифа, финальные файлы в необходимых форматах, руководство по использованию." },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeStyle, setActiveStyle] = useState("Все стили");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = PORTFOLIO.filter((p) => {
    const catOk = activeCategory === "Все" || p.category === activeCategory;
    const styleOk = activeStyle === "Все стили" || p.style === activeStyle;
    return catOk && styleOk;
  });

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-body text-[#1a1a1a]">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F7F4]/90 backdrop-blur-md border-b border-[#e5e3dc]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            className="font-display text-xl font-light tracking-widest uppercase text-[#1a1a1a]"
          >
            Studio
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                className="text-xs tracking-widest uppercase text-[#888] hover:text-[#1a1a1a] transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#F8F7F4] border-t border-[#e5e3dc] px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                className="text-xs tracking-widest uppercase text-[#888] hover:text-[#1a1a1a] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="min-h-screen flex flex-col justify-center pt-16 px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="animate-fade-in-slow" style={{ animationDelay: "0ms" }}>
            <p className="text-xs tracking-[0.3em] uppercase text-[#aaa] mb-8">Дизайнер — Москва</p>
          </div>
          <h1
            className="font-display font-light text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight text-[#1a1a1a] animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            Дизайн,
            <br />
            <span style={{ fontStyle: "italic" }}>который</span>
            <br />
            говорит
          </h1>
          <div className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <p className="text-sm text-[#666] max-w-xs leading-relaxed font-light">
              Создаю визуальные системы для брендов, которые хотят быть запомненными
            </p>
            <button
              onClick={() => scrollTo("#portfolio")}
              className="group flex items-center gap-3 text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#666] transition-colors"
            >
              Смотреть работы
              <span className="inline-block w-8 h-px bg-current transition-all duration-300 group-hover:w-16" />
            </button>
          </div>
          <div className="mt-24 border-t border-[#e5e3dc] pt-8 grid grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: "500ms" }}>
            {[["50+", "Проектов"], ["8", "Лет опыта"], ["30+", "Клиентов"]].map(([num, label]) => (
              <div key={label}>
                <div className="font-display text-3xl font-light">{num}</div>
                <div className="text-xs tracking-widest uppercase text-[#aaa] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE GALLERY */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-12 md:col-span-7 group overflow-hidden">
                <div className="aspect-[16/11] overflow-hidden bg-[#f0eeea] relative">
                  <img
                    src="https://cdn.poehali.dev/projects/9d6c6b6b-3cae-453b-a4fd-77ccbfcc30e3/files/dfe2f487-245b-422a-a63d-557a4e838911.jpg"
                    alt="Editorial design"
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 text-white opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <div className="text-xs tracking-[0.3em] uppercase mb-1 text-white/70">Editorial</div>
                    <div className="font-display text-2xl font-light">Печатный разворот</div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-5 group overflow-hidden">
                <div className="aspect-[16/11] h-full overflow-hidden bg-[#f0eeea] relative">
                  <img
                    src="https://cdn.poehali.dev/projects/9d6c6b6b-3cae-453b-a4fd-77ccbfcc30e3/files/4714b969-de24-4b1e-ac39-402b0c8b432c.jpg"
                    alt="Typography poster"
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 text-white opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <div className="text-xs tracking-[0.3em] uppercase mb-1 text-white/70">Type</div>
                    <div className="font-display text-2xl font-light">Постер</div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-5 group overflow-hidden">
                <div className="aspect-[16/11] h-full overflow-hidden bg-[#f0eeea] relative">
                  <img
                    src="https://cdn.poehali.dev/projects/9d6c6b6b-3cae-453b-a4fd-77ccbfcc30e3/files/e0b7ecf6-8dfd-4424-94dc-0b81dc6a0f1a.jpg"
                    alt="Stationery branding"
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 text-white opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <div className="text-xs tracking-[0.3em] uppercase mb-1 text-white/70">Branding</div>
                    <div className="font-display text-2xl font-light">Фирменный стиль</div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-7 flex items-center justify-center bg-[#1a1a1a] aspect-[16/11] md:aspect-auto p-10">
                <div className="text-center">
                  <div className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-none text-white">
                    100<span className="text-[#666]">%</span>
                  </div>
                  <div className="text-xs tracking-[0.3em] uppercase text-[#888] mt-4">
                    внимания к деталям
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <p className="text-xs tracking-[0.3em] uppercase text-[#aaa] mb-4">Услуги</p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-light leading-tight mb-16">
              Что я делаю
            </h2>
          </RevealSection>
          <div className="grid md:grid-cols-2 gap-px bg-[#e5e3dc]">
            {SERVICES.map((s, i) => (
              <RevealSection key={s.title} delay={i * 100}>
                <div className="bg-[#F8F7F4] p-10 hover:bg-white transition-colors duration-300 group">
                  <Icon name={s.icon as "Layers"} size={24} className="text-[#aaa] mb-6 group-hover:text-[#1a1a1a] transition-colors" />
                  <h3 className="font-display text-2xl font-light mb-3">{s.title}</h3>
                  <p className="text-sm text-[#888] leading-relaxed">{s.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <p className="text-xs tracking-[0.3em] uppercase text-[#aaa] mb-4">Портфолио</p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-light leading-tight mb-12">
              Избранные работы
            </h2>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="flex flex-wrap gap-6 mb-12">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={`px-4 py-1.5 text-xs tracking-widest uppercase border transition-all duration-200 ${
                      activeCategory === c
                        ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                        : "bg-transparent text-[#888] border-[#ddd] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveStyle(s)}
                    className={`px-4 py-1.5 text-xs tracking-widest uppercase border transition-all duration-200 ${
                      activeStyle === s
                        ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                        : "bg-transparent text-[#888] border-[#ddd] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="group cursor-pointer"
                style={{
                  opacity: 1,
                  transition: `opacity 0.4s ease ${i * 50}ms`,
                }}
              >
                <div className="overflow-hidden aspect-[4/3] bg-[#f0eeea] mb-4">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-lg font-light">{p.title}</h3>
                    <p className="text-xs tracking-widest uppercase text-[#aaa] mt-1">{p.category} · {p.style}</p>
                  </div>
                  <span className="text-xs text-[#ccc] mt-1">{p.year}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-[#aaa] text-sm tracking-widest uppercase">
              Нет работ по выбранным фильтрам
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <RevealSection>
            <div className="aspect-[3/4] bg-[#e5e3dc] overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/9d6c6b6b-3cae-453b-a4fd-77ccbfcc30e3/files/079b8b01-6256-4f47-8c94-3ef431a2dc88.jpg"
                alt="Дизайнер"
                className="w-full h-full object-cover"
              />
            </div>
          </RevealSection>
          <RevealSection delay={200}>
            <p className="text-xs tracking-[0.3em] uppercase text-[#aaa] mb-6">Обо мне</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight mb-8">
              Дизайн — это не украшение, это язык
            </h2>
            <div className="space-y-4 text-sm text-[#666] leading-relaxed">
              <p>Меня зовут Анна. Я — дизайнер с 8-летним опытом работы с брендами от стартапов до крупных компаний.</p>
              <p>Верю, что хороший дизайн — это не про красоту, а про точность. Каждая линия, каждый отступ, каждый цвет — решение конкретной задачи.</p>
              <p>Работаю в Москве, сотрудничаю с клиентами по всему миру.</p>
            </div>
            <button
              onClick={() => scrollTo("#contact")}
              className="mt-10 inline-flex items-center gap-3 text-xs tracking-widest uppercase text-[#1a1a1a] hover:text-[#666] transition-colors group"
            >
              Начать проект
              <span className="inline-block w-8 h-px bg-current transition-all duration-300 group-hover:w-16" />
            </button>
          </RevealSection>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-32 px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <p className="text-xs tracking-[0.3em] uppercase text-[#666] mb-4">Отзывы</p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-light leading-tight mb-16 text-white">
              Что говорят клиенты
            </h2>
          </RevealSection>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <RevealSection key={r.name} delay={i * 150}>
                <div className="border-t border-[#333] pt-8">
                  <p className="font-display text-lg font-light text-[#ccc] leading-relaxed mb-8" style={{ fontStyle: "italic" }}>
                    «{r.text}»
                  </p>
                  <div>
                    <div className="text-sm font-medium text-white">{r.name}</div>
                    <div className="text-xs tracking-widest uppercase text-[#666] mt-1">{r.role}</div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <p className="text-xs tracking-[0.3em] uppercase text-[#aaa] mb-4">FAQ</p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-light leading-tight mb-16">
              Частые вопросы
            </h2>
          </RevealSection>
          <div className="divide-y divide-[#e5e3dc]">
            {FAQS.map((f, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center py-6 text-left group"
                  >
                    <span className="font-display text-xl font-light group-hover:text-[#666] transition-colors">{f.q}</span>
                    <Icon
                      name={openFaq === i ? "Minus" : "Plus"}
                      size={16}
                      className="text-[#aaa] flex-shrink-0 ml-4"
                    />
                  </button>
                  {openFaq === i && (
                    <div className="pb-6 text-sm text-[#666] leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 border-t border-[#e5e3dc]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <RevealSection>
            <p className="text-xs tracking-[0.3em] uppercase text-[#aaa] mb-4">Контакты</p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-light leading-tight mb-8">
              Начнём проект?
            </h2>
            <p className="text-sm text-[#666] leading-relaxed max-w-xs mb-12">
              Расскажите о вашей задаче — отвечу в течение суток и предложу решение
            </p>
            <div className="space-y-4 text-sm">
              {[
                { icon: "Mail", text: "hello@studio.design" },
                { icon: "Phone", text: "+7 (999) 000-00-00" },
                { icon: "MapPin", text: "Москва, Россия" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-[#666]">
                  <Icon name={icon as "Mail"} size={14} className="text-[#aaa]" />
                  {text}
                </div>
              ))}
            </div>
          </RevealSection>
          <RevealSection delay={200}>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {[
                { id: "name", label: "Имя", type: "text", placeholder: "Ваше имя" },
                { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              ].map((f) => (
                <div key={f.id}>
                  <label className="block text-xs tracking-widest uppercase text-[#aaa] mb-2">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full bg-transparent border-b border-[#e5e3dc] py-3 text-sm text-[#1a1a1a] placeholder-[#ccc] focus:outline-none focus:border-[#1a1a1a] transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#aaa] mb-2">Сообщение</label>
                <textarea
                  rows={4}
                  placeholder="Расскажите о проекте..."
                  className="w-full bg-transparent border-b border-[#e5e3dc] py-3 text-sm text-[#1a1a1a] placeholder-[#ccc] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1a1a1a] text-white text-xs tracking-widest uppercase py-4 hover:bg-[#333] transition-colors duration-300"
              >
                Отправить заявку
              </button>
            </form>
          </RevealSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-[#e5e3dc]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-display text-sm font-light tracking-widest uppercase text-[#aaa]">Studio © 2024</span>
          <div className="flex gap-6">
            {["Behance", "Instagram", "Telegram"].map((s) => (
              <a key={s} href="#" className="text-xs tracking-widest uppercase text-[#aaa] hover:text-[#1a1a1a] transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}