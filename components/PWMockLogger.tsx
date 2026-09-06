"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle, TrendingUp, CheckSquare, Plus, Trash2, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { NeetSubjectGroup } from "./SyllabusTracker";

export interface PwMockEntry {
  id: string;
  name: string;
  score: number;
  botanyMarks: number;
  zoologyMarks: number;
  chemMarks: number;
  phyMarks: number;
  negativeCount: number;
  date: string;
}

export interface UpcomingTarget {
  id: string;
  testName: string;
  testDate: string;
  selectedSubtopicIds: string[];
}

interface MockLoggerProps {
  tests: PwMockEntry[];
  onAddTest: (entry: PwMockEntry) => void;
  subjects: NeetSubjectGroup[];
}

export default function PWMockLogger({ tests, onAddTest, subjects }: MockLoggerProps) {
  const [form, setForm] = useState({
    name: "",
    botany: "",
    zoology: "",
    chem: "",
    phy: "",
    negatives: "",
  });

  // Upcoming Test State
  const [upcomingTargets, setUpcomingTargets] = useState<UpcomingTarget[]>([]);
  const [newTestName, setNewTestName] = useState("");
  const [newTestDate, setNewTestDate] = useState("");
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);

  // Selection Dropdown Helper States
  const [chosenSubj, setChosenSubj] = useState<string>("");
  const [chosenChap, setChosenChap] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("shekhu_upcoming_prep_targets");
    if (saved) {
      try { setUpcomingTargets(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const saveUpcoming = (targets: UpcomingTarget[]) => {
    setUpcomingTargets(targets);
    localStorage.setItem("shekhu_upcoming_prep_targets", JSON.stringify(targets));
  };

  const handleAddUpcoming = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestName || selectedSubtopics.length === 0) return;

    const newTarget: UpcomingTarget = {
      id: Date.now().toString(),
      testName: newTestName,
      testDate: newTestDate || new Date().toISOString().slice(0, 10),
      selectedSubtopicIds: selectedSubtopics,
    };

    saveUpcoming([...upcomingTargets, newTarget]);
    setNewTestName("");
    setNewTestDate("");
    setSelectedSubtopics([]);
  };

  const toggleSubtopicSelection = (id: string) => {
    setSelectedSubtopics((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteTarget = (id: string) => {
    saveUpcoming(upcomingTargets.filter((t) => t.id !== id));
  };

  // Helper map for subtopic names
  const subtopicMap: Record<string, string> = {};
  subjects.forEach((s) => {
    s.chapters.forEach((c) => {
      c.subtopics.forEach((st) => {
        subtopicMap[st.id] = `${c.title.split(":")[1] || c.title} ➔ ${st.name}`;
      });
    });
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const b = parseInt(form.botany) || 0;
    const z = parseInt(form.zoology) || 0;
    const c = parseInt(form.chem) || 0;
    const p = parseInt(form.phy) || 0;
    const total = b + z + c + p;

    onAddTest({
      id: Date.now().toString(),
      name: form.name || "PW Test",
      score: total,
      botanyMarks: b,
      zoologyMarks: z,
      chemMarks: c,
      phyMarks: p,
      negativeCount: parseInt(form.negatives) || 0,
      date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    });

    setForm({ name: "", botany: "", zoology: "", chem: "", phy: "", negatives: "" });
  };

  return (
    <div className="space-y-6">
      {/* Upper Grid: Logger Form and Connected Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mock Test Entry */}
        <div className="bg-white border-2 border-[#122056] p-5 shadow-[4px_4px_0px_0px_#122056]">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-[#122056] pb-2">
            <PlusCircle className="w-5 h-5 text-[#ff4757]" />
            <h3 className="font-black text-xs uppercase tracking-wider text-[#122056]">LOG PW / NEET MOCK TEST</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-bold block mb-1 text-[#122056]">TEST NAME / CODE</label>
              <input
                required
                placeholder="e.g. PW Yakeen Part Test 03"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border-2 border-[#122056] p-2 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold block mb-1 text-[#122056]">BOTANY (/180)</label>
                <input
                  type="number"
                  placeholder="160"
                  value={form.botany}
                  onChange={(e) => setForm({ ...form, botany: e.target.value })}
                  className="w-full border-2 border-[#122056] p-1.5 font-mono"
                />
              </div>
              <div>
                <label className="font-bold block mb-1 text-[#122056]">ZOOLOGY (/180)</label>
                <input
                  type="number"
                  placeholder="165"
                  value={form.zoology}
                  onChange={(e) => setForm({ ...form, zoology: e.target.value })}
                  className="w-full border-2 border-[#122056] p-1.5 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold block mb-1 text-[#122056]">CHEMISTRY (/180)</label>
                <input
                  type="number"
                  placeholder="150"
                  value={form.chem}
                  onChange={(e) => setForm({ ...form, chem: e.target.value })}
                  className="w-full border-2 border-[#122056] p-1.5 font-mono"
                />
              </div>
              <div>
                <label className="font-bold block mb-1 text-[#122056]">PHYSICS (/180)</label>
                <input
                  type="number"
                  placeholder="145"
                  value={form.phy}
                  onChange={(e) => setForm({ ...form, phy: e.target.value })}
                  className="w-full border-2 border-[#122056] p-1.5 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="font-bold block mb-1 text-[#ff4757]">NEGATIVE MARKS LOST</label>
              <input
                type="number"
                placeholder="-12 marks"
                value={form.negatives}
                onChange={(e) => setForm({ ...form, negatives: e.target.value })}
                className="w-full border-2 border-[#122056] p-1.5 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#5b65dc] hover:bg-indigo-600 text-white font-black py-2 border-2 border-[#122056] shadow-[2px_2px_0px_0px_#122056] mt-2"
            >
              SAVE PW SCORE
            </button>
          </form>
        </div>

        {/* Connected Graph Visualization */}
        <div className="lg:col-span-2 bg-white border-2 border-[#122056] p-5 shadow-[4px_4px_0px_0px_#122056] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 border-b-2 border-[#122056] pb-2">
            <span className="text-xs font-black uppercase flex items-center gap-1.5 text-[#122056]">
              <TrendingUp className="w-4 h-4 text-[#10b981]" /> AIIMS DEOGHAR SCORE TRAJECTORY
            </span>
            <span className="text-[10px] bg-[#eeeffd] text-[#122056] border border-[#122056] px-2 py-0.5 font-black">
              TARGET: 680 / 720
            </span>
          </div>

          <div className="h-60 w-full">
            {tests.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs font-mono">
                Log his PW weekly tests to map connected trajectory points.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tests} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <XAxis dataKey="date" stroke="#122056" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 720]} stroke="#122056" tick={{ fontSize: 10 }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as PwMockEntry;
                        return (
                          <div className="bg-white border-2 border-[#122056] p-2 shadow-[2px_2px_0px_0px_#122056] text-xs font-mono">
                            <div className="font-black text-[#122056] mb-1">{data.name}</div>
                            <div className="text-[#5b65dc] font-black">Total: {data.score} / 720</div>
                            <div className="text-[10px] text-slate-600 mt-1">
                              Bio: {data.botanyMarks + data.zoologyMarks} | Chem: {data.chemMarks} | Phy: {data.phyMarks}
                            </div>
                            <div className="text-[10px] text-[#ff4757]">Negatives: -{data.negativeCount}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine y={680} stroke="#ff4757" strokeDasharray="3 3" strokeWidth={2} label="AIIMS (680)" />
                  <Line
                    type="linear"
                    dataKey="score"
                    stroke="#5b65dc"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", r: 6, stroke: "#122056", strokeWidth: 2 }}
                    activeDot={{ r: 8, stroke: "#122056", strokeWidth: 2, fill: "#ff4757" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 mt-2 border-t border-[#122056]/15 pt-2">
            <span>Points connect automatically as tests are saved</span>
            <span className="text-[#10b981] font-black">AIIMS Cutoff Threshold: 680+</span>
          </div>
        </div>
      </div>

      {/* Lower Section: UPCOMING TEST PREPARATION SCOPE & TO-DO PLANNER */}
      <div className="bg-white border-2 border-[#122056] p-5 shadow-[4px_4px_0px_0px_#122056] space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#122056] pb-2">
          <span className="text-xs sm:text-sm font-black uppercase text-[#122056] flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#5b65dc]" /> UPCOMING TEST SYLLABUS &amp; TARGET PLANNER
          </span>
          <span className="text-[10px] bg-[#eeeffd] border border-[#122056] px-2 py-0.5 font-bold text-[#122056]">
            FOCUSED REVISION SCOPE
          </span>
        </div>

        {/* Builder Toolbar */}
        <form onSubmit={handleAddUpcoming} className="bg-[#fafafd] border-2 border-[#122056] p-3 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-black text-[#122056] block mb-1">UPCOMING TEST TITLE</label>
              <input
                required
                placeholder="e.g. PW Major Test 04 / Part Test Bio+Phy"
                value={newTestName}
                onChange={(e) => setNewTestName(e.target.value)}
                className="w-full border-2 border-[#122056] p-1.5 font-mono"
              />
            </div>
            <div>
              <label className="font-black text-[#122056] block mb-1">SCHEDULED DATE</label>
              <input
                type="date"
                value={newTestDate}
                onChange={(e) => setNewTestDate(e.target.value)}
                className="w-full border-2 border-[#122056] p-1.5 font-mono"
              />
            </div>
          </div>

          {/* Subtopic Picker Cascader */}
          <div className="space-y-2">
            <label className="font-black text-xs text-[#122056] block">
              SELECT COMING CHAPTERS / SUBTOPICS ({selectedSubtopics.length} Selected):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <select
                value={chosenSubj}
                onChange={(e) => {
                  setChosenSubj(e.target.value);
                  setChosenChap("");
                }}
                className="border-2 border-[#122056] p-1.5 font-bold bg-white"
              >
                <option value="">-- Choose Subject --</option>
                {subjects.map((s) => (
                  <option key={s.key} value={s.key}>{s.title}</option>
                ))}
              </select>

              <select
                disabled={!chosenSubj}
                value={chosenChap}
                onChange={(e) => setChosenChap(e.target.value)}
                className="border-2 border-[#122056] p-1.5 font-bold bg-white disabled:bg-slate-100"
              >
                <option value="">-- Choose Unit / Chapter --</option>
                {subjects
                  .find((s) => s.key === chosenSubj)
                  ?.chapters.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
              </select>
            </div>

            {/* Subtopic Checklist for Selected Chapter */}
            {chosenChap && (
              <div className="max-h-44 overflow-y-auto border-2 border-[#122056] p-2 bg-white space-y-1.5 text-xs">
                {subjects
                  .find((s) => s.key === chosenSubj)
                  ?.chapters.find((c) => c.id === chosenChap)
                  ?.subtopics.map((st) => (
                    <label
                      key={st.id}
                      className="flex items-center gap-2 p-1.5 hover:bg-[#eeeffd] cursor-pointer border border-[#122056]/15"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubtopics.includes(st.id)}
                        onChange={() => toggleSubtopicSelection(st.id)}
                        className="w-4 h-4 accent-[#5b65dc]"
                      />
                      <span className="font-bold text-[#122056]">{st.name}</span>
                    </label>
                  ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={selectedSubtopics.length === 0}
            className="w-full bg-[#10b981] hover:bg-emerald-600 text-white font-black py-2 border-2 border-[#122056] shadow-[2px_2px_0px_0px_#122056] text-xs disabled:opacity-40"
          >
            CREATE UPCOMING TEST PREP TARGET
          </button>
        </form>

        {/* Rendered Upcoming Prep Cards */}
        <div className="space-y-3 pt-2">
          {upcomingTargets.length === 0 ? (
            <div className="text-center text-xs font-mono text-slate-400 py-3">
              No upcoming test targets created. Choose topics above to build his test checklist.
            </div>
          ) : (
            upcomingTargets.map((target) => (
              <div key={target.id} className="border-2 border-[#122056] bg-[#eeeffd] p-3 shadow-[2px_2px_0px_0px_#122056]">
                <div className="flex items-center justify-between border-b border-[#122056]/20 pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs sm:text-sm text-[#122056]">{target.testName}</span>
                    <span className="bg-[#122056] text-white text-[9px] font-bold px-1.5 py-0.2 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" /> {target.testDate}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTarget(target.id)}
                    className="p-1 text-[#ff4757] hover:bg-rose-100 border border-[#ff4757]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Checklist of Subtopics */}
                <div className="space-y-1 text-xs">
                  {target.selectedSubtopicIds.map((stId) => (
                    <div
                      key={stId}
                      className="flex items-center justify-between p-1.5 bg-white border border-[#122056]/20"
                    >
                      <span className="font-bold text-[#122056]">{subtopicMap[stId] || stId}</span>
                      <span className="text-[10px] bg-[#5b65dc] text-white px-1.5 py-0.2 font-black">
                        SCOPE ITEM
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}