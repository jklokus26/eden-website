// Client logos from the "Trusted by visionaries" section (hp-mlogos-section, row 2 ticker)

export const clients = [
  {
    name: 'Cohen & Company',
    logo: '/assets/logos/ccm-transparent.png',
    cdnUrl: 'https://cdn.prod.website-files.com/67fe47f3a4961f92223a4072/688cdbeb28f0566a382dc6bd_CCM_logo.webp',
    alt: 'Cohen and Company financial services logo',
    displayHeight: 58,
    caseStudyUrl: null,
  },
  {
    name: 'Wintermute',
    logo: '/assets/logos/wintermute.png',
    cdnUrl: 'https://cdn.prod.website-files.com/67fe47f3a4961f92223a4072/688a2317598f3821351e1a59_wintermute-logo.png',
    alt: 'Wintermute crypto market maker logo',
    displayHeight: 115,
    caseStudyUrl: null,
  },
  {
    name: 'Franzy',
    logo: '/assets/logos/franzy-white.png',
    cdnUrl: 'https://cdn.prod.website-files.com/67fe47f3a4961f92223a4072/6823606b875e3b06ab20f3f5_franzy-social-image.png',
    alt: 'Franzy franchise marketplace logo',
    displayHeight: 54,
    noInvert: true,
    caseStudyUrl: '/case-studies/franzy',
  },
  {
    name: 'Grip Shipping',
    logo: '/assets/logos/grip-shipping.png',
    cdnUrl: 'https://cdn.prod.website-files.com/67fe47f3a4961f92223a4072/682365ed69c00099a61bbc78_Grip-Logo.png',
    alt: 'Grip Shipping logistics company logo',
    displayHeight: 60,
    noInvert: true,
    caseStudyUrl: '/case-studies/grip-shipping',
  },
  {
    name: 'Meanwhile',
    logo: '/assets/logos/meanwhile.png',
    cdnUrl: 'https://cdn.prod.website-files.com/67fe47f3a4961f92223a4072/682360bee35438f4e572c6aa_Meanwhile_Wordmark_GreenWhite_RGB%20(3).png',
    alt: 'Meanwhile insurance company logo',
    displayHeight: 130,
    caseStudyUrl: null,
  },
  {
    name: 'Ondo Finance',
    logo: '/assets/logos/ondo.png',
    cdnUrl: 'https://cdn.prod.website-files.com/67fe47f3a4961f92223a4072/6823609bd2e6a1175b9c6904_GB1Ak4WXcAA-U-o.png_large2.png',
    alt: 'Ondo Finance tokenized assets logo',
    displayHeight: 56,
    caseStudyUrl: null,
  },
  {
    name: 'Reed Smith',
    logo: '/assets/logos/reed-smith.png',
    cdnUrl: 'https://cdn.prod.website-files.com/67fe47f3a4961f92223a4072/682363325f4845f685e3460d_Reed_Smith_Logo.png',
    alt: 'Reed Smith law firm logo',
    displayHeight: 52,
    caseStudyUrl: '/case-studies/reed-smith-on-chain',
  },
  {
    name: 'Stellar Development Foundation',
    logo: '/assets/logos/stellar.png',
    cdnUrl: 'https://cdn.prod.website-files.com/67fe47f3a4961f92223a4072/682366aaba5e70af38110575_stellar%20logo.png',
    alt: 'Stellar Development Foundation blockchain logo',
    displayHeight: 56,
    caseStudyUrl: '/case-studies/stellar-development-foundation',
  },
];

// ─── Oct 2026 client strip ──────────────────────────────────────────────
// The 10 current clients from Eden's Oct 2026 doc, in the doc's order.
// Single-color logos (SVG fill="currentColor"). An <img> tag does not pass
// CSS color into an SVG, so the strip must inline the SVG or use it as a CSS
// mask (mask-image + background-color) to set the ink color. displayHeight is the optical-balance height in px.
// Replaces `clients` above when the homepage builders switch over.

export const clientStrip = [
  { name: 'Ondo Finance', logo: '/assets/logos/clients/ondo.svg', ratio: 3.050, alt: 'Ondo Finance logo', displayHeight: 32, caseStudyUrl: '/case-studies/ondo' },
  { name: 'Wintermute', logo: '/assets/logos/clients/wintermute.svg', ratio: 9.057, alt: 'Wintermute logo', displayHeight: 18, caseStudyUrl: null },
  { name: 'Reed Smith', logo: '/assets/logos/clients/reed-smith.svg', ratio: 5.505, alt: 'Reed Smith logo', displayHeight: 24, caseStudyUrl: '/case-studies/reed-smith-on-chain' },
  { name: 'Cohen & Company Capital Markets', logo: '/assets/logos/clients/cohen-capital-markets.svg', ratio: 5.759, alt: 'Cohen & Company Capital Markets logo', displayHeight: 34, caseStudyUrl: null },
  { name: 'Alpaca', logo: '/assets/logos/clients/alpaca.svg', ratio: 3.588, alt: 'Alpaca logo', displayHeight: 30, caseStudyUrl: null },
  { name: 'LayerZero', logo: '/assets/logos/clients/layerzero.svg', ratio: 3.733, alt: 'LayerZero logo', displayHeight: 28, caseStudyUrl: null },
  { name: 'Grindr', logo: '/assets/logos/clients/grindr.svg', ratio: 4.659, alt: 'Grindr logo', displayHeight: 26, caseStudyUrl: null },
  { name: 'RoboStrategy', logo: '/assets/logos/clients/robostrategy.svg', ratio: 8.544, alt: 'RoboStrategy logo', displayHeight: 18, caseStudyUrl: null },
  { name: 'Rox', logo: '/assets/logos/clients/rox.svg', ratio: 3.543, alt: 'Rox logo', displayHeight: 28, caseStudyUrl: null },
  { name: 'Jito Labs', logo: '/assets/logos/clients/jito-labs.svg', ratio: 5.077, alt: 'Jito Labs logo', displayHeight: 22, caseStudyUrl: null },
];
