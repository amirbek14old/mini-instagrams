import { art } from "../utils";
export default function Avatar({ u, size = 40, onClick }) {
  return (
    <div className="av" onClick={onClick} style={{ width: size, height: size, fontSize: size * 0.4, backgroundImage: `url("${art(u.seed, 200, 200)}")` }}>
      {u.name[0]}
    </div>
  );
}
