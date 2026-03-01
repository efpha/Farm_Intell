import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Category } from "../types/discussionTypes";

type CategoryFilterProps = {
  categories: Category[];
  activeCategory: number | null;
  onSelect: (id: number | null) => void;
};

export default function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  const filterScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    filterScrollRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <button
        type="button"
        onClick={() => scroll("left")}
        aria-label="Scroll filters left"
        className="hidden lg:flex flex-shrink-0 items-center justify-center rounded-full border bg-white p-1.5 shadow-sm hover:bg-slate-50 cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4 text-slate-600" />
      </button>

      <div className="relative min-w-0 flex-1">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-slate-50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-slate-50 to-transparent" />
        <div
          ref={filterScrollRef}
          className="flex items-center gap-3 overflow-x-auto px-1 lg:px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <button
            type="button"
            onClick={() => onSelect(null)}
            className={`flex-shrink-0 rounded-xl px-3 py-2 text-xs lg:text-sm font-medium transition-colors ${
              activeCategory === null
                ? "bg-emerald-600 text-white"
                : "bg-white border text-slate-600 hover:bg-slate-50"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(activeCategory === cat.id ? null : cat.id)}
              className={`flex-shrink-0 rounded-xl px-3 py-2 text-xs lg:text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-emerald-600 text-white"
                  : "bg-white border text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Scroll filters right"
        className="hidden lg:flex flex-shrink-0 items-center justify-center rounded-full border bg-white p-1.5 shadow-sm hover:bg-slate-50 cursor-pointer"
      >
        <ChevronRight className="h-4 w-4 text-slate-600" />
      </button>
    </div>
  );
}