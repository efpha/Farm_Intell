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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 py-16">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm text-emerald-700">
            <Sparkles className="h-4 w-4" />
            AI Powered Detection
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            Plant Disease Detection
          </h1>
          <p className="mt-2 text-slate-600">
            Upload a plant image and let AI identify potential diseases instantly.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Upload Section */}
          <Card className="rounded-3xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Leaf className="h-5 w-5 text-emerald-600" />
                Upload Image
              </CardTitle>
            </CardHeader>

            <CardContent>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
              />

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
                className={`transition-all cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center ${
                  isDragging
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-slate-300 hover:border-emerald-500"
                }`}
              >
                <Upload className="mx-auto h-10 w-10 text-slate-500" />
                <p className="mt-4 text-sm text-slate-600">
                  Click or drag & drop an image
                </p>
              </div>

              {selectedImage && (
                <div className="mt-6 rounded-2xl overflow-hidden border shadow-sm">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              <Button
                onClick={analyzeImage}
                disabled={isAnalyzing || !selectedImage}
                className="mt-6 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700"
              >
                {isAnalyzing ? "Analyzing with AI..." : "Detect Disease"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="rounded-3xl shadow-lg border-0">
            <CardHeader>
              <CardTitle>Detection Results</CardTitle>
            </CardHeader>

            <CardContent>
              {isAnalyzing && (
                <div className="space-y-4">
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                </div>
              )}

              {!isAnalyzing && !result && (
                <div className="text-center text-slate-500 py-10">
                  Upload an image to view AI analysis results.
                </div>
              )}

              {result && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-700">
                      {result.disease}
                    </h2>

                    {/* Confidence Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>Confidence</span>
                        <span>{result.confidence.toFixed(1)}%</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-emerald-600 transition-all"
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {result.healthy && (
                    <div className="rounded-xl bg-emerald-50 p-4 text-emerald-700 font-medium">
                      ✔ {result.healthy}
                    </div>
                  )}

                  {result.cause && (
                    <div>
                      <h4 className="font-semibold text-slate-800">Cause</h4>
                      <p className="text-slate-600 text-sm">
                        {result.cause}
                      </p>
                    </div>
                  )}

                  {result.symptoms && (
                    <div>
                      <h4 className="font-semibold text-slate-800">Symptoms</h4>
                      <p className="text-slate-600 text-sm">
                        {result.symptoms}
                      </p>
                    </div>
                  )}

                  {result.treatment && (
                    <div>
                      <h4 className="font-semibold text-slate-800">Treatment</h4>
                      <p className="text-slate-600 text-sm">
                        {result.treatment}
                      </p>
                    </div>
                  )}
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