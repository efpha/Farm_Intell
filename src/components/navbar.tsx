import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const goTo = (path: string) => {
    navigate(path);
    setIsOpen(false); // close sidebar after clicking
  };

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-white">
        {/* Logo */}
        <div
          onClick={() => goTo("/")}
          className="flex items-center gap-2 font-semibold cursor-pointer"
        >
          <Leaf className="h-6 w-6 text-emerald-600" />
          <span>FarmIntell</span>
        </div>

        {/* Desktop Nav */}
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <span
            onClick={() => goTo("/")}
            className="text-sm font-medium text-black hover:underline underline-offset-4 cursor-pointer"
          >
            Home
          </span>

          <span
            onClick={() => goTo("/about")}
            className="text-sm font-medium text-black hover:underline underline-offset-4 cursor-pointer"
          >
            About
          </span>

          <span
            onClick={() => goTo("/models")}
            className="text-sm font-medium text-black hover:underline underline-offset-4 cursor-pointer"
          >
            AI models
          </span>

          <span
            onClick={() => goTo("/market-price")}
            className="text-sm font-medium text-black hover:underline underline-offset-4 cursor-pointer"
          >
            Market prices
          </span>

          <span
            onClick={() => goTo("/community")}
            className="text-sm font-medium text-black hover:underline underline-offset-4 cursor-pointer"
          >
            Community
          </span>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="ml-auto md:hidden rounded-xl p-2 hover:bg-slate-100"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-slate-900" />
        </button>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-100 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 md:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b px-4 h-14">
          <div className="flex items-center gap-2 font-semibold">
            <Leaf className="h-6 w-6 text-emerald-600" />
            <span>FarmIntell</span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-xl p-2 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-slate-900" />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col p-4 gap-2">
          <button
            onClick={() => goTo("/")}
            className="text-left rounded-xl px-4 py-3 text-sm font-medium text-slate-900 hover:bg-emerald-50"
          >
            Home
          </button>

          <button
            onClick={() => goTo("/about")}
            className="text-left rounded-xl px-4 py-3 text-sm font-medium text-slate-900 hover:bg-emerald-50"
          >
            About
          </button>

          <button
            onClick={() => goTo("/models")}
            className="text-left rounded-xl px-4 py-3 text-sm font-medium text-slate-900 hover:bg-emerald-50"
          >
            AI models
          </button>

          <button
            onClick={() => goTo("/market-price")}
            className="text-left rounded-xl px-4 py-3 text-sm font-medium text-slate-900 hover:bg-emerald-50"
          >
            Market prices
          </button>

          <button
            onClick={() => goTo("/community")}
            className="text-left rounded-xl px-4 py-3 text-sm font-medium text-slate-900 hover:bg-emerald-50"
          >
            Community
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
