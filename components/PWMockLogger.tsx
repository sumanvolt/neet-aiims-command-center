"use client";

import React, { useState } from "react";
import { PlusCircle, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export interface PwMockEntry {
  id: string;
  name: string; // e.g. PW Yakeen Test 04
  score: number; // out of 720
  botanyMarks: number;
  zoologyMarks: number;
  chemMarks: number;
  phyMarks: number;
  negativeCount: number;
  date: string;
}

interface MockLoggerProps {
  tests: PwMockEntry[];
  onAddTest: (entry: PwMockEntry) => void;
}

export default function PWMockLogger({ tests, onAddTest }: MockLoggerProps) {
  const [form, setForm] = useState({
    name: "",
    botany: "",
    zoology: "",
    chem: "",
    phy: "",
    negatives: "",
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
            <PlusCircle className="w-5 h-5 text-[#ff007a]" />
            <h3 className="font-black text-xs uppercase tracking-wider">LOG PW / NEET MOCK TEST</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-bold block mb-1">PW TEST NAME / CODE</label>
              <input
                required
                placeholder="e.g. PW AITS Part Test 02"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border-2 border-black p-2 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold block mb-1">BOTANY (/180)</label>
                <input
                  type="number"
                  placeholder="160"
                  value={form.botany}
                  onChange={(e) => setForm({ ...form, botany: e.target.value })}
                  className="w-full border-2 border-black p-1.5 font-mono"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">ZOOLOGY (/180)</label>
                <input
                  type="number"
                  placeholder="165"
                  value={form.zoology}
                  onChange={(e) => setForm({ ...form, zoology: e.target.value })}
                  className="w-full border-2 border-black p-1.5 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold block mb-1">CHEMISTRY (/180)</label>
                <input
                  type="number"
                  placeholder="150"
                  value={form.chem}
                  onChange={(e) => setForm({ ...form, chem: e.target.value })}
                  className="w-full border-2 border-black p-1.5 font-mono"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">PHYSICS (/180)</label>
                <input
                  type="number"
                  placeholder="145"
                  value={form.phy}
                  onChange={(e) => setForm({ ...form, phy: e.target.value })}
                  className="w-full border-2 border-black p-1.5 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="font-bold block mb-1 text-red-600">NEGATIVE MARKS LOST</label>
              <input
                type="number"
                placeholder="-12 marks"
                value={form.negatives}
                onChange={(e) => setForm({ ...form, negatives: e.target.value })}
                className="w-full border-2 border-black p-1.5 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#f5a623] hover:bg-yellow-500 text-black font-black py-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] mt-2"
            >
              SAVE PW SCORE
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-2">
            <span className="text-xs font-black uppercase flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#10b981]" /> AIIMS DEOGHAR 680+ BENCHMARK
            </span>
            <span className="text-[10px] bg-[#ffe600] border border-black px-2 py-0.5 font-black">TARGET: 680 / 720</span>
          </div>

          <div className="h-56 w-full">
            {tests.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs font-mono">
                No PW tests logged yet. Log his latest weekly test to start his AIIMS trajectory.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tests}>
                  <XAxis dataKey="date" stroke="#000" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 720]} stroke="#000" tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ border: "2px solid #000", background: "#fff", fontFamily: "monospace" }} />
                  <ReferenceLine y={680} stroke="#FF007A" strokeDasharray="3 3" strokeWidth={2} label="AIIMS Deoghar (680)" />
                  <Line type="monotone" dataKey="score" stroke="#2c0d0d" strokeWidth={3} dot={{ fill: "#f5a623", r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 mt-2 border-t pt-2">
            <span>Bio Target: 340+ / 360</span>
            <span>Negative Marks Ceiling: &lt; 15</span>
          </div>
        </div>
      </div>
    </div>
  );
}