import { Link } from "react-router";

interface ThreatGroupCardProps {
  id: string;
  title: string;
  content: string;
}

const ThreatGroupCard = ({ id, title, content}: ThreatGroupCardProps) => {
  return (
    <Link to={`/profile/${id}`} className="block">
      <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all hover:scale-[1.01] cursor-pointer">
        <div className="card-body">
          <h2 className="card-title text-lg">{title}</h2>
          <p className="text-sm opacity-70 line-clamp-2">{content}</p>
        </div>
      </div>
    </Link>
  );
};

export default ThreatGroupCard;
