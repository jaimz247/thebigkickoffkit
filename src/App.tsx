/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, 
  ArrowRight, 
  Zap, 
  CheckCircle, 
  Trophy, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  ArrowUpRight, 
  ChevronRight,
  TrendingUp,
  Clock,
  BookOpen,
  Users,
  X,
  Lightbulb,
  Mail
} from 'lucide-react';

// Import custom modular components
import { PRODUCTS } from './types';
import { EarningsCalculator } from './components/EarningsCalculator';
import { ProductCard, ComingSoonCard } from './components/ProductCard';
import { CommissionTable } from './components/CommissionTable';
import { PromoKit } from './components/PromoKit';
import { FAQSection } from './components/FAQ';

const TICKER_PAYOUTS = [
  { user: "@alex_creates", amount: "$54.00", product: "BKK Bundle", time: "2m ago" },
  { user: "@football_banter", amount: "$28.50", product: "Offside, Darling", time: "5m ago" },
  { user: "@soccer_mom_blogs", amount: "$14.00", product: "Kick & Discover", time: "8m ago" },
  { user: "@watch_party_pro", amount: "$137.50", product: "Super-Affiliate Stack", time: "12m ago" },
  { user: "@kickoff_couples", amount: "$42.50", product: "Offside, Darling", time: "15m ago" },
  { user: "@euro_fanatic", amount: "$28.00", product: "The Big Kickoff Kit", time: "18m ago" },
  { user: "@parenting_grid", amount: "$28.00", product: "Kick & Discover", time: "21m ago" },
  { user: "@cup_updates", amount: "$112.00", product: "Double Upgrade Combo", time: "25m ago" },
];

const QUICK_TIPS = [
  "Best time to post is 2 hours before kickoff when fan hype peaks!",
  "Story screenshots work best—let fans capture the 'Peace Treaty' easily on Instagram/TikTok.",
  "Pitch watch-party bingo to sports group chats—it gets instant multi-buyer orders.",
  "Pin your affiliate link to your link-in-bio before major game matchweeks.",
  "Couple memes on Reels & TikTok convert incredibly well for the Offside, Darling kit.",
  "Emphasize '100% screen-free kids entertainment' in parenting groups to sell KD."
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'relationship' | 'party' | 'parenting'>('all');

  // Copy success status state
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Toast notifications state
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);

  const addToast = (message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Bottom Sticky CTA and Quick Tips states
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [showTip, setShowTip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 500px (past Hero section)
      if (window.scrollY > 500) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLinkPlaceholder = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotification(label);
    addToast(`📋 Copied ${label} link to your clipboard!`);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col font-sans selection:bg-gold selection:text-[#0A0A0A] overflow-x-hidden antialiased">
      
      {/* GLOBAL URGENCY ANNOUNCEMENT BAR */}
      <div className="bg-[#1a0f0f] text-white border-b border-gold/30 text-[10px] sm:text-[11px] font-mono py-2.5 px-4 text-center relative z-50 flex flex-wrap items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
        <span className="font-bold tracking-wider uppercase text-red-400">🚨 World Cup Peak Campaign:</span>
        <span className="text-slate-300">The tournament wraps up in less than 2 weeks. Organic search & host buying urgency are at an absolute peak right now! Secure your partner cookie links today.</span>
      </div>

      {/* 0. BRAND HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#333] px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-tr from-gold to-gold-light flex items-center justify-center font-mono font-bold text-[#0A0A0A] shadow-md">
              K
            </div>
            <span className="font-serif text-lg font-black tracking-wider text-[#F5F5F5] uppercase italic">
              thebig<span className="text-gold">kickoff</span>
              <span className="font-mono text-[9px] text-gold tracking-normal ml-1.5 uppercase bg-[#161616] px-2 py-0.5 rounded-sm border border-gold/10">
                Partner Hub
              </span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wider uppercase text-slate-400 font-mono">
            <a href="#calculator" className="hover:text-gold transition-colors">Earnings Calculator</a>
            <a href="#showcase" className="hover:text-gold transition-colors">The Products</a>
            <a href="#promo-kit" className="hover:text-gold transition-colors">Done-For-You Kit</a>
            <a href="#faq" className="hover:text-gold transition-colors">FAQ Support</a>
          </nav>

          <a
            href="#signup"
            className="cta-btn inline-flex items-center gap-1 px-4 py-2 text-xs"
          >
            Join Free
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <main className="flex-1">
        
        {/* SECTION 1: HERO - Confident, money-focused hook, trust strip */}
        <section className="relative py-24 md:py-32 px-4 overflow-hidden border-b border-[#333]">
          {/* Radial grid backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(#333333_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
          
          {/* Premium color ambient glows */}
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
            
            {/* Tagline / Hook */}
            <span className="badge border-gold/20 text-gold inline-flex items-center gap-2">
              <Zap className="w-3 h-3 text-gold animate-pulse" /> WORLD CUP 2026 AFFILIATE PROGRAM
            </span>

            {/* Core Hook Headline */}
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-serif italic uppercase text-[#F5F5F5] font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Turn Football Traffic Into <span className="gold-gradient">50% Cash Commissions</span>
            </h1>

            {/* Subtitle - Target NICHE creators directly */}
            <p className="text-[#A0A0A0] max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-sans">
              We create beautiful, high-converting digital printables for <span className="text-slate-200 font-semibold underline decoration-gold/50">relationship humor</span>, <span className="text-slate-200 font-semibold underline decoration-gold/50">watch party hosting</span>, and <span className="text-slate-200 font-semibold underline decoration-gold/50">educational parenting</span> accounts. Our top affiliates average $1,200+ per game week. 
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <a
                href="#signup"
                className="cta-btn w-full sm:w-auto px-8 py-4 text-sm"
              >
                Become an Affiliate
              </a>
              <a
                href="#calculator"
                className="w-full sm:w-auto px-8 py-4 rounded-sm font-mono font-bold text-sm tracking-widest uppercase transition-all duration-300 bg-[#0A0A0A] border border-[#333] hover:border-gold hover:text-gold text-slate-300 active:scale-[0.98] cursor-pointer"
              >
                Project Your Earnings
              </a>
            </div>

            {/* Micro Audience Alignment Tabs */}
            <div className="pt-8 max-w-3xl mx-auto font-mono">
              <p className="text-[11px] tracking-widest text-slate-500 uppercase mb-3 font-mono">
                Tailored products built to convert your exact audience niche:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-sm text-xs font-bold border transition-colors cursor-pointer uppercase ${
                    activeTab === 'all' 
                      ? 'bg-[#161616] border-gold/30 text-gold font-bold' 
                      : 'bg-[#0A0A0A]/40 border-[#333] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  🌐 Show All
                </button>
                <button 
                  onClick={() => setActiveTab('relationship')}
                  className={`px-3 py-1.5 rounded-sm text-xs font-bold border transition-colors cursor-pointer uppercase ${
                    activeTab === 'relationship' 
                      ? 'bg-[#161616] border-gold/30 text-gold font-bold' 
                      : 'bg-[#0A0A0A]/40 border-[#333] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  👩‍❤️‍👨 Couples
                </button>
                <button 
                  onClick={() => setActiveTab('party')}
                  className={`px-3 py-1.5 rounded-sm text-xs font-bold border transition-colors cursor-pointer uppercase ${
                    activeTab === 'party' 
                      ? 'bg-[#161616] border-gold/30 text-gold font-bold' 
                      : 'bg-[#0A0A0A]/40 border-[#333] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  🍻 Party Hosts
                </button>
                <button 
                  onClick={() => setActiveTab('parenting')}
                  className={`px-3 py-1.5 rounded-sm text-xs font-bold border transition-colors cursor-pointer uppercase ${
                    activeTab === 'parenting' 
                      ? 'bg-[#161616] border-gold/30 text-gold font-bold' 
                      : 'bg-[#0A0A0A]/40 border-[#333] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  🧠 Parenting
                </button>
              </div>

              {/* Dynamic Niche Insight Callout */}
              <div className="mt-4 panel bg-panel p-4 text-left max-w-2xl mx-auto shadow-lg">
                {activeTab === 'all' && (
                  <p className="text-xs text-slate-400 leading-relaxed text-center font-sans">
                    💡 <strong>Pro Strategy:</strong> World Cup 2026 is the largest sporting event on earth. Promote across all niches to maximize stacking affiliate cart conversions!
                  </p>
                )}
                {activeTab === 'relationship' && (
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    💘 <strong>For Couples Humor:</strong> Promote <strong>"Offside, Darling (OD)"</strong>. Use the Peace Treaty templates in stories. It acts as hilarious organic screenshot-bait. Viewers tag their partners and share it forward, multiplying your referral cookies automatically!
                  </p>
                )}
                {activeTab === 'party' && (
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    🍻 <strong>For Party/Hosting accounts:</strong> Recommend <strong>"The Big Kickoff Kit (BKK)"</strong>. Share the wall charts and bingo overlays. It takes the stress out of host planning, giving your viewers an effortless premium watch-party.
                  </p>
                )}
                {activeTab === 'parenting' && (
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    📚 <strong>For Parenting/Education:</strong> Pitch <strong>"Kick & Discover (KD)"</strong>. Highlight that it is a screen-free geography and math pack that keeps kids hyper-engaged. Parents are actively hunting for wholesome ways to entertain kids during the games.
                  </p>
                )}
              </div>
            </div>

            {/* TRUST STRIP - 4 bullet points */}
            <div className="pt-16 border-t border-[#333]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="panel bg-panel p-4 flex flex-col items-center justify-center shadow-lg">
                  <span className="block text-2xl font-serif italic uppercase font-black text-gold">50%</span>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                    COMMISSION
                  </span>
                </div>
                <div className="panel bg-panel p-4 flex flex-col items-center justify-center shadow-lg">
                  <span className="block text-2xl font-serif italic uppercase font-black text-slate-100">$0.00</span>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                    FREE TO JOIN
                  </span>
                </div>
                <div className="panel bg-panel p-4 flex flex-col items-center justify-center shadow-lg">
                  <span className="block text-2xl font-serif italic uppercase font-black text-emerald-400">Instant</span>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                    AUTO PAYOUTS
                  </span>
                </div>
                <div className="panel bg-panel p-4 flex flex-col items-center justify-center shadow-lg">
                  <span className="block text-2xl font-serif italic uppercase font-black text-[#F5F5F5]">100%</span>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                    PROMO KIT INCL.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* LIVE EARNINGS TICKER STRIP */}
        <section className="bg-[#111] border-b border-[#333] py-2.5 overflow-hidden select-none">
          <div className="max-w-7xl mx-auto px-4 flex items-center">
            {/* Tag Label */}
            <div className="flex items-center gap-1.5 shrink-0 bg-[#0A0A0A] border border-gold/25 px-2 py-0.5 rounded-sm mr-4 text-[9px] font-mono text-gold uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              Live Payouts
            </div>
            
            {/* Horizontal Marquee Container */}
            <div className="relative flex-1 overflow-hidden h-5">
              <motion.div 
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                className="absolute left-0 flex items-center gap-12 whitespace-nowrap text-[10px] font-mono text-slate-400"
              >
                {[...TICKER_PAYOUTS, ...TICKER_PAYOUTS, ...TICKER_PAYOUTS].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-slate-200 font-bold">{item.user}</span>
                    <span className="text-slate-500">earned</span>
                    <span className="text-emerald-400 font-black">{item.amount}</span>
                    <span className="text-slate-500">from</span>
                    <span className="text-gold font-bold">{item.product}</span>
                    <span className="text-[9px] text-slate-600 font-sans font-normal">({item.time})</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2: EARNINGS CALCULATOR - Centerpiece */}
        <EarningsCalculator />

        {/* SECTION 3: PRODUCT SHOWCASE */}
        <section id="showcase" className="py-24 px-4 bg-[#0A0A0A] border-b border-[#333]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="badge border-gold/20 text-gold inline-flex items-center gap-2 mb-4">
                <Trophy className="w-3.5 h-3.5" /> High-Demand Assets
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic uppercase text-[#F5F5F5] tracking-tight max-w-xl mx-auto mb-4">
                Our Flagship <span className="gold-gradient">Digital Product Catalog</span>
              </h2>
              <p className="text-[#A0A0A0] max-w-xl mx-auto text-sm font-sans">
                Each product is meticulously styled, publication-ready, and optimized for high checkout conversions. We handle updates and fulfillment; you collect 50% of every dollar.
              </p>
            </div>

            {/* Product card grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
              <ComingSoonCard />
            </div>

          </div>
        </section>

        {/* SECTION 4: COMMISSION STACKING */}
        <CommissionTable />

        {/* SECTION 5: HOW IT WORKS - 3 Steps */}
        <section id="how-it-works" className="py-24 px-4 bg-[#0A0A0A] border-b border-[#333]">
          <div className="max-w-5xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="badge border-gold/20 text-gold inline-flex items-center gap-2 mb-4">
                <CheckCircle className="w-3.5 h-3.5" /> Fast Setup
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic uppercase text-[#F5F5F5] tracking-tight max-w-xl mx-auto mb-4">
                Get Started in <span className="gold-gradient">Three Simple Steps</span>
              </h2>
              <p className="text-[#A0A0A0] max-w-md mx-auto text-sm font-sans">
                Zero complicated tech. Secure your tracking link and download pre-made marketing materials in under 10 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative font-sans">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-[1px] bg-[#333] z-0" />

              {/* Step 1 */}
              <div className="panel bg-panel hover:border-gold/30 flex flex-col justify-between p-6 relative z-10 group">
                <div>
                  <span className="font-mono text-3xl font-black text-gold/25 group-hover:text-gold/50 transition-colors">
                    01
                  </span>
                  <h4 className="font-bold text-lg text-slate-200 mt-4 mb-2">
                    Sign Up Free
                  </h4>
                  <p className="text-xs text-[#A0A0A0] leading-relaxed">
                    Click through to Gumroad or Payhip below to secure your 1-click tracking code. Approval takes less than 2 hours.
                  </p>
                </div>
                <div className="mt-6">
                  <a href="#signup" className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold-light font-bold uppercase tracking-wider font-mono">
                    Grab link now <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Step 2 */}
              <div className="panel bg-panel hover:border-gold/30 flex flex-col justify-between p-6 relative z-10 group">
                <div>
                  <span className="font-mono text-3xl font-black text-gold/25 group-hover:text-gold/50 transition-colors">
                    02
                  </span>
                  <h4 className="font-bold text-lg text-slate-200 mt-4 mb-2">
                    Grab Your Kit
                  </h4>
                  <p className="text-xs text-[#A0A0A0] leading-relaxed">
                    Use our done-for-you overlay swipes, templates, and caption packs. Request a free product review copy to show your real audience.
                  </p>
                </div>
                <div className="mt-6">
                  <a href="#promo-kit" className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold-light font-bold uppercase tracking-wider font-mono">
                    Browse swipe files <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Step 3 */}
              <div className="panel bg-panel hover:border-gold/30 flex flex-col justify-between p-6 relative z-10 group">
                <div>
                  <span className="font-mono text-3xl font-black text-gold/25 group-hover:text-gold/50 transition-colors">
                    03
                  </span>
                  <h4 className="font-bold text-lg text-slate-200 mt-4 mb-2">
                    Post & Collect Cash
                  </h4>
                  <p className="text-xs text-[#A0A0A0] leading-relaxed">
                    Publish your customized templates. Watch your sales cookies lock in. Your 50% cut is delivered automatically.
                  </p>
                </div>
                <div className="mt-6">
                  <a href="#signup" className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold-light font-bold uppercase tracking-wider font-mono">
                    Secure 50% split <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 6: PROMO KIT */}
        <PromoKit />

        {/* SECTION 7: WHY NOW - Urgent window of the tournament */}
        <section className="py-24 px-4 bg-[#0A0A0A] border-b border-[#333] relative">
          <div className="absolute inset-0 bg-[radial-gradient(#d6982b03_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto panel bg-panel border-gold/15 p-8 md:p-12 relative overflow-hidden shadow-2xl">
            {/* Corner ambient orb */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-gold/5 rounded-full blur-2xl" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <span className="badge border-gold/20 text-gold uppercase inline-flex items-center gap-1.5 font-mono">
                  <Clock className="w-3 h-3 animate-pulse" /> Time-Sensitive Launch Window
                </span>
                <h3 className="text-2xl md:text-4xl font-serif italic uppercase text-[#F5F5F5] tracking-tight leading-snug">
                  The Summer Demand is <span className="gold-gradient">Exploding Right Now.</span>
                </h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
                  World Cup 2026 runs for exactly <strong>39 days</strong>—and with <strong>less than 2 weeks remaining</strong>, we are in the peak final stretch of the tournament. Social feeds are overflowing with search intent for watch party ideas, relationship humor, and family learning items. Once the final whistle blows, this massive high-converting buying window closes for another four years. 
                </p>
                <p className="text-slate-300 text-xs font-semibold leading-relaxed font-sans">
                  🚀 Do not leave this traffic on the table. Secure your partner cookies today and capture the wave of purchases.
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-[#333] pt-6 md:pt-0 md:pl-6 text-center font-mono">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                  Final Matchweeks
                </p>
                <p className="text-5xl font-serif italic font-black text-red-500 my-1 animate-pulse">
                  &lt;14
                </p>
                <p className="text-xs font-bold text-red-400 tracking-wider uppercase">
                  Days Left!
                </p>
                <p className="text-[10px] text-slate-500 italic mt-1.5">
                  Final Stretch Peak
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 8: SIGN UP - Dual CTA buttons */}
        <section id="signup" className="py-24 px-4 bg-[#0A0A0A] text-center relative overflow-hidden border-b border-[#333]">
          {/* Background pattern */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl mx-auto relative z-10 space-y-8">
            <span className="badge border-gold/20 text-gold inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Approved Platform Secure Checkout
            </span>

            <h2 className="text-4xl md:text-6xl font-serif italic uppercase text-[#F5F5F5] font-bold tracking-tight max-w-2xl mx-auto">
              Secure Your 50% <span className="gold-gradient">Commission Link</span>
            </h2>
            
            <p className="text-[#A0A0A0] max-w-xl mx-auto text-xs md:text-sm leading-relaxed font-sans">
              We offer two premium platform networks. Register on whichever you prefer — they both pay out a full <strong>50% commission</strong> instantly and automatically.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-4 font-sans">
              
              {/* Option A: Gumroad */}
              <div className="panel bg-panel hover:border-gold/30 flex flex-col justify-between p-6 shadow-xl transition-all duration-300">
                <div className="text-left">
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono text-gold uppercase tracking-widest bg-[#0A0A0A] px-2.5 py-0.5 rounded-sm border border-gold/10">
                    OPTION A
                  </span>
                  <h3 className="text-xl font-bold text-slate-200 mt-3 mb-1 font-sans">
                    Gumroad Network
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Best for affiliates wanting automated, weekly payouts and reliable checkout cookies.
                  </p>
                </div>
                <div>
                  <a
                    href="https://jaimzz.gumroad.com/affiliates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-3 px-5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider transition-colors bg-white text-black hover:bg-slate-100 flex items-center justify-center gap-1.5"
                  >
                    Apply on Gumroad <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Option B: Payhip */}
              <div className="panel bg-panel hover:border-gold/30 flex flex-col justify-between p-6 shadow-xl transition-all duration-300">
                <div className="text-left">
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono text-gold uppercase tracking-widest bg-[#0A0A0A] px-2.5 py-0.5 rounded-sm border border-gold/10">
                    OPTION B
                  </span>
                  <h3 className="text-xl font-bold text-slate-200 mt-3 mb-1 font-sans">
                    Payhip Network
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Best for affiliates looking for instant split payouts via PayPal or Stripe deposits.
                  </p>
                </div>
                <div>
                  <a
                    href="https://payhip.com/auth/register/af6a43b6c22f1a1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-btn text-center text-xs w-full flex items-center justify-center gap-1.5 py-3"
                  >
                    Apply on Payhip <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

            <p className="text-xs text-slate-500 max-w-md mx-auto italic font-sans">
              *Registering on both is perfectly fine if you want to test checkout funnels for different customer segments!
            </p>

            {/* Custom Link Setup Checklist for Affiliates */}
            <div className="panel bg-panel p-6 max-w-xl mx-auto text-left space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase border-b border-[#333] pb-2 flex justify-between items-center">
                <span>🔗 Your Quick Integration Swipes</span>
                <span className="text-slate-500 font-normal lowercase">Click link to copy</span>
              </h4>
              
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Gumroad Referral Register:</label>
                  <div 
                    onClick={() => handleCopyLinkPlaceholder('https://jaimzz.gumroad.com/affiliates', 'Gumroad')}
                    className="bg-[#0A0A0A] border border-[#333] px-3 py-2 rounded-sm flex items-center justify-between cursor-pointer hover:border-gold/35 transition-all font-mono text-slate-400 truncate"
                  >
                    <span className="truncate">https://jaimzz.gumroad.com/affiliates</span>
                    <span className="text-[9px] bg-[#0A0A0A] px-2 py-0.5 rounded-sm text-gold uppercase shrink-0 font-sans font-bold">
                      {copiedNotification === 'Gumroad' ? 'Copied!' : 'Copy'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Payhip Referral Register:</label>
                  <div 
                    onClick={() => handleCopyLinkPlaceholder('https://payhip.com/auth/register/af6a43b6c22f1a1', 'Payhip')}
                    className="bg-[#0A0A0A] border border-[#333] px-3 py-2 rounded-sm flex items-center justify-between cursor-pointer hover:border-gold/35 transition-all font-mono text-slate-400 truncate"
                  >
                    <span className="truncate">https://payhip.com/auth/register/af6a43b6c22f1a1</span>
                    <span className="text-[9px] bg-[#0A0A0A] px-2 py-0.5 rounded-sm text-gold uppercase shrink-0 font-sans font-bold">
                      {copiedNotification === 'Payhip' ? 'Copied!' : 'Copy'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* DIRECT-TO-INBOX WEEKLY PROMO KIT FORM */}
            <div className="panel bg-[#111] p-6 md:p-8 max-w-xl mx-auto text-left border border-gold/25 shadow-2xl relative overflow-hidden mt-8">
              {/* Subtle gold decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-gold/10 border border-gold/30 flex items-center justify-center rounded-sm text-gold">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-mono text-xs font-bold text-gold uppercase tracking-widest">
                  Direct-to-Inbox Campaign Assets
                </h4>
              </div>

              <h3 className="text-xl md:text-2xl font-serif italic uppercase text-slate-100 mb-2">
                Get Weekly <span className="gold-gradient">Promo Kits Delivery</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                We bundle high-converting swipe templates, raw vertical video clips, viral gameday memes, and watch-party worksheets every Wednesday. Zero spam—just raw fuel to feed your channels.
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.target as HTMLFormElement;
                  const emailInput = target.elements.namedItem('affiliate_email') as HTMLInputElement;
                  if (emailInput && emailInput.value) {
                    addToast(`🚀 Success! Fresh weekly promo kits are now routed to ${emailInput.value}`);
                    emailInput.value = '';
                  }
                }}
                className="flex flex-col sm:flex-row gap-3 font-sans"
              >
                <input
                  name="affiliate_email"
                  type="email"
                  required
                  placeholder="Enter your partner email address..."
                  className="flex-1 bg-[#0A0A0A] border border-[#333] hover:border-slate-700 focus:border-gold px-4 py-3 text-xs rounded-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all font-mono"
                />
                <button
                  type="submit"
                  className="cta-btn text-xs font-bold tracking-wider uppercase font-mono px-6 py-3 cursor-pointer shrink-0 transition-all hover:bg-gold-light"
                >
                  Get Free Promo Kits
                </button>
              </form>
              
              <p className="text-[10px] text-slate-500 font-mono mt-3 uppercase tracking-wider text-center sm:text-left">
                🔒 GDPR Secure. No cost, unsubscribe with 1-click.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 9: FAQ */}
        <FAQSection />

      </main>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0A] border-t border-[#333] px-4 py-12 font-sans">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-gold flex items-center justify-center font-mono font-bold text-[#0A0A0A] text-xs">
              K
            </div>
            <span className="font-serif text-sm font-black tracking-wider text-slate-200 uppercase italic">
              thebig<span className="text-gold">kickoff</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 max-w-md text-center md:text-right leading-relaxed">
            &copy; 2026 thebigkickoff Affiliate Hub. All rights reserved. This site is a dedicated creative digital publishing affiliate hub and is not affiliated with, endorsed by, or connected to FIFA, the official World Cup, or any participating football federation. All marks used descriptively only.
          </p>
        </div>
      </footer>

      {/* STICKY BOTTOM BAR */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-gold/30 py-3.5 px-4 md:px-6 shadow-[0_-10px_35px_rgba(0,0,0,0.9)] flex items-center justify-between"
          >
            <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-2 h-2 rounded-full bg-gold animate-ping shrink-0" />
                <p className="text-xs md:text-sm font-sans font-medium text-slate-200">
                  Ready to turn traffic into cash? Start promoting now and keep <span className="text-gold font-bold">50% commissions</span> on every sale!
                </p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="hidden lg:inline-block font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  Promo materials ready
                </span>
                <a
                  href="#signup"
                  className="cta-btn text-center text-xs px-6 py-2.5 uppercase font-mono tracking-widest font-bold w-full sm:w-auto shrink-0 shadow-lg"
                >
                  Join & Get Paid 50%
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUICK-WIN TIPS POP-UP */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ x: 100, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.9 }}
            className={`fixed ${showStickyBar ? "bottom-24" : "bottom-6"} right-4 z-40 max-w-sm w-[90%] md:w-80 panel bg-[#161616] border border-gold/20 p-4 shadow-2xl transition-all duration-300`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                  <Lightbulb className="w-3.5 h-3.5" />
                </div>
                <span className="font-mono text-[10px] font-bold text-gold uppercase tracking-wider">
                  Partner Coach Tips
                </span>
              </div>
              <button 
                onClick={() => setShowTip(false)}
                className="text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
                aria-label="Close Tip"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-3 min-h-[3.5rem] font-sans">
              "{QUICK_TIPS[currentTipIndex]}"
            </p>

            <div className="flex items-center justify-between border-t border-[#333] pt-2 font-mono text-[9px]">
              <span className="text-slate-500 uppercase font-bold">
                Tip {currentTipIndex + 1} of {QUICK_TIPS.length}
              </span>
              <button
                onClick={() => setCurrentTipIndex((prev) => (prev + 1) % QUICK_TIPS.length)}
                className="text-gold hover:text-gold-light font-bold uppercase tracking-widest cursor-pointer"
              >
                Next Tip &rarr;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING TOAST NOTIFICATIONS */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-[90%] pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className="bg-[#161616] border border-emerald-500/30 text-slate-100 p-4 rounded-sm shadow-2xl flex items-center gap-3 pointer-events-auto border-l-4 border-l-emerald-500"
            >
              <div className="text-emerald-400 shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <p className="text-xs font-sans font-medium">{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
