// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import GraphTree from "../components/GraphTree";

// interface Alias { name: string; source?: string }
// interface ExternalId { source: string; group_id: string }
// interface Source { source: string; url?: string; note?: string }
// interface Tool { name: string; software_id: string; type: string; description: string; source?: string }
// interface Note { text: string; author?: string; createdAt?: string }

// interface ThreatGroup {
//   canonicalName: string;
//   description: string;
//   aliases?: Alias[];
//   externalIds?: ExternalId[];
//   tags?: string[];
//   country?: string;
//   status?: string;
//   parentNames?: string[];
//   childNames?: string[];
//   sources?: Source[];
//   tools?: Tool[];
//   notes?: Note[];
// }

// const ProfilePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [group, setGroup] = useState<ThreatGroup | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState<"profile" | "web">("profile");

//   const navigateToGroup = async (canonicalName: string) => {
//     try {
//       const response = await fetch(`/api/threatgroups/${encodeURIComponent(canonicalName)}`);
//       const data = await response.json();
//       if (data._id) navigate(`/profile/${data._id}`);
//     } catch (error) {
//       console.error("Failed to fetch threat group:", error);
//     }
//   };

//   useEffect(() => {
//     if (!id) return;

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`/api/threatgroups/id/${id}`);
//         const data = await res.json();
//         setGroup(data);
//       } catch (err) {
//         console.error("Failed to fetch threat group", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (!group) return <div>No threat group found.</div>;

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="sticky top-0 h-screen">
//         <Sidebar />
//       </div>

//       {/* Main content */}
//       <main className="flex-1 p-8 max-w-5xl mx-auto" data-theme="nord">
//         {/* Title */}
//         <div className="sticky top-0 z-20 bg-base-200 py-6 shadow-md">
//           <h1 className="text-4xl font-bold text-center">{group.canonicalName}</h1>
//         </div>

//         {/* Tabs */}
//         <div className="mt-6 border-b border-gray-300">
//           <nav className="-mb-px flex space-x-4">
//             <button
//               onClick={() => setActiveTab("profile")}
//               className={`py-2 px-4 font-semibold ${
//                 activeTab === "profile" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
//               }`}
//             >
//               Profile
//             </button>
//             <button
//               onClick={() => setActiveTab("web")}
//               className={`py-2 px-4 font-semibold ${
//                 activeTab === "web" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
//               }`}
//             >
//               Web Results
//             </button>
//           </nav>
//         </div>

//         {/* Tab Content */}
//         <div className="mt-6">
//           {activeTab === "profile" && (
//             <>
//               {/* Aliases */}
//               {group.aliases?.length > 0 && (
//                 <section className="mb-6">
//                   <h2 className="text-xl font-semibold mb-2">Aliases</h2>
//                   <ul className="list-disc list-inside">
//                     {group.aliases.map((alias, idx) => (
//                       <li key={idx}>{alias.name}{alias.source ? ` (source: ${alias.source})` : ""}</li>
//                     ))}
//                   </ul>
//                 </section>
//               )}

//               {/* Description */}
//               {group.description && (
//                 <section className="mb-6">
//                   <h2 className="text-xl font-semibold mb-2">Description</h2>
//                   <p>{group.description}</p>
//                 </section>
//               )}

//               {/* Country & Status */}
//               {(group.country || group.status) && (
//                 <section className="mb-6">
//                   {group.country && <p><strong>Country:</strong> {group.country}</p>}
//                   {group.status && <p><strong>Status:</strong> {group.status}</p>}
//                 </section>
//               )}

//               {/* Tags */}
//               {group.tags?.length > 0 && (
//                 <section className="mb-6">
//                   <h2 className="text-xl font-semibold mb-2">Tags</h2>
//                   <div className="flex flex-wrap gap-2">
//                     {group.tags.map(tag => (
//                       <span key={tag} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">{tag}</span>
//                     ))}
//                   </div>
//                 </section>
//               )}

//               {/* Relationship Graph */}
//               {(group.parentNames?.length > 0 || group.childNames?.length > 0) && (
//                 <section className="mb-6 bg-white dark:bg-base-100 rounded-lg p-6 shadow">
//                   <GraphTree
//                     canonicalName={group.canonicalName}
//                     parents={group.parentNames || []}
//                     children={group.childNames || []}
//                   />
//                   {/* Parent & Child lists */}
//                   {group.parentNames?.length > 0 && (
//                     <>
//                       <h2 className="text-xl font-semibold mt-6 mb-2">Parent Groups</h2>
//                       <ul className="list-disc list-inside">
//                         {group.parentNames.map((parent, idx) => (
//                           <li key={idx}>
//                             <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigateToGroup(parent)}>{parent}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </>
//                   )}
//                   {group.childNames?.length > 0 && (
//                     <>
//                       <h2 className="text-xl font-semibold mt-6 mb-2">Child Groups</h2>
//                       <ul className="list-disc list-inside">
//                         {group.childNames.map((child, idx) => (
//                           <li key={idx}>
//                             <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigateToGroup(child)}>{child}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </>
//                   )}
//                 </section>
//               )}

//               {/* Tools */}
//               {group.tools?.length > 0 && (
//                 <section className="mb-6 bg-white dark:bg-base-100 rounded-lg p-6 shadow">
//                   <h2 className="text-2xl font-semibold mb-4">Tools</h2>
//                   <ul className="space-y-4">
//                     {group.tools.map((tool, idx) => (
//                       <li key={idx}>
//                         <h3 className="font-bold text-lg">{tool.name} <span className="text-sm font-normal text-gray-600">({tool.type})</span></h3>
//                         <p className="ml-4">{tool.description}</p>
//                         {tool.source && (
//                           <a href={tool.source} target="_blank" rel="noopener noreferrer" className="ml-4 text-blue-600 underline text-sm">
//                             More info
//                           </a>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 </section>
//               )}

//               {/* Notes */}
//               {group.notes?.length > 0 && (
//                 <section className="mb-6 bg-white dark:bg-base-100 rounded-lg p-6 shadow">
//                   <h2 className="text-2xl font-semibold mb-4">Notes</h2>
//                   <ul className="space-y-4">
//                     {group.notes.map((note, idx) => (
//                       <li key={idx}>
//                         <p className="ml-4">{note.text}</p>
//                         {note.author && <p className="ml-4 italic">— {note.author}</p>}
//                         {note.createdAt && <p className="ml-4 text-sm text-gray-600">{new Date(note.createdAt).toLocaleDateString()}</p>}
//                       </li>
//                     ))}
//                   </ul>
//                 </section>
//               )}

//               {/* External IDs */}
//               {group.externalIds?.length > 0 && (
//                 <section className="mb-6">
//                   <h2 className="text-xl font-semibold mb-2">External IDs</h2>
//                   <ul className="list-disc list-inside">
//                     {group.externalIds.map((ext, idx) => (
//                       <li key={idx}>{ext.source}: {ext.group_id}</li>
//                     ))}
//                   </ul>
//                 </section>
//               )}

//               {/* Sources */}
//               {group.sources?.length > 0 && (
//                 <section className="mb-6">
//                   <h2 className="text-xl font-semibold mb-2">Sources</h2>
//                   <ul className="list-disc list-inside">
//                     {group.sources.map((source, idx) => (
//                       <li key={idx}>
//                         {source.url ? (
//                           <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{source.source}</a>
//                         ) : source.source}
//                         {source.note ? ` — ${source.note}` : ""}
//                       </li>
//                     ))}
//                   </ul>
//                 </section>
//               )}

//               {/* Raw JSON */}
//               <section className="mb-6 bg-white dark:bg-base-100 rounded-lg p-6 shadow">
//                 <h2 className="text-xl font-semibold mb-4">Raw JSON Data</h2>
//                 <details>
//                   <summary className="cursor-pointer text-blue-600 hover:underline mb-2">Click to view raw JSON</summary>
//                   <pre className="bg-gray-100 dark:bg-gray-800 text-sm p-4 mt-2 overflow-auto rounded">
//                     {JSON.stringify(group, null, 2)}
//                   </pre>
//                 </details>
//               </section>
//             </>
//           )}

//           {activeTab === "web" && (
//             <section className="mb-6 bg-white dark:bg-base-100 rounded-lg p-6 shadow">
//               <h2 className="text-2xl font-semibold mb-4">Web Results</h2>
//               <p>Web results to go here... eventually</p>
//             </section>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ProfilePage;
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import GraphTree from "../components/GraphTree";

// interface Alias {
//   name: string;
//   source?: string;
// }

// interface ExternalId {
//   source: string;
//   group_id: string;
// }

// interface Source {
//   source: string;
//   url?: string;
//   note?: string;
// }

// interface Tool {
//   name: string;
//   software_id: string;
//   type: string;
//   description: string;
//   source?: string;
// }

// interface Note {
//   text: string;
//   author?: string;
//   createdAt?: string;
// }

// interface WebResult {
//   title: string;
//   url: string;
//   snippet?: string;
// }

// interface ThreatGroup {
//   canonicalName: string;
//   description: string;
//   aliases?: Alias[];
//   externalIds?: ExternalId[];
//   tags?: string[];
//   country?: string;
//   status?: string;
//   parentNames?: string[];
//   childNames?: string[];
//   sources?: Source[];
//   tools?: Tool[];
//   notes?: Note[];
// }

// const ProfilePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [group, setGroup] = useState<ThreatGroup | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [activeTab, setActiveTab] = useState<"profile" | "web">("profile");

//   const [webResults, setWebResults] = useState<WebResult[]>([]);
//   const [webLoading, setWebLoading] = useState(false);

//   // Fetch threat group by ID
//   useEffect(() => {
//     if (!id) return;

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`/api/threatgroups/id/${id}`);
//         const data = await res.json();
//         setGroup(data);
//       } catch (err) {
//         console.error("Failed to fetch threat group", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const navigateToGroup = async (canonicalName: string) => {
//     try {
//       const response = await fetch(`/api/threatgroups/${encodeURIComponent(canonicalName)}`);
//       const data = await response.json();
//       if (data._id) {
//         navigate(`/profile/${data._id}`);
//       }
//     } catch (error) {
//       console.error("Failed to fetch threat group:", error);
//     }
//   };

//   // Fetch web results for current group + parents + children
//   const fetchWebResults = async () => {
//     if (!group) return;

//     setWebLoading(true);
//     const terms = [
//       group.canonicalName,
//       ...(group.parentNames || []),
//       ...(group.childNames || []),
//     ];

//     try {
//       const response = await fetch("/api/websearch", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ terms }),
//       });
//       const data = await response.json();
//       setWebResults(data.results || []);
//     } catch (err) {
//       console.error("Failed to fetch web results", err);
//     } finally {
//       setWebLoading(false);
//     }
//   };

//   const handleTabClick = (tab: "profile" | "web") => {
//     setActiveTab(tab);
//     if (tab === "web" && webResults.length === 0) {
//       fetchWebResults();
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!group) return <div>No threat group found.</div>;

//   return (
//     <div className="flex">
//       <div className="sticky top-0 h-screen">
//         <Sidebar />
//       </div>

//       <main className="flex-1 p-8 max-w-5xl mx-auto" data-theme="nord">
//         {/* Sticky title */}
//         <div className="sticky top-0 z-20 bg-base-200 py-6 shadow-md">
//           <h1 className="text-4xl font-bold text-center">{group.canonicalName}</h1>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-300 mt-6 mb-4">
//           <button
//             className={`py-2 px-4 font-semibold ${
//               activeTab === "profile"
//                 ? "border-b-2 border-blue-500 text-blue-600"
//                 : "text-gray-500"
//             }`}
//             onClick={() => handleTabClick("profile")}
//           >
//             Profile
//           </button>
//           <button
//             className={`py-2 px-4 font-semibold ${
//               activeTab === "web"
//                 ? "border-b-2 border-blue-500 text-blue-600"
//                 : "text-gray-500"
//             }`}
//             onClick={() => handleTabClick("web")}
//           >
//             Web Results
//           </button>
//         </div>

//         {/* Profile Tab */}
//         {activeTab === "profile" && (
//           <>
//             {/* Aliases */}
//             {group.aliases?.length > 0 && (
//               <section className="mb-6">
//                 <h2 className="text-xl font-semibold mb-2">Aliases</h2>
//                 <ul className="list-disc list-inside">
//                   {group.aliases.map((alias, idx) => (
//                     <li key={idx}>
//                       {alias.name}
//                       {alias.source ? ` (source: ${alias.source})` : ""}
//                     </li>
//                   ))}
//                 </ul>
//               </section>
//             )}

//             {/* Description */}
//             {group.description && (
//               <section className="mb-6">
//                 <h2 className="text-xl font-semibold mb-2">Description</h2>
//                 <p>{group.description}</p>
//               </section>
//             )}

//             {/* Country & Status */}
//             {(group.country || group.status) && (
//               <section className="mb-6">
//                 {group.country && <p><strong>Country:</strong> {group.country}</p>}
//                 {group.status && <p><strong>Status:</strong> {group.status}</p>}
//               </section>
//             )}

//             {/* Tags */}
//             {group.tags?.length > 0 && (
//               <section className="mb-6">
//                 <h2 className="text-xl font-semibold mb-2">Tags</h2>
//                 <div className="flex flex-wrap gap-2">
//                   {group.tags.map((tag, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* Graph */}
//             {(group.parentNames?.length || group.childNames?.length) && (
//               <section className="mb-6 bg-white dark:bg-base-100 rounded-lg p-6 shadow">
//                 <GraphTree
//                   canonicalName={group.canonicalName}
//                   parents={group.parentNames || []}
//                   children={group.childNames || []}
//                 />

//                 {group.parentNames?.length > 0 && (
//                   <>
//                     <h2 className="text-xl font-semibold mt-6 mb-2">Parent Groups</h2>
//                     <ul className="list-disc list-inside">
//                       {group.parentNames.map((parent, idx) => (
//                         <li key={idx}>
//                           <span
//                             className="text-blue-600 cursor-pointer hover:underline"
//                             onClick={() => navigateToGroup(parent)}
//                           >
//                             {parent}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </>
//                 )}

//                 {group.childNames?.length > 0 && (
//                   <>
//                     <h2 className="text-xl font-semibold mt-6 mb-2">Child Groups</h2>
//                     <ul className="list-disc list-inside">
//                       {group.childNames.map((child, idx) => (
//                         <li key={idx}>
//                           <span
//                             className="text-blue-600 cursor-pointer hover:underline"
//                             onClick={() => navigateToGroup(child)}
//                           >
//                             {child}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </>
//                 )}
//               </section>
//             )}

//             {/* Tools */}
//             {group.tools?.length > 0 && (
//               <section className="mb-6 bg-white dark:bg-base-100 rounded-lg p-6 shadow">
//                 <h2 className="text-2xl font-semibold mb-4">Tools</h2>
//                 <ul className="space-y-4">
//                   {group.tools.map((tool, idx) => (
//                     <li key={idx}>
//                       <h3 className="font-bold text-lg">
//                         {tool.name} <span className="text-sm font-normal text-gray-600">({tool.type})</span>
//                       </h3>
//                       <p className="ml-4">{tool.description}</p>
//                       {tool.source && (
//                         <a
//                           href={tool.source}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="ml-4 text-blue-600 underline text-sm"
//                         >
//                           More info
//                         </a>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </section>
//             )}

//             {/* Notes */}
//             {group.notes?.length > 0 && (
//               <section className="mb-6 bg-white dark:bg-base-100 rounded-lg p-6 shadow">
//                 <h2 className="text-2xl font-semibold mb-4">Notes</h2>
//                 <ul className="space-y-4">
//                   {group.notes.map((note, idx) => (
//                     <li key={idx}>
//                       <p className="ml-4">{note.text}</p>
//                       {note.author && <p className="ml-4 italic">— {note.author}</p>}
//                       {note.createdAt && <p className="ml-4 text-sm text-gray-600">{new Date(note.createdAt).toLocaleDateString()}</p>}
//                     </li>
//                   ))}
//                 </ul>
//               </section>
//             )}

//             {/* Sources */}
//             {group.sources?.length > 0 && (
//               <section className="mb-6">
//                 <h2 className="text-xl font-semibold mb-2">Sources</h2>
//                 <ul className="list-disc list-inside">
//                   {group.sources.map((source, idx) => (
//                     <li key={idx}>
//                       {source.url ? (
//                         <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                           {source.source}
//                         </a>
//                       ) : source.source}
//                       {source.note ? ` — ${source.note}` : ""}
//                     </li>
//                   ))}
//                 </ul>
//               </section>
//             )}
//           </>
//         )}

//         {/* Web Results Tab */}
//         {activeTab === "web" && (
//           <section className="mb-6 bg-white dark:bg-base-100 rounded-lg p-6 shadow">
//             <h2 className="text-2xl font-semibold mb-4">Web Results</h2>
//             {webLoading ? (
//               <p>Loading...</p>
//             ) : webResults.length === 0 ? (
//               <p>No results found.</p>
//             ) : (
//               <ul className="list-disc list-inside space-y-2">
//                 {webResults.map((result, idx) => (
//                   <li key={idx}>
//                     <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                       {result.title}
//                     </a>
//                     {result.snippet && <p className="text-sm text-gray-600">{result.snippet}</p>}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </section>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ProfilePage;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import GraphTree from "../components/GraphTree";

interface Alias { name: string; source?: string; }
interface ExternalId { source: string; group_id: string; }
interface Source { source: string; url?: string; note?: string; }
interface Tool { name: string; software_id: string; type: string; description: string; source?: string; }
interface Note { text: string; author?: string; createdAt?: string; }
interface WebResult { title: string; link: string; snippet?: string; }
interface ThreatGroup {
  canonicalName: string;
  description: string;
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

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [group, setGroup] = useState<ThreatGroup | null>(null);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"profile" | "web">("profile");

  const [webResults, setWebResults] = useState<WebResult[]>([]);
  const [webLoading, setWebLoading] = useState(false);

  // Fetch threat group by ID
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/threatgroups/id/${id}`);
        const data = await res.json();
        setGroup(data);
      } catch (err) {
        console.error("Failed to fetch threat group", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Navigate to another threat group by canonicalName
  const navigateToGroup = async (canonicalName: string) => {
    try {
      const res = await fetch(`/api/threatgroups/${encodeURIComponent(canonicalName)}`);
      const data = await res.json();
      if (data._id) navigate(`/profile/${data._id}`);
    } catch (err) {
      console.error("Failed to fetch threat group:", err);
    }
  };

  // Fetch web results for current group + parents + children
  const fetchWebResults = async () => {
    if (!group) return;
    setWebLoading(true);

    const terms = [
      group.canonicalName,
      ...(group.parentNames || []),
      ...(group.childNames || []),
    ];

    try {
      const res = await fetch("/api/search?query=" + encodeURIComponent(terms.join(" ")));
      const data = await res.json();
      setWebResults(data.items || []); // items comes from Google Custom Search API
    } catch (err) {
      console.error("Failed to fetch web results", err);
      setWebResults([]);
    } finally {
      setWebLoading(false);
    }
  };

  const handleTabClick = (tab: "profile" | "web") => {
    setActiveTab(tab);
    if (tab === "web" && webResults.length === 0) {
      fetchWebResults();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!group) return <div>No threat group found.</div>;

  return (
    <div className="flex">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      <main className="flex-1 p-8 max-w-5xl mx-auto">
        {/* Sticky title */}
        <div className="sticky top-0 z-20 bg-base-200 py-6 shadow-md">
          <h1 className="text-4xl font-bold text-center">{group.canonicalName}</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-300 mt-6 mb-4">
          <button
            className={`py-2 px-4 font-semibold ${activeTab === "profile" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => handleTabClick("profile")}
          >
            Profile
          </button>
          <button
            className={`py-2 px-4 font-semibold ${activeTab === "web" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => handleTabClick("web")}
          >
            Web Results
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <>
            {group.description && <section className="mb-6"><h2 className="text-xl font-semibold mb-2">Description</h2><p>{group.description}</p></section>}

            {group.aliases?.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Aliases</h2>
                <ul className="list-disc list-inside">
                  {group.aliases.map((a, idx) => <li key={idx}>{a.name}{a.source ? ` (source: ${a.source})` : ""}</li>)}
                </ul>
              </section>
            )}

            {(group.country || group.status) && (
              <section className="mb-6">
                {group.country && <p><strong>Country:</strong> {group.country}</p>}
                {group.status && <p><strong>Status:</strong> {group.status}</p>}
              </section>
            )}

            {group.tags?.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((tag, idx) => (
                    <span key={idx} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">{tag}</span>
                  ))}
                </div>
              </section>
            )}

            {(group.parentNames?.length || group.childNames?.length) && (
              <section className="mb-6 bg-white rounded-lg p-6 shadow">
                <GraphTree canonicalName={group.canonicalName} parents={group.parentNames || []} children={group.childNames || []} />

                {group.parentNames?.length > 0 && (
                  <>
                    <h2 className="text-xl font-semibold mt-6 mb-2">Parent Groups</h2>
                    <ul className="list-disc list-inside">
                      {group.parentNames.map((p, idx) => <li key={idx}><span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigateToGroup(p)}>{p}</span></li>)}
                    </ul>
                  </>
                )}

                {group.childNames?.length > 0 && (
                  <>
                    <h2 className="text-xl font-semibold mt-6 mb-2">Child Groups</h2>
                    <ul className="list-disc list-inside">
                      {group.childNames.map((c, idx) => <li key={idx}><span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigateToGroup(c)}>{c}</span></li>)}
                    </ul>
                  </>
                )}
              </section>
            )}

            {group.tools?.length > 0 && (
              <section className="mb-6 bg-white rounded-lg p-6 shadow">
                <h2 className="text-2xl font-semibold mb-4">Tools</h2>
                <ul className="space-y-4">
                  {group.tools.map((tool, idx) => (
                    <li key={idx}>
                      <h3 className="font-bold text-lg">{tool.name} <span className="text-sm font-normal text-gray-600">({tool.type})</span></h3>
                      <p className="ml-4">{tool.description}</p>
                      {tool.source && <a href={tool.source} target="_blank" rel="noopener noreferrer" className="ml-4 text-blue-600 underline text-sm">More info</a>}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

        {/* Web Results Tab */}
        {activeTab === "web" && (
          <section className="mb-6 bg-white rounded-lg p-6 shadow">
            <h2 className="text-2xl font-semibold mb-4">Web Results</h2>
            {webLoading ? (
              <p>Loading...</p>
            ) : webResults.length === 0 ? (
              <p>No results found.</p>
            ) : (
              <ul className="list-disc list-inside space-y-2">
                {webResults.map((result, idx) => (
                  <li key={idx}>
                    <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{result.title}</a>
                    {result.snippet && <p className="text-sm text-gray-600">{result.snippet}</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
