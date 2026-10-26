// Case studies taken off the site but kept to bring back. Nothing imports
// this file, so none of it ships to the public site.
//
// Ondo, on hold since 2026-10-26 (Alkida: "We need to rework certain details
// prior to sharing publicly"). To restore: move the entry back to the top of
// `caseStudies` in data/case-studies.js, put the ondo input back in
// vite.config.js, drop the /case-studies/ondo redirect in vercel.json, and
// re-add its line to public/sitemap.xml, public/llms.txt and the homepage
// <noscript> (all as of commit b11f9d5). Its page, case-studies/ondo.html,
// and its photos are untouched.
export const onHoldCaseStudies = [
  {
    slug: 'ondo',
    title: 'Case Study: Ondo Finance',
    subtitle: 'How Eden established Ondo as the defining voice in tokenized securities',
    // Homepage card title: shorter so it fits two lines on any laptop (Joe, 2026-10-21).
    cardTitle: 'How Eden made Ondo the defining voice in tokenization',
    date: 'March 13, 2026',
    service: 'Communications Strategy',
    description: 'How Eden established Ondo as the defining voice in tokenized securities',
    heroImage: '/assets/images/ondo-cnbc-squawk-box.jpg',
    cdnHeroUrl: '',
    alt: 'Ondo Finance featured on CNBC Squawk Box discussing tokenized securities',
    industries: 'Tokenized Securities, DeFi, Digital Assets',
    bodyHtml: `<h3>The Challenge</h3>
<p>Ondo Finance needed to establish market leadership in tokenized securities while navigating complex regulatory environments and competitive threats. Competitor Securitize actively lobbied against Ondo\u2019s model and publicly labeled it \u201Cillegal,\u201D while a well-funded challenger replicated Ondo\u2019s core product within six weeks of launch while claiming market leadership. Ondo needed to win over two deeply skeptical audiences\u2014institutional investors and the crypto community\u2014across fragmented regulatory frameworks in the US, APAC, MENA, and Europe.</p>

<h3>Our Approach</h3>
<p>When Eden took over Ondo\u2019s communications, the brand was losing the narrative war. Eden built a strategy around tier-1 broadcast placement, regulatory credentialing, and controlled narrative ownership\u2014using each to systematically counter competitive threats and establish Ondo as the category leader. We targeted sustained volume growth across tokenization coverage while aggressively defending Ondo\u2019s positioning against both Securitize\u2019s regulatory attacks and Robinhood\u2019s market entry blitz.</p>

<h3>The Results</h3>
<ul>
<li>Flipped a 24-point share of voice deficit against Securitize into a 61% SOV lead \u2014 a 23-point swing achieved within 90 days and maintained every month since</li>
<li>Tripled monthly media volume from baseline \u2014 peaking at over 2,000 articles in a single month</li>
<li>BlackRock called Ondo the \u201Cgold standard\u201D \u2014 neutralizing competitor attacks</li>
<li>Leads all competitors in tokenized asset coverage (35.3% SOV) and platform-specific mentions (46.3% SOV) \u2014 despite competing against Robinhood, Kraken, and Dinari</li>
<li>CNBC Squawk Box segment alongside Rep. Patrick McHenry</li>
<li>Wall Street Journal reporter proactively requested updated Ondo figures every other day</li>
<li>Featured across top-tier media including Axios, Bloomberg, CNBC, Reuters, The New York Times, and The Wall Street Journal</li>
</ul>

<h3>The Impact</h3>
<p>Ondo entered as a strong product fighting for legitimacy. They exited as the market\u2019s defining reference point for tokenized securities\u2014leading every major competitive benchmark in media share of voice.</p>`,
    sidebarNews: [],
    metricHighlight: '+61% SOV Lead',
    metrics: [
      { number: '61%', label: 'SOV Lead' },
      { number: '3x', label: 'Monthly Media Volume' },
      { number: '23pt', label: 'SOV Swing in 90 Days' },
    ],
    featured: true,
    industryTag: 'Tokenized Securities & DeFi',
    relatedCaseStudies: ['stellar-development-foundation', 'blue-planet-energy', 'henk-rogers'],
  },
];
