import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, BookOpen, Gift, Users, Eye, Check, Clock, Mail } from 'lucide-react';
import { PRODUCTS, ProductConfig } from '../types';

interface ProductCardProps {
  product: ProductConfig;
  key?: string;
}

export function ProductCard({ product }: ProductCardProps) {
  // Map icons/styles depending on product
  const getProductDesignDetails = (id: string) => {
    switch (id) {
      case 'OD':
        return {
          icon: <Gift className="w-5 h-5 text-gold" />,
          badge: 'High Viral Potential',
          accentColor: 'from-pink-500/5 to-gold/5',
          borderColor: 'border-[#444] hover:border-gold/50',
          coverText: 'Survival Kit',
          pages: '56 pages',
          deliverables: ['Peace Treaty templates', 'Survival Bingo cards', 'The Fanatic Cocktail menu', '56 premium printables'],
          coverBg: 'bg-gradient-to-tr from-slate-950 via-rose-950/50 to-slate-950',
          coverBorder: 'border-rose-500/20'
        };
      case 'BKK':
        return {
          icon: <Trophy className="w-5 h-5 text-gold" />,
          badge: 'Best Seller Potential',
          accentColor: 'from-emerald-500/5 to-gold/5',
          borderColor: 'border-[#444] hover:border-gold/50',
          coverText: 'The Watch Party',
          pages: '37 pages',
          deliverables: ['Sweepstakes templates', 'Premium wall chart', 'Interactive watch bingo', 'Party trivia pack', 'Food/drink planners'],
          coverBg: 'bg-gradient-to-tr from-slate-950 via-emerald-950/50 to-slate-950',
          coverBorder: 'border-emerald-500/20'
        };
      case 'KD':
        return {
          icon: <BookOpen className="w-5 h-5 text-gold" />,
          badge: 'High Conversion',
          accentColor: 'from-blue-500/5 to-gold/5',
          borderColor: 'border-[#444] hover:border-gold/50',
          coverText: 'Kick & Learn',
          pages: '45 pages',
          deliverables: ['Creative geography tasks', 'Football-themed math', 'Activity colouring sheets', 'Tournament progress tracker'],
          coverBg: 'bg-gradient-to-tr from-slate-950 via-blue-950/50 to-slate-950',
          coverBorder: 'border-blue-500/20'
        };
      default:
        return {
          icon: <Sparkles className="w-5 h-5 text-gold" />,
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

  return (
    <div className={`panel relative flex flex-col justify-between h-full p-6 transition-all duration-300 ${details.borderColor} group`}>
      {/* Accent gradient background hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${details.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none`} />

      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-[#0A0A0A] border border-[#333] text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold">
            {product.id}
          </span>
          <span className="badge border-gold/20 text-gold text-[9px]">
            {details.badge}
          </span>
        </div>

        {/* CSS Crafted Product Mockup Box */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="relative w-44 h-56 group-hover:scale-[1.03] transition-transform duration-500 shadow-2xl rounded-r-sm overflow-hidden flex-shrink-0">
            {/* Book spine line */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/40 z-20 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.5)]" />
            
            {/* Book face styling */}
            <div className={`w-full h-full ${details.coverBg} border-l ${details.coverBorder} flex flex-col justify-between p-4 relative z-10 select-none`}>
              {/* Cover Grid Elements */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              
              <div className="text-center mt-2">
                <span className="font-mono text-[8px] text-gold tracking-widest font-semibold uppercase">
                  thebigkickoff
                </span>
                <h5 className="font-serif font-black text-slate-200 text-xs mt-1 leading-tight uppercase tracking-wider">
                  {details.coverText}
                </h5>
                <div className="w-8 h-[1px] bg-gold/30 mx-auto mt-2" />
              </div>

              {/* Cover center graphic */}
              <div className="flex justify-center my-1.5">
                <div className="w-10 h-10 rounded-full border border-gold/20 bg-[#0A0A0A]/80 flex items-center justify-center">
                  {details.icon}
                </div>
              </div>

              {/* Cover footer specifications */}
              <div className="text-center">
                <span className="text-[8px] font-mono text-slate-400 tracking-wide">
                  2026 EDITION • {details.pages}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Meta */}
        <div className="relative z-10">
          <h3 className="text-xl font-serif italic uppercase text-[#F5F5F5] mb-2 tracking-tight group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-[#A0A0A0] text-xs mb-4 leading-relaxed line-clamp-2">
            {product.tagline}
          </p>

          <div className="border-t border-[#333] py-4 space-y-2 text-xs text-slate-400">
            <p className="text-slate-300 leading-relaxed font-sans flex gap-1.5">
              <span className="text-slate-500 font-bold">Hook:</span>
              <span className="italic">"{product.hook}"</span>
            </p>
            <p className="text-slate-300 leading-relaxed font-sans">
              <strong className="text-gold font-semibold block uppercase tracking-wider text-[9px] mt-2 mb-1">
                Why it converts & sells:
              </strong>
              {product.whyItSells}
            </p>
          </div>
        </div>
      </div>

      {/* Pricing and Commission splits */}
      <div className="mt-6 pt-4 border-t border-[#333] relative z-10">
        <div className="grid grid-cols-2 gap-2 mb-4 bg-[#0A0A0A]/80 border border-[#333] rounded-sm p-3">
          <div>
            <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider">
              Product Price
            </span>
            <span className="block text-slate-300 text-xs font-mono font-medium mt-0.5">
              ${product.standardPrice.toFixed(2)} – ${product.upgradePrice.toFixed(2)}
            </span>
            <span className="text-[9px] text-slate-500 italic">
              ({product.upgradeName})
            </span>
          </div>
          <div className="border-l border-[#333] pl-3">
            <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider">
              Affiliate Payout
            </span>
            <span className="block text-emerald-400 text-xs font-mono font-bold mt-0.5">
              ${(product.standardPrice * 0.5).toFixed(2)} – ${(product.upgradePrice * 0.5).toFixed(2)}
            </span>
            <span className="inline-flex items-center text-[8px] text-emerald-400 bg-emerald-950/20 font-bold px-1 py-0.5 rounded-sm border border-emerald-900/20 mt-1 uppercase tracking-wider">
              50% Split
            </span>
          </div>
        </div>

        <a
          href="#signup"
          className="block text-center py-2 px-4 rounded-sm text-xs font-bold font-sans tracking-wider uppercase transition-colors bg-[#0A0A0A] hover:bg-slate-900 text-slate-200 hover:text-white border border-[#333]"
        >
          Promote Product
        </a>
      </div>
    </div>
  );
}

export function ComingSoonCard() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    console.log('Affiliate notification list subscription:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="panel border-dashed border-[#444] relative flex flex-col justify-between h-full p-6 transition-all duration-300 hover:border-gold/50 group">
      <div>
        {/* Top badge */}
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#0A0A0A] border border-[#333] text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold">
            BUNDLE
          </span>
          <span className="badge border-gold/30 text-gold text-[9px] animate-pulse">
            Coming Soon
          </span>
        </div>

        {/* Mock representation of overlapping books */}
        <div className="flex justify-center mb-8 relative">
          <div className="relative w-44 h-56">
            {/* Book back layer 1 */}
            <div className="absolute left-6 -rotate-6 w-36 h-48 bg-rose-950/20 border border-rose-900/20 rounded-r-sm shadow-lg" />
            {/* Book back layer 2 */}
            <div className="absolute left-3 rotate-6 w-36 h-48 bg-blue-950/20 border border-blue-900/20 rounded-r-sm shadow-lg" />
            {/* Featured top book */}
            <div className="absolute left-4 top-2 w-36 h-48 bg-gradient-to-tr from-[#0A0A0A] via-slate-900 to-[#0A0A0A] border border-gold/20 rounded-r-sm shadow-2xl flex flex-col justify-between p-3">
              <div className="text-center mt-1">
                <span className="text-[7px] font-mono text-gold tracking-widest uppercase block">
                  thebigkickoff
                </span>
                <span className="font-serif font-extrabold text-slate-200 text-[9px] tracking-wider uppercase">
                  COMPLETE BUNDLE
                </span>
              </div>
              <div className="flex justify-center">
                <Trophy className="w-5 h-5 text-gold" />
              </div>
              <div className="text-center">
                <span className="text-[7px] font-mono text-slate-400 tracking-wide uppercase">
                  3-in-1 Triple Pack
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata description */}
        <h3 className="text-xl font-serif italic uppercase text-[#F5F5F5] mb-2 tracking-tight">
          Complete Tournament Pack
        </h3>
        <p className="text-[#A0A0A0] text-xs mb-4 leading-relaxed">
          The ultimate 3-in-1 pack (OD + BKK + KD) designed for creators who want to offer a comprehensive discount bundle and earn maximum commissions.
        </p>

        <div className="border-t border-[#333] py-4 space-y-2 text-xs text-slate-400">
          <p className="text-slate-300 leading-relaxed font-sans">
            <span className="text-gold font-bold">Payout Scope:</span>
            {' '}Will contain all three packs at a bundled discount price, generating our highest single-sale commission payout yet.
          </p>
        </div>
      </div>

      {/* Notification subscription form */}
      <div className="mt-6 pt-4 border-t border-[#333]">
        {isSubmitted ? (
          <div className="p-3 bg-gold/5 border border-gold/30 rounded-sm text-center">
            <div className="w-6 h-6 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-2 text-gold">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <p className="text-xs font-serif italic text-gold font-bold">ON THE SHORTLIST!</p>
            <p className="text-[10px] text-slate-400 mt-0.5">We'll alert you the instant it drops.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center mb-2">
              Shortlist for Bundle Alerts
            </span>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs bg-[#0A0A0A] border border-[#333] focus:border-gold/50 rounded-sm py-2 px-3 pr-10 text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-2 rounded-sm bg-gold text-[#0A0A0A] hover:bg-gold-light flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Submit Email"
              >
                <Mail className="w-3 h-3" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
