import Avatar from "./Avatar";
export default function ProfileCard({ u, following, onFollow, self }) {
  return (
    <div className="pc">
      <Avatar u={u} size={44} />
      <div style={{ flex: 1, minWidth: 0 }}><b>{u.username}</b><small>{u.name}</small></div>
      {!self && <button className={"pill " + (following ? "ghost" : "")} onClick={() => onFollow(u.id)}>{following ? "Following" : "Follow"}</button>}
    </div>
  );
}
