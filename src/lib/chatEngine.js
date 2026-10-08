import { chatIntents } from '../data/chatIntents';

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s+-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchChatIntent(query, previousId) {
  const q = normalize(query);
  if (!q) return { id: 'greet', score: 1 };

  let best = { id: 'fallback', score: 0 };

  chatIntents.forEach((intent) => {
    let score = 0;
    intent.keywords.forEach((raw) => {
      const key = normalize(raw);
      if (!key) return;
      if (q === key) score += 6;
      else if (key.length <= 3) {
        const bounded = new RegExp(`(?:^|\\s)${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\s|$)`);
        if (bounded.test(q)) score += 2;
      } else if (q.includes(key)) score += key.includes(' ') ? 4 : 2;
    });
    if (previousId && previousId === intent.id) score += 0.4;
    if (score > best.score) best = { id: intent.id, score };
  });

  if (best.score < 2) return { id: 'fallback', score: best.score };
  return best;
}

export function intentActions(id) {
  return chatIntents.find((item) => item.id === id)?.actions || ['enquire'];
}
