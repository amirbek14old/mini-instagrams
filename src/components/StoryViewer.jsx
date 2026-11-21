import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Avatar from "./Avatar";
import { art } from "../utils";
export default function StoryViewer({ list, start, onClose, onSeen }) {
  const [si, setSi] = useState(start);
  const [pi, setPi] = useState(0);
  const st = list[si], slide = st.slides[pi];
  const next = () => { if (pi < st.slides.length - 1) setPi(pi + 1); else if (si < list.length - 1) { setSi(si + 1); setPi(0); } else onClose(); };
  const prev = () => { if (pi > 0) setPi(pi - 1); else if (si > 0) { setSi(si - 1); setPi(0); } };
  useEffect(() => { onSeen(st.user.id); const t = setTimeout(next, 4500); return () => clearTimeout(t); }, [si, pi]);
  useEffect(() => {
    const k = (e) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  });
  const src = typeof slide === "number" ? art(slide, 720, 1280) : slide;
  return (
    <div className="sv" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sc" style={{ backgroundImage: `url("${src}")` }}>
        <div className="bars">
          {st.slides.map((_, i) => <i key={si + "-" + i + (i === pi ? "c" : "")} className={i < pi ? "done" : i === pi ? "cur" : ""}><b /></i>)}
        </div>
        <div className="sh"><Avatar u={st.user} size={32} />{st.user.username}<button onClick={onClose} aria-label="Close"><X /></button></div>
        <div className="zone" style={{ left: 0 }} onClick={prev} />
        <div className="zone" style={{ right: 0 }} onClick={next} />
      </div>
    </div>
  );
}
