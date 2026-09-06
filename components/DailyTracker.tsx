"use client";

import React, { useState, useEffect } from "react";
import { Check, Flame, Smartphone, Footprints, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

export interface DailyLog {
  date: string;
  studyHours: number;
  phoneUnderLimit: boolean;
  walkDone: boolean;
}

export default function DailyTracker() {
  const [logs, setLogs] = useState<Record<string, DailyLog>>({});
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  const todayStr = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const saved = localStorage.getItem("shekhu_daily_logs_v2");
    if (saved) {
      try { setLogs(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const saveLogs = (updated: Record<string, DailyLog>) => {
    setLogs(updated);
    localStorage.setItem("shekhu_daily_logs_v2", JSON.stringify(updated));
  };

  const currentLog = logs[todayStr] || {
    date: todayStr,
    studyHours: 0,
    phoneUnderLimit: false,
    walkDone: false,
  };

  const updateToday = (updates: Partial<DailyLog>) => {
    const updated = {
      ...logs,
      [todayStr]: { ...currentLog, ...updates },
    };
    saveLogs(updated);
  };

  // Month navigation calculation
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const monthName = currentMonthDate.toLocaleString("default", { month: "long" });
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const monthDays = Array.from({ length: totalDaysInMonth }, (_, i) => {
    const d = i + 1;
    const dayStr = d < 10 ? `0${d}` : `${d}`;
    const mStr = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
    return `${year}-${mStr}-${dayStr}`;
  });

  const nextMonth = () => setCurrentMonthDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentMonthDate(new Date(year, month - 1, 1));

  // Current Month Completed Days
  const monthCompletedCount = monthDays.filter((d) => {
    const entry = logs[d];
    return entry && entry.studyHours >= 6 && entry.phoneUnderLimit && entry.walkDone;
  }).length;
  const monthPercentage = Math.round((monthCompletedCount / totalDaysInMonth) * 100);

  return (
    <div className="space-y-6">
      {/* Today's Discipline Board */}
      <div className="bg-white border-2 border-[#122056] p-4 sm:p-6 shadow-[4px_4px_0px_0px_#122056]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#122056] pb-3 mb-4">
          <div>
            <h3 className="text-sm sm:text-base font-black uppercase text-[#122056]">
              TODAY&apos;S DISCIPLINE PROTOCOL // {todayStr}
            </h3>
            <p className="text-[11px] text-[#5b65dc] font-bold">Non-negotiable daily grind for AIIMS Deoghar</p>
          </div>
          <div className="bg-[#eeeffd] border-2 border-[#122056] px-3 py-1 text-xs font-black shadow-[2px_2px_0px_0px_#122056] flex items-center gap-1.5 text-[#122056]">
            <Flame className="w-4 h-4 text-[#ff4757] fill-[#ff4757]" />
            MONTHLY PERFECT DAYS: {monthCompletedCount}/{totalDaysInMonth} ({monthPercentage}%)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-2 border-[#122056] p-4 bg-[#eeeffd] shadow-[2px_2px_0px_0px_#122056] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-[#122056] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#5b65dc]" /> 6H+ DEEP STUDY
              </span>
              <span className={`text-[10px] font-black px-1.5 py-0.5 border border-[#122056] ${currentLog.studyHours >= 6 ? 'bg-[#10b981] text-white' : 'bg-white text-[#122056]'}`}>
                {currentLog.studyHours >= 6 ? "ACHIEVED" : "PENDING"}
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 my-2">
              <button
                onClick={() => updateToday({ studyHours: Math.max(0, currentLog.studyHours - 0.5) })}
                className="w-8 h-8 font-black text-base border-2 border-[#122056] bg-white hover:bg-[#fafafd] shadow-[2px_2px_0px_0px_#122056]"
              >
                -
              </button>
              <span className="text-2xl font-black font-mono text-[#122056]">{currentLog.studyHours}h</span>
              <button
                onClick={() => updateToday({ studyHours: currentLog.studyHours + 0.5 })}
                className="w-8 h-8 font-black text-base border-2 border-[#122056] bg-white hover:bg-[#fafafd] shadow-[2px_2px_0px_0px_#122056]"
              >
                +
              </button>
            </div>
            <p className="text-[10px] text-center font-bold text-slate-500">NCERT + Question Practice</p>
          </div>

          <div className="border-2 border-[#122056] p-4 bg-[#eeeffd] shadow-[2px_2px_0px_0px_#122056] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-[#122056] flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-[#ff4757]" /> PHONE &lt; 2H LIMIT
              </span>
              <span className={`text-[10px] font-black px-1.5 py-0.5 border border-[#122056] ${currentLog.phoneUnderLimit ? 'bg-[#10b981] text-white' : 'bg-white text-[#122056]'}`}>
                {currentLog.phoneUnderLimit ? "LOCKED" : "PENDING"}
              </span>
            </div>
            <button
              onClick={() => updateToday({ phoneUnderLimit: !currentLog.phoneUnderLimit })}
              className={`w-full py-2.5 border-2 border-[#122056] text-xs font-black shadow-[2px_2px_0px_0px_#122056] transition-all flex items-center justify-center gap-2 ${
                currentLog.phoneUnderLimit ? 'bg-[#10b981] text-white' : 'bg-white hover:bg-[#fafafd] text-[#122056]'
              }`}
            >
              <Check className="w-4 h-4" />
              {currentLog.phoneUnderLimit ? "SCREEN TIME CONTROLLED" : "MARK PHONE &lt; 2H"}
            </button>
            <p className="text-[10px] text-center font-bold text-slate-500 mt-2">Zero shorts / mindless reels</p>
          </div>

          <div className="border-2 border-[#122056] p-4 bg-[#eeeffd] shadow-[2px_2px_0px_0px_#122056] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-[#122056] flex items-center gap-1.5">
                <Footprints className="w-4 h-4 text-[#5b65dc]" /> 30M DAILY WALK
              </span>
              <span className={`text-[10px] font-black px-1.5 py-0.5 border border-[#122056] ${currentLog.walkDone ? 'bg-[#10b981] text-white' : 'bg-white text-[#122056]'}`}>
                {currentLog.walkDone ? "COMPLETED" : "PENDING"}
              </span>
            </div>
            <button
              onClick={() => updateToday({ walkDone: !currentLog.walkDone })}
              className={`w-full py-2.5 border-2 border-[#122056] text-xs font-black shadow-[2px_2px_0px_0px_#122056] transition-all flex items-center justify-center gap-2 ${
                currentLog.walkDone ? 'bg-[#10b981] text-white' : 'bg-white hover:bg-[#fafafd] text-[#122056]'
              }`}
            >
              <Check className="w-4 h-4" />
              {currentLog.walkDone ? "WALK FINISHED" : "MARK 30 MINS WALK"}
            </button>
            <p className="text-[10px] text-center font-bold text-slate-500 mt-2">Mental clarity & reset</p>
          </div>
        </div>
      </div>

      {/* Dynamic Monthly Calendar Grid */}
      <div className="bg-white border-2 border-[#122056] p-4 sm:p-6 shadow-[4px_4px_0px_0px_#122056]">
        <div className="flex flex-wrap items-center justify-between border-b-2 border-[#122056] pb-3 mb-4 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-black uppercase text-[#122056] flex items-center gap-1.5">
              📅 {monthName.toUpperCase()} {year} MOMENTUM CALENDAR
            </span>
            <span className="text-[10px] bg-[#5b65dc] text-white font-black px-2 py-0.5 border border-[#122056]">
              {monthCompletedCount} PERFECT DAYS
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="p-1 border-2 border-[#122056] bg-[#eeeffd] hover:bg-white shadow-[2px_2px_0px_0px_#122056]"
            >
              <ChevronLeft className="w-4 h-4 text-[#122056]" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1 border-2 border-[#122056] bg-[#eeeffd] hover:bg-white shadow-[2px_2px_0px_0px_#122056]"
            >
              <ChevronRight className="w-4 h-4 text-[#122056]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {monthDays.map((d) => {
            const entry = logs[d];
            const studyPass = entry && entry.studyHours >= 6;
            const phonePass = entry && entry.phoneUnderLimit;
            const walkPass = entry && entry.walkDone;
            const isFullSuccess = studyPass && phonePass && walkPass;
            const isPartial = entry && (studyPass || phonePass || walkPass);
            const isToday = d === todayStr;

            let cardBg = "bg-[#fafafd] text-[#122056]";
            if (isFullSuccess) cardBg = "bg-[#10b981] text-white";
            else if (isPartial) cardBg = "bg-[#eeeffd] text-[#122056]";

            return (
              <div
                key={d}
                className={`border-2 border-[#122056] p-2 flex flex-col justify-between h-24 shadow-[2px_2px_0px_0px_#122056] ${cardBg} ${
                  isToday ? "ring-2 ring-[#5b65dc]" : ""
                }`}
              >
                <div className="flex justify-between items-center text-[11px] font-black">
                  <span>{d.slice(8)} {monthName.slice(0, 3)}</span>
                  {isFullSuccess && <span>🩺 100%</span>}
                </div>

                <div className="text-[10px] font-mono font-bold leading-tight my-1">
                  <div className="flex justify-between">
                    <span>Study:</span>
                    <span>{entry ? `${entry.studyHours}h` : "0h"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span>{entry?.phoneUnderLimit ? "<2h ✓" : "✗"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Walk:</span>
                    <span>{entry?.walkDone ? "30m ✓" : "✗"}</span>
                  </div>
                </div>

                <div className="text-[8px] font-black uppercase text-center border-t border-[#122056]/20 pt-0.5">
                  {isFullSuccess ? "AIIMS LEVEL" : isPartial ? "PARTIAL" : "INACTIVE"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}