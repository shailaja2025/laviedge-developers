import { paths } from './routes';

export const site = {
  name: 'Laviedge Developers',
  shortName: 'Laviedge',
  founded: 2017,
  tagline: 'Building Places. Creating Futures.',
  founder: {
    name: 'K K Raghavulu',
    title: 'Founder, Laviedge Developers',
    messageStatus: 'placeholder',
    message:
      'An approved founder message will be published here. Until then, this space is reserved for K K Raghavulu’s own words on stewardship, land and the communities Laviedge intends to shape.',
    biography:
      'A formal biography, once approved, will appear in this section. K K Raghavulu is the founder of Laviedge Developers, a real-estate development company established in 2017 and focused on high-quality projects in Andhra Pradesh.',
  },
  region: 'Andhra Pradesh, India',
  contact: {
    email: 'laviedgedevelopers@gmail.com',
    phones: [
      { display: '+91 80199 82555', tel: '+918019982555', whatsapp: '918019982555' },
      { display: '+91 80199 81555', tel: '+918019981555', whatsapp: '918019981555' },
    ],
    phoneDisplay: '+91 80199 82555 · +91 80199 81555',
    phoneTel: '+918019982555',
    whatsapp: '918019982555',
    office:
      'Registered / correspondence address to be published. Laviedge Developers operates in Andhra Pradesh.',
    hours: 'Enquiry desk hours to be published.',
    social: {
      instagram: [
        {
          id: 'nri',
          href: 'https://www.instagram.com/nrit_township_vinukonda/',
          handle: '@nrit_township_vinukonda',
          official: true,
        },
        {
          id: 'laviedge',
          href: 'https://www.instagram.com/laviedge__developers/',
          handle: '@laviedge__developers',
          official: true,
        },
      ],
      facebook: {
        href: 'https://www.facebook.com/share/1Ecf1hnYZh/',
      },
    },
  },
  nav: [
    { id: 'about', path: paths.about },
    { id: 'founder', path: paths.founder },
    { id: 'projects', path: paths.projects },
    { id: 'nri', path: paths.nri },
    { id: 'gallery', path: paths.gallery },
    { id: 'contact', path: paths.contact },
  ],
};

export const verifiedFacts = {
  companyFounded: 2017,
  founderName: 'K K Raghavulu',
  flagship: 'NRI Township — Vinukonda',
  highway: 'NH-544D',
  location: 'Vinukonda, Andhra Pradesh',
  village: 'Sivapuram, Vinukonda mandal',
  phase1Rera: 'P07430077089',
  phase1Plots: 233,
  phase1Start: 'June 2026',
  phase1Completion: 'June 2029',
  phase1Type: 'Layout for Plots',
};

const visual = (name) => `/visuals/${name}`;

export const images = {
  hero: visual('hero-township.jpg'),
  about: visual('villa-plots.jpg'),
  founder: visual('builders-team.jpg'),
  landscape: visual('landscaping-path.jpg'),
  aerial: visual('plots-layout.jpg'),
  architecture: visual('open-plots.jpg'),
  dusk: visual('landscaping-night.jpg'),
  road: visual('roads.jpg'),
  interior: visual('restaurant.jpg'),
  trees: visual('fruit-grove.jpg'),
  courtyard: visual('keys.jpg'),
  cta: visual('entrance-arch.jpg'),
  villaPlots: visual('villa-plots.jpg'),
  highway: visual('highway.jpg'),
  parks: visual('parks.jpg'),
  family: visual('family.jpg'),
  childrenPark: visual('children-park.jpg'),
  themePark: visual('theme-park.jpg'),
  fruitGarden: visual('fruit-garden.jpg'),
  plantingHands: visual('planting-hands.jpg'),
  plantingCommunity: visual('planting-community.jpg'),
  security: visual('security.jpg'),
  secureFamily: visual('secure-family.jpg'),
  cafe: visual('cafe.jpg'),
  hotel: visual('hotel.jpg'),
  restaurant: visual('restaurant.jpg'),
  openTheatre: visual('open-theatre.jpg'),
  builders: visual('builders.jpg'),
  entrance: visual('entrance-arch.jpg'),
  acres: visual('proposed-acres.jpg'),
  layout: visual('planned-layout.jpg'),
};

export const amenityVisuals = {
  clubhouse: images.dusk,
  pool: images.hero,
  banquet: images.restaurant,
  resort: images.hotel,
  theme: images.themePark,
  tracks: images.landscape,
  children: images.childrenPark,
  green: images.parks,
};

export const greenVisuals = [
  images.trees,
  images.fruitGarden,
  images.landscape,
  images.plantingCommunity,
];

export const whyVisuals = [images.builders, images.highway, images.layout, images.family];

export const homeMosaic = [
  { id: 'g17', src: images.entrance, span: 'md:col-span-8 md:row-span-2 min-h-[18rem] md:min-h-[32rem]', fit: 'contain' },
  { id: 'g19', src: images.layout, span: 'md:col-span-4 min-h-[12rem] md:min-h-[15.25rem]', imgClassName: 'h-full min-h-[12rem] w-full md:min-h-[15.25rem]' },
  { id: 'g18', src: images.acres, span: 'md:col-span-4 min-h-[12rem] md:min-h-[15.25rem]', imgClassName: 'h-full min-h-[12rem] w-full md:min-h-[15.25rem]' },
  { id: 'g6', src: images.dusk, span: 'md:col-span-4 min-h-[12rem] md:min-h-[14rem]' },
  { id: 'g10', src: images.family, span: 'md:col-span-4 min-h-[12rem] md:min-h-[14rem]' },
  { id: 'g9', src: images.parks, span: 'md:col-span-4 min-h-[12rem] md:min-h-[14rem]' },
];

export const homeLifeStrip = [
  { id: 'g8', src: images.trees },
  { id: 'g7', src: images.landscape },
  { id: 'g11', src: images.childrenPark },
  { id: 'g13', src: images.openTheatre },
];

export const heroSlides = [
  { id: 'g17', src: images.entrance, kind: 'visualisation' },
  { id: 'g19', src: images.layout, kind: 'visualisation' },
  { id: 'g18', src: images.acres, kind: 'proposed' },
  { id: 'g1', src: images.hero, kind: 'visualisation' },
  { id: 'g5', src: images.road, kind: 'visualisation' },
  { id: 'g6', src: images.dusk, kind: 'atmosphere' },
];

export const galleryItems = [
  { id: 'g17', src: images.entrance, kind: 'visualisation' },
  { id: 'g19', src: images.layout, kind: 'visualisation' },
  { id: 'g18', src: images.acres, kind: 'proposed' },
  { id: 'g1', src: images.hero, kind: 'visualisation' },
  { id: 'g2', src: images.aerial, kind: 'visualisation' },
  { id: 'g3', src: images.about, kind: 'visualisation' },
  { id: 'g4', src: images.architecture, kind: 'atmosphere' },
  { id: 'g5', src: images.road, kind: 'visualisation' },
  { id: 'g6', src: images.dusk, kind: 'atmosphere' },
  { id: 'g7', src: images.landscape, kind: 'proposed' },
  { id: 'g8', src: images.trees, kind: 'proposed' },
  { id: 'g9', src: images.parks, kind: 'proposed' },
  { id: 'g10', src: images.family, kind: 'atmosphere' },
  { id: 'g11', src: images.childrenPark, kind: 'proposed' },
  { id: 'g12', src: images.themePark, kind: 'proposed' },
  { id: 'g13', src: images.openTheatre, kind: 'proposed' },
  { id: 'g14', src: images.cafe, kind: 'proposed' },
  { id: 'g15', src: images.security, kind: 'proposed' },
  { id: 'g16', src: images.courtyard, kind: 'atmosphere' },
];

export const philosophy = [
  {
    roman: 'I',
    title: 'Stewardship of land',
    copy: 'Land is not a commodity first. It is a setting for future life, and it deserves patience before it is planned.',
  },
  {
    roman: 'II',
    title: 'Clarity before claim',
    copy: 'What is registered is stated as registered. What is proposed is stated as proposed. Nothing in between.',
  },
  {
    roman: 'III',
    title: 'Communities, not inventories',
    copy: 'A township succeeds when streets, open space and daily life are considered together — not when plots are merely counted.',
  },
];

export const whyLaviedge = [
  {
    num: '01',
    title: 'A developer, not a listing',
    copy: 'Laviedge exists to develop places. The work begins with land, layout and long-term care — not with a catalogue of units.',
  },
  {
    num: '02',
    title: 'Andhra Pradesh, closely held',
    copy: 'Since 2017 the company has focused on high-quality real-estate projects in Andhra Pradesh, with Vinukonda as the present flagship setting.',
  },
  {
    num: '03',
    title: 'Phase-1, on the record',
    copy: 'NRI Township Phase-1 is RERA-registered (P07430077089) with 233 registered plots. That is the verified beginning — not a slogan.',
  },
  {
    num: '04',
    title: 'Built for those who return',
    copy: 'The NRI conversation is treated as a relationship: distance, documentation and trust matter as much as the land itself.',
  },
];

export const approachSteps = [
  {
    num: '01',
    title: 'Land & diligence',
    copy: 'Title, boundaries and context are examined before a layout is drawn. No development story begins without this quiet work.',
  },
  {
    num: '02',
    title: 'Statutory path',
    copy: 'Registrations and approvals are pursued as they become due. Laviedge publishes what is granted — and does not preview what is not.',
  },
  {
    num: '03',
    title: 'Layout with restraint',
    copy: 'Roads, open space and plot order are composed so a place can be lived in, not only sold from a brochure.',
  },
  {
    num: '04',
    title: 'Transparent conversation',
    copy: 'Enquiry, site visit and documentation are offered as a clear sequence. Pricing and plot identity are shared directly, not invented online.',
  },
  {
    num: '05',
    title: 'A township over time',
    copy: 'Future phases and community features remain proposed until they are registered or formally released. The horizon is kept honest.',
  },
];

export const nriExperience = [
  {
    title: 'Distance, considered',
    copy: 'Overseas families are received with time-zone courtesy, written updates and a single enquiry desk — not a chase of unreturned calls.',
  },
  {
    title: 'Documentation, in order',
    copy: 'Title papers, registration path and Phase-1 RERA particulars are discussed as they stand. No document is implied that cannot be shown.',
  },
  {
    title: 'Seeing the land',
    copy: 'A site visit can be arranged for family in India, or a guided walkthrough can be requested remotely. Photography of the actual layout will be published as it is commissioned.',
  },
  {
    title: 'A place to return to',
    copy: 'The invitation is not speculation. It is land, a registered first phase, and the possibility of coming home to more — in one’s own time.',
  },
];

export const trustPrinciples = [
  {
    title: 'Verified, on this page',
    items: [
      'Company founded in 2017',
      'Founder: K K Raghavulu',
      'Flagship: NRI Township, Vinukonda, on NH-544D',
      'Phase-1 RERA: P07430077089',
      '233 registered Phase-1 plots',
    ],
  },
  {
    title: 'Not claimed here',
    items: [
      'No prices, returns or investment yields',
      'No awards, ratings or testimonials until they can be shown',
      'No invented plot inventory, sizes or availability counts',
      'Proposed township features are labelled as proposed',
      'Visualisations and atmosphere images are labelled — they are not site photography',
    ],
  },
];

export const faqs = [
  {
    q: 'What is independently stated about Phase-1?',
    a: 'NRI Township Phase-1 at Vinukonda is presented with its RERA registration P07430077089 and 233 registered plots, on NH-544D. Those are the verified Phase-1 facts published on this site.',
  },
  {
    q: 'How do I verify the RERA registration?',
    a: 'Use registration number P07430077089 on the official Andhra Pradesh RERA public portal. Laviedge invites every enquiry to cross-check the record rather than rely on a website alone.',
  },
  {
    q: 'Are later phases or amenities approved?',
    a: 'Not on this website. Community features, future phases and a wider township programme are described as proposed until they are registered or formally released. Please ask the enquiry desk for the current statutory position.',
  },
  {
    q: 'Why are prices not listed?',
    a: 'Plot consideration is shared during a direct conversation, against current inventory and documentation. Publishing figures that cannot be kept current would be careless.',
  },
  {
    q: 'Can non-resident families enquire?',
    a: 'Yes. The NRI desk is intended for families abroad as well as in India. Write to laviedgedevelopers@gmail.com, call +91 80199 82555 or +91 80199 81555, or use the enquiry form, and request a call at a time that suits your timezone.',
  },
  {
    q: 'How do I visit the land?',
    a: 'Request a site visit through the form or enquiry desk. A member of the team will confirm the meeting point at Vinukonda and what to bring. Remote walkthroughs can be requested if travel is not possible.',
  },
  {
    q: 'Is the photography on this site from the project?',
    a: 'No. Gallery and cinematic images are atmosphere and architectural reference only. Commissioned project photography will replace them as it becomes available.',
  },
  {
    q: 'Who leads Laviedge Developers?',
    a: 'Laviedge Developers was founded in 2017 by K K Raghavulu. A full approved biography and founder message will be published in the Founder section once released.',
  },
];
