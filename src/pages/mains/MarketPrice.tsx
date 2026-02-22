// src/pages/mains/MarketPrice.tsx
import { useState, useMemo } from "react";
import { JSX } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  RefreshCw,
  MapPin,
  ShoppingBasket,
  Wheat,
  Leaf,
  Filter,
} from "lucide-react";

// Categories
const CATEGORIES = ["All", "Grains", "Vegetables", "Fruits", "Livestock", "Dairy"] as const;
type Category = typeof CATEGORIES[number];

// Product type
interface Product {
  id: number;
  name: string;
  category: Category | string;
  unit: string;
  price: number;
  prev: number;
  market: string;
  updated: string;
  icon: string;
}

// Product data
const PRODUCTS: Product[] = [
  // Grains
  { id: 1, name: "Maize (White)", category: "Grains", unit: "90kg bag", price: 3200, prev: 3000, market: "Wakulima Market", updated: "2h ago", icon: "🌽" },
  { id: 2, name: "Wheat", category: "Grains", unit: "90kg bag", price: 4800, prev: 4900, market: "Eldoret Grain Market", updated: "3h ago", icon: "🌾" },
  { id: 3, name: "Rice (Pishori)", category: "Grains", unit: "50kg bag", price: 6500, prev: 6500, market: "Mombasa Port Market", updated: "1h ago", icon: "🍚" },
  { id: 4, name: "Sorghum", category: "Grains", unit: "90kg bag", price: 2800, prev: 2600, market: "Kisumu Market", updated: "5h ago", icon: "🌾" },
  { id: 5, name: "Millet", category: "Grains", unit: "90kg bag", price: 3100, prev: 3300, market: "Nakuru Market", updated: "4h ago", icon: "🌾" },

  // Vegetables
  { id: 6, name: "Tomatoes", category: "Vegetables", unit: "per crate", price: 1200, prev: 900, market: "City Park Market", updated: "30m ago", icon: "🍅" },
  { id: 7, name: "Kale (Sukuma Wiki)", category: "Vegetables", unit: "per 70kg bag", price: 800, prev: 850, market: "Wakulima Market", updated: "1h ago", icon: "🥬" },
  { id: 8, name: "Onions", category: "Vegetables", unit: "per 50kg bag", price: 3500, prev: 3200, market: "Kongowea Market", updated: "2h ago", icon: "🧅" },
  { id: 9, name: "Cabbage", category: "Vegetables", unit: "per crate", price: 600, prev: 600, market: "Wakulima Market", updated: "3h ago", icon: "🥦" },
  { id: 10, name: "Capsicum", category: "Vegetables", unit: "per kg", price: 120, prev: 100, market: "City Park Market", updated: "1h ago", icon: "🫑" },

  // Fruits
  { id: 11, name: "Avocado (Hass)", category: "Fruits", unit: "per crate (60pcs)", price: 900, prev: 1100, market: "Limuru Market", updated: "2h ago", icon: "🥑" },
  { id: 12, name: "Mango (Apple)", category: "Fruits", unit: "per crate", price: 1500, prev: 1400, market: "Kibera Market", updated: "4h ago", icon: "🥭" },
  { id: 13, name: "Banana (Cavendish)", category: "Fruits", unit: "per bunch", price: 350, prev: 350, market: "Kisii Market", updated: "1h ago", icon: "🍌" },
  { id: 14, name: "Watermelon", category: "Fruits", unit: "per kg", price: 25, prev: 20, market: "Yatta Market", updated: "6h ago", icon: "🍉" },

  // Livestock
  { id: 15, name: "Beef Cattle (grade)", category: "Livestock", unit: "per head", price: 85000, prev: 82000, market: "Dagoretti Slaughterhouse", updated: "1d ago", icon: "🐄" },
  { id: 16, name: "Goat (local)", category: "Livestock", unit: "per head", price: 8500, prev: 9000, market: "Kamuthe Market", updated: "1d ago", icon: "🐐" },
  { id: 17, name: "Chicken (broiler)", category: "Livestock", unit: "per kg live weight", price: 380, prev: 360, market: "Nairobi Poultry Market", updated: "3h ago", icon: "🐔" },

  // Dairy
  { id: 18, name: "Fresh Milk", category: "Dairy", unit: "per litre", price: 55, prev: 50, market: "Kinangop Dairy", updated: "1h ago", icon: "🥛" },
  { id: 19, name: "Butter", category: "Dairy", unit: "per kg", price: 800, prev: 800, market: "Naivasha Market", updated: "2h ago", icon: "🧈" },
  { id: 20, name: "Eggs (tray)", category: "Dairy", unit: "per tray (30 eggs)", price: 480, prev: 510, market: "Ruiru Market", updated: "3h ago", icon: "🥚" },
];

// Utility: price trend
function getTrend(price: number, prev: number): "up" | "down" | "flat" {
  if (price > prev) return "up";
  if (price < prev) return "down";
  return "flat";
}

// Trend Badge component
function TrendBadge({ price, prev }: { price: number; prev: number }) {
  const trend = getTrend(price, prev);
  const pct = prev !== 0 ? Math.abs(((price - prev) / prev) * 100).toFixed(1) : "0.0";

  if (trend === "up") return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
      <TrendingUp className="h-3 w-3" />+{pct}%
    </span>
  );
  if (trend === "down") return (
    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-600">
      <TrendingDown className="h-3 w-3" />-{pct}%
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
      <Minus className="h-3 w-3" />0%
    </span>
  );
}

// Category Icon component
function CategoryIcon({ name }: { name: string }) {
  const map: Record<string, JSX.Element> = {
    Grains: <Wheat className="h-4 w-4" />,
    Vegetables: <Leaf className="h-4 w-4" />,
    Fruits: <ShoppingBasket className="h-4 w-4" />,
  };
  return map[name] || <ShoppingBasket className="h-4 w-4" />;
}

// Main component
export default function MarketPrice() {
  const [search, setSearch] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lastRefreshed] = useState(() => new Date().toLocaleTimeString());

  const stats = useMemo(() => {
    const rising = PRODUCTS.filter(p => getTrend(p.price, p.prev) === "up").length;
    const falling = PRODUCTS.filter(p => getTrend(p.price, p.prev) === "down").length;
    const stable = PRODUCTS.filter(p => getTrend(p.price, p.prev) === "flat").length;
    return { rising, falling, stable };
  }, []);

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.market.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  // Group by category for display
  const grouped: Record<string, Product[]> = useMemo(() => {
    if (activeCategory !== "All") return { [activeCategory]: filtered };
    return filtered.reduce((acc: Record<string, Product[]>, p) => {
      if (!acc[p.category]) acc[p.category] = [];
      acc[p.category].push(p);
      return acc;
    }, {});
  }, [filtered, activeCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">AgriMarket Prices</h1>
              <p className="mt-0.5 text-sm text-slate-500">
                Live commodity prices from major markets across Kenya
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <RefreshCw className="h-3.5 w-3.5" /> Last updated: {lastRefreshed}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total Products</div>
            <div className="mt-1 text-3xl font-bold text-slate-800">{PRODUCTS.length}</div>
          </div>
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Price Rising</div>
            <div className="mt-1 text-3xl font-bold text-emerald-600">{stats.rising}</div>
          </div>
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-xs font-medium text-rose-500 uppercase tracking-wide">Price Falling</div>
            <div className="mt-1 text-3xl font-bold text-rose-500">{stats.falling}</div>
          </div>
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Stable</div>
            <div className="mt-1 text-3xl font-bold text-slate-400">{stats.stable}</div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-xl border bg-slate-50 px-3 py-2">
            <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search product or market..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 rounded-xl px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeCategory === cat ? "bg-emerald-600 text-white" : "border text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Price Tables */}
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category}>
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-700">
              <CategoryIcon name={category} />
              {category}
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">{items.length}</span>
            </h2>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-2 border-b bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <div className="col-span-4">Product</div>
                <div className="col-span-2 text-right">Price (KES)</div>
                <div className="col-span-2 text-right hidden sm:block">Prev Price</div>
                <div className="col-span-2 text-center">Change</div>
                <div className="col-span-2 hidden md:block text-right">Updated</div>
              </div>

              {/* Rows */}
              <div className="divide-y">
                {items.map((product: Product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-12 gap-2 items-center px-5 py-3.5 text-sm hover:bg-slate-50 transition-colors"
                  >
                    <div className="col-span-4 flex items-center gap-2.5">
                      <span className="text-lg leading-none">{product.icon}</span>
                      <div className="min-w-0">
                        <div className="font-medium text-slate-800 truncate">{product.name}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1 truncate">
                          <MapPin className="h-2.5 w-2.5 flex-shrink-0" />
                          {product.market}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-right font-semibold text-slate-900">
                      {product.price.toLocaleString()}
                      <div className="text-xs font-normal text-slate-400">{product.unit}</div>
                    </div>
                    <div className="col-span-2 text-right text-slate-400 hidden sm:block">{product.prev.toLocaleString()}</div>
                    <div className="col-span-2 flex justify-center">
                      <TrendBadge price={product.price} prev={product.prev} />
                    </div>
                    <div className="col-span-2 text-right text-xs text-slate-400 hidden md:block">{product.updated}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-2xl border bg-white p-10 shadow-sm text-center">
            <ShoppingBasket className="mx-auto h-10 w-10 text-slate-300 mb-3" />
            <p className="text-slate-500 text-sm">No products found matching your search.</p>
          </div>
        )}

        <p className="text-center text-xs text-slate-400 pb-4">
          Prices are indicative wholesale rates collected from market reporters. Always confirm with local buyers before transacting.
        </p>
      </div>
    </div>
  );
}