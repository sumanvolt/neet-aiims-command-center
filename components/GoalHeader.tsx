"use client";

import React, { useState, useEffect } from "react";
import { Timer, Target, Flame, DownloadCloud, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface GoalHeaderProps {
  overallProgress: number;
}

export default function GoalHeader({ overallProgress }: GoalHeaderProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  // Target: NEET 2027 (First Sunday of May 2027)
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

  return (
    <header className="border-b-4 border-black bg-[#f5a623] p-3 sm:p-6 shadow-[4px_4px_0px_0px_#000]">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        {/* Navigation & Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 max-w-full">
            <div className="flex items-center border-2 border-black bg-black shadow-[2px_2px_0px_0px_#000] overflow-hidden whitespace-nowrap">
              <span className="bg-[#ffe600] text-black text-[10px] sm:text-xs font-black px-2.5 py-1 tracking-wider flex items-center gap-1">
                <span>🩺</span> AQUASHEKHAR
              </span>
              <span className="text-white text-[9px] sm:text-[11px] font-mono font-bold px-2 py-1">
                SHEKHUBOSS_v1.0
              </span>
            </div>
            <span className="hidden sm:inline-block bg-[#2c0d0d] text-white font-black text-xs px-2.5 py-1 border-2 border-black">
              TARGET: AIIMS DEOGHAR
            </span>
          </div>

          <div className="flex items-center gap-2">
            {showInstallBtn && (
              <button
                onClick={handleInstallClick}
                className="bg-[#ffe600] text-black text-[10px] sm:text-xs font-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1 animate-pulse"
              >
                <DownloadCloud className="w-3.5 h-3.5" /> INSTALL APP
              </button>
            )}
            <div className="bg-white px-2.5 py-1 border-2 border-black font-bold text-[10px] sm:text-xs shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              SYNCED ON MOBILE
            </div>
          </div>
        </div>

        {/* Motivation Banner */}
        <div className="bg-[#2c0d0d] text-[#ffe600] border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_#000] flex items-center gap-2 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-[#ffe600] shrink-0" />
          <span>&quot;One more revision tonight can change your rank tomorrow.&quot;</span>
        </div>

        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white border-2 border-black p-3 sm:p-4 shadow-[4px_4px_0px_0px_#000] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black tracking-wider text-[#2c0d0d] flex items-center gap-1.5">
                <Target className="w-4 h-4" /> CUTOFF BENCHMARKS
              </span>
              <span className="text-[10px] bg-[#ffe600] border-2 border-black font-black px-1.5 py-0.2">NEET 2027</span>
            </div>
            <div className="space-y-1.5 text-xs font-bold">
              <div className="flex justify-between border-b border-black/15 pb-0.5">
                <span>AIIMS Deoghar (Target):</span>
                <span className="text-[#2c0d0d] font-black">~680+ / 720</span>
              </div>
              <div className="flex justify-between border-b border-black/15 pb-0.5">
                <span>AIIMS Kalyani / Patna:</span>
                <span className="text-[#2c0d0d] font-black">~675+ / 720</span>
              </div>
              <div className="flex justify-between">
                <span>PW Test Goal:</span>
                <span className="text-[#10b981] font-black">Accuracy &gt; 92%</span>
              </div>
            </div>
          </div>

          <div className="bg-[#2c0d0d] text-white border-2 border-black p-3 sm:p-4 shadow-[4px_4px_0px_0px_#000] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-[#f5a623] flex items-center gap-1.5">
                <Timer className="w-4 h-4" /> NEET 2027 CLOCK
              </span>
              <span className="text-[10px] text-amber-200 font-bold">MAY 2027</span>
            </div>
            <div className="grid grid-cols-4 gap-1 text-center my-1">
              <div className="bg-[#4a1212] border-2 border-black p-1 sm:p-1.5">
                <div className="text-lg sm:text-xl font-black text-[#ffe600]">{timeLeft.days}</div>
                <div className="text-[8px] sm:text-[9px] text-slate-300">DAYS</div>
              </div>
              <div className="bg-[#4a1212] border-2 border-black p-1 sm:p-1.5">
                <div className="text-lg sm:text-xl font-black text-white">{timeLeft.hours}</div>
                <div className="text-[8px] sm:text-[9px] text-slate-300">HRS</div>
              </div>
              <div className="bg-[#4a1212] border-2 border-black p-1 sm:p-1.5">
                <div className="text-lg sm:text-xl font-black text-white">{timeLeft.minutes}</div>
                <div className="text-[8px] sm:text-[9px] text-slate-300">MIN</div>
              </div>
              <div className="bg-[#4a1212] border-2 border-black p-1 sm:p-1.5">
                <div className="text-lg sm:text-xl font-black text-[#00e5ff]">{timeLeft.seconds}</div>
                <div className="text-[8px] sm:text-[9px] text-slate-300">SEC</div>
              </div>
            </div>
            <div className="text-[10px] text-amber-100 flex justify-between mt-0.5">
              <span>Non-negotiable Habit:</span>
              <span className="text-[#10b981] font-black">30m Daily Walk</span>
            </div>
          </div>

          <div className="bg-[#00e5ff] border-2 border-black p-3 sm:p-4 shadow-[4px_4px_0px_0px_#000] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider text-black flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#ff007a]" /> SYLLABUS READINESS
              </span>
              <span className="text-lg sm:text-xl font-black">{overallProgress}%</span>
            </div>
            <div className="w-full bg-white border-2 border-black h-5 sm:h-6 my-1.5 relative overflow-hidden">
              <motion.div
                className="h-full bg-[#ff007a] border-r-2 border-black"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ type: "spring", stiffness: 60 }}
              />
            </div>
            <div className="flex justify-between text-[10px] sm:text-[11px] font-black text-black">
              <span>NCERT Base</span>
              <span>Target: 680+ Marks</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}