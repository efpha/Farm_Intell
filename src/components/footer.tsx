import React from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Github } from "lucide-react";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const goTo = (path: string) => navigate(path);

  return (
    <footer className="w-full bg-white border-t text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* COLUMN 1 — Brand */}
        <div
          onClick={() => goTo("/")}
          className="flex items-center gap-1.5 cursor-pointer select-none"
        >
          <Leaf className="h-4 w-4 text-emerald-600" />
          <span className="font-semibold text-gray-900">FarmIntell</span>
          <div className="hidden block text-xs text-gray-400">
            <span className="text-xs text-gray-400">Empowering Smart Agriculture</span>
          </div>
        </div>

        {/* COLUMN 2 — Navigation */}
        <nav className="text-left">
          <h6 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
            Navigation
          </h6>

          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {[
              { label: "Home", path: "/" },
              { label: "Disease Detection", path: "/detect" },
              { label: "Market Prices", path: "/market-price" },
              { label: "Community", path: "/community" },
              { label: "Model Overview", path: "/model" },
            ].map((item) => (
              <span
                key={item.path}
                onClick={() => goTo(item.path)}
                className="cursor-pointer text-gray-500 hover:text-emerald-600 transition-colors"
              >
                {item.label}
              </span>
            ))}
          </div>
        </nav>

        {/* COLUMN 3 — Account */}
        <div>
          <h6 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
            Account
          </h6>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => goTo("/login")}
              className="w-full text-left px-4 py-2 rounded-lg border text-sm text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => goTo("/register")}
              className="w-full text-left px-4 py-2 rounded-lg bg-emerald-700 text-sm text-white font-medium hover:bg-emerald-800 transition-colors"
            >
              Register
            </button>
          </div>
        </div>

        {/* COLUMN 4 — Contributors */}
        <div>
          <h6 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
            Contributors
          </h6>
          <div className="flex flex-col gap-2 text-xs text-gray-400">
            <a
              href="https://github.com/efpha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              <Github className="h-3.5 w-3.5" /> Keffa
            </a>
            <a
              href="https://github.com/renm226"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              <Github className="h-3.5 w-3.5" /> Samson
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t py-4 text-center text-xs text-gray-400">
        © 2026 FarmIntell — Empowering Smart Agriculture
      </div>
    </footer>
  );
};

export default Footer;