"use client";

import React, { useState, useEffect } from "react";
import { Timer, Target, Flame, DownloadCloud, Sparkles, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface GoalHeaderProps {
  overallProgress: number;
}

export default function GoalHeader({ overallProgress }: GoalHeaderProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const neetExamDate = new Date("2027-05-02T14:00:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = neetExamDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [neetExamDate]);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowInstallBtn(false);
      setDeferredPrompt(null);
    }
  };

  // Safe cache purge & reload without wiping localStorage progress
  const handleForceUpdate = async () => {
    setIsUpdating(true);
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((c) => caches.delete(c)));
    }
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
      }
    }
    window.location.reload();
  };

  return (
    <header className="border-b-4 border-[#122056] bg-[#5b65dc] p-3 sm:p-6 shadow-[4px_4px_0px_0px_#122056]">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        
        {/* Navigation & Header Controls */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand Tag */}
          <div className="flex items-center border-2 border-[#122056] bg-[#122056] shadow-[2px_2px_0px_0px_#122056] overflow-hidden whitespace-nowrap">
            <span className="bg-[#eeeffd] text-[#122056] text-[10px] sm:text-xs font-black px-2 sm:px-2.5 py-1 tracking-wider flex items-center gap-1">
              <span>🩺</span> AQUASHEKHAR
            </span>
            <span className="text-white text-[9px] sm:text-[11px] font-mono font-bold px-2 py-1">
              SHEKHUBOSS_v2.0
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Install Button (Appears only if not yet installed) */}
            {showInstallBtn && (
              <button
                onClick={handleInstallClick}
                className="bg-[#ffe600] text-[#122056] text-[10px] sm:text-xs font-black px-2 py-1 border-2 border-[#122056] shadow-[2px_2px_0px_0px_#122056] flex items-center gap-1 animate-pulse"
              >
                <DownloadCloud className="w-3 h-3" /> INSTALL
              </button>
            )}

            {/* Clean Tap-to-Update & Synced Indicator */}
            <button
              onClick={handleForceUpdate}
              disabled={isUpdating}
              title="Tap to sync latest updates"
              className="bg-[#eeeffd] hover:bg-white active:translate-x-0.5 active:translate-y-0.5 px-2.5 py-1 border-2 border-[#122056] font-black text-[10px] sm:text-xs shadow-[2px_2px_0px_0px_#122056] flex items-center gap-1.5 whitespace-nowrap select-none transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[#10b981] shrink-0"></span>
              <span className="text-[#122056]">SYNCED</span>
              <RefreshCw className={`w-3 h-3 text-[#5b65dc] ml-0.5 ${isUpdating ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Motivational Banner */}
        <div className="bg-[#122056] text-[#eeeffd] border-2 border-[#122056] px-3 py-1.5 shadow-[2px_2px_0px_0px_#122056] flex items-center gap-2 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-[#5b65dc] shrink-0" />
          <span>&quot;One more revision tonight can change your rank tomorrow.&quot;</span>
        </div>

        {/* Status Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white border-2 border-[#122056] p-3 sm:p-4 shadow-[4px_4px_0px_0px_#122056] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black tracking-wider text-[#122056] flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#5b65dc]" /> CUTOFF BENCHMARKS
              </span>
              <span className="text-[10px] bg-[#eeeffd] text-[#122056] border-2 border-[#122056] font-black px-1.5 py-0.2">NEET 2027</span>
            </div>
            <div className="space-y-1.5 text-xs font-bold">
              <div className="flex justify-between border-b border-[#122056]/15 pb-0.5">
                <span>AIIMS Deoghar (Target):</span>
                <span className="text-[#5b65dc] font-black">~680+ / 720</span>
              </div>
              <div className="flex justify-between border-b border-[#122056]/15 pb-0.5">
                <span>AIIMS Kalyani / Patna:</span>
                <span className="text-[#122056] font-black">~675+ / 720</span>
              </div>
              <div className="flex justify-between">
                <span>PW Accuracy Benchmark:</span>
                <span className="text-[#10b981] font-black">&gt; 92%</span>
              </div>
            </div>
          </div>

          <div className="bg-[#122056] text-white border-2 border-[#122056] p-3 sm:p-4 shadow-[4px_4px_0px_0px_#122056] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-[#5b65dc] flex items-center gap-1.5">
                <Timer className="w-4 h-4" /> NEET 2027 COUNTDOWN
              </span>
              <span className="text-[10px] text-indigo-200 font-bold">MAY 2027</span>
            </div>
            <div className="grid grid-cols-4 gap-1 text-center my-1">
              <div className="bg-[#1b2b6d] border-2 border-[#122056] p-1 sm:p-1.5">
                <div className="text-lg sm:text-xl font-black text-[#5b65dc]">{timeLeft.days}</div>
                <div className="text-[8px] sm:text-[9px] text-slate-300">DAYS</div>
              </div>
              <div className="bg-[#1b2b6d] border-2 border-[#122056] p-1 sm:p-1.5">
                <div className="text-lg sm:text-xl font-black text-white">{timeLeft.hours}</div>
                <div className="text-[8px] sm:text-[9px] text-slate-300">HRS</div>
              </div>
              <div className="bg-[#1b2b6d] border-2 border-[#122056] p-1 sm:p-1.5">
                <div className="text-lg sm:text-xl font-black text-white">{timeLeft.minutes}</div>
                <div className="text-[8px] sm:text-[9px] text-slate-300">MIN</div>
              </div>
              <div className="bg-[#1b2b6d] border-2 border-[#122056] p-1 sm:p-1.5">
                <div className="text-lg sm:text-xl font-black text-[#10b981]">{timeLeft.seconds}</div>
                <div className="text-[8px] sm:text-[9px] text-slate-300">SEC</div>
              </div>
            </div>
            <div className="text-[10px] text-indigo-100 flex justify-between mt-0.5">
              <span>Daily Target:</span>
              <span className="text-[#10b981] font-black">6h Study + 30m Walk</span>
            </div>
          </div>

          <div className="bg-[#eeeffd] border-2 border-[#122056] p-3 sm:p-4 shadow-[4px_4px_0px_0px_#122056] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider text-[#122056] flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#ff4757]" /> SYLLABUS READINESS
              </span>
              <span className="text-lg sm:text-xl font-black text-[#122056]">{overallProgress}%</span>
            </div>
            <div className="w-full bg-white border-2 border-[#122056] h-5 sm:h-6 my-1.5 relative overflow-hidden">
              <motion.div
                className="h-full bg-[#5b65dc] border-r-2 border-[#122056]"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ type: "spring", stiffness: 60 }}
              />
            </div>
            <div className="flex justify-between text-[10px] sm:text-[11px] font-black text-[#122056]">
              <span>NCERT Base</span>
              <span>Target: 680+ Marks</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}