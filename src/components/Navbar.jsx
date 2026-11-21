import { Moon, Sun, MessageCircle } from "lucide-react";
import { NAV } from "./Sidebar";
// Mobile only: top bar + bottom tab bar
export default function Navbar({ view, go, theme, toggle }) {
  return (
    <div>
      <div className="top">
        <div className="logo">MiniGram</div>
        <div style={{ display: "flex", gap: 4 }}>
          <button className="ic" onClick={toggle} aria-label="Toggle theme">{theme === "dark" ? <Sun /> : <Moon />}</button>
          <button className="ic" onClick={() => go("messages")} aria-label="Messages"><MessageCircle /></button>
        </div>
      </div>
      <nav className="bottom">
        {["home", "explore", "create", "reels", "profile"].map((id) => {
          const [, label, Icon] = NAV.find((n) => n[0] === id);
          return <button key={id} className={"ic " + (view === id ? "liked" : "")} onClick={() => go(id)} aria-label={label}><Icon /></button>;
        })}
      </nav>
    </div>
  );
}
