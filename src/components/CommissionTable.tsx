import { PRODUCTS, STACKING_TIERS, TOURNAMENT_WEEKS } from '../types';
import { TrendingUp, Award, DollarSign } from 'lucide-react';

export function CommissionTable() {
  // Compute average commissions dynamically
  const getAverageCommissions = () => {
    let sumStandard = 0;
    let sumUpgrade = 0;

    PRODUCTS.forEach(p => {
      sumStandard += p.standardPrice * p.commissionRate;
      sumUpgrade += p.upgradePrice * p.commissionRate;
    });

    const avgStandard = sumStandard / PRODUCTS.length;
    const avgUpgrade = sumUpgrade / PRODUCTS.length;
    
    // We assume a realistic 35% upgrade rate for this dynamic illustration table
    const upgradeRateFraction = 0.35;
    const avgBlended = avgStandard * (1 - upgradeRateFraction) + avgUpgrade * upgradeRateFraction;

    return { avgStandard, avgUpgrade, avgBlended };
  };

  const { avgBlended } = getAverageCommissions();

  return (
    <section id="commission-stacking" className="py-24 px-4 bg-[#0A0A0A] border-b border-[#333]">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="badge border-gold/20 text-gold mb-4 inline-flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5" /> Earnings Multipliers
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic uppercase text-[#F5F5F5] tracking-tight max-w-2xl mx-auto mb-4">
            Watch Your Commissions <span className="gold-gradient">Stack & Compound</span>
          </h2>
          <p className="text-[#A0A0A0] max-w-xl mx-auto text-sm md:text-base font-sans">
            See how modest weekly referrals turn into thousands of dollars in pure payouts across the 39-day summer window.
          </p>
        </div>

        {/* Ledger Wrapper */}
        <div className="panel bg-panel shadow-2xl overflow-hidden">
          
          {/* Header Metadata Ribbon */}
          <div className="bg-[#0A0A0A]/80 px-6 py-4 border-b border-[#333] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Campaign projection model (35% upgrade rate)
            </span>
            <span>Est. Blended Commission Per Sale: ${avgBlended.toFixed(2)}</span>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto font-sans">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#333] bg-[#0A0A0A]/40 text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                  <th className="py-4 px-6 font-semibold">Tier / Creator Type</th>
                  <th className="py-4 px-6 font-semibold text-center">Promo Target</th>
                  <th className="py-4 px-6 font-semibold text-center font-mono">Referrals / Wk</th>
                  <th className="py-4 px-6 font-semibold text-right">Weekly Commission</th>
                  <th className="py-4 px-6 font-semibold text-right text-gold">Total Tournament Payout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333]/60 text-slate-300">
                {STACKING_TIERS.map((tier, index) => {
                  const weeklyPayout = tier.salesPerWeek * avgBlended;
                  const totalPayout = weeklyPayout * TOURNAMENT_WEEKS;
                  
                  // Highlight top tier
                  const isTopTier = index === STACKING_TIERS.length - 1;

                  return (
                    <tr 
                      key={tier.label}
                      className={`transition-colors hover:bg-slate-800/10 ${
                        isTopTier ? 'bg-gold/[0.02]' : ''
                      }`}
                    >
                      <td className="py-5 px-6">
                        <div className="font-sans font-bold text-slate-100 flex items-center gap-2">
                          {isTopTier && <Award className="w-4 h-4 text-gold" />}
                          {tier.label}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{tier.audienceType}</div>
                      </td>
                      <td className="py-5 px-6 text-center text-xs text-slate-400 font-sans italic">
                        {tier.frequency}
                      </td>
                      <td className="py-5 px-6 text-center font-mono text-sm text-slate-200">
                        {tier.salesPerWeek}
                      </td>
                      <td className="py-5 px-6 text-right font-mono text-sm text-emerald-400 font-medium">
                        ${weeklyPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className={`py-5 px-6 text-right font-mono text-base font-black ${
                        isTopTier ? 'text-gold' : 'text-slate-100'
                      }`}>
                        ${totalPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked View */}
          <div className="block md:hidden divide-y divide-[#333]/80">
            {STACKING_TIERS.map((tier, index) => {
              const weeklyPayout = tier.salesPerWeek * avgBlended;
              const totalPayout = weeklyPayout * TOURNAMENT_WEEKS;
              const isTopTier = index === STACKING_TIERS.length - 1;

              return (
                <div 
                  key={tier.label} 
                  className={`p-5 space-y-4 ${
                    isTopTier ? 'bg-gold/[0.02]' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-sans font-bold text-slate-100 flex items-center gap-1.5">
                        {isTopTier && <Award className="w-4 h-4 text-gold" />}
                        {tier.label}
                      </h3>
                      <p className="text-[11px] text-[#A0A0A0] mt-0.5">{tier.audienceType}</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm border border-[#333] bg-[#0A0A0A] text-slate-400">
                      {tier.salesPerWeek} sales / wk
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#333]/40 font-mono text-xs">
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Promo Strategy</span>
                      <span className="text-slate-300 font-sans italic leading-tight block">{tier.frequency}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-0.5 font-mono">Weekly Return</span>
                      <span className="text-emerald-400 font-bold block font-mono">
                        ${weeklyPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0A0A0A]/80 border border-[#333] rounded-sm p-3 flex justify-between items-center font-mono">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                      39-Day Camp. Payout
                    </span>
                    <span className={`text-lg font-black ${
                      isTopTier ? 'text-gold' : 'text-slate-100'
                    }`}>
                      ${totalPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center px-4 font-sans">
          <p className="text-xs text-slate-500 max-w-xl text-center sm:text-left">
            *Based on average purchase rates of original kits vs upgraded Deluxe/Gift sets. Compounding works when you promote the entire catalog since visitors often buy multiple sets together.
          </p>
          <a
            href="#signup"
            className="flex items-center gap-1.5 px-4 py-2 rounded-sm border border-gold/30 text-xs font-mono font-bold uppercase text-gold hover:text-gold-light hover:border-gold transition-colors"
          >
            <DollarSign className="w-3.5 h-3.5 text-gold" />
            Join the 50% Club
          </a>
        </div>

      </div>
    </section>
  );
}
