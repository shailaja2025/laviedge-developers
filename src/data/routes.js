export const paths = {
  home: '/',
  about: '/about',
  founder: '/founder',
  projects: '/projects',
  nri: '/nri-township',
  gallery: '/gallery',
  contact: '/contact',
  login: '/login',
  notFound: '/404',
};

export const FLAGSHIP_SLUG = 'nri-township-vinukonda';

export const projectPath = (slug) => `${paths.projects}/${slug}`;

export const flagshipRegistryPath = projectPath(FLAGSHIP_SLUG);

/** Old single-page hashes → real routes. `section` is scrolled after navigation. */
export const HASH_ROUTES = {
  home: { path: paths.home },
  hero: { path: paths.home },
  index: { path: paths.home },
  start: { path: paths.home },
  about: { path: paths.about },
  vision: { path: paths.about, section: 'vision' },
  why: { path: paths.about, section: 'why' },
  approach: { path: paths.about, section: 'approach' },
  trust: { path: paths.about, section: 'trust' },
  founder: { path: paths.founder },
  projects: { path: paths.projects },
  portfolio: { path: paths.projects },
  'nri-township': { path: paths.nri },
  'nri-experience': { path: paths.nri, section: 'nri-experience' },
  'nri-thesis': { path: paths.nri, section: 'nri-thesis' },
  'nri-record': { path: paths.nri, section: 'nri-record' },
  'nri-place': { path: paths.nri, section: 'nri-place' },
  'nri-roads': { path: paths.nri, section: 'nri-roads' },
  'nri-infra': { path: paths.nri, section: 'nri-infra' },
  'nri-green': { path: paths.nri, section: 'nri-green' },
  'nri-amenities': { path: paths.nri, section: 'nri-amenities' },
  'nri-future': { path: paths.nri, section: 'nri-future' },
  'nri-own': { path: paths.nri, section: 'nri-own' },
  gallery: { path: paths.gallery },
  instagram: { path: paths.gallery, section: 'instagram' },
  faq: { path: paths.contact, section: 'faq' },
  contact: { path: paths.contact },
  login: { path: paths.login },
  desk: { path: paths.login },
};

export const whatsappHref = (number) => `https://wa.me/${number}`;
