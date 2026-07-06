import { useState } from 'react';
import { motion } from 'motion/react';
import { Sliders, Sparkles, AlertCircle, Check, HelpCircle, Clock } from 'lucide-react';
import { PRODUCTS, TOURNAMENT_WEEKS } from '../types';
import { AnimatedNumber } from './AnimatedNumber';

const PRODUCT_INCLUSIONS: Record<string, { standard: string; upgrade: string }> = {
  OD: {
    standard: "Partner's digital Peace Treaty, Couples Survival Bingo sheet, 10 game-day cocktail recipes, and gameday couple relationship humor conversation sheets (56 pages).",
    upgrade: "Gift Edition adds: Deluxe Interactive Couples Quiz, snack schedule templates, and customizable certificates."
  },
  BKK: {
    standard: "Printable party sweepstake kit, 39-Day World Cup tournament wall chart, watch-party trivia, and catering meal planner (37 pages, 8 parts).",
    upgrade: "Deluxe Pack adds: Custom TV overlay graphics, drinking game templates, and host performance evaluation scorecards."
  },
  KD: {
    standard: "Printable junior geography maps, math/calculating worksheets, tournament tracker tables, and tournament coloring booklet (45 pages, ages 5–12).",
    upgrade: "Family Pack adds: Multi-child track logs, expanded quiz packages, and printable wall stickers."
  }
};

export function EarningsCalculator() {
  const [salesPerWeek, setSalesPerWeek] = useState<number>(150);
  const [upgradePercentage, setUpgradePercentage] = useState<number>(35);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['OD', 'BKK', 'KD']);
  const [isAspirationalAnimating, setIsAspirationalAnimating] = useState(false);

  const toggleProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      // Keep at least one selected to avoid division by zero
      if (selectedProducts.length > 1) {
        setSelectedProducts(selectedProducts.filter(p => p !== id));
      }
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  // Math calculation
  const getCalculatedEarnings = () => {
    if (selectedProducts.length === 0) return { weekly: 0, tournament: 0 };

    const selectedConfigs = PRODUCTS.filter(p => selectedProducts.includes(p.id));
    
    let totalAvgCommission = 0;
    
    selectedConfigs.forEach(product => {
      // Average price for this product based on the upgrade percentage
      const blendedPrice = product.standardPrice * (1 - upgradePercentage / 100) + product.upgradePrice * (upgradePercentage / 100);
      const commission = blendedPrice * product.commissionRate;
      totalAvgCommission += commission;
    });

    const avgCommissionAcrossSelected = totalAvgCommission / selectedConfigs.length;
    const weekly = salesPerWeek * avgCommissionAcrossSelected;
    const tournament = weekly * TOURNAMENT_WEEKS;

    return { weekly, tournament };
  };

  const { weekly, tournament } = getCalculatedEarnings();

  // Animates sliders from current positions to high potential values (150 sales/week, 65% upgrade, select all 3)
  const triggerAspirationalPotential = () => {
    if (isAspirationalAnimating) return;
    setIsAspirationalAnimating(true);
    
    // Select all products first
    setSelectedProducts(['OD', 'BKK', 'KD']);

    const duration = 1200; // ms
    const startTime = performance.now();
    const startSales = salesPerWeek;
    const startUpgrade = upgradePercentage;
    
    const targetSales = 300;
    const targetUpgrade = 65;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quartic ease out
      const ease = 1 - Math.pow(1 - progress, 4);

      setSalesPerWeek(Math.round(startSales + (targetSales - startSales) * ease));
      setUpgradePercentage(Math.round(startUpgrade + (targetUpgrade - startUpgrade) * ease));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setIsAspirationalAnimating(false);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <section id="calculator" className="relative py-24 px-4 bg-[#0A0A0A] border-y border-[#333] overflow-hidden">
      {/* Decorative ambient background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge border-gold/20 text-gold mb-4 inline-flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-gold" /> Interactive Forecast
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic uppercase text-[#F5F5F5] tracking-tight max-w-2xl mx-auto mb-4">
            Calculate Your Summer <span className="gold-gradient">Earnings Potential</span>
          </h2>
          <p className="text-[#A0A0A0] max-w-xl mx-auto text-sm md:text-base">
            Toggle the products you want to promote, adjust your weekly referrals, and watch the tournament compounding stack up.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Panel */}
          <div className="lg:col-span-7 panel bg-panel p-6 md:p-8 flex flex-col justify-between shadow-2xl">
            
            <div>
              {/* Urgent final stretch notice */}
              <div className="mb-6 p-4 rounded-sm border border-gold/30 bg-gold/5 flex gap-3 items-start">
                <Clock className="w-5 h-5 text-gold animate-pulse shrink-0 mt-0.5" />
                <div>
                  <span className="block font-mono text-[10px] text-gold font-bold uppercase tracking-wider">
                    ⚡ FINAL STRETCH URGENCY
                  </span>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed font-sans">
                    <strong>The World Cup ends in less than 2 weeks!</strong> Watch-party search volume and parent stress-busters are peaking <em>right now</em>. Every day you wait is commission left on the table. Promote these done-for-you kits today!
                  </p>
                </div>
              </div>

              {/* Product Selectors */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-400 tracking-widest uppercase mb-4 flex items-center justify-between font-mono">
                  <span>1. Products You Will Promote</span>
                  <span className="text-slate-500 font-normal lowercase">{selectedProducts.length} of 3 selected</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {PRODUCTS.map((product) => {
                    const isSelected = selectedProducts.includes(product.id);
                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => toggleProduct(product.id)}
                        className={`relative text-left p-4 rounded-sm border transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-b from-[#161616] to-[#0A0A0A] border-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.05)]'
                            : 'bg-[#0A0A0A]/40 border-[#333] opacity-60 hover:opacity-90 hover:border-slate-700'
                        }`}
                      >
                        {/* Info Tooltip Indicator */}
                        <div className="absolute top-2.5 right-8 z-20 group/tooltip">
                          <div 
                            onClick={(e) => {
                              e.stopPropagation(); // Avoid selecting/toggling card when clicking icon
                            }}
                            className="p-1 hover:text-gold text-slate-500 transition-colors cursor-help"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                          </div>
                          
                          {/* Floating Tooltip Box */}
                          <div className="absolute bottom-full right-0 mb-2 w-64 bg-[#161616] border border-gold/30 rounded-sm p-3.5 shadow-2xl opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-200 pointer-events-none z-50 text-[11px] leading-relaxed select-none">
                            <div className="font-mono font-bold text-gold uppercase tracking-wider mb-2 flex items-center justify-between">
                              <span>{product.name} Contents</span>
                              <span className="text-[8px] bg-gold/10 px-1.5 py-0.5 rounded-sm text-gold border border-gold/10">Pack</span>
                            </div>
                            <div className="space-y-2 text-slate-300">
                              <p><strong className="text-slate-100 font-sans font-semibold">Standard:</strong> {PRODUCT_INCLUSIONS[product.id].standard}</p>
                              <p className="border-t border-[#333] pt-2 mt-2"><strong className="text-gold font-sans font-semibold">{product.upgradeName}:</strong> {PRODUCT_INCLUSIONS[product.id].upgrade}</p>
                            </div>
                            {/* Little triangle pointer pointing down to the info icon */}
                            <div className="absolute top-full right-3.5 w-2 h-2 bg-[#161616] border-r border-b border-gold/30 rotate-45 transform -translate-y-[5px]" />
                          </div>
                        </div>

                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-mono text-xs text-gold font-semibold tracking-wide mb-1">
                              {product.shortName}
                            </p>
                            <h4 className="font-sans font-bold text-slate-200 text-sm mb-1 line-clamp-1">
                              {product.name}
                            </h4>
                            <p className="text-[11px] text-slate-400 leading-tight line-clamp-2">
                              {product.tagline}
                            </p>
                          </div>
                          <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-gold border-gold text-[#0A0A0A]' : 'border-slate-700'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slider 1: Referrals per week */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="sales-slider" className="block text-xs font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 font-mono">
                    <Sliders className="w-3.5 h-3.5 text-slate-500" />
                    <span>2. Sales You Refer Per Week</span>
                  </label>
                  <span className="px-3 py-1 rounded-sm bg-[#0A0A0A] border border-[#333] text-gold font-mono text-sm font-bold shadow-inner">
                    {salesPerWeek} <span className="text-[10px] text-slate-500 font-sans tracking-normal uppercase font-normal ml-0.5">sales/wk</span>
                  </span>
                </div>
                <input
                  id="sales-slider"
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={salesPerWeek}
                  onChange={(e) => setSalesPerWeek(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#0A0A0A] rounded-lg appearance-none cursor-pointer accent-gold hover:accent-gold-light transition-colors focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2 px-1">
                  <span>10 Sales</span>
                  <span>150 (Average)</span>
                  <span>300 Sales</span>
                  <span>500 (Tournament Peak)</span>
                </div>
              </div>

              {/* Slider 2: Upgrade percentage */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="upgrade-slider" className="block text-xs font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 font-mono">
                    <Sliders className="w-3.5 h-3.5 text-slate-500" />
                    <span>3. Buyers Choosing Upgrade Tier</span>
                  </label>
                  <span className="px-3 py-1 rounded-sm bg-[#0A0A0A] border border-[#333] text-gold font-mono text-sm font-bold shadow-inner">
                    {upgradePercentage}% <span className="text-[10px] text-slate-500 font-sans tracking-normal uppercase font-normal ml-0.5">upgrade rate</span>
                  </span>
                </div>
                <input
                  id="upgrade-slider"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={upgradePercentage}
                  onChange={(e) => setUpgradePercentage(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#0A0A0A] rounded-lg appearance-none cursor-pointer accent-gold hover:accent-gold-light transition-colors focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2 px-1">
                  <span>0% Standard</span>
                  <span>35% (Realistic)</span>
                  <span>50% (High Premium)</span>
                  <span>75% (Expert funnels)</span>
                  <span>100% Upgraded</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 italic flex items-center gap-1.5 font-sans">
                  <HelpCircle className="w-3 h-3 text-slate-600 flex-shrink-0" />
                  We upsell buyers with high-converting, upgraded premium versions (Gift & Deluxe editions) at checkout.
                </p>
              </div>
            </div>

            {/* Aspirational Trigger Button */}
            <div className="pt-4 border-t border-[#333]">
              <button
                type="button"
                onClick={triggerAspirationalPotential}
                disabled={isAspirationalAnimating}
                className="w-full group relative flex items-center justify-center gap-2 py-3 px-4 rounded-sm font-mono font-bold text-xs tracking-widest uppercase transition-all duration-300 bg-[#0A0A0A] border border-gold/30 hover:border-gold hover:text-gold text-slate-300 active:scale-[0.98] cursor-pointer disabled:opacity-55"
              >
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm" />
                <Sparkles className="w-3.5 h-3.5 text-gold group-hover:rotate-12 transition-transform duration-300" />
                <span>See Super-Affiliate Potential</span>
              </button>
            </div>

          </div>

          {/* Earnings Display Ledger */}
          <div className="lg:col-span-5 panel border-gold flex flex-col justify-between p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Corner diagonal highlight style */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-xl pointer-events-none" />
            
            <div>
              {/* Header metadata (ledger style) */}
              <div className="flex justify-between items-center pb-4 border-b border-[#333] font-mono text-[10px] text-slate-500">
                <span>MEMO: SUMMER CAMPAIGN 2026</span>
                <span>CODE: AFF-50PCT</span>
              </div>

              {/* Total Tournament Earnings (Hero Value) */}
              <div className="py-8 text-center md:text-left">
                <p className="text-xs font-bold text-gold tracking-widest uppercase mb-1 font-mono">
                  Total 39-Day Tournament Earnings
                </p>
                <div className="text-4xl sm:text-5xl xl:text-6xl font-serif italic font-black gold-gradient tracking-tight flex items-baseline justify-center md:justify-start gap-1">
                  <AnimatedNumber value={tournament} />
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-sans">
                  Calculated across the entire <span className="font-semibold text-slate-200">39-day summer campaign duration</span> (~5.6 weeks) based on your referral selections.
                </p>
              </div>

              {/* Weekly supportive earnings */}
              <div className="bg-[#0A0A0A]/80 rounded-sm p-4 border border-[#333] flex justify-between items-center mb-6">
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 tracking-wider uppercase font-mono">
                    Weekly Return
                  </span>
                  <span className="block text-lg font-serif italic font-bold text-emerald-400 mt-0.5">
                    <AnimatedNumber value={weekly} />
                    <span className="text-xs font-sans text-slate-400 font-normal tracking-normal ml-1">/ week</span>
                  </span>
                </div>
                <div className="text-right border-l border-[#333] pl-4">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                    Commission Split
                  </span>
                  <span className="block text-xs font-mono font-semibold text-slate-300 mt-0.5">
                    50% On All Tiers
                  </span>
                </div>
              </div>

              {/* Payout assurance */}
              <div className="space-y-2.5 font-sans">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <p><strong>Instant automated payouts</strong> via Gumroad/Payhip</p>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <p><strong>Full digital kit included</strong>: templates, assets, & swipes</p>
                </div>
              </div>
            </div>

            {/* Disclaimer & Action */}
            <div className="mt-8 pt-4 border-t border-[#333]">
              <div className="flex gap-2.5 items-start font-sans">
                <AlertCircle className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] leading-normal text-slate-500">
                  <strong>Earnings Disclaimer:</strong> Projected potentials based on the indicated volumes. Real earnings are dependent on promotional effort, audience size, and conversion rates. This calculator is a projection, not a guarantee.
                </p>
              </div>
              <a 
                href="#signup" 
                className="cta-btn text-center text-sm mt-6 block w-full"
              >
                Secure Your 50% Split Now
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
