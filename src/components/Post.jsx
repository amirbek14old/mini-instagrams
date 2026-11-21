import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import Avatar from "./Avatar";
import Comment from "./Comment";
import { UM } from "../data";
import { art, ago } from "../utils";
export default function Post({ p, onLike, onSave, onComment, onShare }) {
  const u = UM[p.user];
  const [open, setOpen] = useState(false);
  const [txt, setTxt] = useState("");
  const [pop, setPop] = useState(0);
  const imgLike = () => { if (!p.liked) onLike(p.id); setPop((x) => x + 1); };
  const send = () => { if (!txt.trim()) return; onComment(p.id, txt.trim()); setTxt(""); setOpen(true); };
  const shown = open ? p.comments : p.comments.slice(-2);
  return (
    <article className="card post">
      <div className="ph"><Avatar u={u} size={38} /><div><b>{u.username}</b><small>{ago(p.ts)}</small></div></div>
      <div className="img" onClick={imgLike}>
        <img src={p.image || art(p.seed)} alt={p.caption} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = art(p.seed); }} />
        {pop > 0 && <div className="pop" key={pop}><Heart size={96} fill="currentColor" /></div>}
      </div>
      <div className="acts">
        <button className={"ic " + (p.liked ? "liked" : "")} onClick={() => onLike(p.id)} aria-label="Like"><Heart fill={p.liked ? "currentColor" : "none"} /></button>
        <button className="ic" onClick={() => setOpen(true)} aria-label="Comment"><MessageCircle /></button>
        <button className="ic" onClick={() => onShare(p)} aria-label="Share"><Send /></button>
        <div className="grow" />
        <button className={"ic " + (p.saved ? "saved" : "")} onClick={() => onSave(p.id)} aria-label="Save"><Bookmark fill={p.saved ? "currentColor" : "none"} /></button>
      </div>
      <div className="pb">
        <b>{p.likes.toLocaleString()} likes</b>
        <div><b style={{ marginRight: 6 }}>{u.username}</b>{p.caption}</div>
        <div>{p.tags.map((t) => <span className="tag" key={t}>#{t}</span>)}</div>
        {p.comments.length > 2 && !open && <button className="mut" style={{ marginTop: 6 }} onClick={() => setOpen(true)}>View all {p.comments.length} comments</button>}
        {shown.map((c) => <Comment key={c.id} c={c} />)}
        <div className="cin">
          <input value={txt} placeholder="Add a comment…" onChange={(e) => setTxt(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
          <button className="link" disabled={!txt.trim()} onClick={send}>Post</button>
        </div>
      </div>
    </article>
  );
}
