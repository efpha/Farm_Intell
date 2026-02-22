"use client";

import React from "react";
import { Leaf, CloudRain, Info, Wheat, FlaskConical, CheckCircle2, Cpu } from "lucide-react";

const DISEASE_DATA = [
  {
    crop: "Pepper Bell",
    icon: "🫑",
    diseases: ["Bacterial Spot", "Healthy"],
  },
  {
    crop: "Potato",
    icon: "🥔",
    diseases: ["Early Blight", "Late Blight", "Healthy"],
  },
  {
    crop: "Tomato",
    icon: "🍅",
    diseases: [
      "Bacterial Spot",
      "Early Blight",
      "Late Blight",
      "Leaf Mold",
      "Septoria Leaf Spot",
      "Spider Mites (Two-Spotted Spider Mite)",
      "Target Spot",
      "Yellow Leaf Curl Virus",
      "Mosaic Virus",
      "Healthy",
    ],
  },
];

function SectionHeader({ icon: Icon, title, iconColor = "text-emerald-600" }: { icon: React.ElementType; title: string; iconColor?: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className={`h-5 w-5 ${iconColor}`} />
      <h2 className="text-base font-semibold text-slate-700">{title}</h2>
    </div>
  );
}

function ModelBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
      <Cpu className="h-3 w-3" />
      {label}
    </span>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-900">About FarmIntell</h1>
            <p className="text-sm text-slate-500">
              AI-powered tools for smarter farming — disease detection and irrigation scheduling.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">

        {/* Overview Card */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <SectionHeader icon={Info} title="Platform Overview" />
          <p className="text-sm text-slate-600 leading-relaxed">
            FarmIntell is an AI-powered platform designed to assist farmers with smart plant disease
            detection and efficient irrigation scheduling. Our goal is to enhance agricultural
            productivity through technology-driven insights tailored to real field conditions.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Crops Supported</div>
            <div className="mt-1 text-3xl font-bold text-slate-800">3</div>
          </div>
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Disease Classes</div>
            <div className="mt-1 text-3xl font-bold text-emerald-600">15</div>
          </div>
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-xs font-medium text-blue-500 uppercase tracking-wide">AI Models</div>
            <div className="mt-1 text-3xl font-bold text-blue-500">2</div>
          </div>
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Features</div>
            <div className="mt-1 text-3xl font-bold text-slate-400">2</div>
          </div>
        </div>

        {/* Plant Disease Detection */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-700">
            <Leaf className="h-4 w-4 text-emerald-600" />
            Plant Disease Detection
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
              {DISEASE_DATA.length} crops
            </span>
          </h2>

          <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 border-b bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <div className="col-span-3">Crop</div>
              <div className="col-span-9">Supported Conditions</div>
            </div>

            {/* Rows */}
            <div className="divide-y">
              {DISEASE_DATA.map((item) => (
                <div
                  key={item.crop}
                  className="grid grid-cols-12 gap-2 items-start px-5 py-4 text-sm hover:bg-slate-50 transition-colors"
                >
                  <div className="col-span-3 flex items-center gap-2.5 pt-0.5">
                    <span className="text-lg leading-none">{item.icon}</span>
                    <span className="font-medium text-slate-800">{item.crop}</span>
                  </div>
                  <div className="col-span-9 flex flex-wrap gap-1.5">
                    {item.diseases.map((disease) => (
                      <span
                        key={disease}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          disease === "Healthy"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {disease === "Healthy" && <CheckCircle2 className="h-3 w-3" />}
                        {disease}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with model info */}
            <div className="border-t bg-slate-50 px-5 py-3 flex items-center gap-3">
              <span className="text-xs text-slate-500">Detection model:</span>
              <ModelBadge label="MobileNet" />
            </div>
          </div>
        </section>

        {/* Smart Irrigation */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-700">
            <CloudRain className="h-4 w-4 text-blue-500" />
            Smart Irrigation Scheduling
          </h2>

          <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 space-y-3">
              <p className="text-sm text-slate-600 leading-relaxed">
                Optimize water usage based on weather conditions and soil moisture levels. This system
                provides general irrigation recommendations and does not suggest crops based on specific
                plant types.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Inputs Used</div>
                  <p className="text-sm text-blue-800">Soil moisture levels &amp; weather forecast data</p>
                </div>
                <div className="rounded-xl bg-slate-50 border px-4 py-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Output</div>
                  <p className="text-sm text-slate-700">Irrigation need prediction for efficient water management</p>
                </div>
              </div>
            </div>
            <div className="border-t bg-slate-50 px-5 py-3 flex items-center gap-3">
              <span className="text-xs text-slate-500">Scheduling model:</span>
              <ModelBadge label="Logistic Regression" />
            </div>
          </div>
        </section>

        <p className="text-center text-xs text-slate-400 pb-4">
          FarmIntell recommendations are AI-generated insights. Always verify with a local agronomist before taking action.
        </p>
      </div>
    </div>
  );
}