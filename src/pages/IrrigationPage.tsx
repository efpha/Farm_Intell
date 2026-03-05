"use client";

import { useState } from "react";
import { API_BASE } from "../config.ts";
import {
  MapPin,
  Thermometer,
  Gauge,
  Mountain,
  Droplets,
  Leaf,
  CloudRain,
  Sun,
  ChevronRight,
  Loader2,
} from "lucide-react";

const IrrigationPage: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [moisture, setMoisture] = useState<number>(50);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [pressure, setPressure] = useState<number | null>(null);
  const [altitude, setAltitude] = useState<number | null>(null);
  const [rainExpected, setRainExpected] = useState<boolean | null>(null);
  const [advice, setAdvice] = useState<string>("");
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const handleSearch = async (query: string) => {
    setLocation(query);
    if (query.length > 2) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();
      setSearchResults(data);
    } else {
      setSearchResults([]);
    }
  };

  const selectLocation = (place: any) => {
    setLocation(place.display_name);
    setSearchResults([]);
  };

  const fetchWeatherData = async (): Promise<void> => {
    setLoadingWeather(true);
    try {
      const response = await fetch(`${API_BASE}/check_weather?location=${location}`);
      const data: { rain_expected: boolean; temperature: number; pressure: number; altitude: number } =
        await response.json();
      setRainExpected(data.rain_expected);
      setTemperature(data.temperature);
      setPressure(data.pressure);
      setAltitude(data.altitude);
      if (data.rain_expected) setAdvice("No irrigation needed due to expected rain.");
    } catch {
      setAdvice("Failed to fetch weather data.");
    } finally {
      setLoadingWeather(false);
    }
  };

  const getIrrigationAdvice = async (): Promise<void> => {
    if (rainExpected) return;
    setLoadingAdvice(true);
    setAdvice("");
    try {
      const response = await fetch(`${API_BASE}/predict/irrigation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ temperature, soil_moisture: moisture, pressure, altitude }),
      });
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const data: { prediction: string } = await response.json();
      setAdvice(data.prediction);
    } catch {
      setAdvice("Failed to get advice. Please try again.");
    } finally {
      setLoadingAdvice(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="relative h-56 w-full overflow-hidden bg-emerald-800 md:h-72">
        <img
          src="/irrigation.jpg"
          alt="Irrigation field"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0" />

        {/* Hero text */}
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="mb-3 flex items-center gap-2">
            <Leaf className="h-6 w-6 text-emerald-300" />
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
              FarmIntell
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white md:text-4xl">
            Smart Irrigation Advisor
          </h1>
          <p className="mt-2 max-w-md text-sm text-emerald-100 md:text-base">
            Real-time weather + soil insights to help you irrigate smarter, not harder.
          </p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">

        {/* Step 1 — Location */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
              1
            </span>
            <h2 className="text-base font-semibold text-slate-900">Select Your Location</h2>
          </div>

          {/* Search input */}
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              value={location}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Enter your farm location..."
              className="w-full rounded-xl border border-gray-300 bg-transparent py-3 pl-11 pr-4 text-sm text-black placeholder-gray-400 shadow-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          {/* Autocomplete dropdown */}
          {searchResults.length > 0 && (
            <ul className="mt-2 max-h-44 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-md">
              {searchResults.map((place, i) => (
                <li
                  key={i}
                  onClick={() => selectLocation(place)}
                  className="flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50"
                >
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}

          {/* Fetch Weather button */}
          <button
            onClick={fetchWeatherData}
            disabled={!location || loadingWeather}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 py-3 text-sm font-semibold text-white shadow-md transition hover:from-emerald-600 hover:to-emerald-800 disabled:opacity-50"
          >
            {loadingWeather ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Fetch Weather Data
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </button>

          {/* Weather stats */}
          {temperature !== null && (
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-slate-50 p-4 shadow-sm">
                <Thermometer className="mb-1 h-5 w-5 text-rose-500" />
                <p className="text-lg font-bold text-slate-900">{temperature}°C</p>
                <p className="text-xs text-slate-500">Temperature</p>
              </div>
              <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-slate-50 p-4 shadow-sm">
                <Gauge className="mb-1 h-5 w-5 text-indigo-500" />
                <p className="text-lg font-bold text-slate-900">{pressure}</p>
                <p className="text-xs text-slate-500">hPa Pressure</p>
              </div>
              <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-slate-50 p-4 shadow-sm">
                <Mountain className="mb-1 h-5 w-5 text-emerald-600" />
                <p className="text-lg font-bold text-slate-900">{altitude}m</p>
                <p className="text-xs text-slate-500">Altitude</p>
              </div>
            </div>
          )}
        </div>

        {/* Step 2 — Irrigation Recommendation */}
        {temperature !== null && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                2
              </span>
              <h2 className="text-base font-semibold text-slate-900">Irrigation Recommendation</h2>
            </div>

            {/* Rain expected banner */}
            {rainExpected ? (
              <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <CloudRain className="h-6 w-6 flex-shrink-0 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800">Rain expected today</p>
                  <p className="text-xs text-emerald-600">No irrigation needed — nature has it covered.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <Sun className="h-5 w-5 flex-shrink-0 text-amber-500" />
                  <p className="text-sm text-amber-700">No rain expected. Check soil moisture below.</p>
                </div>

                {/* Moisture slider section */}
                <div className="mb-5">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      Soil Moisture
                    </label>
                    <span className="rounded-lg bg-emerald-50 px-2.5 py-0.5 text-sm font-bold text-emerald-700">
                      {moisture}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={moisture}
                    onChange={(e) => setMoisture(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />

                  {/* Moisture bar */}
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300"
                      style={{ width: `${moisture}%` }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-slate-400">
                    <span>Dry</span>
                    <span>Optimal</span>
                    <span>Saturated</span>
                  </div>
                </div>

                <button
                  onClick={getIrrigationAdvice}
                  disabled={loadingAdvice}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 py-3 text-sm font-semibold text-white shadow-md transition hover:from-emerald-600 hover:to-emerald-800 disabled:opacity-50"
                >
                  {loadingAdvice ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Get Irrigation Advice
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </>
            )}

            {/* Advice result */}
            {advice && (
              <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  Recommendation
                </p>
                <p className="text-sm font-medium text-slate-800">{advice}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default IrrigationPage;