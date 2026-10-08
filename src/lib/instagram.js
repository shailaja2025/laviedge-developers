const SCRIPT = 'https://www.instagram.com/embed.js';

export function loadInstagramEmbed() {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.instgrm?.Embeds) return Promise.resolve();

  const existing = document.querySelector(`script[src="${SCRIPT}"]`);
  if (existing) {
    return new Promise((resolve) => {
      if (window.instgrm?.Embeds) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve(), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('instagram-embed'));
    document.body.appendChild(script);
  });
}

export function processInstagramEmbeds(root) {
  window.instgrm?.Embeds?.process(root);
}

const NATIVE_EMBED_WIDTH = 540;
const PROFILE_CHROME_AT_326 = 198;

export function fitInstagramEmbed(well) {
  if (!well) return;
  const scaleEl = well.querySelector('.ig-feed__scale');
  if (!scaleEl) return;
  const targetW = well.clientWidth;
  if (targetW < 2) return;
  const iframe = scaleEl.querySelector('iframe');
  const nativeW = iframe && iframe.offsetWidth > 2 ? iframe.offsetWidth : NATIVE_EMBED_WIDTH;
  const scale = Math.round((targetW / nativeW) * 1000) / 1000;
  const chrome = iframe ? Math.round(PROFILE_CHROME_AT_326 * (nativeW / 326)) : 0;
  const nextWidth = `${nativeW}px`;
  const nextTransform = `scale(${scale})`;
  const nextMargin = `-${Math.round(chrome * scale)}px`;
  const rawH = scaleEl.offsetHeight;
  if (rawH < 2) return;
  const nextHeight = `${Math.max(320, Math.ceil((rawH - chrome) * scale))}px`;
  if (
    scaleEl.style.width === nextWidth &&
    scaleEl.style.transform === nextTransform &&
    scaleEl.style.marginTop === nextMargin &&
    well.style.height === nextHeight
  ) {
    return;
  }
  scaleEl.style.width = nextWidth;
  scaleEl.style.transform = nextTransform;
  scaleEl.style.transformOrigin = 'top left';
  scaleEl.style.marginTop = nextMargin;
  well.style.height = nextHeight;
}
