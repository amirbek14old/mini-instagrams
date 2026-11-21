import { useState, useEffect, useRef } from "react";
import Sidebar, { NAV } from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Story from "./components/Story";
import StoryViewer from "./components/StoryViewer";
import Post from "./components/Post";
import ProfileCard from "./components/ProfileCard";
import { USERS, UM, SEED_POSTS, KEY, load } from "./data";

function Soon({ view, go }) {
  const [, label, Icon] = NAV.find((n) => n[0] === view);
  return (
    <div className="card soon"><Icon size={44} /><h2>{label}</h2>
      <p>This section is the next step of the build. Home and navigation come first, as planned.</p>
      <button className="pill" onClick={() => go("home")}>Back to Home</button></div>
  );
}

export default function App() {
  const saved = useRef(load()).current;
  const [posts, setPosts] = useState(saved ? saved.posts : SEED_POSTS);
  const [theme, setTheme] = useState(saved ? saved.theme : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const [following, setFollowing] = useState(saved ? saved.following : ["u1", "u3"]);
  const [seen, setSeen] = useState(saved ? saved.seen : []);
  const [mine, setMine] = useState(saved ? saved.mine : []);
  const [notifs, setNotifs] = useState(saved ? saved.notifs : 3);
  const [view, setView] = useState("home");
  const [viewer, setViewer] = useState(null);
  const [toast, setToast] = useState("");
  const file = useRef();

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify({ posts, theme, following, seen, mine, notifs })); } catch (e) {} }, [posts, theme, following, seen, mine, notifs]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 2000); return () => clearTimeout(t); }, [toast]);

  const go = (v) => { setView(v); if (v === "notifications") setNotifs(0); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const upd = (id, f) => setPosts((ps) => ps.map((p) => (p.id === id ? f(p) : p)));
  const like = (id) => upd(id, (p) => ({ ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }));
  const save = (id) => { upd(id, (p) => ({ ...p, saved: !p.saved })); setToast("Saved posts updated"); };
  const comment = (id, text) => upd(id, (p) => ({ ...p, comments: [...p.comments, { id: "c" + Date.now(), user: "me", text, ts: Date.now() }] }));
  const share = async (p) => { try { await navigator.clipboard.writeText(location.href + "#" + p.id); setToast("Link copied"); } catch (e) { setToast("Couldn’t copy the link"); } };
  const follow = (id) => setFollowing((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const addStory = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader(); r.onload = () => { setMine((m) => [...m, r.result]); setToast("Story added"); };
    r.readAsDataURL(f); e.target.value = "";
  };

  const storyList = [...(mine.length ? [{ user: UM.me, slides: mine }] : []), ...USERS.slice(1).map((u) => ({ user: u, slides: [u.seed * 7 + 1, u.seed * 7 + 2, u.seed * 7 + 3] }))];
  const openStory = (id) => setViewer(Math.max(0, storyList.findIndex((s) => s.user.id === id)));
  const markSeen = (id) => setSeen((s) => (s.includes(id) ? s : [...s, id]));
  const feed = [...posts].sort((a, b) => b.ts - a.ts);

  const home = (
    <div>
      <div className="card stories">
        <Story u={UM.me} mine seen={!mine.length || seen.includes("me")} onOpen={() => (mine.length ? openStory("me") : file.current.click())} onAdd={() => file.current.click()} />
        {USERS.slice(1).map((u) => <Story key={u.id} u={u} seen={seen.includes(u.id)} onOpen={() => openStory(u.id)} />)}
      </div>
      {feed.map((p) => <Post key={p.id} p={p} onLike={like} onSave={save} onComment={comment} onShare={share} />)}
    </div>
  );

  return (
    <div>
      <Navbar view={view} go={go} theme={theme} toggle={toggle} />
      <div className="app">
        <Sidebar view={view} go={go} theme={theme} toggle={toggle} notifs={notifs} />
        <main className="main">{view === "home" ? home : <Soon view={view} go={go} />}</main>
        <aside className="rail">
          <ProfileCard u={UM.me} self />
          <div className="mut" style={{ fontSize: 14, fontWeight: 600, margin: "14px 0 6px" }}>Suggested for you</div>
          {USERS.slice(1, 6).map((u) => <ProfileCard key={u.id} u={u} following={following.includes(u.id)} onFollow={follow} />)}
        </aside>
      </div>
      <input ref={file} type="file" accept="image/*" hidden onChange={addStory} />
      {viewer !== null && <StoryViewer list={storyList} start={viewer} onClose={() => setViewer(null)} onSeen={markSeen} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
