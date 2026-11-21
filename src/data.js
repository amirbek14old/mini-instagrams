const H = 3600000;
const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;
export const USERS = [
  { id: "me", username: "amir.t", name: "Amir", seed: 0, bio: "Building things in Tashkent" },
  { id: "u1", username: "lena.travels", name: "Lena Hoffmann", seed: 1 },
  { id: "u2", username: "noah.frames", name: "Noah Kim", seed: 2 },
  { id: "u3", username: "sofia.eats", name: "Sofia Rossi", seed: 3 },
  { id: "u4", username: "dilnoza.art", name: "Dilnoza Karimova", seed: 4 },
  { id: "u5", username: "marcus.fit", name: "Marcus Bell", seed: 5 },
  { id: "u6", username: "yuki.codes", name: "Yuki Tanaka", seed: 6 },
];
export const UM = Object.fromEntries(USERS.map((u) => [u.id, u]));
const now = Date.now();
// If an Unsplash photo fails to load, the post falls back to generated artwork (seed)
export const SEED_POSTS = [
  { id: "p1", user: "u1", seed: 11, image: U("1506744038136-46273834b3fb"), caption: "Golden hour over the mountains. Worth every step of the climb.", tags: ["travel", "goldenhour"], likes: 1284, liked: false, saved: false, ts: now - 2 * H, comments: [{ id: "c1", user: "u3", text: "This light is unreal", ts: now - H }] },
  { id: "p2", user: "u2", seed: 22, image: U("1469474968028-56623f02e42e"), caption: "Shot this on a quiet Sunday morning.", tags: ["photography", "nature"], likes: 932, liked: false, saved: false, ts: now - 5 * H, comments: [{ id: "c2", user: "u4", text: "Love the colours", ts: now - 4 * H }] },
  { id: "p3", user: "u3", seed: 33, image: U("1504674900247-0877df9cc836"), caption: "Fresh pasta night. Recipe coming soon!", tags: ["foodie", "homemade"], likes: 2201, liked: false, saved: false, ts: now - 9 * H, comments: [] },
  { id: "p4", user: "u4", seed: 44, image: U("1513364776144-60967b0f800f"), caption: "New piece finished today, acrylic on canvas.", tags: ["art", "studio"], likes: 677, liked: false, saved: false, ts: now - 26 * H, comments: [{ id: "c3", user: "u2", text: "Stunning work", ts: now - 20 * H }] },
  { id: "p5", user: "u5", seed: 55, image: U("1517836357463-d25dfeac3438"), caption: "Early session, clear head. Consistency beats intensity.", tags: ["fitness", "motivation"], likes: 410, liked: false, saved: false, ts: now - 50 * H, comments: [] },
  { id: "p6", user: "u6", seed: 66, image: U("1461749280684-dccba630e2f6"), caption: "Late-night debugging.", tags: ["coding", "devlife"], likes: 1530, liked: false, saved: false, ts: now - 72 * H, comments: [] },
];
export const KEY = "minigram:v1";
export function load() {
  try { const d = JSON.parse(localStorage.getItem(KEY)); if (d && d.posts) return d; } catch (e) {}
  return null;
}
