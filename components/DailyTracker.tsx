"use client";

import React, { useState, useEffect } from "react";
import { Check, Flame, Smartphone, Footprints, BookOpen, RotateCcw } from "lucide-react";

export interface DailyLog {
  date: string; // YYYY-MM-DD
  studyHours: number;
  phoneUnderLimit: boolean; // < 2h phone
  walkDone: boolean; // 30m walk
}

export default function DailyTracker() {
  const [logs, setLogs] = useState<Record<string, DailyLog>>({});
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const saved = localStorage.getItem("shekhu_daily_logs");
    if (saved) {
      try { setLogs(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const saveLogs = (updated: Record<string, DailyLog>) => {
    setLogs(updated);
    localStorage.setItem("shekhu_daily_logs", JSON.stringify(updated));
  };

  const currentLog = logs[today] || {
    date: today,
    studyHours: 0,
    phoneUnderLimit: false,
    walkDone: false,
  };

  const updateToday = (updates: Partial<DailyLog>) => {
    const updated = {
      ...logs,
      [today]: { ...currentLog, ...updates },
    };
    saveLogs(updated);
  };

  // Generate last 28 days for the momentum calendar
  const past28Days = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    return d.toISOString().slice(0, 10);
  });

  // Calculate Streak
  let streak = 0;
  for (let i = past28Days.length - 1; i >= 0; i--) {
    const day = past28Days[i];
    const log = logs[day];
    if (log && log.studyHours >= 6 && log.walkDone && log.phoneUnderLimit) {
      streak++;
    } else if (day !== today) {
      break;
    }
  }

  return (
    <div className="space-y-6">
      {/* Today's Action Center */}
      <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-[4px_4px_0px_0px_#000]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-3 mb-4">
          <div>
            <h3 className="text-sm sm:text-base font-black uppercase text-[#2c0d0d]">
              TODAY&apos;S DISCIPLINE PROTOCOL // {today}
            </h3>
            <p className="text-[11px] text-slate-500 font-bold">Non-negotiable daily grind for AIIMS Deoghar</p>
          </div>
          <div className="bg-[#ffe600] border-2 border-black px-3 py-1 text-xs font-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-red-600 fill-red-600" />
            STREAK: {streak} DAYS
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Habit 1: Study Hours */}
          <div className="border-2 border-black p-4 bg-[#fffdf0] shadow-[2px_2px_0px_0px_#000] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#2c0d0d]" /> 6H+ DEEP STUDY
              </span>
              <span className={`text-[10px] font-black px-1.5 py-0.5 border border-black ${currentLog.studyHours >= 6 ? 'bg-[#10b981]' : 'bg-slate-200'}`}>
                {currentLog.studyHours >= 6 ? "ACHIEVED" : "IN PROGRESS"}
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 my-2">
              <button
                onClick={() => updateToday({ studyHours: Math.max(0, currentLog.studyHours - 0.5) })}
                className="w-8 h-8 font-black text-base border-2 border-black bg-white hover:bg-slate-100 shadow-[2px_2px_0px_0px_#000]"
              >
                -
              </button>
              <span className="text-2xl font-black font-mono">{currentLog.studyHours}h</span>
              <button
                onClick={() => updateToday({ studyHours: currentLog.studyHours + 0.5 })}
                className="w-8 h-8 font-black text-base border-2 border-black bg-white hover:bg-slate-100 shadow-[2px_2px_0px_0px_#000]"
              >
                +
              </button>
            </div>
            <p className="text-[10px] text-center font-bold text-slate-500">Target: Minimum 6.0 Hours</p>
          </div>

          {/* Habit 2: Screen Time Minimization */}
          <div className="border-2 border-black p-4 bg-[#fffdf0] shadow-[2px_2px_0px_0px_#000] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-[#ff007a]" /> PHONE &lt; 2H LIMIT
              </span>
              <span className={`text-[10px] font-black px-1.5 py-0.5 border border-black ${currentLog.phoneUnderLimit ? 'bg-[#10b981]' : 'bg-slate-200'}`}>
                {currentLog.phoneUnderLimit ? "LOCKED" : "PENDING"}
              </span>
            </div>
            <button
              onClick={() => updateToday({ phoneUnderLimit: !currentLog.phoneUnderLimit })}
              className={`w-full py-2.5 border-2 border-black text-xs font-black shadow-[2px_2px_0px_0px_#000] transition-all flex items-center justify-center gap-2 ${
                currentLog.phoneUnderLimit ? 'bg-[#10b981] text-black' : 'bg-white hover:bg-slate-50 text-slate-600'
              }`}
            >
              <Check className="w-4 h-4" />
              {currentLog.phoneUnderLimit ? "SCREEN TIME CONTROLLED" : "MARK PHONE &lt; 2H"}
            </button>
            <p className="text-[10px] text-center font-bold text-slate-500 mt-2">Zero mindless reels/shorts</p>
          </div>

          {/* Habit 3: Non-negotiable 30m Walk */}
          <div className="border-2 border-black p-4 bg-[#fffdf0] shadow-[2px_2px_0px_0px_#000] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black flex items-center gap-1.5">
                <Footprints className="w-4 h-4 text-[#00e5ff]" /> 30M DAILY WALK
              </span>
              <span className={`text-[10px] font-black px-1.5 py-0.5 border border-black ${currentLog.walkDone ? 'bg-[#10b981]' : 'bg-slate-200'}`}>
                {currentLog.walkDone ? "COMPLETED" : "PENDING"}
              </span>
            </div>
            <button
              onClick={() => updateToday({ walkDone: !currentLog.walkDone })}
              className={`w-full py-2.5 border-2 border-black text-xs font-black shadow-[2px_2px_0px_0px_#000] transition-all flex items-center justify-center gap-2 ${
                currentLog.walkDone ? 'bg-[#10b981] text-black' : 'bg-white hover:bg-slate-50 text-slate-600'
              }`}
            >
              <Check className="w-4 h-4" />
              {currentLog.walkDone ? "WALK FINISHED" : "MARK 30 MINS WALK"}
            </button>
            <p className="text-[10px] text-center font-bold text-slate-500 mt-2">Non-negotiable physical reset</p>
          </div>
        </div>
      </div>

      {/* 28-Day Visual Momentum Grid (Reels Inspo) */}
      <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-[4px_4px_0px_0px_#000]">
        <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-4">
          <span className="text-xs font-black uppercase text-[#2c0d0d] flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#f5a623]" /> 28-DAY MOMENTUM GRID (BRO HAD RECEIPTS)
          </span>
          <span className="text-[10px] bg-[#10b981] border border-black font-black px-2 py-0.5">3/3 GREEN = AIIMS LEVEL</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {past28Days.map((d) => {
            const entry = logs[d];
            const studyPass = entry && entry.studyHours >= 6;
            const phonePass = entry && entry.phoneUnderLimit;
            const walkPass = entry && entry.walkDone;
            const isFullSuccess = studyPass && phonePass && walkPass;
            const isPartial = entry && (studyPass || phonePass || walkPass);

            let bgCol = "bg-slate-100";
            if (isFullSuccess) bgCol = "bg-[#10b981] text-black";
            else if (isPartial) bgCol = "bg-[#ffe600] text-black";

            return (
              <div
                key={d}
                className={`border-2 border-black p-2 flex flex-col justify-between h-20 shadow-[2px_2px_0px_0px_#000] ${bgCol}`}
              >
                <div className="flex justify-between items-center text-[10px] font-black">
                  <span>{d.slice(5)}</span>
                  {isFullSuccess && <span>🔥</span>}
                </div>
                <div className="text-[9px] font-mono font-bold leading-tight mt-1">
                  <div>{entry ? `${entry.studyHours}h` : "0h"}</div>
                  <div>{entry?.walkDone ? "Walk ✓" : "Walk ✗"}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}