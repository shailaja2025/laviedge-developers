import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import HoverCard from '../ui/HoverCard';
import Button from '../ui/Button';
import { galleryItems, homeLifeStrip, homeMosaic } from '../../data/siteData';
import { paths } from '../../data/routes';
import { useLanguage } from '../../context/LanguageContext';

export default function HomeVisuals() {
  const { t } = useLanguage();

  return (
    <section id="home-visuals" className="bg-ivory-100 text-forest-950 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="02"
          eyebrow={t('homeVisuals.eyebrow')}
          title={t('homeVisuals.title')}
          lede={t('homeVisuals.lede')}
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-3">
          {homeMosaic.map((item, index) => (
            <MosaicTile key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {homeLifeStrip.map((item, index) => (
            <MosaicTile key={item.id} item={item} index={index + 6} compact />
          ))}
        </div>

        <Reveal delay={0.12} className="mt-12">
          <Button to={paths.gallery} variant="acute">
            {t('homeVisuals.viewGallery')}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function MosaicTile({ item, index, compact = false }) {
  const { t } = useLanguage();
  const meta = galleryItems.find((entry) => entry.id === item.id) || item;
  const contain = item.fit === 'contain';

  return (
    <Reveal delay={index * 0.05} className={`h-full ${item.span || ''}`}>
      <HoverCard
        to={paths.gallery}
        src={item.src}
        alt={t(`gallery.items.${item.id}.caption`)}
        kind={t(`gallery.kind.${meta.kind || 'visualisation'}`)}
        title={t(`gallery.items.${item.id}.title`)}
        caption={t(`gallery.items.${item.id}.caption`)}
        className="h-full"
        fit={contain ? 'contain' : 'cover'}
        imgClassName={
          contain
            ? 'h-full min-h-[18rem] w-full md:min-h-[32rem]'
            : compact
              ? 'aspect-[4/5] min-h-[11rem] h-full'
              : item.imgClassName || 'h-full min-h-[13rem] aspect-[4/3]'
        }
      />
    </Reveal>
  );
}
