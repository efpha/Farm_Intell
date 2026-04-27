"use client";

import React, { useState, useRef } from "react";
import { Upload, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_BASE } from "../config.ts";

const DetectPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    disease: string;
    confidence: number;
    cause: string;
    symptoms: string;
    treatment: string;
    healthy: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);

    try {
      const base64Data = selectedImage.split(",")[1];

      const response = await fetch(`${API_BASE}/predict/plant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: `data:image/jpeg;base64,${base64Data}`,
        }),
      });

      const data = await response.json();
      if (response.ok) setResult(data);
      else setResult(null);
    } catch (error) {
      console.error(error);
      setResult(null);
    }

    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm text-emerald-700">
            <Sparkles className="h-4 w-4" />
            AI Powered Detection
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-emerald-700">
            Plant Disease Detection
          </h1>
          <p className="mt-2 text-slate-600">
            Upload a plant image and let AI identify crop diseases
          </p>
        </div>

<div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">

  {/* Upload Section */}
  <Card className="rounded-2xl shadow border-0">
    <CardHeader className="pb-1">
      <CardTitle className="flex items-center gap-2 text-base">
        <Leaf className="h-4 w-4 text-emerald-600" />
        Upload Image
      </CardTitle>
      <p className="text-xs text-slate-500">
        Upload a plant image for AI detection
      </p>
    </CardHeader>

    <CardContent className="space-y-4">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
      />

      {/* Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) {
            handleImageChange({
              target: { files: [file] },
            } as unknown as React.ChangeEvent<HTMLInputElement>);
          }
        }}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition ${
          isDragging
            ? "border-emerald-600 bg-emerald-50"
            : "border-slate-300 hover:border-emerald-500"
        }`}
      >
        <Upload className="mx-auto h-6 w-6 text-slate-500" />
        <p className="mt-2 text-xs text-slate-600">
          Click or drag image
        </p>
      </div>

      {/* Preview */}
      {selectedImage && (
        <div className="relative rounded-xl overflow-hidden border">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-40 object-cover"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-1 right-1 bg-white/80 px-2 py-0.5 text-[10px] rounded"
          >
            ✕
          </button>
        </div>
      )}

      {/* Action */}
      <Button
        onClick={analyzeImage}
        disabled={isAnalyzing || !selectedImage}
        className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 h-9 text-xs"
      >
        {isAnalyzing ? "Analyzing..." : "Detect"}
      </Button>
    </CardContent>
  </Card>

  {/* Results Section */}
  <Card className="rounded-2xl shadow border-0">
    <CardHeader className="pb-1">
      <CardTitle className="text-base">Results</CardTitle>
      <p className="text-xs text-slate-500">
        AI insights
      </p>
    </CardHeader>

    <CardContent className="space-y-4">

      {/* Loading */}
      {isAnalyzing && (
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200" />
        </div>
      )}

      {/* Empty */}
      {!isAnalyzing && !result && (
        <div className="text-center text-slate-400 py-6 text-xs">
          No results yet
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">

          <h2 className="text-lg font-semibold text-emerald-700">
            {result.disease}
          </h2>

          {result.healthy && (
            <div className="rounded-lg bg-emerald-50 px-3 py-2 text-emerald-700 text-xs">
              ✔ {result.healthy}
            </div>
          )}

          <div className="space-y-2 text-xs">
            {result.cause && (
              <p><span className="font-medium text-slate-800">Cause:</span> {result.cause}</p>
            )}
            {result.symptoms && (
              <p><span className="font-medium text-slate-800">Symptoms:</span> {result.symptoms}</p>
            )}
            {result.treatment && (
              <p><span className="font-medium text-slate-800">Treatment:</span> {result.treatment}</p>
            )}
          </div>

        </div>
      )}
    </CardContent>
  </Card>
</div>
      </div>
    </div>
  );
};

export default DetectPage;