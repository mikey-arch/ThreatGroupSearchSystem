// // // import { useParams } from "react-router-dom";

// // // const ProfilePage = () => {
// // //   const { id } = useParams();
// // //   console.log("ProfilePage rendered with id:", id);

// // //   return (
// // //     <div>
// // //       <h1>Profile Page</h1>
// // //       <p>ID from URL: {id}</p>
// // //     </div>
// // //   );
// // // };


// // // export default ProfilePage;

// // // import { useParams } from "react-router-dom";

// // // const ProfilePage = () => {
// // //   const { id } = useParams();

// // //   return (
// // //     <div>
// // //       <h1>Profile Page</h1>
// // //       <p>ID from URL: {id}</p>
// // //     </div>
// // //   );
// // // };

// // // export default ProfilePage;

// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import Sidebar from "../components/Sidebar";

// // interface Alias {
// //   name: string;
// //   source?: string;
// // }

// // interface ThreatGroup {
// //   canonicalName: string;
// //   description: string;
// //   aliases?: Alias[];
// // }

// // const ProfilePage = () => {
// //   const { id } = useParams();
// //   console.log("ProfilePage ID param:", id);

// //   const [group, setGroup] = useState<ThreatGroup | null>(null);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     console.log("Fetching ID:", id); // Debug log
// //     if (!id) return;

// //     const fetchData = async () => {
// //       setLoading(true);
// //       try {
// //         const res = await fetch(`/api/threatgroups/id/${id}`);
// //         const data = await res.json();
// //         console.log("Fetched data:", data); // log the response
// //         setGroup(data);
// //       } catch (err) {
// //         console.error("Failed to fetch threat group", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [id]);

// //   return (
// //     <div className="flex">
// //       <Sidebar />
// //       <main className="flex-1 p-8 max-w-5xl mx-auto">
// //         {/* Always show a title */}
// //         <h1 className="text-3xl font-bold mb-4">
// //           {group?.canonicalName || "Threat Group Profile"}
// //         </h1>
// //       </main>
// //     </div>
// //   );
// // };

// // export default ProfilePage;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "../components/Sidebar";

// interface Alias {
//   name: string;
//   source?: string;
// }

// interface ThreatGroup {
//   canonicalName: string;
//   description: string;
//   aliases?: Alias[];
// }

// const ProfilePage = () => {
//   const { id } = useParams();
//   console.log("ProfilePage ID param:", id);

//   const [group, setGroup] = useState<ThreatGroup | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     console.log("Fetching ID:", id); // Debug log
//     if (!id) return;

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`/api/threatgroups/id/${id}`);
//         const data = await res.json();
//         console.log("Fetched data:", data); // log the response
//         setGroup(data);
//       } catch (err) {
//         console.error("Failed to fetch threat group", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="flex-1 p-8 max-w-5xl mx-auto">
//         {/* Always show a title */}
//         <h1 className="text-3xl font-bold mb-6">
//           {group?.canonicalName || "Threat Group Profile"}
//         </h1>

//         {group?.aliases && group.aliases.length > 0 && (
//           <div className="mb-6">
//             <h3 className="text-xl font-semibold mb-1">Aliases:</h3>
//             <ul className="list-disc list-inside">
//               {group.aliases.map((alias, idx) => (
//                 <li key={idx}>
//                   {alias.name}
//                   {alias.source ? ` (source: ${alias.source})` : ""}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}


//         {/* Optional: show description or other details */}
//         <p>{group?.description}</p>
//       </main>
//     </div>
//   );
// };

// export default ProfilePage;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

interface Alias {
  name: string;
  source?: string;
}

interface ExternalId {
  source: string;
  group_id: string;
}

interface Source {
  source: string;
  url?: string;
  note?: string;
}

interface Tool {
  name: string;
  software_id: string;
  type: string;
  description: string;
  source?: string;
}

interface Note {
  text: string;
  author?: string;
  createdAt?: string;
}

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
  const { id } = useParams();
  const [group, setGroup] = useState<ThreatGroup | null>(null);
  const [loading, setLoading] = useState(false);

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

  if (loading) return <div>Loading...</div>;
  if (!group) return <div>No threat group found.</div>;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 max-w-5xl mx-auto" data-theme="nord">
        <h1 className="text-3xl font-bold mb-6">{group.canonicalName}</h1>

        {/* Aliases */}
        {group.aliases && group.aliases.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Aliases</h2>
            <ul className="list-disc list-inside">
              {group.aliases.map((alias, idx) => (
                <li key={idx}>
                  {alias.name}
                  {alias.source ? ` (source: ${alias.source})` : ""}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Description */}
        {group.description && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>{group.description}</p>
          </section>
        )}

        {/* Tags */}
        {group.tags && group.tags.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {group.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Country & Status */}
        <section className="mb-6">
          {group.country && (
            <p>
              <strong>Country:</strong> {group.country}
            </p>
          )}
          {group.status && (
            <p>
              <strong>Status:</strong> {group.status}
            </p>
          )}
        </section>

        {/* Parent and Child Groups */}
        {(group.parentNames?.length || group.childNames?.length) && (
          <section className="mb-6">
            {group.parentNames && group.parentNames.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-1">Parent Groups</h2>
                <ul className="list-disc list-inside mb-3">
                  {group.parentNames.map((parent, idx) => (
                    <li key={idx}>{parent}</li>
                  ))}
                </ul>
              </>
            )}
            {group.childNames && group.childNames.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-1">Child Groups</h2>
                <ul className="list-disc list-inside">
                  {group.childNames.map((child, idx) => (
                    <li key={idx}>{child}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}

        {/* External IDs */}
        {group.externalIds && group.externalIds.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">External IDs</h2>
            <ul className="list-disc list-inside">
              {group.externalIds.map((ext, idx) => (
                <li key={idx}>
                  {ext.source}: {ext.group_id}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Sources */}
        {group.sources && group.sources.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Sources</h2>
            <ul className="list-disc list-inside">
              {group.sources.map((source, idx) => (
                <li key={idx}>
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {source.source}
                    </a>
                  ) : (
                    source.source
                  )}
                  {source.note ? ` — ${source.note}` : ""}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tools */}
        {group.tools && group.tools.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Tools</h2>
            <ul className="list-disc list-inside">
              {group.tools.map((tool, idx) => (
                <li key={idx} className="mb-2">
                  <strong>{tool.name}</strong> ({tool.type})
                  <p>{tool.description}</p>
                  {tool.source && (
                    <a
                      href={tool.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      More info
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Notes */}
        {group.notes && group.notes.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Notes</h2>
            <ul className="list-disc list-inside">
              {group.notes.map((note, idx) => (
                <li key={idx} className="mb-2">
                  <p>{note.text}</p>
                  {note.author && <p className="italic">— {note.author}</p>}
                  {note.createdAt && (
                    <p className="text-sm text-gray-600">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
