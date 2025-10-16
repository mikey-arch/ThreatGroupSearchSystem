import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

interface Alias { name: string; source?: string }
interface ExternalId { source: string; group_id: string }
interface Source { source: string; url?: string; note?: string }
interface Tool { name: string; software_id: string; type: string; description: string; source?: string }
interface Note { text: string; author?: string; createdAt?: string }

interface ThreatGroup {
  _id: string;
  canonicalName: string;
  description?: string;
  aliases?: Alias[];
  externalIds?: ExternalId[];
  tags?: string[];
  country?: string;
  status?: string;
  parentNames?: string[];
  childNames?: string[];
  sources?: Source[];
  tools?: Tool[];
  notes?: Note[];
}

const CountryThreats = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const [threatGroups, setThreatGroups] = useState<ThreatGroup[]>([]);
  const [loading, setLoading] = useState(true);

  //fetch threat groups for the specified country
  useEffect(() => {
    if (!country) return;
    const fetchThreats = async () => {
      try {
        const res = await fetch(`/api/threatgroups/bycountry/${encodeURIComponent(country)}`);
        const data: ThreatGroup[] = await res.json();
        setThreatGroups(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchThreats();
  }, [country]);

  //Navigate to a group's profile page
  const navigateToGroup = (groupId: string) => {
    navigate(`/profile/${groupId}`);
  }

  return (
    <div className="flex">
      {/**Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/**Main Content */}
      <main className="flex-1 p-8 max-w-6xl mx-auto" data-theme="nord">
        <div className="sticky top-0 z-20 bg-base-200 py-6 shadow-md">
          <h1 className="text-4xl font-bold text-center">Threat Groups in {country}</h1>
        </div>

        <div className="mt-4 space-y-6">
          {loading ? (
            <p>Loading...</p>
          ) : threatGroups.length === 0 ? (
            <p>No threat groups found for this country.</p>
          ) : (
            threatGroups.map(group => (
              <div key={group._id} className="p-6 border rounded-lg shadow-md bg-base-100">
                <h2 className="text-2xl font-bold cursor-pointer text-blue-600 hover:underline" onClick={() => navigateToGroup(group._id)}>
                  {group.canonicalName}
                </h2>

                {/**Status badge */}
                {group.status && (
                  <span className={`ml-2 px-2 py-1 rounded-full text-sm font-semibold ${group.status === "active" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}>
                    {group.status.toUpperCase()}
                  </span>
                )}

                {/**Tags */}
                {group.tags && (
                  <div className="mt-2 space-x-2">
                    {group.tags.map(tag => (
                      <span key={tag} className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {/**Description */}
                {group.description && <p className="mt-4">{group.description}</p>}

                {/**Following are optional dependent on information available per group */}
                {/**Alisases */}
                {group.aliases && group.aliases.length > 0 && (
                  <p className="mt-2"><strong>Aliases:</strong> {group.aliases.map(a => a.name).join(", ")}</p>
                )}

                {/**Tools */}
                {group.tools && group.tools.length > 0 && (
                  <p className="mt-1"><strong>Tools:</strong> {group.tools.map(t => t.name).join(", ")}</p>
                )}

                {/**Sources */}
                {group.sources && group.sources.length > 0 && (
                  <p className="mt-1"><strong>Sources:</strong> {group.sources.map(s => s.source).join(", ")}</p>
                )}

                {/**Notes */}
                {group.notes && group.notes.length > 0 && (
                  <p className="mt-1"><strong>Notes:</strong> {group.notes.map(n => n.text).join(" | ")}</p>
                )}

                {/**Parent groups */}
                {group.parentNames && group.parentNames.length > 0 && (
                  <p className="mt-1"><strong>Parent Groups:</strong> {group.parentNames.join(", ")}</p>
                )}

                {/**Children groups */}
                {group.childNames && group.childNames.length > 0 && (
                  <p className="mt-1"><strong>Child Groups:</strong> {group.childNames.join(", ")}</p>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default CountryThreats;
