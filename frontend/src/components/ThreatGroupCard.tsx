import { Link } from "react-router-dom";

interface ThreatGroupCardProps {
  id: string;
  title: string;
  content: string;
  country?: string;
  aliases?: Array<{ name: string; source?: string }>;
  tags?: string[];
  searchQuery?: string;
}

// Country to flag emoji mapping
const countryFlags: Record<string, string> = {
  "Russia": "🇷🇺",
  "China": "🇨🇳",
  "North Korea": "🇰🇵",
  "Iran": "🇮🇷",
  "United States": "🇺🇸",
  "India": "🇮🇳",
  "Pakistan": "🇵🇰",
  "Israel": "🇮🇱",
  "Palestine": "🇵🇸",
  "United Kingdom": "🇬🇧",
  "France": "🇫🇷",
  "Germany": "🇩🇪",
  "Japan": "🇯🇵",
  "South Korea": "🇰🇷",
  "Brazil": "🇧🇷",
  "Turkey": "🇹🇷",
  "Saudi Arabia": "🇸🇦",
  "United Arab Emirates": "🇦🇪",
  "Vietnam": "🇻🇳",
  "Syria": "🇸🇾",
  "Ukraine": "🇺🇦",
  "Belarus": "🇧🇾",
  "Kazakhstan": "🇰🇿",
  "Netherlands": "🇳🇱",
  "Switzerland": "🇨🇭",
  "Sweden": "🇸🇪",
  "Norway": "🇳🇴",
  "Denmark": "🇩🇰",
  "Finland": "🇫🇮",
  "Poland": "🇵🇱",
  "Canada": "🇨🇦",
  "Mexico": "🇲🇽",
  "Australia": "🇦🇺",
  "New Zealand": "🇳🇿",
  "Singapore": "🇸🇬",
  "Malaysia": "🇲🇾",
  "Indonesia": "🇮🇩",
  "Thailand": "🇹🇭",
  "Philippines": "🇵🇭",
  "Egypt": "🇪🇬",
  "South Africa": "🇿🇦",
  "Nigeria": "🇳🇬",
  "Unknown": "🏴",
};

// Highlight matching text
const highlightText = (text: string, query?: string): React.ReactNode => {
  if (!query || query.trim() === "") return text;

  // Escape special regex characters
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');

  const parts = text.split(regex);

  return parts.map((part, i) => {
    // Check if this part matches the query (case insensitive)
    if (part.toLowerCase() === query.toLowerCase()) {
      return <mark key={i} className="bg-yellow-300 font-semibold">{part}</mark>;
    }
    return <span key={i}>{part}</span>;
  });
};

const ThreatGroupCard = ({
  id,
  title,
  content,
  country,
  aliases,
  tags,
  searchQuery
}: ThreatGroupCardProps) => {
  const flag = country ? (countryFlags[country] || "🌍") : "🌍";
  const aliasNames = aliases && aliases.length > 0
    ? aliases.map(a => a.name).join(", ")
    : null;

  return (
    <Link to={`/profile/${id}`} className="block">
      <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all hover:scale-[1.01] cursor-pointer border border-base-300">
        <div className="card-body p-2 relative min-h-[85px]">
          {/* Header with flag and title */}
          <div className="flex items-start gap-1.5 mb-0">
            <span className="text-lg">{flag}</span>
            <div className="flex-1">
              <h2 className="text-sm font-bold leading-tight mb-0">
                {highlightText(title, searchQuery)}
              </h2>
              {aliasNames && (
                <p className="text-[10px] text-gray-600 italic mt-0.5">
                  Aliases: {highlightText(aliasNames, searchQuery)}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs opacity-80 line-clamp-2 mb-4">
            {highlightText(content, searchQuery)}
          </p>

          {/* Tags - bottom right */}
          {tags && tags.length > 0 && (
            <div className="absolute bottom-1.5 right-1.5 flex flex-wrap gap-1 justify-end max-w-[60%]">
              {tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="badge badge-xs bg-blue-100 text-blue-800 border-0"
                >
                  {highlightText(tag, searchQuery)}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="badge badge-xs bg-gray-100 text-gray-600 border-0">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ThreatGroupCard;
