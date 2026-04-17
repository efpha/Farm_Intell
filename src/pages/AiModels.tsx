"use client";

import { useState } from "react";
import {
  Leaf,
  Cpu,
  Eye,
  CalendarCheck,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  XCircle,
  ChevronRight,
  Activity,
  Layers,
  Zap,
  ScanLine,
  FlaskConical,
  ShieldAlert,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = "overview" | "specs" | "performance" | "limitations";

// ─── PageHero ─────────────────────────────────────────────────────────────────

interface PageHeroProps {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  badge?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  src,
  alt,
  title,
  subtitle,
  badge,
}) => (
  <div className="relative w-full overflow-hidden h-56 md:h-72">
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity"
    />
    {/* Subtle grid overlay */}
    <div className="absolute inset-0" />

    <div className="relative flex h-full flex-col justify-end px-6 pb-8 md:px-10">
      {badge && (
        <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30  px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-400">
            {badge}
          </span>
        </div>
      )}
      <h1 className="font-serif text-3xl font-normal tracking-tight text-white md:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-stone-400">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

// ─── Tab Bar ──────────────────────────────────────────────────────────────────

interface TabBarProps {
  active: TabId;
  onChange: (id: TabId) => void;
}

const tabs: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "specs", label: "Specifications" },
  { id: "performance", label: "Performance" },
  { id: "limitations", label: "Limitations" },
];

const TabBar: React.FC<TabBarProps> = ({ active, onChange }) => (
  <div className="flex gap-1 border-b border-stone-800">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`relative px-4 py-3 text-xs font-medium uppercase tracking-wider transition-colors ${
          active === tab.id
            ? "text-emerald-400"
            : "text-stone-500 hover:text-stone-300"
        }`}
      >
        {tab.label}
        {active === tab.id && (
          <span className="absolute bottom-0 left-0 right-0 h-px bg-emerald-400" />
        )}
      </button>
    ))}
  </div>
);

// ─── Accuracy Bar ─────────────────────────────────────────────────────────────

const AccuracyBar: React.FC<{ label: string; pct: number }> = ({
  label,
  pct,
}) => (
  <div className="flex items-center gap-3">
    <span className="w-28 flex-shrink-0 truncate text-xs text-stone-400">
      {label}
    </span>
    <div className="flex-1 h-1.5 rounded-full bg-stone-800">
      <div
        className="h-full rounded-full bg-emerald-500 transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
    <span className="w-9 text-right text-xs font-medium text-stone-300">
      {pct}%
    </span>
  </div>
);

// ─── Checklist Item ───────────────────────────────────────────────────────────

const CheckItem: React.FC<{
  children: React.ReactNode;
  variant?: "ok" | "warn" | "bad";
}> = ({ children, variant = "ok" }) => {
  const iconMap = {
    ok: <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />,
    warn: <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-400" />,
    bad: <XCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-red-500" />,
  };
  return (
    <li className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-400">
      {iconMap[variant]}
      <span>{children}</span>
    </li>
  );
};

// ─── Spec Cell ────────────────────────────────────────────────────────────────

const SpecCell: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="border-b border-r border-stone-800 p-4 last:border-r-0">
    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-stone-600">
      {label}
    </p>
    <p className="text-sm font-medium text-stone-200">{value}</p>
  </div>
);

// ─── Pipeline Step ────────────────────────────────────────────────────────────

const PipeStep: React.FC<{
  icon: React.ReactNode;
  label: string;
  sub: string;
  last?: boolean;
}> = ({ icon, label, sub, last }) => (
  <div className="flex items-start gap-3">
    <div className="flex flex-col items-center">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-stone-700 bg-stone-800 text-emerald-400">
        {icon}
      </div>
      {!last && <div className="mt-1 h-8 w-px bg-stone-800" />}
    </div>
    <div className="pt-1.5 pb-6">
      <p className="text-xs font-semibold text-stone-200">{label}</p>
      <p className="mt-0.5 text-xs text-stone-500">{sub}</p>
    </div>
  </div>
);

// ─── Timeline Item ────────────────────────────────────────────────────────────

const TimelineItem: React.FC<{
  title: string;
  desc: string;
  last?: boolean;
}> = ({ title, desc, last }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500 mt-1.5" />
      {!last && <div className="mt-2 flex-1 w-px bg-stone-800" />}
    </div>
    <div className={`${last ? "pb-0" : "pb-6"}`}>
      <p className="text-sm font-medium text-stone-200">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-stone-500">{desc}</p>
    </div>
  </div>
);

// ─── Section Label ────────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-600">
    {children}
  </p>
);

// ─── Card Shell ───────────────────────────────────────────────────────────────

const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  noPad?: boolean;
}> = ({ children, className = "", noPad }) => (
  <div
    className={`rounded-2xl border border-stone-800 bg-stone-900 overflow-hidden ${
      noPad ? "" : "p-6"
    } ${className}`}
  >
    {children}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const ModelsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-100">
      {/* Hero */}
      <PageHero
        src="/homebg.jpeg"
        alt="Smart farming AI"
        badge="FarmIntell · AI Infrastructure"
        title="Machine Learning Models"
        subtitle="Technical documentation for the machine learning systems powering FarmIntell's crop health platform."
      />

      {/* Body */}
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 md:px-6">

        {/* ── Main model card ──────────────────────────────────────────────── */}
        <section>
          <SectionLabel>Core model</SectionLabel>
          
          <Card noPad>
            {/* Card header */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-800 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                  <Leaf className="h-4.5 w-4.5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-stone-100">
                    Crop Disease Detection
                  </h2>
                  <p className="mt-0.5 text-xs text-stone-500">
                    Transfer learning · Image classification
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
                  Deep learning
                </span>
                <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-sky-400">
                  CNN
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6">
              <TabBar active={activeTab} onChange={setActiveTab} />
            </div>

            {/* Tab content */}
            <div className="px-6 py-6">

              {/* ── Overview ── */}
              {activeTab === "overview" && (
                <div className="space-y-5">
                  <p className="text-sm leading-7 text-stone-400">
                    The disease detection system applies transfer learning on a
                    MobileNetV2 backbone pre-trained on ImageNet. Rather than
                    learning low-level visual primitives from scratch, the model
                    reuses established feature hierarchies — edges, textures,
                    color gradients — and adapts them to leaf pathology through
                    fine-tuning on agricultural datasets.
                  </p>
                  <p className="text-sm leading-7 text-stone-400">
                    A custom classification head maps extracted features to
                    specific disease classes via softmax probability. The
                    architecture was chosen for its balance of accuracy and
                    inference speed, making it practical for real-time analysis
                    on mobile devices with limited compute budgets.
                  </p>
                  <div className="rounded-xl border border-stone-800 bg-stone-800/50 p-4">
                    <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-stone-300">
                      <FlaskConical className="h-3.5 w-3.5 text-emerald-400" />
                      Why MobileNetV2?
                    </p>
                    <p className="text-xs leading-6 text-stone-500">
                      Its inverted residual structure and linear bottlenecks
                      significantly reduce computational cost while maintaining
                      feature expressiveness — making it a natural fit for edge
                      deployment without sacrificing classification accuracy.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { icon: <Zap className="h-4 w-4" />, label: "Lightweight", sub: "Edge-ready" },
                      { icon: <Layers className="h-4 w-4" />, label: "Transfer", sub: "ImageNet pretrain" },
                      { icon: <Activity className="h-4 w-4" />, label: "Real-time", sub: "Low latency" },
                      { icon: <ScanLine className="h-4 w-4" />, label: "Multi-class", sub: "Softmax output" },
                    ].map((f) => (
                      <div
                        key={f.label}
                        className="flex flex-col gap-2 rounded-xl border border-stone-800 bg-stone-800/40 p-3"
                      >
                        <span className="text-emerald-400">{f.icon}</span>
                        <div>
                          <p className="text-xs font-medium text-stone-200">
                            {f.label}
                          </p>
                          <p className="text-[11px] text-stone-600">{f.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Specs ── */}
              {activeTab === "specs" && (
                <div>
                  <div className="grid grid-cols-2 rounded-xl border border-stone-800 overflow-hidden sm:grid-cols-3">
                    <SpecCell label="Base model" value="MobileNetV2 1.0_160" />
                    <SpecCell label="Pretrain dataset" value="ImageNet (1.2M)" />
                    <SpecCell label="Input shape" value="160 × 160 × 3 (RGB)" />
                    <SpecCell label="Classifier" value="Dense + Softmax" />
                    <SpecCell label="Technique" value="Transfer learning + fine-tuning" />
                    <SpecCell label="Deployment" value="Mobile · Web · Edge" />
                  </div>
                  <div className="mt-5 rounded-xl border border-sky-900/50 bg-sky-950/30 p-4">
                    <p className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-sky-400">
                      <Cpu className="h-3.5 w-3.5" />
                      Processing pipeline
                    </p>
                    <p className="text-xs leading-6 text-stone-500">
                      Input images are resized to 160×160 and normalised to
                      [−1, 1] before being passed to the MobileNetV2 backbone.
                      The final feature tensor is global-average-pooled and fed
                      into a dense classification layer with softmax activation,
                      returning a probability distribution over disease classes.
                    </p>
                  </div>
                </div>
              )}

              {/* ── Performance ── */}
              {activeTab === "performance" && (
                <div className="space-y-4">
                  <p className="text-xs text-stone-600">
                    Per-class validation accuracy on held-out test set
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: "Healthy leaf", pct: 97 },
                      { label: "Early blight", pct: 94 },
                      { label: "Late blight", pct: 91 },
                      { label: "Leaf mold", pct: 88 },
                      { label: "Bacterial spot", pct: 85 },
                      { label: "Mosaic virus", pct: 82 },
                    ].map((d) => (
                      <AccuracyBar key={d.label} label={d.label} pct={d.pct} />
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 border-t border-stone-800 pt-4">
                    {[
                      { label: "Top-1 accuracy", value: "89.5%" },
                      { label: "F1 (macro)", value: "0.88" },
                      { label: "Inference time", value: "~38 ms" },
                      { label: "Model size", value: "14 MB" },
                    ].map((s) => (
                      <div key={s.label} className="flex flex-col gap-0.5">
                        <span className="text-[10px] uppercase tracking-wider text-stone-600">
                          {s.label}
                        </span>
                        <span className="text-sm font-semibold text-emerald-400">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Limitations ── */}
              {activeTab === "limitations" && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-xl border border-amber-900/40 bg-amber-950/20 p-4">
                    <ShieldAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
                    <div>
                      <p className="text-xs font-semibold text-amber-400">
                        Decision-support only
                      </p>
                      <p className="mt-1 text-xs leading-6 text-stone-500">
                        Model output is probabilistic and must not substitute
                        for qualified agronomist review. Always validate
                        high-confidence predictions in the field.
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <CheckItem variant="warn">
                      Performance degrades significantly under poor lighting,
                      heavy shadow, or motion blur.
                    </CheckItem>
                    <CheckItem variant="warn">
                      Diseases absent from the training set produce unreliable
                      or misleading outputs.
                    </CheckItem>
                    <CheckItem variant="warn">
                      Mixed infection scenarios (multiple co-occurring diseases)
                      are not yet supported.
                    </CheckItem>
                    <CheckItem variant="warn">
                      Nutrient deficiencies may visually mimic disease symptoms,
                      causing false positives.
                    </CheckItem>
                    <CheckItem variant="warn">
                      Model confidence scores do not directly translate to
                      agronomic severity.
                    </CheckItem>
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </section>

        {/* ── Inference pipeline ───────────────────────────────────────────── */}
        <section>
          <SectionLabel>Inference pipeline</SectionLabel>
          <Card>
            <div className="grid gap-0 sm:grid-cols-2">
              <div className="space-y-0">
                <PipeStep
                  icon={<Eye className="h-4 w-4" />}
                  label="Image capture"
                  sub="Smartphone or field camera, min 720p"
                />
                <PipeStep
                  icon={<ScanLine className="h-4 w-4" />}
                  label="Resize & normalise"
                  sub="Downscaled to 160×160, values mapped to [−1, 1]"
                />
                <PipeStep
                  icon={<Layers className="h-4 w-4" />}
                  label="Feature extraction"
                  sub="MobileNetV2 backbone — edges → textures → patterns"
                />
              </div>
              <div className="space-y-0 sm:border-l sm:border-stone-800 sm:pl-6">
                <PipeStep
                  icon={<Activity className="h-4 w-4" />}
                  label="Global average pooling"
                  sub="Spatial feature map collapsed to a feature vector"
                />
                <PipeStep
                  icon={<Cpu className="h-4 w-4" />}
                  label="Dense classification head"
                  sub="Custom fully-connected layers trained on crop data"
                />
                <PipeStep
                  icon={<Sparkles className="h-4 w-4" />}
                  label="Softmax output"
                  sub="Probability distribution across disease classes"
                  last
                />
              </div>
            </div>
          </Card>
        </section>

        {/* ── Capture guidelines ───────────────────────────────────────────── */}
        <section>
          <SectionLabel>Image capture guidelines</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                  Best practices
                </h3>
              </div>
              <ul className="space-y-3">
                <CheckItem>Natural daylight, no artificial flash</CheckItem>
                <CheckItem>Leaf fully in frame and centered</CheckItem>
                <CheckItem>Consistent background (soil or hand)</CheckItem>
                <CheckItem>Focus on the infected region where possible</CheckItem>
                <CheckItem>Minimum 720p resolution</CheckItem>
              </ul>
            </Card>
            <Card>
              <div className="mb-4 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                  Avoid these
                </h3>
              </div>
              <ul className="space-y-3">
                <CheckItem variant="bad">
                  Motion blur or out-of-focus shots
                </CheckItem>
                <CheckItem variant="bad">
                  Heavy shadows across the leaf surface
                </CheckItem>
                <CheckItem variant="bad">
                  Multiple overlapping leaves in one shot
                </CheckItem>
                <CheckItem variant="bad">
                  Post-rain wet or reflective leaf surfaces
                </CheckItem>
                <CheckItem variant="bad">
                  Heavily cropped or partial leaf images
                </CheckItem>
              </ul>
            </Card>
          </div>
        </section>

        {/* ── When to scan ─────────────────────────────────────────────────── */}
        <section>
          <SectionLabel>When to run a scan</SectionLabel>
          <Card>
            <TimelineItem
              title="Visual symptoms appear"
              desc="Spots, discoloration, unusual leaf curling, or wilting are first observed. The earliest and most effective intervention point."
            />
            <TimelineItem
              title="Before applying any treatment"
              desc="Use the diagnosis to confirm the disease type before purchasing or applying pesticides or fungicides, reducing unnecessary spend."
            />
            <TimelineItem
              title="Abnormal growth patterns"
              desc="Stunted plants, irregular fruit development, or reduced yield that may indicate a systemic or soil-borne disease."
            />
            <TimelineItem
              title="Routine weekly monitoring"
              desc="Proactive scanning during high-risk seasons catches infections before visible symptoms fully develop."
              last
            />
          </Card>
        </section>

        {/* ── Footer notice ────────────────────────────────────────────────── */}
        <div className="flex items-start gap-4 rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
            <CalendarCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-200">
              AI-assisted, agronomist-confirmed
            </p>
            <p className="mt-1 text-xs leading-6 text-stone-500">
              FarmIntell models are designed to augment — not replace — expert
              judgment. All high-stakes treatment decisions should be reviewed
              by a qualified agronomist before action is taken.
            </p>
          </div>
          <ChevronRight className="ml-auto h-4 w-4 flex-shrink-0 text-stone-700 mt-0.5" />
        </div>

      </div>
    </div>
  );
};

export default ModelsPage;