import { Plus } from "lucide-react";
import Avatar from "./Avatar";
export default function Story({ u, seen, mine, onOpen, onAdd }) {
  return (
    <div className="story">
      <button className={"ring " + (seen ? "seen" : "")} onClick={onOpen} aria-label={"Open story by " + u.username}><Avatar u={u} size={62} /></button>
      {mine && <button className="plus" onClick={onAdd} aria-label="Add story"><Plus size={14} /></button>}
      <span>{mine ? "Your story" : u.username}</span>
    </div>
  );
}
