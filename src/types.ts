/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductConfig {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  hook: string;
  whyItSells: string;
  standardPrice: number;
  upgradePrice: number;
  upgradeName: string;
  commissionRate: number; // 0.50
}

// ============================================================================
// CONFIGURATION BLOCK: Edit prices, commissions, and tournament lengths here!
// ============================================================================
export const TOURNAMENT_DAYS = 39;
export const TOURNAMENT_WEEKS = 39 / 7; // ~5.5714 weeks

export const PRODUCTS: ProductConfig[] = [
  {
    id: 'OD',
    name: 'Offside, Darling',
    shortName: 'OD',
    tagline: 'Partner survival kit',
    hook: 'Witty survival kit for the partner enduring a partner\'s World Cup obsession (Peace Treaty, Survival Bingo, cocktail recipes, 56 pages).',
    whyItSells: 'The Peace Treaty is screenshot-bait — it spreads itself organically on social feeds.',
    standardPrice: 22.99,
    upgradePrice: 35.99,
    upgradeName: 'Gift Edition',
    commissionRate: 0.50
  },
  {
    id: 'BKK',
    name: 'The Big Kickoff Kit',
    shortName: 'BKK',
    tagline: 'Complete watch party bundle',
    hook: 'Watch party bundle including sweepstake, wall chart, bingo, trivia, and food planner (37 pages, 8 premium components).',
    whyItSells: 'Hosts want to look effortless; this kit does all the prep work for them.',
    standardPrice: 24.99,
    upgradePrice: 34.99,
    upgradeName: 'Deluxe Pack',
    commissionRate: 0.50
  },
  {
    id: 'KD',
    name: 'Kick & Discover',
    shortName: 'KD',
    tagline: 'Screen-free kids learning bundle',
    hook: 'Kids learning bundle for ages 5–12 containing geography, maths, colouring, and tournament trackers (45 pages).',
    whyItSells: 'Parents want high-quality, screen-free educational activities that keep kids hooked.',
    standardPrice: 17.99,
    upgradePrice: 24.99,
    upgradeName: 'Family Pack',
    commissionRate: 0.50
  }
];

export interface StackingTier {
  label: string;
  salesPerWeek: number;
  audienceType: string;
  frequency: string;
}

export const STACKING_TIERS: StackingTier[] = [
  {
    label: 'Casual Partner',
    salesPerWeek: 10,
    audienceType: 'Couple Humor / Bloggers',
    frequency: '1 post per week'
  },
  {
    label: 'Active Host',
    salesPerWeek: 30,
    audienceType: 'Party Planner / Host',
    frequency: '2-3 stories per week'
  },
  {
    label: 'Bundle Promoter',
    salesPerWeek: 60,
    audienceType: 'Parenting / Education Niche',
    frequency: 'Weekly feed + bio link'
  },
  {
    label: 'Committed Creator',
    salesPerWeek: 120,
    audienceType: 'Aspirational Super-Affiliate',
    frequency: 'Daily campaign during tournament'
  }
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'cost',
    question: 'How much does it cost to join?',
    answer: 'It is 100% free to join. There are no startup fees, monthly quotas, or hidden charges. We provide the products and the promo assets so you can focus entirely on sharing and earning.'
  },
  {
    id: 'payouts',
    question: 'When and how do I get paid?',
    answer: 'Payouts are automated and handled directly via Gumroad or Payhip (depending on your preferred platform). Once a sale is completed, your 50% commission is calculated instantly. Gumroad sends weekly payouts, and Payhip offers flexible, direct payouts.'
  },
  {
    id: 'followers',
    question: 'Do I need a massive following to sign up?',
    answer: 'Not at all. In fact, highly engaged micro-audiences and small bloggers in specific niches (like relationship humor, party planning, parenting, or local community groups) convert at a much higher rate. Honest recommendations to a small, trusting audience outperform massive, general accounts.'
  },
  {
    id: 'multiple-products',
    question: 'Can I promote all three products?',
    answer: 'Yes! We encourage you to promote all three. We even provide assets for a "Complete Bundle" (coming soon) which will allow you to capture the absolute highest single-sale commission.'
  },
  {
    id: 'official-marks',
    question: 'Are these official FIFA World Cup products?',
    answer: 'No. These are independent, high-quality, unofficial creative digital products designed specifically to enhance the fan and family experience during the summer tournament. They do not carry official trademarks or player likenesses, which keeps our brand accessible, playful, and completely secure for affiliates to promote.'
  }
];
