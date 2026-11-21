import { UM } from "../data";
import { ago } from "../utils";
export default function Comment({ c }) {
  return (
    <div className="cm"><b>{UM[c.user].username}</b>{c.text}<span className="mut" style={{ fontSize: 12, marginLeft: 8 }}>{ago(c.ts)}</span></div>
  );
}
