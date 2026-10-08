import Reveal from './Reveal';
import HoverCard from './HoverCard';

export default function VisualMosaic({ items = [], className = '' }) {
  if (!items.length) return null;

  return (
    <div className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {items.map((item, index) => (
        <Reveal
          key={item.src || index}
          delay={index * 0.06}
          className={item.span || (index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : '')}
        >
          <HoverCard
            src={item.src}
            alt={item.alt || ''}
            kind={item.kind}
            title={item.title}
            caption={item.caption}
            to={item.to}
            className="h-full"
            imgClassName={
              index === 0
                ? 'aspect-[4/3] h-full min-h-[13rem] lg:min-h-[22rem]'
                : 'aspect-[4/3] h-full'
            }
          />
        </Reveal>
      ))}
    </div>
  );
}
