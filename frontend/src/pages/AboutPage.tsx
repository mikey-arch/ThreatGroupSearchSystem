import crowData from "../data/crow.json";
import Sidebar from "../components/Sidebar";

const AboutPage = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-8 max-w-5xl mx-auto" data-theme="nord">
        {/* Sticky Top Title */}
        <div className="sticky top-0 z-20 bg-base-200 py-6 shadow-md">
          <h1 className="text-4xl font-bold text-center">{crowData.name}</h1>
        </div>

        {/* Description */}
        <section className="mt-8 mb-8 bg-white dark:bg-base-100 rounded-lg p-6 shadow">
          <h2 className="text-2xl font-semibold mb-4">Who is CROW?</h2>
          <p className="text-lg">{crowData.description}</p>
          (Information drawn from Waikato University website)
          <div className="mt-4">
            <a
              href={crowData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              Visit official website
            </a>
          </div>
        </section>

        {/* Research Focus Areas */}
        {crowData.focusAreas && crowData.focusAreas.length > 0 && (
          <section className="mb-8 bg-white dark:bg-base-100 rounded-lg p-6 shadow">
            <h2 className="text-2xl font-semibold mb-4">Research Focus Areas</h2>
            <ul className="list-disc list-inside space-y-2">
              {crowData.focusAreas.map((area, idx) => (
                <li key={idx}>{area}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Note */}
        <section className="mb-8 text-sm text-gray-500">
          <p>
            For the most up-to-date information about the team, research projects,
            and publications, please refer to the{" "}
            <a
              href={crowData.website}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              official CROW website
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;

