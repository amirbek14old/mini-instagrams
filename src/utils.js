const PAL = [["#f9ce34","#ee2a7b","#6228d7"],["#a18cd1","#fbc2eb","#8ec5fc"],["#667eea","#764ba2","#f093fb"],["#fa709a","#fee140","#a8edea"],["#4facfe","#00f2fe","#7f00ff"],["#f857a6","#ff5858","#fbc2eb"],["#43e97b","#38f9d7","#6a11cb"],["#ff9a9e","#fad0c4","#a18cd1"]];
const cache = {};
// Generated gradient artwork, used for avatars, stories and as an image fallback
export function art(seed, w = 800, h = 800) {
  const k = seed + "x" + w;
  if (cache[k]) return cache[k];
  const p = PAL[seed % PAL.length];
  const r = (n) => ((seed * 9301 + n * 49297) % 233280) / 233280;
  let s = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${p[0]}'/><stop offset='.55' stop-color='${p[1]}'/><stop offset='1' stop-color='${p[2]}'/></linearGradient></defs><rect width='${w}' height='${h}' fill='url(#g)'/>`;
  for (let i = 0; i < 6; i++) s += `<circle cx='${r(i) * w}' cy='${r(i + 9) * h}' r='${60 + r(i + 3) * 160}' fill='#fff' opacity='${0.08 + r(i + 5) * 0.14}'/>`;
  return (cache[k] = "data:image/svg+xml;utf8," + encodeURIComponent(s + "</svg>"));
}
export const ago = (t) => {
  const s = (Date.now() - t) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + " min ago";
  if (s < 86400) return Math.floor(s / 3600) + " hours ago";
  return Math.floor(s / 86400) + " days ago";
};
