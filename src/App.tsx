import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Map as MapIcon, 
  Briefcase, 
  BookOpen, 
  Trophy,
  Bell,
  Search,
  Menu,
  X,
  Calendar,
  Sparkles
} from 'lucide-react';
import { ChatInterface } from './components/ChatInterface';
import { LearningRoadmap } from './components/LearningRoadmap';
import { JobBoard } from './components/JobBoard';
import { ChallengeTracker } from './components/ChallengeTracker';
import { PersonalDev } from './components/PersonalDev';
import { cn } from './lib/utils';

type Tab = 'dashboard' | 'assistant' | 'roadmap' | 'jobs' | 'challenges' | 'personal-dev';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assistant', label: 'AI Assistant', icon: MessageSquare },
    { id: 'roadmap', label: 'Roadmap', icon: MapIcon },
    { id: 'challenges', label: 'Challenges', icon: Calendar },
    { id: 'personal-dev', label: 'Personal Dev', icon: Sparkles },
    { id: 'jobs', label: 'Jobs & Internships', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-200">
            <Trophy size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">DataAnalyst<span className="text-brand-600">AI</span></h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === item.id 
                  ? "bg-brand-50 text-brand-600 shadow-sm" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="bg-slate-900 rounded-2xl p-4 text-white">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Pro Tip</p>
            <p className="text-sm leading-relaxed mb-4">Build a portfolio with real-world datasets to stand out.</p>
            <button className="w-full py-2 bg-brand-500 hover:bg-brand-600 rounded-lg text-xs font-bold transition-colors">
              Explore Projects
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar - Mobile */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-10">
             <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                <Trophy size={18} />
              </div>
              <h1 className="text-lg font-bold text-slate-900">DataAnalystAI</h1>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500">
              <X size={24} />
            </button>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as Tab);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  activeTab === item.id 
                    ? "bg-brand-50 text-brand-600" 
                    : "text-slate-500 hover:bg-slate-50"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-slate-500">
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search resources, jobs..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <header>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Aspirant! 👋</h1>
                  <p className="text-slate-500">You're making great progress. Your next step is <span className="text-brand-600 font-semibold underline">SQL Fundamentals</span>.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                      <BookOpen size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">12</h3>
                    <p className="text-sm text-slate-500">Lessons Completed</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-4">
                      <Briefcase size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">4</h3>
                    <p className="text-sm text-slate-500">Job Applications</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                      <Trophy size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">850</h3>
                    <p className="text-sm text-slate-500">Skill Points</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <LearningRoadmap />
                  </div>
                  <div className="space-y-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
                      <JobBoard />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'assistant' && (
              <div className="max-w-4xl mx-auto">
                <header className="mb-6">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Career Assistant</h1>
                  <p className="text-slate-500">Ask me anything about data analysis, resumes, or interview prep.</p>
                </header>
                <ChatInterface />
              </div>
            )}

            {activeTab === 'roadmap' && (
              <div className="max-w-3xl mx-auto">
                <header className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Learning Journey</h1>
                  <p className="text-slate-500">A step-by-step guide to becoming a job-ready Data Analyst.</p>
                </header>
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <LearningRoadmap />
                </div>
              </div>
            )}

            {activeTab === 'challenges' && (
              <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">Learning Challenges</h1>
                  <p className="text-slate-500">Stay consistent with our 30, 60, and 90-day structured sprints.</p>
                </header>
                <ChallengeTracker />
              </div>
            )}

            {activeTab === 'personal-dev' && (
              <div className="max-w-5xl mx-auto">
                <header className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">Personal Development</h1>
                  <p className="text-slate-500">Improve your communication, presentation, and professional soft skills.</p>
                </header>
                <PersonalDev />
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">Jobs & Internships</h1>
                  <p className="text-slate-500">Curated opportunities for entry-level data analysts.</p>
                </header>
                <JobBoard />
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
