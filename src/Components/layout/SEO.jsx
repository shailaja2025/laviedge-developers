import { useEffect } from 'react';
import { site, verifiedFacts } from '../../data/siteData';
import { useLanguage } from '../../context/LanguageContext';

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    if (selector.includes('property=')) {
      el.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
    } else if (selector.includes('name=')) {
      el.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export default function SEO({
  title,
  description,
  path = '/',
  image = '/og.jpg',
}) {
  const { t, locale } = useLanguage();
  const fullTitle = title ? `${title} — ${site.name}` : t('seo.title');
  const desc = description || t('seo.description');
  const url = `https://www.laviedgedevelopers.com${path}`;
  const imageUrl = image.startsWith('http') ? image : `https://www.laviedgedevelopers.com${image}`;

  useEffect(() => {
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:image"]', 'content', imageUrl);
    setMeta('meta[property="og:locale"]', 'content', locale === 'te' ? 'te_IN' : 'en_IN');

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: site.name,
          foundingDate: String(site.founded),
          founder: { '@type': 'Person', name: site.founder.name },
          areaServed: site.region,
          email: site.contact.email,
          url: 'https://www.laviedgedevelopers.com/',
          slogan: site.tagline,
        },
        {
          '@type': 'Residence',
          name: 'NRI Township Phase-1',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Vinukonda',
            addressRegion: 'Andhra Pradesh',
            addressCountry: 'IN',
          },
          description: `Laviedge Developers flagship. Phase-1 RERA ${verifiedFacts.phase1Rera}, ${verifiedFacts.phase1Plots} registered plots, ${verifiedFacts.highway}.`,
        },
      ],
    };

    let script = document.getElementById('laviedge-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'laviedge-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, [fullTitle, desc, url, imageUrl, locale]);

  return null;
}
