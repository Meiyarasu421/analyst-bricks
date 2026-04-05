import React, { useState } from 'react';
import { CheckCircle2, Circle, Calendar, Trophy, Lock, PlayCircle, BookOpen, Terminal, Gamepad2, ChevronRight } from 'lucide-react';
import { Challenge, ChallengeTask } from '../types';
import { cn } from '../lib/utils';

const MOCK_30_DAY: ChallengeTask[] = Array.from({ length: 30 }, (_, i) => ({
  id: `30-${i + 1}`,
  day: i + 1,
  title: i === 0 ? 'SQL Basics: SELECT & FROM' : i === 1 ? 'SQL Filtering: WHERE & LIKE' : `Day ${i + 1} Task`,
  description: i === 0 ? 'Learn how to retrieve data from a single table and understand basic syntax.' : i === 1 ? 'Master filtering data using conditional statements and pattern matching.' : 'Keep building your skills with daily practice.',
  isCompleted: i < 2,
  category: i % 3 === 0 ? 'Technical' : i % 3 === 1 ? 'Personal' : 'Project',
  content: {
    theory: "Data analysis starts with retrieving data. SQL (Structured Query Language) is the standard language for this. The SELECT statement specifies which columns you want, and FROM specifies the table.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    practical: {
      type: i % 2 === 0 ? 'simulator' : 'game',
      title: i % 2 === 0 ? 'SQL Query Lab' : 'Data Quest: The Missing Record',
      description: i % 2 === 0 ? 'Write your first query in our interactive SQL environment.' : 'Find the hidden data point in this mini-game.'
    }
  }
}));

export const ChallengeTracker: React.FC = () => {
  const [activeChallenge, setActiveChallenge] = useState<'30-day' | '60-day' | '90-day'>('30-day');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [activeMode, setActiveMode] = useState<'theory' | 'video' | 'practical'>('theory');

  const challenges: Challenge[] = [
    { id: '30-day', title: '30 Days Sprint', tasks: MOCK_30_DAY },
    { id: '60-day', title: '60 Days Mastery', tasks: [] },
    { id: '90-day', title: '90 Days Professional', tasks: [] },
  ];

  const is30DayCompleted = MOCK_30_DAY.every(t => t.isCompleted);
  // For demo purposes, let's assume it's NOT completed yet so we can see the lock
  const demoIs30DayCompleted = false; 

  const currentChallenge = challenges.find(c => c.id === activeChallenge)!;
  const completedCount = currentChallenge.tasks.filter(t => t.isCompleted).length;
  const progress = currentChallenge.tasks.length > 0 ? (completedCount / currentChallenge.tasks.length) * 100 : 0;

  const isLocked = (id: string) => {
    if (id === '30-day') return false;
    return !demoIs30DayCompleted;
  };

  const selectedTask = currentChallenge.tasks.find(t => t.day === expandedDay);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {challenges.map(c => {
          const locked = isLocked(c.id);
          return (
            <button
              key={c.id}
              disabled={locked}
              onClick={() => setActiveChallenge(c.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                activeChallenge === c.id 
                  ? "bg-brand-600 text-white shadow-md shadow-brand-200" 
                  : "bg-white text-slate-500 border border-slate-200 hover:border-brand-300",
                locked && "opacity-60 cursor-not-allowed grayscale"
              )}
            >
              {locked && <Lock size={14} />}
              {c.title}
            </button>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{currentChallenge.title} Progress</h3>
            <p className="text-sm text-slate-500">{completedCount} of {currentChallenge.tasks.length || 30} days completed</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-slate-100 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={175.9}
                strokeDashoffset={175.9 - (175.9 * progress) / 100}
                className="text-brand-500 transition-all duration-1000"
              />
            </svg>
            <span className="text-xs font-bold text-slate-800">{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-8">
          {Array.from({ length: activeChallenge === '30-day' ? 30 : activeChallenge === '60-day' ? 60 : 90 }).map((_, i) => {
            const day = i + 1;
            const task = currentChallenge.tasks.find(t => t.day === day);
            const isCompleted = task?.isCompleted;
            const isCurrent = day === completedCount + 1;

            return (
              <button
                key={day}
                onClick={() => setExpandedDay(day)}
                className={cn(
                  "aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all",
                  isCompleted ? "bg-brand-500 text-white" : 
                  isCurrent ? "bg-brand-100 text-brand-600 border-2 border-brand-500" : 
                  "bg-slate-50 text-slate-400 border border-slate-100"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>

        {expandedDay && selectedTask && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">Day {expandedDay} Task</span>
                <Calendar size={14} className="text-slate-400" />
              </div>
              <h4 className="font-bold text-slate-800 mb-1">{selectedTask.title}</h4>
              <p className="text-sm text-slate-600 mb-4">{selectedTask.description}</p>
              
              {/* Multi-modal Tabs */}
              <div className="flex bg-white p-1 rounded-lg border border-slate-200 mb-4">
                {(['theory', 'video', 'practical'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setActiveMode(mode)}
                    className={cn(
                      "flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-2",
                      activeMode === mode ? "bg-brand-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"
                    )}
                  >
                    {mode === 'theory' && <BookOpen size={14} />}
                    {mode === 'video' && <PlayCircle size={14} />}
                    {mode === 'practical' && <Terminal size={14} />}
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>

              {/* Mode Content */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 min-h-[200px]">
                {activeMode === 'theory' && (
                  <div className="prose prose-slate max-w-none">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedTask.content?.theory}
                    </p>
                  </div>
                )}
                {activeMode === 'video' && (
                  <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden">
                    <iframe 
                      className="w-full h-full"
                      src={selectedTask.content?.videoUrl}
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {activeMode === 'practical' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-brand-50 rounded-lg border border-brand-100">
                      <div className="w-10 h-10 bg-brand-500 text-white rounded-lg flex items-center justify-center">
                        {selectedTask.content?.practical.type === 'simulator' ? <Terminal size={20} /> : <Gamepad2 size={20} />}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-800">{selectedTask.content?.practical.title}</h5>
                        <p className="text-xs text-slate-500">{selectedTask.content?.practical.description}</p>
                      </div>
                    </div>
                    <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                      Launch {selectedTask.content?.practical.type === 'simulator' ? 'Simulator' : 'Game'} <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>

              <button className={cn(
                "w-full mt-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all",
                selectedTask.isCompleted 
                  ? "bg-emerald-100 text-emerald-700 cursor-default" 
                  : "bg-brand-600 text-white hover:bg-brand-700"
              )}>
                {selectedTask.isCompleted ? (
                  <><CheckCircle2 size={18} /> Day Completed</>
                ) : (
                  "Complete Day"
                )}
              </button>
            </div>
          </div>
        )}

        {expandedDay && !selectedTask && (
          <div className="text-center py-12">
            <Lock size={48} className="mx-auto text-slate-200 mb-4" />
            <h4 className="text-lg font-bold text-slate-800 mb-2">Content Locked</h4>
            <p className="text-sm text-slate-500 italic">Complete previous days to unlock this content!</p>
          </div>
        )}
      </div>
    </div>
  );
};
