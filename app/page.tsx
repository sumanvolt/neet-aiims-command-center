"use client";

import React, { useState, useEffect } from "react";
import GoalHeader from "@/components/GoalHeader";
import DailyTracker from "@/components/DailyTracker";
import SyllabusTracker, { NeetSubject, NeetTopic } from "@/components/SyllabusTracker";
import PWMockLogger, { PwMockEntry } from "@/components/PWMockLogger";

const NEET_SYLLABUS: NeetSubject[] = [
  {
    key: "bio",
    title: "Biology (Botany & Zoology)",
    marks: "360 Marks (50% Weight)",
    topics: [
      { id: "b-1", name: "Genetics & Evolution (Mendelian, Molecular Basis)", is8020: true, weightage: "~45-50M", status: 0, ncertRead: false },
      { id: "b-2", name: "Human Physiology (Digestion, Circulation, Neural)", is8020: true, weightage: "~45M", status: 0, ncertRead: false },
      { id: "b-3", name: "Plant Physiology (Photosynthesis, Respiration)", is8020: true, weightage: "~30M", status: 0, ncertRead: false },
      { id: "b-4", name: "Ecology & Environment (Ecosystem, Biodiversity)", is8020: true, weightage: "~35M", status: 0, ncertRead: false },
      { id: "b-5", name: "Reproduction (Flowering Plants & Human)", is8020: true, weightage: "~35M", status: 0, ncertRead: false },
      { id: "b-6", name: "Biotechnology: Principles & Applications", is8020: true, weightage: "~25M", status: 0, ncertRead: false },
      { id: "b-7", name: "Cell Structure, Function & Cell Cycle", is8020: true, weightage: "~30M", status: 0, ncertRead: false },
      { id: "b-8", name: "Biological Classification & Plant Kingdom", is8020: false, weightage: "~20M", status: 0, ncertRead: false },
    ],
  },
  {
    key: "chem",
    title: "Chemistry (Physical, Organic, Inorganic)",
    marks: "180 Marks",
    topics: [
      { id: "c-1", name: "Chemical Bonding & Molecular Structure", is8020: true, weightage: "~16M", status: 0, ncertRead: false },
      { id: "c-2", name: "General Organic Chemistry (GOC & Hydrocarbons)", is8020: true, weightage: "~24M", status: 0, ncertRead: false },
      { id: "c-3", name: "Coordination Compounds & d/f-Block", is8020: true, weightage: "~20M", status: 0, ncertRead: false },
      { id: "c-4", name: "Equilibrium (Ionic & Chemical)", is8020: true, weightage: "~16M", status: 0, ncertRead: false },
      { id: "c-5", name: "Aldehydes, Ketones, Carboxylic Acids & Amines", is8020: true, weightage: "~24M", status: 0, ncertRead: false },
      { id: "c-6", name: "Thermodynamics & Solutions", is8020: false, weightage: "~16M", status: 0, ncertRead: false },
    ],
  },
  {
    key: "phy",
    title: "Physics",
    marks: "180 Marks",
    topics: [
      { id: "p-1", name: "Mechanics (NLM, Work Power Energy, Rotation)", is8020: true, weightage: "~32M", status: 0, ncertRead: false },
      { id: "p-2", name: "Current Electricity & Moving Charges", is8020: true, weightage: "~24M", status: 0, ncertRead: false },
      { id: "p-3", name: "Optics (Ray Optics & Wave Optics)", is8020: true, weightage: "~20M", status: 0, ncertRead: false },
      { id: "p-4", name: "Modern Physics & Semiconductors", is8020: true, weightage: "~30M", status: 0, ncertRead: false },
      { id: "p-5", name: "Thermodynamics & Kinetic Theory of Gases", is8020: false, weightage: "~16M", status: 0, ncertRead: false },
    ],
  },
];

export default function NeetDashboard() {
  const [subjects, setSubjects] = useState<NeetSubject[]>(NEET_SYLLABUS);
  const [pwTests, setPwTests] = useState<PwMockEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"habits" | "syllabus" | "pwMocks">("habits");
  const [historyStack, setHistoryStack] = useState<NeetSubject[][]>([]);

  useEffect(() => {
    const savedSubj = localStorage.getItem("shekhu_neet_syllabus");
    if (savedSubj) {
      try { setSubjects(JSON.parse(savedSubj)); } catch (e) {}
    }
    const savedTests = localStorage.getItem("shekhu_pw_tests");
    if (savedTests) {
      try { setPwTests(JSON.parse(savedTests)); } catch (e) {}
    }
  }, []);

  const handleUpdateTopic = (subjKey: string, topicId: string, updates: Partial<NeetTopic>) => {
    setHistoryStack((prev: NeetSubject[][]) => [...prev.slice(-15), JSON.parse(JSON.stringify(subjects))]);
    const updated = subjects.map((subj: NeetSubject) => {
      if (subj.key !== subjKey) return subj;
      return {
        ...subj,
        topics: subj.topics.map((t: NeetTopic) => (t.id === topicId ? { ...t, ...updates } : t)),
      };
    });
    setSubjects(updated);
    localStorage.setItem("shekhu_neet_syllabus", JSON.stringify(updated));
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const prev = historyStack[historyStack.length - 1];
    setHistoryStack((p: NeetSubject[][]) => p.slice(0, -1));
    setSubjects(prev);
    localStorage.setItem("shekhu_neet_syllabus", JSON.stringify(prev));
  };

  const handleAddTest = (entry: PwMockEntry) => {
    const updated = [...pwTests, entry];
    setPwTests(updated);
    localStorage.setItem("shekhu_pw_tests", JSON.stringify(updated));
  };

  let totalTopics = 0;
  let totalMastered = 0;
  subjects.forEach((s: NeetSubject) => {
    s.topics.forEach((t: NeetTopic) => {
      totalTopics++;
      if (t.status === 3) totalMastered++;
    });
  });
  const overallProgress = totalTopics > 0 ? Math.round((totalMastered / totalTopics) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f5f9]">
      <GoalHeader overallProgress={overallProgress} />

      <main className="max-w-7xl mx-auto w-full p-3 sm:p-6 flex-1 space-y-6">
        <div className="flex border-b-4 border-black gap-2">
          <button
            onClick={() => setActiveTab("habits")}
            className={`px-4 py-2 text-xs font-black border-2 border-black transition-all ${
              activeTab === "habits" ? "bg-white shadow-[2px_2px_0px_0px_#000]" : "bg-slate-200 hover:bg-slate-100"
            }`}
          >
            🔥 DAILY PROTOCOL (6H / 30M WALK)
          </button>
          <button
            onClick={() => setActiveTab("syllabus")}
            className={`px-4 py-2 text-xs font-black border-2 border-black transition-all ${
              activeTab === "syllabus" ? "bg-white shadow-[2px_2px_0px_0px_#000]" : "bg-slate-200 hover:bg-slate-100"
            }`}
          >
            NEET SYLLABUS (NCERT READ)
          </button>
          <button
            onClick={() => setActiveTab("pwMocks")}
            className={`px-4 py-2 text-xs font-black border-2 border-black transition-all ${
              activeTab === "pwMocks" ? "bg-white shadow-[2px_2px_0px_0px_#000]" : "bg-slate-200 hover:bg-slate-100"
            }`}
          >
            PW TESTS LOGGER (680+ GOAL)
          </button>
        </div>

        {activeTab === "habits" && <DailyTracker />}
        {activeTab === "syllabus" && (
          <SyllabusTracker
            subjects={subjects}
            onUpdateTopic={handleUpdateTopic}
            onUndo={handleUndo}
            canUndo={historyStack.length > 0}
          />
        )}
        {activeTab === "pwMocks" && (
          <PWMockLogger tests={pwTests} onAddTest={handleAddTest} />
        )}
      </main>

      <footer className="bg-[#2c0d0d] text-[#d9c7b5] border-t-4 border-black p-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-[#f5a623] text-black font-black px-2 py-0.5 text-[10px]">AIIMS 2027</span>
            <span>AQUASHEKHAR // MISSION AIIMS DEOGHAR COMMAND CENTER</span>
          </div>
          <div className="text-[10px] text-slate-400">
            DISCIPLINE &gt; MOTIVATION. EVERY SINGLE DAY COUNTS.
          </div>
        </div>
      </footer>
    </div>
  );
}