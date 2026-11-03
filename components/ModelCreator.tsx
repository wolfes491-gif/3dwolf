"use client";

import React, { useState } from "react";
import { WolfViewer3D } from "@/components/WolfViewer3D";

// Types for 3D Library items
interface ModelItem {
  id: string;
  name: string;
  rating: string;
  polys: string;
  format: string;
  thumbnailColor: string;
  wireColor: string;
  ambientHue: number;
}

const MODEL_PRESETS: ModelItem[] = [
  {
    id: "m-01",
    name: "Cyber Wolf Alpha",
    rating: "9.8/10",
    polys: "142k polys",
    format: "GLTF / USDZ",
    thumbnailColor: "from-cyan-400 to-blue-600",
    wireColor: "#22d3ee",
    ambientHue: 190,
  },
  {
    id: "m-02",
    name: "Mecha Direwolf Mk.IV",
    rating: "9.5/10",
    polys: "98k polys",
    format: "OBJ / FBX",
    thumbnailColor: "from-amber-400 to-orange-600",
    wireColor: "#d4af37",
    ambientHue: 38,
  },
  {
    id: "m-03",
    name: "Low-Poly Sentinel",
    rating: "8.9/10",
    polys: "24k polys",
    format: "GLTF / BLEND",
    thumbnailColor: "from-emerald-400 to-teal-600",
    wireColor: "#10b981",
    ambientHue: 160,
  },
  {
    id: "m-04",
    name: "Bioluminescent Apex",
    rating: "9.2/10",
    polys: "180k polys",
    format: "USDZ / C4D",
    thumbnailColor: "from-violet-400 to-purple-600",
    wireColor: "#a855f7",
    ambientHue: 275,
  },
  {
    id: "m-05",
    name: "Chrome Howler v3",
    rating: "9.7/10",
    polys: "210k polys",
    format: "GLTF / FBX",
    thumbnailColor: "from-slate-200 to-slate-500",
    wireColor: "#e2e8f0",
    ambientHue: 210,
  },
];

export function ModelCreator() {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<"models" | "prompts">("models");
  const [selectedModel, setSelectedModel] = useState<ModelItem>(MODEL_PRESETS[0]);
  const [activePage, setActivePage] = useState<number>(0);

  // Left Widget 1: Ambience (Intensity Dial)
  const [intensity, setIntensity] = useState<number>(70);
  const [ambienceStep, setAmbienceStep] = useState<number>(3); // 1, 2, 3, 4

  // Left Widget 2: Temperature / Guidance Dial
  const [temperature, setTemperature] = useState<number>(24);
  const [activeMode, setActiveMode] = useState<"cold" | "wind" | "sleep">("cold");

  // Rotation Animation State (controlled via playback widget)
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Update intensity when step changes
  const handleStepClick = (step: number) => {
    setAmbienceStep(step);
    const stepMap: Record<number, number> = { 1: 25, 2: 50, 3: 70, 4: 95 };
    setIntensity(stepMap[step] || 70);
  };

  return (
    <section
      id="creator"
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-[#111216] text-white overflow-hidden border-t border-white/[0.06]"
    >
      {/* Subtle Dark Luxury Ambiance Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-cyan-900/[0.04] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-[500px] h-[350px] bg-amber-900/[0.03] blur-[140px] rounded-full pointer-events-none" />

      {/* Main Console Frame */}
      <div className="relative max-w-7xl mx-auto rounded-[32px] sm:rounded-[42px] bg-[#16181e]/85 backdrop-blur-2xl border border-white/[0.09] shadow-[0_30px_90px_rgba(0,0,0,0.7)] p-4 sm:p-6 lg:p-7">
        
        {/* Top Header Row: Center Capsule Pill & Right Action Bar */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 mb-5 sm:mb-6 z-20">
          
          {/* Left Title */}
          <div className="hidden lg:flex items-center gap-2.5 w-[280px]">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            <span className="font-display font-semibold text-xs tracking-[0.2em] uppercase text-slate-300">
              3D MODEL CREATOR
            </span>
          </div>

          {/* Top Center Capsule: 5 Navigation Icons (Matches Reference Exactly) */}
          <div className="inline-flex items-center gap-3 sm:gap-4 px-5 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
            {/* Home Icon */}
            <button
              type="button"
              className="text-white hover:text-cyan-400 transition-colors p-1"
              aria-label="Home"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>

            {/* Bell / Notifications Icon */}
            <button
              type="button"
              className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
              aria-label="Notifications"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* User Profile Icon */}
            <button
              type="button"
              className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
              aria-label="User Profile"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Clock / History Icon */}
            <button
              type="button"
              className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
              aria-label="History"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Grid / Layout Menu Icon */}
            <button
              type="button"
              className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
              aria-label="Layout Grid"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>

          {/* Top Right: Search Pill, Message Box, Avatar (Matches Reference Exactly) */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            {/* Search Pill */}
            <div className="relative flex-1 md:flex-initial">
              <input
                type="text"
                placeholder="Search..."
                className="w-full md:w-36 lg:w-44 pl-3.5 pr-8 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 transition-all backdrop-blur-md"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Inbox / Notification Button */}
            <button
              type="button"
              className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white hover:border-white/25 transition-all backdrop-blur-md"
              aria-label="Messages"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>

            {/* Profile Avatar with Status Dot */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan-400/60 bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white text-[11px] font-bold shadow-[0_0_12px_rgba(34,211,238,0.4)]">
              <span>W4</span>
              <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-black shadow-[0_0_6px_rgba(52,211,153,1)]" />
            </div>
          </div>
        </div>

        {/* 3-Column Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* ========================================================
              LEFT COLUMN: 2 Stacked Frosted Cards (Ambience & Temperature)
             ======================================================== */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            
            {/* Widget 1: Customizable Ambience (Circular Arc Slider) */}
            <div className="flex-1 rounded-[28px] bg-white/[0.035] border border-white/[0.08] p-5 backdrop-blur-xl flex flex-col items-center justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
              <div className="w-full text-left">
                <h3 className="text-xs font-semibold tracking-wide text-slate-200">
                  Customizable Ambience
                </h3>
              </div>

              {/* Semi-Circular Dial with Intensity */}
              <div className="relative w-40 h-36 my-2 flex items-center justify-center select-none">
                {/* SVG Gauge Track */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="6"
                    strokeDasharray="188.5"
                    strokeDashoffset="62.8"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#ambience-gradient)"
                    strokeWidth="6"
                    strokeDasharray="188.5"
                    strokeDashoffset={188.5 - (intensity / 100) * 125.7}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <defs>
                    <linearGradient id="ambience-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Left & Right Lightbulb endpoint icons */}
                <span className="absolute left-1 bottom-4 text-slate-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </span>
                <span className="absolute right-1 bottom-4 text-amber-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>

                {/* Center Value Disc */}
                <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-gradient-to-b from-white/[0.09] to-black/60 border border-white/[0.14] flex flex-col items-center justify-center shadow-inner">
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono">
                    Intensity
                  </span>
                  <span className="text-2xl font-bold font-display text-white tracking-tight mt-0.5">
                    {intensity}%
                  </span>
                </div>
              </div>

              {/* Step Buttons: (1) (2) (3) (4) (Matches Reference Exactly) */}
              <div className="flex items-center justify-center gap-2.5 my-1.5 w-full">
                {[1, 2, 3, 4].map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => handleStepClick(step)}
                    className={`w-6 h-6 rounded-full text-[11px] font-semibold transition-all flex items-center justify-center cursor-pointer ${
                      ambienceStep === step
                        ? "bg-white/[0.18] text-white border border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.25)]"
                        : "bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.08]"
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>

              {/* Footer Link */}
              <div className="mt-2 text-center">
                <button
                  type="button"
                  className="text-[10px] text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Learn More About This Feature</span>
                  <span>&rsaquo;</span>
                </button>
              </div>
            </div>

            {/* Widget 2: Set Temperature (Circular Thermostat Dial & Mode Pills) */}
            <div className="flex-1 rounded-[28px] bg-white/[0.035] border border-white/[0.08] p-5 backdrop-blur-xl flex flex-col items-center justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
              <div className="w-full text-left">
                <h3 className="text-xs font-semibold tracking-wide text-slate-200">
                  Set Temperature
                </h3>
              </div>

              {/* Circular Thermostat Dial with Tick Marks & Center Value */}
              <div className="relative w-36 h-36 my-2 flex items-center justify-center select-none">
                <div className="absolute inset-0 rounded-full border border-white/[0.08] flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-dashed border-white/20" />
                </div>

                {/* Outer Indicator Dot on Rim */}
                <div
                  className="absolute w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)] transition-all duration-300"
                  style={{
                    transform: `rotate(${((temperature - 16) / 16) * 220 - 110}deg) translate(58px)`,
                  }}
                />

                {/* Inner White Thermostat Disc */}
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-b from-slate-100 to-slate-200 shadow-[0_8px_25px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center border border-white">
                  <span className="text-2xl font-bold font-display text-slate-900 tracking-tight">
                    {temperature}&deg;C
                  </span>
                </div>
              </div>

              {/* 3 Mode Pill Buttons: [Cold] [Wind] [Sleep] */}
              <div className="grid grid-cols-3 gap-2 w-full mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveMode("cold");
                    setTemperature(20);
                  }}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl border text-[10px] transition-all cursor-pointer ${
                    activeMode === "cold"
                      ? "bg-white/[0.14] border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                      : "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white"
                  }`}
                >
                  <svg className="w-3.5 h-3.5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v18m9-9H3m15.364-6.364l-12.728 12.728m0-12.728l12.728 12.728" />
                  </svg>
                  <span className="font-medium">Cold</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveMode("wind");
                    setTemperature(24);
                  }}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl border text-[10px] transition-all cursor-pointer ${
                    activeMode === "wind"
                      ? "bg-white/[0.14] border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                      : "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white"
                  }`}
                >
                  <svg className="w-3.5 h-3.5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <span className="font-medium">Wind</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveMode("sleep");
                    setTemperature(26);
                  }}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl border text-[10px] transition-all cursor-pointer ${
                    activeMode === "sleep"
                      ? "bg-white/[0.14] border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                      : "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white"
                  }`}
                >
                  <svg className="w-3.5 h-3.5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span className="font-medium">Sleep</span>
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================
              CENTER COLUMN: 3D GLB Model Viewport
              (Completely replaces the element from the screenshot with the 3D GLB Wolf model)
             ======================================================== */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[520px] rounded-[32px] overflow-hidden">
            <WolfViewer3D
              intensity={intensity}
              isPlaying={isPlaying}
              wireColor={selectedModel.wireColor}
            />
          </div>

          {/* ========================================================
              RIGHT COLUMN: Models Library & Playback Scrubber Card
             ======================================================== */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            
            {/* Widget 3: Library Card (Tabs, 5 Items with Selected State & Pagination Dots) */}
            <div className="flex-1 rounded-[28px] bg-white/[0.035] border border-white/[0.08] p-4 sm:p-5 backdrop-blur-xl flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
              <div>
                {/* Header Segmented Tabs */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setActiveTab("models")}
                      className={`flex items-center gap-1.5 transition-colors pb-1 border-b-2 cursor-pointer ${
                        activeTab === "models"
                          ? "text-white border-cyan-400"
                          : "text-slate-400 border-transparent hover:text-slate-200"
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>3D Models</span>
                    </button>
                    <span className="text-white/20">|</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("prompts")}
                      className={`flex items-center gap-1.5 transition-colors pb-1 border-b-2 cursor-pointer ${
                        activeTab === "prompts"
                          ? "text-white border-cyan-400"
                          : "text-slate-400 border-transparent hover:text-slate-200"
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <span>Prompts</span>
                    </button>
                  </div>
                </div>

                {/* List of 5 Items */}
                <div className="space-y-2 mt-2">
                  {MODEL_PRESETS.map((item) => {
                    const isSelected = selectedModel.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedModel(item)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-white/[0.12] border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.35)] backdrop-blur-md"
                            : "hover:bg-white/[0.04] text-slate-300"
                        }`}
                      >
                        {/* Circular Thumbnail Avatar */}
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-tr ${item.thumbnailColor} flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}
                        >
                          {item.name.charAt(0)}
                        </div>

                        {/* Title and Secondary Stats */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white truncate">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            <span className="text-cyan-300 font-medium">{item.rating}</span>
                            <span className="mx-1">&middot;</span>
                            <span>{item.polys}</span>
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Pagination Dots */}
              <div className="flex items-center justify-center gap-2 mt-4 pt-2 border-t border-white/[0.05]">
                {[0, 1, 2, 3].map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setActivePage(page)}
                    className={`transition-all rounded-full cursor-pointer ${
                      activePage === page
                        ? "w-6 h-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                        : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Page ${page + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Widget 4: Playback / Render Controller */}
            <div className="rounded-[28px] bg-white/[0.035] border border-white/[0.08] p-4 backdrop-blur-xl flex flex-col gap-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
              {/* Title */}
              <div className="text-center">
                <span className="text-xs font-semibold text-white tracking-wide">
                  {selectedModel.name}
                </span>
              </div>

              {/* Audio / Generation Waveform Scrubber */}
              <div className="flex items-center gap-2 px-1">
                <span className="text-[9px] font-mono text-slate-400">1:24</span>
                <div className="flex-1 h-3 flex items-center gap-0.5">
                  {[4, 8, 12, 6, 14, 18, 10, 16, 22, 14, 8, 12, 16, 20, 14, 8, 6, 10, 14, 8, 4].map(
                    (val, idx) => (
                      <span
                        key={idx}
                        className={`flex-1 rounded-full transition-all ${
                          idx < 11 ? "bg-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.5)]" : "bg-white/20"
                        }`}
                        style={{ height: `${val}px` }}
                      />
                    )
                  )}
                </div>
                <span className="text-[9px] font-mono text-slate-400">2:40</span>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-4 text-slate-300">
                {/* Prev */}
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = MODEL_PRESETS.findIndex((m) => m.id === selectedModel.id);
                    const prevIndex = (currentIndex - 1 + MODEL_PRESETS.length) % MODEL_PRESETS.length;
                    setSelectedModel(MODEL_PRESETS[prevIndex]);
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous Model"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                  </svg>
                </button>

                {/* Rewind */}
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(true);
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                  aria-label="Rewind"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
                  </svg>
                </button>

                {/* Play / Pause Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-white/[0.12] hover:bg-white/[0.22] border border-white/25 flex items-center justify-center text-white transition-all shadow-[0_0_12px_rgba(255,255,255,0.2)] cursor-pointer"
                  aria-label={isPlaying ? "Pause Rotation" : "Play Rotation"}
                >
                  {isPlaying ? (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Fast Forward */}
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(true);
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                  aria-label="Fast Forward"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
                  </svg>
                </button>

                {/* Next */}
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = MODEL_PRESETS.findIndex((m) => m.id === selectedModel.id);
                    const nextIndex = (currentIndex + 1) % MODEL_PRESETS.length;
                    setSelectedModel(MODEL_PRESETS[nextIndex]);
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                  aria-label="Next Model"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
