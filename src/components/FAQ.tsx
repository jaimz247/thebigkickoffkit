import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../types';
import { HelpCircle, Plus, Minus } from 'lucide-react';

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('cost');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

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

        {/* FAQ Accordion List */}
        <div className="space-y-4 font-sans">
          {FAQS.map((faq) => {
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
          })}
        </div>

        {/* Support Callout Footer */}
        <div className="mt-12 text-center bg-[#161616] border border-[#333] rounded-sm p-6 max-w-2xl mx-auto font-sans">
          <p className="text-xs text-slate-400">
            Have a custom promotion idea or request for high-volume sponsorships? We'd love to chat.
          </p>
          <a 
            href="mailto:mytechdealszone@gmail.com" 
            className="inline-flex items-center gap-1 text-gold hover:text-gold-light font-bold text-xs uppercase tracking-widest mt-2"
          >
            Direct Partner Support Line <span>&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
}
