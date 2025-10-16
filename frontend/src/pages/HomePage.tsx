import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import ThreatGroupCard from "../components/ThreatGroupCard";

//Type definition for threat groups
interface ThreatGroup {
  _id: string;
  canonicalName: string;
  description: string;
  aliases?: Array<{ name: string; source?: string }>;
  country?: string;
  tags?: string[];
}

const HomePage = () => {
  const navigate = useNavigate();

  //State for search results, full group list, loading, filters, sorting etc
  const [threatGroups, setThreatGroups] = useState<ThreatGroup[]>([]);
  const [allGroups, setAllGroups] = useState<ThreatGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllResults, setShowAllResults] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "country">("name");
  const [filterCountry, setFilterCountry] = useState<string>("");

  const INITIAL_RESULTS_LIMIT = 5;

  //Search handler
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setSearchQuery(query);
    setShowAllResults(false);
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

  //Fetch all groups on mount for the table
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

  //Get unique countries for filter dropdown
  const uniqueCountries = Array.from(new Set(allGroups.map(g => g.country).filter(Boolean))).sort();

  //Filter and sort groups
  const filteredAndSortedGroups = allGroups
    .filter(group => !filterCountry || group.country === filterCountry)
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.canonicalName.localeCompare(b.canonicalName);
      } else {
        return (a.country || "").localeCompare(b.country || "");
      }
    });

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Threat Group Search</h1>

          {/* Search input */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Search results */}
          {loading && (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}

          {!loading && threatGroups.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Search Results ({threatGroups.length})</h2>
                <button
                  onClick={() => {
                    setThreatGroups([]);
                    setSearchQuery("");
                    setShowAllResults(false);
                  }}
                  className="btn btn-sm btn-ghost"
                  aria-label="Clear search results"
                >
                  ✕ Clear
                </button>
              </div>
              <div className="flex flex-col gap-1.5">
                {(showAllResults ? threatGroups : threatGroups.slice(0, INITIAL_RESULTS_LIMIT)).map((group) => (
                  <ThreatGroupCard
                    key={group._id}
                    id={group._id}
                    title={group.canonicalName}
                    content={group.description}
                    country={group.country}
                    aliases={group.aliases}
                    tags={group.tags}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
              {!showAllResults && threatGroups.length > INITIAL_RESULTS_LIMIT && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setShowAllResults(true)}
                    className="btn btn-outline btn-sm"
                  >
                    Show {threatGroups.length - INITIAL_RESULTS_LIMIT} more results
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Full table of groups */}
          <div className="flex justify-between items-center mt-12 mb-4">
            <h2 className="text-2xl font-semibold">Browse Groups</h2>
            <div className="flex gap-2 items-center">
              <select
                className="select select-sm select-bordered"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "country")}
              >
                <option value="name">Sort by Name</option>
                <option value="country">Sort by Country</option>
              </select>

              {/**Country filter dropdown */}
              <select
                className="select select-sm select-bordered"
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
              >
                <option value="">All Countries</option>
                {uniqueCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loadingAll ? (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto max-h-[1000px] overflow-y-auto">
                <table className="table w-full">
                  <thead className="sticky top-0 bg-base-200 z-10">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>Aliases</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedGroups.map((group) => (
                      <tr
                        key={group._id}
                        className="hover:bg-base-200 cursor-pointer"
                        onClick={() => navigate(`/profile/${group._id}`)}
                      >
                        <td className="font-medium text-blue-600">{group.canonicalName}</td>
                        <td>{group.country || "—"}</td>
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
              <div className="bg-base-200 px-4 py-2 text-right">
                <span className="text-xs text-base-content/60">
                  Total groups: {filteredAndSortedGroups.length}
                  {filterCountry && ` (filtered from ${allGroups.length})`}
                </span>
              </div>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
};

export default HomePage;
