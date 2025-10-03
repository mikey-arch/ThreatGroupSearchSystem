import { Link } from "react-router";

const Sidebar = () => {
  return (
    <aside className="w-72 bg-base-200 min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-wide">Threat Groups</h2>
      </div>

      {/* Navigation */}
      <ul className="menu space-y-6">
        {/* Home */}
        <li>
          <Link to="/" className="flex items-center gap-4 text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </Link>
        </li>

        <div className="divider"></div>

        {/* Browse All */}
        <li>
          <a className="flex items-center gap-4 text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Browse Groups
          </a>
        </li>

        <div className="divider"></div>

        {/* About */}
        <li>
          <Link to="/about" className="flex items-center gap-4 text-lg text-blue-600 hover:text-blue-700 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3.75c-4.556 0-8.25 3.694-8.25 8.25s3.694 8.25 8.25 8.25 8.25-3.694 8.25-8.25S16.556 3.75 12 3.75z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25h1.5v5.25h-1.5v-5.25zM12 7.5a.75.75 0 110 1.5.75.75 0 010-1.5z"
              />
            </svg>
            About CROW
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
