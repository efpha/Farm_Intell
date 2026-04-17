import { useState, useMemo, useEffect, JSX, useRef, Fragment } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Search,
  RefreshCw,
  MapPin,
  ShoppingBasket,
  Wheat,
  Leaf,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

// ─── Supabase ──────────────────────────────────────────────────────────────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ─── Types ─────────────────────────────────────────────────────────────────────
type Category = "All" | string;

interface RawRow {
  Id: number;
  Commodity: string | null;
  Market: string | null;
  County: string | null;
  Retail: number | null;
  Unit: string | null;
  Date: string | null;
  Created_at: string | null;
  Classification: string | null;
  Grade: string | null;
  Sex: string | null;
  Wholesale: number | null;
  "Supply Volume": number | null;
}

interface Product {
  id: number;
  name: string;
  category: string;
  unit: string;
  retail: number | null;
  wholesale: number | null;
  market: string;
  county: string;
  date: string | null;
  grade: string | null;
  sex: string | null;
  supplyVolume: number | null;
  icon: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function categoryEmoji(cat: string): string {
  const map: Record<string, string> = {
    cereals: "🌾", grains: "🌾",
    vegetables: "🥬", fruits: "🍎",
    livestock: "🐄", dairy: "🥛",
    pulses: "🫘", legumes: "🫘",
    roots: "🥔", tubers: "🥔",
    fish: "🐟", poultry: "🐔",
    spices: "🌶️", oilseeds: "🫒",
  };
  const key = cat.toLowerCase();
  for (const k of Object.keys(map)) {
    if (key.includes(k)) return map[k];
  }
  return "";
}

function formatKES(n: number | null): string {
  if (n === null || n === undefined) return "—";
  return n.toLocaleString();
}

function formatDate(d: string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function CategoryIcon({ name }: { name: string }): JSX.Element {
  const map: Record<string, JSX.Element> = {
    Grains: <Wheat className="h-4 w-4" />,
    Cereals: <Wheat className="h-4 w-4" />,
    Vegetables: <Leaf className="h-4 w-4" />,
    Fruits: <ShoppingBasket className="h-4 w-4" />,
  };
  return map[name] ?? <ShoppingBasket className="h-4 w-4" />;
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function MarketPrice() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeCounty, setActiveCounty] = useState<string>("All");
  const [activeCommodity, setActiveCommodity] = useState<string>("All");

  const [entriesPerPage, setEntriesPerPage] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filterScrollRef = useRef<HTMLDivElement>(null);
  
  const [commodities, setCommodities] = useState<string[]>(["All"]);
  const [lastRefreshed, setLastRefreshed] = useState<string>(() =>
    new Date().toLocaleTimeString()
  );

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: sbError } = await supabase
        .from("commodity_prices")
        .select("*")
        .order("Date", { ascending: false });

      if (sbError) throw sbError;

      const mapped: Product[] = (data as RawRow[]).map((row) => ({
        id: row.Id,
        name: row.Commodity?.trim() ?? "Unknown",
        category: row.Classification ?? "Other",
        unit: row.Unit ?? "Kg",
        retail: row.Retail,
        wholesale: row.Wholesale,
        market: row.Market ?? "—",
        county: row.County ?? "—",
        date: row.Date,
        grade: row.Grade,
        sex: row.Sex,
        supplyVolume: row["Supply Volume"],
        icon: categoryEmoji(row.Classification ?? ""),
      }));

      setProducts(mapped);

      // DISTINCT commodities (cleaned)
      const { data: commodityData, error: commodityError } = await supabase
        .from("distinct_commodities")
        .select("Commodity");

      if (commodityError) throw commodityError;

      const unique = (commodityData || [])
        .map((c: any) => c.Commodity?.trim())
        .filter(Boolean)
        .sort((a: string, b: string) => a.localeCompare(b));

      setCommodities(["All", ...unique]);

      setCommodities(["All", ...unique]);

      setLastRefreshed(new Date().toLocaleTimeString());
    } catch (e: any) {
      setError(e.message ?? "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categories = useMemo<string[]>(() => {
    const cs = Array.from(new Set(products.map((p) => p.category))).sort();
    return ["All", ...cs];
  }, [products]);

  const counties = useMemo<string[]>(() => {
    const cs = Array.from(new Set(products.map((p) => p.county))).sort();
    return ["All", ...cs];
  }, [products]);

    const scrollFilters = (direction: "left" | "right") => {
    filterScrollRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  const stats = useMemo(
    () => ({
      total: products.length,
      markets: new Set(products.map((p) => p.market)).size,
      categories: categories.length - 1,
      counties: counties.length - 1,
    }),
    [products, categories, counties]
  );

  const filtered = useMemo<Product[]>(() => {
    return products.filter((p) => {
      const matchCommodity =
        activeCommodity === "All" ||
        p.name.toLowerCase().trim() ===
          activeCommodity.toLowerCase().trim();

      const matchCounty =
        activeCounty === "All" || p.county === activeCounty;

      const matchCategory =
        activeCategory === "All" || p.category === activeCategory;

      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.market.toLowerCase().includes(q) ||
        p.county.toLowerCase().includes(q);

      return (
        matchCommodity &&
        matchCounty &&
        matchCategory &&
        matchSearch
      );
    });
  }, [search, activeCommodity, activeCounty, activeCategory, products]);

  const grouped = useMemo<Record<string, Product[]>>(() => {
    if (activeCategory !== "All") return { [activeCategory]: filtered };
    return filtered.reduce<Record<string, Product[]>>((acc, p) => {
      if (!acc[p.category]) acc[p.category] = [];
      acc[p.category].push(p);
      return acc;
    }, {});
  }, [filtered, activeCategory]);

  function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}


  const paginated = useMemo(() => {
  const start = (currentPage - 1) * entriesPerPage;
  return filtered.slice(start, start + entriesPerPage);
}, [filtered, currentPage, entriesPerPage]);

const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));

// Reset to page 1 whenever filters change
useEffect(() => {
  setCurrentPage(1);
}, [search, activeCommodity, activeCounty, activeCategory, entriesPerPage]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-5 flex justify-between items-center">
          <div className="">
            <h1 className="text-2xl font-bold text-emerald-700">AgriMarket Prices</h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Latest commodity prices from major markets across Kenya
            </p>
          </div>
          <button onClick={fetchData} className="text-sm flex gap-1 items-center">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {lastRefreshed}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto my-6 px-4 space-y-12"> 
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          
    {/* ── Toolbar: Product select + Entries per page ── */}
    <div className="flex flex-wrap items-end gap-4">
      {/* Product dropdown */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-slate-500">Product</label>
        <select
          value={activeCommodity}
          onChange={(e) => setActiveCommodity(e.target.value)}
          className="rounded-lg border bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 min-w-[180px]"
        >
          {commodities.map((c) => (
            <option key={c} value={c}>{c === "All" ? "Select Product" : c}</option>
          ))}
        </select>
      </div>

      {/* Entries per page dropdown */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-slate-500">Entries:</label>
        <select
          value={entriesPerPage}
          onChange={(e) => setEntriesPerPage(Number(e.target.value))}
          className="rounded-lg border bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 w-28"
        >
          {[5, 10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Result count */}
      <p className="mb-2 text-xs text-slate-400">
        {filtered.length.toLocaleString()} result{filtered.length !== 1 ? "s" : ""}
      </p>
    </div>

    {/* ── Pagination (top) ── */}
    {totalPages > 1 && (
      <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-50 disabled:opacity-30"
          >
            ‹ Prev
          </button>

        {getPageNumbers(currentPage, totalPages).map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 py-1.5 text-xs text-slate-400">…</span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page as number)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                currentPage === page
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          )
        )}

            {totalPages > 1 && (
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1">

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-50 disabled:opacity-30"
          >
            Next ›
          </button>
        </div>
      </div>
    )}
      </div>
    )}

            {/* Commodity Button */}
          </div>


{/* Results — table layout */}
{loading ? (
  <div className="flex justify-center items-center py-16">
    <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
  </div>
) : error ? (
  <div className="flex items-center gap-2 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
    <AlertCircle className="h-4 w-4 flex-shrink-0" />
    {error}
  </div>
) : (
  <div className="space-y-3">

    {/* ── Table ── */}
    {Object.keys(grouped).length === 0 ? (
      <div className="py-16 text-center text-sm text-slate-400">
        No results match your filters.
      </div>
    ) : (
      <div className="overflow-x-hidden border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-md font-medium text-emerald-700">
              <th className="px-4 py-3 whitespace-nowrap">Commodity</th>
              <th className="px-4 py-3 whitespace-nowrap">Category</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Retail (KES)</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Wholesale (KES)</th>
              <th className="px-4 py-3 whitespace-nowrap">Market</th>
              <th className="px-4 py-3 whitespace-nowrap">County</th>
              <th className="px-4 py-3 whitespace-nowrap">Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Group paginated rows by category */}
            {Object.entries(
              paginated.reduce<Record<string, Product[]>>((acc, p) => {
                if (!acc[p.category]) acc[p.category] = [];
                acc[p.category].push(p);
                return acc;
              }, {})
            ).map(([category, items]) => {
              const maxSupply = Math.max(...items.map((p) => p.supplyVolume ?? 0), 1);
              return (
                <Fragment key={category}>
                  <tr className="border-t bg-slate-50/60">
                    <td colSpan={11} className="px-4 py-2 text-xs font-medium text-slate-500">
                      {categoryEmoji(category)} {category}{" "}
                      <span className="font-normal opacity-60">({items.length})</span>
                    </td>
                  </tr>
                  {items.map((p) => {
                    const supplyPct = p.supplyVolume
                      ? Math.round((p.supplyVolume / maxSupply) * 100)
                      : 0;
                    return (
                      <tr key={p.id} className="border-t hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{p.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="rounded-full border px-2 py-0.5 text-[11px] font-medium text-slate-600">
                            {p.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-medium tabular-nums text-slate-900 whitespace-nowrap">
                          {formatKES(p.retail)}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-500 whitespace-nowrap">
                          {formatKES(p.wholesale)}
                        </td>
                        <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{p.market}</td>
                        <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{p.county}</td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                          {formatDate(p.date)}
                        </td>
                      </tr>
                    );
                  })}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    )}

    {/* ── Pagination (bottom) ── */}
  </div>
)}
      </div>
    </div>
  );
}