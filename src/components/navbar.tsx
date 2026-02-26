import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const goTo = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-100 bg-white border-b">
        <div className="mx-auto max-w-7xl h-16 px-4 lg:px-8 flex items-center">

          {/* LEFT — Brand */}
          <div
            onClick={() => goTo("/")}
            className="flex items-center gap-2 cursor-pointer font-semibold select-none"
          >
            <Leaf className="h-7 w-7 text-emerald-600" />
            <span className="text-lg text-gray-900">FarmIntell</span>
          </div>

          {/* CENTER — Main Nav (Re-ordered by importance) */}
          <nav className="hidden md:flex ml-auto mr-auto gap-8">
            {[
              { label: "Home", path: "/" },
              { label: "AI Models", path: "/models" },
              { label: "Market Prices", path: "/market-price" },
              { label: "Irrigation", path: "/irrigation" },
              { label: "Community", path: "/community" },
              { label: "About", path: "/about" },
            ].map((item) => (
              <span
                key={item.path}
                onClick={() => goTo(item.path)}
                className="relative text-sm font-medium text-gray-800 cursor-pointer hover:text-emerald-600 transition"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-600 transition-all duration-300 hover:w-full"></span>
              </span>
            ))}
          </nav>

          {/* RIGHT — Authentication */}
          <div className="hidden md:flex gap-4 items-center ml-auto">
            <button
              onClick={() => goTo("/login")}
              className="text-sm font-medium text-gray-800 hover:text-emerald-600 transition"
            >
              Login
            </button>

            <button
              onClick={() => goTo("/register")}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
            >
              Register
            </button>
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setIsOpen(true)}
            className="ml-auto md:hidden rounded-lg p-2 hover:bg-gray-100 transition"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-99 transition-transform duration-300 md:hidden 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between h-16 border-b px-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-emerald-600" />
            <span className="font-semibold text-gray-900">FarmIntell</span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile nav (priority-based) */}
        <div className="flex flex-col p-4 space-y-2">
          {[
            { label: "Home", path: "/" },
            { label: "AI Models", path: "/models" },
            { label: "Market Prices", path: "/market-price" },
            { label: "Irrigation", path: "/irrigation" },
            { label: "Community", path: "/community" },
            { label: "About", path: "/about" },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => goTo(item.path)}
              className="w-full text-left px-4 py-3 rounded-lg text-gray-900 text-sm hover:bg-emerald-50 transition"
            >
              {item.label}
            </button>
          ))}

          <hr className="my-2" />

          <button
            onClick={() => goTo("/login")}
            className="w-full text-left px-4 py-3 rounded-lg text-gray-900 font-medium hover:bg-emerald-50"
          >
            Login
          </button>

          <button
            onClick={() => goTo("/register")}
            className="w-full text-left px-4 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
          >
            Register
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;