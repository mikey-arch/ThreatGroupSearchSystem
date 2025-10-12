import { Link } from "react-router-dom";
import logo from "../assets/crow-logo.png";

const Sidebar = () => {
  return (
    <aside className="w-72 bg-base-200 min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <a
          href="https://www.waikato.ac.nz/research/institutes-centres-entities/entities/cyber-security-research-group-crow/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <img src={logo} alt="CROW Logo" className="h-32 w-auto" />
        </a>
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

        {/* Map */}
        <li>
          <Link to="/map" className="flex items-center gap-4 text-lg">
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
                d="M12 2C8.134 2 5 5.134 5 9c0 7 7 13 7 13s7-6 7-13c0-3.866-3.134-7-7-7z"
              />
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth={1.5} />
            </svg>
            Map
          </Link>
        </li>

        <div className="divider"></div>

        {/* About */}
        <li>
          <Link to="/about" className="flex items-center gap-4 text-lg">
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
