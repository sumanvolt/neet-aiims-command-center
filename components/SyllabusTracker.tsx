"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Check, Filter, RotateCcw } from "lucide-react";

export interface NeetTopic {
  id: string;
  name: string;
  is8020: boolean;
  weightage: string;
  status: 0 | 1 | 2 | 3;
  ncertRead: boolean;
}

export interface NeetSubject {
  key: string;
  title: string;
  marks: string;
  topics: NeetTopic[];
}

export interface SyllabusTrackerProps {
  subjects: NeetSubject[];
  onUpdateTopic: (subjKey: string, topicId: string, updates: Partial<NeetTopic>) => void;
  onUndo: () => void;
  canUndo: boolean;
}

export default function SyllabusTracker({
  subjects,
  onUpdateTopic,
  onUndo,
  canUndo,
}: SyllabusTrackerProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ bio: true });
  const [filter8020, setFilter8020] = useState(false);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const statusLabels = ["NOT STARTED", "LECTURE DONE", "NCERT READ", "PYQ MASTERED"];
  const statusBg = ["bg-slate-100 text-slate-700", "bg-[#ffe600] text-black", "bg-[#00e5ff] text-black", "bg-[#10b981] text-black"];

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#2c0d0d]" />
          <span className="text-xs font-black uppercase">NEET HIGH YIELD FILTER:</span>
        </div>
        <div className="flex items-center gap-2">
          {canUndo && (
            <button
              onClick={onUndo}
              className="px-3 py-1.5 text-xs font-black bg-[#ff007a] text-white border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5 hover:bg-pink-600 active:translate-x-0.5 active:translate-y-0.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> UNDO
            </button>
          )}
          <button
            onClick={() => setFilter8020(!filter8020)}
            className={`px-3 py-1.5 text-xs font-black border-2 border-black transition-all ${
              filter8020 ? "bg-[#ffe600] shadow-[2px_2px_0px_0px_#000]" : "bg-white hover:bg-slate-50"
            }`}
          >
            ⭐ 80/20 HIGH YIELD (90+ QUESTIONS)
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {subjects.map((subj: NeetSubject) => {
          const filteredTopics = subj.topics.filter((t: NeetTopic) => !filter8020 || t.is8020);
          if (filteredTopics.length === 0) return null;

          const isOpen = openSections[subj.key] ?? false;
          const masteredCount = subj.topics.filter((t: NeetTopic) => t.status === 3).length;
          const pct = Math.round((masteredCount / subj.topics.length) * 100);

          return (
            <div key={subj.key} className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
              <div
                onClick={() => toggleSection(subj.key)}
                className="cursor-pointer p-4 bg-[#fffdf0] hover:bg-[#fff7d6] border-b-2 border-black flex flex-wrap items-center justify-between gap-4 select-none"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-sm sm:text-base text-black">{subj.title}</span>
                  <span className="bg-[#2c0d0d] text-white text-[10px] font-black px-2 py-0.5 border border-black">
                    {subj.marks}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-800">
                    {masteredCount}/{subj.topics.length} Mastered ({pct}%)
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {isOpen && (
                <div className="divide-y-2 divide-black/10 p-3 sm:p-4 space-y-2">
                  {filteredTopics.map((topic: NeetTopic) => (
                    <div
                      key={topic.id}
                      className="pt-3 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50 px-2"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-bold text-xs sm:text-sm text-slate-900">{topic.name}</span>
                          {topic.is8020 && (
                            <span className="bg-[#ffe600] text-[9px] font-black px-1.5 py-0.5 border border-black">
                              80/20 CORE
                            </span>
                          )}
                          <span className="bg-slate-200 text-black text-[9px] font-bold px-1.5 py-0.5 border border-slate-400">
                            {topic.weightage}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => onUpdateTopic(subj.key, topic.id, { ncertRead: !topic.ncertRead })}
                          className={`px-2.5 py-1 text-[10px] font-black border-2 border-black flex items-center gap-1 shadow-[2px_2px_0px_0px_#000] ${
                            topic.ncertRead ? "bg-[#00e5ff] text-black" : "bg-white text-slate-500"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" /> NCERT READ
                        </button>

                        {topic.status > 0 && (
                          <button
                            title="Step Back / Undo"
                            onClick={() => onUpdateTopic(subj.key, topic.id, { status: ((topic.status - 1) as 0 | 1 | 2 | 3) })}
                            className="p-1 text-[10px] font-black border-2 border-black bg-slate-200 hover:bg-rose-200 shadow-[2px_2px_0px_0px_#000]"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => onUpdateTopic(subj.key, topic.id, { status: (((topic.status + 1) % 4) as 0 | 1 | 2 | 3) })}
                          className={`px-3 py-1 text-[10px] font-black border-2 border-black transition-all ${
                            statusBg[topic.status]
                          } shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5`}
                        >
                          {statusLabels[topic.status]}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}