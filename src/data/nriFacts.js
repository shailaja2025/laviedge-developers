/** Phase-1 public-record figures and labelled concept lists. Do not invent distances, prices or returns. */

export const phase1Record = {
  name: 'NRI Township Phase-1',
  promoter: 'Laviedge Developers',
  type: 'Layout for Plots',
  rera: 'P07430077089',
  plots: 233,
  place: 'Sivapuram, Vinukonda',
  mandal: 'Vinukonda mandal',
  start: 'June 2026',
  completion: 'June 2029',
  areas: [
    { id: 'plotted', sqm: 41355 },
    { id: 'open', sqm: 7989 },
    { id: 'roads', sqm: 25823 },
    { id: 'amenities', sqm: 2555 },
  ],
};

export const phase1AreaTotal = phase1Record.areas.reduce((sum, item) => sum + item.sqm, 0);

export const roadConcepts = [
  { id: 'r33', feet: 33, width: '62%' },
  { id: 'r40', feet: 40, width: '78%' },
  { id: 'r50', feet: 50, width: '96%' },
];

export const regionNames = [
  'vinukonda',
  'station',
  'podili',
  'tripuranthakam',
  'donakonda',
  'industry',
  'srisailam',
  'amravati',
];

export const infraIds = ['drainage', 'water', 'power', 'lighting', 'avenue', 'security'];

export const greenIds = ['avenue', 'open', 'walk', 'corridor', 'fruit', 'landscape', 'outdoor'];

export const amenityIds = [
  'clubhouse',
  'pool',
  'banquet',
  'resort',
  'theme',
  'tracks',
  'children',
  'green',
];

export const ownIds = ['home', 'family', 'second', 'nri', 'hold'];

export const chainIds = ['connect', 'access', 'community', 'future'];

export const nriChapters = [
  { id: 'nri-thesis', key: 'thesis' },
  { id: 'nri-record', key: 'record' },
  { id: 'nri-place', key: 'place' },
  { id: 'nri-roads', key: 'roads' },
  { id: 'nri-infra', key: 'infra' },
  { id: 'nri-green', key: 'green' },
  { id: 'nri-amenities', key: 'amenity' },
  { id: 'nri-future', key: 'future' },
  { id: 'nri-own', key: 'own' },
  { id: 'nri-township', key: 'register' },
  { id: 'nri-experience', key: 'nri' },
];
