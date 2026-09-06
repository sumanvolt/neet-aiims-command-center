"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Check, Filter, RotateCcw, BookOpen } from "lucide-react";

export interface NeetSubTopic {
  id: string;
  name: string;
  is8020: boolean;
  status: 0 | 1 | 2 | 3;
  ncertDone: boolean;
}

export interface NeetChapter {
  id: string;
  title: string;
  weightage: string;
  subtopics: NeetSubTopic[];
}

export interface NeetSubjectGroup {
  key: string;
  title: string;
  marks: string;
  chapters: NeetChapter[];
}

interface SyllabusTrackerProps {
  subjects: NeetSubjectGroup[];
  onUpdateSubtopic: (subjKey: string, chapterId: string, subtopicId: string, updates: Partial<NeetSubTopic>) => void;
  onUndo: () => void;
  canUndo: boolean;
}

export default function SyllabusTracker({
  subjects,
  onUpdateSubtopic,
  onUndo,
  canUndo,
}: SyllabusTrackerProps) {
  const [openSubjects, setOpenSubjects] = useState<Record<string, boolean>>({ bio: true });
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({ "bio-u1": true, "phy-u1": true });
  const [filter8020, setFilter8020] = useState(false);

  const toggleSubject = (key: string) => {
    setOpenSubjects((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleChapter = (id: string) => {
    setOpenChapters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const statusLabels = ["NOT STARTED", "LECTURES DONE", "NOTES LOCKED", "PYQ MASTERED"];
  const statusColors = [
    "bg-slate-100 text-slate-700",
    "bg-[#eeeffd] text-[#122056]",
    "bg-[#5b65dc] text-white",
    "bg-[#10b981] text-white",
  ];

  return (
    <div className="space-y-6">
      {/* Action and Filter Ribbon */}
      <div className="bg-white border-2 border-[#122056] p-4 shadow-[4px_4px_0px_0px_#122056] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#5b65dc]" />
          <span className="text-xs font-black uppercase text-[#122056]">OFFICIAL NEET SUBTOPIC RADAR:</span>
        </div>
        <div className="flex items-center gap-2">
          {canUndo && (
            <button
              onClick={onUndo}
              className="px-3 py-1.5 text-xs font-black bg-[#ff4757] text-white border-2 border-[#122056] shadow-[2px_2px_0px_0px_#122056] flex items-center gap-1.5 hover:bg-rose-600 active:translate-x-0.5 active:translate-y-0.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> UNDO ACTION
            </button>
          )}
          <button
            onClick={() => setFilter8020(!filter8020)}
            className={`px-3 py-1.5 text-xs font-black border-2 border-[#122056] transition-all ${
              filter8020 ? "bg-[#5b65dc] text-white shadow-[2px_2px_0px_0px_#122056]" : "bg-white text-[#122056] hover:bg-slate-50"
            }`}
          >
            ⭐ 80/20 HIGH YIELD SUBTOPICS
          </button>
        </div>
      </div>

      {/* 3-Tier Hierarchy: Subject -> Chapter/Unit -> Granular Subtopic */}
      <div className="space-y-4">
        {subjects.map((subj) => {
          const isOpenSubj = openSubjects[subj.key] ?? false;

          let totalSubtopics = 0;
          let masteredSubtopics = 0;
          subj.chapters.forEach((c) => {
            c.subtopics.forEach((st) => {
              totalSubtopics++;
              if (st.status === 3) masteredSubtopics++;
            });
          });
          const subjPct = totalSubtopics > 0 ? Math.round((masteredSubtopics / totalSubtopics) * 100) : 0;

          return (
            <div key={subj.key} className="border-2 border-[#122056] bg-white shadow-[4px_4px_0px_0px_#122056]">
              {/* Subject Title Bar */}
              <div
                onClick={() => toggleSubject(subj.key)}
                className="cursor-pointer p-4 bg-[#eeeffd] hover:bg-[#e0e3fc] border-b-2 border-[#122056] flex flex-wrap items-center justify-between gap-4 select-none"
              >
                <div className="flex items-center gap-2">
                  <span className="font-black text-base text-[#122056]">{subj.title}</span>
                  <span className="bg-[#122056] text-white text-[10px] font-black px-2 py-0.5 border border-[#122056]">
                    {subj.marks}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-[#122056]">
                    {masteredSubtopics}/{totalSubtopics} Mastered ({subjPct}%)
                  </span>
                  {isOpenSubj ? <ChevronUp className="w-5 h-5 text-[#122056]" /> : <ChevronDown className="w-5 h-5 text-[#122056]" />}
                </div>
              </div>

              {/* Chapters List */}
              {isOpenSubj && (
                <div className="p-3 sm:p-4 space-y-3 bg-[#fafafd]">
                  {subj.chapters.map((chap) => {
                    const isOpenChap = openChapters[chap.id] ?? false;
                    const filteredSubtopics = chap.subtopics.filter((st) => !filter8020 || st.is8020);
                    if (filteredSubtopics.length === 0) return null;

                    const chapMastered = chap.subtopics.filter((st) => st.status === 3).length;

                    return (
                      <div key={chap.id} className="border-2 border-[#122056] bg-white shadow-[2px_2px_0px_0px_#122056]">
                        {/* Chapter Bar */}
                        <div
                          onClick={() => toggleChapter(chap.id)}
                          className="cursor-pointer p-3 bg-white hover:bg-slate-50 border-b border-[#122056]/20 flex items-center justify-between gap-2 select-none"
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-xs sm:text-sm text-[#122056]">{chap.title}</span>
                            <span className="bg-[#5b65dc] text-white text-[9px] font-bold px-1.5 py-0.2 border border-[#122056]">
                              {chap.weightage}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-mono font-bold text-slate-600">
                              {chapMastered}/{chap.subtopics.length} Done
                            </span>
                            {isOpenChap ? <ChevronUp className="w-4 h-4 text-[#122056]" /> : <ChevronDown className="w-4 h-4 text-[#122056]" />}
                          </div>
                        </div>

                        {/* Granular Subtopics */}
                        {isOpenChap && (
                          <div className="divide-y divide-[#122056]/10 p-2 sm:p-3 space-y-2">
                            {filteredSubtopics.map((st) => (
                              <div
                                key={st.id}
                                className="pt-2 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-3 px-2 hover:bg-[#fafafd]"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-xs text-[#122056]">{st.name}</span>
                                    {st.is8020 && (
                                      <span className="bg-[#eeeffd] text-[#122056] text-[8px] font-black px-1.5 py-0.5 border border-[#122056]">
                                        80/20 CORE
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                  {/* NCERT Check */}
                                  <button
                                    onClick={() => onUpdateSubtopic(subj.key, chap.id, st.id, { ncertDone: !st.ncertDone })}
                                    className={`px-2 py-1 text-[10px] font-black border-2 border-[#122056] flex items-center gap-1 shadow-[2px_2px_0px_0px_#122056] ${
                                      st.ncertDone ? "bg-[#10b981] text-white" : "bg-white text-slate-500"
                                    }`}
                                  >
                                    <Check className="w-3 h-3" /> NCERT READ
                                  </button>

                                  {/* Step Back Undo */}
                                  {st.status > 0 && (
                                    <button
                                      title="Undo step"
                                      onClick={() =>
                                        onUpdateSubtopic(subj.key, chap.id, st.id, {
                                          status: (st.status - 1) as 0 | 1 | 2 | 3,
                                        })
                                      }
                                      className="p-1 text-[10px] font-black border-2 border-[#122056] bg-[#eeeffd] hover:bg-rose-100 shadow-[2px_2px_0px_0px_#122056]"
                                    >
                                      <RotateCcw className="w-3 h-3 text-[#122056]" />
                                    </button>
                                  )}

                                  {/* Status Step Forward */}
                                  <button
                                    onClick={() =>
                                      onUpdateSubtopic(subj.key, chap.id, st.id, {
                                        status: ((st.status + 1) % 4) as 0 | 1 | 2 | 3,
                                      })
                                    }
                                    className={`px-3 py-1 text-[10px] font-black border-2 border-[#122056] ${
                                      statusColors[st.status]
                                    } shadow-[2px_2px_0px_0px_#122056] active:translate-x-0.5 active:translate-y-0.5`}
                                  >
                                    {statusLabels[st.status]}
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}