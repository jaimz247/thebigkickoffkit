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
        <div className="mt-12 bg-[#161616] border border-[#333] rounded-sm p-6 max-w-2xl mx-auto font-sans text-center">
          <p className="text-sm font-bold text-slate-200 mb-2">Direct Partner Support Channels</p>
          <p className="text-xs text-slate-400 mb-6">
            Have a custom promotion idea, request for high-volume sponsorships, or need technical help? Contact us directly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <a 
              href="mailto:mytechdealszone@gmail.com" 
              className="flex flex-col items-center gap-2 p-4 bg-[#111] border border-[#222] hover:border-gold/30 rounded-sm text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Mail className="w-5 h-5 text-gold" />
              <span className="font-bold uppercase tracking-wider text-[10px]">Email Support</span>
              <span className="text-[10px] text-slate-500 font-mono">mytechdealszone@gmail.com</span>
            </a>
            <a 
              href="tel:+447445876709" 
              className="flex flex-col items-center gap-2 p-4 bg-[#111] border border-[#222] hover:border-gold/30 rounded-sm text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Phone className="w-5 h-5 text-gold" />
              <span className="font-bold uppercase tracking-wider text-[10px]">Direct Call</span>
              <span className="text-[10px] text-slate-500 font-mono">+44 7445 876709</span>
            </a>
            <a 
              href="https://wa.me/27791952410" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-[#111] border border-[#222] hover:border-gold/30 rounded-sm text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 text-gold" />
              <span className="font-bold uppercase tracking-wider text-[10px]">WhatsApp Chat</span>
              <span className="text-[10px] text-slate-500 font-mono">+27 79 195 2410</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

