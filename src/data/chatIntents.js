/** Keyword desk. Replies stay inside the public record. */

export const chatIntents = [
  {
    id: 'greet',
    keywords: ['hi', 'hello', 'hey', 'namaste', 'namaskaram', 'good morning', 'good evening'],
    actions: ['nri', 'contact'],
  },
  {
    id: 'rera',
    keywords: ['rera', 'p07430077089', 'registration', 'register number', 'portal'],
    actions: ['nri', 'enquire'],
  },
  {
    id: 'plots',
    keywords: ['233', 'plots', 'plot', 'inventory', 'how many plots', 'layout for plots'],
    actions: ['nri', 'enquire'],
  },
  {
    id: 'area',
    keywords: ['acre', 'acres', 'sq m', 'sqm', 'square metre', 'area', '41355', '77722', 'open space'],
    actions: ['nri'],
  },
  {
    id: 'price',
    keywords: ['price', 'prices', 'cost', 'rate', 'rates', 'sqft', 'sq ft', 'how much', 'lakh', 'lakhs', 'crore', 'budget'],
    actions: ['enquire', 'call'],
  },
  {
    id: 'returns',
    keywords: ['return', 'returns', 'yield', 'investment', 'profit', 'roi', 'appreciate'],
    actions: ['enquire'],
  },
  {
    id: 'amenities',
    keywords: ['amenity', 'amenities', 'clubhouse', 'pool', 'school', 'temple', 'resort', 'proposed', 'fruit'],
    actions: ['nri', 'enquire'],
  },
  {
    id: 'roads',
    keywords: ['road', 'roads', '33-foot', '40-foot', '50-foot', '33 foot', '40 foot', '50 foot'],
    actions: ['nri'],
  },
  {
    id: 'timeline',
    keywords: ['june 2026', 'june 2029', '2026', '2029', 'start date', 'completion', 'timeline', 'when will', 'when is'],
    actions: ['nri'],
  },
  {
    id: 'place',
    keywords: ['where', 'location', 'sivapuram', 'vinukonda', 'nh-544d', 'nh544d', 'highway', 'mandal'],
    actions: ['nri', 'visit'],
  },
  {
    id: 'nriFamily',
    keywords: ['nri family', 'abroad', 'overseas', 'non resident', 'timezone', 'foreign'],
    actions: ['enquire', 'whatsapp'],
  },
  {
    id: 'nri',
    keywords: ['nri township', 'nri', 'flagship', 'township', 'vinukonda project'],
    actions: ['nri', 'enquire'],
  },
  {
    id: 'visit',
    keywords: ['visit', 'site visit', 'see the land', 'tour', 'walkthrough'],
    actions: ['enquire', 'call'],
  },
  {
    id: 'founder',
    keywords: ['founder', 'raghavulu', 'who leads', 'owner'],
    actions: ['founder'],
  },
  {
    id: 'company',
    keywords: ['laviedge', 'company', 'about you', 'who are you', 'developer', 'founded', '2017'],
    actions: ['contact'],
  },
  {
    id: 'gallery',
    keywords: ['gallery', 'image', 'images', 'photo', 'photos', 'photography'],
    actions: ['gallery'],
  },
  {
    id: 'photos',
    keywords: ['real photo', 'site photo', 'actual land', 'drone'],
    actions: ['gallery'],
  },
  {
    id: 'projects',
    keywords: ['projects', 'forthcoming', 'other project', 'portfolio'],
    actions: ['projects', 'nri'],
  },
  {
    id: 'contact',
    keywords: ['contact', 'phone', 'email', 'whatsapp', 'call', 'number', 'mail', 'desk', 'address'],
    actions: ['call', 'whatsapp', 'enquire', 'contact'],
  },
];
