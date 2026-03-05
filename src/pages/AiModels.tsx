"use client";

import {
  Droplets,
  Leaf,
  Cpu,
  Eye,
  CalendarCheck,
  AlertTriangle,
  CheckCircle,
  Sparkles,
} from "lucide-react";

// ─── PageHero ─────────────────────────────────────────────────────────────────
// Reusable background hero banner.
// Props:
//   src       — path to your image, e.g. "/models-hero.jpg"
//   alt       — alt text for accessibility
//   title     — large heading text
//   subtitle  — smaller supporting text
//   badge     — small eyebrow label above the title (optional)
// To swap the image: change the `src` prop where <PageHero> is used below.

interface PageHeroProps {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  badge?: string;
  height?: string; // tailwind h-* class, default "h-60 md:h-80"
}

export const PageHero: React.FC<PageHeroProps> = ({
  src,
  alt,
  title,
  subtitle,
  badge,
  height = "h-60 md:h-80",
}) => (
  <div className={`relative w-full overflow-hidden rounded-none bg-emerald-900 ${height}`}>
    {/* 👇 Replace src prop to use your custom image */}
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover opacity-35"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 via-emerald-800/60 to-emerald-900/80" />

    <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
      {badge && (
        <div className="mb-3 flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-800/60 px-3 py-1">
          <Leaf className="h-3.5 w-3.5 text-emerald-300" />
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
            {badge}
          </span>
        </div>
      )}
      <h1 className="text-2xl font-bold text-white md:text-4xl">{title}</h1>
      {subtitle && (
        <p className="mt-2 max-w-xl text-sm text-emerald-100 md:text-base">{subtitle}</p>
      )}
    </div>
  </div>
);

// ─── Section Card ─────────────────────────────────────────────────────────────

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  badge: string;
  badgeColor: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ icon, title, badge, badgeColor, children }) => (
  <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
    {/* Card header */}
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 bg-slate-50 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
          {icon}
        </div>
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeColor}`}>
        {badge}
      </span>
    </div>

    <div className="px-6 py-5 space-y-5 text-sm text-slate-600">{children}</div>
  </div>
);

// ─── Info Row ─────────────────────────────────────────────────────────────────

const InfoBlock: React.FC<{
  icon: React.ReactNode;
  label: string;
  items: string[];
  variant?: "default" | "warning";
}> = ({ icon, label, items, variant = "default" }) => (
  <div>
    <div className={`mb-2 flex items-center gap-2 font-semibold ${variant === "warning" ? "text-red-600" : "text-slate-800"}`}>
      {icon}
      {label}
    </div>
    <ul className="space-y-1.5 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <CheckCircle className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${variant === "warning" ? "text-red-400" : "text-emerald-500"}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ModelsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      <PageHero
        src="/machine-learning.jpg"
        alt="Smart farming AI models"
        badge="FarmIntell"
        title="AI Models Overview"
        subtitle="Understand how our machine learning tools support smarter, more sustainable farming decisions."
      />

      <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">

        {/* Irrigation Model */}
        <SectionCard
          icon={<Droplets className="h-5 w-5" />}
          title="Irrigation Prediction Model"
          badge="Machine Learning"
          badgeColor="bg-blue-50 text-blue-700"
        >
          <p>
            Predicts whether irrigation is required based on real-time environmental data —
            helping farmers avoid overwatering and conserve resources.
          </p>

          <div className="h-px w-full bg-gray-100" />

          <div className="grid gap-5 sm:grid-cols-2">
            <InfoBlock
              icon={<Cpu className="h-4 w-4 text-slate-500" />}
              label="Required Inputs"
              items={[
                "Temperature (°C)",
                "Soil Moisture (%)",
                "Atmospheric Pressure (hPa)",
                "Altitude (m)",
                "Rain Forecast (auto-checked)",
              ]}
            />
            <InfoBlock
              icon={<CalendarCheck className="h-4 w-4 text-slate-500" />}
              label="When To Use"
              items={[
                "Daily irrigation planning",
                "Water conservation strategies",
                "Dry season management",
              ]}
            />
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-slate-600">
            <p className="font-medium text-slate-700 mb-1">⚙️ How It Works</p>
            The model analyses environmental conditions to determine if crops are likely
            to experience water stress. Rain forecasts are checked automatically — if rain is
            expected, irrigation is discouraged.
          </div>

          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="font-semibold text-red-600 mb-1 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" /> Limitations
            </p>
            <p className="text-red-700 text-sm">
              Accuracy depends on correct soil moisture input. Always validate predictions
              with on-ground observation.
            </p>
          </div>
        </SectionCard>

        {/* Disease Model */}
        <SectionCard
          icon={<Leaf className="h-5 w-5" />}
          title="Crop Disease Detection Model"
          badge="Deep Learning · Computer Vision"
          badgeColor="bg-emerald-50 text-emerald-700"
        >
          <p>
            Uses image recognition to detect crop diseases from leaf photos, helping farmers
            identify problems early and take corrective action before yield is affected.
          </p>

          <div className="h-px w-full bg-gray-100" />

          <div className="grid gap-5 sm:grid-cols-2">
            <InfoBlock
              icon={<Eye className="h-4 w-4 text-slate-500" />}
              label="Capture a Good Image"
              items={[
                "Use natural lighting outdoors",
                "Keep the camera steady — no blur",
                "Focus on the diseased area",
                "Plain background where possible",
              ]}
            />
            <InfoBlock
              icon={<CalendarCheck className="h-4 w-4 text-slate-500" />}
              label="When To Use"
              items={[
                "Unusual spots appear on leaves",
                "Crop growth seems abnormal",
                "Before applying pesticides",
              ]}
            />
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-slate-600">
            <p className="font-medium text-slate-700 mb-1">⚙️ How It Works</p>
            The deep learning model analyses visual patterns — discolouration, texture changes,
            and lesion shapes — to classify the disease type from a single leaf photo.
          </div>

          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="font-semibold text-red-600 mb-1 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" /> Limitations
            </p>
            <p className="text-red-700 text-sm">
              This provides a prediction, not a guaranteed diagnosis. For severe outbreaks,
              consult an agricultural extension officer.
            </p>
          </div>
        </SectionCard>

        {/* Vision Banner */}
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-6 text-center shadow-sm">
          <div className="mb-2 flex justify-center">
            <Sparkles className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Smart Farming Vision</h3>
          <p className="mt-1.5 text-sm text-slate-600 max-w-md mx-auto">
            These AI tools are built to assist decision-making, improve productivity, and
            promote sustainable agriculture practices across every farm size.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ModelsPage;