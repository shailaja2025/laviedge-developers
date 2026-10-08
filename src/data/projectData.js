import { images } from './siteData';
import { FLAGSHIP_SLUG, paths, projectPath } from './routes';

/**
 * Central project registry.
 * Add a new project by appending an object with the same shape.
 * Do not invent prices, approvals, inventory or performance claims.
 * Use status: 'registered' | 'forthcoming' | 'proposed'
 * Use factKind: 'verified' | 'placeholder'
 */
export const projects = [
  {
    id: 'nri-township-vinukonda',
    slug: 'nri-township-vinukonda',
    name: 'NRI Township',
    location: 'Sivapuram, Vinukonda, Andhra Pradesh',
    highway: 'NH-544D',
    status: 'Phase-1 registered',
    statusKey: 'registered',
    featured: true,
    flagship: true,
    yearNote: 'Flagship development',
    image: images.entrance,
    short:
      'A planned plotted township on NH-544D at Vinukonda — Phase-1 RERA-registered, with 233 plots at Sivapuram.',
    description:
      'NRI Township is Laviedge Developers’ flagship plotted township in the Vinukonda region. Phase-1 is recorded as a RERA-registered layout for plots (P07430077089) with 233 registered plots at Sivapuram, Vinukonda mandal. Wider township amenities and civic features beyond that record are proposed until they are formally released.',
    verified: {
      rera: 'P07430077089',
      plots: 233,
      phase: 'Phase-1',
      highway: 'NH-544D',
      place: 'Sivapuram, Vinukonda',
      type: 'Layout for Plots',
      start: 'June 2026',
      completion: 'June 2029',
    },
    proposed: [
      'Clubhouse, swimming pool and banquet hall',
      'Resort and theme-park recreation',
      'Walking tracks, children’s spaces and landscaped greens',
      'International school (about 4.5 acres) and a temple (about 1 acre)',
      'Seventeen varieties of fruit plantation within the landscape concept',
    ],
    ctaLabel: 'View project',
  },
  {
    id: 'forthcoming-andhra-01',
    slug: 'forthcoming-andhra-01',
    name: 'Forthcoming development',
    location: 'Andhra Pradesh',
    highway: '',
    status: 'To be published',
    statusKey: 'forthcoming',
    featured: false,
    flagship: false,
    yearNote: 'In preparation',
    image: images.landscape,
    short:
      'A further Laviedge development will be published here when it is ready for public release.',
    description:
      'Laviedge continues to evaluate land and community opportunities in Andhra Pradesh. Project name, location particulars and statutory details will be added to this registry only when they can be stated with the same care as Phase-1 at Vinukonda.',
    verified: null,
    proposed: [],
    ctaLabel: 'View project',
  },
  {
    id: 'forthcoming-andhra-02',
    slug: 'forthcoming-andhra-02',
    name: 'Forthcoming development',
    location: 'Andhra Pradesh',
    highway: '',
    status: 'To be published',
    statusKey: 'forthcoming',
    featured: false,
    flagship: false,
    yearNote: 'In preparation',
    image: images.trees,
    short: 'Reserved for the next Laviedge release — facts will not be previewed ahead of approvals.',
    description:
      'This card is an open place in the portfolio. When a new project is ready, it can be added in projectData.js with verified particulars only.',
    verified: null,
    proposed: [],
    ctaLabel: 'View project',
  },
];

export const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug);

export const projectHref = (project) =>
  project.flagship ? paths.nri : projectPath(project.slug);

export { FLAGSHIP_SLUG, paths, projectPath };

export const featuredProjects = projects.filter((project) => project.featured);

export const nriTownship = projects[0];

/** Visual explorer only — not official survey numbers or sale inventory. */
export const PHASE1_PLOT_COUNT = 233;

export const plotClusters = [
  { id: 'C1', label: 'Cluster 01', plots: 32 },
  { id: 'C2', label: 'Cluster 02', plots: 30 },
  { id: 'C3', label: 'Cluster 03', plots: 28 },
  { id: 'C4', label: 'Cluster 04', plots: 30 },
  { id: 'C5', label: 'Cluster 05', plots: 29 },
  { id: 'C6', label: 'Cluster 06', plots: 28 },
  { id: 'C7', label: 'Cluster 07', plots: 28 },
  { id: 'C8', label: 'Cluster 08', plots: 28 },
];

export const locationFacts = [
  { label: 'Place', value: 'Sivapuram, Vinukonda mandal' },
  { label: 'Corridor', value: 'NH-544D' },
  { label: 'Phase-1', value: 'RERA P07430077089' },
  { label: 'Registered plots', value: '233' },
  { label: 'Map pin', value: 'Exact coordinates to be published' },
];
