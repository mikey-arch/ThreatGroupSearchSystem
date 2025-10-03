import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import ThreatGroupCard from "../components/ThreatGroupCard";

interface ThreatGroup {
  _id: string;
  canonicalName: string;
  description: string;
  aliases?: Array<{ name: string; source?: string }>;
}

const HomePage = () => {
  const [threatGroups, setThreatGroups] = useState<ThreatGroup[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/threatgroups/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setThreatGroups(data);
    } catch (error) {
      console.error("Error searching threat groups:", error);
      setThreatGroups([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Threat Group Search</h1>

          <div className="mb-8 flex justify-center">
            <SearchBar onSearch={handleSearch} />
          </div>

          {loading && (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}

          {!loading && threatGroups.length > 0 && (
            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
              {threatGroups.map((group) => (
                <ThreatGroupCard
                  key={group._id}
                  id={group._id}
                  title={group.canonicalName}
                  content={group.description}
                />
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default HomePage;
