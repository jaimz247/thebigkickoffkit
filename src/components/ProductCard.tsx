import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Trophy, 
  BookOpen, 
  Gift, 
  Users, 
  Eye, 
  Check, 
  Clock, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  Target, 
  Lightbulb, 
  Layers,
  TrendingUp
} from 'lucide-react';
import { PRODUCTS, ProductConfig } from '../types';
import { addBundleWaitlist } from '../firebase';

interface ProductCardProps {
  product: ProductConfig;
  isPrintReady?: boolean;
  key?: string;
}

const PRODUCT_STRATEGY = {
  OD: {
    targetAudience: [
      "Partners of sports fanatics wanting funny house rules/pacts",
      "Relationship bloggers & couples comedy creators on TikTok/IG",
      "Niche gift-shoppers seeking funny, tongue-in-cheek presents",
      "General football fan hubs aiming for high couples-themed engagement"
    ],
    sellingTips: [
      "Highlight the 'Peace Treaty' printable - it is pure viral screenshot bait. Advise affiliates to post a Reel pretending to 'negotiate' rules with their partner.",
      "Promote heavily during weekend game clusters or late-night matches when partner fatigue is high.",
      "Frame it as the ultimate lighthearted survival guide that keeps the peace for both partners."
    ],
    evergreenPotential: "All elements feature general sports & tournament terms. This means it sells year-round for domestic Premier League, Champions League, NFL playoffs, or any high-intensity weekend sports season!"
  },
  BKK: {
    targetAudience: [
      "Gameday watch party hosts and weekend BBQ planners",
      "Casual community/neighborhood organizers & school club groups",
      "Friends group-chats setting up multi-match fantasy game-weeks",
      "Local pubs, bars, or cafes hosting screen viewings"
    ],
    sellingTips: [
      "Pitch the 'Sweepstakes templates' and 'Party Trivia' as effortless, 5-minute hosting solutions that remove all prep stress.",
      "Encourage viewers to download and test-print the wall chart so they see the gorgeous physical layout before the crowd arrives.",
      "Post directly in community forums or soccer leagues right before Friday night matchweeks."
    ],
    evergreenPotential: "Sweepstakes brackets and match trivia use customizable blank templates. Post-World Cup, affiliates can pitch BKK as the ultimate weekend host guide for the Premier League, Champions League finals, or birthday tournaments!"
  },
  KD: {
    targetAudience: [
      "Parents of kids aged 5–12 seeking offline activity books",
      "Homeschool associations & elementary tutors looking for sports-themed math",
      "Youth soccer leagues or sports camps needing printable certificates & flag quizzes",
      "Family travel bloggers looking for road-trip roadbooks"
    ],
    sellingTips: [
      "Emphasize the '100% Screen-Free' aspect. This is an immediate conversion trigger for parents desperate to limit screen time during match viewing.",
      "Highlight that kids will learn geography, arithmetic, and flag-colouring, keeping them occupied for hours while adults watch.",
      "Share in parenting Facebook groups, local school forums, and homeschooling clusters."
    ],
    evergreenPotential: "Children's educational content is completely timeless. Quizzes, flag-colouring, and soccer-themed math remain educational year-round. It is an amazing evergreen source of continuous sales post-tournament."
  }
};

export function ProductCard({ product, isPrintReady = false }: ProductCardProps) {
  const [salesToday, setSalesToday] = useState(() => {
    if (product.id === 'OD') return 96;
    if (product.id === 'BKK') return 148;
    return 64; // KD
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSalesToday(prev => {
        const change = Math.random() > 0.5 ? 1 : 0;
        return prev + change;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Map icons/styles depending on product
  const getProductDesignDetails = (id: string) => {
    switch (id) {
      case 'OD':
        return {
          icon: <Gift className={`w-5 h-5 ${isPrintReady ? 'text-black' : 'text-gold'}`} />,
          badge: 'High Viral Potential',
          accentColor: 'from-pink-500/5 to-gold/5',
          borderColor: isPrintReady ? 'border-slate-300' : 'border-[#444] hover:border-gold/50',
          coverText: 'Survival Kit',
          pages: '56 pages',
          deliverables: ['Peace Treaty templates', 'Survival Bingo cards', 'The Fanatic Cocktail menu', '56 premium printables'],
          coverBg: isPrintReady 
            ? 'bg-white border-2 border-slate-900' 
            : 'bg-gradient-to-tr from-slate-950 via-rose-950/50 to-slate-950',
          coverBorder: isPrintReady ? 'border-slate-900' : 'border-rose-500/20'
        };
      case 'BKK':
        return {
          icon: <Trophy className={`w-5 h-5 ${isPrintReady ? 'text-black' : 'text-gold'}`} />,
          badge: 'Best Seller Potential',
          accentColor: 'from-emerald-500/5 to-gold/5',
          borderColor: isPrintReady ? 'border-slate-300' : 'border-[#444] hover:border-gold/50',
          coverText: 'The Watch Party',
          pages: '37 pages',
          deliverables: ['Sweepstakes templates', 'Premium wall chart', 'Interactive watch bingo', 'Party trivia pack', 'Food/drink planners'],
          coverBg: isPrintReady 
            ? 'bg-white border-2 border-slate-900' 
            : 'bg-gradient-to-tr from-slate-950 via-emerald-950/50 to-slate-950',
          coverBorder: isPrintReady ? 'border-slate-900' : 'border-emerald-500/20'
        };
      case 'KD':
        return {
          icon: <BookOpen className={`w-5 h-5 ${isPrintReady ? 'text-black' : 'text-gold'}`} />,
          badge: 'High Conversion',
          accentColor: 'from-blue-500/5 to-gold/5',
          borderColor: isPrintReady ? 'border-slate-300' : 'border-[#444] hover:border-gold/50',
          coverText: 'Kick & Learn',
          pages: '45 pages',
          deliverables: ['Creative geography tasks', 'Football-themed math', 'Activity colouring sheets', 'Tournament progress tracker'],
          coverBg: isPrintReady 
            ? 'bg-white border-2 border-slate-900' 
            : 'bg-gradient-to-tr from-slate-950 via-blue-950/50 to-slate-950',
          coverBorder: isPrintReady ? 'border-slate-900' : 'border-blue-500/20'
        };
      default:
        return {
          icon: <Sparkles className="w-5 h-5" />,
          badge: 'Premium Asset',
          accentColor: 'from-slate-900 to-slate-950',
          borderColor: 'border-slate-800',
          coverText: 'Ebook',
          pages: '40 pages',
          deliverables: [],
          coverBg: 'bg-slate-950',
          coverBorder: 'border-slate-850'
        };
    }
  };

  const details = getProductDesignDetails(product.id);
  const strategy = PRODUCT_STRATEGY[product.id as keyof typeof PRODUCT_STRATEGY] || {
    targetAudience: [],
    sellingTips: [],
    evergreenPotential: ""
  };

  return (
    <motion.div 
      whileHover={{ y: isPrintReady ? 0 : -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={isPrintReady 
        ? `bg-white border-2 border-slate-300 text-slate-900 shadow-none p-6 rounded-sm relative flex flex-col justify-between h-full group`
        : `panel relative flex flex-col justify-between h-full p-6 transition-all duration-300 ${details.borderColor} group`
      }
    >
      {/* Accent gradient background hover - Only visible in live mode */}
      {!isPrintReady && (
        <div className={`absolute inset-0 bg-gradient-to-br ${details.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none`} />
      )}

      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <span className={isPrintReady 
            ? "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-slate-100 border border-slate-300 text-[10px] font-mono tracking-widest text-slate-800 uppercase font-black"
            : "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-[#0A0A0A] border border-[#333] text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold"
          }>
            {product.id}
          </span>
          <span className={isPrintReady
            ? "px-2 py-0.5 text-[9px] rounded-sm font-mono uppercase font-black border border-slate-400 text-slate-800 bg-slate-50"
            : "badge border-gold/20 text-gold text-[9px]"
          }>
            {details.badge}
          </span>
        </div>

        {/* Live Sales Velocity Bar or Print mode indicator */}
        {isPrintReady ? (
          <div className="flex items-center justify-between bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded-sm mb-4 relative z-10 text-[10px] font-mono text-slate-800">
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span>🖨️ Ink-Saving Outline Preview</span>
            </div>
            <span className="text-[9px] text-slate-500 italic font-sans font-bold">Ready to test print</span>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-emerald-950/10 border border-emerald-900/30 px-2.5 py-1.5 rounded-sm mb-4 relative z-10 text-[10px] font-mono text-emerald-400">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold">{salesToday} sales today</span>
            </div>
            <span className="text-[9px] text-emerald-500/80 font-sans italic font-bold">High Demand</span>
          </div>
        )}

        {/* CSS Crafted Product Mockup Box */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className={`relative w-44 h-56 group-hover:scale-[1.03] transition-transform duration-500 shadow-xl rounded-r-sm overflow-hidden flex-shrink-0 ${isPrintReady ? 'border border-slate-300' : ''}`}>
            {/* Book spine line */}
            <div className={`absolute left-0 top-0 bottom-0 w-3 z-20 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.5)] ${isPrintReady ? 'bg-slate-200' : 'bg-black/40'}`} />
            
            {/* Book face styling */}
            <div className={`w-full h-full ${details.coverBg} border-l ${details.coverBorder} flex flex-col justify-between p-4 relative z-10 select-none`}>
              {/* Cover Grid Elements - hidden in print mode */}
              {!isPrintReady && (
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              )}
              
              <div className="text-center mt-2">
                <span className={`font-mono text-[8px] tracking-widest font-semibold uppercase ${isPrintReady ? 'text-slate-800' : 'text-gold'}`}>
                  thebigkickoff
                </span>
                <h5 className={`font-serif font-black text-xs mt-1 leading-tight uppercase tracking-wider ${isPrintReady ? 'text-black' : 'text-slate-200'}`}>
                  {details.coverText}
                </h5>
                <div className={`w-8 h-[1px] mx-auto mt-2 ${isPrintReady ? 'bg-slate-400' : 'bg-gold/30'}`} />
              </div>

              {/* Cover center graphic */}
              <div className="flex justify-center my-1.5">
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${isPrintReady ? 'border-slate-900 bg-white' : 'border-gold/20 bg-[#0A0A0A]/80'}`}>
                  {details.icon}
                </div>
              </div>

              {/* Cover footer specifications */}
              <div className="text-center">
                <span className={`text-[8px] font-mono tracking-wide ${isPrintReady ? 'text-slate-700' : 'text-slate-400'}`}>
                  2026 EDITION • {details.pages}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Meta */}
        <div className="relative z-10">
          <h3 className={`text-xl font-serif italic uppercase mb-2 tracking-tight transition-colors ${
            isPrintReady ? 'text-black' : 'text-[#F5F5F5] group-hover:text-gold'
          }`}>
            {product.name}
          </h3>
          <p className={`text-xs mb-4 leading-relaxed line-clamp-2 ${isPrintReady ? 'text-slate-700' : 'text-[#A0A0A0]'}`}>
            {product.tagline}
          </p>

          <div className={`border-t py-4 space-y-2 text-xs ${isPrintReady ? 'border-slate-200 text-slate-800' : 'border-[#333] text-slate-400'}`}>
            <p className="leading-relaxed font-sans flex gap-1.5">
              <span className={`font-bold ${isPrintReady ? 'text-slate-900' : 'text-slate-500'}`}>Hook:</span>
              <span className="italic">"{product.hook}"</span>
            </p>
            <p className="leading-relaxed font-sans">
              <strong className={`block uppercase tracking-wider text-[9px] mt-2 mb-1 ${isPrintReady ? 'text-black font-extrabold' : 'text-gold font-semibold'}`}>
                Why it converts & sells:
              </strong>
              {product.whyItSells}
            </p>
          </div>
        </div>
      </div>

      {/* Expandable Selling Tips and Target Audience Section */}
      <div className={`mt-2 border-t pt-3 relative z-10 ${isPrintReady ? 'border-slate-200' : 'border-[#333]'}`}>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-sm text-[10px] font-mono uppercase font-bold transition-all ${
            isPrintReady 
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300' 
              : 'bg-[#121212] hover:bg-[#181818] text-slate-300 border border-[#222] hover:border-gold/30'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" />
            {isExpanded ? 'Hide Strategy & Selling Tips' : 'Show Strategy & Selling Tips'}
          </span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className={`py-4 space-y-4 text-xs font-sans leading-relaxed ${isPrintReady ? 'text-slate-800' : 'text-slate-300'}`}>
                
                {/* Target Audience */}
                <div className="space-y-1.5">
                  <span className={`inline-flex items-center gap-1 text-[9px] font-mono uppercase font-black tracking-widest ${isPrintReady ? 'text-black' : 'text-gold'}`}>
                    <Target className="w-3 h-3" /> Target Audience Niches:
                  </span>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-[11px]">
                    {strategy.targetAudience.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Selling Tips */}
                <div className="space-y-1.5">
                  <span className={`inline-flex items-center gap-1 text-[9px] font-mono uppercase font-black tracking-widest ${isPrintReady ? 'text-black' : 'text-gold'}`}>
                    <TrendingUp className="w-3 h-3" /> High-Converting Hacks:
                  </span>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-[11px]">
                    {strategy.sellingTips.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Evergreen post-tournament strategy */}
                <div className={`p-2.5 rounded-sm border ${
                  isPrintReady 
                    ? 'bg-slate-50 border-slate-300' 
                    : 'bg-emerald-950/10 border-emerald-900/30 text-emerald-400'
                }`}>
                  <span className={`inline-flex items-center gap-1 text-[9px] font-mono uppercase font-black tracking-widest block mb-1 ${isPrintReady ? 'text-black' : 'text-emerald-400'}`}>
                    <Layers className="w-3 h-3" /> Reusable Evergreen Value:
                  </span>
                  <p className="text-[11px] font-sans leading-normal">
                    {strategy.evergreenPotential}
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pricing and Commission splits */}
      <div className={`mt-4 pt-4 border-t relative z-10 ${isPrintReady ? 'border-slate-200' : 'border-[#333]'}`}>
        <div className={`grid grid-cols-2 gap-2 mb-4 rounded-sm p-3 border ${
          isPrintReady 
            ? 'bg-slate-50 border-slate-300 text-slate-800' 
            : 'bg-[#0A0A0A]/80 border-[#333]'
        }`}>
          <div>
            <span className={`block text-[9px] font-mono uppercase tracking-wider ${isPrintReady ? 'text-slate-600' : 'text-slate-505'}`}>
              Product Price
            </span>
            <span className={`block text-xs font-mono font-medium mt-0.5 ${isPrintReady ? 'text-black' : 'text-slate-300'}`}>
              ${product.standardPrice.toFixed(2)} – ${product.upgradePrice.toFixed(2)}
            </span>
            <span className={`text-[9px] italic ${isPrintReady ? 'text-slate-500' : 'text-slate-500'}`}>
              ({product.upgradeName})
            </span>
          </div>
          <div className={`border-l pl-3 ${isPrintReady ? 'border-slate-300' : 'border-[#333]'}`}>
            <span className={`block text-[9px] font-mono uppercase tracking-wider ${isPrintReady ? 'text-slate-600' : 'text-slate-500'}`}>
              Affiliate Payout
            </span>
            <span className={`block text-xs font-mono font-bold mt-0.5 ${isPrintReady ? 'text-slate-900' : 'text-emerald-400'}`}>
              ${(product.standardPrice * 0.5).toFixed(2)} – ${(product.upgradePrice * 0.5).toFixed(2)}
            </span>
            <span className={`inline-flex items-center text-[8px] font-bold px-1 py-0.5 rounded-sm border mt-1 uppercase tracking-wider ${
              isPrintReady 
                ? 'text-slate-900 bg-slate-200 border-slate-400' 
                : 'text-emerald-400 bg-emerald-950/20 border-emerald-900/20'
            }`}>
              50% Split
            </span>
          </div>
        </div>

        <a
          href="#signup"
          className={`block text-center py-2 px-4 rounded-sm text-xs font-bold font-sans tracking-wider uppercase transition-colors ${
            isPrintReady
              ? 'bg-slate-900 hover:bg-black text-white border-2 border-slate-900'
              : 'bg-[#0A0A0A] hover:bg-slate-900 text-slate-200 hover:text-white border border-[#333]'
          }`}
        >
          Promote Product
        </a>
      </div>
    </motion.div>
  );
}

interface ComingSoonCardProps {
  isPrintReady?: boolean;
}

export function ComingSoonCard({ isPrintReady = false }: ComingSoonCardProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [waitlistToday, setWaitlistToday] = useState(38);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitlistToday(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await addBundleWaitlist(email.trim());
      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      whileHover={{ y: isPrintReady ? 0 : -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={isPrintReady
        ? 'bg-white border-2 border-dashed border-slate-300 text-slate-950 p-6 rounded-sm relative flex flex-col justify-between h-full group'
        : 'panel border-dashed border-[#444] relative flex flex-col justify-between h-full p-6 transition-all duration-300 hover:border-gold/50 group'
      }
    >
      <div>
        {/* Top badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={isPrintReady
            ? 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-slate-100 border border-slate-300 text-[10px] font-mono tracking-widest text-slate-800 uppercase font-black'
            : 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#0A0A0A] border border-[#333] text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold'
          }>
            BUNDLE
          </span>
          <span className={isPrintReady
            ? 'px-2 py-0.5 text-[9px] rounded-sm font-mono uppercase font-black border border-slate-400 text-slate-800 bg-slate-50'
            : 'badge border-gold/30 text-gold text-[9px] animate-pulse'
          }>
            Coming Soon
          </span>
        </div>

        {/* Live Interest Velocity Bar */}
        {isPrintReady ? (
          <div className="flex items-center justify-between bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded-sm mb-4 relative z-10 text-[10px] font-mono text-slate-800">
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span>🖨️ Ink-Saving Bundle Preview</span>
            </div>
            <span className="text-[9px] text-slate-500 italic font-sans font-bold">Triple Bundle Coming</span>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-amber-950/10 border border-amber-900/30 px-2.5 py-1.5 rounded-sm mb-4 relative z-10 text-[10px] font-mono text-amber-400">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="font-bold">{waitlistToday} waitlisted today</span>
            </div>
            <span className="text-[9px] text-amber-500/80 font-sans italic font-bold">High Interest</span>
          </div>
        )}

        {/* Mock representation of overlapping books */}
        <div className="flex justify-center mb-8 relative">
          <div className="relative w-44 h-56">
            {/* Book back layer 1 */}
            <div className={`absolute left-6 -rotate-6 w-36 h-48 rounded-r-sm shadow-md border ${
              isPrintReady ? 'bg-slate-50 border-slate-300' : 'bg-rose-950/20 border-rose-900/20'
            }`} />
            {/* Book back layer 2 */}
            <div className={`absolute left-3 rotate-6 w-36 h-48 rounded-r-sm shadow-md border ${
              isPrintReady ? 'bg-slate-50 border-slate-300' : 'bg-blue-950/20 border-blue-900/20'
            }`} />
            {/* Featured top book */}
            <div className={`absolute left-4 top-2 w-36 h-48 border rounded-r-sm shadow-xl flex flex-col justify-between p-3 ${
              isPrintReady 
                ? 'bg-white border-2 border-slate-900' 
                : 'bg-gradient-to-tr from-[#0A0A0A] via-slate-900 to-[#0A0A0A] border-gold/20'
            }`}>
              <div className="text-center mt-1">
                <span className={`text-[7px] font-mono tracking-widest uppercase block ${isPrintReady ? 'text-slate-850' : 'text-gold'}`}>
                  thebigkickoff
                </span>
                <span className={`font-serif font-extrabold text-[9px] tracking-wider uppercase ${isPrintReady ? 'text-black' : 'text-slate-200'}`}>
                  COMPLETE BUNDLE
                </span>
              </div>
              <div className="flex justify-center">
                <Trophy className={`w-5 h-5 ${isPrintReady ? 'text-black' : 'text-gold'}`} />
              </div>
              <div className="text-center">
                <span className={`text-[7px] font-mono tracking-wide uppercase ${isPrintReady ? 'text-slate-800' : 'text-slate-400'}`}>
                  3-in-1 Triple Pack
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata description */}
        <h3 className={`text-xl font-serif italic uppercase mb-2 tracking-tight ${isPrintReady ? 'text-black' : 'text-[#F5F5F5]'}`}>
          Complete Tournament Pack
        </h3>
        <p className={`text-xs mb-4 leading-relaxed ${isPrintReady ? 'text-slate-700' : 'text-[#A0A0A0]'}`}>
          The ultimate 3-in-1 pack (OD + BKK + KD) designed for creators who want to offer a comprehensive discount bundle and earn maximum commissions.
        </p>

        <div className={`border-t py-4 space-y-2 text-xs ${isPrintReady ? 'border-slate-200 text-slate-800' : 'border-[#333] text-slate-400'}`}>
          <p className="leading-relaxed font-sans">
            <span className={`font-bold ${isPrintReady ? 'text-black' : 'text-gold'}`}>Payout Scope:</span>
            {' '}Will contain all three packs at a bundled discount price, generating our highest single-sale commission payout yet.
          </p>
        </div>
      </div>

      {/* Notification subscription form */}
      <div className={`mt-6 pt-4 border-t ${isPrintReady ? 'border-slate-200' : 'border-[#333]'}`}>
        {isSubmitted ? (
          <div className={`p-3 rounded-sm text-center border ${
            isPrintReady 
              ? 'bg-slate-50 border-slate-400 text-black' 
              : 'bg-gold/5 border-gold/30 text-gold'
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto mb-2 ${
              isPrintReady ? 'bg-slate-200 text-black' : 'bg-gold/10 text-gold'
            }`}>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <p className="text-xs font-serif italic font-bold">ON THE SHORTLIST!</p>
            <p className={`text-[10px] mt-0.5 ${isPrintReady ? 'text-slate-600' : 'text-slate-400'}`}>We'll alert you the instant it drops.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <span className={`block text-[10px] font-mono uppercase tracking-widest text-center mb-2 ${
              isPrintReady ? 'text-slate-700' : 'text-slate-500'
            }`}>
              Shortlist for Bundle Alerts
            </span>
            <div className="relative">
              <input
                type="email"
                required
                disabled={isSubmitting}
                placeholder={isSubmitting ? "Submitting..." : "Enter email address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full text-xs rounded-sm py-2 px-3 pr-10 focus:outline-none transition-colors ${
                  isPrintReady 
                    ? 'bg-slate-50 border-2 border-slate-300 focus:border-slate-800 text-slate-900 placeholder-slate-400' 
                    : 'bg-[#0A0A0A] border border-[#333] focus:border-gold/50 text-slate-200 placeholder-slate-500'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`absolute right-1 top-1 bottom-1 px-2 rounded-sm flex items-center justify-center transition-colors cursor-pointer ${
                  isPrintReady ? 'bg-slate-900 hover:bg-black text-white' : 'bg-gold hover:bg-gold-light text-[#0A0A0A]'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Submit Email"
              >
                {isSubmitting ? (
                  <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Mail className="w-3 h-3" />
                )}
              </button>
            </div>
            {errorMsg && (
              <p className="text-[10px] text-red-500 text-center font-sans mt-1">{errorMsg}</p>
            )}
          </form>
        )}
      </div>
    </motion.div>
  );
}

