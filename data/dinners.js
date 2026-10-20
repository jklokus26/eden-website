// Private Dinners page. Copy from Eden's "Website Flow (October 2026)" doc.
// Photos: Wintermute dinner, shared by Eden in "Media Dinner Pics" (Oct 2026).
// Each photo lives in /assets/images/dinners/ as <base>-640/-1024/-1600.webp
// plus <base>-1024.jpg as the fallback.

export const dinnersPage = {
  sectionLabel: 'Private dinners',
  headline: 'The most valuable relationships are often built in private rooms.',
  paragraphs: [
    'Eden creates intimate, highly curated dinners and private gatherings for the people shaping finance, technology, media and culture.',
    'We bring together founders, investors, creators, journalists and industry leaders around a shared idea to create the kind of conversations and relationships that make a meaningful difference to your business.',
  ],
  // Results from past dinners (interviews, journalists attending, coverage).
  // Eden is sending these; the section stays hidden while the list is empty.
  stats: [],
  cta: { label: 'Talk to Eden', href: '#contact' },
};

export const dinnerPhotos = [
  { base: 'wintermute-dinner-table-guests-wide', width: 1600, height: 1143, alt: 'Guests seated along a long candlelit table at a private Eden dinner for Wintermute' },
  { base: 'wintermute-dinner-room-table-set', width: 1600, height: 2240, alt: 'Private dining room set for dinner, with white flowers along the table under a crystal chandelier' },
  { base: 'wintermute-dinner-guests-conversation', width: 1600, height: 2240, alt: 'Two guests in conversation before dinner' },
  { base: 'wintermute-dinner-wintermute-menu', width: 1600, height: 1143, alt: 'Wintermute dinner menu card on the table' },
  { base: 'wintermute-dinner-guests-table-talk', width: 1600, height: 2240, alt: 'Guests talking across the dinner table' },
  { base: 'wintermute-dinner-long-table-flowers', width: 1600, height: 2240, alt: 'Long dinner table lined with white flowers and glassware' },
  { base: 'wintermute-dinner-dinner-in-progress', width: 1600, height: 2240, alt: 'Dinner underway in a wood-paneled room' },
  { base: 'wintermute-dinner-guest-at-table', width: 1600, height: 2240, alt: 'A guest listening during dinner' },
  { base: 'wintermute-dinner-guest-smiling', width: 1600, height: 2240, alt: 'A guest smiling at the table' },
  { base: 'wintermute-dinner-wintermute-sign', width: 1600, height: 2240, alt: 'Wintermute sign on an easel at the dinner' },
  { base: 'wintermute-dinner-guests-portrait', width: 1600, height: 2240, alt: 'Two guests posing for a photo at the dinner' },
];
