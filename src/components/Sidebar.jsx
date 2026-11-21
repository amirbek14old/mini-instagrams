import { Home, Compass, Clapperboard, MessageCircle, Heart, PlusSquare, User, Settings, Moon, Sun } from "lucide-react";
export const NAV = [
  ["home", "Home", Home], ["explore", "Explore", Compass], ["reels", "Reels", Clapperboard], ["messages", "Messages", MessageCircle],
  ["notifications", "Notifications", Heart], ["create", "Create Post", PlusSquare], ["profile", "Profile", User], ["settings", "Settings", Settings],
];
export default function Sidebar({ view, go, theme, toggle, notifs }) {
  return (
    <aside className="side">
      <div className="logo">MiniGram</div>
      {NAV.map(([id, label, Icon]) => (
        <button key={id} className={"nav " + (view === id ? "on" : "")} onClick={() => go(id)}>
          <Icon size={24} /><span>{label}</span>
          {id === "notifications" && notifs > 0 && <i className="badge">{notifs}</i>}
        </button>
      ))}
      <div className="grow" />
      <button className="nav" onClick={toggle}>
        {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}<span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
      </button>
    </aside>
  );
}
