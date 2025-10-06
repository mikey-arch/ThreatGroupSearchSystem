import { useState, useEffect } from "react";
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
  const [allGroups, setAllGroups] = useState<ThreatGroup[]>([]); // 🆕 for full table
  const [loading, setLoading] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false); // 🆕 for table loading

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

  // Fetch all groups on mount for the table
  useEffect(() => {
    const fetchAllGroups = async () => {
      setLoadingAll(true);
      try {
        const response = await fetch("/api/threatgroups");
        const data = await response.json();
        setAllGroups(data);
      } catch (error) {
        console.error("Error fetching all groups:", error);
      } finally {
        setLoadingAll(false);
      }
    };

    fetchAllGroups();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Threat Group Search</h1>

          <div className="mb-8 flex justify-center">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Search results */}
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

          {/* Full table of groups */}
          <h2 className="text-2xl font-semibold mt-12 mb-4">Our Database</h2>

          {loadingAll ? (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="overflow-x-auto border rounded-lg">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th>Name</th>
                    <th>Aliases</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {allGroups.map((group) => (
                    <tr key={group._id}>
                      <td className="font-medium">{group.canonicalName}</td>
                      <td>
                        {group.aliases?.length
                          ? group.aliases.map((a) => a.name).join(", ")
                          : "—"}
                      </td>
                      <td className="max-w-[500px]">{group.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
};

export default HomePage;
