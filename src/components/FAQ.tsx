import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../types';
import { HelpCircle, Plus, Minus, Search, X, Mail, Phone, MessageSquare } from 'lucide-react';

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('cost');
  const [searchQuery, setSearchQuery] = useState('');

  // Supplemental local evergreen FAQ to answer the user's specific post-World Cup concern
  const LOCAL_FAQS = [
    ...FAQS,
    {
      id: 'evergreen',
      question: 'Are these products still valuable after the World Cup finishes?',
      answer: 'Absolutely! While the current tournament represents a massive viral launchpad with peak organic traffic, all our printable kits are designed with tournament-fluid, customizable structures. That means parents can reuse the screen-free learning math, party hosts can customize the trivia & sweepstakes brackets for any local club derby, and partners can use the playful treaties for the domestic Premier League, Champions League, or NFL seasons year-round. They are 365-day passive income assets!'
    }
  ];

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = LOCAL_FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 px-4 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="badge border-gold/20 text-gold mb-4 inline-flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5" /> Direct Clarifications
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic uppercase text-[#F5F5F5] tracking-tight max-w-xl mx-auto mb-4">
            Frequently Asked <span className="gold-gradient">Questions</span>
          </h2>
          <p className="text-[#A0A0A0] max-w-md mx-auto text-sm font-sans">
            Everything you need to know about payouts, promo guidelines, and getting started as an affiliate.
          </p>
        </div>

        {/* Dynamic FAQ Search Bar */}
        <div className="max-w-xl mx-auto mb-10 font-sans">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm bg-[#111] border border-[#333] hover:border-slate-700 focus:border-gold/40 rounded-sm py-3 pl-10 pr-10 text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
                aria-label="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-[11px] text-slate-500 mt-2 text-right">
              Showing {filteredFaqs.length} of {LOCAL_FAQS.length} results
            </p>
          )}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 font-sans">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className={`border rounded-sm transition-all duration-300 ${
                    isOpen 
                      ? 'bg-[#161616] border-gold/30 shadow-lg' 
                      : 'bg-[#0A0A0A]/20 border-[#333] hover:border-[#444]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left p-5 md:p-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className={`font-bold text-sm md:text-base ${
                      isOpen ? 'text-gold' : 'text-slate-200'
                    }`}>
                      {faq.question}
                    </span>
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                      isOpen ? 'bg-gold border-gold text-[#0A0A0A]' : 'border-slate-800 text-slate-400'
                    }`}>
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 md:px-6 md:pb-6 text-xs md:text-sm text-slate-400 leading-relaxed border-t border-[#333] pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-[#111] border border-dashed border-[#333] rounded-sm">
              <HelpCircle className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-300">No matching questions found</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for keywords like 'payout', 'cost', or 'evergreen'.</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-4 inline-flex items-center gap-1 bg-[#1c1c1c] hover:bg-[#222] border border-[#333] text-gold px-4 py-2 rounded-sm text-xs font-mono font-bold uppercase transition-all cursor-pointer"
              >
                Reset Search Filter
              </button>
            </div>
          )}
        </div>

        {/* Support Callout Footer */}
        <div className="mt-16 relative overflow-hidden bg-gradient-to-b from-[#111] to-[#0d0d0d] border border-gold/20 rounded-md p-8 max-w-2xl mx-auto font-sans shadow-2xl">
          {/* Subtle gold glow effect */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-gold/10 border border-gold/30 text-[9px] font-mono tracking-widest text-gold uppercase font-bold mb-4">
              VIP Support
            </span>
            <h4 className="text-lg md:text-xl font-serif italic uppercase text-[#F5F5F5] mb-2 tracking-tight">
              Direct Partner Support Channels
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
              Have a custom promotion idea, need high-volume assets, or want to discuss a dedicated sponsorship? Reach out to us instantly through our priority contact lines.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/27791952410" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-4 bg-black/60 border border-[#222] hover:border-gold/40 rounded-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-300">
                  <MessageSquare className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="text-center">
                  <span className="block font-bold text-xs uppercase tracking-wider text-slate-200 group-hover:text-gold transition-colors">WhatsApp Chat</span>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">+27 79 195 2410</span>
                </div>
              </a>

              {/* Phone Button */}
              <a 
                href="tel:+447445876709" 
                className="group flex flex-col items-center gap-3 p-4 bg-black/60 border border-[#222] hover:border-gold/40 rounded-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-300">
                  <Phone className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="text-center">
                  <span className="block font-bold text-xs uppercase tracking-wider text-slate-200 group-hover:text-gold transition-colors">Call Support</span>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">+44 7445 876709</span>
                </div>
              </a>

              {/* Email Button */}
              <a 
                href="mailto:mytechdealszone@gmail.com" 
                className="group flex flex-col items-center gap-3 p-4 bg-black/60 border border-[#222] hover:border-gold/40 rounded-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-300">
                  <Mail className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="text-center">
                  <span className="block font-bold text-xs uppercase tracking-wider text-slate-200 group-hover:text-gold transition-colors">Email Support</span>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">mytechdealszone@gmail.com</span>
                </div>
              </a>
            </div>

            <p className="text-[9px] text-slate-600 font-mono mt-6 uppercase tracking-wider">
              ⚡ Response Time: under 1 hour for active partners
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

