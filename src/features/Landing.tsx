import { useState, useEffect } from 'react';
import { Zap, ArrowRight, BookOpen, Play, ChevronDown, Sun, Moon } from 'lucide-react';
import { useApp } from '../store/AppContext';

const techStack = ['REACT', 'TYPESCRIPT', 'TAILWIND', 'NEXT.JS', 'GRAPHQL', 'POSTGRES', 'INDEXEDDB', 'VITE', 'RECHARTS', 'PWA'];

const features = [
  {
    id: 'projects',
    icon: '◈',
    title: 'Projects',
    descEn: 'Track your experiments. Every project is a lesson.',
    descId: 'Setiap proyek adalah pelajaran berharga.',
    color: 'shadow-[6px_6px_0px_0px_#918efa]',
    iconBg: 'bg-[#e0e0ff] dark:bg-[var(--color-primary-container-dark)]',
    rotate: '-rotate-2',
    accent: 'border-[var(--color-primary-fixed-dim-light)]',
  },
  {
    id: 'kanban',
    icon: '⊟',
    title: 'Kanban',
    descEn: 'Organize chaos into action. One task at a time.',
    descId: 'Atur kekacauan jadi tindakan. Satu langkah tiap waktu.',
    color: 'shadow-[6px_6px_0px_0px_#06b6d4]',
    iconBg: 'bg-[#cffafe] dark:bg-[#083344]',
    rotate: 'rotate-1',
    accent: 'border-[#06b6d4]',
  },
  {
    id: 'notes',
    icon: '≡',
    title: 'Notes',
    descEn: 'Document your growth. Ideas become your legacy.',
    descId: 'Catat setiap perkembangan. Ide jadi warisanmu.',
    color: 'shadow-[6px_6px_0px_0px_#84cc16]',
    iconBg: 'bg-[#ecfccb] dark:bg-[#1a2e0d]',
    rotate: '-rotate-1',
    accent: 'border-[#84cc16]',
  },
  {
    id: 'analytics',
    icon: '▲',
    title: 'Analytics',
    descEn: "See how far you've come. The data never lies.",
    descId: 'Lihat sejauh mana kau melangkah. Data tak pernah bohong.',
    color: 'shadow-[6px_6px_0px_0px_#eab308]',
    iconBg: 'bg-[#ffe086] dark:bg-[#574500]',
    rotate: 'rotate-2',
    accent: 'border-[#eab308]',
  },
];

const stats = [
  { value: '100%', labelEn: 'Effort', labelId: 'Usaha' },
  { value: '0', labelEn: 'Excuses', labelId: 'Alasan' },
  { value: '∞', labelEn: 'Possibilities', labelId: 'Kemungkinan' },
  { value: '→', labelEn: 'Keep Going', labelId: 'Terus Melangkah' },
];

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const { theme, toggleTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const marqueeItems = [...techStack, ...techStack];

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-[#0e0e18] text-on-surface dark:text-[#e5e1ea]">

      {/* ── TOPBAR ── */}
      <header className={`sticky top-0 z-50 border-b-2 border-on-surface dark:border-[#a8a6ff] transition-all duration-150 ${scrolled ? 'bg-surface/95 dark:bg-[#0e0e18]/95 backdrop-blur-sm' : 'bg-surface dark:bg-[#0e0e18]'}`}>
        <div className="max-w-7xl mx-auto px-3 md:px-8 h-16 flex items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-primary dark:bg-[var(--color-primary-dark)] border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center shadow-[2px_2px_0px_0px_#1b1b22] dark:shadow-[2px_2px_0px_0px_#a8a6ff]">
              <Zap size={13} className="text-white" />
            </div>
            <span className="font-headline font-bold text-on-surface dark:text-[#e5e1ea] text-sm md:text-lg">LabsYusJuL</span>
          </div>

          <nav className="hidden md:flex items-center gap-1 font-mono text-xs" aria-label="Main navigation">
            {['Journey', 'Mantras', 'Philosophy', 'About'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="px-3 py-2 text-on-surface-variant dark:text-[#c8c4d4] hover:text-on-surface dark:hover:text-[#e5e1ea] hover:bg-surface-container dark:hover:bg-[#1e1e2a] border-2 border-transparent hover:border-on-surface dark:hover:border-[#464552] transition-all duration-150 min-h-[44px] flex items-center">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center border-2 border-on-surface dark:border-[#a8a6ff] hover:bg-surface-container dark:hover:bg-[#1e1e2a] shadow-[2px_2px_0px_0px_#1b1b22] dark:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all duration-150"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <button
              onClick={onEnter}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary dark:bg-[var(--color-primary-dark)] text-white border-2 border-on-surface dark:border-[#a8a6ff] font-mono text-xs font-bold shadow-[4px_4px_0px_0px_#1b1b22] dark:shadow-[4px_4px_0px_0px_#a8a6ff] hover:shadow-[6px_6px_0px_0px_#1b1b22] dark:hover:shadow-[6px_6px_0px_0px_#a8a6ff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 min-h-[44px]"
            >
              <Play size={12} />
              ENTER LABSYUSJUL
            </button>

            <button
              className="md:hidden p-2 border-2 border-on-surface dark:border-[#464552] min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span className="font-mono text-xs">{mobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-on-surface dark:border-[#464552] bg-surface dark:bg-[#0e0e18] px-4 py-3 space-y-1 animate-[pop_150ms_ease-out]">
            {['Journey', 'Mantras', 'Philosophy', 'About'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block px-3 py-2.5 font-mono text-xs text-on-surface dark:text-[#e5e1ea] hover:bg-surface-container dark:hover:bg-[#1e1e2a] min-h-[44px] flex items-center border border-transparent hover:border-on-surface dark:hover:border-[#464552]">
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        className="relative w-full min-h-[75vh] md:min-h-[88vh] flex flex-col items-center justify-center px-4 py-10 md:py-24 border-b-2 border-on-surface dark:border-[#a8a6ff] dot-grid overflow-hidden"
        aria-label="Hero section"
      >
        <div className="absolute top-1/4 left-8 w-28 h-28 border-4 border-primary/20 dark:border-[var(--color-primary-dark)]/20 rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-8 w-20 h-20 bg-[#ffe086] border-2 border-on-surface dark:border-[#a8a6ff] rotate-45 opacity-60 pointer-events-none shadow-[4px_4px_0px_0px_#1b1b22]" aria-hidden="true" />
        <div className="absolute top-12 right-1/4 w-4 h-4 bg-primary dark:bg-[var(--color-primary-dark)] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-[#84cc16] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center gap-4 md:gap-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs bg-surface dark:bg-[#1e1e2a] border-2 border-on-surface dark:border-[#a8a6ff] px-4 py-2 shadow-[2px_2px_0px_0px_#1b1b22] dark:shadow-[2px_2px_0px_0px_#a8a6ff]">
            <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
            [ SYSTEM STATUS: ONLINE ]
          </div>

          <h1 className="font-headline font-bold leading-tight text-on-surface dark:text-[#e5e1ea]">
            <span className="block text-[clamp(2rem,8vw,5rem)] leading-none tracking-tight mb-1 md:mb-2">
              Write Code.
            </span>
            <span className="inline-block text-[clamp(2rem,8vw,5rem)] leading-none tracking-tight px-3 md:px-4 py-0.5 md:py-1 bg-[#ffe086] dark:bg-[#574500] border-2 border-on-surface dark:border-[#a8a6ff] shadow-[6px_6px_0px_0px_#1b1b22] dark:shadow-[6px_6px_0px_0px_#a8a6ff] transform -rotate-1 mx-2">
              Break Things.
            </span>
            <span className="block text-[clamp(2rem,8vw,5rem)] leading-none tracking-tight mt-1 md:mt-2">
              Learn. Repeat.
            </span>
          </h1>

          <div className="font-body text-xs text-on-surface-variant dark:text-[#777584] -mt-3">
            Tulis kode. Rusak sesuatu. Belajar. Ulangi.
          </div>

          <p className="font-body text-body-sm md:text-body-lg text-on-surface-variant dark:text-[#c8c4d4] max-w-2xl bg-surface dark:bg-[#1e1e2a] border-2 border-on-surface dark:border-[#464552] px-4 py-3 md:px-6 md:py-4 shadow-[4px_4px_0px_0px_#1b1b22] dark:shadow-[4px_4px_0px_0px_#464552]">
            Every line you write today builds the developer you become tomorrow.
          </p>

          <p className="font-body text-xs text-on-surface-variant dark:text-[#777584] -mt-3">
            Setiap baris yang kau tulis hari ini membangun dirimu di masa depan.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full sm:w-auto">
            <button
              onClick={onEnter}
              className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-primary dark:bg-[var(--color-primary-dark)] text-white border-2 border-on-surface dark:border-[#a8a6ff] font-mono text-sm font-bold shadow-[6px_6px_0px_0px_#1b1b22] dark:shadow-[6px_6px_0px_0px_#a8a6ff] hover:shadow-[8px_8px_0px_0px_#1b1b22] dark:hover:shadow-[8px_8px_0px_0px_#a8a6ff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1.5 active:translate-y-1.5 active:shadow-none transition-all duration-150 min-h-[44px] md:min-h-[56px]"
            >
              <Zap size={16} />
              &gt; START BUILDING
            </button>
            <a
              href="#"
              className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-surface dark:bg-[#1e1e2a] text-on-surface dark:text-[#e5e1ea] border-2 border-on-surface dark:border-[#a8a6ff] font-mono text-sm font-bold shadow-[6px_6px_0px_0px_#1b1b22] dark:shadow-[6px_6px_0px_0px_#a8a6ff] hover:shadow-[8px_8px_0px_0px_#1b1b22] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1.5 active:translate-y-1.5 active:shadow-none transition-all duration-150 min-h-[44px] md:min-h-[56px]"
            >
              <BookOpen size={16} />
              MY JOURNEY
            </a>
          </div>

          <div className="flex flex-col items-center gap-1 mt-4 text-on-surface-variant dark:text-[#464552]">
            <span className="font-mono text-xs">SCROLL TO EXPLORE</span>
            <ChevronDown size={16} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="w-full bg-on-surface dark:bg-[#a8a6ff] border-b-2 border-on-surface dark:border-[#a8a6ff] overflow-hidden py-3 flex items-center" aria-hidden="true">
        <div className="marquee-track font-mono text-sm font-bold text-surface dark:text-[#1b1b22]">
          {marqueeItems.map((item, i) => (
            <span key={i} className="mx-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-[var(--color-primary-dark)] inline-block flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section id="journey" className="w-full py-8 md:py-16 px-4 md:px-8 bg-surface-container-low dark:bg-[#0e0e18] border-b-2 border-on-surface dark:border-[#a8a6ff]" aria-label="Motivation stats">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-2 border-on-surface dark:border-[#a8a6ff] shadow-[8px_8px_0px_0px_#1b1b22] dark:shadow-[8px_8px_0px_0px_#a8a6ff]">
            {stats.map((stat, i) => (
              <div key={stat.labelEn} className={`flex flex-col items-center justify-center py-4 px-2 md:py-10 md:px-4 bg-surface dark:bg-[#1e1e2a] text-center ${i < stats.length - 1 ? 'border-r-2 border-on-surface dark:border-[#a8a6ff]' : ''} ${i === 1 ? 'border-b-2 md:border-b-0 border-on-surface dark:border-[#a8a6ff]' : ''}`}>
                <p className="font-headline font-bold text-[1.35rem] md:text-[2.5rem] leading-none text-primary dark:text-[var(--color-primary-fixed-dim-dark)] mb-1 md:mb-2">{stat.value}</p>
                <p className="font-mono text-[9px] md:text-xs uppercase tracking-widest text-on-surface-variant dark:text-[#777584]">{stat.labelEn}</p>
                <p className="font-mono text-[8px] md:text-[10px] text-on-surface-variant/60 dark:text-[#777584]/60 mt-0.5">{stat.labelId}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES / MANTRAS ── */}
      <section id="mantras" className="w-full py-12 md:py-20 px-4 md:px-8 bg-surface dark:bg-[#0e0e18] border-b-2 border-on-surface dark:border-[#a8a6ff]" aria-labelledby="mantras-heading">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between border-b-2 border-on-surface dark:border-[#464552] pb-4 mb-6 md:mb-12">
            <div>
              <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584] mb-1">[ CORE MANTRAS ]</p>
              <h2 id="mantras-heading" className="font-headline font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-[#e5e1ea]">
                Principles to build by.
              </h2>
              <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584] mt-1">Prinsip yang menuntun setiap langkah.</p>
            </div>
            <span className="hidden md:block font-mono text-xs text-on-surface-variant dark:text-[#464552]">V_1.0.0</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {features.map(feat => (
              <article
                key={feat.id}
                className={`bg-surface dark:bg-[#1e1e2a] border-2 border-on-surface dark:border-[#a8a6ff] p-3 md:p-6 flex flex-col h-full ${feat.color} transform ${feat.rotate} hover:rotate-0 transition-transform duration-200`}
              >
                <div className={`w-8 h-8 md:w-12 md:h-12 ${feat.iconBg} border-2 border-on-surface dark:border-[#464552] flex items-center justify-center mb-2 md:mb-5 flex-shrink-0`}>
                  <span className="font-mono text-xs md:text-xl text-on-surface dark:text-[#e5e1ea]">{feat.icon}</span>
                </div>

                <h3 className="font-headline font-bold text-sm md:text-headline-sm text-on-surface dark:text-[#e5e1ea] mb-1 md:mb-3">{feat.title}</h3>
                <p className="font-body text-[11px] md:text-body-md text-on-surface-variant dark:text-[#c8c4d4]">{feat.descEn}</p>
                <p className="font-body text-[10px] md:text-xs text-on-surface-variant/60 dark:text-[#777584]/60 mt-1 flex-grow">{feat.descId}</p>

                <div className="mt-3 md:mt-6 pt-2 md:pt-4 border-t-2 border-on-surface dark:border-[#464552] flex items-center justify-between">
                  <button
                    onClick={onEnter}
                    className="font-mono text-xs text-on-surface dark:text-[#e5e1ea] hover:text-primary dark:hover:text-[var(--color-primary-fixed-dim-dark)] transition-colors flex items-center gap-2"
                  >
                    &gt; EXPLORE <ArrowRight size={12} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section id="philosophy" className="w-full py-8 md:py-20 px-4 md:px-8 bg-surface-container-low dark:bg-[#12121a] border-b-2 border-on-surface dark:border-[#a8a6ff]" aria-labelledby="philosophy-heading">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584] mb-2">[ PHILOSOPHY ]</p>
          <h2 id="philosophy-heading" className="font-headline font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-[#e5e1ea] mb-2">
            Wisdom from the journey.
          </h2>
          <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584] mb-4 md:mb-12">Kebijaksanaan dari setiap perjalanan.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {[
              {
                step: '01',
                title: 'Kaizen',
                en: '1% better every day. Small steps lead to big changes.',
                id: '1% lebih baik setiap hari. Langkah kecil menuju perubahan besar.',
                color: 'bg-primary dark:bg-[var(--color-primary-dark)]',
              },
              {
                step: '02',
                title: 'Kintsugi',
                en: 'Embrace imperfection. Your flaws tell your story.',
                id: 'Terima ketidaksempurnaan. Cacatmu adalah ceritamu.',
                color: 'bg-[#06b6d4]',
              },
              {
                step: '03',
                title: 'Ikigai',
                en: 'Purpose drives mastery. Find your reason to build.',
                id: 'Tujuan mendorong penguasaan. Temukan alasanmu berkarya.',
                color: 'bg-[#84cc16]',
              },
            ].map(item => (
              <div key={item.step} className="border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] p-3 md:p-6 shadow-[6px_6px_0px_0px_#1b1b22] dark:shadow-[6px_6px_0px_0px_#a8a6ff]">
                <div className={`w-8 h-8 md:w-10 md:h-10 ${item.color} border-2 border-on-surface dark:border-[#464552] flex items-center justify-center mb-2 md:mb-5`}>
                  <span className="font-mono text-xs md:text-sm font-bold text-white dark:text-[#0e0e18]">{item.step}</span>
                </div>
                <h3 className="font-headline font-bold text-sm md:text-headline-sm text-on-surface dark:text-[#e5e1ea] mb-1 md:mb-3">{item.title}</h3>
                <p className="font-body text-[11px] md:text-body-md text-on-surface-variant dark:text-[#c8c4d4]">{item.en}</p>
                <p className="font-body text-[10px] md:text-xs text-on-surface-variant/60 dark:text-[#777584]/60 mt-1">{item.id}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section id="about" className="w-full py-12 md:py-20 px-4 md:px-8 bg-on-surface dark:bg-[var(--color-primary-dark)] border-b-2 border-on-surface dark:border-[#a8a6ff]" aria-label="Call to action">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-4 md:gap-6">
          <div className="font-mono text-[10px] md:text-xs text-surface/60 dark:text-white/60 uppercase tracking-widest">[ Ready to begin? ]</div>
          <h2 className="font-headline font-bold text-[clamp(1.5rem,6vw,3.5rem)] leading-tight text-surface dark:text-white">
            Your journey.<br />Your pace. Your masterpiece.
          </h2>
          <p className="font-body text-body-sm md:text-body-lg text-surface/70 dark:text-white/70 max-w-xl">
            Every expert was once a beginner. Keep building.
          </p>
          <p className="font-body text-xs text-surface/50 dark:text-white/50 -mt-2 md:-mt-3">
            Setiap ahli dulu pernah jadi pemula. Teruslah berkarya.
          </p>
          <button
            onClick={onEnter}
            className="flex items-center gap-3 px-6 py-3 md:px-10 md:py-5 bg-[#ffe086] text-[#1b1b22] border-2 border-surface dark:border-white font-mono text-sm font-bold shadow-[6px_6px_0px_0px_rgba(255,255,255,0.4)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.4)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1.5 active:translate-y-1.5 active:shadow-none transition-all duration-150 min-h-[44px] md:min-h-[60px]"
          >
            <Zap size={18} />
            &gt; ENTER LABSYUSJUL
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-surface dark:bg-[#0e0e18] border-t-2 border-on-surface dark:border-[#a8a6ff] px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-primary dark:bg-[var(--color-primary-dark)] border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center">
              <Zap size={10} className="text-white" />
            </div>
            <span className="font-mono text-xs font-bold text-on-surface dark:text-[#e5e1ea]">© 2026 LABSYUSJUL // KEEP BUILDING</span>
          </div>
          <nav className="flex gap-2 flex-wrap justify-center" aria-label="Footer navigation">
            {['System Status', 'Journey', 'Philosophy', 'About'].map(item => (
              <a key={item} href={`#${item === 'System Status' ? 'journey' : item.toLowerCase()}`} className="font-mono text-xs text-on-surface-variant dark:text-[#777584] hover:text-on-surface dark:hover:text-[#e5e1ea] px-2 py-1 hover:underline min-h-[44px] flex items-center">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}