import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Image, Compass, MessageSquareCode, Download, ChevronDown, ChevronUp, Copy, Check, ExternalLink } from 'lucide-react';

interface KitTile {
  id: string;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  category: string;
  description: string;
  details: {
    label: string;
    items: string[];
    linkPlaceholder?: string;
  };
}

export function PromoKit() {
  const [activeTile, setActiveTile] = useState<string | null>('captions');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const kitTiles: KitTile[] = [
    {
      id: 'captions',
      title: 'Caption Packs',
      tagline: 'High-converting social swipe files',
      category: 'COPYWRITING',
      icon: <FileText className="w-5 h-5 text-gold-400" />,
      description: 'Pre-written, optimized captions crafted specifically for relationship humor, party planners, and parenting niches. Ready to copy-paste directly to your social posts or blogs.',
      details: {
        label: 'Swipe Content Previews (Click to Copy):',
        items: [
          '👩‍❤️‍👨 [COUPLES HUMOR]: "The tournament kicks off in 48 hours. Which means my partner is about to disappear for 39 days. This year, we signed a legally binding Peace Treaty. 📜✍️ Survival Bingo, custom penalty cards, and cocktail recipes. Absolute sanity saver. Link in my bio to grab yours!"',
          '🥳 [PARTY HOSTING]: "Hosting friends for the big games but have zero time to plan? This Watch Party Kit is an absolute cheat-code. 🏆 It has sweepstakes, a massive wall chart, trivia, and custom bingo sheets done for you. Effortless hosting in 2 minutes. Link in bio!"',
          '👶 [PARENTING]: "Screen-free World Cup entertainment that is actually educational. 🧩 Geographics, tournament trackers, and sports math. Kept my kids focused and quiet for 3 hours without an iPad. Best $18 I\'ve spent all summer. Grab the printable set in my bio."'
        ],
        linkPlaceholder: 'https://docs.google.com/document/d/YOUR_DOC_ID_HERE/edit?usp=sharing'
      }
    },
    {
      id: 'assets',
      title: 'Image & Video Assets',
      tagline: 'Reels, stories, & product mockup files',
      category: 'CREATIVE',
      icon: <Image className="w-5 h-5 text-gold-400" />,
      description: 'Stunning premium assets designed to look clean, high-end, and editorial. Includes layered mockups, vertical green screen frames, and high-conversion aesthetic video loops.',
      details: {
        label: 'Creative Assets Pack Contents:',
        items: [
          '📸 Transparent background product mockups (PNGs for easy Reels overlays)',
          '🎬 12 Aesthetic vertical video backgrounds optimized for text overlays',
          '📱 24 Story layout templates (Designed for high tap-rates)',
          '📊 Dynamic animated countdown timers for the tournament'
        ],
        linkPlaceholder: 'https://drive.google.com/drive/folders/YOUR_DRIVE_FOLDER_ID_HERE?usp=sharing'
      }
    },
    {
      id: 'guide',
      title: 'Quick-Start Guide',
      tagline: 'The 10-minute affiliate handbook',
      category: 'STRATEGY',
      icon: <Compass className="w-5 h-5 text-gold-400" />,
      description: 'New to affiliate marketing? No problem. This concise masterclass guides you on exactly how to plug your Gumroad/Payhip links, leverage free reviews, and configure high-conversion funnels.',
      details: {
        label: 'Success Blueprint Steps:',
        items: [
          '🎯 STEP 1: Create your free Gumroad or Payhip account and request approval in 1-click.',
          '🎁 STEP 2: Request your free review copy. Show your real audience the product in a quick 15-second screen recording or printout story.',
          '📈 STEP 3: Embed your customized affiliate link in your link-in-bio, link trees, or blog banners.',
          '⚡ PRO TIP: Pin a video featuring the "Peace Treaty" or the "Host Trivia Bingo" — these are high-viral screenshot magnets.'
        ],
        linkPlaceholder: 'https://docs.google.com/document/d/YOUR_GUIDE_DOC_ID_HERE/edit?usp=sharing'
      }
    },
    {
      id: 'hooks',
      title: 'Hook Bank',
      tagline: 'High-click text hooks for video overlays',
      category: 'VIRALITY',
      icon: <MessageSquareCode className="w-5 h-5 text-gold-400" />,
      description: 'Tested video hooks tailored to capture instant attention on Instagram Reels, TikTok, and YouTube Shorts in under 3 seconds.',
      details: {
        label: 'Proven Hook Phrases:',
        items: [
          '🛑 "If your partner is obsessed with the tournament... you need to see this now."',
          '👀 "I just bought a literal Peace Treaty template for the next 39 days."',
          '🔥 "The effortless host cheat-code for the summer matches."',
          '🧠 "Screen-free sports activity that kept my kids occupied for hours today."'
        ],
        linkPlaceholder: 'https://docs.google.com/spreadsheets/d/YOUR_HOOK_SHEET_ID_HERE/edit?usp=sharing'
      }
    }
  ];

  const handleCopy = (text: string) => {
    // Strip descriptive prefix for clean copying
    const textToCopy = text.includes('] "') ? text.split('] "')[1].replace('"', '') : text;
    navigator.clipboard.writeText(textToCopy);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <section id="promo-kit" className="py-24 px-4 bg-[#0A0A0A] border-b border-[#333]">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="badge border-gold/20 text-gold mb-4 inline-flex items-center gap-2">
            <Download className="w-3.5 h-3.5" /> High-Quality Swipes
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic uppercase text-[#F5F5F5] tracking-tight max-w-2xl mx-auto mb-4">
            A Complete <span className="gold-gradient">Done-For-You Promo Kit</span>
          </h2>
          <p className="text-[#A0A0A0] max-w-xl mx-auto text-sm md:text-base font-sans">
            We supply everything you need to start generating commissions immediately. Access copy swipes, visuals, and marketing handbooks.
          </p>
        </div>

        {/* Promo kit layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tiles Selector Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-3 w-full">
            {kitTiles.map((tile) => {
              const isActive = activeTile === tile.id;
              return (
                <button
                  key={tile.id}
                  onClick={() => setActiveTile(tile.id)}
                  className={`text-left p-5 rounded-sm border transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#161616] border-gold/30 shadow-lg'
                      : 'bg-[#0A0A0A]/30 border-[#333] hover:border-[#444]'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-gold to-gold-light" />
                  )}
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] text-gold font-bold tracking-wider uppercase bg-[#0A0A0A] px-2 py-0.5 rounded-sm border border-gold/10">
                      {tile.category}
                    </span>
                    {isActive ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-600" />}
                  </div>

                  <div className="flex items-start gap-3 mt-1">
                    <div className={`p-2 rounded-sm border flex-shrink-0 ${
                      isActive ? 'bg-[#0A0A0A] border-[#333]' : 'bg-[#0A0A0A]/50 border-transparent'
                    }`}>
                      {tile.icon}
                    </div>
                    <div>
                      <h4 className={`font-sans font-bold text-sm ${isActive ? 'text-slate-100' : 'text-slate-300'}`}>
                        {tile.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{tile.tagline}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded Preview Cabinet */}
          <div className="lg:col-span-7 panel bg-panel p-6 md:p-8 min-h-[420px] flex flex-col justify-between shadow-xl relative">
            
            <AnimatePresence mode="wait">
              {activeTile ? (
                <motion.div
                  key={activeTile}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Title & category */}
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-gold uppercase">
                      {kitTiles.find(t => t.id === activeTile)?.category} PREVIEW CABINET
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif italic uppercase text-[#F5F5F5] font-bold mt-1">
                      {kitTiles.find(t => t.id === activeTile)?.title}
                    </h3>
                    <p className="text-[#A0A0A0] text-xs md:text-sm mt-2 leading-relaxed font-sans">
                      {kitTiles.find(t => t.id === activeTile)?.description}
                    </p>
                  </div>

                  {/* Dynamic Inner Preview */}
                  <div className="space-y-3 font-sans">
                    <h5 className="text-[10px] font-mono tracking-wider font-bold text-slate-500 uppercase">
                      {kitTiles.find(t => t.id === activeTile)?.details.label}
                    </h5>
                    
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {kitTiles.find(t => t.id === activeTile)?.details.items.map((item, i) => (
                        <div 
                          key={i}
                          onClick={() => activeTile === 'captions' || activeTile === 'hooks' ? handleCopy(item) : null}
                          className={`group/item text-xs p-3 rounded-sm border border-[#333] bg-[#0A0A0A]/60 leading-relaxed text-slate-300 transition-all ${
                            activeTile === 'captions' || activeTile === 'hooks' 
                              ? 'cursor-pointer hover:border-gold/20 hover:bg-[#0A0A0A]' 
                              : ''
                          }`}
                        >
                          <div className="flex justify-between items-start gap-4">
                            <span className="flex-1">{item}</span>
                            {(activeTile === 'captions' || activeTile === 'hooks') && (
                              <button 
                                type="button"
                                className="text-slate-500 group-hover/item:text-gold transition-colors flex-shrink-0"
                                title="Copy Swipes"
                              >
                                {copiedText === item ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Asset download reference link */}
                  <div className="bg-[#0A0A0A] border border-[#333] p-4 rounded-sm">
                    <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                      Link for your setup (Edit/replace this in code):
                    </span>
                    <div className="flex items-center justify-between gap-4 font-mono text-xs text-slate-300 bg-[#161616] border border-[#333] px-3 py-2 rounded-sm select-all truncate">
                      <span className="truncate">{kitTiles.find(t => t.id === activeTile)?.details.linkPlaceholder}</span>
                      <span className="text-[10px] bg-[#0A0A0A] text-slate-400 font-sans px-2 py-0.5 rounded-sm uppercase">
                        Placeholder
                      </span>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-12 font-sans">
                  <p className="text-slate-500 text-sm">Select a promo kit tile to preview content files.</p>
                </div>
              )}
            </AnimatePresence>

            {/* Support memo line */}
            <div className="mt-8 pt-4 border-t border-[#333] flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 font-mono gap-2">
              <span>*Free product copies are sent upon registration approval.</span>
              <a 
                href="#signup" 
                className="text-gold hover:text-gold-light underline flex items-center gap-1"
              >
                Request Free Review Set <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
