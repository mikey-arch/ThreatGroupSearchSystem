import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import GraphTree from "../components/GraphTree";


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
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <main className="flex-1 p-8 max-w-5xl mx-auto" data-theme="nord">
        <div className="sticky top-0 z-20 bg-base-200 py-6 shadow-md flex justify-center items-center">
          <h1 className="text-4xl font-bold">{group.canonicalName}</h1>
        </div>

        {group.aliases && group.aliases.length > 0 && (
        <section className="mt-8 mb-6">
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

        {/* Graph and Parent/Child Groups Section */}
        {group && (
          <section className="bg-white rounded-lg p-6 mb-6 shadow-md">
            {/* Graph */}
            <div className="mb-6">
              <GraphTree
                canonicalName={group.canonicalName}
                parents={group.parentNames || []}
                children={group.childNames || []}
              />
            </div>

            {/* Parent and Child Groups */}
            {((group.parentNames?.length ?? 0) > 0 || (group.childNames?.length ?? 0) > 0) && (
              <div>
                {(group.parentNames?.length ?? 0) > 0 && (
                  <>
                    <h2 className="text-xl font-semibold mb-1">Parent Groups</h2>
                    <ul className="list-disc list-inside mb-3">
                      {group.parentNames!.map((parent, idx) => (
                        <li key={idx}>{parent}</li>
                      ))}
                    </ul>
                  </>
                )}
                {(group.childNames?.length ?? 0) > 0 && (
                  <>
                    <h2 className="text-xl font-semibold mb-1">Child Groups</h2>
                    <ul className="list-disc list-inside">
                      {group.childNames!.map((child, idx) => (
                        <li key={idx}>{child}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </section>
        )}

        {/* Tools */}
        {group.tools && group.tools.length > 0 && (
          <section className="bg-white rounded-lg p-6 mb-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Tools</h2>
            <div className="space-y-6">
              {group.tools.map((tool, idx) => (
                <div key={idx} className="border-b pb-4 last:border-none">
                  <h3 className="text-lg md:text-xl font-semibold">
                    {tool.name} <span className="text-gray-600 font-normal">({tool.type})</span>
                  </h3>
                  <p className="mt-1">{tool.description}</p>
                  {tool.source && (
                    <a
                      href={tool.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline inline-block mt-1"
                    >
                      More info
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Notes */}
        {group.notes && group.notes.length > 0 && (
        <section className="bg-white rounded-lg p-6 mb-8 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Notes</h2>
          <ul className="list-disc list-inside space-y-2">
            {group.notes.map((note, idx) => (
              <li key={idx}>
                <span>{note.text}</span>
                {note.author && (
                  <span className="italic"> — {note.author}</span>
                )}
                {note.createdAt && (
                  <span className="text-sm text-gray-600">
                    {" "}
                    ({new Date(note.createdAt).toLocaleDateString()})
                  </span>
                )}
              </li>
            ))}
          </ul>
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

      </main>
    </div>
  );
};

export default ProfilePage;
